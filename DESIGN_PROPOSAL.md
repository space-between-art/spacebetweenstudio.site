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
| 2 | 金線 `--color-gold-thread` | tokens.css 已預留，暫時等於 River Stone | **#86672A**（對 Ivory 4.61:1），全站只用 5 個位置 |
| 3 | 手機導航 | 3 頁手機版**完全無選單**；book.html 換成兩行；selection footer 擠爆 | 統一「選單」按鈕 + nav 下方全寬面板 |
| 4 | `color-scheme` | **全站都沒有** | 加 `<meta name="color-scheme" content="only light">` 及 `:root { color-scheme: only light; }` |
| 5 | Footer 社交連結 | 沒有 | 新增「追蹤我們」欄：Instagram、Threads、Facebook（網址待提供） |

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
   五張作品卡同一大小、同一重量；「已出版長篇（五部）」是最重要的入口，卻與「即將連載」同級。→ 主卡佔滿一行（`grid-column: 1 / -1`），其餘四張兩欄；「寫作中」「即將連載」改為小狀態標籤。

2. **分隔線過多、節奏像表格**
   每段 `section + section` 都有 border-top，「作者手記」「追蹤」各只有一行字卻各佔一整段落高度。→ 去掉段與段之間的線，改用留白；兩個短段在視覺上併成一組（兩欄並排，文案不變）。

3. **手機無選單**
   同上。另外 `.lede` 可以再大一級（1.15rem）作為全頁引言，建立「標題 → 引言 → 作品」三層。

---

## 2. 「金線」點綴方案

### 2.1 顏色

建議 `--color-gold-thread: #86672A`（沉金／古金）。已避開禁用的 `#C9A84C`、`#C9A962`、`#C67D4A`。

| 背景 | 對比度 | 可用於 |
|---|---|---|
| Ivory `#F5EFE6` | **4.61:1** | 細線、圖形、必要時小字（≥ 4.5:1） |
| White `#FFFFFF` | **5.27:1** | 同上 |
| surface-alt（River Stone 10%） | 4.17:1 | 只可用於線條／圖形（≥ 3:1） |
| Rainforest `#004030` | 2.24:1 ✗ | **不可用**（深綠區塊內不放金線） |

候選比較：`#8A6A1F` 4.41:1（小字不過）、`#7E6224` 5.02:1（較暗、偏啡）、`#A0803A` 3.26:1（只可做線）。`#86672A` 是仍保持「金」的感覺、同時過 4.5:1 的最亮一個。

如果日後需要深綠底上的金線，另需淺金（例如 `#D4B872`，對 Rainforest 6.14:1），但它對 Ivory 只有 1.69:1，兩個值不可以共用同一 token——**這是另一個決定，本提案不建議加**。

### 2.2 使用位置（全站 5 處，其餘地方一律不用）

| # | 頁面 | 位置 | 形式 | 預覽 |
|---|---|---|---|---|
| ① | 首頁 | Hero 標題「品牌金線」下方 | 1.5px 手繪曲線（SVG） | ✅ 已套用 |
| ② | 首頁 | 金句「裂縫，是金線進來的地方。」下方分隔 | 120px 裂縫形折線，取代現有 50px River Stone 直線 | ✅ 已套用 |
| ③ | 關於 | 「隙光」分隔線（`.divider-line` 兩條） | 1px 直線 | — |
| ④ | 關於 | 創辦人金句卡「裂縫不需要被修好……」左邊 | 2px 左邊框 | — |
| ⑤ | 金線頁 | 「什麼是金繼哲學？」標題下（該區需保持 ivory 底） | 48px 短線 | — |

使用規則：
- 只用於**線條／圖形**，線寬 1–2px；不用於內文、標題文字、按鈕、背景色塊、卡片底色。
- 只放在 Ivory／White 底上；深綠區塊（workshop、footer 等）不放。
- 不加漸層、光暈、閃爍動畫；不用於 Logo（Logo 只可 Rainforest／黑／白）。
- 批准後才把值寫入 `css/tokens.css`（現時預覽在頁內覆寫 token）。

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

全站搜尋 `color-scheme`：**0 個結果**（所有 `.html` 及 `css/`）。

建議加入（兩處都加）：

```html
<meta name="color-scheme" content="only light">
```
```css
/* css/tokens.css */
:root { color-scheme: only light; }
```

原因：網站只有淺色設計；未聲明時，部分瀏覽器（例如 Android Chrome 強制深色、Samsung Internet）會自動反色，令 Ivory 底變深、Logo 及 Rainforest 文字對比失效；表單控件及捲動條亦會跟系統深色。預覽已套用。

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

1. **金線顏色**：是否接受 `#86672A`？以及 §2.2 的 5 個位置（可刪減）。
2. **導航項目統一**：兩套 nav（首頁／關於／寫作／商店／光光工作坊 vs 首頁／選物／電台／課程／寫作）要合併成哪一套？
3. **404 連結**：`shop/`、`shop/rain.html`、`shop/brand.html`、`workshop/` 應指向哪裡（例如 `selection.html`？`workshop-v2.html`？）
4. **Facebook 網址**。
5. **圓角**：全站統一直角，還是統一 `--radius-sm`（4px）？（selection／golden-thread 現在 8–20px）
6. **golden-thread 保留哪一個深色區塊**：featured 價錢卡，還是「認識光光」AI 區？
7. **首頁產品卡改用真實封面圖**：「品牌金線自我教練卡」暫時沒有圖，預覽用空白底 + 「即將推出」標籤，是否可以？
8. **跑馬燈改靜態**：是否同意？

## 7. 改了甚麼／沒改甚麼

**新增**
- `DESIGN_PROPOSAL.md`
- `preview/home-v2.html`：套用 §1.1、§2（位置 ①②）、§3、§4、§5；另加 skip link、`:focus-visible`、`prefers-reduced-motion`、48px 點擊範圍。
- `docs/screenshots/design-proposal/`：`home-v2-{360,768,1280}.jpg`、`home-v2-360-menu.jpg`、`current-index-nav-360.jpg`、`current-book-nav-360.jpg`、`current-selection-footer-360.jpg`

**沒有改**
- 任何現有頁面、`css/tokens.css`、`css/brand-logo.css`、`llms.txt`、`robots.txt`、JSON-LD。
- 預覽頁的文案與首頁一致，沒有改字；唯一的顯示變化是國旗 emoji 換成「TW」「HK」（該兩個代碼已在原文「TW × HK」出現），以及新增的「追蹤我們」欄及預覽提示條。
- 預覽頁連結保持與首頁相同（包括仍然 404 的 `shop/`、`workshop/`，以及 footer「LINE（台灣）」的 `href="#"`），待 §6 決定後才改。

**未能驗證**
- 未跑 Lighthouse（環境未安裝）。已人手檢查：所有圖片有 alt、landmark（nav／main／footer）、標題層級、按鈕 `aria-expanded`、所有文字對比 ≥ 4.5:1。
