# Repo 審查報告（AUDIT）

> 審查日期：2026-09-24
> 範圍：`space-between-art/spacebetweenstudio.site`（90 個追蹤檔案）＋ `space-between-art/space-between.art`（只有 1 個 README）
> 方法：逐頁閱讀全部 HTML／CSS／JS／JSON，再用腳本交叉檢查連結、圖片引用、MD5 重複、色彩、字體及 WCAG 對比度。
> 這份報告**只記錄問題，沒有改動其他任何檔案**。

---

## 0. 先說明：找不到 CLAUDE.md，也找不到「v1.1」規範

- 兩個 repo 的所有分支（`main`、`cloudflare/workers-autoconfig`、`codex/create-prd-for-safe-start-mvp`、`archive/pre-sites-2026-08-19`）都**沒有 `CLAUDE.md`**，全庫搜尋 `v1.1` 也沒有結果。
- 所以第 3 節「不符合 v1.1」**沒辦法對照正式規範逐條驗證**。我暫時以最新修改的頁面（`index.html`、`about.html`，2026-06-01 更新的淺色「cream / earth / gold ＋ Cormorant Garamond」系統）當作**推定的 v1.1 基準**，把偏離這套系統的地方列出來。如果 v1.1 另有文件（例如 Notion 或 Figma 上的品牌指南），請提供，我再按正式規範重新對照。
- `space-between.art` repo 只有 Google AI Studio 範本 README（`<h1>` 用 `</h2>` 結尾，標籤不匹配），沒有網站代碼。以下內容都針對 `spacebetweenstudio.site`。

---

## 1. 重複或無用的代碼／檔案

### 1.1 內容完全相同的檔案（MD5 一致）

| 重複組 | 檔案 | 說明 |
|---|---|---|
| HTML | `golden-thread-landing.html` ≡ `golden-thread-website-package/golden-thread-landing.html` | 同一頁出現兩份，而且兩份都可以被搜尋引擎收錄 |
| 圖片 | `book-cover.png` ≡ `golden-thread-website-package/images/book-cover.png` | |
| 圖片 | `guangguang-avatar.png` ≡ `golden-thread-website-package/images/guangguang-avatar.png` | |
| 圖片 | `hero-bg.png` ≡ `golden-thread-website-package/images/hero-bg.png` | |
| 圖片 | `images/ch1-laboratory.jpg` ≡ `ebook/rain-seller/images/ch1.jpg` | |
| 圖片 | `images/ch2-workshop.jpg` ≡ `ebook/rain-seller/images/ch2.jpg` | |
| 圖片 | `images/ch3-shadow.jpg` ≡ `ebook/rain-seller/images/ch3.jpg` | |
| 圖片 | `images/ch9-rainseller.jpg` ≡ `ebook/rain-seller/images/ch9.jpg` | |
| 圖片 | `images/rain-seller-cover-new.jpg` ≡ `ebook/rain-seller/images/book-cover.jpg` | |
| 圖片（3 份） | `images/hero-kintsugi.jpg` ≡ `images/bundle-mockup.jpg` ≡ `ebook/rain-seller/images/cover.jpg` | 「組合 mockup」其實就是金繼 hero 圖，內容有誤 |
| 圖片（3 份） | `images/books-shelf.png` ≡ `images/bundle-bg.png` ≡ `images/bundle-cover.jpg` | `.jpg` 檔實際上是 PNG |
| 圖片 | `images/hero-bg.jpg` ≡ `images/kintsugi-abstract.png` | 副檔名與實際格式不符 |
| 圖片 | `images/ink-gold.jpg` ≡ `images/inkwash-kintsugi.png` | 同上 |
| 圖片 | `images/kintsugi-bowl.jpg` ≡ `images/kintsugi-hands.png` | 同上，而且檔名描述的是兩張不同的圖 |

### 1.2 幾乎一樣的檔案（手動複製後各自修改）

| 檔案 | 說明 |
|---|---|
| `workshop-v2.html`（86 KB）／`workshop-full.html`（87 KB） | 兩份各有約 2,000 行、大部分相同，差別主要只在閘門（gate）與演示模式。修一個 bug 要改兩次 |
| `resource-hub/index.html`／`golden-thread-website-package/resource-hub.html` | 兩個不同版本的 Resource Hub：前者壓縮成一行、有密語閘門；後者沒有閘門，還有 42 個 `href="#"` 佔位連結 |
| `golden-thread/index.html`／`golden-thread-landing.html` | 同一產品（《找到你的品牌金線》）的兩個 landing page，標題完全相同（`找到你的品牌金線 \| Space Between Studio`），文案與版面不同 |
| `podcast.html`、`course.html`、`tips.html`、`selection.html`、`audiobook/…`、`ebook/rain-seller/…` | 每頁都複製一樣的 `:root`、reset、scrollbar、nav、footer CSS（約 150 行 × 6） |
| `index.html`／`about.html` | nav、`:root`、按鈕、footer、reveal 的 CSS 與 JS 各自複製一份 |

### 1.3 沒有被任何頁面使用的檔案

| 檔案 | 說明 |
|---|---|
| **`css/style.css`**（14 KB） | **沒有任何 HTML `<link>` 它**。裡面有完整的深棕色設計系統（`--bg-dark:#2C2825` 等）、`.nav-toggle`、`.selection-page` 規則，全部都是死代碼 |
| `deploy.sh` | 會從 `../github-deploy-v2/` 複製檔案，這個目錄不在 repo 內；而且它會產生 `workshop.html`，但 repo 裡從來沒有這個檔。腳本看起來從未成功執行 |
| `README.md` | 內容是「Workshop v2 部署包」說明，列出的 `n8n-workshop-gate-hubspot.json`、`DEPLOYMENT-GUIDE.md`、`book-callout-design.md` 都不存在。**它也公開寫出了工作坊的通關密語** |
| `ebook/rain-seller/assets/index.html` | 只有 1 byte 的空檔 |
| `notion/workbook.html` | 跳轉到 `https://www.notion.so/YOUR-TEMPLATE-ID`，是從未替換的佔位符 |
| `audiobook/rain-seller/audio/README.md`、`ebook/downloads/README.md`、`ebook/rain-seller/chapters/README.md` | 只有一行佔位說明；播放器指向的 10 個 MP3 全部不存在 |
| `images/README.md` | 列出的 `sumu-avatar.png` 不存在，也沒有頁面使用 |
| `品牌療癒錦囊.pdf` | 沒有任何頁面連結到它（`tips.html` 說「已發送到你信箱」，但 PDF 就公開放在 repo 根目錄） |
| 根目錄 `book-cover.png`、`guangguang-avatar.png`、`hero-bg.png` | 根目錄的 landing 其實讀取 `images/…`，所以這三個檔沒被用到（見 §4 破圖） |
| `images/` 內未使用的圖片 | `books-shelf.png`、`bundle-bg.png`、`bundle-cover.jpg`、`desk-flatlay.png`、`hero-bg.jpg`、`ink-gold.jpg`、`inkwash-kintsugi.png`、`kintsugi-abstract.png`、`kintsugi-bowl.jpg`、`kintsugi-hands.png`、`manman-mockup.jpg`、`rain-seller-cover.jpg`、`rain-seller-mockup.jpg`、`workbook-mockup.png`、`workshop-flatlay.png`（共約 3.4 MB） |
| `ebook/rain-seller/images/` 未使用 | `book-cover.jpg`、`ch1-synesthesia.jpg`、`ch2-guyan.jpg`、`cover.jpg` |
| `ebook/manman/images/` 未使用 | `ch03-childhood.png`（1.5 MB）、`ch05-tea.png`（2.4 MB）、`divider.png`（1.8 MB）、`tools-deco.png`（2.6 MB），共約 **8.3 MB** |

### 1.4 無用或有問題的代碼片段

- `index.html`：`<html data-region="tw-hk">` 沒有任何 CSS 或 JS 讀取它。
- `index.html`／`about.html`：`.nav-cta` 用了 `!important` 來壓過自己的 `.nav-links a`，可以改用選擇器權重處理。
- `index.html` 第三張產品卡：`style="position:relative;"` 與 `.product-cover { position: relative }` 重複；`.product-badge` 已經是 `position:absolute`，行內又寫一次。
- `selection.html`：自訂的 smooth-scroll JS 與 `html { scroll-behavior: smooth }` 功能重複。
- `tips.html`：`try`／`catch` 兩個分支都顯示「成功」，`response` 從未檢查，`catch` 形同虛設（見 §7）。
- `audiobook/rain-seller/index.html`：`verifyAccess()` 叫「驗證」，但任何 `?token=` 值都會通過（註解自己寫了「簡化驗證」）。
- `ebook/manman/sw.js`：`activate` 沒有刪除舊 cache；`FILES` 刻意略過 ch03／ch05，與 HTML 同步靠人手維護。
- `golden-thread-landing.html`：`.handwritten` 註解寫「Handwritten accent font simulation」，實際只是 Noto Serif TC 斜體（中文字沒有真斜體，瀏覽器會用假斜體）。

---

## 2. 所有寫死的顏色和字體

### 2.1 總覽：repo 裡共有 5 套互不相容的設計系統

| # | 系統 | 使用頁面 | 背景 | 主文字 | 金色 | 淺金 | 字體 |
|---|---|---|---|---|---|---|---|
| A | **淺色 Earth**（推定 v1.1） | `index.html`、`about.html` | `#FAF7F2` / `#F0E9DC` | `#3D3530` | `#C9A962` | `#E2C98A` | Cormorant Garamond + Noto Serif TC + DM Sans |
| B | 深色 Ink | `podcast`、`course`、`tips`、`selection`、`audiobook`、`ebook/rain-seller` | `#08090c` / `#181c24` | `#f5f2eb` | `#C9A962` | `#d4b896` | Cormorant Garamond + Noto Serif TC |
| C | 深色 Ink + Teal（工作坊） | `workshop-v2`、`workshop-full`、`golden-thread/*`、`resource-hub/*` | `#08090C` / `#1a1b1f` 或 `#F5F2EB` | `#F5F2EB` / `#08090C` | `#C9A962` | `#D4BC7D` 或 `#E8D5A3` | Noto Sans TC + Noto Serif TC（package 版另加 Montserrat、Cormorant） |
| D | 純黑出版 | `book.html` | `#0d0d0d` / `#141414` / `#1a1a1a` | `#e8e0d4` | **`#c9a96e`**（與其他頁不同） | `#8a7a56`（dim） | Noto Sans TC + Noto Serif TC |
| E | 奶茶 | `ebook/manman` | `#FAF7F2` / `#E8DFD4` | `#2C2C2C` | `#C9A962` | —（`--tea:#8B7355`） | Noto Serif TC + ZCOOL XiaoWei |
| (F) | 深棕（未使用） | `css/style.css` | `#2C2825` / `#3D3632` / `#4A433D` | `#E8E4DC` | `#C9A962` | `#E8D5A3` | Noto Sans TC + Noto Serif TC |

**同一個顏色有多種寫法：**
- 金色：`#C9A962`（大部分頁面）、`#c9a96e`（book.html）
- 淺金：`#E2C98A`、`#E8D5A3`、`#D4BC7D`、`#d4b896`，另外 `golden-thread-website-package/resource-hub.html` 把 `--gold-light` 定義成 `rgba(201,169,98,0.1)`，名稱相同但意思完全不同
- 米白：`#FAF7F2`、`#F5F2EB`、`#f5f2eb`、`#F5F0E8`
- 深色：`#08090c`、`#0d0d0d`、`#1C1815`、`#2C2825`、`#2C2C2C`
- 灰：`#6b6b6b`、`#6B6358`、`#6b6560`、`#666`、`#888`、`#999`
- 同一名稱在不同頁代表不同顏色：`--cream` 在 A/E 是 `#FAF7F2`，在 B/C 是 `#f5f2eb`，在 F 是 `#F5F0E8`

**沒有任何共用的 token 檔案**：每一頁都在自己的 `<style>` 裡重新定義 `:root`。

### 2.2 各檔案寫死的顏色（不在 `:root`、也沒有用 `var()` 的顏色值）

| 檔案 | 寫死的顏色（出現次數） |
|---|---|
| `index.html`（31 處） | `rgba(201,169,98,…)` 共 11 種透明度（0.03、0.045、0.07、0.1、0.15、0.2、0.25、0.3、0.6）；`rgba(250,247,242,…)` 共 8 種（0.04～0.93）；`rgba(226,201,138,0.6)`；`rgba(61,53,48,0.08)`；`white`；行內 `style="color:var(--cream)"`、`style="opacity:0.75"` |
| `about.html`（15 處） | `rgba(201,169,98,…)` 9 種透明度；`rgba(250,247,242,0.93/0.65/0.4)`；`rgba(240,233,220,0.3)` |
| `selection.html`（15 處） | `rgba(8,9,12,0.4/0.9/0.95/0.98)`；`rgba(201,169,98,…)` 4 種；**行內 `#1a1a2e`、`#16213e`、`#0f3460`、`#f5f2eb`**（第 717–720 行產品 3 的封面，連 font-size 28px 都寫在行內） |
| `book.html`（2 處） | `rgba(13,13,13,0.85)`、`rgba(255,255,255,0.03)`；另有 8 個行內 `style=` 設定字體與顏色 |
| `podcast.html`／`course.html`／`tips.html` | `rgba(8,9,12,0.7/0.95)`、`rgba(201,169,98,0.05/0.1/0.15/0.2)` |
| `audiobook/rain-seller/index.html` | `rgba(201,169,98,0.1)`×2、`rgba(0,0,0,0.5)` |
| `ebook/rain-seller/index.html`（27 處） | `rgba(8,9,12,0.95)`×13、`rgba(8,9,12,0.3)`×11，全部寫在行內 `style="background-image: linear-gradient(…)"`；`rgba(201,169,98,0.1/0.3)` |
| `ebook/manman/index.html`（31 處） | `white`×10、`#C9A962`×3（已有 `--gold` 卻不用）、`#5D4E3D`、`#D4C4B5`、`#D5C5B6`、`rgba(0,0,0,0.1/0.15/0.3)`、`rgba(255,255,255,0.6/0.8/0.95)`、`rgba(250,247,242,0.2/0.9)`、`rgba(201,169,98,…)` 4 種 |
| `ebook/manman/manifest.json` | `#FAF7F2`、`#C9A962`（JSON 不能用 CSS 變數，這裡可以接受，但要與 token 同步） |
| `golden-thread-landing.html`（兩份各 22 處） | `#25D366`、`rgba(37,211,102,0.4)`、`white`×2、`rgba(8,9,12,0.3/0.8)`、`rgba(26,58,58,0.5)`、`rgba(201,169,98,…)` 4 種、`rgba(255,255,255,0.05/0.08)`、`rgba(0,0,0,0.1/0.15/0.2)` |
| `golden-thread/index.html`（16 處） | `#245050`、`#25D366`、`#20bd5a`、`white`×2、`rgba(245,242,235,0.7/0.8)`、`rgba(0,0,0,0.05/0.08/0.12)`；行內 `style="color: var(--gold)…"` |
| `resource-hub/index.html`（48 處、29 種） | `#666`×5、`#fff`×5、`#D4BC7D`×3（已有 `--gold-light` 卻不用）、`#333`、`#000`、`#888`、`#ddd`、`#f0f0f0`、`#e74c3c`、`#7B68EE`、`#9370DB`、`#EDE7F6`、`#5E35B1`、`#25D366`、`#20bd5a`，以及多種 rgba；另有 12 個行內 `style=` |
| `golden-thread-website-package/resource-hub.html`（36 處） | `#00C4CC`×6、`#FFD02F`×5、`#7C3AED`×5、`#FFAB00`×4、`#DAB96D`、`#e74c3c`×2、`#25D366`、`white`×3 等 |
| `workshop-v2.html`（92 處、49 種） | `#333`×7、`white`×9、便利貼 6 色 `#FFF59D #F48FB1 #A5D6A7 #FFCC80 #81D4FA #CE93D8`、`#9B59B6`、`#B39DDB`、`#6B5ACD`、`#20bd5a`、`#ddd #ccc #999 #666 #f9f9f9`（列印樣式）、`#1a3a3a`、`#c9a962`（JS 字串內）、`rgba(255,255,255,…)` 9 種透明度、`rgba(123,104,238,…)` 5 種、`rgba(74,124,89,0.2)`；29 個行內 `style=` |
| `workshop-full.html`（74 處、43 種） | 同上（少了 gate 用的顏色）；46 個行內 `style=` |
| `notion/workbook.html` | `#08090c`、`#f5f2eb`、`#C9A962` 全部寫死，沒有 `:root` |
| `css/style.css`（未使用） | `rgba(201,169,98,…)` 5 種、`rgba(0,0,0,0.3)`、`rgba(44,40,37,0.95)` |

> 最常見的模式是 `rgba(201,169,98,X)`（金色加透明度），全站約 **60 處、13 種透明度**。建議改成 `--gold-rgb: 201 169 98`，再用 `rgb(var(--gold-rgb) / .2)`，或者定義 3～4 個固定的 `--gold-a10/-a20/-a30` token。

### 2.3 寫死的字體

| 檔案 | 字體宣告（寫死次數） | 載入的 Google Fonts |
|---|---|---|
| `index.html` | `'Cormorant Garamond', serif`×10、`'Noto Serif TC', serif`×9、body `'DM Sans','Noto Serif TC',sans-serif` | Cormorant Garamond、Noto Serif TC、DM Sans |
| `about.html` | `'Cormorant Garamond', serif`×10、`'Noto Serif TC', serif`×7、`'DM Sans', sans-serif`×2 | 同上 |
| `selection.html` | `'Cormorant Garamond', serif`×7、`'Noto Serif TC', serif`×2（其中 1 個在行內） | Cormorant Garamond（含 500）、Noto Serif TC |
| `podcast.html`／`course.html`／`tips.html` | `'Cormorant Garamond', serif`×3～4、`'Noto Serif TC', serif`×1 | Cormorant Garamond、Noto Serif TC |
| `book.html` | 用了 `var(--serif)`／`var(--sans)`（唯一有字體 token 的頁面），但 fallback 是 `'Songti TC'`、`'PingFang TC'` | Noto Serif TC、Noto Sans TC |
| `golden-thread-landing.html`（×2） | `'Noto Serif TC', serif`×10、`'Noto Sans TC'`×1 | Noto Serif TC、Noto Sans TC |
| `golden-thread/index.html` | `'Noto Serif TC', serif`×5 | Noto Serif TC、Noto Sans TC（缺 `preconnect` 到 gstatic） |
| `golden-thread-website-package/resource-hub.html` | `'Noto Serif TC'`×5、`'Cormorant Garamond'`×3 | **4 個字體家族**：Cormorant、Noto Sans TC、Noto Serif TC、**Montserrat** |
| `resource-hub/index.html` | `'Noto Serif TC',serif`×4 | Noto Serif TC、Noto Sans TC |
| `workshop-v2.html`／`workshop-full.html` | `'Noto Serif TC', serif`×4～6 | Noto Sans TC、Noto Serif TC |
| `ebook/manman/index.html` | `'ZCOOL XiaoWei', serif`×4、`'Noto Serif TC', Georgia, serif` | Noto Serif TC、**ZCOOL XiaoWei**（簡體字型，繁體字會缺字） |
| `ebook/rain-seller/index.html`、`audiobook/…` | `'Cormorant Garamond', serif`×2、`'Noto Serif TC', serif` | |
| `notion/workbook.html` | `system-ui, sans-serif` | 無 |

另外：
- 字級幾乎全部寫死成 px（`podcast`、`course`、`tips`、`selection`、`audiobook` 用 `11px`～`28px`），沒有字級 scale token。
- `index.html`／`about.html` 的 body 是 `'DM Sans', 'Noto Serif TC', sans-serif`：拉丁字是無襯線，中文卻 fallback 到**襯線**的 Noto Serif TC，同一句話會混用兩種風格。
- `golden-thread-landing.html` 的 `.handwritten` 對中文使用 `font-style: italic`，會產生假斜體。

---

## 3. 不符合 v1.1 的地方（推定基準：系統 A）

> ⚠️ 見 §0：沒有正式的 v1.1 文件。以下以 `index.html`／`about.html`（最新修改、SEO 最完整）的系統 A 作推定基準。如果 v1.1 另有定義，請提供文件，我再重新對照。

### 3.1 視覺系統
| 頁面 | 偏離之處 |
|---|---|
| `podcast`、`course`、`tips`、`selection`、`audiobook`、`ebook/rain-seller` | 深色 Ink 主題（`#08090c`），不是 cream 底；nav 用全大寫 `SPACE BETWEEN STUDIO`，而系統 A 是 `Space Between <em>Studio</em>`；按鈕有圓角（6px），系統 A 是直角 |
| `book.html` | 金色用 `#c9a96e`，不是 `#C9A962`；純黑 `#0d0d0d` 背景；沒有 Cormorant Garamond |
| `workshop-*`、`golden-thread*`、`resource-hub*` | 引入 teal `#1A3A3A`、WhatsApp 綠、Canva 紫等系統 A 沒有的顏色；卡片圓角 12～24px；emoji 大量用作圖示 |
| `ebook/manman` | 使用 ZCOOL XiaoWei 字體；`--tea`、`--sand` 等系統 A 沒有的 token |
| `golden-thread-website-package/resource-hub.html` | 使用 Montserrat 以及 Canva 品牌色 `#00C4CC`、`#7C3AED` |

### 3.2 導覽列與資訊架構
- **兩套互不相通的 nav**：
  - A：首頁／關於／商店（`shop/`）／光光工作坊（`workshop/`）／預約諮詢
  - B：首頁／選物／電台／課程
  - 從 `index.html` 無法進入 `selection.html`、`podcast.html`、`course.html`、`book.html`；從 B 系列頁面也進不去 `about.html`。
- 系統 A nav 的 `shop/`、`shop/rain.html`、`shop/brand.html`、`workshop/` **四個連結全部 404**（repo 裡沒有這些目錄）。
- `golden-thread/*`、`workshop-*`、`resource-hub/*`、`ebook/*` 完全沒有全站 nav。

### 3.3 品牌資訊前後矛盾
| 項目 | 不一致之處 |
|---|---|
| WhatsApp | `index`／`about`：`+852 9456 8231`；`golden-thread*`／`resource-hub`：`+852 5287 2126`（光光） |
| 《慢慢成為自己的品牌》內容 | `index`：「9 章、63 個反思練習」；`selection`：「5 大工具、56 道練習題」；ebook 本身是序章＋10 章＋後記 |
| AI 教練名稱 | `selection`：「蘇牧 AI 教練」；其他頁：「光光」 |
| 產品名稱 | 首頁叫「品牌金線」，landing 賣《找到你的品牌金線》（132 頁、13 練習），selection 沒有這本書 |
| 價格與付款連結 | **同一條 Airwallex 連結在不同頁代表不同產品和價格**（見 §7.1） |

---

## 4. SEO 問題

### 4.1 全站層級
- **沒有 `robots.txt`、`sitemap.xml`、`404.html`**。
- **沒有 favicon 檔**：`index.html`、`about.html`、`book.html`、`selection.html` 完全沒有 icon；其他頁用 emoji SVG data-URI，各頁 icon 都不同。
- **大量 404 內部連結**（會浪費 crawl budget，也影響使用者體驗）：

| 來源 | 壞連結 |
|---|---|
| `index.html` | `shop/`、`shop/rain.html`、`shop/brand.html`、`workshop/`、`/images/og-cover.jpg`（og:image）、`/images/logo.png`（JSON-LD logo） |
| `about.html` | `shop/`、`workshop/` |
| `golden-thread-landing.html`（根目錄那份） | `images/book-cover.png`、`images/exercise-decor.png`、`images/guangguang-avatar.png`、`images/og-image.png`（**頁面上 3 張圖全部破圖**，og:image 也壞掉；圖檔其實在根目錄或 package 資料夾） |
| `resource-hub/index.html` | `../resources/canva/all-scripts.md`（5 個「下載腳本」按鈕）、`../visual-guide.html`、`../workshop.html` |
| `workshop-v2.html` | 閘門的「立即購買」連到 `https://spacebetweenstudio.site/book`（對應 `book.html`，是《AI 給我的第一桶金》，但工作坊密語在另一本書裡） |
| `notion/workbook.html` | `notion.so/YOUR-TEMPLATE-ID` |
| `ebook/manman` | 「複製 Notion 模版 →」是 `href="#"` |
| `book.html` | 兩個主要 CTA（「免費下載前三章」、「直接購買完整版」）都是 `href="#"` |
| `index.html` | footer「LINE（台灣）」是 `href="#"` |

### 4.2 逐頁 meta

| 頁面 | description | canonical | og:image | og:url | twitter | JSON-LD | noindex | 問題 |
|---|---|---|---|---|---|---|---|---|
| `index.html` | ✅ | ✅ | ❌ 檔案不存在 | ✅ | ✅（缺 twitter:image） | ✅（logo 404） | — | hreflang 三個語言全指向同一 URL，等於沒設定；`meta keywords` 已被 Google 忽略 |
| `about.html` | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ | — | 同上 hreflang 問題；缺 og:image |
| `selection.html` | ✅ | ❌ | ⚠️ 相對路徑（社群平台讀不到） | ❌ | ❌ | ❌ | — | 主要商店頁卻沒有 canonical 和 Product schema |
| `book.html` | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ | — | 缺 Book schema |
| `golden-thread/index.html` | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | — | 與下兩頁**標題重複** |
| `golden-thread-landing.html` | ✅ | ❌ | ⚠️ 相對且 404 | ❌ | ❌ | ❌ | — | 重複內容 |
| `golden-thread-website-package/golden-thread-landing.html` | ✅ | ❌ | ⚠️ 相對 | ❌ | ❌ | ❌ | — | 完全重複的頁面，可被收錄 |
| `golden-thread-website-package/resource-hub.html` | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | **沒有** | 購買者專屬頁沒設 noindex，也沒有閘門 |
| `workshop-v2.html`／`workshop-full.html` | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | **沒有** | 兩份內容重複；`workshop-full` 是無閘門的完整版，卻可被搜尋收錄 |
| `ebook/manman/index.html` | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | **沒有** | 付費書全文公開、可被收錄 |
| `podcast`／`course`／`tips` | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ noindex | 可以接受（尚未上線） |
| `ebook/rain-seller`、`audiobook`、`resource-hub/index.html` | — | — | — | — | — | — | ✅ | |

### 4.3 內容與結構
- `lang` 不一致：大部分頁面用 `zh-Hant`，`workshop-*` 和 package 版 resource-hub 用 `zh-TW`。`podcast`、`course`、`tips`、`golden-thread-landing` 用廣東話書寫（唔、嘅、喺），比較準確的標記是 `zh-HK`（或 `yue-Hant`）。
- JSON-LD `Book` 缺少 `author`、`image`、`url`、`inLanguage`，`Offer` 缺少 `availability`、`url`，Google 不會顯示 rich result。
- `ebook/rain-seller/index.html` **沒有 `<h1>`**。
- 沒有圖片的頁面（`index`、`about`、`book`）在社群分享時沒有預覽圖。
- 所有標題都用 `|` 分隔，但格式不一致（例如 `隙光・選物店 | Space Between Selection`、`賣雨的人 | 有聲書` 沒有品牌名）。

---

## 5. 無障礙（a11y）問題

### 5.1 色彩對比（WCAG AA：一般文字需 ≥ 4.5:1）

| 組合 | 對比度 | 用在哪裡 |
|---|---|---|
| 金 `#C9A962` 在 cream `#FAF7F2` 上 | **2.11** ❌ | `index`／`about` 的 hero eyebrow、`.product-tag`、`.product-cta`、`.nav-cta`、`cite`、`.founder-sig` |
| 金 `#C9A962` 在 `#F0E9DC` 上 | **1.86** ❌ | `.market` 區塊 |
| 金 `#C9A962` 在 `#F5F2EB` 上 | **2.01** ❌ | `golden-thread*` 淺色區塊的金色文字 |
| cream 在金色上（`.nav-cta:hover`） | **2.11** ❌ | `index`／`about` |
| `--earth-light #9C8878` 在 cream 上 | **3.17** ❌ | `.section-label`、`.product-price span`、「即將推出」價格 |
| 「即將推出」卡片 `opacity:.75` 後的 earth-light | **2.37** ❌ | `index.html` 第三張卡片 |
| footer `rgba(250,247,242,.3)` 在 `#1C1815` 上 | **2.61** ❌ | `index.html` 版權列 |
| footer `rgba(250,247,242,.4)` | **3.65** ❌ | `about.html` footer |
| `--soft-gray #6b6b6b` 在 `#08090c` 上 | **3.74** ❌ | B 系列頁面的所有內文 `.section-text`、`.hero p`、`.product-desc` |
| `--soft-gray` 在 `#181c24` 上 | **3.20** ❌ | selection 價格幣別、tips 隱私說明 |
| `book.html --text-muted #6b6560` 在 `#0d0d0d` 上 | **3.38** ❌ | nav 連結、footer、section 標題 |
| `book.html .who-card.not-for`（opacity .5） | **2.67** ❌ | |
| 白字在 WhatsApp 綠 `#25D366` 上 | **1.98** ❌ | `golden-thread*`、`resource-hub` 的所有「問光光」按鈕 |
| `#888` 在白色上 | **3.54** ❌ | `resource-hub` 練習描述 |

### 5.2 鍵盤與語意
- **可點擊的 `<div>`**：`audiobook` 播放清單 `.track`（`onclick` 在 div 上）、`ebook/manman` 的 `#toc-overlay`，都無法用鍵盤操作。
- **假核取方塊**：`workshop-*` 的 `.check-item` 是 `<label onclick>` 包 `<div class="check-box">`，沒有 `<input type="checkbox">`，鍵盤和螢幕閱讀器都無法勾選，也讀不出狀態。
- **只有圖示的按鈕沒有 `aria-label`**：audiobook 的 `⏮ ▶ ⏭`、ebook 的 `✕`／`×`、manman 的 `Aa`、`A-`／`A+`、`緊`／`鬆`、workshop 的 `←`／`→`（第 5～13 題的導航只寫箭頭）、工作坊 nav 1～13 的數字按鈕（沒有題目名稱）。
- **表單標籤沒有關聯**：`workshop-*` 共 17 個 `<label class="form-label">` 都沒有 `for=`；`tips.html` email 欄位只有 placeholder、沒有 label；`gate-input`、`password-input` 也只有 placeholder。
- **錯誤訊息沒有 `aria-live`**：workshop gate、resource-hub 密語錯誤、tips 成功訊息，螢幕閱讀器都不會播報。
- **行動版沒有導覽**：`index`／`about`／`selection` 在 ≤768px 直接 `display:none` 隱藏 nav，沒有漢堡選單（見 §6）。
- **沒有 skip link**；只有 `tips`、`ebook/rain-seller`、`workshop-*`、package 版 resource-hub 有 `<main>`，其餘頁面沒有 landmark。
- **焦點樣式**：`workshop-*` 共 9 處、`resource-hub`、`tips` 在 input 上用 `outline:none`，只靠改 border 顏色（金色邊框在深色底上對比不足）；全站沒有任何 `:focus-visible` 樣式，按鈕／連結的焦點很難看清楚。

### 5.3 動態與動畫
- **全站沒有 `prefers-reduced-motion`**。
- `index.html` 的 marquee 無限滾動，沒有暫停方法（WCAG 2.2.2）。雖然有 `aria-hidden`，對前庭敏感的使用者仍有影響。
- `.reveal`／`.fade-in` 內容預設 `opacity:0`，**JS 失效或 IntersectionObserver 不支援時，整頁主要內容會一直看不到**。
- `book.html` hero 內容用 `opacity:0` 加 animation 淡入，也有同樣風險。

### 5.4 標題層級與替代文字
- `ebook/rain-seller`：沒有 `<h1>`。
- `workshop-v2`：閘門的 `<h2>` 出現在 `<h1>` 之前。
- `golden-thread-landing`、`golden-thread/index`：`<h2>` 後直接跳 `<h4>`。
- `podcast`：`<h3>` 前面沒有 `<h2>`；`course`：`<h4>` 前面沒有 h2／h3；`selection` features 區塊的 `<h3>` 沒有上層 `<h2>`。
- `golden-thread-landing` 的 `<img src="images/book-cover.png" alt="金繼碗">`：alt 描述的是金繼碗，實際圖片卻是書封。
- `ebook/manman` 章節圖 alt 只寫「第一章」「第二章」，沒有描述內容；純裝飾圖應該用 `alt=""`。
- emoji 當圖示（📖 ✍️ 🧭 🎧 🔐 等）沒有加 `aria-hidden="true"`，螢幕閱讀器會逐一念出 emoji 名稱。
- `selection.html` 的 hero `<h1>` 用 `-webkit-text-fill-color: transparent` 做漸層字，在 Windows 高對比模式下會消失。

---

## 6. 手機版問題

| # | 頁面 | 問題 |
|---|---|---|
| 1 | `index`、`about`、`selection` | ≤768px 把 nav **整個隱藏**，沒有漢堡選單；手機使用者只能靠 footer 導覽（`css/style.css` 裡有寫好的 `.nav-toggle`，但沒有頁面使用） |
| 2 | `podcast`、`course`、`tips` | ≤480px 同樣把 nav 整個隱藏 |
| 3 | `book.html` | nav 在手機不收合：logo 加 4 個連結擠在 56px 高的列內，連結只有 `0.75rem`（12px），點擊區域遠小於 44×44px |
| 4 | `index.html` | `.product-grid` 用 `minmax(300px,1fr)`，手機 padding 1.5rem → 320px 寬的螢幕可用寬度只有 272px，**卡片會溢出並被 `overflow-x:hidden` 裁掉** |
| 5 | `about.html` | `.service-grid` 用 `minmax(280px,1fr)`，在 320px 螢幕同樣溢出 |
| 6 | 全站 | 大量 `min-height: 100vh`（index、about、book、selection、tips、golden-thread、ebook），在 iOS Safari 上會被網址列遮住底部，建議改用 `100svh` 或 `100dvh` |
| 7 | `tips.html` | email input `font-size:14px`，**iOS 點擊時會自動放大頁面** |
| 8 | `workshop-*` | `.sticky-note` textarea `0.95rem`（15.2px），iOS 同樣會自動縮放 |
| 9 | `workshop-*` | header（sticky, top:0）加 nav（sticky, `top:110px` 寫死）：手機上 header 換行、nav 變成直排三段，**兩個 sticky 區塊會佔去大半個螢幕**，而且 110px 偏移與實際 header 高度不符，會重疊或留空 |
| 10 | `workshop-*` | nav tab 按鈕 36×36px，小於 44px 建議觸控尺寸；13 顆按鈕只有數字 |
| 11 | `index.html` | hero 的「隙」字形 `font-size:40vw`、philosophy 的「裂」字 `50vw`，只靠 `overflow:hidden` 截掉，某些瀏覽器會出現水平捲動 |
| 12 | `index`／`about` | `.hero-eyebrow`、`.product-tag`（0.68～0.72rem ≈ 11px）、`.product-badge`（0.65rem ≈ 10px），手機上太小；`podcast`、`course`、`selection` 也有 11px 的 badge |
| 13 | `ebook/manman` | 章節圖是 1～2.6 MB 的 PNG（整個資料夾 28 MB）；**service worker 首次造訪就預先快取約 20 MB**，對行動數據不友善。應該轉成 WebP／AVIF 並提供 `srcset` |
| 14 | `ebook/manman` | `manifest.json` 的 192／512 icon 都指向 1.6 MB 的非正方形封面 PNG，尺寸不符，PWA 安裝圖示會變形或安裝失敗 |
| 15 | `ebook/manman/sw.js` | cache-first 策略加上 cache 名稱固定為 `manman-v1`：**內容更新後，已安裝的手機永遠讀到舊版**，除非手動改 cache 名稱 |
| 16 | `selection.html` 等 | `<img>` 沒有 `width`／`height` 也沒有 `loading="lazy"`（selection 有 7 張），會造成版面跳動（CLS），並在首屏一次下載全部圖片 |
| 17 | `selection.html` | 產品卡片 hover 動畫（`translateY`、`scale`）在觸控裝置上會「卡住」在 hover 狀態；全站約 90 處 `:hover` 都沒有用 `@media (hover:hover)` 包起來 |
| 18 | `audiobook` | `.album-art` 寫死 280×280px，沒有 `@media`（整頁 0 個 media query） |
| 19 | 字體 | 每頁載入 2～4 個 Google Fonts 家族（包括 CJK 的 Noto Serif TC／Sans TC），手機首屏字型下載量大 |

---

## 7. 附帶發現（不在指定清單內，但影響營收或安全，建議優先處理）

### 7.1 🔴 付款連結與產品、價格對不上
同一條 Airwallex 付款連結在不同頁面代表不同產品和價格：

| Airwallex 連結 | `selection.html` | `golden-thread/*` |
|---|---|---|
| `hkhexbb35cle` | 《賣雨的人》HKD 68 | 《找到你的品牌金線》Seed 版 HKD 98 |
| `hkhexbdv6fvp` | 《慢慢成為自己的品牌》HKD 168 | Complete 版 HKD 198 |
| `hkhexbevtwaa` | 療癒雙書組合 HKD 198 | Kintsugi 金繼版 **HKD 498** |

顧客在其中一頁看到的價格與結帳頁顯示的金額一定會有一頁不符。

### 7.2 🔴 「購買者專屬」內容其實是公開的
- `workshop-v2.html`、`resource-hub/index.html`：通關密語以明文寫在前端 JS 裡（本報告不重複寫出），`README.md` 也公開寫出；而且 resource-hub 的提示「與日本修復藝術有關」幾乎等於直接給出答案。
- `workshop-full.html`：無閘門的完整版，公開而且可以被搜尋收錄。
- `golden-thread-website-package/resource-hub.html`：沒有閘門。
- `ebook/rain-seller/index.html`、`ebook/manman/index.html`：付費電子書全文公開（manman 甚至沒有 noindex）。
- `audiobook`：任何 `?token=abc` 都能通過驗證。
- 純前端閘門只能擋一般瀏覽，不能保護付費內容；需要伺服器端驗證（例如 Cloudflare Access、Workers，或把內容移到付費平台）。

### 7.3 🟠 表單會悄悄遺失名單
`tips.html` 不論 webhook 回應成功還是失敗，都顯示「手冊已經發送到你嘅信箱」；n8n 掛掉時，使用者以為已經收到，你卻收不到名單。

### 7.4 🟠 對外暴露的端點
- n8n webhook（`/webhook/hubspot-lead`、`/webhook/workshop-gate`）寫死在前端，沒有 rate limit 或驗證，任何人都可以灌入假名單到 HubSpot。
- 18 個 `target="_blank"` 沒有加 `rel="noopener"`（現代瀏覽器預設已經 noopener，風險低）。

---

## 8. 建議處理順序

| 優先 | 項目 | 章節 |
|---|---|---|
| P0 | 修正 Airwallex 連結與價格對應 | §7.1 |
| P0 | 修正首頁 nav／產品卡的 404（`shop/`、`workshop/`）與根目錄 landing 的破圖 | §4.1 |
| P0 | 付費內容移到伺服器端驗證；`workshop-full.html` 與 package 資料夾加 noindex 或移除 | §7.2 |
| P1 | 提供或建立正式的 v1.1 規範（`CLAUDE.md`／design tokens），把 5 套系統統一成一份共用 `tokens.css` | §0、§2、§3 |
| P1 | 手機版加上漢堡選單；修正 grid 溢出與 iOS 輸入框自動縮放 | §6 |
| P1 | 修正金色文字對比度（淺底改用 `#8B7355` 或更深的金色）、WhatsApp 按鈕改用深色字 | §5.1 |
| P1 | 加上 `robots.txt`、`sitemap.xml`、og:image 絕對網址、各頁 canonical | §4 |
| P2 | 刪除重複與未使用的檔案（約 13 MB 圖片、`css/style.css` 或者正式啟用它、`deploy.sh`、`README.md`） | §1 |
| P2 | 加上 `prefers-reduced-motion`、`:focus-visible`、表單 label、`aria-label`、`aria-live` | §5 |
| P2 | 壓縮 manman 圖片、修正 service worker 更新策略與 manifest icon | §6 |
| P2 | 統一 WhatsApp 號碼、產品描述（章節數、練習數）、AI 教練名稱 | §3.3 |
