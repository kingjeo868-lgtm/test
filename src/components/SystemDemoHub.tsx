import React, { useState } from 'react';
import { 
  Download, 
  Play, 
  ExternalLink, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  Database, 
  Server, 
  Code2, 
  Globe, 
  ShoppingBag, 
  Sprout, 
  Building2, 
  TrendingUp, 
  BarChart3, 
  FileText, 
  Newspaper, 
  Info, 
  PhoneCall, 
  LayoutDashboard, 
  Boxes, 
  Copy, 
  Check, 
  ChevronRight, 
  ArrowRight,
  RefreshCw,
  Eye,
  FileCode,
  FolderArchive,
  BookOpen,
  Award,
  Sliders,
  QrCode,
  HeartHandshake,
  DollarSign,
  GraduationCap,
  Terminal,
  FolderTree,
  FileCheck,
  Bot,
  Network
} from 'lucide-react';
import JSZip from 'jszip';
import { ViewMode } from '../types';
import { CI3_PROJECT_FILES } from '../data/ci3Codebase';
import { generateStandaloneOfflineHtml } from '../utils/standaloneHtmlGenerator';

interface SystemDemoHubProps {
  onNavigate: (view: ViewMode) => void;
  onOpenCart?: () => void;
}

export const SystemDemoHub: React.FC<SystemDemoHubProps> = ({ onNavigate, onOpenCart }) => {
  const [activeTab, setActiveTab] = useState<'download' | 'devenv' | 'walkthrough' | 'matrix' | 'devices'>('download');
  const [selectedScenario, setSelectedScenario] = useState<number>(0);
  const [isGeneratingHtml, setIsGeneratingHtml] = useState(false);
  const [isGeneratingZip, setIsGeneratingZip] = useState(false);
  const [htmlDownloaded, setHtmlDownloaded] = useState(false);
  const [zipDownloaded, setZipDownloaded] = useState(false);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Generate and download the standalone single-file offline HTML demo
  const handleDownloadStandaloneHtml = () => {
    setIsGeneratingHtml(true);
    setHtmlDownloaded(false);

    try {
      const htmlContent = generateStandaloneOfflineHtml();
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = '好農方舟_全站離線可執行演示包_HaoNongArk_Demo.html';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setHtmlDownloaded(true);
    } catch (error) {
      console.error('Failed to generate offline HTML:', error);
    } finally {
      setIsGeneratingHtml(false);
    }
  };

  // Generate and download full project zip with both React and PHP backend and offline demo
  const handleDownloadFullZip = async () => {
    setIsGeneratingZip(true);
    setZipDownloaded(false);

    try {
      const zip = new JSZip();
      
      // 1. Add CI3 / PHP 8.1 Backend Source Files
      CI3_PROJECT_FILES.forEach(file => {
        zip.file(file.path, file.content);
      });

      // 2. Add Offline Standalone HTML Demo in the root
      const offlineHtml = generateStandaloneOfflineHtml();
      zip.file('haonong_ark_offline_demo.html', offlineHtml);

      // 3. Add Full Docker & DevOps Orchestration
      zip.file('docker-compose.yml', `version: '3.8'

services:
  # 前端 React 18 + Vite 服務
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    volumes:
      - ./src:/app/src
    depends_on:
      - backend

  # 後端 PHP 8.1 / CodeIgniter 3 服務
  backend:
    build:
      context: .
      dockerfile: Dockerfile.backend
    ports:
      - "8080:80"
    environment:
      - CI_ENV=development
      - DB_HOST=db
      - DB_NAME=haonong_ark
      - DB_USER=haonong_user
      - DB_PASS=HaoNong@2026!Sec
    depends_on:
      - db

  # MySQL 8.0 資料庫
  db:
    image: mysql:8.0
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: RootSecret2026!
      MYSQL_DATABASE: haonong_ark
      MYSQL_USER: haonong_user
      MYSQL_PASSWORD: HaoNong@2026!Sec
    ports:
      - "3306:3306"
    volumes:
      - ./schema.sql:/docker-entrypoint-initdb.d/init.sql
      - db_data:/var/lib/mysql

volumes:
  db_data:
`);

      zip.file('Dockerfile.frontend', `FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
`);

      zip.file('Dockerfile.backend', `FROM php:8.1-apache
RUN docker-php-ext-install mysqli pdo pdo_mysql
RUN a2enmod rewrite
COPY . /var/www/html/
RUN chown -R www-data:www-data /var/www/html/application/cache /var/www/html/application/logs
EXPOSE 80
`);

      zip.file('nginx.conf', `server {
    listen 80;
    server_name haonong.example.tw;
    root /var/www/html;
    index index.php index.html;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \\.php$ {
        fastcgi_pass php:9000;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
`);

      // 4. Add Quick Start Shell and Batch Scripts
      zip.file('start_dev_environment.sh', `#!/usr/bin/env bash
echo "🌾 正在啟動好農方舟 (HaoNong Ark) 開發環境..."
if command -v docker &> /dev/null; then
  echo "檢測到 Docker，使用 Docker Compose 啟動全端環境..."
  docker-compose up -d
  echo "✅ 服務啟動完成！"
  echo "  👉 前端介面: http://localhost:3000"
  echo "  👉 後端 API / CI3: http://localhost:8080"
  echo "  👉 離線無伺服器演示: 直接雙擊 haonong_ark_offline_demo.html"
else
  echo "未安裝 Docker，啟動 Node.js 前端開發環境..."
  npm install
  npm run dev
fi
`);

      zip.file('start_dev_environment.bat', `@echo off
echo ===================================================
echo   好農方舟 HaoNong Ark - 完整開發環境一鍵啟動腳本
echo ===================================================
echo 正在檢查執行環境...
docker-compose up -d
if %errorlevel% neq 0 (
  echo 未偵測到 Docker，嘗試啟動 Node.js 本機環境...
  call npm install
  call npm run dev
) else (
  echo [成功] 全端 Docker 容器已於後台啟動！
  echo 前端頁面: http://localhost:3000
  echo 後台/API: http://localhost:8080
)
pause
`);

      // 5. Add Environment & Config
      zip.file('.env.example', `# 好農方舟 HaoNong Ark - 營運環境參數
CI_ENV=development
BASE_URL=http://localhost:8080/

# MySQL / MariaDB 資料庫設定
DB_HOST=127.0.0.1
DB_NAME=haonong_ark
DB_USER=haonong_user
DB_PASS=HaoNong@2026!Sec

# 農業部 Open Data API Key (選填)
MOA_API_KEY=
`);

      // 6. Add Comprehensive Readme & Presentation Guide
      zip.file('README.md', `# 好農方舟 (HaoNong Ark) 全站系統完整開發與演示環境手冊

歡迎使用「好農方舟」在地產銷電商與農業部大數據中樞系統。

## 📁 專案資料夾結構

\`\`\`text
haonong_ark_full_system/
├── haonong_ark_offline_demo.html   # ⚡ 任一瀏覽器雙擊即可 100% 離線運行之單檔演示包
├── docker-compose.yml              # 🐳 全端容器化編排（Node + PHP 8.1 + MySQL 8.0）
├── Dockerfile.frontend             # ⚛️ React 18 前端 Docker 映像檔構建
├── Dockerfile.backend              # 🐘 PHP 8.1 Apache 後端 Docker 映像檔構建
├── nginx.conf                      # 🌐 高效能 Web 伺服器反向代理與安全過濾
├── schema.sql                      # 🗄️ MySQL 8.0 完整資料庫表結構與 50+ 筆初始種子資料
├── start_dev_environment.sh        # 🚀 Linux / Mac 一鍵啟動腳本
├── start_dev_environment.bat       # 🚀 Windows 一鍵啟動腳本
├── package.json                    # 📦 前端相依套件清單 (React, Vite, Tailwind, Lucide, Recharts)
├── .env.example                    # ⚙️ 系統環境變數設定範本
│
├── application/                    # 🐘 PHP 8.1 / CodeIgniter 3 後端 MVC 架構
│   ├── controllers/                # 控制器 (Shop, Market, Stats, Admin, Traceability, Cooperatives)
│   ├── models/                     # 資料模型 (Product_model, Market_model, Coop_model, Order_model)
│   ├── views/                      # 模板視圖 (header, footer, shop, market, admin)
│   └── config/                     # 設定檔 (config.php, database.php, routes.php)
│
└── src/                            # ⚛️ React 18 + TypeScript + Tailwind CSS 前端原始碼
    ├── components/                 # 10 大前台組件 + 17 大後台子系統組件
    ├── data/                       # 農業部批發行情與全台合作社初始資料集
    ├── utils/                      # 離線單檔 HTML 生成器與 CSV/PDF 匯出工具
    └── types.ts                    # 完整 TypeScript 型別定義
\`\`\`

## 🚀 4 種任選運行與演示方式

### 模式 1：零依賴雙擊秒開（推薦向主管／評審展示）
- 在任何電腦（Windows、Mac、Linux、iPad、手機）雙擊開啟 \`haonong_ark_offline_demo.html\`。
- 免伺服器、免聯網、免安裝 Node/PHP，即可操作前台 10 大頁面與後台 17 大功能。

### 模式 2：Docker Compose 一鍵啟動全端環境
\`\`\`bash
docker-compose up -d
\`\`\`
- 前端訪問：\`http://localhost:3000\`
- 後端 API 與 CI3：\`http://localhost:8080\`
- 資料庫：\`localhost:3306\` (帳號: \`haonong_user\`, 密碼: \`HaoNong@2026!Sec\`)

### 模式 3：Node.js 前端本機開發
\`\`\`bash
npm install
npm run dev
\`\`\`

### 模式 4：PHP 8.1 內建伺服器
\`\`\`bash
php -S localhost:8080
\`\`\`

---
© 2026 好農方舟股份有限公司 HaoNong Ark Co., Ltd. 版權所有
`);

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'haonong_ark_full_dev_environment_and_demo.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setZipDownloaded(true);
    } catch (err) {
      console.error('Packaging failed', err);
    } finally {
      setIsGeneratingZip(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(id);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const copyCommand = (cmd: string, id: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCommand(id);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  // Presentation Scenarios
  const SCENARIOS = [
    {
      id: 'consumer_journey',
      title: '都會買家：產地直送與雙溫層低溫採購結帳',
      target: '一般消費者、企業團購、生鮮採購主管',
      badge: '前台核心體驗',
      steps: [
        { name: '探索首頁門戶', view: 'home' as ViewMode, desc: '瀏覽 24 節氣適時蔬果、農業氣象預警與當季產地直送精選。' },
        { name: '產地商城與溫層過濾', view: 'shop' as ViewMode, desc: '篩選 TAP 產銷履歷、有機標章與常溫/冷藏/冷凍雙溫層商品。' },
        { name: '加入購物車並結帳', view: 'shop' as ViewMode, action: onOpenCart, desc: '自動計算不同溫層運費門檻，完成模擬安全結帳。' },
        { name: '產銷履歷溯源查詢', view: 'trace' as ViewMode, desc: '輸入 TAP 批次碼，即時查驗農藥殘留報告與採收日期。' }
      ]
    },
    {
      id: 'farmer_coop',
      title: '農民社場：全台合作社入駐、TAP溯源與小農契作認養',
      target: '產銷班、農業合作社、青農、契作認養人',
      badge: '社場專區',
      steps: [
        { name: '農友社場與合作社名錄', view: 'farmer_hub' as ViewMode, desc: '查閱全台 17+ 家認證合作社、特色作物與評鑑星級。' },
        { name: '合作社線上入駐申請', view: 'farmer_hub' as ViewMode, desc: '提供三步驟數位入駐表單，直接上傳有機驗證與統編。' },
        { name: '小農契作認養專區', view: 'contract' as ViewMode, desc: '瀏覽契作募資進度、產地見學活動與預計採收回饋機制。' },
        { name: '農民學院與補助政策', view: 'farmer_hub' as ViewMode, desc: '探索智慧農業培訓課程與農業部各項冷鏈設備補助。' }
      ]
    },
    {
      id: 'market_intelligence',
      title: '產銷大數據：農業部17處市場批發行情與失衡預警',
      target: '承銷人、產銷分析師、農政主管機關',
      badge: '大數據中樞',
      steps: [
        { name: '農業部即時拍賣行情', view: 'market' as ViewMode, desc: '盤中每小時波動、價量雙軸組合圖、多品項動態比價曲線。' },
        { name: '全台跨市場拍賣價差矩陣', view: 'market' as ViewMode, desc: '對比台北一市、西螺、高雄等批發均價與產地直購節省率。' },
        { name: '全台農林漁牧生產統計', view: 'stats' as ViewMode, desc: '歷史產量走勢、各縣市分佈地圖與大宗蔬果供需平衡比。' },
        { name: '產銷失衡即時燈號預警', view: 'stats' as ViewMode, desc: '高風險/注意/平穩三色燈號，提供產地收購調節建言。' }
      ]
    },
    {
      id: 'admin_management',
      title: '後台營運：一站式商品審核、多溫層物流與財務分潤',
      target: '平台總管理員、營運團隊、財務出納',
      badge: '後台全功能',
      steps: [
        { name: '營運大看板數據監控', view: 'admin' as ViewMode, desc: '即時營收 GMV、訂單狀態、商品庫存預警與系統健康度。' },
        { name: '合作社與入駐審核管理', view: 'admin' as ViewMode, desc: '審查全台合作社申請資格，核准通過或退回補件。' },
        { name: '商品與雙溫層冷鏈設定', view: 'admin' as ViewMode, desc: '維護商品上下架、常溫/冷藏/冷凍庫存與 TAP 產銷履歷代碼。' },
        { name: '訂單物流與財務撥款結算', view: 'admin' as ViewMode, desc: '列印出貨托運單、處理溫層拆單，執行小農產地分潤撥款。' }
      ]
    },
    {
      id: 'mcp_intelligence',
      title: 'AI 產銷智庫：文章 MCP (Model Context Protocol) 智慧調用與語意沙盒',
      target: 'AI 開發者、產銷分析師、LLM Agent 系統整合商',
      badge: 'AI/MCP 協定',
      steps: [
        { name: 'MCP 工具沙盒調用', view: 'article_mcp' as ViewMode, desc: '模擬 JSON-RPC 2.0 發送工具調用，即時交聯文章全文與台北一市批發價格。' },
        { name: '資源庫 URI 與提示詞樣板', view: 'article_mcp' as ViewMode, desc: '查閱 haonong:// 資源端點與經農政驗證之三大人機協作提示詞樣板。' },
        { name: '跨維度語意知識圖譜', view: 'article_mcp' as ViewMode, desc: '分析專題、微氣候風土、作物與拍賣市場多對多圖譜拓撲。' },
        { name: 'Claude/Cursor 客戶端配置', view: 'article_mcp' as ViewMode, desc: '一鍵複製標準 MCP Server 配置代碼，直接掛載至現代 LLM 環境。' }
      ]
    }
  ];

  // Frontend Modules Matrix
  const FRONTEND_MODULES = [
    { id: 'home', name: '首頁門戶 (Portal)', icon: Globe, path: '/', badge: '全景入口', desc: '全景形象首頁、二十四節氣農事日曆、產銷快訊、熱銷直送、即時農業氣象' },
    { id: 'brand_story', name: '品牌故事 (Brand Story)', icon: Info, path: '/brand', badge: '核心理念', desc: '四大核心支柱、六大發展里程碑、產銷永續理念與社會影響力數據' },
    { id: 'news', name: '最新消息 (News)', icon: Newspaper, path: '/news', badge: '即時動態', desc: '產銷最新公告、政府冷鏈補助動態、小農契作招募與農民學院開課資訊' },
    { id: 'shop', name: '產地商城 (Shop Catalog)', icon: ShoppingBag, path: '/shop', badge: '雙溫層冷鏈', desc: '蔬果肉品分類、產銷履歷驗證、雙溫層運費計算、即時加入採購車結帳' },
    { id: 'farmer_hub', name: '農友社場 (Farmer Hub)', icon: Building2, path: '/cooperatives', badge: '合作社大廳', desc: '全台合作社名錄、線上入駐申請、TAP溯源查詢、小農契作認養、農民學院、補助政策' },
    { id: 'market', name: '批發行情 (Market Prices)', icon: TrendingUp, path: '/market', badge: '農業部串接', desc: '17 處市場即時拍賣跳動、多維走勢圖表、跨市場價差比價、行情報表多格式匯出' },
    { id: 'stats', name: '生產統計 (Production Stats)', icon: BarChart3, path: '/stats', badge: '產銷預警', desc: '農林漁牧產量趨勢、產銷失衡三色燈號預警、各縣市分佈地圖、供需平衡矩陣' },
    { id: 'trace', name: 'TAP 產銷履歷 (Traceability)', icon: QrCode, path: '/trace', badge: '溯源防偽', desc: 'QR-Code 溯源查詢、產地檢驗報告、合格檢驗證明、農藥殘留檢驗記錄' },
    { id: 'contract', name: '小農契作認養 (Contract Farming)', icon: HeartHandshake, path: '/contract', badge: '產地見學', desc: '小農專案募資進度條、定期配送回饋、契作合約條款與產地認養體驗' },
    { id: 'articles', name: '產銷專題報導 (Articles)', icon: BookOpen, path: '/articles', badge: '深度智庫', desc: '冷鏈物流解密、友善農法專訪、農業部智慧農業推廣專題與產銷趨勢' },
    { id: 'article_mcp', name: '文章 MCP 智慧模組 (Article MCP)', icon: Bot, path: '/article_mcp', badge: 'AI/MCP 協定', desc: 'Anthropic 官方 MCP 標準：開放 6 大 Agent 工具、產銷全文資源端點、提示詞樣板與多維知識圖譜' },
    { id: 'contact', name: '聯絡我們 (Contact Us)', icon: PhoneCall, path: '/contact', badge: '雙向客服', desc: '買家諮詢表單、合作社技術支援、產銷合作洽談與常見問題 FAQ' }
  ];

  // Backend Admin Modules Matrix
  const BACKEND_MODULES = [
    { name: '營運大看板 (Overview)', icon: LayoutDashboard, desc: '營收 GMV 趨勢、即時待處理訂單、各溫層庫存告警與系統健康度' },
    { name: '合作社名錄管理 (Cooperatives)', icon: Building2, desc: '全台 17+ 家合作社基本資料維護、評鑑星級設定與專屬聯絡人管理' },
    { name: '合作社入駐審核 (Coop Applications)', icon: Award, desc: '產銷班與合作社線上申請審查、文件驗證、核准/補件/駁回流程' },
    { name: 'TAP 產銷履歷管理 (Traceability)', icon: QrCode, desc: 'TAP 批次碼發行、產地檢驗合格證書上傳、農藥檢驗結果登錄' },
    { name: '小農契作專案管理 (Contracts)', icon: HeartHandshake, desc: '契作募資專案發布、目標金額與進度追蹤、配送回饋排程維護' },
    { name: '農業補助政策管理 (Subsidies)', icon: DollarSign, desc: '農業部與地方政府補助政策發布、申請資格設定與截止日提醒' },
    { name: '農民學院課程管理 (Academy)', icon: GraduationCap, desc: '智慧農業實體/線上培訓開課、講師名冊維護與學員報名清單' },
    { name: '商品與溫層庫存管理 (Products)', icon: Boxes, desc: '常溫/冷藏/冷凍溫層設定、批發與零售定價、庫存增減與上下架' },
    { name: '訂單與發貨管理 (Orders)', icon: ShoppingBag, desc: '訂單狀態變更、黑貓雙溫層物流單號綁定、出貨發票與明細列印' },
    { name: '會員權限與角色 (Members)', icon: ShieldCheck, desc: '買家/小農/合作社幹部/總管理員四級權限控管與登入安全稽核' },
    { name: '採購與農友結算 (Finance)', icon: Sliders, desc: '產地收購款項結算、契作認養保證金撥款、各產銷班分潤報表' },
    { name: '農業部 OpenData API 同步 (Sync)', icon: RefreshCw, desc: '每日凌晨定時批次排程狀態、API 呼叫次數監控與異常重試日誌' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      
      {/* 頂部全景演示橫幅 */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-400/30 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  好農方舟全站系統完整開發環境與演示中樞
                </span>
                <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-amber-400/30">
                  支援任一瀏覽器 100% 獨立離線可演示
                </span>
                <span className="bg-blue-500/20 text-blue-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-blue-400/30">
                  前台 10 大模組 ＋ 後台 17 大管理功能
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                全站完整開發環境・全功能演示與專案資料夾下載
              </h1>
              <p className="text-slate-400 text-sm mt-2 max-w-3xl leading-relaxed">
                本系統提供完整前端所有內容功能與後台管理功能。您可透過「<strong className="text-emerald-300">單一 HTML 離線獨立演示檔</strong>」（免伺服器、雙擊即開）在任一瀏覽器中直接進行演示，亦可下載包含「<strong className="text-amber-300">React 18 + PHP 8.1 / CI3 + MySQL 8.0 + Docker 完整開發環境資料夾專案包</strong>」。
              </p>
            </div>

            {/* 快速下載按鈕群 */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                id="btn-download-standalone-html"
                onClick={handleDownloadStandaloneHtml}
                disabled={isGeneratingHtml}
                className="px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-50"
              >
                <Download className={`w-4 h-4 ${isGeneratingHtml ? 'animate-bounce' : ''}`} />
                <span>{isGeneratingHtml ? '正在生成離線 HTML...' : '⚡ 下載單一離線演示檔 (.html)'}</span>
              </button>

              <button
                id="btn-download-full-zip-package"
                onClick={handleDownloadFullZip}
                disabled={isGeneratingZip}
                className="px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-xl shadow-lg hover:shadow-amber-500/20 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-50"
              >
                <FolderArchive className={`w-4 h-4 ${isGeneratingZip ? 'animate-bounce' : ''}`} />
                <span>{isGeneratingZip ? '正在打包全端開發包...' : '📦 下載完整開發環境包 (.zip)'}</span>
              </button>
            </div>
          </div>

          {/* 下載成功通知 */}
          {(htmlDownloaded || zipDownloaded) && (
            <div className="mt-4 p-3 bg-emerald-950/80 border border-emerald-500/80 rounded-xl text-emerald-200 text-xs sm:text-sm flex items-center justify-between shadow-lg animate-in fade-in duration-200">
              <div className="flex items-center gap-2.5 font-bold">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>
                  {htmlDownloaded && '已成功下載「好農方舟_全站離線可執行演示包_HaoNongArk_Demo.html」！直接於任一瀏覽器（Chrome / Safari / Edge）雙擊即可 100% 離線運行！'}
                  {zipDownloaded && '已成功下載「haonong_ark_full_dev_environment_and_demo.zip」完整開發環境專案包！內含 Docker、PHP 8.1 / CI3、React 18 與 SQL 資料庫！'}
                </span>
              </div>
            </div>
          )}

          {/* 功能頁籤切換 */}
          <div className="flex items-center gap-2 mt-6 border-b border-slate-800 overflow-x-auto pb-px">
            <button
              onClick={() => setActiveTab('download')}
              className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-t-xl transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'download'
                  ? 'bg-slate-800 text-emerald-400 border-t-2 border-emerald-400 border-x border-slate-700'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>離線演示檔與下載專區</span>
            </button>

            <button
              onClick={() => setActiveTab('devenv')}
              className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-t-xl transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'devenv'
                  ? 'bg-slate-800 text-emerald-400 border-t-2 border-emerald-400 border-x border-slate-700'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>開發環境啟動手冊 & 資料夾架構</span>
            </button>

            <button
              onClick={() => setActiveTab('walkthrough')}
              className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-t-xl transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'walkthrough'
                  ? 'bg-slate-800 text-emerald-400 border-t-2 border-emerald-400 border-x border-slate-700'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Play className="w-4 h-4" />
              <span>4 大情境即時交互演示劇本</span>
            </button>

            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-t-xl transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'matrix'
                  ? 'bg-slate-800 text-emerald-400 border-t-2 border-emerald-400 border-x border-slate-700'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>前後台全功能矩陣與直達連結</span>
            </button>

            <button
              onClick={() => setActiveTab('devices')}
              className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-t-xl transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'devices'
                  ? 'bg-slate-800 text-emerald-400 border-t-2 border-emerald-400 border-x border-slate-700'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span>多設備響應式演示模擬器</span>
            </button>
          </div>

        </div>
      </div>

      {/* 核心內容區 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* ======================= TAB 1: 下載與離線演示指南 ======================= */}
        {activeTab === 'download' && (
          <div className="space-y-6">
            
            {/* 雙下載卡片對比 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* 卡片 1: 單一 HTML 離線獨立演示包 */}
              <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-2xl p-6 relative overflow-hidden shadow-xl hover:border-emerald-400 transition-colors">
                <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 font-black text-[10px] uppercase px-3 py-1 rounded-bl-xl">
                  推薦評審／會議直接使用
                </div>

                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 mb-4">
                  <Globe className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-extrabold text-white">
                  模式 A：單一 HTML 離線獨立演示檔
                </h3>
                <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                  專為評選展示、客戶提案與快速驗證打造。將完整的全站前端與後台系統內嵌於單一 HTML 檔案中。
                </p>

                <div className="my-4 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>免安裝 Node.js、免架設 Web 伺服器、免聯網</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>在任何瀏覽器（Chrome, Edge, Safari, Firefox）雙擊即開</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>包含 10 大前台頁面 + 17 大後台管理模組 + 互動模擬</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-[11px] text-slate-400 font-mono">
                    檔案大小：約 45 KB (輕量即開)
                  </div>
                  <button
                    onClick={handleDownloadStandaloneHtml}
                    disabled={isGeneratingHtml}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>一鍵下載離線 HTML</span>
                  </button>
                </div>
              </div>

              {/* 卡片 2: 完整原始碼與營運部署專案包 */}
              <div className="bg-slate-900 border-2 border-amber-500/50 rounded-2xl p-6 relative overflow-hidden shadow-xl hover:border-amber-400 transition-colors">
                <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 font-black text-[10px] uppercase px-3 py-1 rounded-bl-xl">
                  完整開發環境與部署包
                </div>

                <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-4">
                  <Server className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-extrabold text-white">
                  模式 B：完整開發環境原始碼包 (ZIP)
                </h3>
                <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                  提供完整生產環境與開發環境原始碼，包含 React 18 前端、PHP 8.1 CI3 後端、MySQL 8.0 資料庫結構與 Docker 容器化設定。
                </p>

                <div className="my-4 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-amber-300 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>完整的 Controller、Model、View、Config 原始碼</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-300 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>MySQL 8.0 完整 schema.sql 資料表與種子資料</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-300 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Docker Compose、啟動腳本與 Nginx 反向代理配置</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-[11px] text-slate-400 font-mono">
                    檔案規格：.zip 完整專案壓縮包
                  </div>
                  <button
                    onClick={handleDownloadFullZip}
                    disabled={isGeneratingZip}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <FolderArchive className="w-3.5 h-3.5" />
                    <span>打包下載完整開發包</span>
                  </button>
                </div>
              </div>

            </div>

            {/* 離線演示操作 3 步驟說明 */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                如何向評審或客戶快速演示？（3 步驟離線演練）
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm">
                    1
                  </div>
                  <div className="font-bold text-white text-sm">下載單一 HTML 檔</div>
                  <p className="text-slate-400 leading-relaxed">
                    點擊上方「下載單一離線演示檔」，將 <code className="text-emerald-300 font-mono">好農方舟_全站離線可執行演示包_HaoNongArk_Demo.html</code> 存至隨身碟或本機。
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-sm">
                    2
                  </div>
                  <div className="font-bold text-white text-sm">在任何電腦直接雙擊開啟</div>
                  <p className="text-slate-400 leading-relaxed">
                    在 Windows、Mac 或 iPad 上直接雙擊該檔案，任何瀏覽器會立刻啟動好農方舟完整可操作介面，無須網路連線。
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-sm">
                    3
                  </div>
                  <div className="font-bold text-white text-sm">自由切換前台與後台</div>
                  <p className="text-slate-400 leading-relaxed">
                    在該離線頁面頂部隨時點選「前台商城 / 批發行情 / 生產統計」或「後台管理 / 訂單審核 / TAP履歷」，全功能一目了然！
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ======================= TAB 2: 開發環境啟動手冊 & 資料夾架構 ======================= */}
        {activeTab === 'devenv' && (
          <div className="space-y-6">
            
            {/* 開發環境 4 種啟動方式 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-emerald-400" />
                    完整開發環境啟動指南 (4 種模式)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    解壓縮下載之專案資料夾後，依據您的開發偏好選擇啟動方式：
                  </p>
                </div>
                <span className="text-xs bg-slate-800 text-emerald-400 px-2.5 py-1 rounded font-mono font-bold">
                  Node 20+ / PHP 8.1+ / Docker
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                
                {/* 模式 1: Docker Compose */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-white text-sm">
                      <span className="w-6 h-6 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">1</span>
                      Docker Compose 全端一鍵啟動（推薦）
                    </div>
                    <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-800">全自動</span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    自動建立 React 前端、PHP 8.1 Apache 後端與 MySQL 8.0 資料庫容器並自動匯入 initial seed 資料。
                  </p>
                  <div className="bg-slate-900 p-2.5 rounded-lg font-mono text-xs text-emerald-300 flex items-center justify-between border border-slate-800">
                    <code>docker-compose up -d</code>
                    <button 
                      onClick={() => copyCommand('docker-compose up -d', 'cmd-docker')}
                      className="text-slate-400 hover:text-white p-1"
                      title="複製指令"
                    >
                      {copiedCommand === 'cmd-docker' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    啟動後前端位於 <code className="text-emerald-300">http://localhost:3000</code>，後台 API 位於 <code className="text-amber-300">http://localhost:8080</code>
                  </div>
                </div>

                {/* 模式 2: React Vite 前端開發環境 */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-white text-sm">
                      <span className="w-6 h-6 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs">2</span>
                      Node.js / React 18 前端本機開發
                    </div>
                    <span className="text-[10px] bg-blue-950 text-blue-300 px-1.5 py-0.5 rounded border border-blue-800">熱重載</span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    安裝前端相依套件並啟動 Vite 高速開發伺服器，支援 TypeScript 即時編譯與 Tailwind CSS 樣式熱重載。
                  </p>
                  <div className="bg-slate-900 p-2.5 rounded-lg font-mono text-xs text-blue-300 flex items-center justify-between border border-slate-800">
                    <code>npm install && npm run dev</code>
                    <button 
                      onClick={() => copyCommand('npm install && npm run dev', 'cmd-npm')}
                      className="text-slate-400 hover:text-white p-1"
                      title="複製指令"
                    >
                      {copiedCommand === 'cmd-npm' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    預設於 <code className="text-blue-300">http://localhost:3000</code> 開啟全站完整互動前台與後台管理介面。
                  </div>
                </div>

                {/* 模式 3: PHP 8.1 / CI3 後端開發 */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-white text-sm">
                      <span className="w-6 h-6 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs">3</span>
                      PHP 8.1 / CodeIgniter 3 內建伺服器
                    </div>
                    <span className="text-[10px] bg-amber-950 text-amber-300 px-1.5 py-0.5 rounded border border-amber-800">原生 MVC</span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    使用 PHP 8.1 內建 CLI Server 快速啟動 CI3 MVC 後端控制器與 REST API 路由，無須複雜 Apache 設置。
                  </p>
                  <div className="bg-slate-900 p-2.5 rounded-lg font-mono text-xs text-amber-300 flex items-center justify-between border border-slate-800">
                    <code>php -S localhost:8080</code>
                    <button 
                      onClick={() => copyCommand('php -S localhost:8080', 'cmd-php')}
                      className="text-slate-400 hover:text-white p-1"
                      title="複製指令"
                    >
                      {copiedCommand === 'cmd-php' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    API 根目錄為 <code className="text-amber-300">http://localhost:8080/index.php/api/</code>
                  </div>
                </div>

                {/* 模式 4: 單檔離線 0 依賴秒開 */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-white text-sm">
                      <span className="w-6 h-6 rounded bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs">4</span>
                      單檔離線演示（0 依賴免安裝）
                    </div>
                    <span className="text-[10px] bg-purple-950 text-purple-300 px-1.5 py-0.5 rounded border border-purple-800">極速演示</span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    任一 Windows / Mac / Linux / iPad 設備，直接用滑鼠雙擊下載的 HTML 檔，任何瀏覽器瞬間完整載入。
                  </p>
                  <div className="bg-slate-900 p-2.5 rounded-lg font-mono text-xs text-purple-300 flex items-center justify-between border border-slate-800">
                    <code>open haonong_ark_offline_demo.html</code>
                    <button 
                      onClick={() => copyCommand('open haonong_ark_offline_demo.html', 'cmd-html')}
                      className="text-slate-400 hover:text-white p-1"
                      title="複製指令"
                    >
                      {copiedCommand === 'cmd-html' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    隨身碟攜帶開會提案必備，完全不依賴外網與本機執行環境。
                  </div>
                </div>

              </div>
            </div>

            {/* 資料夾檔案樹狀圖清單 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                <FolderTree className="w-5 h-5 text-amber-400" />
                完整專案下載資料夾架構樹 (Directory Blueprint)
              </h3>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
                <pre className="text-emerald-400 font-bold mb-2">haonong_ark_full_system/</pre>
                <div className="text-slate-300 space-y-1">
                  <div>├── <span className="text-amber-300 font-bold">haonong_ark_offline_demo.html</span> <span className="text-slate-500">// ⚡ 任一瀏覽器雙擊即可 100% 離線運行之單檔演示包</span></div>
                  <div>├── <span className="text-emerald-300">docker-compose.yml</span>            <span className="text-slate-500">// 🐳 全端容器化編排（Node + PHP 8.1 + MySQL 8.0）</span></div>
                  <div>├── <span className="text-emerald-300">Dockerfile.frontend</span>           <span className="text-slate-500">// ⚛️ React 18 前端 Docker 映像檔</span></div>
                  <div>├── <span className="text-emerald-300">Dockerfile.backend</span>            <span className="text-slate-500">// 🐘 PHP 8.1 Apache 後端 Docker 映像檔</span></div>
                  <div>├── <span className="text-emerald-300">nginx.conf</span>                    <span className="text-slate-500">// 🌐 高效能 Web 伺服器反向代理與安全過濾</span></div>
                  <div>├── <span className="text-emerald-300">schema.sql</span>                    <span className="text-slate-500">// 🗄️ MySQL 8.0 完整資料庫表結構與 50+ 筆初始種子資料</span></div>
                  <div>├── <span className="text-blue-300">start_dev_environment.sh</span>      <span className="text-slate-500">// 🚀 Linux / Mac 一鍵啟動腳本</span></div>
                  <div>├── <span className="text-blue-300">start_dev_environment.bat</span>     <span className="text-slate-500">// 🚀 Windows 一鍵啟動腳本</span></div>
                  <div>├── <span className="text-slate-400">package.json</span>                  <span className="text-slate-500">// 📦 前端相依套件清單 (React, Vite, Tailwind, Recharts)</span></div>
                  <div>├── <span className="text-slate-400">.env.example</span>                  <span className="text-slate-500">// ⚙️ 系統環境變數設定範本</span></div>
                  <div>│</div>
                  <div>├── <span className="text-purple-300 font-bold">application/</span>                  <span className="text-slate-500">// 🐘 PHP 8.1 / CodeIgniter 3 後端 MVC 架構</span></div>
                  <div>│   ├── <span className="text-purple-300">controllers/</span>              <span className="text-slate-500">// 控制器 (Shop, Market, Stats, Admin, Traceability, Cooperatives)</span></div>
                  <div>│   ├── <span className="text-purple-300">models/</span>                   <span className="text-slate-500">// 資料模型 (Product_model, Market_model, Coop_model, Order_model)</span></div>
                  <div>│   ├── <span className="text-purple-300">views/</span>                    <span className="text-slate-500">// 模板視圖 (header, footer, shop, market, admin)</span></div>
                  <div>│   └── <span className="text-purple-300">config/</span>                   <span className="text-slate-500">// 設定檔 (config.php, database.php, routes.php)</span></div>
                  <div>│</div>
                  <div>└── <span className="text-teal-300 font-bold">src/</span>                          <span className="text-slate-500">// ⚛️ React 18 + TypeScript + Tailwind CSS 前端原始碼</span></div>
                  <div>    ├── <span className="text-teal-300">components/</span>               <span className="text-slate-500">// 10 大前台組件 + 17 大後台子系統組件</span></div>
                  <div>    ├── <span className="text-teal-300">data/</span>                     <span className="text-slate-500">// 農業部批發行情與全台合作社初始資料集</span></div>
                  <div>    ├── <span className="text-teal-300">utils/</span>                    <span className="text-slate-500">// 離線單檔 HTML 生成器與 CSV/PDF 匯出工具</span></div>
                  <div>    └── <span className="text-teal-300">types.ts</span>                  <span className="text-slate-500">// 完整 TypeScript 型別定義</span></div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ======================= TAB 3: 4 大情境即時交互演示劇本 ======================= */}
        {activeTab === 'walkthrough' && (
          <div className="space-y-6">
            
            {/* 劇本選擇器 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {SCENARIOS.map((sc, idx) => {
                const isSelected = selectedScenario === idx;
                return (
                  <button
                    key={sc.id}
                    onClick={() => setSelectedScenario(idx)}
                    className={`p-4 rounded-xl text-left transition-all border cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-950/50 border-emerald-500 ring-1 ring-emerald-500 text-white shadow-lg'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] mb-2">
                      <span className={`px-2 py-0.5 rounded font-bold ${
                        isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}>
                        劇本 {idx + 1}
                      </span>
                      <span className="text-slate-400">{sc.badge}</span>
                    </div>
                    <div className="font-bold text-xs sm:text-sm line-clamp-2 leading-snug">
                      {sc.title}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
                      <Eye className="w-3 h-3 text-emerald-400" />
                      <span>{sc.target}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* 選定劇本之詳細步驟演繹 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    正在演繹：劇本 {selectedScenario + 1}
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white mt-0.5">
                    {SCENARIOS[selectedScenario].title}
                  </h3>
                </div>
                <div className="text-xs text-slate-400">
                  適用對象：<span className="text-slate-200 font-semibold">{SCENARIOS[selectedScenario].target}</span>
                </div>
              </div>

              {/* 步驟清單 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SCENARIOS[selectedScenario].steps.map((step, sIdx) => (
                  <div 
                    key={sIdx}
                    className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold text-xs flex items-center justify-center border border-emerald-500/30">
                          {sIdx + 1}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono bg-slate-900 px-2 py-0.5 rounded">
                          目標頁面: {step.view}
                        </span>
                      </div>
                      <h4 className="font-bold text-white text-sm mb-1">{step.name}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-end">
                      <button
                        onClick={() => {
                          onNavigate(step.view);
                          if (step.action) step.action();
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>立即跳轉實機演示</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        )}

        {/* ======================= TAB 4: 前後台全功能矩陣與直達連結 ======================= */}
        {activeTab === 'matrix' && (
          <div className="space-y-8">
            
            {/* 前台 10 大核心模組 */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Globe className="w-5 h-5 text-emerald-400" />
                    前端消費者與農民社場模組 (共 10 大頁面)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">點擊任意卡片即可直接進入該頁面進行操作體驗</p>
                </div>
                <span className="text-xs font-mono bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-1 rounded-md">
                  100% 互動連動
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {FRONTEND_MODULES.map((mod) => {
                  const Icon = mod.icon;
                  return (
                    <div
                      key={mod.id}
                      className="bg-slate-900 border border-slate-800 hover:border-emerald-500/60 rounded-xl p-4 flex flex-col justify-between transition-all group shadow-sm hover:shadow-emerald-950/20"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2.5">
                          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                            <Icon className="w-4.5 h-4.5" />
                          </div>
                          <span className="text-[10px] font-bold bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                            {mod.badge}
                          </span>
                        </div>
                        <h4 className="font-bold text-white text-sm group-hover:text-emerald-300 transition-colors">
                          {mod.name}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                          {mod.desc}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                        <button
                          onClick={() => copyToClipboard(window.location.origin + mod.path, mod.id)}
                          className="text-[11px] text-slate-500 hover:text-slate-300 flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          {copiedLink === mod.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedLink === mod.id ? '已複製！' : '複製直連'}</span>
                        </button>

                        <button
                          onClick={() => {
                            onNavigate(mod.id as ViewMode);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-md flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <span>進入此頁</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 後台 12 大管理系統 */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Server className="w-5 h-5 text-amber-400" />
                    後台綜合管理與營運中樞 (共 17 大子模組)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">涵蓋商品、訂單、合作社審核、TAP履歷、契作募資與財務撥款</p>
                </div>
                <button
                  onClick={() => {
                    onNavigate('admin');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>進入完整後台儀表板</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {BACKEND_MODULES.map((mod, idx) => {
                  const Icon = mod.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-slate-900 border border-slate-800 hover:border-amber-500/60 rounded-xl p-4 flex flex-col justify-between transition-all group"
                    >
                      <div>
                        <div className="flex items-center gap-2.5 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                            <Icon className="w-4 h-4" />
                          </div>
                          <h4 className="font-bold text-white text-sm group-hover:text-amber-300 transition-colors">
                            {mod.name}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {mod.desc}
                        </p>
                      </div>

                      <div className="mt-4 pt-2.5 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
                        <span className="text-[10px] font-mono">子模組 0{idx + 1}</span>
                        <button
                          onClick={() => {
                            onNavigate('admin');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 text-[11px] cursor-pointer"
                        >
                          <span>至後台操作</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* ======================= TAB 5: 多設備響應式演示模擬器 ======================= */}
        {activeTab === 'devices' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Monitor className="w-5 h-5 text-blue-400" />
                    多端響應式設備即時預覽體驗
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    好農方舟完全支援各類螢幕尺寸，點擊切換視窗比例以檢驗斷點排版與觸控體驗。
                  </p>
                </div>

                {/* 設備切換按鈕 */}
                <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
                  <button
                    onClick={() => setPreviewDevice('desktop')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      previewDevice === 'desktop' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>桌上型電腦 (1920px)</span>
                  </button>

                  <button
                    onClick={() => setPreviewDevice('tablet')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      previewDevice === 'tablet' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Tablet className="w-3.5 h-3.5" />
                    <span>平板電腦 (768px)</span>
                  </button>

                  <button
                    onClick={() => setPreviewDevice('mobile')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      previewDevice === 'mobile' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>智慧手機 (390px)</span>
                  </button>
                </div>
              </div>

              {/* 設備模擬外框 */}
              <div className="mt-6 flex justify-center overflow-hidden bg-slate-950/80 p-6 rounded-xl border border-slate-800">
                <div 
                  className={`transition-all duration-300 bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden border-4 border-slate-700 flex flex-col ${
                    previewDevice === 'desktop' ? 'w-full max-w-5xl h-[600px]' :
                    previewDevice === 'tablet' ? 'w-[768px] h-[600px]' :
                    'w-[390px] h-[600px]'
                  }`}
                >
                  {/* 模擬瀏覽器頂部網址列 */}
                  <div className="bg-slate-200 px-3 py-2 border-b border-slate-300 flex items-center justify-between text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <div className="bg-white px-4 py-1 rounded-md text-[11px] font-mono text-slate-600 flex items-center gap-1.5 shadow-2xs">
                      <span>https://haonong.example.tw</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">{previewDevice.toUpperCase()}</span>
                  </div>

                  {/* 模擬內容預覽 */}
                  <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
                    <div className="bg-emerald-800 text-white p-4 rounded-xl">
                      <div className="text-xs font-bold text-emerald-200">好農方舟 HaoNong Ark</div>
                      <div className="text-base font-extrabold mt-1">在地產銷電商・大數據行情中樞</div>
                      <p className="text-[11px] text-emerald-100 mt-1">全台 17 處批發市場即時比價、雙溫層生鮮冷鏈直送</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                        <div className="text-emerald-700 font-bold">🍓 產地冷鏈商城</div>
                        <div className="text-slate-500 text-[10px] mt-0.5">產銷履歷、有機生鮮</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                        <div className="text-emerald-700 font-bold">📈 批發交易行情</div>
                        <div className="text-slate-500 text-[10px] mt-0.5">跨市場比價、動態走勢</div>
                      </div>
                    </div>

                    <div className="bg-slate-100 p-3 rounded-lg border border-dashed border-slate-300 text-center text-xs text-slate-500">
                      模擬設備預覽視窗（您可直接於上方導覽列點選任意功能進行全螢幕操作）
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
};
