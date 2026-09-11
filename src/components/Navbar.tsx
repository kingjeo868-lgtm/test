import React, { useState, useRef, useEffect } from 'react';
import { 
  Sprout, 
  ShoppingBag, 
  TrendingUp, 
  BarChart3, 
  ShieldCheck, 
  Menu, 
  X, 
  Settings, 
  Download, 
  PhoneCall,
  BookOpen,
  Newspaper,
  Mail,
  ChevronDown,
  Info,
  LineChart,
  Layers,
  Sparkles,
  Building2,
  Bot
} from 'lucide-react';
import { ViewMode } from '../types';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  cartCount,
  onOpenCart
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [analyticsDropdownOpen, setAnalyticsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAnalyticsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isAnalyticsActive = currentView === 'market' || currentView === 'stats';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white text-[11px] py-1 px-4 border-b border-emerald-900/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 truncate">
            <span className="bg-emerald-600 text-white font-bold px-1.5 py-0.2 rounded text-[10px] tracking-wide shrink-0">
              即時連線
            </span>
            <span className="truncate text-emerald-100">
              🌾 農業部批發交易行情與產銷履歷即時同步中 ｜ 全館常溫滿 $999、雙溫層低溫滿 $1500 免運直送
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-3 shrink-0 text-emerald-200 text-[11px]">
            <span className="flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-emerald-400" /> 客服專線：0800-088-299
            </span>
            <span className="text-emerald-500/50">|</span>
            <span className="text-emerald-300">產地冷鏈直送</span>
          </div>
        </div>
      </div>

      {/* Main Nav Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          
          {/* Brand Logo (取代原本的首頁按鈕，點擊即回到首頁) */}
          <div 
            onClick={() => {
              onNavigate('home');
              setMobileMenuOpen(false);
            }} 
            className="flex items-center space-x-2.5 cursor-pointer group select-none"
            id="nav-logo"
            title="好農方舟 - 回到首頁"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform duration-200 shrink-0">
              <Sprout className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 font-serif leading-none group-hover:text-emerald-800 transition-colors">
                  好農方舟
                </span>
                <span className="bg-emerald-100 text-emerald-900 text-[10px] font-bold px-1.5 py-0.2 rounded border border-emerald-300">
                  HaoNong Ark
                </span>
              </div>
              <p className="text-[10px] text-emerald-700 font-semibold tracking-wide mt-0.5">
                在地產銷電商・農業部行情與大數據中樞
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            
            {/* 1. 品牌故事 */}
            <button
              id="nav-link-brand_story"
              onClick={() => onNavigate('brand_story')}
              className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                currentView === 'brand_story'
                  ? 'text-emerald-800 bg-emerald-50 shadow-2xs border border-emerald-200'
                  : 'text-slate-700 hover:text-emerald-700 hover:bg-slate-100'
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              <span>品牌故事</span>
            </button>

            {/* 2. 最新消息 */}
            <button
              id="nav-link-news"
              onClick={() => onNavigate('news')}
              className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                currentView === 'news'
                  ? 'text-emerald-800 bg-emerald-50 shadow-2xs border border-emerald-200'
                  : 'text-slate-700 hover:text-emerald-700 hover:bg-slate-100'
              }`}
            >
              <Newspaper className="w-3.5 h-3.5" />
              <span>最新消息</span>
            </button>

            {/* 3. 產地商城 */}
            <button
              id="nav-link-shop"
              onClick={() => onNavigate('shop')}
              className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                currentView === 'shop'
                  ? 'text-emerald-800 bg-emerald-50 shadow-2xs border border-emerald-200'
                  : 'text-slate-700 hover:text-emerald-700 hover:bg-slate-100'
              }`}
            >
              <Sprout className="w-3.5 h-3.5" />
              <span>產地商城</span>
              <span className="text-[9px] bg-emerald-700 text-white font-bold px-1.5 py-0.2 rounded shadow-2xs">
                直送
              </span>
            </button>

            {/* 4. 農友社場 (全台合作社、TAP產銷溯源、小農契作認養、輔導補助、農民學院) */}
            <button
              id="nav-link-farmer_hub"
              onClick={() => onNavigate('farmer_hub')}
              className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentView === 'farmer_hub' || currentView === 'trace' || currentView === 'contract'
                  ? 'text-emerald-800 bg-emerald-50 shadow-2xs border border-emerald-200 ring-1 ring-emerald-400/30'
                  : 'text-slate-700 hover:text-emerald-700 hover:bg-slate-100'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>農友社場</span>
              <span className="text-[9px] bg-amber-500 text-slate-950 font-extrabold px-1.5 py-0.2 rounded shadow-2xs">
                溯源・契作
              </span>
            </button>

            {/* 5. 產業分析 (合併 交易行情 與 生產統計 之 下拉選單) */}
            <div className="relative" ref={dropdownRef}>
              <button
                id="nav-link-analytics"
                onClick={() => setAnalyticsDropdownOpen(!analyticsDropdownOpen)}
                onMouseEnter={() => setAnalyticsDropdownOpen(true)}
                className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isAnalyticsActive
                    ? 'text-emerald-800 bg-emerald-50 shadow-2xs border border-emerald-200'
                    : 'text-slate-700 hover:text-emerald-700 hover:bg-slate-100'
                }`}
              >
                <LineChart className="w-3.5 h-3.5" />
                <span>產業分析</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${analyticsDropdownOpen ? 'rotate-180 text-emerald-700' : 'text-slate-400'}`} />
              </button>

              {/* Dropdown Menu */}
              {analyticsDropdownOpen && (
                <div 
                  onMouseLeave={() => setAnalyticsDropdownOpen(false)}
                  className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                >
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    農業部開放資料整合分析
                  </div>

                  <button
                    onClick={() => {
                      onNavigate('market');
                      setAnalyticsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-start gap-2.5 transition-colors cursor-pointer ${
                      currentView === 'market' ? 'bg-emerald-50 text-emerald-900' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="p-1 rounded bg-amber-50 text-amber-700 mt-0.5">
                      <TrendingUp className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span>即時交易行情</span>
                        <span className="text-[9px] bg-emerald-600 text-white font-mono px-1 py-0.2 rounded font-normal">即時</span>
                      </div>
                      <div className="text-[10px] text-slate-500">
                        17處批發市場交易均價與量能趨勢
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('stats');
                      setAnalyticsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-start gap-2.5 transition-colors cursor-pointer ${
                      currentView === 'stats' ? 'bg-emerald-50 text-emerald-900' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="p-1 rounded bg-teal-50 text-teal-700 mt-0.5">
                      <BarChart3 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span>生產統計與氣象分析</span>
                        <span className="text-[9px] bg-amber-500 text-white font-mono px-1 py-0.2 rounded font-normal">大數據</span>
                      </div>
                      <div className="text-[10px] text-slate-500">
                        產區面積產量、產銷失衡三級預警
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* 6. 專欄報導 */}
            <button
              id="nav-link-articles"
              onClick={() => onNavigate('articles')}
              className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                currentView === 'articles'
                  ? 'text-emerald-800 bg-emerald-50 shadow-2xs border border-emerald-200'
                  : 'text-slate-700 hover:text-emerald-700 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>專欄報導</span>
            </button>

            {/* 6.1 文章 MCP 功能模組 */}
            <button
              id="nav-link-article-mcp"
              onClick={() => onNavigate('article_mcp')}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                currentView === 'article_mcp'
                  ? 'text-purple-900 bg-purple-100/80 shadow-2xs border border-purple-300'
                  : 'text-purple-700 hover:text-purple-900 hover:bg-purple-50'
              }`}
            >
              <Bot className="w-3.5 h-3.5 text-purple-600" />
              <span>文章 MCP</span>
              <span className="text-[9px] bg-purple-600 text-white font-mono px-1 py-0.2 rounded">
                AI
              </span>
            </button>

            {/* 7. 聯絡我們 */}
            <button
              id="nav-link-contact"
              onClick={() => onNavigate('contact')}
              className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                currentView === 'contact'
                  ? 'text-emerald-800 bg-emerald-50 shadow-2xs border border-emerald-200'
                  : 'text-slate-700 hover:text-emerald-700 hover:bg-slate-100'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>聯絡我們</span>
            </button>

          </nav>

          {/* Right Action Icons & Fast Switchers */}
          <div className="flex items-center space-x-2">
            {/* System Demo Hub & Offline Package Button */}
            <button
              id="btn-demo-hub"
              onClick={() => onNavigate('demo_hub')}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                currentView === 'demo_hub' || currentView === 'code_package'
                  ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
                  : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
              }`}
              title="全站前端與後台功能演示、單一離線 HTML 包與完整原始碼下載"
            >
              <Download className="w-3.5 h-3.5 text-amber-700" />
              <span className="hidden xl:inline">⚡ 全站演示與離線包</span>
              <span className="xl:hidden hidden sm:inline">全站演示</span>
            </button>

            {/* Admin Switcher */}
            <button
              id="btn-admin-switch"
              onClick={() => onNavigate('admin')}
              className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                currentView === 'admin'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                  : 'bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200'
              }`}
            >
              <Settings className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">後台管理</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              id="btn-open-cart"
              onClick={onOpenCart}
              className="relative p-2 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 transition-colors"
              aria-label="查看購物車"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-extrabold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-2xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle button */}
            <button
              id="btn-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-700 hover:text-emerald-700 hover:bg-slate-100 lg:hidden"
              aria-label="開啟選單"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2.5 pb-6 space-y-2 shadow-xl max-h-[85vh] overflow-y-auto">
          <div className="text-[10px] font-bold text-slate-400 px-2 pb-0.5 tracking-wider uppercase">
            前台功能選單
          </div>

          <div className="space-y-1">
            <button
              onClick={() => {
                onNavigate('brand_story');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold ${
                currentView === 'brand_story' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Info className="w-4 h-4 text-emerald-600" />
              <span>品牌故事</span>
            </button>

            <button
              onClick={() => {
                onNavigate('news');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold ${
                currentView === 'news' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Newspaper className="w-4 h-4 text-emerald-600" />
              <span>最新消息</span>
            </button>

            <button
              onClick={() => {
                onNavigate('shop');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold ${
                currentView === 'shop' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Sprout className="w-4 h-4 text-emerald-600" />
                <span>產地商城</span>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-900 px-1.5 py-0.2 rounded font-bold">
                嚴選直送
              </span>
            </button>

            <button
              onClick={() => {
                onNavigate('farmer_hub');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold ${
                currentView === 'farmer_hub' || currentView === 'trace' || currentView === 'contract' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-emerald-600" />
                <span>農友社場（溯源・契作・社場名錄）</span>
              </div>
              <span className="text-[10px] bg-amber-500 text-slate-950 px-1.5 py-0.2 rounded font-extrabold">
                核心中樞
              </span>
            </button>

            {/* Mobile 產業分析 Sub-group */}
            <div className="pt-1 pb-1">
              <div className="px-3 py-1 text-[11px] font-bold text-slate-500 bg-slate-100 rounded-md flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <LineChart className="w-3.5 h-3.5 text-emerald-700" />
                  <span>產業分析（農業部）</span>
                </span>
              </div>
              <div className="pl-3 mt-1 space-y-1 border-l-2 border-slate-200 ml-3">
                <button
                  onClick={() => {
                    onNavigate('market');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-bold ${
                    currentView === 'market' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
                    <span>即時交易行情</span>
                  </div>
                  <span className="text-[9px] bg-emerald-600 text-white px-1.5 py-0.2 rounded">批發均價</span>
                </button>

                <button
                  onClick={() => {
                    onNavigate('stats');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-bold ${
                    currentView === 'stats' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-3.5 h-3.5 text-teal-600" />
                    <span>生產統計與氣象分析</span>
                  </div>
                  <span className="text-[9px] bg-teal-600 text-white px-1.5 py-0.2 rounded">產銷預警</span>
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                onNavigate('articles');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold ${
                currentView === 'articles' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>專欄報導</span>
            </button>

            <button
              onClick={() => {
                onNavigate('article_mcp');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold ${
                currentView === 'article_mcp' ? 'bg-purple-100 text-purple-900 border border-purple-300' : 'text-purple-800 bg-purple-50/50 hover:bg-purple-100/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Bot className="w-4 h-4 text-purple-600" />
                <span>文章 MCP 智慧模組</span>
              </div>
              <span className="text-[9px] bg-purple-600 text-white font-mono px-1.5 py-0.2 rounded font-bold">
                MCP v1.4
              </span>
            </button>

            <button
              onClick={() => {
                onNavigate('contact');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold ${
                currentView === 'contact' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Mail className="w-4 h-4 text-emerald-600" />
              <span>聯絡我們</span>
            </button>
          </div>

          <div className="pt-2 border-t border-slate-200 flex flex-col gap-1.5">
            <button
              onClick={() => {
                onNavigate('demo_hub');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 rounded-lg text-xs font-black shadow-sm"
            >
              <Download className="w-4 h-4 text-slate-950" />
              ⚡ 全站全景功能演示・單檔離線包與原始碼下載
            </button>
            <button
              onClick={() => {
                onNavigate('admin');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-1.5 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold"
            >
              <Settings className="w-3.5 h-3.5 text-slate-300" />
              進入系統後台管理系統
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
