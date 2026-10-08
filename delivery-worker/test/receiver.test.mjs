import test from 'node:test';
import assert from 'node:assert/strict';
import receiver, { verifySignature } from '../src/receiver.mjs';

const secret = 'synthetic-test-secret';
async function sign(raw, timestamp) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return Buffer.from(await crypto.subtle.sign('HMAC', key, enc.encode(timestamp + raw))).toString('hex');
}
async function request(event, env, transform = x => x) {
  const raw = JSON.stringify(event);
  const timestamp = String(Date.now());
  return receiver.fetch(new Request('https://example.test/webhook/airwallex-payment', { method: 'POST', body: transform(raw), headers: { 'x-timestamp': timestamp, 'x-signature': await sign(raw, timestamp) } }), env);
}
const event = () => ({ id: 'evt_test', account_id: 'acct_test', name: 'payment_intent.succeeded', created_at: new Date().toISOString(), data: { object: { id: 'pi_test' } } });
const env = send => ({ DELIVERY_ENABLED: 'true', AIRWALLEX_ACCOUNT_ID: 'acct_test', AIRWALLEX_WEBHOOK_SECRET: secret, ACCEPT_EVENTS_AFTER: '2026-10-08T10:20:00Z', DELIVERY_QUEUE: { send } });

test('signed payload is enqueued before acknowledgment; no customer data in queue', async () => {
  const messages = [];
  const response = await request(event(), env(async value => messages.push(value)));
  assert.equal(response.status, 200);
  assert.equal(messages.length, 1);
  assert.deepEqual(Object.keys(messages[0]).sort(), ['createdAt', 'eventId', 'paymentIntentId']);
});
test('tampering and stale signatures rejected', async () => {
  assert.equal((await request(event(), env(() => assert.fail()), raw => raw + ' ')).status, 401);
  const timestamp = String(Date.now() - 600_000);
  assert.equal(await verifySignature('{}', timestamp, await sign('{}', timestamp), secret), false);
});
test('queue failure asks Airwallex to retry', async () => {
  assert.equal((await request(event(), env(async () => { throw Error('offline'); }))).status, 503);
});
test('wrong account and unconfigured deployment fail closed', async () => {
  assert.equal((await request({ ...event(), account_id: 'other' }, env(() => assert.fail()))).status, 403);
  assert.equal((await request(event(), {})).status, 503);
});
test('historical refunded test cannot trigger delivery', async () => {
  assert.equal((await request({ ...event(), created_at: '2026-10-08T09:35:41Z' }, env(() => assert.fail()))).status, 200);
});
