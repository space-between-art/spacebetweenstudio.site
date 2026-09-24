# 版面改善提案（Design Proposal）

> 範圍：只做提案，**沒有改動任何現有頁面**。新增檔案：
> - `DESIGN_PROPOSAL.md`（本文件）
> - `preview/home-v2.html`（首頁改版預覽，套用下面的建議；`noindex`）
> - `docs/screenshots/design-proposal/*.jpg`（預覽截圖及現況問題截圖）
>
> 依據：CLAUDE.md（Logo System Guidelines v1.1）、`css/tokens.css`、AUDIT.md。
> 檢查方法：逐頁讀原始碼，再用 Chromium 在 360／768／1280px 截圖及量度。

---

## 0. 總結

| # | 項目 | 現況 | 建議 |
|---|---|---|---|
| 1 | 各頁版面 | 見 §1 | 每頁 2–3 項，共 15 項 |
| 2 | 金線 | tokens.css 已預留 `--color-gold-thread`，暫時等於 River Stone | ✅ 已定：兩個深淺——`--color-gold-thread-on-light: #86672A`、`--color-gold-thread-on-dark: #D4B872`，只用於線條同細小點綴 |
| 3 | 手機導航 | 3 頁手機版**完全無選單**；book.html 換成兩行；selection footer 擠爆 | 統一「選單」按鈕 + nav 下方全寬面板 |
| 4 | `color-scheme` | PR #8 已加入（tokens.css + 16 頁 meta）；**`writing/index.html` 仍欠 meta** | 補上 `writing/index.html` 的 meta |
| 5 | Footer 社交連結 | 沒有 | 新增「追蹤我們」欄：Instagram、Threads、Facebook（網址待提供） |
| 6 | 封面應用 | 首頁用 emoji 當封面；/writing 是純文字卡片；og:image 全站同一張 | 首頁產品卡三張都用真實封面；/writing 改書架；各書頁用自己的 og 圖（§8） |

360／768／1280px 量度結果：六頁現在**都沒有橫向捲動**（index／about／writing 靠 `body { overflow-x: hidden }` 遮住跑馬燈溢出）。preview/home-v2.html 三個寬度同樣沒有橫向捲動。

---

## 1. 各頁版面建議

### 1.1 首頁 `index.html`

1. **手機版沒有選單（最優先）**
   `@media (max-width: 768px) { .nav-links { display: none; } }`，手機用戶除了 logo 之外沒有任何導航，進不到「關於」「寫作」「預約諮詢」。→ 用 §3 的統一手機選單。
   截圖：`docs/screenshots/design-proposal/current-index-nav-360.jpg`

2. **跑馬燈改為靜態關鍵詞列**
   原因：(a) 不停移動的字同品牌「安靜」的感覺相反；(b) 沒有 `prefers-reduced-motion` 處理；(c) 內容重複兩次、溢出靠 `overflow-x: hidden` 收起。
   → 同一組字只出現一次，置中換行排列（文案不變）。

3. **閱讀節奏與層次**
   - Hero `min-height: 100vh` 加上 40vw 的「隙」字，手機第一屏幾乎只有標題；改為 `min(88svh, 760px)`，手機取消最小高度，讓下一段「探出頭」。
   - 產品卡用 emoji（📖 ✍️ 🧭）做封面、市場卡用國旗 emoji（Windows 會顯示成「TW」「HK」字母）。repo 已有真實封面圖（`images/rain-seller-cover-new.jpg`、`images/manman-cover.jpg`），建議改用；國旗改成細框「TW／HK」標籤。
   - 區段內距統一成 token（桌面 `--space-4xl`、手機 `--space-2xl`），段落最長 34em，內文由 muted 0.85–0.92rem 提到 0.92–1rem，行距 1.9–2。
   - 金句區（「裂縫，是金線進來的地方。」）是全頁情感高點，建議上下多留白（×1.25），並放金線（見 §2）。

### 1.2 選物店 `selection.html`

1. **手機版：選單消失、footer 連結擠成直排**
   `.nav-links` 在手機 `display: none`，無選單；footer 六個連結 `display:flex` 無 `flex-wrap`，360px 下每個字被擠成兩行直排（「首／頁」「緩坡電／台」）。
   截圖：`current-selection-footer-360.jpg`
   → 統一手機選單；footer 改用全站共用 footer（§4）或至少加 `flex-wrap: wrap`。

2. **Hero 標題用漸層文字 + 8px 字距**
   `background-clip: text` 由內文色漸變到 Rainforest，對比度不穩定、亦不在品牌規範內；中文 `letter-spacing: 8px` 令標題散開，閱讀節奏斷裂。背景圖 `hero-kintsugi.jpg` 蓋了 80–95% ivory，幾乎看不見卻仍要下載。
   → 標題用實色 `--color-heading`、字距 0.08em 左右；背景圖二選一：真正露出（遮罩只放文字後），或移除。

3. **間距與形狀不跟全站**
   全頁寫死 px（20／30／40／60／100px），側邊距手機 20px（其他頁 1.5rem）；卡片圓角 12px、按鈕 6px，而首頁／關於是直角。
   → 換成 `--space-*`／`--radius-*` token；圓角統一（建議直角或 `--radius-sm`，需要你決定，見 §6）。手機版 2×2 預覽圖 `order: -1` 放在文字前，會把說明推到很下，建議改回文字先行。

### 1.3 品牌金線 `golden-thread/index.html`

1. **太暗、太重**
   六個區塊中 hero、features、AI 區、footer 是深綠底，再加上 highlight-box 與 featured 價錢卡，整頁大半是深色——同 CLAUDE.md「溫暖、通透，唔係沉重或暗黑」相反。
   → Hero 與 features 改 ivory／white 底；全頁只保留**一個**深色區塊（建議 featured 價錢卡，或 AI 區二選一）。

2. **字重不符品牌**
   `h1` 600、價錢 700、按鈕 600；頁面只載入 Noto Sans TC 300/400/500/700，600 會被合成，且品牌規範以 Light 300 為主、400/500 做層次。
   → 標題 300/400，價錢改 Montserrat 300，按鈕 500。

3. **沒有導航、按鈕狀態誤導**
   全頁無 nav，無法返回網站其他頁；三個「即將推出」用了主要／次要按鈕的外觀但不能按。手機版 feature 卡 6 張、每張有大 emoji，捲動很長。
   → 加入統一 nav；「即將推出」改成狀態標籤（非按鈕樣式）；手機 feature 卡改為兩欄小卡或去掉 emoji。

### 1.4 關於 `about.html`

1. **Hero 過高**
   100vh 只放一個標題兩行字，手機第一屏甚麼都看不到。→ 同首頁，`min(80svh, 720px)`，手機取消。

2. **創辦人段落閱讀舒適度**
   0.92rem、muted 色、行距 2.1，長段落在淺底上偏灰偏細。→ 內文 1rem、用 `--color-text`（非 muted）、每行最長 34em；證書標籤「Self-Coaching Cards® Licensed Facilitator #26120SC」在 360px 會斷成三行，可改為直排清單。

3. **手機無選單、footer 跟首頁不一致**
   手機同樣 `.nav-links { display: none }`；footer 是單行版，與首頁三欄 footer 不同。→ 統一 nav 與 footer（§3、§4）。

### 1.5 寫作 `writing/index.html`

1. **層次太平**
   五張作品卡同一大小、同一重量；「已完成五部長篇作品」（原「已出版長篇（五部）」）是最重要的入口，卻與「即將連載」同級。→ 主卡佔滿一行（`grid-column: 1 / -1`），其餘四張兩欄；「寫作中」「即將連載」改為小狀態標籤。

2. **分隔線過多、節奏像表格**
   每段 `section + section` 都有 border-top，「作者手記」「追蹤」各只有一行字卻各佔一整段落高度。→ 去掉段與段之間的線，改用留白；兩個短段在視覺上併成一組（兩欄並排，文案不變）。

3. **手機無選單**
   同上。另外 `.lede` 可以再大一級（1.15rem）作為全頁引言，建立「標題 → 引言 → 作品」三層。

---

## 2. 「金線」點綴方案

### 2.1 顏色

✅ 已確認用兩個深淺（已避開禁用的 `#C9A84C`、`#C9A962`、`#C67D4A`）：

| Token | 值 | 用在 | 對比度 |
|---|---|---|---|
| `--color-gold-thread-on-light` | `#86672A` 沉金 | Ivory／White 底 | Ivory 4.61:1、White 5.27:1 |
| `--color-gold-thread-on-dark` | `#D4B872` 淺金 | Rainforest 深綠底 | Rainforest 6.14:1 |

兩者**只用於線條同細小點綴**，不用於文字。`css/tokens.css` 現有的 `--color-gold-thread`（預留，暫等於 River Stone）正式套用時建議改為這兩個 token（刪除舊名，避免混用）。

`on-light`（`#86672A`）對各種淺色底：

| 背景 | 對比度 | 可用於 |
|---|---|---|
| Ivory `#F5EFE6` | **4.61:1** | 細線、圖形、必要時小字（≥ 4.5:1） |
| White `#FFFFFF` | **5.27:1** | 同上 |
| surface-alt（River Stone 10%） | 4.17:1 | 只可用於線條／圖形（≥ 3:1） |
| Rainforest `#004030` | 2.24:1 ✗ | 不用——深綠底改用 `on-dark` |

候選比較：`#8A6A1F` 4.41:1（小字不過）、`#7E6224` 5.02:1（較暗、偏啡）、`#A0803A` 3.26:1（只可做線）。`#86672A` 是仍保持「金」的感覺、同時過 4.5:1 的最亮一個。

`on-dark`（`#D4B872`）對 Ivory 只有 1.69:1，所以兩個值**不可以互換**：淺底一定用 `on-light`，深綠底一定用 `on-dark`。

### 2.2 使用位置（全站 5 處，其餘地方一律不用）

| # | 頁面 | 位置 | 形式 | 預覽 |
|---|---|---|---|---|
| ① | 首頁 | Hero 標題「品牌金線」下方 | 1.5px 手繪曲線（SVG） | ✅ 已套用 |
| ② | 首頁 | 金句「裂縫，是金線進來的地方。」下方分隔 | 120px 裂縫形折線，取代現有 50px River Stone 直線 | ✅ 已套用 |
| ③ | 關於 | 「隙光」分隔線（`.divider-line` 兩條） | 1px 直線 | — |
| ④ | 關於 | 創辦人金句卡「裂縫不需要被修好……」左邊 | 2px 左邊框 | — |
| ⑤ | 金線頁 | 「什麼是金繼哲學？」標題下（該區需保持 ivory 底） | 48px 短線 | — |
| ~~⑥~~ | 首頁 | ~~「品牌金線自我教練卡」文字封面書名下~~ | — | 已取消：改用真實封面 |

使用規則：
- 只用於**線條／圖形**，線寬 1–2px；不用於內文、標題文字、按鈕、背景色塊、卡片底色。
- ①–⑤ 都在淺底，用 `on-light`。`on-dark`（#D4B872）現時沒有使用位置，保留 token 以備日後深綠底需要時用；workshop、footer 等深綠區塊暫不放金線。
- 不加漸層、光暈、閃爍動畫；不用於 Logo（Logo 只可 Rainforest／黑／白）。
- 批准後才把值寫入 `css/tokens.css`（現時預覽在頁內覆寫 token）。

### 2.3 深綠底金線（`on-dark`）

原本用於「品牌金線自我教練卡」文字封面（位置 ⑥）。該產品已有真實封面，文字封面及位置 ⑥ 取消。`--color-gold-thread-on-dark: #D4B872`（對 Rainforest 6.14:1）保留為 token，日後深綠底如需金線，先列位置再用。

---

## 3. 手機版導航

### 3.1 現況問題

| 頁面 | 問題 |
|---|---|
| `index.html`、`about.html`、`writing/index.html` | 768px 以下 `.nav-links { display: none; }`，**完全沒有選單**，亦沒有漢堡按鈕 |
| `selection.html` | 同樣整組隱藏；另外頁內用的是另一套 nav（首頁／選物／電台／課程／寫作） |
| `book.html` | 5 個連結 + 180px logo 在 360px 放不下，**換成兩行**（截圖：`current-book-nav-360.jpg`）；連結字 0.75rem、點擊範圍不足 48px |
| `golden-thread/index.html` | 沒有 nav |
| 全站 | 兩套互不相通的 nav（AUDIT.md §3.2）；`shop/`、`workshop/` 目錄不存在（404） |

### 3.2 建議的統一做法（已在 preview 實作）

- **結構**：一個 `<nav aria-label="主選單">`，內含 logo、`<button class="nav-toggle" aria-expanded aria-controls>`（圖示 + 文字「選單」）、`<ul id="nav-links">`。所有頁面用同一段 HTML／CSS。
- **手機（≤ 768px）**：按鈕在右；展開後在 nav 下方出現**全寬面板**（非側邊抽屜），連結直排、每行最少 48px 高、字 1rem；「預約諮詢」放最底，全寬次要按鈕。
- **互動**：按鈕文字「選單／關閉」切換；`Esc` 關閉並把焦點還給按鈕；點連結後自動關閉；回到桌面寬度自動關閉。
- **無 JS 後備**：沒有 JS 時選單直接直排顯示在 logo 下方，不會消失。
- **桌面**：保持現有橫排。
- **尊重** `prefers-reduced-motion`。
- 批准後建議抽成 `css/site-nav.css` + `js/site-nav.js` 共用（仍是純 HTML/CSS/JS，無 build 工具）。

nav 的**項目本身**（兩套 nav 合一、`shop/`／`workshop/` 404 的去向）是資訊架構決定，見 §6。預覽保留首頁現有 6 個項目及連結，未作更改。

---

## 4. `color-scheme` 檢查

> 更新：提案初稿時全站 0 處；其後 PR #8（已合併入 main）已加入。

現況（main）：
- `css/tokens.css` 的 `:root` 已有 `color-scheme: only light;`
- 16 個 HTML 頁面已有 `<meta name="color-scheme" content="only light">`
- **`writing/index.html` 未有 meta**（CSS 經 tokens.css 已生效，但 meta 能令瀏覽器在 CSS 載入前就用淺色，避免閃一下深色）→ 建議補上一行
- `preview/home-v2.html` 兩處都有

原因：網站只有淺色設計；未聲明時，部分瀏覽器（例如 Android Chrome 強制深色、Samsung Internet）會自動反色，令 Ivory 底變深、Logo 及 Rainforest 文字對比失效。

---

## 5. Footer 社交連結

新增一欄「追蹤我們」（預覽已套用）：

| 平台 | 顯示 | 連結 |
|---|---|---|
| Instagram | Instagram | `https://www.instagram.com/spacebetweenstudiohk/` |
| Threads | Threads | `https://www.threads.com/@spacebetweenstudiohk` |
| Facebook | Facebook | **網址待提供**（專頁名稱「Space Between Studio｜隙光」）——提供前以純文字顯示，不放 `href="#"` |

- 圖示用 1.5px 線條 SVG、跟隨文字色（深綠底上用 Ivory／inverse-muted），不用平台彩色 logo。
- 連結加 `target="_blank" rel="noopener"` 及 `aria-label`（含帳號名稱與「新視窗」）。
- 同時建議把 IG、Threads（及日後 Facebook）加入首頁 Organization JSON-LD 的 `sameAs`；預覽頁已示範，JSON 已驗證有效。
- 注意：`writing/` 及 `llms.txt` 的 Threads 是作者個人帳號 `@wins_twilight`，與工作室帳號 `@spacebetweenstudiohk` 不同，兩者並存，不互相取代。

---

## 6. 需要你決定的事項

1. ~~金線顏色~~ ✅ 已定（兩個深淺）。§2.2 的 5 個位置是否全部保留？
2. **導航項目統一**：兩套 nav（首頁／關於／寫作／商店／光光工作坊 vs 首頁／選物／電台／課程／寫作）要合併成哪一套？
3. **404 連結**：`shop/`、`shop/rain.html`、`shop/brand.html`、`workshop/` 應指向哪裡（例如 `selection.html`？`workshop-v2.html`？）
4. **Facebook 網址**。
5. **圓角**：全站統一直角，還是統一 `--radius-sm`（4px）？（selection／golden-thread 現在 8–20px）
6. **golden-thread 保留哪一個深色區塊**：featured 價錢卡，還是「認識光光」AI 區？
7. ~~文字封面上的金線~~ ✅ 已定：`#D4B872`。
8. **跑馬燈改靜態**：是否同意？
9. ~~各書版本~~ ✅ 所有書暫時只有電子版、未正式出版：`bookFormat` 一律 `https://schema.org/EBook`；待出版的《拾味小館》及未連載的《還是要走》不加。
10. ~~`site-covers.zip`~~ ✅ 已解壓並刪除。
11. ~~五本書名~~ ✅ 《逐光的藥師》《違章靈魂改建事務所》《心宅：禁室》《賣雨的人》《拾味小館》；《拾味小館》標籤由「寫作中」改為「待出版」。
12. ~~`publisher`~~ ✅ 全部移除。
13. ~~《慢慢成為自己的品牌》放 /writing？~~ ✅ 不放，只保留在 selection。
14. ~~《賣雨的人》封面~~ ✅ 全站改用新封面（雨瓶）。
15. 各書封面稍後會加 Logo 再重新上傳覆蓋同名檔案；覆蓋後頁面無需改動（檔名、尺寸不變的前提下）。

## 7. 改了甚麼／沒改甚麼

**新增**
- `DESIGN_PROPOSAL.md`
- `preview/home-v2.html`：套用 §1.1、§2（位置 ①②）、§3、§4、§5；另加 skip link、`:focus-visible`、`prefers-reduced-motion`、48px 點擊範圍。
- `docs/screenshots/design-proposal/`：`home-v2-{360,768,1280}.jpg`、`home-v2-360-menu.jpg`、`current-index-nav-360.jpg`、`current-book-nav-360.jpg`、`current-selection-footer-360.jpg`

**第二輪（封面）新增／更改**
- `preview/home-v2.html`：產品卡封面（§8.1）、文字封面、價錢格式、手機左圖右文
- 本文件：§2.3、§4 更新、§8
- 將 main 合併入本分支（帶入 PR #8）

**第三輪（site-covers）新增／更改**
- 解壓 `site-covers.zip`：`assets/covers/`（12 個 WebP）、`assets/og/`（6 個 JPG）、`docs/site-covers/`（snippet 及 JSON-LD 原檔）；刪除 `site-covers.zip`
- `preview/home-v2.html`：封面換 WebP + srcset；金線 token 改為 `on-light`／`on-dark`
- 新增 `preview/writing-v2.html`（書架＋合併 JSON-LD）
- 本文件：§2、§6、§8 更新

**第四輪（封面確認）新增／更改**——⚠️ 這一輪按指示**有改正式頁面**：
- `index.html`：《賣雨的人》產品卡的 📖 換成新封面（`assets/covers/mai-yu-de-ren-400/800.webp`），新增 `.product-cover-img` 樣式；另外兩張卡未改（仍是 emoji）
- `selection.html`：《賣雨的人》產品圖換新封面（WebP + srcset，完整顯示不裁切）；`og:image` 由相對路徑的舊封面改為 `https://spacebetweenstudio.site/assets/og/mai-yu-de-ren-og.jpg`，加 width／height／alt
- `audiobook/rain-seller/index.html`：專輯封面換新封面
- 新增 `assets/covers/pin-pai-jin-xian-zi-wo-jiao-lian-ka-400/800.webp`（品牌金線自我教練卡封面）
- `preview/home-v2.html`：自我教練卡改用真實封面，移除文字封面
- `preview/writing-v2.html`：移除《慢慢成為自己的品牌》；JSON-LD 移除所有 `publisher` 及《慢慢》節點
- 未改：`images/rain-seller-cover-new.jpg` 檔案保留（未刪）；`selection.html` 的組合圖（`bundle-mockup.jpg`）及預覽區章節插圖 `ch9-rainseller.jpg` 不是封面，未換

**第五輪（電子版確認、selection 細節）**——有改正式頁面：
- 全站「已出版五部長篇」→「已完成五部長篇作品」、「已出版長篇（五部）」→「已完成五部長篇作品」：`writing/index.html`（meta description、og、twitter、JSON-LD、引言、作品卡標題）、`llms.txt`、`preview/writing-v2.html`
- JSON-LD `bookFormat: https://schema.org/EBook`：`index.html`（《賣雨的人》《慢慢成為自己的品牌》）、`writing/index.html`（《賣雨的人》）、`preview/writing-v2.html`（四本完成的書）；Draft 的不加
- `selection.html`：《慢慢成為自己的品牌》換新封面，完整顯示；「互動式電子書」「可填寫工作手冊」標籤由封面上移到卡片文字區；📱🔐💬🎁 換成 inline 單線 SVG（1.5px、Rainforest、28px／標題內 24px）
- 「AI 給我的第一桶金」保留文字封面（待插畫）——第六輪已換成插畫封面

**第六輪（五部書名、第一桶金封面）**——有改正式頁面：
- 新增 `assets/covers/ai-gei-wo-de-di-yi-tong-jin-400/800.webp`；`selection.html`《AI 給我的第一桶金》文字封面換成插畫封面（完整顯示），刪除已無用的產品圖 Logo 樣式
- 《拾味小館》「寫作中」→「待出版」：`writing/index.html`（作品卡、JSON-LD description）、`llms.txt`、`preview/writing-v2.html`
- `preview/writing-v2.html`：五部書同一排（桌面 5 欄），取消「作品」分區

**沒有改（第一至三輪）**
- 任何現有頁面、`css/tokens.css`、`css/brand-logo.css`、`llms.txt`、`robots.txt`、JSON-LD。
- 預覽頁的文案與首頁一致，沒有改字；唯一的顯示變化是國旗 emoji 換成「TW」「HK」（該兩個代碼已在原文「TW × HK」出現），以及新增的「追蹤我們」欄及預覽提示條。
- 預覽頁連結保持與首頁相同（包括仍然 404 的 `shop/`、`workshop/`，以及 footer「LINE（台灣）」的 `href="#"`），待 §6 決定後才改。

**未能驗證**
- 未跑 Lighthouse（環境未安裝）。已人手檢查：所有圖片有 alt、landmark（nav／main／footer）、標題層級、按鈕 `aria-expanded`、所有文字對比 ≥ 4.5:1。

---

## 8. 封面應用

### 8.1 首頁產品卡（已在 preview 套用）

- 「賣雨的人」「慢慢成為自己的品牌」用真實封面，封面比例 2:3 直身。
- **桌面／平板**：卡片上半是淺色封面框，封面置中、約 60% 闊，有淡陰影。
- **手機（≤ 560px）**：改為**左圖右文**。封面欄佔 40%，文字在右；簡介最多 3 行（`line-clamp`），價錢與「立即閱讀」上下排。每張卡約 250px 高；如果改為封面置中 60%，每張卡會超過 600px，三張就要捲兩屏多，所以不建議。
- 「品牌金線自我教練卡」已有真實封面（`assets/covers/pin-pai-jin-xian-zi-wo-jiao-lian-ka-400/800.webp`，2:3，封面本身已含 Logo），取代之前的文字封面。「即將推出」標籤放在封面框上，手機版移到封面下方。
- 價錢改為「HKD 68｜約 TWD 280」「HKD 168｜約 TWD 680」。
- 封面用 `assets/covers/` 的 WebP（400×600／800×1200，`srcset` + `sizes`），alt 沿用 `writing-snippet.html` 的描述。首頁兩張封面合共約 97KB（400w），比之前用的 `images/` 原圖（560KB + 190KB）輕得多。
- 《賣雨的人》已確認全站改用新封面（雨瓶），`index.html`、`selection.html`、`audiobook/rain-seller/` 已更新（見 §7 第四輪）。

### 8.2 /writing 改成書架形式（預覽：`preview/writing-v2.html`）

`site-covers.zip` 已解壓：封面 → `assets/covers/`（6 本 × 400／800 WebP），og 圖 → `assets/og/`（6 張 1200×630 JPG），`writing-snippet.html` 及 `writing-jsonld.json` 原檔存於 `docs/site-covers/` 作參考；repo 內的 zip 已刪除。

**版面**
- 上方維持「關於隙光」＋引言（引言放大一級）。
- **「已完成五部長篇作品」**（原「已出版長篇（五部）」）：一排五本——《逐光的藥師》《違章靈魂改建事務所》《心宅：禁室》《賣雨的人》《拾味小館》，標題旁保留「前往 space-between.art 閱讀」。桌面 5 欄。
- 原本的「作品」分區已取消（《賣雨的人》《拾味小館》併入上面一排）。《慢慢成為自己的品牌》不放 /writing，只保留在 selection。
- **《拾味小館》標示「待出版」**：封面左下角「待出版」標籤，下方狀態「待出版」＋「登記出版通知」；JSON-LD `description: 待出版`，維持 `creativeWorkStatus: Draft`（未出版），**不加 `bookFormat`**。
- 未有封面的《渡口區生活誌》《還是要走》改為兩張細卡片；「作者手記」「追蹤」兩欄並排，去掉段與段之間的分隔線。
- 書架：封面 2:3、淡陰影，每排底部一條 1px 線當「書架底板」；桌面 4 欄、平板 3 欄、手機 2 欄。
- 文案全部沿用現有 /writing；新增的只有 zip 提供的書名、英文副題及封面 alt。
- 片段內的路徑是 `/assets/...`（根目錄絕對路徑）；預覽改用 `../assets/...` 以便本機開啟，正式頁面兩種都可以。

**JSON-LD 合併**（預覽頁 `<head>` 內，已用 JSON parser 驗證）
- 以 `writing/index.html` 現有 `@graph` 為基礎：Person 保留原 `@id`（`/writing/#xiguang`）、`description`、`url`、`sameAs`；只加 zip 的 `alternateName: Xiguang`、`jobTitle`、`worksFor`。zip 用的是另一個 `@id`（`/about#xiguang`），沒有採用，避免同一人出現兩個節點。
- 《賣雨的人》保留原 `description`、`url`（selection.html），加 `alternateName`、`image`。
- 新增《逐光的藥師》《違章靈魂改建事務所》《心宅：禁室》三個 Book 節點（`image`、`alternateName`）。
- 《拾味小館》保留 `creativeWorkStatus: Draft`；`description` 由「寫作中」改為「待出版」；只加 `alternateName`、`image`；不加 `bookFormat`。
- **不寫 `publisher`**（已確認全部移除）。
- 《還是要走》《渡口區生活誌》原樣保留（zip 沒有這兩項）。
- 新增 zip 的 Organization（`/#studio`）及 CollectionPage + ItemList，但 ItemList 只用 `@id` 引用上面的節點，不重複寫書目資料；`url` 用現有 canonical `/writing/`（有斜線）。
- `bookFormat`：zip 原本把 5 本標為 Paperback；已確認暫時只有電子版，完成的書一律 `https://schema.org/EBook`。《拾味小館》《還是要走》（Draft）不加。

### 8.3 og:image 套用

| 頁面 | 現時 og:image | 建議 |
|---|---|---|
| `selection.html` | ✅ 已改為 `https://spacebetweenstudio.site/assets/og/mai-yu-de-ren-og.jpg`（原本是相對路徑的舊封面） | — |
| `ebook/rain-seller/`、`audiobook/rain-seller/`、`ebook/manman/` | 無 og；有 `noindex`（付費閱讀頁） | **不加**——付費頁不應被分享預覽；分享入口應是公開介紹頁 |
| `book.html`（《AI 給我的第一桶金》） | 品牌 og（絕對網址 ✓） | zip 沒有此書 og，維持 |
| 將來的公開書頁（例如 `shop/rain.html`、`shop/brand.html`，現時 404） | — | `mai-yu-de-ren-og.jpg`、`man-man-cheng-wei-zi-ji-de-pin-pai-og.jpg` |
| 將來每本小說的介紹頁（或 `/writing/#slug` 分享） | — | `zhu-guang-de-yao-shi-og.jpg`、`wei-zhang-ling-hun-gai-jian-shi-wu-suo-og.jpg`、`xin-zhai-jin-shi-og.jpg`、`shi-wei-xiao-guan-og.jpg`（《拾味小館》og 圖的文案亦只可寫「待出版」） |
| `writing/` | 品牌 og（絕對網址 ✓） | zip 片段示範用 `zhu-guang-de-yao-shi-og.jpg`（alt「小說《逐光的藥師》— 隙光」）；預覽已套用。另一做法是維持品牌 og，由你決定 |

規則：一律用 `https://spacebetweenstudio.site/...` 絕對網址；同時加 `og:image:width`／`og:image:height`／`og:image:alt`，`twitter:card` 用 `summary_large_image`。付費／閘門頁（有 `noindex`）不需要 og 圖。

---

## 9. 其他頁面的 emoji icon（只列出，未改）

`selection.html` 已全部換成單線 SVG（只餘預覽區清單的 `✦` 項目符號，屬排版符號，未改）。其他頁面：

| 頁面 | emoji | 用途 |
|---|---|---|
| `index.html` | ✍️ 🧭（產品卡封面）、🇹🇼 🇭🇰（市場卡）、✦ ×16（跑馬燈分隔） | 產品封面、國旗、分隔符 |
| `golden-thread/index.html` | 📖 ✍️ 📋 🎨 🎬 🤖（feature 卡）、🌟（光光頭像）、💬（WhatsApp 按鈕）、💰（價錢清單）、✓（清單符號） | feature icon、按鈕 |
| `golden-thread-landing.html` | 📖 ✍️ 🎯 🤖 🗣️ ⏰ 📚 ✨、✓ | feature icon |
| `course.html` | 🪞 ✨ 🎯 | feature icon |
| `podcast.html` | 🎧 📄 | icon |
| `tips.html` | 📄 ✨ | icon |
| `book.html` | ✕ | 關閉按鈕 |
| `audiobook/rain-seller/` | ⏮ ⏭ ⏸ | 播放器控制（功能按鈕，換 SVG 時要保留 `aria-label`） |
| `ebook/rain-seller/` | ✕、✨ | 關閉按鈕、點綴 |
| `ebook/manman/` | ☰、📝 ×10、🎯、✨ ×10、👣、📋、✦ ×51 | 選單按鈕、練習標記 |
| `resource-hub/index.html` | 🔐 📦 ✨ 🚀 📋 🎨 🎬 🔗 💡 📝 🌟、💬 ×14 | 標題及按鈕 icon |
| `workshop-v2.html`、`workshop-full.html` | 約 35 種（🧵 🏺 🌟 💬 🎯 🎨 🎬 📖 📅 ☕ 🍵 🎉 …，每頁 100+ 個） | 大量 UI icon |

建議：將 selection 用的 SVG 抽成共用 icon 集（例如 `assets/icons/*.svg` 或頁內 `<symbol>` sprite），按頁面優先次序替換：`golden-thread/` → `course`／`podcast`／`tips` → `index` → 播放器／關閉按鈕（功能性，需保留無障礙標籤）→ workshop 兩頁（量最大，建議整頁重做時一併處理）。
