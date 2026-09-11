import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  Sun, 
  CloudSun, 
  Snowflake, 
  Flower2, 
  Sparkles, 
  MapPin, 
  ShoppingBag, 
  ChevronRight, 
  CheckCircle2, 
  TrendingUp, 
  Droplets,
  Award,
  ArrowRight,
  Info,
  Clock,
  Flame,
  Filter
} from 'lucide-react';
import { Product, ViewMode } from '../types';

interface TaiwanSeasonalCalendarProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onNavigate: (view: ViewMode) => void;
}

export type SeasonKey = 'all' | 'spring' | 'summer' | 'autumn' | 'winter';

interface MonthData {
  month: number;
  monthName: string;
  seasonKey: 'spring' | 'summer' | 'autumn' | 'winter';
  seasonLabel: string;
  solarTerms: string;
  proverb: string;
  climateNote: string;
  healthTip: string;
  keyProduce: string[];
  themeColor: {
    badge: string;
    border: string;
    bgGradient: string;
    pillActive: string;
    accentText: string;
  };
}

export const MONTH_CALENDAR_DATA: MonthData[] = [
  {
    month: 1,
    monthName: '1月 · 臘月',
    seasonKey: 'winter',
    seasonLabel: '暖冬滋補',
    solarTerms: '小寒 · 大寒',
    proverb: '大寒歲底慶豐年，大湖香水草莓甜如蜜',
    climateNote: '冬季冷氣團南下，日夜溫差最大期，最利於草莓與高山根莖糖分自然凝聚。',
    healthTip: '【當令食育】宜溫補養腎，美濃白玉蘿蔔搭配安心豬肉排燉湯，清甜生津暖脾胃。',
    keyProduce: ['大湖香水草莓', '美濃白玉蘿蔔', '黑珍珠蓮霧', '口湖烏魚子', '高山甘藍'],
    themeColor: {
      badge: 'bg-cyan-900/80 text-cyan-200 border-cyan-700/50',
      border: 'border-cyan-500/40',
      bgGradient: 'from-cyan-950 via-slate-900 to-slate-950',
      pillActive: 'bg-cyan-600 text-white shadow-cyan-900/50',
      accentText: 'text-cyan-400'
    }
  },
  {
    month: 2,
    monthName: '2月 · 初春',
    seasonKey: 'winter',
    seasonLabel: '春節報喜',
    solarTerms: '立春 · 雨水',
    proverb: '立春春雨潤無聲，屏東黑珍珠蓮霧如紅寶石',
    climateNote: '立春大地回春，南方海風吹拂，屏東蓮霧受鹽地洗禮，色澤暗紅甜脆爆汁。',
    healthTip: '【春節養生】多攝取高水分與天然抗氧化水果，黑珍珠蓮霧與草莓解膩解熱。',
    keyProduce: ['黑珍珠蓮霧', '香水草莓', '雲林快樂豬', '三星蔥', '高麗菜'],
    themeColor: {
      badge: 'bg-cyan-900/80 text-cyan-200 border-cyan-700/50',
      border: 'border-cyan-500/40',
      bgGradient: 'from-cyan-950 via-slate-900 to-slate-950',
      pillActive: 'bg-cyan-600 text-white shadow-cyan-900/50',
      accentText: 'text-cyan-400'
    }
  },
  {
    month: 3,
    monthName: '3月 · 仲春',
    seasonKey: 'spring',
    seasonLabel: '春生萌發',
    solarTerms: '驚蟄 · 春分',
    proverb: '春分麥起青蔥翠，阿里山頭採春茶破曉出',
    climateNote: '春雷初響萬物萌動，高山茶樹吸納清晨冷冽雲霧，茶多酚與甘甜胺基酸最豐沛。',
    healthTip: '【初春醒脾】春季宜養肝，多食用清脆溫室小黃瓜與春茶，清熱利水調和氣血。',
    keyProduce: ['阿里山金萱春茶', '溫室水果小黃瓜', '黑珍珠蓮霧', '大湖草莓尾季', '有機高麗菜'],
    themeColor: {
      badge: 'bg-emerald-900/80 text-emerald-200 border-emerald-700/50',
      border: 'border-emerald-500/40',
      bgGradient: 'from-emerald-950 via-slate-900 to-slate-950',
      pillActive: 'bg-emerald-600 text-white shadow-emerald-900/50',
      accentText: 'text-emerald-400'
    }
  },
  {
    month: 4,
    monthName: '4月 · 暮春',
    seasonKey: 'spring',
    seasonLabel: '穀雨清鮮',
    solarTerms: '清明 · 穀雨',
    proverb: '穀雨茶香飄滿山，嘉義極光哈密瓜初熟透',
    climateNote: '穀雨綿綿潤百穀，高山茶園進入「春茶盛產大採期」，嘉義溫室極光哈密瓜焦糖香初現。',
    healthTip: '【穀雨防濕】多飲用手採高山金萱，生津止渴、去油解膩，佐以清脆綠蔬強健體質。',
    keyProduce: ['阿里山高山春茶', '極光哈密瓜', '溫室小黃瓜', '黑珍珠蓮霧', '有機甘藍'],
    themeColor: {
      badge: 'bg-emerald-900/80 text-emerald-200 border-emerald-700/50',
      border: 'border-emerald-500/40',
      bgGradient: 'from-emerald-950 via-slate-900 to-slate-950',
      pillActive: 'bg-emerald-600 text-white shadow-emerald-900/50',
      accentText: 'text-emerald-400'
    }
  },
  {
    month: 5,
    monthName: '5月 · 初夏',
    seasonKey: 'spring',
    seasonLabel: '初夏果香',
    solarTerms: '立夏 · 小滿',
    proverb: '立夏初盛麥浪金，卓蘭巨峰紫珍珠掛滿棚',
    climateNote: '氣溫回升日照加長，卓蘭大安溪畔巨峰葡萄披上白濃果粉，甜度直破 18 度。',
    healthTip: '【立夏養心】補充天然花青素與維生素，葡萄與橙肉哈密瓜助抗氧化、生津提神。',
    keyProduce: ['卓蘭巨峰葡萄', '極光哈密瓜', '枋山愛文芒果早產', '溫室小黃瓜', '金萱春茶'],
    themeColor: {
      badge: 'bg-teal-900/80 text-teal-200 border-teal-700/50',
      border: 'border-teal-500/40',
      bgGradient: 'from-teal-950 via-slate-900 to-slate-950',
      pillActive: 'bg-teal-600 text-white shadow-teal-900/50',
      accentText: 'text-teal-400'
    }
  },
  {
    month: 6,
    monthName: '6月 · 仲夏',
    seasonKey: 'summer',
    seasonLabel: '盛夏芒種',
    solarTerms: '芒種 · 夏至',
    proverb: '夏至艷陽落山風，枋山在欉紅愛文香透半邊天',
    climateNote: '南台灣艷陽高照，恆春落山風加速果實水分代謝，愛文芒果在欉自然紅熟無纖維。',
    healthTip: '【消暑防熱】鮮食愛文芒果與冷泡小黃瓜片，富含β-胡蘿蔔素與電解質，清爽解暑。',
    keyProduce: ['枋山在欉紅愛文芒果', '卓蘭巨峰葡萄', '七股無毒白蝦', '溫室水果小黃瓜', '極光哈密瓜'],
    themeColor: {
      badge: 'bg-amber-900/80 text-amber-200 border-amber-700/50',
      border: 'border-amber-500/40',
      bgGradient: 'from-amber-950 via-slate-900 to-slate-950',
      pillActive: 'bg-amber-600 text-white shadow-amber-900/50',
      accentText: 'text-amber-400'
    }
  },
  {
    month: 7,
    monthName: '7月 · 季夏',
    seasonKey: 'summer',
    seasonLabel: '大暑極鮮',
    solarTerms: '小暑 · 大暑',
    proverb: '大暑盛夏水氣旺，七股純海水白蝦極鮮彈牙',
    climateNote: '夏季高溫海水浮游生物豐富，七股低密度生態池白蝦活動力旺盛，肉質緊緻甘美。',
    healthTip: '【三伏清補】高蛋白低脂肪海鮮為首選，白蝦川燙搭檸檬薑絲，少油健康補體力。',
    keyProduce: ['枋山愛文芒果', '七股純海水白蝦', '太麻里大目釋迦早採', '卓蘭巨峰葡萄', '富里新米'],
    themeColor: {
      badge: 'bg-amber-900/80 text-amber-200 border-amber-700/50',
      border: 'border-amber-500/40',
      bgGradient: 'from-amber-950 via-slate-900 to-slate-950',
      pillActive: 'bg-amber-600 text-white shadow-amber-900/50',
      accentText: 'text-amber-400'
    }
  },
  {
    month: 8,
    monthName: '8月 · 初秋',
    seasonKey: 'summer',
    seasonLabel: '處暑鮮採 (本月)',
    solarTerms: '立秋 · 處暑',
    proverb: '處暑熱退秋風起，老欉文旦柚香引領中秋',
    climateNote: '立秋至處暑，南風漸收秋露微生。麻豆50年老欉文旦開始進入採收辭水黃金期。',
    healthTip: '【潤燥養肺】文旦柚富含膳食纖維與維生素C，搭配西螺有機高麗菜清炒，去油解膩。',
    keyProduce: ['麻豆老欉文旦(預購)', '枋山愛文芒果(末期珍藏)', '西螺特級有機高麗菜', '七股無毒白蝦', '太麻里釋迦'],
    themeColor: {
      badge: 'bg-orange-900/80 text-orange-200 border-orange-700/50',
      border: 'border-orange-500/40',
      bgGradient: 'from-orange-950 via-slate-900 to-slate-950',
      pillActive: 'bg-orange-600 text-white shadow-orange-900/50',
      accentText: 'text-orange-400'
    }
  },
  {
    month: 9,
    monthName: '9月 · 仲秋',
    seasonKey: 'autumn',
    seasonLabel: '金秋白露',
    solarTerms: '白露 · 秋分',
    proverb: '白露秋分夜微涼，麻豆文旦辭水如蜜晶瑩',
    climateNote: '秋高氣爽，文旦經一周辭水後表皮微皺，果肉由脆轉軟嫩，甜度達到極致回甘。',
    healthTip: '【秋日潤補】享用多汁文旦與太麻里釋迦，佐以埔里厚肉段木香菇燉雞，潤燥強身。',
    keyProduce: ['麻豆老欉文旦', '太麻里大目釋迦', '埔里段木香菇', '西螺高麗菜', '七股無毒白蝦'],
    themeColor: {
      badge: 'bg-orange-900/80 text-orange-200 border-orange-700/50',
      border: 'border-orange-500/40',
      bgGradient: 'from-orange-950 via-slate-900 to-slate-950',
      pillActive: 'bg-orange-600 text-white shadow-orange-900/50',
      accentText: 'text-orange-400'
    }
  },
  {
    month: 10,
    monthName: '10月 · 季秋',
    seasonKey: 'autumn',
    seasonLabel: '寒露秋收',
    solarTerms: '寒露 · 霜降',
    proverb: '寒露新米飄芋香，埔里高山原木香菇慢火烘',
    climateNote: '花蓮富里二期稻作灌溉麥飯石清泉，米粒晶瑩飽滿；埔里山林低溫慢火烘出香菇濃香。',
    healthTip: '【健脾養胃】新米飯搭配有機乾香菇、三星蔥煮粥，溫補脾胃、安神暖身。',
    keyProduce: ['花蓮富里御皇香米', '埔里有機段木香菇', '宜蘭三星有機蔥', '太麻里釋迦', '有機高麗菜'],
    themeColor: {
      badge: 'bg-amber-900/80 text-amber-200 border-amber-700/50',
      border: 'border-amber-500/40',
      bgGradient: 'from-amber-950 via-slate-900 to-slate-950',
      pillActive: 'bg-amber-600 text-white shadow-amber-900/50',
      accentText: 'text-amber-400'
    }
  },
  {
    month: 11,
    monthName: '11月 · 孟冬',
    seasonKey: 'winter',
    seasonLabel: '立冬進補',
    solarTerms: '立冬 · 小雪',
    proverb: '立冬溫補暖脾胃，美濃白玉蘿蔔燉梅花排',
    climateNote: '冬風起，美濃平原限定種植白玉蘿蔔，土壤鬆軟無渣，清甜多汁；雲林安心豬油花正美。',
    healthTip: '【立冬食補】白玉蘿蔔與產銷履歷梅花排骨細火慢燉，不寒不燥、溫潤補虛。',
    keyProduce: ['美濃白玉蘿蔔', '雲林快樂豬梅花肉', '宜蘭三星蔥', '埔里段木香菇', '口湖日曬烏魚子早產'],
    themeColor: {
      badge: 'bg-cyan-900/80 text-cyan-200 border-cyan-700/50',
      border: 'border-cyan-500/40',
      bgGradient: 'from-cyan-950 via-slate-900 to-slate-950',
      pillActive: 'bg-cyan-600 text-white shadow-cyan-900/50',
      accentText: 'text-cyan-400'
    }
  },
  {
    month: 12,
    monthName: '12月 · 季冬',
    seasonKey: 'winter',
    seasonLabel: '冬至烏金',
    solarTerms: '大雪 · 冬至',
    proverb: '冬至烏金海風鹹，大湖香水草莓第一茬搶鮮',
    climateNote: '冬至前後東北季風強勁，烏魚順寒流南下，口湖遵循七道古法日曬壓出透光琥珀烏魚子。',
    healthTip: '【嚴冬蓄陽】炙燒烏魚子佐三星青蔥片，搭配香甜大湖草莓，年節圍爐宴客極品。',
    keyProduce: ['口湖古法日曬烏魚子', '大湖香水草莓', '美濃白玉蘿蔔', '雲林快樂豬', '卓蘭巨峰冬果'],
    themeColor: {
      badge: 'bg-cyan-900/80 text-cyan-200 border-cyan-700/50',
      border: 'border-cyan-500/40',
      bgGradient: 'from-cyan-950 via-slate-900 to-slate-950',
      pillActive: 'bg-cyan-600 text-white shadow-cyan-900/50',
      accentText: 'text-cyan-400'
    }
  }
];

export const TaiwanSeasonalCalendar: React.FC<TaiwanSeasonalCalendarProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onNavigate
}) => {
  // Current calendar month (1 - 12), default to 8 (August in current metadata or real date)
  const currentActualMonth = useMemo(() => {
    const d = new Date();
    return d.getMonth() + 1; // 1-12
  }, []);

  const [selectedMonth, setSelectedMonth] = useState<number>(currentActualMonth);
  const [selectedSeasonFilter, setSelectedSeasonFilter] = useState<SeasonKey>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  // Month metadata
  const currentMonthData = useMemo(() => {
    return MONTH_CALENDAR_DATA.find(m => m.month === selectedMonth) || MONTH_CALENDAR_DATA[7];
  }, [selectedMonth]);

  // Filter months by season tab
  const visibleMonths = useMemo(() => {
    if (selectedSeasonFilter === 'all') return MONTH_CALENDAR_DATA;
    return MONTH_CALENDAR_DATA.filter(m => m.seasonKey === selectedSeasonFilter);
  }, [selectedSeasonFilter]);

  // Filter products for the selected month
  const seasonalProducts = useMemo(() => {
    return products.filter(p => {
      // 1. Month match: has harvestMonths including selectedMonth
      const matchesMonth = p.harvestMonths ? p.harvestMonths.includes(selectedMonth) : true;
      
      // 2. Category match
      if (selectedCategory === 'all') return matchesMonth;
      if (selectedCategory === 'fruit') return matchesMonth && p.category === 'fruit';
      if (selectedCategory === 'vegetable') return matchesMonth && p.category === 'vegetable';
      if (selectedCategory === 'meat_seafood') return matchesMonth && (p.category === 'meat' || p.category === 'seafood');
      if (selectedCategory === 'processed') return matchesMonth && p.category === 'processed';
      return matchesMonth;
    });
  }, [products, selectedMonth, selectedCategory]);

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 1600);
  };

  const getSeasonIcon = (seasonKey: string) => {
    switch (seasonKey) {
      case 'spring': return Flower2;
      case 'summer': return Sun;
      case 'autumn': return CloudSun;
      case 'winter': return Snowflake;
      default: return Calendar;
    }
  };

  const SeasonIcon = getSeasonIcon(currentMonthData.seasonKey);

  return (
    <section id="taiwan-seasonal-calendar-section" className="py-12 bg-slate-900 text-white relative overflow-hidden border-y border-emerald-950">
      {/* Visual background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
        
        {/* 1. Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold mb-2">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>二十四節氣 · 台灣旬農產時令表</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-serif tracking-tight text-white flex items-center gap-3">
              <span>台灣農產季節曆</span>
              <span className="text-xs sm:text-sm font-sans font-medium px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                順時而食 · 產地對時
              </span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl font-light leading-relaxed">
              順應節氣更迭，品嚐大自然最甘甜的滋味。點選不同月份，即時瀏覽全台當令盛產履歷鮮果、有機蔬菜與海味好物。
            </p>
          </div>

          {/* Quick jump to current month */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedMonth(currentActualMonth)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border cursor-pointer ${
                selectedMonth === currentActualMonth
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs'
                  : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border-slate-700'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <span>回到當前月份 ({currentActualMonth}月)</span>
            </button>
            <button
              onClick={() => onNavigate('shop')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-all flex items-center gap-1 border border-white/20 cursor-pointer"
            >
              <span>市集全覽</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2. Interactive Month Selector Carousel / Grid */}
        <div className="space-y-3">
          {/* Season Filter Tabs */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setSelectedSeasonFilter('all')}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  selectedSeasonFilter === 'all'
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                全年 12 月
              </button>
              <button
                onClick={() => setSelectedSeasonFilter('spring')}
                className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  selectedSeasonFilter === 'spring'
                    ? 'bg-teal-600 text-white shadow-2xs'
                    : 'text-slate-400 hover:text-teal-300'
                }`}
              >
                <Flower2 className="w-3 h-3 text-teal-400" />
                <span>春季 (3~5月)</span>
              </button>
              <button
                onClick={() => setSelectedSeasonFilter('summer')}
                className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  selectedSeasonFilter === 'summer'
                    ? 'bg-amber-600 text-white shadow-2xs'
                    : 'text-slate-400 hover:text-amber-300'
                }`}
              >
                <Sun className="w-3 h-3 text-amber-400" />
                <span>夏季 (6~8月)</span>
              </button>
              <button
                onClick={() => setSelectedSeasonFilter('autumn')}
                className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  selectedSeasonFilter === 'autumn'
                    ? 'bg-orange-600 text-white shadow-2xs'
                    : 'text-slate-400 hover:text-orange-300'
                }`}
              >
                <CloudSun className="w-3 h-3 text-orange-400" />
                <span>秋季 (9~11月)</span>
              </button>
              <button
                onClick={() => setSelectedSeasonFilter('winter')}
                className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  selectedSeasonFilter === 'winter'
                    ? 'bg-cyan-600 text-white shadow-2xs'
                    : 'text-slate-400 hover:text-cyan-300'
                }`}
              >
                <Snowflake className="w-3 h-3 text-cyan-400" />
                <span>冬季 (12~2月)</span>
              </button>
            </div>

            <div className="text-xs text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>點擊月份卡片即時切換當季推薦</span>
            </div>
          </div>

          {/* 12 Months Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-2">
            {MONTH_CALENDAR_DATA.map((m) => {
              const isSelected = selectedMonth === m.month;
              const isCurrent = currentActualMonth === m.month;
              const MIcon = getSeasonIcon(m.seasonKey);

              return (
                <button
                  key={m.month}
                  id={`btn-month-${m.month}`}
                  onClick={() => setSelectedMonth(m.month)}
                  className={`relative p-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden group ${
                    isSelected
                      ? 'bg-gradient-to-b from-slate-800 to-slate-900 border-emerald-400 ring-2 ring-emerald-500/40 shadow-lg scale-[1.03] z-10'
                      : 'bg-slate-950/60 hover:bg-slate-800/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Current Month Pulsing Badge */}
                  {isCurrent && (
                    <div className="absolute top-1.5 right-1.5 flex items-center">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                    </div>
                  )}

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-base font-black font-serif ${
                        isSelected ? 'text-emerald-400' : 'text-white'
                      }`}>
                        {m.month}月
                      </span>
                      <MIcon className={`w-3.5 h-3.5 ${
                        m.seasonKey === 'spring' ? 'text-teal-400' :
                        m.seasonKey === 'summer' ? 'text-amber-400' :
                        m.seasonKey === 'autumn' ? 'text-orange-400' : 'text-cyan-400'
                      }`} />
                    </div>

                    <div className="text-[10px] font-medium text-slate-400 truncate">
                      {m.solarTerms}
                    </div>
                  </div>

                  <div className="pt-2 mt-1 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                    <span className={`px-1 py-0.2 rounded text-[9px] font-bold ${
                      m.seasonKey === 'spring' ? 'bg-teal-950 text-teal-300 border border-teal-800/50' :
                      m.seasonKey === 'summer' ? 'bg-amber-950 text-amber-300 border border-amber-800/50' :
                      m.seasonKey === 'autumn' ? 'bg-orange-950 text-orange-300 border border-orange-800/50' :
                      'bg-cyan-950 text-cyan-300 border border-cyan-800/50'
                    }`}>
                      {m.seasonLabel.split(' ')[0]}
                    </span>
                    {isSelected && (
                      <span className="text-[9px] text-emerald-400 font-bold">選取中</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Selected Month Detail Banner & Agricultural Wisdom */}
        <div className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-r ${currentMonthData.themeColor.bgGradient} border ${currentMonthData.themeColor.border} shadow-xl relative overflow-hidden transition-all duration-300`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            
            {/* Left Wisdom & Proverb */}
            <div className="lg:col-span-8 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${currentMonthData.themeColor.badge}`}>
                  {currentMonthData.monthName}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/15">
                  節氣：{currentMonthData.solarTerms}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                  <SeasonIcon className="w-3 h-3" />
                  <span>{currentMonthData.seasonLabel}</span>
                </span>
              </div>

              <div className="space-y-1">
                <blockquote className="text-base sm:text-lg font-serif font-bold text-white tracking-wide flex items-center gap-2">
                  <span className="text-amber-400 text-xl font-serif">「</span>
                  <span>{currentMonthData.proverb}</span>
                  <span className="text-amber-400 text-xl font-serif">」</span>
                </blockquote>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  {currentMonthData.climateNote}
                </p>
              </div>

              {/* Health & Culinary Tip */}
              <div className="bg-slate-950/60 backdrop-blur-md rounded-xl p-3 border border-white/10 flex items-start gap-2.5 text-xs text-slate-200">
                <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed font-light">
                  {currentMonthData.healthTip}
                </p>
              </div>
            </div>

            {/* Right: Key Produce Chips & Stats */}
            <div className="lg:col-span-4 bg-slate-950/80 rounded-xl p-3.5 border border-white/10 space-y-2.5">
              <div className="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>{selectedMonth}月 盛產主打食材</span>
                <span className="text-[10px] text-emerald-400 font-normal">產地時令直送</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {currentMonthData.keyProduce.map((crop, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-lg bg-white/10 text-white border border-white/10 font-medium flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>{crop}</span>
                  </span>
                ))}
              </div>
              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>當月商品庫存充足</span>
                <span className="text-amber-400 font-mono font-bold">{seasonalProducts.length} 款時令商品</span>
              </div>
            </div>

          </div>
        </div>

        {/* 4. Category Filter & Product Grid */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
              <span className="text-slate-400 text-xs mr-1 font-medium shrink-0 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> 品類篩選：
              </span>
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer shrink-0 ${
                  selectedCategory === 'all'
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                全部當季 ({products.filter(p => p.harvestMonths?.includes(selectedMonth)).length})
              </button>
              <button
                onClick={() => setSelectedCategory('fruit')}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer shrink-0 ${
                  selectedCategory === 'fruit'
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                節令水果
              </button>
              <button
                onClick={() => setSelectedCategory('vegetable')}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer shrink-0 ${
                  selectedCategory === 'vegetable'
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                時令有機蔬菜
              </button>
              <button
                onClick={() => setSelectedCategory('meat_seafood')}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer shrink-0 ${
                  selectedCategory === 'meat_seafood'
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                安心水產肉品
              </button>
              <button
                onClick={() => setSelectedCategory('processed')}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer shrink-0 ${
                  selectedCategory === 'processed'
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                米糧茗茶好物
              </button>
            </div>

            <div className="text-xs text-slate-400">
              顯示 <span className="font-bold text-white font-mono">{seasonalProducts.length}</span> 項【{selectedMonth}月時令】農特產
            </div>
          </div>

          {/* Product Cards Grid */}
          {seasonalProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {seasonalProducts.map((product) => (
                <div
                  key={product.id}
                  id={`seasonal-card-${product.id}`}
                  onClick={() => onSelectProduct(product)}
                  className="bg-slate-950/80 rounded-xl border border-slate-800 hover:border-emerald-500/60 overflow-hidden shadow-lg hover:shadow-emerald-900/20 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
                >
                  {/* Image Container */}
                  <div className="relative h-44 overflow-hidden bg-slate-900">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Month Tag Badge */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-2xs backdrop-blur-xs flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-amber-300" />
                        <span>{selectedMonth}月盛產</span>
                      </span>
                      {product.solarTerm && (
                        <span className="bg-slate-950/85 text-amber-300 text-[10px] font-medium px-2 py-0.5 rounded border border-amber-400/30">
                          {product.solarTerm}
                        </span>
                      )}
                    </div>

                    {/* Sweetness Brix Badge */}
                    {product.sweetnessBrix && (
                      <div className="absolute top-2 right-2 bg-rose-600/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-2xs backdrop-blur-xs flex items-center gap-1">
                        <Flame className="w-3 h-3 text-amber-300" />
                        <span>{product.sweetnessBrix}° Brix</span>
                      </div>
                    )}

                    {/* Temp zone */}
                    <div className="absolute bottom-2 right-2 bg-slate-950/80 text-slate-200 text-[10px] font-medium px-1.5 py-0.5 rounded backdrop-blur-xs">
                      {product.tempZone === 'chilled' ? '低溫冷藏' : product.tempZone === 'frozen' ? '活體急凍' : '常溫直發'}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                        <span className="flex items-center gap-1 text-emerald-400 font-medium">
                          <MapPin className="w-3 h-3" />
                          <span>{product.origin}</span>
                        </span>
                        <span className="text-slate-400">{product.farmerName}</span>
                      </div>

                      <h3 className="font-bold text-white text-xs sm:text-sm leading-snug line-clamp-2 group-hover:text-emerald-300 transition-colors">
                        {product.name}
                      </h3>

                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 font-light">
                        {product.description}
                      </p>
                    </div>

                    {/* Pricing and Action */}
                    <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between">
                      <div>
                        <div className="text-base font-black text-amber-400 font-mono">
                          NT$ {product.price}
                          <span className="text-[10px] font-normal text-slate-400 ml-0.5">/ {product.unit}</span>
                        </div>
                        <div className="text-[10px] text-slate-500 line-through font-mono">
                          市價 ${product.originalPrice}
                        </div>
                      </div>

                      <button
                        id={`btn-cart-${product.id}`}
                        onClick={(e) => handleAddToCart(product, e)}
                        className={`p-2 rounded-lg text-white font-bold transition-all shadow-xs flex items-center gap-1 text-xs cursor-pointer ${
                          addedProductId === product.id
                            ? 'bg-emerald-500 scale-105'
                            : 'bg-emerald-600 hover:bg-emerald-500'
                        }`}
                        title="加入購物車"
                      >
                        {addedProductId === product.id ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                            <span className="text-[11px]">已加入</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span className="text-[11px]">加購物車</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-950/60 rounded-xl p-8 border border-slate-800 text-center space-y-3">
              <Calendar className="w-10 h-10 text-slate-600 mx-auto" />
              <div className="text-slate-300 text-sm font-bold">
                {selectedMonth} 月該分類暫無上架商品
              </div>
              <p className="text-slate-500 text-xs max-w-md mx-auto">
                可切換至「全部當季」或其他月份，探索全台灣產地直送的時令美味。
              </p>
              <button
                onClick={() => setSelectedCategory('all')}
                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
              >
                重設品類篩選
              </button>
            </div>
          )}
        </div>

        {/* 5. Bottom Seasonal Subscription Box CTA */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 rounded-2xl p-5 border border-emerald-800/60 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>時令產地箱 · 週週驚喜免煩惱</span>
            </div>
            <h4 className="text-base sm:text-lg font-black text-white font-serif">
              訂閱【{selectedMonth}月 時令旬味綜合生鮮箱】
            </h4>
            <p className="text-xs text-slate-300 max-w-xl font-light">
              由專業食農專家依據{currentMonthData.solarTerms}節氣配菜，包含 5 樣當季有機葉菜、2 款當令水果與安心根莖，清晨鮮採 24 小時冷鏈到府。
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigate('contracts')}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-xs transition-all text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>了解契作定配</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('shop')}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-all text-xs cursor-pointer"
            >
              <span>選購當季商品</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
