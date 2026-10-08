> 2026-10-08 Wins 決定：暫停建設，保留接收器，不部署、不切換 webhook。改為 Airwallex 收款、人手交付；以 docs/manual-delivery/README.md 為準。

# 直接交付：建設稿，未部署

此目錄是獨立 Worker 原始碼，不是 Pages Function，不涉及 nfc-card。
目前完成安全通知接收及本地測試；未提供可啟用的正式寄信流程。
不得把 Airwallex 網址切換到未完成的端點。

## 已實作

- 以原始 body、x-timestamp、x-signature 驗證 HMAC-SHA256；五分鐘時間容差。
- 必須配置帳戶、secret、queue、啟用旗標及上線事件日期，否則回覆 503。
- 成功持久排入 Queue 後才回覆 200；入列失敗回覆 503 供 Airwallex 重試。
- 佇列只含事件與付款識別碼，不含買家電郵或商品檔案。
- 日期界線排除舊測試，包括 2026-10-08 17:35:41 香港時間付款、其後已受理退款的 HKD68 訂單。

## 下階段與啟用條件

1. 取得 Cloudflare Worker 路由／原始碼設定、新 webhook secret，以及 Airwallex API 安全存取。Secrets 只在後台或安全輸入設定，不能放 git。
2. 核實真實事件 payload、Payment Link / 商品識別碼、金額單位及買家電郵字段；不能只按 6800 或 16800 猜商品。
3. Queue consumer 從 Airwallex 查最新付款與退款狀態，確認付款有效且未退款。D1 以 paymentIntentId 唯一鍵及原子狀態更新管理訂單與寄送；Queue 可能重複投遞。
4. 核實《賣雨的人》互動網頁、PDF、ePub、有聲書的四個實際交付來源，以及品牌商品 PDF／Notion 模版。目前 repo 的 ebook/downloads 和 audiobook/rain-seller/audio 只有佔位 README。
5. 選定交易電郵服務、驗證寄件網域、設定 API secret。寄信須有供應商冪等鍵並處理其有效期限；逾期的不明寄送狀態送人工核查，避免盲目重寄。
6. 私有 R2 儲存付費檔案；下載端點以可撤回的訂單權益與限時 token 授權。未核實前不搬走現有交付內容。
7. 設定重試、dead-letter queue、失敗告警及人工補發；HubSpot 同步獨立處理，失敗不能阻止商品交付。
8. 沙盒驗收：錯誤簽章、重复事件、退款事件、寄信失敗、Queue 重試、寄信成功但狀態更新失敗、全部承諾格式可用。
9. 完成後才設正式事件日期界線並部署新路由。Wins 更新 Airwallex URL；完成一次實付至收信測試後切換，舊端點保留回復設定但不可同時交付。

## 暫時安排（尚未修改正式站）

建議暫停自動購買入口，顯示「購買及交付流程維護中，查詢請聯絡 hello@spacebetweenhealing.com」。
如改為人手交付，需要 Wins 決定可承諾的時間，並先備妥完整商品檔案。

## 驗證

`node --test delivery-worker/test/receiver.test.mjs`

上述測試為合成事件，不觸發付款、不寄信、不更新 n8n。

簽章依據：https://www.airwallex.com/docs/developer-tools/webhooks/listen-for-webhook-events
