import React, { useState, useMemo, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Bar, 
  ComposedChart, 
  Legend, 
  Area, 
  AreaChart, 
  ScatterChart, 
  Scatter, 
  ZAxis, 
  BarChart, 
  Cell,
  ReferenceLine
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Layers, 
  Clock, 
  Calendar, 
  BarChart2, 
  Sparkles, 
  Building2, 
  PieChart as PieIcon, 
  ArrowUpDown, 
  Radio, 
  Play, 
  Pause, 
  RefreshCw, 
  Sliders, 
  Info,
  Maximize2,
  Minimize2,
  ChevronRight,
  ShieldCheck,
  Zap,
  ShoppingBag
} from 'lucide-react';
import { MarketPriceRecord } from '../../types';

export interface MajorCropConfig {
  id: string;
  name: string;
  code: string;
  category: 'vegetable' | 'fruit' | 'fishery' | 'poultry';
  color: string;
  basePrice: number;
  changePercent: number;
  market: string;
}

export const MAJOR_CROPS: MajorCropConfig[] = [
  { id: 'cabbage', name: '甘藍 (高麗菜)', code: 'LA1', category: 'vegetable', color: '#059669', basePrice: 24.2, changePercent: 4.8, market: '台北一市' },
  { id: 'cauliflower', name: '花椰菜 (白梗)', code: 'FB1', category: 'vegetable', color: '#0284c7', basePrice: 43.1, changePercent: 12.5, market: '台北一市' },
  { id: 'tomato', name: '牛番茄', code: 'FJ1', category: 'vegetable', color: '#e11d48', basePrice: 64.5, changePercent: -3.2, market: '台北二市' },
  { id: 'scallion', name: '宜蘭三星蔥', code: 'SE1', category: 'vegetable', color: '#16a34a', basePrice: 128.5, changePercent: 8.2, market: '台北一市' },
  { id: 'mango', name: '芒果 (愛文)', code: 'R1', category: 'fruit', color: '#d97706', basePrice: 98.4, changePercent: -1.5, market: '台北一市' },
  { id: 'pomelo', name: '文旦柚 (麻豆)', code: 'W1', category: 'fruit', color: '#7c3aed', basePrice: 53.8, changePercent: 18.2, market: '台北一市' },
  { id: 'banana', name: '香蕉 (特級)', code: 'A1', category: 'fruit', color: '#ca8a04', basePrice: 27.9, changePercent: -6.4, market: '台中市場' },
  { id: 'grape', name: '巨峰葡萄', code: 'G1', category: 'fruit', color: '#9333ea', basePrice: 138.2, changePercent: 5.5, market: '台中市場' },
  { id: 'shrimp', name: '七股特大白蝦', code: 'S2', category: 'fishery', color: '#ea580c', basePrice: 236.0, changePercent: 1.2, market: '台南海鮮' }
];

interface MarketPriceChartsProps {
  selectedCrop: MarketPriceRecord | null;
  onSelectCrop: (crop: MarketPriceRecord) => void;
  allMarketPrices: MarketPriceRecord[];
}

export const MarketPriceCharts: React.FC<MarketPriceChartsProps> = ({
  selectedCrop,
  onSelectCrop,
  allMarketPrices
}) => {
  // Chart visual mode tabs
  const [activeChartTab, setActiveChartTab] = useState<'trends' | 'cross_market' | 'volume_scatter' | 'arbitrage'>('trends');
  
  // Trend controls
  const [trendTimeframe, setTrendTimeframe] = useState<'intraday' | '7days' | '30days' | 'quarterly'>('intraday');
  const [chartSubView, setChartSubView] = useState<'multi_line' | 'composed_volume' | 'range_spread'>('composed_volume');
  const [selectedCropKeys, setSelectedCropKeys] = useState<string[]>(['cabbage', 'cauliflower', 'tomato', 'pomelo']);
  
  // Real-time live auction simulation state
  const [isLiveSimulating, setIsLiveSimulating] = useState<boolean>(true);
  const [simulationTick, setSimulationTick] = useState<number>(0);
  const [lastTickUpdate, setLastTickUpdate] = useState<string>('剛剛');

  // Cross market comparison selected crop
  const [crossMarketCropId, setCrossMarketCropId] = useState<string>('cabbage');

  // Live simulation ticker effect
  useEffect(() => {
    if (!isLiveSimulating) return;
    const interval = setInterval(() => {
      setSimulationTick(prev => prev + 1);
      const now = new Date();
      setLastTickUpdate(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`);
    }, 3000);
    return () => clearInterval(interval);
  }, [isLiveSimulating]);

  // Toggle crop selection for multi-line comparison
  const toggleCropSelection = (cropId: string) => {
    setSelectedCropKeys(prev => {
      if (prev.includes(cropId)) {
        if (prev.length <= 1) return prev;
        return prev.filter(id => id !== cropId);
      } else {
        return [...prev, cropId];
      }
    });
  };

  // Generate Intraday price wave data (hourly auction)
  const intradayTrendData = useMemo(() => {
    const timeSlots = ['03:30', '04:30', '05:30', '06:30', '07:30', '08:30', '09:30', '10:30', '11:30'];
    const tickNoise = (Math.sin(simulationTick) * 0.3);

    return timeSlots.map((time, idx) => {
      const dataPoint: Record<string, any> = { time };
      
      MAJOR_CROPS.forEach(crop => {
        const wave = Math.sin((idx / (timeSlots.length - 1)) * Math.PI) * (crop.basePrice * 0.12);
        const noise = (Math.sin(idx * 2 + crop.basePrice) * 0.04) * crop.basePrice + (idx === timeSlots.length - 1 ? tickNoise : 0);
        const avgPrice = Math.max(5, parseFloat((crop.basePrice * 0.94 + wave + noise).toFixed(1)));
        const highPrice = parseFloat((avgPrice * 1.25).toFixed(1));
        const lowPrice = parseFloat((avgPrice * 0.76).toFixed(1));
        const volumeTons = Math.round((crop.basePrice * 3.5) + (Math.sin(idx + crop.basePrice) * 15) + 30);

        dataPoint[crop.id] = avgPrice;
        dataPoint[`${crop.id}_high`] = highPrice;
        dataPoint[`${crop.id}_low`] = lowPrice;
        dataPoint[`${crop.id}_vol`] = volumeTons;
      });

      return dataPoint;
    });
  }, [simulationTick]);

  // Generate 7-day daily trend data
  const sevenDayTrendData = useMemo(() => {
    const days = ['08/17 (一)', '08/18 (二)', '08/19 (三)', '08/20 (四)', '08/21 (五)', '08/22 (六)', '08/23 (今日)'];
    
    return days.map((day, idx) => {
      const dataPoint: Record<string, any> = { day };
      
      MAJOR_CROPS.forEach(crop => {
        const trendSlope = (crop.changePercent / 100) * (idx / 6);
        const randomFactor = Math.cos(idx * 1.5 + crop.basePrice) * (crop.basePrice * 0.04);
        const avgPrice = Math.max(5, parseFloat((crop.basePrice * (1 - (crop.changePercent / 100) + trendSlope) + randomFactor).toFixed(1)));
        const highPrice = parseFloat((avgPrice * 1.28).toFixed(1));
        const lowPrice = parseFloat((avgPrice * 0.74).toFixed(1));
        const volumeTons = Math.round((crop.basePrice * 4.2) + (Math.sin(idx * 1.2) * 20) + 40);

        dataPoint[crop.id] = avgPrice;
        dataPoint[`${crop.id}_high`] = highPrice;
        dataPoint[`${crop.id}_low`] = lowPrice;
        dataPoint[`${crop.id}_vol`] = volumeTons;
      });

      return dataPoint;
    });
  }, []);

  // Generate 30-day monthly trend data
  const thirtyDayTrendData = useMemo(() => {
    const data = [];
    for (let i = 29; i >= 0; i--) {
      const dateStr = `08/${(23 - i > 0 ? 23 - i : 31 + (23 - i)).toString().padStart(2, '0')}`;
      const dataPoint: Record<string, any> = { date: dateStr };

      MAJOR_CROPS.forEach(crop => {
        const cycle = Math.sin((30 - i) * 0.25) * (crop.basePrice * 0.18);
        const avgPrice = Math.max(5, parseFloat((crop.basePrice + cycle + ((Math.random() - 0.5) * 1.5)).toFixed(1)));
        const highPrice = parseFloat((avgPrice * 1.3).toFixed(1));
        const lowPrice = parseFloat((avgPrice * 0.72).toFixed(1));
        const volumeTons = Math.round((crop.basePrice * 3.8) + (Math.sin((30 - i) * 0.3) * 25) + 45);

        dataPoint[crop.id] = avgPrice;
        dataPoint[`${crop.id}_high`] = highPrice;
        dataPoint[`${crop.id}_low`] = lowPrice;
        dataPoint[`${crop.id}_vol`] = volumeTons;
      });

      data.push(dataPoint);
    }
    return data;
  }, []);

  // Active single crop trend data
  const activeCropSingleTrendData = useMemo(() => {
    const currentCrop = selectedCrop || allMarketPrices[0];
    if (!currentCrop) return [];

    const dates = [
      '08/10', '08/11', '08/12', '08/13', '08/14', '08/15', '08/16',
      '08/17', '08/18', '08/19', '08/20', '08/21', '08/22', '08/23 (今日)'
    ];

    return dates.map((d, i) => {
      const wave = Math.sin(i * 0.7) * (currentCrop.avgPrice * 0.16) + (Math.sin(simulationTick + i) * 0.2);
      const avg = Math.max(5, parseFloat((currentCrop.avgPrice + wave).toFixed(1)));
      const high = parseFloat((avg * 1.32).toFixed(1));
      const mid = avg;
      const low = parseFloat((avg * 0.72).toFixed(1));
      const vol = Math.floor(currentCrop.volumeKg * (0.8 + Math.sin(i * 0.5) * 0.35)) / 1000;

      return {
        date: d,
        avgPrice: avg,
        highPrice: high,
        midPrice: mid,
        lowPrice: low,
        priceRange: [low, high],
        volumeTons: Math.round(vol),
        movingAvg7: parseFloat((avg * 0.98).toFixed(1))
      };
    });
  }, [selectedCrop, allMarketPrices, simulationTick]);

  // Cross-Market Inter-market price spread data
  const crossMarketData = useMemo(() => {
    const targetCrop = MAJOR_CROPS.find(c => c.id === crossMarketCropId) || MAJOR_CROPS[0];
    
    const markets = [
      { market: '台北一市 (萬大)', factor: 1.15, volFactor: 1.4, transportCost: 3.5 },
      { market: '台北二市 (民族)', factor: 1.10, volFactor: 1.1, transportCost: 3.5 },
      { market: '新北三重市場', factor: 1.05, volFactor: 0.9, transportCost: 3.2 },
      { market: '台中果菜市場', factor: 0.98, volFactor: 1.0, transportCost: 2.0 },
      { market: '雲林西螺產地', factor: 0.82, volFactor: 1.6, transportCost: 0.5 },
      { market: '高雄果菜市場', factor: 0.94, volFactor: 0.95, transportCost: 2.5 },
      { market: '屏東產地批發', factor: 0.78, volFactor: 1.2, transportCost: 0.4 }
    ];

    return markets.map(m => {
      const avgPrice = parseFloat((targetCrop.basePrice * m.factor).toFixed(1));
      const highPrice = parseFloat((avgPrice * 1.28).toFixed(1));
      const lowPrice = parseFloat((avgPrice * 0.75).toFixed(1));
      const volumeTons = Math.round((targetCrop.basePrice * 5 * m.volFactor));
      const directArkPrice = parseFloat((targetCrop.basePrice * 1.02).toFixed(1)); // Fair trade direct price

      return {
        market: m.market,
        avgPrice,
        highPrice,
        lowPrice,
        volumeTons,
        transportCost: m.transportCost,
        directArkPrice,
        spreadFromBase: parseFloat((avgPrice - targetCrop.basePrice).toFixed(1)),
        spreadPercent: parseFloat((((avgPrice - targetCrop.basePrice) / targetCrop.basePrice) * 100).toFixed(1))
      };
    });
  }, [crossMarketCropId]);

  // Volume vs Price Volatility Scatter data
  const volumeScatterData = useMemo(() => {
    return allMarketPrices.map(item => ({
      name: item.cropName,
      code: item.cropCode,
      volumeTons: Math.round(item.volumeKg / 1000),
      priceChangePercent: item.priceChangePercent,
      avgPrice: item.avgPrice,
      market: item.marketName,
      category: item.category,
      color: item.category === 'vegetable' ? '#059669' : item.category === 'fruit' ? '#d97706' : item.category === 'fishery' ? '#0284c7' : '#e11d48'
    }));
  }, [allMarketPrices]);

  // Ranking of Gainers and Losers
  const marketMovers = useMemo(() => {
    const sorted = [...allMarketPrices].sort((a, b) => b.priceChangePercent - a.priceChangePercent);
    return {
      topGainers: sorted.slice(0, 5),
      topLosers: [...sorted].reverse().slice(0, 5)
    };
  }, [allMarketPrices]);

  // Active time-series dataset selection
  const currentTrendDataset = useMemo(() => {
    switch (trendTimeframe) {
      case 'intraday':
        return { data: intradayTrendData, xKey: 'time', label: '盤中交易時段' };
      case '7days':
        return { data: sevenDayTrendData, xKey: 'day', label: '交易日' };
      case '30days':
      case 'quarterly':
        return { data: thirtyDayTrendData, xKey: 'date', label: '歷史日期' };
    }
  }, [trendTimeframe, intradayTrendData, sevenDayTrendData, thirtyDayTrendData]);

  const targetCurrentCrop = selectedCrop || allMarketPrices[0];

  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
      
      {/* Top Interactive Bar: Title, Live Ticker & Tab Navigation */}
      <div className="p-3.5 sm:p-4 bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 border-b border-slate-800">
        
        {/* Left Title & Live Pulse */}
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-400/30">
              <Activity className="w-4 h-4" />
            </div>
            <h2 className="font-extrabold text-base sm:text-lg tracking-tight font-serif flex items-center gap-2">
              全台批發市場農產行情動態視覺化中樞
            </h2>
            
            {/* Live Status Simulation Badge */}
            <div className="flex items-center gap-1.5 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/40 text-[11px]">
              <span className={`w-2 h-2 rounded-full ${isLiveSimulating ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
              <span className="font-semibold text-emerald-300">
                {isLiveSimulating ? '農業部即時拍賣連線' : '模擬連線暫停'}
              </span>
              <span className="text-[10px] text-emerald-200/70 font-mono">
                ({lastTickUpdate})
              </span>
            </div>
          </div>
          <p className="text-[11px] text-slate-300 mt-1 flex items-center gap-1.5 font-light">
            <span>整合 Recharts 雙軸多維走勢圖、跨市場拍賣價差套利矩陣與即時量能分佈</span>
          </p>
        </div>

        {/* Right Tab Switcher & Simulation Toggle */}
        <div className="flex items-center gap-2 flex-wrap">
          
          {/* Main Visual Tabs */}
          <div className="bg-slate-800/90 p-0.5 rounded-lg flex items-center text-xs border border-slate-700">
            <button
              onClick={() => setActiveChartTab('trends')}
              className={`px-2.5 py-1.5 rounded-md font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeChartTab === 'trends'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>多維走勢</span>
            </button>
            <button
              onClick={() => setActiveChartTab('cross_market')}
              className={`px-2.5 py-1.5 rounded-md font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeChartTab === 'cross_market'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>跨市場比價</span>
            </button>
            <button
              onClick={() => setActiveChartTab('volume_scatter')}
              className={`px-2.5 py-1.5 rounded-md font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeChartTab === 'volume_scatter'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <PieIcon className="w-3.5 h-3.5" />
              <span>價量分佈</span>
            </button>
            <button
              onClick={() => setActiveChartTab('arbitrage')}
              className={`px-2.5 py-1.5 rounded-md font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeChartTab === 'arbitrage'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>產銷定價</span>
            </button>
          </div>

          {/* Simulation Play/Pause Toggle */}
          <button
            onClick={() => setIsLiveSimulating(!isLiveSimulating)}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer text-xs flex items-center gap-1 ${
              isLiveSimulating 
                ? 'bg-amber-500/20 text-amber-300 border-amber-400/40 hover:bg-amber-500/30'
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40 hover:bg-emerald-500/30'
            }`}
            title={isLiveSimulating ? '暫停即時盤中模擬跳動' : '啟動即時盤中模擬跳動'}
          >
            {isLiveSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline font-mono">{isLiveSimulating ? '即時' : '暫停'}</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: 多維走勢與盤中行情 (Intraday & Historical Trends) */}
      {/* ========================================================= */}
      {activeChartTab === 'trends' && (
        <div className="p-3.5 sm:p-4 space-y-3.5">
          
          {/* Sub-controls: Timeframe & Chart Representation Mode */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 pb-2.5 border-b border-slate-100">
            
            {/* Timeframe selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" /> 時段維度：
              </span>
              <div className="bg-slate-100 p-0.5 rounded-md flex items-center text-xs">
                <button
                  onClick={() => setTrendTimeframe('intraday')}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                    trendTimeframe === 'intraday' ? 'bg-white text-emerald-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  盤中即時 (03:30-11:30)
                </button>
                <button
                  onClick={() => setTrendTimeframe('7days')}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                    trendTimeframe === '7days' ? 'bg-white text-emerald-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  近 7 日均價
                </button>
                <button
                  onClick={() => setTrendTimeframe('30days')}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                    trendTimeframe === '30days' ? 'bg-white text-emerald-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  近 30 日走勢
                </button>
              </div>
            </div>

            {/* Chart Sub-view switch (Multi-line vs. Composed Single Crop vs. Spread Band) */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5 text-slate-400" /> 圖表型態：
              </span>
              <div className="bg-slate-100 p-0.5 rounded-md flex items-center text-xs">
                <button
                  onClick={() => setChartSubView('composed_volume')}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                    chartSubView === 'composed_volume' ? 'bg-emerald-800 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {targetCurrentCrop.cropName} 價量組合圖
                </button>
                <button
                  onClick={() => setChartSubView('multi_line')}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                    chartSubView === 'multi_line' ? 'bg-emerald-800 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  多品項疊加比價
                </button>
                <button
                  onClick={() => setChartSubView('range_spread')}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                    chartSubView === 'range_spread' ? 'bg-emerald-800 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  上中下價差帶
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Crop Toggle Badges (When in Multi-line mode or quick switcher) */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-500 mr-1 flex items-center gap-1">
              <Layers className="w-3 h-3 text-slate-400" /> 
              {chartSubView === 'multi_line' ? '點擊疊加/隱藏品項：' : '切換主控品項：'}
            </span>
            {MAJOR_CROPS.map(crop => {
              const isSelected = chartSubView === 'multi_line' 
                ? selectedCropKeys.includes(crop.id)
                : targetCurrentCrop.cropName.includes(crop.name.split(' ')[0]);
              const isPositive = crop.changePercent > 0;

              return (
                <button
                  key={crop.id}
                  onClick={() => {
                    if (chartSubView === 'multi_line') {
                      toggleCropSelection(crop.id);
                    } else {
                      const matched = allMarketPrices.find(p => p.cropName.includes(crop.name.split(' ')[0]));
                      if (matched) onSelectCrop(matched);
                    }
                  }}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
                    isSelected 
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs' 
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span 
                    className="w-2.5 h-2.5 rounded-full shrink-0" 
                    style={{ backgroundColor: crop.color }}
                  />
                  <span className="truncate">{crop.name}</span>
                  <span className="font-mono text-[10px] opacity-80">${crop.basePrice}</span>
                  <span className={`font-mono text-[10px] font-bold ${
                    isSelected 
                      ? (isPositive ? 'text-rose-300' : 'text-emerald-300')
                      : (isPositive ? 'text-rose-600' : 'text-emerald-600')
                  }`}>
                    {isPositive ? `+${crop.changePercent}%` : `${crop.changePercent}%`}
                  </span>
                </button>
              );
            })}
          </div>

          {/* MAIN CHART CONTAINER */}
          <div className="h-72 sm:h-80 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              
              {/* SUBVIEW A: Single Crop Composed Price Line + High/Low Range + Volume Bar */}
              {chartSubView === 'composed_volume' ? (
                <ComposedChart data={activeCropSingleTrendData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="priceAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="volBarGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#cbd5e1" stopOpacity={0.9} />
                      <stop offset="100%" stopColor="#94a3b8" stopOpacity={0.4} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 10, fill: '#64748b' }} 
                    tickLine={{ stroke: '#cbd5e1' }}
                    axisLine={{ stroke: '#cbd5e1' }}
                  />
                  <YAxis 
                    yAxisId="priceAxis"
                    tick={{ fontSize: 10, fill: '#065f46' }} 
                    tickLine={{ stroke: '#cbd5e1' }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    domain={['auto', 'auto']}
                    unit=" 元"
                  />
                  <YAxis 
                    yAxisId="volAxis"
                    orientation="right"
                    tick={{ fontSize: 9, fill: '#94a3b8' }} 
                    tickLine={false}
                    axisLine={false}
                    unit=" 噸"
                  />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const item = payload[0].payload;
                        return (
                          <div className="bg-slate-900/95 backdrop-blur-xs text-white p-3 rounded-lg shadow-xl border border-slate-800 text-xs min-w-[210px] space-y-1.5">
                            <div className="font-bold border-b border-slate-700 pb-1 flex items-center justify-between text-[11px]">
                              <span className="text-emerald-400 font-semibold">{targetCurrentCrop.cropName} ({label})</span>
                              <span className="text-[10px] text-slate-400">{targetCurrentCrop.marketName}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] pt-1">
                              <div className="text-slate-300">拍賣均價：</div>
                              <div className="font-mono font-bold text-emerald-300 text-right">NT$ {item.avgPrice} /kg</div>
                              
                              <div className="text-slate-300">特級上價：</div>
                              <div className="font-mono text-rose-300 text-right">NT$ {item.highPrice}</div>

                              <div className="text-slate-300">普級下價：</div>
                              <div className="font-mono text-slate-300 text-right">NT$ {item.lowPrice}</div>

                              <div className="text-slate-300">日交易量：</div>
                              <div className="font-mono text-amber-300 text-right">{item.volumeTons} 噸</div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '8px', fontSize: '11px' }} 
                    formatter={(val) => {
                      if (val === 'avgPrice') return <span className="text-slate-700 font-bold">拍賣均價 (NT$/kg)</span>;
                      if (val === 'volumeTons') return <span className="text-slate-500">交易量 (公噸)</span>;
                      if (val === 'highPrice') return <span className="text-rose-600">上價 (特級)</span>;
                      if (val === 'lowPrice') return <span className="text-emerald-600">下價 (普級)</span>;
                      return val;
                    }}
                  />
                  <Bar yAxisId="volAxis" dataKey="volumeTons" name="volumeTons" fill="url(#volBarGrad)" radius={[3, 3, 0, 0]} barSize={20} />
                  <Area yAxisId="priceAxis" type="monotone" dataKey="avgPrice" stroke="none" fill="url(#priceAreaGrad)" />
                  <Line yAxisId="priceAxis" type="monotone" dataKey="highPrice" name="highPrice" stroke="#f43f5e" strokeDasharray="3 3" strokeWidth={1.5} dot={false} />
                  <Line yAxisId="priceAxis" type="monotone" dataKey="lowPrice" name="lowPrice" stroke="#10b981" strokeDasharray="3 3" strokeWidth={1.5} dot={false} />
                  <Line 
                    yAxisId="priceAxis" 
                    type="monotone" 
                    dataKey="avgPrice" 
                    name="avgPrice" 
                    stroke="#059669" 
                    strokeWidth={2.5} 
                    dot={{ r: 3.5, fill: '#059669', strokeWidth: 1, stroke: '#ffffff' }}
                    activeDot={{ r: 6, stroke: '#ffffff', strokeWidth: 2 }}
                  />
                </ComposedChart>
              ) : chartSubView === 'multi_line' ? (
                /* SUBVIEW B: Multi-Crop Dynamic Overlay Line Chart */
                <LineChart data={currentTrendDataset.data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis 
                    dataKey={currentTrendDataset.xKey} 
                    tick={{ fontSize: 10, fill: '#64748b' }} 
                    tickLine={{ stroke: '#cbd5e1' }}
                    axisLine={{ stroke: '#cbd5e1' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 10, fill: '#64748b' }} 
                    tickLine={{ stroke: '#cbd5e1' }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    domain={['auto', 'auto']}
                    unit=" 元"
                  />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-slate-900/95 backdrop-blur-xs text-white p-2.5 rounded-lg shadow-xl border border-slate-800 text-xs min-w-[200px] space-y-1.5">
                            <div className="font-bold border-b border-slate-700 pb-1 flex items-center justify-between text-[11px]">
                              <span className="text-emerald-400">{currentTrendDataset.label}：{label}</span>
                              <span className="text-[10px] text-slate-400">批發拍賣均價</span>
                            </div>
                            <div className="space-y-1 pt-0.5">
                              {payload.map((entry: any) => {
                                const crop = MAJOR_CROPS.find(c => c.id === entry.dataKey);
                                if (!crop) return null;
                                return (
                                  <div key={crop.id} className="flex items-center justify-between gap-3 text-[11px]">
                                    <div className="flex items-center gap-1.5">
                                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: crop.color }} />
                                      <span className="text-slate-200 truncate">{crop.name}</span>
                                    </div>
                                    <div className="font-mono font-bold text-white">
                                      NT$ {entry.value} <span className="text-[9px] text-slate-400">/kg</span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '8px', fontSize: '11px' }}
                    formatter={(value) => {
                      const crop = MAJOR_CROPS.find(c => c.id === value);
                      return <span className="text-slate-700 font-medium">{crop ? crop.name : value}</span>;
                    }}
                  />
                  {MAJOR_CROPS.map(crop => {
                    if (!selectedCropKeys.includes(crop.id)) return null;
                    return (
                      <Line
                        key={crop.id}
                        type="monotone"
                        dataKey={crop.id}
                        name={crop.id}
                        stroke={crop.color}
                        strokeWidth={2.4}
                        dot={{ r: 3, fill: crop.color, strokeWidth: 1, stroke: '#ffffff' }}
                        activeDot={{ r: 5, strokeWidth: 2, stroke: '#ffffff' }}
                      />
                    );
                  })}
                </LineChart>
              ) : (
                /* SUBVIEW C: High-Mid-Low Price Range Spread Band Area Chart */
                <AreaChart data={activeCropSingleTrendData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="spreadAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0284c7" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#0284c7" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#64748b' }} />
                  <YAxis tick={{ fontSize: 10, fill: '#0369a1' }} domain={['auto', 'auto']} unit=" 元" />
                  <Tooltip 
                    formatter={(value: any, name: string) => [`NT$ ${value}`, name === 'highPrice' ? '上價(特級)' : name === 'lowPrice' ? '下價(普級)' : '均價']}
                    contentStyle={{ borderRadius: '8px', fontSize: '11px', border: '1px solid #e2e8f0' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '8px', fontSize: '11px' }} />
                  <Area type="monotone" dataKey="highPrice" name="highPrice" stroke="#0284c7" fill="url(#spreadAreaGrad)" strokeWidth={1.5} />
                  <Area type="monotone" dataKey="lowPrice" name="lowPrice" stroke="#0ea5e9" fill="#ffffff" strokeWidth={1.5} />
                  <Line type="monotone" dataKey="avgPrice" name="avgPrice" stroke="#0369a1" strokeWidth={2.5} dot={{ r: 3, fill: '#0369a1' }} />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>

          {/* Bottom Interactive Crop Quick Cards */}
          <div className="pt-2 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {MAJOR_CROPS.slice(0, 6).map(crop => {
              const isPositive = crop.changePercent > 0;
              const isSelected = targetCurrentCrop.cropName.includes(crop.name.split(' ')[0]);

              return (
                <div 
                  key={crop.id}
                  onClick={() => {
                    const matched = allMarketPrices.find(p => p.cropName.includes(crop.name.split(' ')[0]));
                    if (matched) onSelectCrop(matched);
                  }}
                  className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-emerald-50/90 border-emerald-300 ring-1 ring-emerald-400 shadow-2xs' 
                      : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span className="truncate">{crop.market}</span>
                    <span className="font-mono">{crop.code}</span>
                  </div>
                  <div className="font-bold text-slate-900 text-xs truncate mt-0.5">{crop.name}</div>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-xs sm:text-sm font-black font-mono text-emerald-950">${crop.basePrice}</span>
                    <span className={`text-[10px] font-bold font-mono flex items-center ${isPositive ? 'text-rose-600' : 'text-emerald-700'}`}>
                      {isPositive ? <TrendingUp className="w-2.5 h-2.5 mr-0.5" /> : <TrendingDown className="w-2.5 h-2.5 mr-0.5" />}
                      {isPositive ? `+${crop.changePercent}%` : `${crop.changePercent}%`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: 全台17處市場橫向比價 (Cross-Market Comparison) */}
      {/* ========================================================= */}
      {activeChartTab === 'cross_market' && (
        <div className="p-3.5 sm:p-4 space-y-4">
          
          {/* Header & Target Crop Select */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-emerald-600" />
                全台各大果菜批發市場橫向拍賣行情比價
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                比較消費地大宗市場 (台北一市、台北二市、三重、台中、高雄) 與主要產地市場 (西螺、屏東) 之拍賣均價、運銷成本與成交量能
              </p>
            </div>

            {/* Select target crop for cross-market comparison */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600">比價品項：</span>
              <select
                value={crossMarketCropId}
                onChange={(e) => setCrossMarketCropId(e.target.value)}
                className="bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold rounded-lg px-2.5 py-1.5 focus:ring-1 focus:ring-emerald-500 focus:outline-hidden cursor-pointer"
              >
                {MAJOR_CROPS.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.code}) - 基準價 ${c.basePrice}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cross Market Chart */}
          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={crossMarketData} margin={{ top: 10, right: 20, left: -10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis 
                  dataKey="market" 
                  tick={{ fontSize: 10, fill: '#475569' }} 
                  interval={0}
                  angle={-12}
                  textAnchor="end"
                />
                <YAxis 
                  yAxisId="price" 
                  tick={{ fontSize: 10, fill: '#059669' }} 
                  domain={['auto', 'auto']}
                  unit=" 元"
                />
                <YAxis 
                  yAxisId="volume" 
                  orientation="right" 
                  tick={{ fontSize: 9, fill: '#94a3b8' }} 
                  unit=" 噸"
                />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-slate-900/95 backdrop-blur-xs text-white p-3 rounded-lg shadow-xl border border-slate-800 text-xs min-w-[220px] space-y-1.5">
                          <div className="font-bold border-b border-slate-700 pb-1 text-emerald-400 flex items-center justify-between">
                            <span>{label}</span>
                            <span className="font-mono text-[10px] text-slate-300">冷鏈運費 ~${d.transportCost}/kg</span>
                          </div>
                          <div className="space-y-1 pt-0.5 text-[11px]">
                            <div className="flex justify-between">
                              <span className="text-slate-300">市場拍賣均價：</span>
                              <span className="font-mono font-bold text-white">NT$ {d.avgPrice} /kg</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-300">特級 / 普級區間：</span>
                              <span className="font-mono text-slate-300">${d.lowPrice} ~ ${d.highPrice}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-300">單日到貨交易量：</span>
                              <span className="font-mono text-amber-300 font-bold">{d.volumeTons} 噸</span>
                            </div>
                            <div className="flex justify-between pt-1 border-t border-slate-700">
                              <span className="text-emerald-300">好農方舟產地契作價：</span>
                              <span className="font-mono text-emerald-300 font-bold">NT$ {d.directArkPrice} /kg</span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: '10px', fontSize: '11px' }}
                  formatter={(val) => {
                    if (val === 'avgPrice') return <span className="text-emerald-800 font-bold">市場拍賣均價 (NT$/kg)</span>;
                    if (val === 'volumeTons') return <span className="text-slate-500">市場總到貨量 (公噸)</span>;
                    return val;
                  }}
                />
                <Bar yAxisId="volume" dataKey="volumeTons" name="volumeTons" fill="#e2e8f0" radius={[3, 3, 0, 0]} barSize={22} />
                <Bar yAxisId="price" dataKey="avgPrice" name="avgPrice" fill="#059669" radius={[3, 3, 0, 0]} barSize={22}>
                  {crossMarketData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.spreadFromBase > 0 ? '#059669' : '#0284c7'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Cross Market Insights Box */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-2">
            <div className="bg-emerald-50 rounded-lg p-2.5 border border-emerald-200">
              <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wide">最高消費地拍賣價</div>
              <div className="text-sm font-extrabold text-emerald-950 mt-0.5 flex items-center justify-between">
                <span>台北一市 (萬大)</span>
                <span className="font-mono text-emerald-700">
                  NT$ {(MAJOR_CROPS.find(c => c.id === crossMarketCropId)?.basePrice || 24.2) * 1.15 | 0} /kg
                </span>
              </div>
              <p className="text-[10px] text-emerald-700 mt-0.5">都會區餐廳與量販採購競標量大</p>
            </div>

            <div className="bg-sky-50 rounded-lg p-2.5 border border-sky-200">
              <div className="text-[10px] font-bold text-sky-800 uppercase tracking-wide">產地集貨出貨中樞</div>
              <div className="text-sm font-extrabold text-sky-950 mt-0.5 flex items-center justify-between">
                <span>西螺產地市場</span>
                <span className="font-mono text-sky-700">
                  NT$ {(MAJOR_CROPS.find(c => c.id === crossMarketCropId)?.basePrice || 24.2) * 0.82 | 0} /kg
                </span>
              </div>
              <p className="text-[10px] text-sky-700 mt-0.5">產地直接過磅拍賣，免去多層冷鏈轉運</p>
            </div>

            <div className="bg-amber-50 rounded-lg p-2.5 border border-amber-200">
              <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wide">產銷套利空間分析</div>
              <div className="text-sm font-extrabold text-amber-950 mt-0.5 flex items-center justify-between">
                <span>產銷南北價差</span>
                <span className="font-mono text-amber-700">~ 28.5% 差額</span>
              </div>
              <p className="text-[10px] text-amber-700 mt-0.5">好農方舟直採可回饋農友 +15% 收益</p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: 價量關係與漲跌分布矩陣 (Scatter & Volatility Matrix) */}
      {/* ========================================================= */}
      {activeChartTab === 'volume_scatter' && (
        <div className="p-3.5 sm:p-4 space-y-4">
          
          <div className="pb-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-1.5">
                <PieIcon className="w-4 h-4 text-emerald-600" />
                全市場作物價量關係與波動率氣泡分佈圖
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                橫軸：單日交易量 (公噸) ｜ 縱軸：前日漲跌幅 (%) ｜ 氣泡大小：批發均價 ｜ 顏色：作物類別
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-emerald-800 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" /> 蔬菜類
              </span>
              <span className="flex items-center gap-1 text-amber-800 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-600" /> 果品類
              </span>
              <span className="flex items-center gap-1 text-sky-800 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-600" /> 水產/畜產
              </span>
            </div>
          </div>

          {/* Scatter Plot */}
          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 15, right: 20, bottom: 10, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  type="number" 
                  dataKey="volumeTons" 
                  name="交易量" 
                  unit=" 噸" 
                  tick={{ fontSize: 10, fill: '#64748b' }}
                />
                <YAxis 
                  type="number" 
                  dataKey="priceChangePercent" 
                  name="漲跌幅" 
                  unit=" %" 
                  tick={{ fontSize: 10, fill: '#64748b' }}
                />
                <ZAxis 
                  type="number" 
                  dataKey="avgPrice" 
                  range={[60, 450]} 
                  name="均價" 
                  unit=" 元" 
                />
                <ReferenceLine y={0} stroke="#cbd5e1" strokeWidth={1.5} />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }} 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      const isUp = data.priceChangePercent > 0;
                      return (
                        <div className="bg-slate-900/95 backdrop-blur-xs text-white p-3 rounded-lg shadow-xl border border-slate-800 text-xs min-w-[200px] space-y-1">
                          <div className="font-bold border-b border-slate-700 pb-1 flex items-center justify-between">
                            <span className="text-emerald-400">{data.name}</span>
                            <span className="font-mono text-[10px] text-slate-400">{data.code} ({data.market})</span>
                          </div>
                          <div className="grid grid-cols-2 gap-1 text-[11px] pt-1">
                            <span className="text-slate-300">批發均價：</span>
                            <span className="font-mono text-right font-bold text-white">NT$ {data.avgPrice} /kg</span>
                            
                            <span className="text-slate-300">前日漲跌：</span>
                            <span className={`font-mono text-right font-bold ${isUp ? 'text-rose-400' : 'text-emerald-400'}`}>
                              {isUp ? `+${data.priceChangePercent}%` : `${data.priceChangePercent}%`}
                            </span>

                            <span className="text-slate-300">今日到貨量：</span>
                            <span className="font-mono text-right text-amber-300 font-bold">{data.volumeTons} 噸</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter name="農產品批發" data={volumeScatterData}>
                  {volumeScatterData.map((entry, index) => (
                    <Cell 
                      key={`scatter-cell-${index}`} 
                      fill={entry.color} 
                      opacity={0.85}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          {/* Gainers & Losers Ranking Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            
            {/* Top Gainers */}
            <div className="bg-rose-50/60 rounded-lg p-3 border border-rose-100">
              <div className="flex items-center justify-between pb-1.5 border-b border-rose-200">
                <span className="text-xs font-extrabold text-rose-900 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-rose-600" /> 今日漲幅榜 Top 5
                </span>
                <span className="text-[10px] text-rose-700">節前採購 / 到貨量縮</span>
              </div>
              <div className="divide-y divide-rose-100 mt-1">
                {marketMovers.topGainers.map((item, idx) => (
                  <div 
                    key={item.id}
                    onClick={() => onSelectCrop(item)}
                    className="py-1.5 flex items-center justify-between text-xs cursor-pointer hover:bg-rose-100/50 px-1 rounded transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-4 font-mono font-bold text-rose-700 text-[11px]">{idx + 1}</span>
                      <span className="font-bold text-slate-900">{item.cropName}</span>
                      <span className="text-[10px] text-slate-500 font-mono">({item.marketName})</span>
                    </div>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-slate-700">${item.avgPrice}</span>
                      <span className="font-bold text-rose-600">+{item.priceChangePercent}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Losers */}
            <div className="bg-emerald-50/60 rounded-lg p-3 border border-emerald-100">
              <div className="flex items-center justify-between pb-1.5 border-b border-emerald-200">
                <span className="text-xs font-extrabold text-emerald-900 flex items-center gap-1">
                  <TrendingDown className="w-3.5 h-3.5 text-emerald-700" /> 今日跌幅榜 Top 5 (買點推薦)
                </span>
                <span className="text-[10px] text-emerald-700">盛產豐收 / 產量充裕</span>
              </div>
              <div className="divide-y divide-emerald-100 mt-1">
                {marketMovers.topLosers.map((item, idx) => (
                  <div 
                    key={item.id}
                    onClick={() => onSelectCrop(item)}
                    className="py-1.5 flex items-center justify-between text-xs cursor-pointer hover:bg-emerald-100/50 px-1 rounded transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-4 font-mono font-bold text-emerald-700 text-[11px]">{idx + 1}</span>
                      <span className="font-bold text-slate-900">{item.cropName}</span>
                      <span className="text-[10px] text-slate-500 font-mono">({item.marketName})</span>
                    </div>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-slate-700">${item.avgPrice}</span>
                      <span className="font-bold text-emerald-700">{item.priceChangePercent}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: 產銷定價與直購節省模擬器 (Arbitrage Calculator) */}
      {/* ========================================================= */}
      {activeChartTab === 'arbitrage' && (
        <div className="p-3.5 sm:p-4 space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              好農方舟產地直購 vs. 傳統市場多層批發定價模型比較
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              傳統農產運銷流程需經過「產地代採 → 產地大盤 → 批發拍賣市場 → 承銷行行口 → 傳統零售菜市場」，好農方舟直連合作社有效壓低中間差價並提高農友收益
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            
            {/* Visual Process Flow Cards */}
            <div className="lg:col-span-8 space-y-3">
              
              {/* Traditional Route */}
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>傳統 5 級中盤批發運銷鏈</span>
                  <span className="text-rose-600 font-mono font-black">末端加價率：+120% ~ +180%</span>
                </div>
                <div className="grid grid-cols-5 gap-1 text-center text-[10px]">
                  <div className="bg-white p-2 rounded border border-slate-200 shadow-2xs">
                    <div className="text-slate-400">1. 農民交貨</div>
                    <div className="font-mono font-bold text-slate-700 mt-0.5">$20/kg</div>
                    <div className="text-[9px] text-slate-400">農友所得30%</div>
                  </div>
                  <div className="bg-white p-2 rounded border border-slate-200 shadow-2xs">
                    <div className="text-slate-400">2. 產地大盤</div>
                    <div className="font-mono font-bold text-slate-700 mt-0.5">$26/kg</div>
                    <div className="text-[9px] text-slate-400">集貨包裝費</div>
                  </div>
                  <div className="bg-white p-2 rounded border border-slate-200 shadow-2xs">
                    <div className="text-slate-400">3. 拍賣市場</div>
                    <div className="font-mono font-bold text-slate-700 mt-0.5">$35/kg</div>
                    <div className="text-[9px] text-slate-400">管理費+運費</div>
                  </div>
                  <div className="bg-white p-2 rounded border border-slate-200 shadow-2xs">
                    <div className="text-slate-400">4. 承銷行口</div>
                    <div className="font-mono font-bold text-slate-700 mt-0.5">$48/kg</div>
                    <div className="text-[9px] text-slate-400">損耗+利潤</div>
                  </div>
                  <div className="bg-rose-50 p-2 rounded border border-rose-200 shadow-2xs text-rose-950 font-bold">
                    <div className="text-rose-700">5. 傳統菜市</div>
                    <div className="font-mono font-bold text-rose-700 mt-0.5">$65/kg</div>
                    <div className="text-[9px] text-rose-600">消費者買價</div>
                  </div>
                </div>
              </div>

              {/* HaoNong Ark Direct Route */}
              <div className="p-3 rounded-lg border border-emerald-300 bg-emerald-50/70 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-950">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    好農方舟產銷合作社直送鏈 (ESG 公平貿易)
                  </span>
                  <span className="text-emerald-700 font-mono font-black">消費者省 30% ｜ 農友多賺 45%</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                  <div className="bg-white p-2.5 rounded-lg border border-emerald-200 shadow-2xs">
                    <div className="text-slate-500 text-[10px]">1. 契作產銷班/合作社</div>
                    <div className="font-mono font-bold text-emerald-700 text-sm mt-0.5">$32/kg</div>
                    <div className="text-[10px] text-emerald-600 font-semibold">保證收購價 (提高收益)</div>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-emerald-200 shadow-2xs">
                    <div className="text-slate-500 text-[10px]">2. 好農冷鏈分選驗證</div>
                    <div className="font-mono font-bold text-emerald-700 text-sm mt-0.5">+$6/kg</div>
                    <div className="text-[10px] text-emerald-600 font-semibold">TAP檢驗+低溫預冷包裝</div>
                  </div>
                  <div className="bg-emerald-700 text-white p-2.5 rounded-lg shadow-2xs font-bold">
                    <div className="text-emerald-100 text-[10px]">3. 直送消費者餐桌</div>
                    <div className="font-mono text-white text-base mt-0.5">$45/kg</div>
                    <div className="text-[10px] text-emerald-200">享鮮採24hr直送</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Direct Buy Simulator Panel */}
            <div className="lg:col-span-4 bg-slate-900 text-white rounded-lg p-3.5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <ShoppingBag className="w-3.5 h-3.5" /> 產地直購試算回饋
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {targetCurrentCrop.cropName}
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>傳統零售菜市場均價：</span>
                  <span className="font-mono text-slate-400 line-through">
                    ${(targetCurrentCrop.avgPrice * 1.7).toFixed(0)} /kg
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>批發拍賣市場行情：</span>
                  <span className="font-mono text-slate-300 font-bold">
                    ${targetCurrentCrop.avgPrice} /kg
                  </span>
                </div>
                <div className="flex justify-between text-emerald-300 font-bold pt-2 border-t border-slate-700">
                  <span>好農方舟產地鮮採價：</span>
                  <span className="font-mono text-emerald-300 text-sm">
                    ${(targetCurrentCrop.avgPrice * 1.15).toFixed(0)} /kg
                  </span>
                </div>
              </div>
              <div className="pt-2">
                <div className="bg-emerald-950/80 p-2.5 rounded border border-emerald-500/30 text-[11px] text-emerald-200 leading-relaxed">
                  ✓ 每一筆採購皆提供 <strong>100% TAP 產銷履歷條碼</strong> 與 <strong>381項無農藥殘留檢驗</strong>。
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
