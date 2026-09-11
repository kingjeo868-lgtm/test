import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Filter, 
  RefreshCw, 
  Calendar, 
  Building2, 
  AlertTriangle, 
  Info, 
  BarChart2, 
  Sparkles,
  ChevronRight,
  ExternalLink,
  ArrowUpDown,
  Activity,
  Layers,
  Clock,
  Download,
  Calculator,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  ShoppingBag,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { MOCK_MARKET_PRICES } from '../data/mockData';
import { MarketPriceRecord } from '../types';
import { MarketPriceCharts } from './market/MarketPriceCharts';
import { MarketDataExportModal } from './market/MarketDataExportModal';

export const MarketPrices: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMarket, setSelectedMarket] = useState<string>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<'all' | 'high_surge' | 'price_drop' | 'normal'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('2026-08-23');
  const [activeTrendCrop, setActiveTrendCrop] = useState<MarketPriceRecord>(MOCK_MARKET_PRICES[0]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Sort state for table
  const [sortField, setSortField] = useState<'avgPrice' | 'volumeKg' | 'priceChangePercent' | 'cropName'>('avgPrice');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  // Modal states
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Arbitrage Calculator internal state
  const [calcQuantityKg, setCalcQuantityKg] = useState<number>(50);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const handleSort = (field: 'avgPrice' | 'volumeKg' | 'priceChangePercent' | 'cropName') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  // Filtered & Sorted Market Price List
  const filteredAndSortedPrices = useMemo(() => {
    let list = MOCK_MARKET_PRICES.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesMarket = selectedMarket === 'all' || item.marketName.includes(selectedMarket);
      const matchesStatus = selectedStatusFilter === 'all' || item.statusWarning === selectedStatusFilter;
      const matchesSearch = item.cropName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.cropCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.originSupplyArea.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.marketName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesMarket && matchesStatus && matchesSearch;
    });

    list.sort((a, b) => {
      let valA: any = a[sortField];
      let valB: any = b[sortField];
      if (typeof valA === 'string') {
        return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortAsc ? valA - valB : valB - valA;
    });

    return list;
  }, [selectedCategory, selectedMarket, selectedStatusFilter, searchQuery, sortField, sortAsc]);

  // Aggregate Market Stats
  const marketMetrics = useMemo(() => {
    const totalVolume = MOCK_MARKET_PRICES.reduce((acc, curr) => acc + curr.volumeKg, 0);
    const avgPrice = (MOCK_MARKET_PRICES.reduce((acc, curr) => acc + curr.avgPrice, 0) / MOCK_MARKET_PRICES.length).toFixed(1);
    const gainersCount = MOCK_MARKET_PRICES.filter(c => c.priceChangePercent > 0).length;
    const losersCount = MOCK_MARKET_PRICES.filter(c => c.priceChangePercent < 0).length;
    const topGainer = [...MOCK_MARKET_PRICES].sort((a, b) => b.priceChangePercent - a.priceChangePercent)[0];

    return {
      totalVolumeTons: (totalVolume / 1000).toFixed(1),
      avgPrice,
      gainersCount,
      losersCount,
      topGainer
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/70 pb-16">
      
      {/* Module Hero Header - High Density */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-white pt-6 pb-10 px-4 sm:px-6 lg:px-8 border-b border-emerald-800 shadow-xs">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            
            {/* Title & Sources */}
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold px-2 py-0.5 rounded border border-emerald-400/30 flex items-center gap-1">
                  <Activity className="w-3 h-3" /> 農業部農產品批發市場開放資料庫
                </span>
                <span className="bg-amber-500/20 text-amber-300 text-[11px] font-semibold px-2 py-0.5 rounded border border-amber-400/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> D3 / Recharts 動態交互分析
                </span>
              </div>
              <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight font-serif">
                全台批發市場農產品交易行情中樞
              </h1>
              <p className="text-emerald-100/90 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed font-light">
                即時串接台北一市、二市、三重、台中、西螺、高雄等全台 17 處果菜與產地批發市場之拍賣均價、價量分佈、跨市場價差套利與產銷供需平衡預警。
              </p>
            </div>

            {/* Live Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-2.5 border border-white/15">
                <div className="text-[10px] text-emerald-200 uppercase">全台監測總到貨量</div>
                <div className="text-base sm:text-lg font-black text-white mt-0.5 font-mono">
                  {marketMetrics.totalVolumeTons} <span className="text-[10px] font-normal text-emerald-200">噸</span>
                </div>
                <div className="text-[10px] text-emerald-300 mt-0.5 flex items-center gap-0.5 font-mono">
                  <TrendingUp className="w-2.5 h-2.5" /> 供貨量能充裕
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-lg p-2.5 border border-white/15">
                <div className="text-[10px] text-amber-200 uppercase">最大漲幅品項</div>
                <div className="text-base sm:text-lg font-black text-amber-300 mt-0.5 truncate">
                  {marketMetrics.topGainer.cropName.split(' ')[0]}
                </div>
                <div className="text-[10px] text-amber-300 mt-0.5 font-bold font-mono">
                  +{marketMetrics.topGainer.priceChangePercent}% ({marketMetrics.topGainer.marketName})
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-lg p-2.5 border border-white/15">
                <div className="text-[10px] text-slate-200 uppercase">市場漲跌家數比</div>
                <div className="text-base sm:text-lg font-black text-white mt-0.5 font-mono flex items-center gap-1.5">
                  <span className="text-rose-400 font-bold">{marketMetrics.gainersCount} 漲</span>
                  <span className="text-slate-400">/</span>
                  <span className="text-emerald-400 font-bold">{marketMetrics.losersCount} 跌</span>
                </div>
                <div className="text-[10px] text-slate-300 mt-0.5">多數品項回穩</div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-lg p-2.5 border border-white/15">
                <div className="text-[10px] text-emerald-200 uppercase">產銷調節燈號</div>
                <div className="text-base sm:text-lg font-black text-emerald-300 mt-0.5 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  綠燈穩定
                </div>
                <div className="text-[10px] text-emerald-200 mt-0.5">契作價差健康</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECTION 1: DYNAMIC INTERACTIVE VISUALIZATION SUITE (RECHARTS) */}
      {/* ========================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 space-y-4">
        
        {/* Dynamic Chart Suite Component */}
        <MarketPriceCharts
          selectedCrop={activeTrendCrop}
          onSelectCrop={(crop) => setActiveTrendCrop(crop)}
          allMarketPrices={MOCK_MARKET_PRICES}
        />

        {/* ========================================================= */}
        {/* SECTION 2: INTERACTIVE TABLE & REAL-TIME INSPECTOR */}
        {/* ========================================================= */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-3.5 sm:p-4 space-y-3.5">
          
          {/* Toolbar: Search, Filters, Quick Chips & Export Actions */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 pb-3 border-b border-slate-100">
            
            {/* Left: Search & Category Chips */}
            <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="搜尋作物名稱、代號 (如: 甘藍, LA1, 愛文) 或產地..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-hidden focus:ring-1 focus:ring-emerald-500 focus:bg-white transition-all"
                />
              </div>

              {/* Category Filter Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto pb-0.5 sm:pb-0">
                {[
                  { id: 'all', label: '全部作物' },
                  { id: 'vegetable', label: '蔬菜類' },
                  { id: 'fruit', label: '果品類' },
                  { id: 'fishery', label: '水產類' },
                  { id: 'poultry', label: '畜產類' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-2.5 py-1 rounded-md text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-emerald-800 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Market, Status, Date & Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              
              {/* Market Dropdown */}
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs">
                <Building2 className="w-3.5 h-3.5 text-slate-500 mr-1.5 shrink-0" />
                <select
                  value={selectedMarket}
                  onChange={(e) => setSelectedMarket(e.target.value)}
                  className="bg-transparent font-semibold text-slate-800 focus:outline-hidden cursor-pointer"
                >
                  <option value="all">全台主要批發市場</option>
                  <option value="台北一">台北一市 (萬大)</option>
                  <option value="台北二">台北二市 (民族)</option>
                  <option value="三重">新北三重市場</option>
                  <option value="台中">台中果菜市場</option>
                  <option value="西螺">西螺產地市場</option>
                  <option value="高雄">高雄果菜市場</option>
                  <option value="嘉義">嘉義魚市場</option>
                  <option value="雲林">雲林肉品市場</option>
                </select>
              </div>

              {/* Status Warning Filter */}
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs">
                <Filter className="w-3.5 h-3.5 text-slate-500 mr-1.5 shrink-0" />
                <select
                  value={selectedStatusFilter}
                  onChange={(e) => setSelectedStatusFilter(e.target.value as any)}
                  className="bg-transparent font-semibold text-slate-800 focus:outline-hidden cursor-pointer"
                >
                  <option value="all">全狀態</option>
                  <option value="high_surge">🔥 漲幅警惕</option>
                  <option value="price_drop">🌿 跌幅平價</option>
                  <option value="normal">✓ 供需平穩</option>
                </select>
              </div>

              {/* Refresh button */}
              <button
                onClick={handleRefresh}
                title="重新整理同步最新行情"
                className={`p-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors cursor-pointer ${
                  isRefreshing ? 'animate-spin' : ''
                }`}
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>

              {/* Export Data Button */}
              <button
                onClick={() => setIsExportModalOpen(true)}
                className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer whitespace-nowrap"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>匯出報表</span>
              </button>

            </div>
          </div>

          {/* Master-Detail Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            
            {/* Left 8 Cols: Interactive Wholesale Table */}
            <div className="lg:col-span-8 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  即時批發拍賣成交牌價表
                  <span className="text-[11px] text-slate-400 font-mono">
                    (顯示 {filteredAndSortedPrices.length} 筆，點擊任意列即可於圖表即時聯動定位)
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">
                  單位：NT$ 元/公斤 (kg)
                </span>
              </div>

              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto max-h-[500px]">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100/90 text-slate-700 font-semibold border-b border-slate-200 sticky top-0 z-10 text-[11px]">
                      <tr>
                        <th 
                          onClick={() => handleSort('cropName')}
                          className="py-2.5 px-3 cursor-pointer hover:bg-slate-200 transition-colors"
                        >
                          <div className="flex items-center gap-1">
                            <span>作物名稱 / 代號</span>
                            <ArrowUpDown className="w-3 h-3 text-slate-400" />
                          </div>
                        </th>
                        <th className="py-2.5 px-2">交易市場</th>
                        <th className="py-2.5 px-2 text-right text-slate-500">上價(特)</th>
                        <th className="py-2.5 px-2 text-right text-slate-500">中價(良)</th>
                        <th 
                          onClick={() => handleSort('avgPrice')}
                          className="py-2.5 px-2 text-right font-bold text-slate-900 cursor-pointer hover:bg-slate-200 transition-colors"
                        >
                          <div className="flex items-center justify-end gap-1">
                            <span>批發均價</span>
                            <ArrowUpDown className="w-3 h-3 text-slate-400" />
                          </div>
                        </th>
                        <th 
                          onClick={() => handleSort('volumeKg')}
                          className="py-2.5 px-2 text-right cursor-pointer hover:bg-slate-200 transition-colors"
                        >
                          <div className="flex items-center justify-end gap-1">
                            <span>到貨量</span>
                            <ArrowUpDown className="w-3 h-3 text-slate-400" />
                          </div>
                        </th>
                        <th 
                          onClick={() => handleSort('priceChangePercent')}
                          className="py-2.5 px-2.5 text-center cursor-pointer hover:bg-slate-200 transition-colors"
                        >
                          <div className="flex items-center justify-center gap-1">
                            <span>漲跌幅</span>
                            <ArrowUpDown className="w-3 h-3 text-slate-400" />
                          </div>
                        </th>
                        <th className="py-2.5 px-2 text-center">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {filteredAndSortedPrices.map((item) => {
                        const isSelected = activeTrendCrop?.id === item.id;
                        const isPositive = item.priceChangePercent > 0;
                        const isZero = item.priceChangePercent === 0;

                        return (
                          <tr
                            key={item.id}
                            onClick={() => setActiveTrendCrop(item)}
                            className={`cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-emerald-50/90 font-medium ring-1 ring-emerald-400/50'
                                : 'hover:bg-slate-50/80'
                            }`}
                          >
                            <td className="py-2.5 px-3">
                              <div className="flex items-center gap-1.5">
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                  item.category === 'vegetable' ? 'bg-emerald-600' :
                                  item.category === 'fruit' ? 'bg-amber-600' :
                                  item.category === 'fishery' ? 'bg-sky-600' : 'bg-rose-600'
                                }`} />
                                <span className="font-bold text-slate-900">{item.cropName}</span>
                                {item.statusWarning === 'high_surge' && (
                                  <span className="bg-rose-100 text-rose-700 text-[9px] px-1 py-0.2 rounded font-bold">
                                    漲勢
                                  </span>
                                )}
                                {item.statusWarning === 'price_drop' && (
                                  <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1 py-0.2 rounded font-bold">
                                    跌平
                                  </span>
                                )}
                              </div>
                              <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                                代號: {item.cropCode} ｜ 主力: {item.originSupplyArea.split('、')[0]}
                              </div>
                            </td>
                            <td className="py-2.5 px-2 text-slate-600">
                              <span className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-[10px] font-medium">
                                {item.marketName}
                              </span>
                            </td>
                            <td className="py-2.5 px-2 text-right font-mono text-slate-600 text-[11px]">${item.highPrice}</td>
                            <td className="py-2.5 px-2 text-right font-mono text-slate-600 text-[11px]">${item.midPrice}</td>
                            <td className="py-2.5 px-2 text-right font-black text-emerald-950 font-mono text-xs sm:text-sm">
                              ${item.avgPrice}
                            </td>
                            <td className="py-2.5 px-2 text-right text-slate-600 font-mono text-[11px]">
                              {(item.volumeKg / 1000).toFixed(1)} <span className="text-[9px] text-slate-400">噸</span>
                            </td>
                            <td className="py-2.5 px-2.5 text-center">
                              <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold font-mono ${
                                isZero 
                                  ? 'text-slate-500 bg-slate-100' 
                                  : isPositive 
                                    ? 'text-rose-700 bg-rose-50 border border-rose-200' 
                                    : 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                              }`}>
                                {!isZero && (isPositive ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />)}
                                {item.priceChangePercent > 0 ? `+${item.priceChangePercent}%` : `${item.priceChangePercent}%`}
                              </span>
                            </td>
                            <td className="py-2.5 px-2 text-center">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveTrendCrop(item);
                                }}
                                className={`px-2 py-1 rounded text-[10px] font-bold transition-colors cursor-pointer ${
                                  isSelected 
                                    ? 'bg-emerald-600 text-white shadow-2xs' 
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                              >
                                鎖定分析
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Inspector & Arbitrage Calculator Panel */}
            <div className="lg:col-span-4 space-y-3">
              
              {/* Detailed Crop Inspector Card */}
              <div className="bg-slate-900 text-white rounded-xl p-3.5 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                  <div>
                    <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">即時作物行情檢驗儀</div>
                    <h3 className="text-base font-extrabold text-white mt-0.5">{activeTrendCrop.cropName}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black font-mono text-emerald-400">NT$ {activeTrendCrop.avgPrice}</span>
                    <div className="text-[10px] text-slate-400 font-mono">拍賣均價 / kg</div>
                  </div>
                </div>

                {/* Grade Price Breakdown */}
                <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
                  <div className="bg-slate-800/80 p-2 rounded-lg border border-slate-700">
                    <div className="text-[10px] text-slate-400">特級上價</div>
                    <div className="font-mono font-bold text-rose-300 mt-0.5">${activeTrendCrop.highPrice}</div>
                  </div>
                  <div className="bg-slate-800/80 p-2 rounded-lg border border-slate-700">
                    <div className="text-[10px] text-slate-400">良級中價</div>
                    <div className="font-mono font-bold text-emerald-300 mt-0.5">${activeTrendCrop.midPrice}</div>
                  </div>
                  <div className="bg-slate-800/80 p-2 rounded-lg border border-slate-700">
                    <div className="text-[10px] text-slate-400">普級下價</div>
                    <div className="font-mono font-bold text-slate-300 mt-0.5">${activeTrendCrop.lowPrice}</div>
                  </div>
                </div>

                {/* Origin & Traceability Badge */}
                <div className="bg-slate-800/50 p-2.5 rounded-lg border border-slate-700/60 space-y-1.5 text-[11px]">
                  <div className="flex justify-between text-slate-300">
                    <span>主要集貨產地：</span>
                    <span className="font-medium text-emerald-300 text-right">{activeTrendCrop.originSupplyArea}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>拍賣市場編號：</span>
                    <span className="font-mono text-white">{activeTrendCrop.marketName} ({activeTrendCrop.marketCode})</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>單日成交總量：</span>
                    <span className="font-mono text-amber-300 font-bold">{(activeTrendCrop.volumeKg / 1000).toFixed(1)} 公噸</span>
                  </div>
                </div>

                {/* Direct Purchase Link Banner */}
                <div className="bg-emerald-950/80 p-2.5 rounded-lg border border-emerald-500/40 space-y-1">
                  <div className="flex items-center justify-between text-emerald-300 text-xs font-bold">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> TAP 產銷履歷契作直接供應
                    </span>
                  </div>
                  <p className="text-[10px] text-emerald-200/90 leading-relaxed">
                    好農方舟平台已與主力產銷合作社完成契作鎖價，支持產地直配、保證無農藥殘留。
                  </p>
                </div>
              </div>

              {/* Interactive Purchase & Cost Calculator */}
              <div className="bg-emerald-50/80 rounded-xl p-3.5 border border-emerald-200 space-y-3">
                <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                  <span className="text-xs font-extrabold text-emerald-950 flex items-center gap-1.5">
                    <Calculator className="w-4 h-4 text-emerald-700" />
                    批發 vs. 零售節省試算機
                  </span>
                  <span className="text-[10px] text-emerald-700 font-bold">
                    {activeTrendCrop.cropName.split(' ')[0]}
                  </span>
                </div>

                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs text-slate-700 mb-1">
                      <span>採購數量試算：</span>
                      <span className="font-mono font-bold text-emerald-900">{calcQuantityKg} 公斤 (kg)</span>
                    </div>
                    <input 
                      type="range"
                      min="5"
                      max="200"
                      step="5"
                      value={calcQuantityKg}
                      onChange={(e) => setCalcQuantityKg(Number(e.target.value))}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                  </div>

                  {/* Calculated Comparison Stats */}
                  <div className="space-y-1.5 text-xs pt-1">
                    <div className="flex justify-between text-slate-600">
                      <span>傳統市場零售估價：</span>
                      <span className="font-mono text-rose-700 font-bold line-through">
                        NT$ {Math.round(activeTrendCrop.avgPrice * 1.65 * calcQuantityKg).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>批發市場拍賣底價：</span>
                      <span className="font-mono text-slate-700 font-bold">
                        NT$ {Math.round(activeTrendCrop.avgPrice * calcQuantityKg).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-emerald-900 font-extrabold pt-1.5 border-t border-emerald-200">
                      <span>好農方舟直採產地價：</span>
                      <span className="font-mono text-emerald-700 text-sm">
                        NT$ {Math.round(activeTrendCrop.avgPrice * 1.15 * calcQuantityKg).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Benefit Tag */}
                  <div className="bg-white p-2 rounded-lg border border-emerald-200 text-center">
                    <span className="text-[11px] text-emerald-800 font-bold">
                      預估為買方節省 <span className="font-mono text-emerald-700 font-black">NT$ {Math.round(activeTrendCrop.avgPrice * 0.5 * calcQuantityKg).toLocaleString()}</span> 元，農友多獲益 +15%
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Export Modal Component */}
      <MarketDataExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        data={filteredAndSortedPrices}
      />

    </div>
  );
};
