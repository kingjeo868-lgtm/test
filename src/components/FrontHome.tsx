import React from 'react';
import { 
  Sprout, 
  TrendingUp, 
  ShieldCheck, 
  Truck, 
  Award, 
  ArrowRight, 
  Sparkles, 
  MapPin, 
  ChevronRight, 
  HeartHandshake,
  BarChart2,
  PhoneCall,
  ShoppingBag,
  Star
} from 'lucide-react';
import { MOCK_PRODUCTS, MOCK_FARMERS, MOCK_MARKET_PRICES } from '../data/mockData';
import { Product, ViewMode } from '../types';
import { SeasonalBanner } from './SeasonalBanner';
import { TaiwanSeasonalCalendar } from './TaiwanSeasonalCalendar';

interface FrontHomeProps {
  onNavigate: (view: ViewMode) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const FrontHome: React.FC<FrontHomeProps> = ({
  onNavigate,
  onSelectProduct,
  onAddToCart
}) => {
  const featuredProducts = MOCK_PRODUCTS.filter(p => p.featured);

  return (
    <div className="min-h-screen bg-slate-50/50">
      
      {/* 1. Hero Banner - High Density */}
      <section className="relative overflow-hidden bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white border-b border-emerald-900">
        {/* Background Overlay Art */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:20px_20px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Hero Text */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 bg-emerald-900/90 border border-emerald-700/60 rounded-full px-3 py-0.5 text-xs font-semibold text-emerald-200 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>台灣優質小農產銷市集 × 農業部大數據行情</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight leading-tight">
                土地的甘甜，<br />
                <span className="text-emerald-400">新鮮直達</span> 您的餐桌。
              </h1>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl font-light">
                嚴選全台友善耕作與產銷履歷小農，嚴格把關 381 項無農藥殘留檢驗。獨家整合農業部批發交易行情與產銷預警大數據，產地透明、價格公開。
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <button
                  id="btn-hero-shop"
                  onClick={() => onNavigate('shop')}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg shadow-xs hover:shadow-emerald-600/30 transition-all flex items-center gap-2 text-xs sm:text-sm group"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>立即選購時令鮮採</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  id="btn-hero-market"
                  onClick={() => onNavigate('market')}
                  className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/20 transition-all flex items-center gap-2 text-xs sm:text-sm"
                >
                  <TrendingUp className="w-4 h-4 text-amber-300" />
                  <span>查看今日批發菜價</span>
                </button>
              </div>

              {/* Feature Badges */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800 text-xs">
                <div>
                  <div className="font-extrabold text-white text-base sm:text-lg font-serif">100%</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">產銷履歷溯源</div>
                </div>
                <div>
                  <div className="font-extrabold text-white text-base sm:text-lg font-serif">雙溫層</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">低溫冷鏈產地直送</div>
                </div>
                <div>
                  <div className="font-extrabold text-white text-base sm:text-lg font-serif">即時同步</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">農業部批發行情</div>
                </div>
              </div>
            </div>

            {/* Hero Right Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 shadow-lg space-y-2.5">
                <div className="relative h-52 sm:h-56 rounded-lg overflow-hidden group">
                  <img
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80"
                    alt="好農蔬果籃"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-2xs">
                    今日清晨鮮採特選
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 bg-slate-950/85 backdrop-blur-md text-white p-2 rounded-md border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold">西螺有機甘藍 × 枋山在欉紅愛文</div>
                      <div className="text-[10px] text-slate-300">中興大學有機農檢 381項 ND 通過</div>
                    </div>
                    <div className="text-amber-300 font-bold font-mono text-xs">
                      產地直發
                    </div>
                  </div>
                </div>

                {/* Real-time Ticker Mini Inside Card */}
                <div className="bg-slate-950/80 rounded-md p-2 border border-slate-800 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-emerald-300 text-[11px]">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    <span>今日台北一市高麗菜均價：</span>
                  </div>
                  <span className="font-mono font-bold text-white text-xs">$24.2 元/kg</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Real-time Market Marquee Ticker */}
      <section className="bg-slate-900 text-slate-100 py-2.5 border-y border-slate-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
          <div className="flex items-center gap-1.5 font-bold text-[11px] shrink-0 text-amber-400 uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5" /> 今日批發即時速報
          </div>
          <div className="flex items-center gap-5 overflow-x-auto no-scrollbar whitespace-nowrap text-xs">
            {MOCK_MARKET_PRICES.map((p) => (
              <div 
                key={p.id} 
                onClick={() => onNavigate('market')}
                className="inline-flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors"
              >
                <span className="text-slate-200 font-medium">{p.cropName}</span>
                <span className="font-mono font-bold text-amber-300">${p.avgPrice}</span>
                <span className={`font-mono text-[10px] ${p.priceChangePercent >= 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {p.priceChangePercent >= 0 ? `+${p.priceChangePercent}%` : `${p.priceChangePercent}%`}
                </span>
                <span className="text-slate-700">|</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Four Core Value Pillars */}
      <section className="py-8 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            <div className="flex items-start space-x-3 p-3 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-xs">100% 產銷履歷與有機驗證</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  政府合法登錄地號，SGS 農藥殘留檢驗未檢出。
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-xs">全程低溫雙溫層冷鏈直送</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  常溫/冷藏/冷凍精準分流，清晨採摘24小時到府。
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <BarChart2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-xs">農業部行情連線透明</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  消除層層盤商剝削，農民合理利潤、顧客實惠。
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <HeartHandshake className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-xs">契作認養友善大地</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  果樹認養與有機蔬菜箱定配，力挺台灣在地小農。
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Interactive Taiwan Agricultural Seasonal Calendar (互動式台灣農產季節曆) */}
      <TaiwanSeasonalCalendar
        products={MOCK_PRODUCTS}
        onSelectProduct={onSelectProduct}
        onAddToCart={onAddToCart}
        onNavigate={onNavigate}
      />

      {/* 5. Seasonal Best Picks Scrolling Carousel Banner (當季首選滾動橫幅) */}
      <SeasonalBanner
        products={MOCK_PRODUCTS}
        onSelectProduct={onSelectProduct}
        onAddToCart={onAddToCart}
        onNavigateShop={() => onNavigate('shop')}
      />

      {/* 6. Featured All-Star Products Grid */}
      <section className="py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
            <div>
              <div className="text-[11px] font-bold text-emerald-700 tracking-wider uppercase mb-0.5">
                FEATURED PICKS
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-serif">
                全館人氣熱銷推薦
              </h2>
            </div>
            <button
              onClick={() => onNavigate('shop')}
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer"
            >
              <span>瀏覽全館農特產</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-2xs hover:shadow-xs transition-all duration-150 cursor-pointer flex flex-col group"
              >
                {/* Image & Badges */}
                <div className="relative h-40 overflow-hidden bg-slate-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                    {product.certifications.map((cert, idx) => (
                      <span
                        key={idx}
                        className="bg-emerald-800/90 text-white text-[10px] font-bold px-1.5 py-0.2 rounded shadow-2xs backdrop-blur-xs"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                  <div className="absolute bottom-2 right-2 bg-slate-900/80 text-white text-[10px] font-medium px-1.5 py-0.2 rounded backdrop-blur-xs">
                    {product.tempZone === 'chilled' ? '冷藏' : product.tempZone === 'frozen' ? '冷凍' : '常溫'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <div className="flex items-center gap-1 text-[10px] text-emerald-800 font-medium mb-0.5">
                      <MapPin className="w-3 h-3" />
                      <span>{product.origin} ｜ {product.farmerName}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-xs leading-snug line-clamp-2 group-hover:text-emerald-800 transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-sm sm:text-base font-black text-emerald-900 font-mono">
                        NT$ {product.price}
                        <span className="text-[10px] font-normal text-slate-500 ml-0.5">/ {product.unit}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 line-through font-mono">
                        原價 ${product.originalPrice}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                      className="p-1.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs transition-colors cursor-pointer"
                      title="加入購物車"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4.5 Farmer Cooperatives Hub Highlight Banner */}
      <section className="py-8 bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white border-y border-emerald-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>農友社場核心中樞・產銷溯源與契作認養</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif">
                全台農業合作社場・TAP 產銷溯源與專屬果樹契作
              </h2>
              <p className="text-emerald-100/80 text-xs sm:text-sm leading-relaxed">
                整合全台 22 縣市農業合作社場名錄、農業部 TAP 產銷履歷 20 碼即時查詢、SGS 381 項安全農檢，以及老欉文旦、愛文芒果、高山茶園小農契作認養。
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                onClick={() => onNavigate('farmer_hub')}
                className="px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <Sprout className="w-4 h-4 text-emerald-950" />
                <span>進入農友社場</span>
                <ArrowRight className="w-4 h-4 text-emerald-950" />
              </button>

              <button
                onClick={() => onNavigate('trace')}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>TAP 產銷溯源查詢</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Farmer Spotlight Story Section */}
      <section className="py-10 sm:py-12 bg-slate-100/60 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="text-[11px] font-bold text-emerald-800 tracking-wider uppercase mb-0.5">
              FARMER STORIES
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-serif">
              與土地共好的農友群像
            </h2>
            <p className="text-slate-600 text-xs mt-1">
              每一把清脆蔬菜與每一顆香甜水果背後，都有職人農友的汗水與對土地的敬畏。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {MOCK_FARMERS.map((farmer) => (
              <div
                key={farmer.id}
                className="bg-white rounded-lg border border-slate-200 p-3.5 shadow-2xs flex flex-col justify-between space-y-2.5 hover:border-emerald-300 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <img
                      src={farmer.avatar}
                      alt={farmer.name}
                      className="w-9 h-9 rounded-full object-cover border border-emerald-600 shrink-0"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">{farmer.name}</h4>
                      <div className="text-[10px] text-slate-500">{farmer.farmName}</div>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-3">
                    {farmer.story}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <div className="text-[10px] text-slate-500 flex items-center justify-between">
                    <span>{farmer.location}</span>
                    <span className="text-emerald-700 font-semibold">履歷號驗證 ✓</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
