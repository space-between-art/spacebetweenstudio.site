# 付費內容保護修正計劃（PAYMENT_PLAN）

> 日期：2026-09-24
> 範圍：AUDIT.md §7.1（Airwallex 連結與價格不一致）、§7.2（付費內容保護）、§4.2（付費頁被搜尋引擎收錄）
> 性質：**只是計劃**。這個 PR 只新增本檔案，沒有改動任何頁面、價格或付款連結。
> 安全說明：本文件**不會寫出任何通關密語**，只標示它們在哪個檔案。
> 更新（2026-09-24）：加入 Airwallex 後台截圖的資料（§1.2、§2.1）；確認**目前沒有真正付款的客人**（唯一一筆《賣雨的人》付款是站長自己的測試），所以刪除了「已付款讀者遷移」的步驟，舊密語和 token 直接作廢（§4）。

---

## 0. 先知道的三個前提（影響整個方案）

1. **這個 repo 是公開的**（`space-between-art/spacebetweenstudio.site`，visibility: public）。
   → 放在 repo 裡的東西，**任何人都可以在 github.com 直接讀原始碼或下載整個 repo**。所以前端閘門、`noindex`、`robots.txt` 都只能擋搜尋引擎和一般瀏覽者，**擋不住任何有心人**。
   - 發佈方式有兩條線索，**正式網域實際由哪一條服務，需要你確認**（§5 第 10 項）：
     - `CNAME` = `spacebetweenstudio.site`，`README.md` 寫明是「GitHub Pages repo」→ GitHub Pages；
     - 這個 PR 觸發了 **Cloudflare Pages** 專案 `spacebetweenstudio-site` 的部署（成功），每個分支都會產生 `*.spacebetweenstudio-site.pages.dev` 預覽網址。
   - 如果正式站是 Cloudflare Pages，每個分支的預覽網址**同樣公開整個 repo（包括付費內容）**，保護方案要一併覆蓋 `*.pages.dev`。
2. **git 歷史無法「收回」**。就算之後把付費檔案刪走，舊 commit 仍然可以讀到。現有電子書全文、密語都應該當作**已經外洩**處理：密語要作廢，內容能改版就改版。
3. 現有唯一的 Cloudflare 設定在 `cloudflare/workers-autoconfig` 分支的 `wrangler.jsonc`：Worker 名稱是 `nfc-card`（看起來是另一個專案的名稱），而且 `assets.directory` 是 `"."`，即**把整個 repo（包括付費內容）當成公開靜態檔發佈**。這個分支不應該照原樣合併。
   - 另外，Cloudflare 上有一個 **Workers Builds「nfc-card」連接了這個 repo**，每次 push 都會觸發並**失敗**（PR #3、#4 都是），因為 `main` 沒有 `wrangler` 設定。這不影響網站，但會令每個 PR 顯示紅色，建議在 Cloudflare 後台斷開或刪除這個連接（§5 第 14 項）。

---

## 1. 現況總表

### 1.1 銷售頁：價格與 Airwallex 連結

| 頁面 | 產品 | 顯示價格 | 購買按鈕連到 | 備註 |
|---|---|---|---|---|
| `index.html` | 賣雨的人 | HKD 68（/ TWD ~280） | `shop/rain.html`（**404**） | JSON-LD Offer：68 HKD |
| `index.html` | 慢慢成為自己的品牌 | HKD 168（/ TWD ~680） | `shop/brand.html`（**404**） | JSON-LD Offer：168 HKD |
| `index.html` | 品牌金線自我教練卡 | 敬請期待 | 無 | — |
| `selection.html` L667–682 | 賣雨的人 | HKD 68 | `pay.airwallex.com/hkhexbb35cle` | |
| `selection.html` L696–709 | 慢慢成為自己的品牌 | HKD 168 | `pay.airwallex.com/hkhexbdv6fvp` | |
| `selection.html` L726–741 | AI 給我的第一桶金 | HKD 99 | `book.html`（沒有付款連結） | |
| `selection.html` L752–773 | 療癒雙書組合 | HKD 198（原價 236） | `pay.airwallex.com/hkhexbevtwaa` | 附送「學費即訂金」代碼，可折抵 **HKD 198** |
| `book.html` L672–676 | AI 給我的第一桶金 | HKD 99 | `href="#"`（**無法購買**） | 「免費下載前三章」也是 `#` |
| `golden-thread/index.html` L501–508 | 品牌金線 Seed 種子版 | HKD 98 | `pay.airwallex.com/hkhexbb35cle` | |
| `golden-thread/index.html` L515–526 | 品牌金線 Complete 完整版 | HKD 198 | `pay.airwallex.com/hkhexbdv6fvp` | 含 Resource Hub |
| `golden-thread/index.html` L532–539 | 品牌金線 Kintsugi 金繼版 | HKD 498 | `pay.airwallex.com/hkhexbevtwaa` | 「全額可抵設計服務費」 |
| `golden-thread-landing.html` L967–1018 | Seed / Complete / Kintsugi | HKD 98 / 198 / 498 | 同上三條連結 | |
| `golden-thread-website-package/golden-thread-landing.html` | 同上 | 同上 | 同上三條連結 | 與上一頁 MD5 完全相同 |

### 1.2 以 Airwallex 連結反查

| Airwallex 連結 | Airwallex 後台設定（截圖） | 出現位置 | 網站上代表的產品／價格 | 一致？ |
|---|---|---|---|---|
| `hkhexbb35cle` | 《賣雨的人》**68.00 HKD** | `selection.html` | 賣雨的人 HKD 68 | ✅ |
| | | `golden-thread/index.html`、兩份 `golden-thread-landing.html` | 品牌金線 Seed **HKD 98** | ❌ 結帳收 68，產品也不同 |
| `hkhexbdv6fvp` | 《慢慢成為自己的品牌》**168.00 HKD** | `selection.html` | 慢慢成為自己的品牌 HKD 168 | ✅ |
| | | `golden-thread/index.html`、兩份 `golden-thread-landing.html` | 品牌金線 Complete **HKD 198** | ❌ 結帳收 168，產品也不同 |
| `hkhexbevtwaa` | 療癒雙書組合 **198.00 HKD** | `selection.html` | 療癒雙書組合 HKD 198 | ✅ |
| | | `golden-thread/index.html`、兩份 `golden-thread-landing.html` | 品牌金線 Kintsugi **HKD 498** | ❌ 結帳收 198，產品也不同 |

Airwallex 後台（「收款链接」頁）的其他資料：
- 只有上面三條連結，全部是「多次收款」；**品牌金線三個版本在後台根本沒有自己的收款連結**。
- 三條連結都顯示 **「停用日期 2026-04-17」**。如果這是連結的到期日，**全站三條付款連結現在可能都無法付款**（待你用手機實際開一次確認，§5 第 1 項）。
- 付款狀態：《賣雨的人》「已支付」（唯一一筆，是站長自己的測試）；其餘兩條「未支付」。**目前沒有真正付款的客人。**
- 截圖只顯示產品名稱和金額，沒有顯示連結 ID；上表是按產品名稱與 `selection.html` 對應推斷。

### 1.3 付費／購買者專屬頁面：保護方式與收錄狀態

| 頁面 | 屬於哪個產品 | 現時保護方式 | 實際效果 | `robots` meta | 可被收錄？ |
|---|---|---|---|---|---|
| `ebook/manman/index.html`（26 MB，含 `sw.js` 離線快取） | 慢慢成為自己的品牌（HKD 168） | **沒有** | 全文公開 | **沒有** | ✅ **可以** |
| `ebook/rain-seller/index.html` | 賣雨的人（HKD 68） | 沒有 | 全文公開 | `noindex, nofollow` | 否（但 repo 公開） |
| `audiobook/rain-seller/index.html` | 賣雨的人有聲書 | `?token=` 參數，存入 `localStorage` | **任何 token 值都通過**（L305 註解「簡化驗證」）；音檔 `audio/*.mp3` 目前尚未上載，只有 README | `noindex, nofollow` | 否 |
| `workshop-v2.html` | 品牌金線互動工作坊 | Email ＋ 密語（明文寫在前端 JS），通過後寫 `localStorage.workshopUnlocked` | 看原始碼或在 console 設一個 localStorage 值即可進入；另有「演示模式」按鈕可直接進入 | **沒有** | ✅ **可以** |
| `workshop-full.html` | 同上（無閘門版本） | **沒有** | 全部公開 | **沒有** | ✅ **可以** |
| `resource-hub/index.html` | 品牌金線 Complete 以上 | 密語（明文寫在前端 JS L159），`localStorage.resourceHubUnlocked` | 同上；提示句幾乎直接給出答案；Notion 連結是公開的 `notion.site` 網址 | `noindex, nofollow` | 否 |
| `golden-thread-website-package/resource-hub.html` | 同上（舊版） | **沒有** | 公開（大部分連結為 `#` 佔位） | **沒有** | ✅ **可以** |
| `notion/workbook.html` | Notion 模版跳轉頁 | 沒有 | 跳去 `notion.so/YOUR-TEMPLATE-ID`（佔位） | **沒有** | ✅ 可以（內容空） |
| `README.md` | — | — | **公開寫出工作坊密語** | — | GitHub 上可被搜尋 |

另外：
- 全站**沒有 `robots.txt`、`sitemap.xml`**。
- 沒有任何頁面連結到 `ebook/*`、`audiobook/*`、`workshop-*`、`resource-hub/*`（推測是付款後用 email 發連結），但它們仍然會經 GitHub、外部分享或舊連結被發現。

---

## 2. 不一致之處

### 2.1 付款連結與價格
1. **`selection.html` 的三個價格與 Airwallex 後台一致；品牌金線三頁全部錯誤**（見 §1.2）。品牌金線在後台沒有任何收款連結，三頁借用了療癒系列的連結：揀 Seed（98）會付 68 買到《賣雨的人》，揀 Complete（198）會付 168 買到《慢慢成為自己的品牌》，揀 Kintsugi（498）會付 198 買到療癒雙書組合。
2. **三條連結都有「停用日期 2026-04-17」**，已經過了五個多月；如果是到期停用，網站上所有「購買」按鈕現在都付不到錢。
3. 就算金額正確，連結共用令**付款記錄分不出買家以為自己買的是哪個產品**，之後無法自動開通對應內容（這一點直接影響 §3 的方案）。
4. 「學費即訂金」折抵額不一致：雙書組合寫可折抵 **HKD 198**，Kintsugi 版寫 **HKD 498 全額**，兩者卻是同一條付款連結（後台實際收 198）。
5. `index.html` 的產品卡連到 `shop/rain.html`、`shop/brand.html`，兩頁都**不存在**；首頁完全沒有付款入口。
6. 《AI 給我的第一桶金》HKD 99：`selection.html` 有標價，但 `book.html` 的購買按鈕是 `href="#"`，**沒有任何付款連結**。
7. 工作坊閘門的「還沒有書？立即購買」（`workshop-v2.html` L1200）連去 `/book`（即《AI 給我的第一桶金》），但工作坊屬於《找到你的品牌金線》。
8. 同一產品頁（品牌金線）有三份：`golden-thread/index.html`、`golden-thread-landing.html`、`golden-thread-website-package/golden-thread-landing.html`，改價時要同步三處，很容易再次出錯。
9. 各版本權益寫法不一：`golden-thread/index.html` 的 Complete 列出「Resource Hub 完整存取」，`golden-thread-landing.html` 沒有提；兩頁都**沒有提到互動工作坊**屬於哪個版本，但工作坊閘門要求「書中的通關密語」。
10. `index.html` 寫「9 章、63 個反思練習」；`selection.html` 寫「5 大工具、56 道練習題」（AUDIT §3.3，屬文案，不在本計劃處理）。

### 2.2 保護方式
11. 同一類「購買者專屬」內容，有的完全無保護、有的用前端密語、有的用假 token，**沒有一致的做法**，而且**沒有一種是真正有效的**（見 §0 第 1 點）。
12. 最貴的內容（慢慢成為自己的品牌 HKD 168、工作坊）保護最弱，而且可以被 Google 收錄。
13. 閘門通過狀態存在 `localStorage`：讀者換裝置或清瀏覽器資料就要重新輸入；反過來，任何人都可以手動寫入同一個值。

---

## 3. 建議方案

### 3.1 方案比較

| 方案 | 做法 | 優點 | 缺點 | 建議 |
|---|---|---|---|---|
| A. 只加 `noindex`／`robots.txt` | 付費頁加 meta 或 header | 最快 | **不保護任何東西**（repo 公開） | 只作為第 1 階段的止血 |
| B. Cloudflare Access（Zero Trust）Email OTP | 把付費路徑放在 Access 後面，允許名單內的 email 登入 | 免寫程式；有官方驗證 | 名單要人手或用 API 維護；免費方案有人數上限；登入頁是 Cloudflare 樣式，不符合品牌 | 可作過渡方案 |
| **C. Worker ＋ KV 權益表 ＋ Email 魔法連結（建議）** | 見 §3.2 | 用現有 Workers＋KV＋n8n；可自動開通；可按產品分權限；讀者不用記密碼 | 要寫一個小型 Worker；付費內容要搬出公開 repo | ✅ **建議** |
| D. 改用付費平台（Gumroad、Payhip 等） | 內容與付款都交給平台 | 最省事 | 抽成；失去網頁版電子書／工作坊的體驗；要改 Airwallex 流程 | 不建議，除非你想放棄自建 |

### 3.2 建議方案 C：架構

```
讀者 ──► spacebetweenstudio.site（Cloudflare 代理）
            │
            ├─ 公開頁（index、selection、golden-thread…）──► 照舊（GitHub Pages 或 Cloudflare Pages）
            │
            └─ 付費路徑 /ebook/* /audiobook/* /workshop* /resource-hub/*
                  ──► Worker「paywall」
                        1. 讀 HttpOnly session cookie（HMAC 簽名，含 email）
                        2. 查 KV：ent:<email> → 已購產品清單
                        3. 有權限 → 從「私有來源」讀內容回傳，加 X-Robots-Tag: noindex
                           沒權限 → 302 到 /login?next=…（品牌化登入頁）

Airwallex 付款成功 ──webhook──► n8n（或 Worker 的 /api/airwallex-webhook）
        1. 驗證 Airwallex webhook 簽名
        2. 按「付款連結 ID → 產品 SKU」對照表，寫入 KV：ent:<email> 加入 SKU
        3. 產生一次性登入 token（KV，設 TTL），email 寄出「開始閱讀」魔法連結

/login：輸入 email → 如果 KV 有權益，寄出魔法連結（限速）；沒有就顯示「找不到購買記錄，請聯絡我們」
/auth/verify?t=… ：驗證一次性 token → 刪除 token → 設 session cookie（例如 180 日）→ 轉去原本想看的頁
```

**重點設計：**

| 項目 | 建議 |
|---|---|
| 若正式站已是 Cloudflare Pages | paywall 可以直接寫成 **Pages Functions**（`functions/_middleware.js`，綁定同一個 KV），不用另開 Worker 路由；但內容仍然必須搬出公開 repo，否則 GitHub 上照樣讀得到 |
| 付費內容放在哪 | **搬出這個公開 repo**。選項：(1) 私有 repo，用 Workers Static Assets 部署成獨立 Worker，只由 paywall Worker 經 Service Binding 讀取；或 (2) Cloudflare R2 bucket（不開公開存取）。電子書 HTML、圖片、之後的 mp3 都放這裡 |
| KV 結構 | `ent:<email小寫>` → `{ "skus": ["rain-seller","manman",…], "orders": [...], "credit": 498 }`；`tok:<隨機值>` → email（TTL 例如 7 日，用過即刪）；`sku:<airwallex連結ID>` → SKU（對照表） |
| Session | Cookie `HttpOnly; Secure; SameSite=Lax`，內容為 `email＋到期時間＋HMAC`；密鑰放 Worker secret。不存在 `localStorage` |
| 產品 SKU（建議） | `rain-seller`、`rain-seller-audio`、`manman`、`bundle-healing`（＝前兩者）、`gt-seed`、`gt-complete`、`gt-kintsugi`、`ai-first-bucket` |
| 路徑權限（建議，待你確認） | `/ebook/rain-seller/*`、`/audiobook/rain-seller/*` → `rain-seller` 或 `bundle-healing`；`/ebook/manman/*` → `manman` 或 `bundle-healing`；`/workshop*` → `gt-*`（待決定哪幾級）；`/resource-hub/*` → `gt-complete`、`gt-kintsugi` |
| 搜尋引擎 | Worker 對所有付費路徑回傳 `X-Robots-Tag: noindex, nofollow`；登入頁也 `noindex`；新增 `robots.txt` Disallow 付費路徑；完成後到 Google Search Console 申請移除已收錄網址 |
| Service Worker（manman 離線閱讀） | `sw.js` 要改成：只快取已登入後取得的內容、cache 名稱帶版本號、`activate` 時清舊 cache |
| KV 一致性 | KV 寫入後最多約 60 秒才全球同步；付款後的魔法連結會先寫 token 再寄信，讀者點擊時通常已同步。如仍查不到，驗證頁顯示「稍等片刻再試」而不是「無權限」 |
| 濫用防護 | `/login` 按 IP 與 email 限速（KV 計數或 Cloudflare Rate Limiting 規則）；同一 email 同時可登入的裝置數可設上限（可選） |

### 3.3 分階段執行

| 階段 | 內容 | 改動範圍 | 效果 |
|---|---|---|---|
| **1. 止血（可即日做）** | (a) `ebook/manman`、`workshop-v2`、`workshop-full`、`golden-thread-website-package/*`、`notion/workbook.html` 加 `noindex`；(b) 新增 `robots.txt`；(c) Search Console 移除已收錄的付費頁；(d) 從 `README.md` 刪除密語；(e) 品牌金線三頁的購買按鈕暫時停用或改為「即將推出」，直到有自己的收款連結（避免客人付錯錢） | 前端 | 減少被搜尋到；避免付錯款；**不保護內容** |
| **2. 修正付款連結** | 確認三條現有連結是否已停用，需要的話延長或重建；在 Airwallex 為每個 SKU 開**獨立**付款連結（至少 7 條：現有 3 條＋品牌金線 3 條＋《AI 給我的第一桶金》1 條），在 metadata／reference 帶 SKU；更新各頁連結；`book.html` 補上付款連結；刪除重複的 landing 頁（或 301 到一個正本） | 需要你在 Airwallex 後台操作＋前端改連結 | 價格與結帳一致；付款記錄可分辨產品（階段 3 的前提） |
| **3. 建立 Worker＋KV** | paywall Worker、`/login`、`/auth/verify`、webhook 接收、KV namespace、secrets；先在 `*.workers.dev` 或預覽網域測試 | 新 Worker（另一個 repo 或本 repo 的 `worker/` 目錄，待決定） | 真正的伺服器端驗證 |
| **4. 搬內容＋切換** | 付費內容搬到私有來源；在本 repo 刪除付費檔案；Cloudflare 路由指向 Worker；舊密語、token 在切換時同步作廢 | 刪檔＋DNS／路由 | 公開 repo 不再包含新版付費內容 |
| **5. 收尾** | 監察 404／登入失敗；更新 llms.txt／JSON-LD 的價格（如有改動） | — | — |

> 注意：階段 4 之後，**舊 commit 仍然含有舊版全文**。如要徹底清除，需要改寫 git 歷史（`git filter-repo`）並強制推送，這會影響所有 fork／clone，屬於需要你決定的事（見 §5）。

---

## 4. 對現有讀者的影響

**目前沒有真正付款的客人**（Airwallex 後台唯一一筆《賣雨的人》付款是站長自己的測試），所以：

- **不需要遷移任何買家**：不用匯出付款記錄、不用批量寫入 KV、不用主動寄新的閱讀連結。
- **舊密語和 token 直接作廢**：工作坊、Resource Hub 的前端密語，以及有聲書的 `?token=`，在切換時一併移除，不設過渡期。
- `localStorage` 裡的舊狀態（`workshopUnlocked`、`resourceHubUnlocked`、`audiobook_token`、工作坊進度 `goldenThreadFull`）不用保留或轉移。
- 你自己的測試付款：切換後在 KV 手動加一筆測試權益即可，用來驗證整個流程。
- 如果在切換前有人真的付款（例如三條連結其實仍然有效），就在 KV 手動為那位客人加入權益，再寄登入連結。

---

## 5. 需要你決定的事項

**付款與價格**
1. 三條連結的「停用日期 2026-04-17」是甚麼意思？是否已經停用、客人現在付不到錢？（用手機開一次 `https://pay.airwallex.com/hkhexbb35cle` 即可確認）
2. 是否同意為品牌金線 Seed／Complete／Kintsugi 另開三條收款連結，並在開好之前先停用品牌金線三頁的購買按鈕？現有三條連結保留給賣雨的人、慢慢成為自己的品牌、療癒雙書組合？
3. 《AI 給我的第一桶金》HKD 99 是否已開賣？需要付款連結嗎？
4. 「學費即訂金」：雙書組合折抵 HKD 198、Kintsugi 折抵 HKD 498，是否正確？折抵額要記錄在系統裡，還是你人手處理？
5. 品牌金線三個 landing 頁，保留哪一個作正本？其餘刪除還是 301 轉址？
6. `index.html` 的 `shop/rain.html`、`shop/brand.html` 要建立新頁，還是直接改連到 `selection.html` 或 Airwallex？

**權限**
7. 互動工作坊屬於哪個版本？（Seed／Complete／Kintsugi 全部？只限 Complete 以上？）
8. 雙書組合是否等於「賣雨的人＋慢慢成為自己的品牌」兩者權限（含有聲書）？
9. 登入有效期（建議 180 日）與同時登入裝置上限（建議不設，或 3 部）？

**技術與基建**
10. 正式網域現在由 **GitHub Pages** 還是 **Cloudflare Pages**（專案 `spacebetweenstudio-site`）服務？DNS 是否已在 Cloudflare 並開啟代理（橙色雲）？（Worker 路由必須經 Cloudflare 代理；如果已是 Cloudflare Pages，可以改用 Pages Functions）
11. 付費內容搬去哪裡：**私有 GitHub repo＋Workers Static Assets**，還是 **R2**？
12. Worker 程式放在哪個 repo？（CLAUDE.md 規定本 repo 只處理前端；`space-between.art` 是私有 repo 但目前只有一個 README，可以考慮放在那裡，或開新的私有 repo）
13. Airwallex webhook 由 **n8n** 接收（沿用現有流程），還是由 Worker 直接接收？寄信用甚麼（n8n 現有郵件設定／HubSpot／其他）？
14. `cloudflare/workers-autoconfig` 分支（Worker 名 `nfc-card`、把整個 repo 公開）是否可以棄用？Cloudflare 上連接這個 repo、每次 push 都失敗的 Workers Builds「nfc-card」是否可以斷開？
15. 是否要改寫 git 歷史，徹底刪除舊版付費內容和密語？（會影響所有 clone／fork；不改寫的話，舊版內容永遠可以在 GitHub 歷史中讀到。因為目前沒有付款客人，現在做影響最小）
16. 新的 Airwallex 收款連結需要收集客人 email（用來開通權益和寄登入連結），請確認後台建立連結時已開啟收集 email。

---

## 6. 這個 PR 改了甚麼、沒改甚麼

- **改了**：新增 `PAYMENT_PLAN.md`；之後按 Airwallex 後台截圖更新 §1.2、§2.1、§5，並因沒有付款客人刪除已付款讀者遷移步驟（§3.3、§4、§5）。
- **沒改**：任何 HTML／CSS／JS、價格、Airwallex 連結、`robots` 設定、`README.md` 中的密語、`space-between.art` repo。
- 上面所有行號以 `main` 的 `639cb0f` 為準。
