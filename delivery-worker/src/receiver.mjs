// Airwallex raw-body signature validation; no secrets or customer data in logs.
const encoder = new TextEncoder();

export async function verifySignature(raw, timestamp, signature, secret, now = Date.now()) {
  if (!secret || !/^\d{13}$/.test(timestamp || '') || !/^[a-fA-F0-9]{64}$/.test(signature || '')) return false;
  if (Math.abs(now - Number(timestamp)) > 300_000) return false;
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
  const bytes = Uint8Array.from(signature.match(/../g), h => parseInt(h, 16));
  return crypto.subtle.verify('HMAC', key, bytes, encoder.encode(timestamp + raw));
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname !== '/webhook/airwallex-payment') return new Response('Not found', { status: 404 });
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: { Allow: 'POST' } });
    // Remains disabled until account, secret, queue and rollout cutoff are configured.
    const cutoff = Date.parse(env.ACCEPT_EVENTS_AFTER || '');
    if (env.DELIVERY_ENABLED !== 'true' || !env.AIRWALLEX_ACCOUNT_ID || !env.AIRWALLEX_WEBHOOK_SECRET || !env.DELIVERY_QUEUE || !Number.isFinite(cutoff)) {
      return new Response('Not configured', { status: 503 });
    }
    if (Number(request.headers.get('content-length')) > 262144) return new Response('Too large', { status: 413 });
    const raw = await request.text();
    if (encoder.encode(raw).length > 262144) return new Response('Too large', { status: 413 });
    if (!await verifySignature(raw, request.headers.get('x-timestamp'), request.headers.get('x-signature'), env.AIRWALLEX_WEBHOOK_SECRET)) {
      return new Response('Invalid signature', { status: 401 });
    }
    let event;
    try { event = JSON.parse(raw); } catch { return new Response('Invalid JSON', { status: 400 }); }
    if (event.account_id !== env.AIRWALLEX_ACCOUNT_ID) return new Response('Wrong account', { status: 403 });
    if (event.name !== 'payment_intent.succeeded') return new Response('Ignored', { status: 200 });
    const createdAt = Date.parse(event.created_at);
    if (!event.id || !event.data?.object?.id || !Number.isFinite(createdAt)) return new Response('Invalid event', { status: 400 });
    // Excludes historical test payments, including the refunded 2026-10-08 order.
    if (createdAt < cutoff) return new Response('Historical event excluded', { status: 200 });
    try {
      // Durable enqueue must complete before returning Airwallex's required HTTP 200.
      // Consumer must retrieve current payment/refund state and deduplicate by intent ID.
      await env.DELIVERY_QUEUE.send({ eventId: event.id, paymentIntentId: event.data.object.id, createdAt: event.created_at });
    } catch {
      return new Response('Queue unavailable', { status: 503 });
    }
    return new Response('Accepted', { status: 200 });
  }
};
