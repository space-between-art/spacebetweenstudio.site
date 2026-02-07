# 📦 Workshop v2 部署包

## 文件清單

```
deploy-package/
├── workshop-v2.html          # 完整版（含閘門）→ 部署為 workshop.html
├── workshop-full.html        # 測試版（無閘門）→ 部署為 workshop-full.html  
├── n8n-workshop-gate-hubspot.json  # n8n HubSpot 追蹤流程
├── DEPLOYMENT-GUIDE.md       # 詳細部署指南
├── book-callout-design.md    # 原書導向設計文案
├── resource-hub/             # 資源中心文件
│   └── index.html
└── deploy.sh                 # 自動部署腳本
```

---

## 🚀 快速部署

### 方法 1: 使用部署腳本

```bash
# 設定 repo 路徑
export REPO_PATH=/path/to/spacebetweenstudio.site

# 執行部署
./deploy.sh
```

### 方法 2: 手動部署

```bash
# 複製到 GitHub Pages repo
cp workshop-v2.html /path/to/spacebetweenstudio.site/workshop.html
cp workshop-full.html /path/to/spacebetweenstudio.site/workshop-full.html

# 提交並推送
cd /path/to/spacebetweenstudio.site
git add .
git commit -m "Deploy Workshop v2"
git push
```

---

## 🔐 通關密語配置

| 設定 | 預設值 |
|------|--------|
| 密語 | `金繼哲學` |
| 提示 | 書中 P.12 |

如需更改，編輯 `workshop-v2.html`:
```javascript
const PASSPHRASE = '你的新密語';
```

---

## 🎬 演示案例

| 案例 | 圖示 | 適用場景 |
|------|------|----------|
| 雨天咖啡 | ☕ | 一般演示、B2C 品牌 |
| Metz 茶葉 | 🍵 | CCMF/Metz 合作演示 |

---

## 📊 n8n 設定

1. 匯入 `n8n-workshop-gate-hubspot.json`
2. 配置 HubSpot OAuth2 credential
3. 啟用 workflow
4. Webhook URL: `https://spacebetween.app.n8n.cloud/webhook/workshop-gate`

---

## 🔗 部署後網址

| 頁面 | 網址 |
|------|------|
| 工作坊（正式） | spacebetweenstudio.site/workshop.html |
| 工作坊（測試） | spacebetweenstudio.site/workshop-full.html |
| 資源中心 | spacebetweenstudio.site/resource-hub/ |

---

## ✅ 測試清單

- [ ] 閘門頁面正常顯示
- [ ] Email + 密語驗證正常
- [ ] 演示模式案例選擇正常
- [ ] 「問光光」WhatsApp 連結正確
- [ ] B2B 預約 CTA 連結正確
- [ ] n8n Webhook 接收正常
- [ ] HubSpot 聯絡人建立正常
- [ ] PDF 匯出正常
- [ ] 手機版顯示正常

---

*Space Between Studio | 2026-02-07*
