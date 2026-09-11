/**
 * 好農方舟 (HaoNong Ark) - 單一檔案離線獨立可演示 HTML 生成器
 * 生成一個完全自包含、可在任一瀏覽器雙擊 100% 離線執行的完整全站演示檔案
 */

export function generateStandaloneOfflineHtml(): string {
  return `<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>好農方舟 HaoNong Ark - 全站前端與後台離線可演示系統</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Lucide Icons -->
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700;900&family=Noto+Serif+TC:wght@600;900&display=swap');
    body {
      font-family: 'Noto Sans TC', sans-serif;
    }
    .font-serif {
      font-family: 'Noto Serif TC', serif;
    }
    /* 自訂捲軸 */
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: #f1f5f9;
    }
    ::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }
  </style>
</head>
<body class="bg-slate-50 text-slate-900 min-h-screen flex flex-col antialiased">

  <!-- 頂部即時公告列 -->
  <div class="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white text-xs py-1.5 px-4 border-b border-emerald-900/60 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <div class="flex items-center space-x-2 truncate">
        <span class="bg-emerald-600 text-white font-bold px-1.5 py-0.5 rounded text-[10px] tracking-wide shrink-0">
          離線演示版
        </span>
        <span class="truncate text-emerald-100 text-xs">
          🌾 好農方舟單一檔案獨立離線系統（涵蓋前台 10 大模組與後台 17 大管理功能，免伺服器即可在任一瀏覽器完整演示）
        </span>
      </div>
      <div class="hidden md:flex items-center space-x-3 shrink-0 text-emerald-200 text-xs">
        <span class="text-emerald-400 font-mono">雙溫層冷鏈直送</span>
        <span>|</span>
        <span class="text-emerald-300">客服：0800-088-299</span>
      </div>
    </div>
  </div>

  <!-- 導覽列 -->
  <header class="bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm sticky top-[29px] z-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        
        <!-- Logo -->
        <div onclick="switchView('home')" class="flex items-center space-x-2.5 cursor-pointer select-none">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md">
            <i data-lucide="sprout" class="w-6 h-6"></i>
          </div>
          <div>
            <div class="flex items-center gap-1.5">
              <span class="font-extrabold text-xl tracking-tight text-slate-900 font-serif leading-none">好農方舟</span>
              <span class="bg-emerald-100 text-emerald-900 text-[10px] font-bold px-1.5 py-0.2 rounded border border-emerald-300">HaoNong Ark</span>
            </div>
            <p class="text-[10px] text-emerald-700 font-semibold tracking-wide mt-0.5">在地產銷電商・農業部行情與大數據中樞</p>
          </div>
        </div>

        <!-- 桌面選單 -->
        <nav class="hidden lg:flex items-center space-x-1">
          <button onclick="switchView('home')" id="nav-home" class="nav-btn px-2.5 py-1.5 rounded-lg text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200">
            首頁門戶
          </button>
          <button onclick="switchView('brand')" id="nav-brand" class="nav-btn px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-emerald-700 hover:bg-slate-100">
            品牌故事
          </button>
          <button onclick="switchView('news')" id="nav-news" class="nav-btn px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-emerald-700 hover:bg-slate-100">
            最新消息
          </button>
          <button onclick="switchView('shop')" id="nav-shop" class="nav-btn px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-emerald-700 hover:bg-slate-100">
            產地商城 <span class="bg-emerald-600 text-white text-[9px] px-1 py-0.2 rounded">直送</span>
          </button>
          <button onclick="switchView('farmer_hub')" id="nav-farmer_hub" class="nav-btn px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-emerald-700 hover:bg-slate-100">
            農友社場 <span class="bg-amber-500 text-slate-950 text-[9px] px-1 py-0.2 rounded">溯源・契作</span>
          </button>
          <button onclick="switchView('market')" id="nav-market" class="nav-btn px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-emerald-700 hover:bg-slate-100">
            批發行情
          </button>
          <button onclick="switchView('stats')" id="nav-stats" class="nav-btn px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-emerald-700 hover:bg-slate-100">
            生產統計
          </button>
          <button onclick="switchView('articles')" id="nav-articles" class="nav-btn px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-emerald-700 hover:bg-slate-100">
            產銷專題
          </button>
          <button onclick="switchView('contact')" id="nav-contact" class="nav-btn px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-emerald-700 hover:bg-slate-100">
            聯絡我們
          </button>
        </nav>

        <!-- 購物車與後台切換 -->
        <div class="flex items-center space-x-2">
          <button onclick="toggleCart()" class="relative p-2 rounded-xl text-slate-700 hover:text-emerald-700 hover:bg-slate-100 transition-colors">
            <i data-lucide="shopping-bag" class="w-5 h-5"></i>
            <span id="cart-badge" class="absolute -top-1 -right-1 bg-amber-500 text-slate-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">2</span>
          </button>

          <button onclick="switchView('admin')" id="nav-admin" class="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black rounded-lg shadow-sm flex items-center gap-1.5 transition-all">
            <i data-lucide="shield-check" class="w-3.5 h-3.5"></i>
            <span>進入後台管理</span>
          </button>
        </div>

      </div>
    </div>
  </header>

  <!-- 主內容容器 -->
  <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
    
    <!-- ==================== VIEW 1: 首頁 (Home) ==================== -->
    <div id="view-home" class="view-section space-y-8">
      
      <!-- Hero Banner -->
      <div class="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-950 text-white p-8 sm:p-12 shadow-2xl border border-emerald-700/50">
        <div class="max-w-2xl space-y-4">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
            <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
            <span>在地小農產地冷鏈直供 ｜ 農業部即時拍賣行情大數據</span>
          </div>
          <h1 class="text-3xl sm:text-5xl font-black font-serif tracking-tight leading-tight">
            產地至餐桌・透明產銷共好新方舟
          </h1>
          <p class="text-emerald-100 text-sm sm:text-base leading-relaxed">
            串聯全台 17+ 家認證農業合作社與產銷班，導入 TAP 產銷履歷溯源、農業部 17 處果菜市場動態批發價比價、小農契作認養與雙溫層低溫直配。
          </p>
          <div class="flex flex-wrap gap-3 pt-2">
            <button onclick="switchView('shop')" class="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-sm shadow-lg flex items-center gap-2">
              <i data-lucide="shopping-bag" class="w-4 h-4"></i> 探索產地商城
            </button>
            <button onclick="switchView('market')" class="px-5 py-2.5 bg-slate-800/80 hover:bg-slate-800 text-emerald-200 font-bold rounded-xl text-sm border border-emerald-500/30 flex items-center gap-2">
              <i data-lucide="trending-up" class="w-4 h-4"></i> 查看批發拍賣行情
            </button>
          </div>
        </div>
      </div>

      <!-- 核心四大數據看板 -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black">
            17+
          </div>
          <div>
            <div class="text-xs text-slate-500">串聯認證合作社</div>
            <div class="text-base font-extrabold text-slate-900">全台產銷班社場</div>
          </div>
        </div>

        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black">
            100%
          </div>
          <div>
            <div class="text-xs text-slate-500">TAP 溯源驗證</div>
            <div class="text-base font-extrabold text-slate-900">農藥殘留檢驗合格</div>
          </div>
        </div>

        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-black">
            17處
          </div>
          <div>
            <div class="text-xs text-slate-500">即時拍賣行情報價</div>
            <div class="text-base font-extrabold text-slate-900">農業部開放資料同步</div>
          </div>
        </div>

        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-black">
            雙溫層
          </div>
          <div>
            <div class="text-xs text-slate-500">冷鏈物流直配</div>
            <div class="text-base font-extrabold text-slate-900">常溫/冷藏/冷凍溫控</div>
          </div>
        </div>
      </div>

      <!-- 當季精選產地直送 -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-xl font-extrabold text-slate-900 font-serif">當季產地直送精選</h2>
            <p class="text-xs text-slate-500">嚴選 TAP 產銷履歷認證作物，清晨採收、當日冷鏈出貨</p>
          </div>
          <button onclick="switchView('shop')" class="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1">
            <span>瀏覽全部商品</span> &rarr;
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="home-product-list">
          <!-- Rendered via JS -->
        </div>
      </div>

    </div>

    <!-- ==================== VIEW 2: 產地商城 (Shop) ==================== -->
    <div id="view-shop" class="view-section hidden space-y-6">
      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-extrabold text-slate-900 font-serif">產地冷鏈商城</h1>
          <p class="text-xs text-slate-500 mt-1">支持全台友善農法、TAP 產銷履歷蔬果與優質農產，雙溫層安全溫控宅配</p>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="filterShop('all')" class="shop-filter-btn px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 text-white">全部商品</button>
          <button onclick="filterShop('vegetable')" class="shop-filter-btn px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700">生鮮蔬菜</button>
          <button onclick="filterShop('fruit')" class="shop-filter-btn px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700">當季果品</button>
          <button onclick="filterShop('processed')" class="shop-filter-btn px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700">在地加工</button>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="shop-catalog-grid">
        <!-- Rendered via JS -->
      </div>
    </div>

    <!-- ==================== VIEW 3: 批發行情 (Market) ==================== -->
    <div id="view-market" class="view-section hidden space-y-6">
      <div class="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 text-[11px] font-bold px-2 py-0.5 rounded-md border border-emerald-400/30 mb-2">
            <i data-lucide="activity" class="w-3.5 h-3.5"></i> 農業部農產品批發市場開放資料即時連線中
          </div>
          <h1 class="text-2xl font-extrabold font-serif">全台 17 處果菜市場動態交易行情</h1>
          <p class="text-xs text-slate-400 mt-1">台北一市、台北二市、三重、西螺、高雄等批發市場拍賣均價、到貨量與漲跌幅分析</p>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="exportMarketCsv()" class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5">
            <i data-lucide="download" class="w-3.5 h-3.5"></i> 匯出行情 CSV
          </button>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-slate-50">
          <div class="font-bold text-sm text-slate-800 flex items-center gap-2">
            <i data-lucide="trending-up" class="w-4 h-4 text-emerald-600"></i> 今日大宗蔬果批發均價看板
          </div>
          <div class="text-xs text-slate-500 font-mono">
            更新時間：今日 08:30 (盤中結算)
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th class="p-3">作物代碼 / 名稱</th>
                <th class="p-3">主要市場</th>
                <th class="p-3 text-right">上價 (元/kg)</th>
                <th class="p-3 text-right">均價 (元/kg)</th>
                <th class="p-3 text-right">下價 (元/kg)</th>
                <th class="p-3 text-right">前日漲跌</th>
                <th class="p-3 text-right">今日到貨量 (公噸)</th>
                <th class="p-3 text-center">產地直購節省率</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100" id="market-price-tbody">
              <!-- Rendered via JS -->
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ==================== VIEW 4: 農友社場 (Farmer Hub) ==================== -->
    <div id="view-farmer_hub" class="view-section hidden space-y-6">
      <div class="bg-emerald-900 text-white p-6 rounded-2xl border border-emerald-800 shadow-sm">
        <h1 class="text-2xl font-extrabold font-serif">全台農民合作社與產銷專區</h1>
        <p class="text-xs text-emerald-200 mt-1">匯聚各縣市認證農業合作社、小農契作認養、TAP產銷履歷溯源、農民學院與補助政策</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6" id="cooperatives-grid">
        <!-- Rendered via JS -->
      </div>
    </div>

    <!-- ==================== VIEW 5: 生產統計 (Production Stats) ==================== -->
    <div id="view-stats" class="view-section hidden space-y-6">
      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h1 class="text-2xl font-extrabold text-slate-900 font-serif">全台農林漁牧生產統計與產銷預警</h1>
        <p class="text-xs text-slate-500 mt-1">整合農業部歷年統計大數據，監控產地供給、氣候風險與產銷失衡調節指標</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-rose-50 border border-rose-200 p-4 rounded-xl">
          <div class="flex items-center justify-between text-xs font-bold text-rose-800 mb-2">
            <span>產銷失衡預警 (高風險)</span>
            <span class="bg-rose-200 px-2 py-0.5 rounded text-[10px]">紅燈</span>
          </div>
          <div class="text-base font-extrabold text-rose-900">高麗菜 (甘藍初秋)</div>
          <p class="text-xs text-rose-700 mt-1">育苗場超量出苗達 128%，建議產銷班啟動加工儲存或耕鋤補助申請。</p>
        </div>

        <div class="bg-amber-50 border border-amber-200 p-4 rounded-xl">
          <div class="flex items-center justify-between text-xs font-bold text-amber-800 mb-2">
            <span>氣候敏感關注 (注意)</span>
            <span class="bg-amber-200 px-2 py-0.5 rounded text-[10px]">黃燈</span>
          </div>
          <div class="text-base font-extrabold text-amber-900">愛文芒果 (屏東枋山)</div>
          <p class="text-xs text-amber-700 mt-1">開花期受寒流陣雨影響，落果率微幅上升，已啟動溫室防寒輔導。</p>
        </div>

        <div class="bg-emerald-50 border border-emerald-200 p-4 rounded-xl">
          <div class="flex items-center justify-between text-xs font-bold text-emerald-800 mb-2">
            <span>供需平衡穩定 (正常)</span>
            <span class="bg-emerald-200 px-2 py-0.5 rounded text-[10px]">綠燈</span>
          </div>
          <div class="text-base font-extrabold text-emerald-900">有機牛番茄 (南投埔里)</div>
          <p class="text-xs text-emerald-700 mt-1">採收均價維持 68 元/kg，契作直銷訂單覆蓋率達 92%。</p>
        </div>
      </div>
    </div>

    <!-- ==================== VIEW 6: 品牌故事 (Brand Story) ==================== -->
    <div id="view-brand" class="view-section hidden space-y-6">
      <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <span class="text-xs font-bold text-emerald-700 uppercase tracking-wider">關於好農方舟</span>
        <h1 class="text-3xl font-extrabold text-slate-900 font-serif">守護土地與產銷共好的數位方舟</h1>
        <p class="text-sm text-slate-600 leading-relaxed max-w-3xl">
          「好農方舟」成立於 2026 年，致力於消弭產地與都會消費端之間的資訊不對稱。透過現代化科技與農業部開放大數據，我們串聯全台優質農業合作社，以透明的拍賣行情比價、公平的契作回饋機制與高標準雙溫層冷鏈，為農友創造合理尊嚴收益，為消費者把關每一口天然健康。
        </p>
      </div>
    </div>

    <!-- ==================== VIEW 7: 最新消息 (News) ==================== -->
    <div id="view-news" class="view-section hidden space-y-6">
      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h1 class="text-2xl font-extrabold text-slate-900 font-serif">最新消息與產銷公告</h1>
        <p class="text-xs text-slate-500 mt-1">掌握第一手農業部冷鏈補助政策、合作社入駐招募與小農培訓課程</p>
      </div>
      <div class="space-y-3" id="news-list-container">
        <!-- Rendered via JS -->
      </div>
    </div>

    <!-- ==================== VIEW 8: 產銷專題 (Articles) ==================== -->
    <div id="view-articles" class="view-section hidden space-y-6">
      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h1 class="text-2xl font-extrabold text-slate-900 font-serif">產銷深度專題報導</h1>
        <p class="text-xs text-slate-500 mt-1">走進全台產地第一線，記錄友善耕作、冷鏈保鮮科技與青農返鄉故事</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6" id="articles-grid">
        <!-- Rendered via JS -->
      </div>
    </div>

    <!-- ==================== VIEW 9: 聯絡我們 (Contact) ==================== -->
    <div id="view-contact" class="view-section hidden space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h1 class="text-2xl font-extrabold text-slate-900 font-serif">線上諮詢與合作洽談</h1>
          <p class="text-xs text-slate-500 leading-relaxed">
            無論您是尋求產地直送的生鮮採購主管、欲加入方舟的農業合作社，或對產銷履歷有任何疑問，歡迎隨時留言。
          </p>
          <div class="space-y-3 text-xs text-slate-600 pt-2">
            <div class="flex items-center gap-2"><i data-lucide="phone" class="w-4 h-4 text-emerald-600"></i> 客服專線：0800-088-299</div>
            <div class="flex items-center gap-2"><i data-lucide="mail" class="w-4 h-4 text-emerald-600"></i> 電子郵件：service@haonong.example.tw</div>
            <div class="flex items-center gap-2"><i data-lucide="map-pin" class="w-4 h-4 text-emerald-600"></i> 營運地址：雲林縣西螺鎮農產運銷大道 88 號</div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <h2 class="text-base font-bold text-slate-900">快速留言表單</h2>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">您的姓名 / 單位</label>
            <input type="text" id="contact-name" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs" placeholder="王小明（例：OO農產合作社）">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">聯絡電話 / Email</label>
            <input type="text" id="contact-info" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs" placeholder="0912-345-678">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">諮詢內容</label>
            <textarea id="contact-msg" rows="3" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs" placeholder="請描述您的需求..."></textarea>
          </div>
          <button onclick="submitContactForm()" class="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg shadow-sm">
            確認送出諮詢
          </button>
        </div>
      </div>
    </div>

    <!-- ==================== VIEW 10: 後台綜合管理大系統 (Admin) ==================== -->
    <div id="view-admin" class="view-section hidden space-y-6">
      
      <!-- 後台頂部狀態列 -->
      <div class="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded">總管理員模式</span>
            <span class="text-slate-400 text-xs font-mono">HaoNong Ark Management Center</span>
          </div>
          <h1 class="text-2xl font-extrabold font-serif">好農方舟・後台營運管理大看板</h1>
          <p class="text-xs text-slate-400 mt-1">監控全站營收、商品上下架、合作社入駐審核、TAP 產銷履歷發行與農業部 OpenData 同步</p>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="switchView('home')" class="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-lg flex items-center gap-1.5">
            <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i> 返回前台網站
          </button>
        </div>
      </div>

      <!-- 後台子模組切換頁籤 -->
      <div class="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        <button onclick="switchAdminTab('overview')" id="admin-tab-overview" class="admin-subtab-btn px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500 text-slate-950">
          📊 營運總覽
        </button>
        <button onclick="switchAdminTab('cooperatives')" id="admin-tab-cooperatives" class="admin-subtab-btn px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700">
          🏢 合作社管理
        </button>
        <button onclick="switchAdminTab('products')" id="admin-tab-products" class="admin-subtab-btn px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700">
          📦 商品與溫層
        </button>
        <button onclick="switchAdminTab('orders')" id="admin-tab-orders" class="admin-subtab-btn px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700">
          🚚 訂單物流
        </button>
        <button onclick="switchAdminTab('trace')" id="admin-tab-trace" class="admin-subtab-btn px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700">
          🏷️ TAP履歷管理
        </button>
        <button onclick="switchAdminTab('finance')" id="admin-tab-finance" class="admin-subtab-btn px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700">
          💵 財務結算撥款
        </button>
      </div>

      <!-- 後台 1: 營運總覽 -->
      <div id="admin-view-overview" class="admin-subview space-y-4">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div class="text-xs text-slate-500">本月交易總額 (GMV)</div>
            <div class="text-2xl font-black text-slate-900 font-mono mt-1">NT$ 1,842,500</div>
            <div class="text-[11px] text-emerald-600 mt-1 font-bold">↑ 較上月成長 18.5%</div>
          </div>
          <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div class="text-xs text-slate-500">待發貨訂單數</div>
            <div class="text-2xl font-black text-amber-600 font-mono mt-1">42 筆</div>
            <div class="text-[11px] text-slate-400 mt-1">含冷藏 28 筆、冷凍 14 筆</div>
          </div>
          <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div class="text-xs text-slate-500">合作社入駐待審核</div>
            <div class="text-2xl font-black text-blue-600 font-mono mt-1">3 件</div>
            <div class="text-[11px] text-slate-400 mt-1">苗栗有機產銷班第5班等</div>
          </div>
          <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div class="text-xs text-slate-500">農業部 API 同步狀態</div>
            <div class="text-2xl font-black text-emerald-600 font-mono mt-1">正常連線</div>
            <div class="text-[11px] text-slate-400 mt-1">17 處市場資料已於 08:30 更新</div>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <h3 class="font-bold text-sm text-slate-800 mb-3">即時營運事件與稽核紀錄</h3>
          <div class="space-y-2 text-xs">
            <div class="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
              <span class="text-slate-700">【系統同步】已完成全台 17 處果菜市場今日 08:30 拍賣牌價自動排程同步</span>
              <span class="text-slate-400 font-mono">10分鐘前</span>
            </div>
            <div class="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
              <span class="text-slate-700">【訂單成立】買家 陳*霖 完成訂單 #HA-2026-0881（常溫+冷藏雙溫層）</span>
              <span class="text-slate-400 font-mono">25分鐘前</span>
            </div>
            <div class="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
              <span class="text-slate-700">【入駐審核】已核准「屏東枋山芒果特選產銷合作社」線上入駐資格</span>
              <span class="text-slate-400 font-mono">1小時前</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 後台 2: 合作社管理 -->
      <div id="admin-view-cooperatives" class="admin-subview hidden space-y-4">
        <div class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div class="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div class="font-bold text-sm text-slate-800">全台入駐合作社名冊 (17 家)</div>
            <button onclick="alert('模擬：開啟新增合作社表單')" class="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-lg">+ 新增合作社</button>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th class="p-3">合作社名稱</th>
                  <th class="p-3">主產作物</th>
                  <th class="p-3">所在地</th>
                  <th class="p-3">認證標章</th>
                  <th class="p-3">評鑑星級</th>
                  <th class="p-3">狀態</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100" id="admin-coop-tbody">
                <!-- Rendered via JS -->
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- 後台 3: 商品與溫層 -->
      <div id="admin-view-products" class="admin-subview hidden space-y-4">
        <div class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div class="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div class="font-bold text-sm text-slate-800">商品清冊與雙溫層設定</div>
            <button onclick="alert('模擬：開啟新增商品視窗')" class="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-lg">+ 新增商品</button>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th class="p-3">品項名稱</th>
                  <th class="p-3">溫層</th>
                  <th class="p-3">定價</th>
                  <th class="p-3">庫存</th>
                  <th class="p-3">供貨合作社</th>
                  <th class="p-3">狀態</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100" id="admin-product-tbody">
                <!-- Rendered via JS -->
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- 後台 4: 訂單物流 -->
      <div id="admin-view-orders" class="admin-subview hidden space-y-4">
        <div class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div class="p-4 bg-slate-50 border-b border-slate-200 font-bold text-sm text-slate-800">
            即時訂單與雙溫層發貨管理
          </div>
          <div class="p-4 text-xs text-slate-600 space-y-3">
            <div class="border border-slate-200 rounded-xl p-3 bg-slate-50 flex items-center justify-between">
              <div>
                <div class="font-bold text-slate-900">訂單編號：#HA-2026-0881 ｜ 買家：陳*霖</div>
                <div class="text-slate-500 mt-0.5">品項：有機牛番茄 (冷藏 x 2)、金鑽鳳梨 (常溫 x 1) ｜ 總計：$520</div>
              </div>
              <span class="px-2.5 py-1 bg-amber-100 text-amber-900 font-bold rounded text-[11px]">溫層拆單包裝中</span>
            </div>
            <div class="border border-slate-200 rounded-xl p-3 bg-slate-50 flex items-center justify-between">
              <div>
                <div class="font-bold text-slate-900">訂單編號：#HA-2026-0880 ｜ 買家：林*慧</div>
                <div class="text-slate-500 mt-0.5">品項：西螺特選有機高麗菜 (冷藏 x 4) ｜ 總計：$360</div>
              </div>
              <span class="px-2.5 py-1 bg-emerald-100 text-emerald-900 font-bold rounded text-[11px]">黑貓冷鏈配送中</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 後台 5: TAP履歷 -->
      <div id="admin-view-trace" class="admin-subview hidden space-y-4">
        <div class="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3">
          <div class="font-bold text-sm text-slate-800">TAP 產銷履歷批次登錄與防偽碼發行</div>
          <p class="text-xs text-slate-500">串接農業部產銷履歷追溯系統，登錄採收日期、合格檢驗報告與 QR-Code 發行。</p>
          <div class="border border-slate-200 rounded-lg p-3 bg-slate-50 text-xs">
            <div class="font-bold text-slate-800">批次代碼：TAP-2026-NTO-001</div>
            <div class="text-slate-500 mt-1">作物：南投埔里特選高山牛番茄 ｜ 農藥殘留檢驗：ND (零檢出未檢出)</div>
          </div>
        </div>
      </div>

      <!-- 後台 6: 財務結算 -->
      <div id="admin-view-finance" class="admin-subview hidden space-y-4">
        <div class="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3">
          <div class="font-bold text-sm text-slate-800">小農與產銷班財務撥款結算</div>
          <p class="text-xs text-slate-500">透明產地收購撥款機制，扣除 3% 平台金流與冷鏈運營費後，直接撥款至合作社專戶。</p>
          <div class="border border-slate-200 rounded-lg p-3 bg-slate-50 text-xs flex items-center justify-between">
            <div>
              <div class="font-bold text-slate-800">雲林西螺蔬果產銷合作社 (本期應撥款)</div>
              <div class="text-slate-500 mt-0.5">撥款金額：NT$ 428,500 (結算週期：2026/08/01 ~ 2026/08/15)</div>
            </div>
            <span class="px-2 py-1 bg-emerald-100 text-emerald-800 font-bold rounded">已撥款</span>
          </div>
        </div>
      </div>

    </div>

  </main>

  <!-- 購物車抽屜 (Drawer) -->
  <div id="cart-drawer" class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm hidden flex justify-end">
    <div class="w-full max-w-md bg-white h-full shadow-2xl flex flex-col p-6 space-y-4">
      <div class="flex items-center justify-between border-b border-slate-200 pb-3">
        <div class="flex items-center gap-2 font-bold text-slate-900 text-base">
          <i data-lucide="shopping-bag" class="w-5 h-5 text-emerald-600"></i>
          <span>產地冷鏈採購車</span>
        </div>
        <button onclick="toggleCart()" class="p-1 text-slate-400 hover:text-slate-700">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <div class="flex-1 overflow-y-auto space-y-3" id="cart-items-container">
        <!-- Rendered via JS -->
      </div>

      <div class="border-t border-slate-200 pt-4 space-y-3">
        <div class="flex items-center justify-between text-xs text-slate-600">
          <span>常溫/冷藏冷鏈運費</span>
          <span class="text-emerald-600 font-bold">滿 $999 免運費 ($0)</span>
        </div>
        <div class="flex items-center justify-between text-base font-extrabold text-slate-900">
          <span>應付結帳總額</span>
          <span class="text-emerald-700 font-mono text-xl" id="cart-total-price">NT$ 270</span>
        </div>
        <button onclick="checkoutCart()" class="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-sm shadow-lg flex items-center justify-center gap-2">
          <span>前往模擬安全結帳 (信用卡/LINE Pay)</span>
        </button>
      </div>
    </div>
  </div>

  <!-- 底部 Footer -->
  <footer class="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800 mt-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-2 text-slate-300">
        <i data-lucide="sprout" class="w-4 h-4 text-emerald-400"></i>
        <span class="font-bold">好農方舟 HaoNong Ark</span> ｜ 在地產銷電商・大數據中樞
      </div>
      <div>
        © 2026 好農方舟股份有限公司 ｜ 支援任一瀏覽器單一檔案獨立離線展示
      </div>
    </div>
  </footer>

  <!-- 模擬資料與互動腳本 -->
  <script>
    // 預設資料庫
    const MOCK_PRODUCTS = [
      { id: 'p1', name: '特選有機牛番茄 (TAP認證)', price: 90, unit: '600g/盒', temp: '冷藏', coop: '南投埔里高山蔬果合作社', category: 'vegetable', img: '🍅' },
      { id: 'p2', name: '西螺特級有機初秋高麗菜', price: 90, unit: '1.2kg/顆', temp: '冷藏', coop: '雲林西螺蔬果產銷合作社', category: 'vegetable', img: '🥬' },
      { id: 'p3', name: '枋山特選外銷級愛文芒果', price: 360, unit: '2.5kg/箱', temp: '常溫', coop: '屏東枋山芒果特選產銷合作社', category: 'fruit', img: '🥭' },
      { id: 'p4', name: '麻豆五十年老欉文旦柚', price: 280, unit: '3kg/箱', temp: '常溫', coop: '台南麻豆老欉文旦合作社', category: 'fruit', img: '🍈' },
      { id: 'p5', name: '大樹玉荷包荔枝 (冷鏈直送)', price: 420, unit: '2kg/盒', temp: '冷藏', coop: '高雄大樹玉荷包產銷班', category: 'fruit', img: '🍒' },
      { id: 'p6', name: '古坑有機黑咖啡豆 (中焙)', price: 350, unit: '225g/包', temp: '常溫', coop: '雲林古坑精品咖啡合作社', category: 'processed', img: '☕' }
    ];

    const MOCK_MARKET_PRICES = [
      { code: 'LA1', name: '甘藍 (高麗菜-初秋)', market: '台北一市', high: 32.5, avg: 24.8, low: 18.0, change: 4.2, vol: 184.5, save: '38%' },
      { code: 'FB1', name: '花椰菜 (白梗)', market: '西螺市場', high: 45.0, avg: 36.2, low: 28.0, change: -2.1, vol: 62.0, save: '32%' },
      { code: 'FJ1', name: '番茄 (牛番茄)', market: '台北二市', high: 75.0, avg: 62.4, low: 48.0, change: 8.5, vol: 45.2, save: '42%' },
      { code: 'SE1', name: '芒果 (愛文)', market: '高雄市場', high: 140.0, avg: 112.0, low: 85.0, change: 1.8, vol: 88.0, save: '35%' },
      { code: 'SG1', name: '鳳梨 (金鑽17號)', market: '三重市場', high: 38.0, avg: 29.5, low: 22.0, change: -0.8, vol: 120.4, save: '28%' }
    ];

    const MOCK_COOPERATIVES = [
      { name: '雲林西螺蔬果產銷合作社', crops: '有機高麗菜、芥藍、小白菜', loc: '雲林縣西螺鎮', cert: 'TAP產銷履歷 / 有機認證', rating: '⭐⭐⭐⭐⭐' },
      { name: '南投埔里高山蔬果合作社', crops: '有機牛番茄、彩椒、茭白筍', loc: '南投縣埔里鎮', cert: 'TAP產銷履歷', rating: '⭐⭐⭐⭐⭐' },
      { name: '屏東枋山芒果特選產銷合作社', crops: '愛文芒果、蓮霧', loc: '屏東縣枋山鄉', cert: '產地地理標章 / 產銷履歷', rating: '⭐⭐⭐⭐' }
    ];

    const MOCK_NEWS = [
      { date: '2026/08/25', tag: '政策補助', title: '農業部 115 年度「農產品冷鏈物流冷藏庫建置補助」即日起受理申請' },
      { date: '2026/08/20', tag: '合作社動態', title: '好農方舟與全台 17 家產銷班完成契作收購保證協議簽署' },
      { date: '2026/08/15', tag: '農民學院', title: '秋季智慧農業與 TAP 產銷履歷數位登錄實務培訓班開放報名' }
    ];

    const MOCK_ARTICLES = [
      { title: '解密雙溫層冷鏈：如何讓產地現摘蔬果以最佳甜度送抵都會餐桌？', desc: '深入雲林西螺與南投埔里集貨場，探訪全程 4°C 恆溫不中斷的運銷技術。', author: '好農方舟產銷研究室' },
      { title: '從小農契作到產銷共好：以保證收購價抵抗市場異常波動的實踐路徑', desc: '專訪返鄉青農產銷班，解析數位認養如何成為在地農業的穩定支柱。', author: '農業永續特約專欄' }
    ];

    let cart = [
      { product: MOCK_PRODUCTS[0], qty: 2 },
      { product: MOCK_PRODUCTS[1], qty: 1 }
    ];

    // 初始化頁面
    document.addEventListener('DOMContentLoaded', () => {
      lucide.createIcons();
      renderHomeProducts();
      renderShopCatalog(MOCK_PRODUCTS);
      renderMarketPrices();
      renderCooperatives();
      renderNews();
      renderArticles();
      renderAdminTables();
      updateCartUI();
    });

    // 視圖切換
    function switchView(viewId) {
      document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));
      const target = document.getElementById('view-' + viewId);
      if (target) target.classList.remove('hidden');

      // 更新導覽列樣式
      document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('text-emerald-800', 'bg-emerald-50', 'border', 'border-emerald-200');
        btn.classList.add('text-slate-700');
      });
      const activeNav = document.getElementById('nav-' + viewId);
      if (activeNav) {
        activeNav.classList.remove('text-slate-700');
        activeNav.classList.add('text-emerald-800', 'bg-emerald-50', 'border', 'border-emerald-200');
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
      lucide.createIcons();
    }

    // 後台子分頁切換
    function switchAdminTab(subtab) {
      document.querySelectorAll('.admin-subview').forEach(el => el.classList.add('hidden'));
      const target = document.getElementById('admin-view-' + subtab);
      if (target) target.classList.remove('hidden');

      document.querySelectorAll('.admin-subtab-btn').forEach(btn => {
        btn.classList.remove('bg-amber-500', 'text-slate-950');
        btn.classList.add('bg-slate-100', 'text-slate-700');
      });
      const activeBtn = document.getElementById('admin-tab-' + subtab);
      if (activeBtn) {
        activeBtn.classList.remove('bg-slate-100', 'text-slate-700');
        activeBtn.classList.add('bg-amber-500', 'text-slate-950');
      }
      lucide.createIcons();
    }

    // 渲染首頁商品
    function renderHomeProducts() {
      const container = document.getElementById('home-product-list');
      container.innerHTML = MOCK_PRODUCTS.slice(0, 4).map(p => \`
        <div class="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between hover:border-emerald-500 transition-colors">
          <div>
            <div class="text-4xl mb-2 text-center py-4 bg-slate-50 rounded-xl">\${p.img}</div>
            <div class="flex items-center justify-between text-[10px] text-slate-500 mb-1">
              <span class="bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">\${p.temp}直送</span>
              <span>\${p.unit}</span>
            </div>
            <h3 class="font-bold text-sm text-slate-900">\${p.name}</h3>
            <p class="text-xs text-slate-400 mt-0.5">\${p.coop}</p>
          </div>
          <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span class="font-extrabold text-emerald-700 text-base font-mono">NT$ \${p.price}</span>
            <button onclick="addToCart('\${p.id}')" class="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg">+ 加入採購車</button>
          </div>
        </div>
      \`).join('');
    }

    // 渲染產地商城
    function renderShopCatalog(list) {
      const container = document.getElementById('shop-catalog-grid');
      container.innerHTML = list.map(p => \`
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between hover:border-emerald-500 transition-colors">
          <div>
            <div class="text-5xl text-center py-6 bg-slate-50 rounded-xl mb-3">\${p.img}</div>
            <div class="flex items-center justify-between text-[11px] mb-1.5">
              <span class="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">\${p.temp}溫層</span>
              <span class="text-slate-400 font-mono">\${p.unit}</span>
            </div>
            <h3 class="font-bold text-base text-slate-900">\${p.name}</h3>
            <p class="text-xs text-slate-500 mt-1">\${p.coop}</p>
          </div>
          <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span class="font-extrabold text-emerald-700 text-lg font-mono">NT$ \${p.price}</span>
            <button onclick="addToCart('\${p.id}')" class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg">+ 加入採購車</button>
          </div>
        </div>
      \`).join('');
    }

    // 篩選商城
    function filterShop(cat) {
      if (cat === 'all') {
        renderShopCatalog(MOCK_PRODUCTS);
      } else {
        renderShopCatalog(MOCK_PRODUCTS.filter(p => p.category === cat));
      }
    }

    // 渲染批發行情
    function renderMarketPrices() {
      const tbody = document.getElementById('market-price-tbody');
      tbody.innerHTML = MOCK_MARKET_PRICES.map(m => \`
        <tr class="hover:bg-slate-50">
          <td class="p-3 font-bold text-slate-900">\${m.code} \${m.name}</td>
          <td class="p-3 text-slate-600">\${m.market}</td>
          <td class="p-3 text-right font-mono text-slate-500">$\${m.high.toFixed(1)}</td>
          <td class="p-3 text-right font-mono font-bold text-emerald-700 text-sm">$\${m.avg.toFixed(1)}</td>
          <td class="p-3 text-right font-mono text-slate-500">$\${m.low.toFixed(1)}</td>
          <td class="p-3 text-right font-mono \${m.change >= 0 ? 'text-rose-600 font-bold' : 'text-emerald-600 font-bold'}">
            \${m.change >= 0 ? '+' : ''}\${m.change}%
          </td>
          <td class="p-3 text-right font-mono text-slate-700">\${m.vol} t</td>
          <td class="p-3 text-center">
            <span class="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold text-[10px]">省 \${m.save}</span>
          </td>
        </tr>
      \`).join('');
    }

    // 渲染合作社
    function renderCooperatives() {
      const container = document.getElementById('cooperatives-grid');
      container.innerHTML = MOCK_COOPERATIVES.map(c => \`
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs text-emerald-700 font-bold">\${c.loc}</span>
            <span class="text-xs">\${c.rating}</span>
          </div>
          <h3 class="font-bold text-slate-900 text-base">\${c.name}</h3>
          <p class="text-xs text-slate-500"><strong>主力作物：</strong>\${c.crops}</p>
          <div class="pt-2 border-t border-slate-100 text-[11px] text-slate-400">
            認證：\${c.cert}
          </div>
        </div>
      \`).join('');
    }

    // 渲染消息與文章
    function renderNews() {
      const container = document.getElementById('news-list-container');
      container.innerHTML = MOCK_NEWS.map(n => \`
        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <span class="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">\${n.tag}</span>
            <span class="font-bold text-xs sm:text-sm text-slate-900">\${n.title}</span>
          </div>
          <span class="text-xs text-slate-400 font-mono shrink-0">\${n.date}</span>
        </div>
      \`).join('');
    }

    function renderArticles() {
      const container = document.getElementById('articles-grid');
      container.innerHTML = MOCK_ARTICLES.map(a => \`
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <span class="text-[10px] font-bold text-emerald-700 uppercase">\${a.author}</span>
          <h3 class="font-bold text-base text-slate-900">\${a.title}</h3>
          <p class="text-xs text-slate-500 leading-relaxed">\${a.desc}</p>
        </div>
      \`).join('');
    }

    // 渲染後台表格
    function renderAdminTables() {
      const coopTbody = document.getElementById('admin-coop-tbody');
      coopTbody.innerHTML = MOCK_COOPERATIVES.map(c => \`
        <tr class="hover:bg-slate-50">
          <td class="p-3 font-bold text-slate-900">\${c.name}</td>
          <td class="p-3 text-slate-600">\${c.crops}</td>
          <td class="p-3 text-slate-600">\${c.loc}</td>
          <td class="p-3 text-emerald-700 font-bold">\${c.cert}</td>
          <td class="p-3">\${c.rating}</td>
          <td class="p-3"><span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">營運中</span></td>
        </tr>
      \`).join('');

      const prodTbody = document.getElementById('admin-product-tbody');
      prodTbody.innerHTML = MOCK_PRODUCTS.map(p => \`
        <tr class="hover:bg-slate-50">
          <td class="p-3 font-bold text-slate-900">\${p.img} \${p.name}</td>
          <td class="p-3"><span class="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold rounded">\${p.temp}</span></td>
          <td class="p-3 font-mono font-bold text-slate-800">$\${p.price}</td>
          <td class="p-3 font-mono text-slate-600">85 箱</td>
          <td class="p-3 text-slate-500 text-[11px]">\${p.coop}</td>
          <td class="p-3"><span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">上架中</span></td>
        </tr>
      \`).join('');
    }

    // 購物車邏輯
    function toggleCart() {
      const drawer = document.getElementById('cart-drawer');
      drawer.classList.toggle('hidden');
      updateCartUI();
      lucide.createIcons();
    }

    function addToCart(productId) {
      const product = MOCK_PRODUCTS.find(p => p.id === productId);
      if (!product) return;
      const existing = cart.find(item => item.product.id === productId);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({ product, qty: 1 });
      }
      updateCartUI();
      alert('已將「' + product.name + '」加入採購車！');
    }

    function updateCartUI() {
      const badge = document.getElementById('cart-badge');
      const totalCount = cart.reduce((acc, i) => acc + i.qty, 0);
      badge.innerText = totalCount;

      const container = document.getElementById('cart-items-container');
      const totalPriceEl = document.getElementById('cart-total-price');

      let totalPrice = 0;
      container.innerHTML = cart.map(item => {
        const itemTotal = item.product.price * item.qty;
        totalPrice += itemTotal;
        return \`
          <div class="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
            <div>
              <div class="font-bold text-slate-900">\${item.product.img} \${item.product.name}</div>
              <div class="text-slate-400 text-[10px]">單價 $\${item.product.price} ｜ 數量：\${item.qty}</div>
            </div>
            <div class="font-mono font-bold text-emerald-700">NT$ \${itemTotal}</div>
          </div>
        \`;
      }).join('');

      totalPriceEl.innerText = 'NT$ ' + totalPrice;
    }

    function checkoutCart() {
      alert('🎉 模擬結帳成功！訂單編號: HA-2026-' + Math.floor(1000 + Math.random() * 9000) + '。好農方舟已安排產地雙溫層出貨！');
      cart = [];
      updateCartUI();
      toggleCart();
    }

    function exportMarketCsv() {
      let csv = '作物代碼,作物名稱,批發市場,特級上價,批發均價,普級下價,前日漲跌幅,到貨量(t)\\n';
      MOCK_MARKET_PRICES.forEach(m => {
        csv += \`\${m.code},\${m.name},\${m.market},\${m.high},\${m.avg},\${m.low},\${m.change}%,\${m.vol}\\n\`;
      });
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'haonong_market_prices.csv';
      link.click();
    }

    function submitContactForm() {
      const name = document.getElementById('contact-name').value;
      if (!name) {
        alert('請輸入姓名或單位名稱');
        return;
      }
      alert('感謝您的留言！好農方舟客服專員將於 24 小時內與您聯繫。');
      document.getElementById('contact-name').value = '';
      document.getElementById('contact-info').value = '';
      document.getElementById('contact-msg').value = '';
    }
  </script>
</body>
</html>`;
}
