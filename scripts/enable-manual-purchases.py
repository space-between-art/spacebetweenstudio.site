"""Run only after Wins confirms all three conditions in docs/manual-delivery/README.md."""
from pathlib import Path

root = Path(__file__).resolve().parents[1]
for product, payment in [('rain', 'sghkhexbb35cle'), ('brand', 'sghkhexbdv6fvp')]:
    path = root / f'shop/{product}/index.html'
    text = path.read_text()
    old = '<span class="button" aria-disabled="true">購買及交付流程維護中</span>'
    assert text.count(old) == 1, f'Unexpected purchase state: {product}'
    text = text.replace(old, f'<a class="button" href="https://pay.airwallex.com/{payment}" target="_blank" rel="noopener">前往 Airwallex 購買 ↗</a>')
    path.write_text(text)
for name in ['index.html', 'shop/index.html']:
    path = root / name
    text = path.read_text().replace('查看詳情（購買維護中）', '查看詳情與購買')
    path.write_text(text)
