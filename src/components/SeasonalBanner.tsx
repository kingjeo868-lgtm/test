import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Flame, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  ShoppingBag, 
  Sun, 
  Flower2, 
  CloudSun, 
  Snowflake, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Droplets
} from 'lucide-react';
import { Product } from '../types';

interface SeasonalBannerProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onNavigateShop?: () => void;
}

type SeasonType = 'spring' | 'summer' | 'autumn' | 'winter';

interface SeasonMeta {
  id: SeasonType;
  name: string;
  solarTermTitle: string;
  themeColor: {
    bg: string;
    border: string;
    text: string;
    activeTab: string;
    glow: string;
    pillBg: string;
    gradient: string;
  };
  icon: React.ElementType;
  monthsText: string;
  tagline: string;
}

const SEASON_METAS: Record<SeasonType, SeasonMeta> = {
  spring: {
    id: 'spring',
    name: '春生時令',
    solarTermTitle: '春分 · 穀雨 · 立夏',
    themeColor: {
      bg: 'from-emerald-950/90 via-teal-950/80 to-slate-900',
      border: 'border-emerald-500/30',
      text: 'text-emerald-300',
      activeTab: 'bg-emerald-600 text-white shadow-emerald-700/50',
      glow: 'shadow-[0_0_25px_rgba(16,185,129,0.15)]',
      pillBg: 'bg-emerald-900/60 text-emerald-200 border-emerald-700/40',
      gradient: 'from-emerald-500 to-teal-400'
    },
    icon: Flower2,
    monthsText: '3 ~ 5 月',
    tagline: '春雨滋潤、萬物萌發，採摘高山第一道鮮綠嫩芽與春茶'
  },
  summer: {
    id: 'summer',
    name: '盛夏鮮果',
    solarTermTitle: '芒種 · 夏至 · 大暑 · 處暑',
    themeColor: {
      bg: 'from-amber-950/90 via-orange-950/80 to-slate-900',
      border: 'border-amber-500/30',
      text: 'text-amber-300',
      activeTab: 'bg-amber-600 text-white shadow-amber-700/50',
      glow: 'shadow-[0_0_25px_rgba(245,158,11,0.15)]',
      pillBg: 'bg-amber-900/60 text-amber-200 border-amber-700/40',
      gradient: 'from-amber-400 to-orange-500'
    },
    icon: Sun,
    monthsText: '6 ~ 8 月',
    tagline: '日照充沛、在欉自然熟成，糖分凝結與海味極鮮大爆發'
  },
  autumn: {
    id: 'autumn',
    name: '金秋豐收',
    solarTermTitle: '立秋 · 白露 · 秋分 · 寒露',
    themeColor: {
      bg: 'from-orange-950/90 via-amber-950/80 to-slate-900',
      border: 'border-orange-500/30',
      text: 'text-orange-300',
      activeTab: 'bg-orange-600 text-white shadow-orange-700/50',
      glow: 'shadow-[0_0_25px_rgba(249,115,22,0.15)]',
      pillBg: 'bg-orange-900/60 text-orange-200 border-orange-700/40',
      gradient: 'from-orange-400 to-amber-500'
    },
    icon: CloudSun,
    monthsText: '9 ~ 11 月',
    tagline: '稻穗金黃、老欉柚香飄溢，歲月沉澱的最醇甘甜'
  },
  winter: {
    id: 'winter',
    name: '暖冬滋補',
    solarTermTitle: '立冬 · 大雪 · 冬至 · 大寒',
    themeColor: {
      bg: 'from-cyan-950/90 via-slate-950/80 to-slate-900',
      border: 'border-cyan-500/30',
      text: 'text-cyan-300',
      activeTab: 'bg-cyan-600 text-white shadow-cyan-700/50',
      glow: 'shadow-[0_0_25px_rgba(6,182,212,0.15)]',
      pillBg: 'bg-cyan-900/60 text-cyan-200 border-cyan-700/40',
      gradient: 'from-cyan-400 to-blue-500'
    },
    icon: Snowflake,
    monthsText: '12 ~ 2 月',
    tagline: '低溫凝糖草莓、白玉甜根與安心肉品，溫潤呵護闔家餐桌'
  }
};

export const SeasonalBanner: React.FC<SeasonalBannerProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onNavigateShop
}) => {
  // 1. Detect current calendar season automatically
  const detectCurrentSeason = (): SeasonType => {
    const month = new Date().getMonth() + 1; // 1 - 12
    if (month >= 3 && month <= 5) return 'spring';
    if (month >= 6 && month <= 8) return 'summer';
    if (month >= 9 && month <= 11) return 'autumn';
    return 'winter';
  };

  const currentSystemSeason = detectCurrentSeason();
  const [selectedSeason, setSelectedSeason] = useState<SeasonType>(currentSystemSeason);
  const [isAutoScroll, setIsAutoScroll] = useState<boolean>(true);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  // 2. Countdown timer for today's seasonal harvest batch dispatch
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 42, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 3. Filter products for the active season
  const seasonalProducts = products.filter(p => {
    if (!p.season) return p.isSeasonalSpecial;
    return p.season === selectedSeason;
  });

  // Fallback if none match
  const displayProducts = seasonalProducts.length > 0 ? seasonalProducts : products.slice(0, 5);

  const meta = SEASON_METAS[selectedSeason];
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 4. Scroll navigation handlers
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // 5. Autoplay scrolling
  useEffect(() => {
    if (!isAutoScroll) return;
    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 20) {
          scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollContainerRef.current.scrollTo({ left: scrollLeft + 320, behavior: 'smooth' });
        }
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [isAutoScroll, displayProducts.length]);

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 1200);
  };

  return (
    <section 
      id="seasonal-specials-banner"
      className="relative my-8 sm:my-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      aria-label="當季首選滾動橫幅"
    >
      {/* Outer Banner Card Container with High-Craft Glass & Gradient */}
      <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${meta.themeColor.bg} border ${meta.themeColor.border} text-white shadow-xl ${meta.themeColor.glow} transition-all duration-700`}>
        
        {/* Subtle Decorative Ambient Background Lights */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-radial from-white/10 via-transparent to-transparent opacity-40 blur-2xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-radial from-emerald-500/10 via-transparent to-transparent opacity-30 blur-3xl pointer-events-none"></div>

        {/* Top Header Bar: Season Title, Tabs, and Live Countdown */}
        <div className="relative z-10 p-5 sm:p-7 border-b border-white/10 bg-slate-950/40 backdrop-blur-md">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            
            {/* Title & Season Solar Term */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <div className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold ${meta.themeColor.pillBg} border backdrop-blur-xs`}>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                  <span>24 節氣風土旬味 · 【{meta.solarTermTitle}】</span>
                </div>

                {selectedSeason === currentSystemSeason && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    當前在地最佳時令
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <h2 className="text-2xl sm:text-3xl font-black font-serif tracking-tight text-white flex items-center gap-2.5">
                  <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                    當季首選
                  </span>
                  <span className={`bg-gradient-to-r ${meta.themeColor.gradient} bg-clip-text text-transparent`}>
                    產地鮮摘特惠
                  </span>
                </h2>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm font-light max-w-xl">
                {meta.tagline}
              </p>
            </div>

            {/* Right Controls: Four-Season Tab Switcher & Flash Countdown */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
              
              {/* Four Season Pills */}
              <div className="inline-flex p-1 bg-slate-900/80 rounded-xl border border-white/10 shadow-inner">
                {(Object.keys(SEASON_METAS) as SeasonType[]).map((key) => {
                  const s = SEASON_METAS[key];
                  const Icon = s.icon;
                  const isCurrent = key === selectedSeason;
                  return (
                    <button
                      key={key}
                      id={`btn-season-${key}`}
                      onClick={() => {
                        setSelectedSeason(key);
                        if (scrollContainerRef.current) {
                          scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                        }
                      }}
                      className={`relative px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer select-none ${
                        isCurrent
                          ? `${s.themeColor.activeTab} shadow-sm scale-102`
                          : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{s.name}</span>
                      {key === currentSystemSeason && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping absolute top-1 right-1"></span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Live Dispatch Countdown Box */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-rose-950/60 border border-rose-500/40 rounded-xl text-rose-200 text-xs">
                <Flame className="w-4 h-4 text-rose-400 animate-bounce shrink-0" />
                <div className="flex items-center gap-1 font-mono font-bold">
                  <span className="text-[11px] text-rose-300 font-sans mr-0.5">本日搶鮮配倒數</span>
                  <span className="bg-rose-900/90 px-1.5 py-0.5 rounded text-white text-xs">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span>:</span>
                  <span className="bg-rose-900/90 px-1.5 py-0.5 rounded text-white text-xs">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span>:</span>
                  <span className="bg-rose-900/90 px-1.5 py-0.5 rounded text-amber-300 text-xs">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Carousel Content Body */}
        <div className="relative p-5 sm:p-7">
          
          {/* Scroll Navigation Arrows (Floating) */}
          <div className="flex items-center justify-between absolute top-1/2 -translate-y-1/2 left-2 right-2 z-20 pointer-events-none">
            <button
              id="btn-seasonal-scroll-prev"
              onClick={() => scroll('left')}
              className="pointer-events-auto w-10 h-10 rounded-full bg-slate-900/90 hover:bg-slate-800 text-white border border-white/20 shadow-lg flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-sm group"
              aria-label="查看前一組當季農產"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
              id="btn-seasonal-scroll-next"
              onClick={() => scroll('right')}
              className="pointer-events-auto w-10 h-10 rounded-full bg-slate-900/90 hover:bg-slate-800 text-white border border-white/20 shadow-lg flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-sm group"
              aria-label="查看後一組當季農產"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Horizontal Product Cards Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth pb-2 pt-1 px-1 snap-x snap-mandatory"
            onMouseEnter={() => setIsAutoScroll(false)}
            onMouseLeave={() => setIsAutoScroll(true)}
          >
            {displayProducts.map((product) => {
              const discountPercent = product.originalPrice > product.price 
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
                : 0;

              return (
                <div
                  key={product.id}
                  id={`seasonal-card-${product.id}`}
                  onClick={() => onSelectProduct(product)}
                  className="w-[280px] sm:w-[310px] shrink-0 snap-start bg-slate-900/80 hover:bg-slate-900 border border-white/15 hover:border-amber-400/50 rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group cursor-pointer relative backdrop-blur-sm"
                >
                  {/* Top Image Box with Promotion Badges */}
                  <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-800">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />

                    {/* Gradient Overlay for legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/30"></div>

                    {/* Top Left: Promotion Special Tag with Pulsing Animation */}
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 items-start">
                      {product.promoDiscountText && (
                        <div className="inline-flex items-center gap-1 bg-gradient-to-r from-rose-600 to-amber-500 text-white text-[11px] font-black px-2.5 py-0.5 rounded-md shadow-md animate-pulse">
                          <Flame className="w-3 h-3 text-amber-200" />
                          <span>{product.promoDiscountText}</span>
                        </div>
                      )}

                      {product.solarTerm && (
                        <span className="bg-slate-900/90 text-amber-300 border border-amber-500/40 text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                          {product.solarTerm}
                        </span>
                      )}
                    </div>

                    {/* Top Right: Brix Sweetness or Cold Chain */}
                    <div className="absolute top-2.5 right-2.5 flex flex-col gap-1 items-end">
                      {product.sweetnessBrix && (
                        <div className="bg-amber-400/95 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
                          <Droplets className="w-3 h-3 text-amber-900" />
                          <span>{product.sweetnessBrix}° Brix 完熟</span>
                        </div>
                      )}

                      <span className="bg-slate-950/80 text-slate-200 text-[10px] font-medium px-1.5 py-0.5 rounded border border-white/10">
                        {product.tempZone === 'chilled' ? '❄️ 低溫冷藏' : product.tempZone === 'frozen' ? '🧊 活體急凍' : '📦 常溫配送'}
                      </span>
                    </div>

                    {/* Bottom of Image: Origin & Farm Information */}
                    <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-slate-200 text-[11px]">
                      <div className="flex items-center gap-1 font-medium truncate">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{product.origin} · {product.farmName}</span>
                      </div>
                      <span className="text-[10px] text-emerald-300 font-mono shrink-0 ml-1">
                        TAP 驗證 ✓
                      </span>
                    </div>
                  </div>

                  {/* Card Content & Pricing Section */}
                  <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-3">
                    
                    <div>
                      {/* Product Name */}
                      <h3 className="font-bold text-white text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-amber-300 transition-colors">
                        {product.name}
                      </h3>

                      {/* Product Description */}
                      <p className="text-slate-400 text-xs mt-1.5 line-clamp-2 leading-relaxed font-light">
                        {product.description}
                      </p>
                    </div>

                    {/* Urgency Progress Bar (Rush Stock indicator) */}
                    <div className="space-y-1 bg-slate-950/60 p-2 rounded-lg border border-white/5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-rose-400 font-bold flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>搶購熱度</span>
                        </span>
                        <span className="text-slate-300 font-mono text-[10px]">
                          剩餘 <strong className="text-amber-300">{product.rushStockLeft || 12}</strong> {product.unit} / 已售 {product.soldCount}
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full"
                          style={{ width: `${Math.min(92, Math.max(45, 100 - (product.rushStockLeft || 10) * 3))}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Price and Add to Cart Action */}
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-lg sm:text-xl font-black font-mono text-amber-300">
                            NT$ {product.price}
                          </span>
                          <span className="text-[11px] text-slate-400 font-normal">
                            / {product.unit}
                          </span>
                        </div>
                        {product.originalPrice > product.price && (
                          <div className="flex items-center gap-1 text-[11px] text-slate-400">
                            <span className="line-through font-mono">原價 ${product.originalPrice}</span>
                            <span className="text-rose-400 font-semibold text-[10px]">省 ${product.originalPrice - product.price}</span>
                          </div>
                        )}
                      </div>

                      {/* Quick Add Button with Feedback Animation */}
                      <button
                        id={`btn-quick-add-${product.id}`}
                        onClick={(e) => handleQuickAdd(e, product)}
                        className={`px-3 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all duration-200 cursor-pointer shadow-sm ${
                          addedProductId === product.id
                            ? 'bg-emerald-500 text-white scale-105'
                            : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white hover:shadow-emerald-600/40'
                        }`}
                        title="立即加入採購車"
                      >
                        {addedProductId === product.id ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 animate-bounce" />
                            <span>已搶進！</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>搶鮮入袋</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Footer Bar: Quick Link to Shop & Autoplay status */}
          <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>
                每季精選依農業部產地氣候與採收週期自動滾動更新，支持在地履歷小農。
              </span>
            </div>

            {onNavigateShop && (
              <button
                id="btn-view-all-seasonal-shop"
                onClick={onNavigateShop}
                className="inline-flex items-center gap-1.5 font-bold text-amber-300 hover:text-amber-200 transition-colors cursor-pointer group"
              >
                <span>探索【{meta.name}】全系列時令蔬果</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
