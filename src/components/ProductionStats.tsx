import React, { useState } from 'react';
import { 
  BarChart3, 
  PieChart as PieIcon, 
  MapPin, 
  AlertOctagon, 
  ShieldAlert, 
  CheckCircle2, 
  Info, 
  Layers, 
  Activity, 
  Calendar,
  Sparkles,
  ArrowUpRight,
  CloudSun
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';
import { MOCK_PRODUCTION_STATS } from '../data/mockData';
import { ProductionStat } from '../types';
import { AgriculturalWeatherWidget } from './AgriculturalWeatherWidget';

export const ProductionStats: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeCropFilter, setActiveCropFilter] = useState<string>('甘藍 (高麗菜)');

  const COLORS = ['#059669', '#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#047857'];

  // Prepare chart data for planted areas by county/city
  const areaByCityData = MOCK_PRODUCTION_STATS.map(stat => ({
    city: stat.city,
    crop: stat.cropName,
    plantedArea: stat.plantedAreaHectare,
    yieldTons: stat.estimatedYieldTons,
    alertLevel: stat.surplusAlertLevel
  }));

  // Grouped yield distribution
  const cropYieldSummary = [
    { name: '甘藍 (高麗菜)', value: 180800, color: '#059669' },
    { name: '愛文芒果', value: 56700, color: '#f59e0b' },
    { name: '香蕉 (夏蕉)', value: 52000, color: '#eab308' },
    { name: '洋蔥', value: 27000, color: '#8b5cf6' },
    { name: '文旦柚', value: 25200, color: '#10b981' }
  ];

  const filteredStats = MOCK_PRODUCTION_STATS.filter(s => {
    return selectedCategory === 'all' || s.category.includes(selectedCategory);
  });

  return (
    <div className="min-h-screen bg-slate-50/70 pb-12">
      {/* Top Banner Header - High Density */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 text-white pt-6 pb-10 px-4 sm:px-6 lg:px-8 border-b border-emerald-900 shadow-xs">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="bg-teal-500/20 text-teal-300 text-[11px] font-semibold px-2 py-0.5 rounded border border-teal-400/30 flex items-center gap-1">
                  <BarChart3 className="w-3 h-3" /> 農業部統計大數據模組 (m.moa.gov.tw)
                </span>
                <span className="bg-amber-500/20 text-amber-300 text-[11px] font-semibold px-2 py-0.5 rounded border border-amber-400/30">
                  全台農林漁牧產量與面積調查
                </span>
              </div>
              <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight font-serif">
                全台農產品生產統計與產銷預警儀表板
              </h1>
              <p className="text-emerald-100/90 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed font-light">
                整合農業部農糧署種植面積調查、各縣市月季產量推估與育苗預警指標，協助農友預先調節耕作、維持市場產銷平衡。
              </p>
            </div>

            {/* Overview Badges - High Density */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-2.5 border border-white/15">
                <div className="text-[11px] text-emerald-200">總種植調查面積</div>
                <div className="text-lg sm:text-xl font-black text-white mt-0.5 font-mono">12,470 <span className="text-[10px] font-normal text-emerald-200">公頃</span></div>
                <div className="text-[10px] text-emerald-300 mt-0.5">涵蓋全台主要產區</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-2.5 border border-white/15">
                <div className="text-[11px] text-emerald-200">預估季總產量</div>
                <div className="text-lg sm:text-xl font-black text-white mt-0.5 font-mono">341,700 <span className="text-[10px] font-normal text-emerald-200">公噸</span></div>
                <div className="text-[10px] text-emerald-300 mt-0.5">2026 第三季推估</div>
              </div>
              <div className="col-span-2 sm:col-span-1 bg-white/10 backdrop-blur-md rounded-lg p-2.5 border border-white/15">
                <div className="text-[11px] text-amber-200">超產警戒項目</div>
                <div className="text-lg sm:text-xl font-black text-rose-300 mt-0.5 flex items-center gap-1 font-mono">
                  <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
                  1 項 (香蕉)
                </div>
                <div className="text-[10px] text-amber-300 mt-0.5">已啟動多元去化</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar - High Density */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
        <div className="bg-white rounded-lg shadow-xs border border-slate-200 p-2.5 sm:p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">作物類別：</span>
            <div className="flex items-center gap-1 overflow-x-auto">
              {[
                { id: 'all', label: '全部作物' },
                { id: '蔬菜', label: '蔬菜類' },
                { id: '果品', label: '果品類' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer ${
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

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1 text-xs">
              <Calendar className="w-3.5 h-3.5 text-slate-500 mr-1.5" />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="bg-transparent font-semibold text-slate-800 focus:outline-hidden cursor-pointer"
              >
                <option value={2026}>2026 年度 (最新調查)</option>
                <option value={2025}>2025 年度 (歷史回顧)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Agricultural Weather & 3-Day Forecast Widget */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-3.5">
        <AgriculturalWeatherWidget />
      </div>

      {/* Main Charts & Visualizations - High Density */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-3">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
          
          {/* Main Area / Yield Chart (8 Cols) */}
          <div className="lg:col-span-8 space-y-3">
            <div className="bg-white rounded-lg shadow-xs border border-slate-200 p-3 sm:p-3.5">
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    主要產區縣市種植面積 (公頃) 與產量推估
                  </h3>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    長條高度代表各縣市主力作物種植面積，柱體顏色反映產銷失衡預警等級
                  </p>
                </div>
              </div>

              {/* Chart */}
              <div className="h-52 w-full mt-2.5">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={areaByCityData} margin={{ top: 15, right: 15, left: 0, bottom: 15 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="city" 
                      tick={{ fontSize: 10, fill: '#475569' }} 
                      interval={0}
                    />
                    <YAxis 
                      tick={{ fontSize: 9, fill: '#64748b' }} 
                      label={{ value: '面積 (公頃)', angle: -90, position: 'insideLeft', fontSize: 9, fill: '#64748b' }}
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '6px', fontSize: '11px', border: '1px solid #e2e8f0', padding: '6px 8px' }}
                      formatter={(val: any, name: string, props: any) => {
                        return [`${val} 公頃 (預估產量: ${props.payload.yieldTons.toLocaleString()} 公噸)`, props.payload.crop];
                      }}
                    />
                    <Bar 
                      dataKey="plantedArea" 
                      fill="#059669" 
                      radius={[2, 2, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center justify-center gap-4 text-[10px] text-slate-500 pt-2 border-t border-slate-100">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 綠燈：產銷平衡
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span> 黃燈：育苗量偏高
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span> 紅燈：超產預警
                </span>
              </div>
            </div>

            {/* Detailed Production Records Table */}
            <div className="bg-white rounded-lg shadow-xs border border-slate-200 overflow-hidden">
              <div className="p-2.5 sm:p-3 border-b border-slate-200 flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-emerald-600" />
                  各縣市作物產銷平衡調查明細
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-[11px]">
                    <tr>
                      <th className="py-2 px-3">作物名稱</th>
                      <th className="py-2 px-2.5">縣市別</th>
                      <th className="py-2 px-2.5 text-right">種植面積(ha)</th>
                      <th className="py-2 px-2.5 text-right">預估產量(噸)</th>
                      <th className="py-2 px-2.5 text-center">預警燈號</th>
                      <th className="py-2 px-3">產銷調控分析與建議</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredStats.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-2 px-3 font-bold text-slate-900">
                          {item.cropName}
                          <span className="block text-[10px] font-normal text-slate-400">{item.category}</span>
                        </td>
                        <td className="py-2 px-2.5 text-slate-700">{item.city}</td>
                        <td className="py-2 px-2.5 text-right font-mono font-medium">{item.plantedAreaHectare.toLocaleString()}</td>
                        <td className="py-2 px-2.5 text-right font-mono font-medium">{item.estimatedYieldTons.toLocaleString()}</td>
                        <td className="py-2 px-2.5 text-center">
                          {item.surplusAlertLevel === 'green' && (
                            <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                              綠燈 正常
                            </span>
                          )}
                          {item.surplusAlertLevel === 'yellow' && (
                            <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                              黃燈 警戒
                            </span>
                          )}
                          {item.surplusAlertLevel === 'red' && (
                            <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                              紅燈 超產
                            </span>
                          )}
                        </td>
                        <td className="py-2 px-3 text-[11px] text-slate-600 leading-relaxed">
                          {item.notes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Pie & Alert Hub (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            {/* Total Yield Breakdown Pie */}
            <div className="bg-white rounded-lg shadow-xs border border-slate-200 p-3 sm:p-3.5">
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm mb-0.5">
                大宗蔬果產量佔比分析
              </h3>
              <p className="text-[10px] text-slate-500 mb-1.5">
                全台大宗農產產量結構比例
              </p>

              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={cropYieldSummary}
                      cx="50%"
                      cy="50%"
                      innerRadius={42}
                      outerRadius={64}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {cropYieldSummary.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(val: any) => [`${val.toLocaleString()} 公噸`, '總產量']}
                      contentStyle={{ borderRadius: '6px', fontSize: '11px', border: '1px solid #e2e8f0', padding: '6px 8px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-1 mt-1">
                {cropYieldSummary.map((c, i) => (
                  <div key={i} className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }}></span>
                      <span className="text-slate-700">{c.name}</span>
                    </div>
                    <span className="font-mono text-slate-500 font-medium">{(c.value / 1000).toFixed(1)}k 噸</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Smart Action Callout for Surplus */}
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-lg p-3 sm:p-3.5 shadow-2xs space-y-1.5">
              <div className="flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-100" />
                <h4 className="font-bold text-xs sm:text-sm">產銷失衡調節三部曲</h4>
              </div>
              <p className="text-[11px] text-amber-50 leading-relaxed">
                好農方舟即時與農糧署同步超產數據，針對紅黃燈作物自動啟動：
              </p>
              <ul className="text-[11px] space-y-1 text-amber-100 list-disc list-inside">
                <li><strong className="text-white">商城特惠專區</strong>：產地直送促銷吸引家庭採購</li>
                <li><strong className="text-white">企業契作認購</strong>：媒合 ESG 企業大量採購作為員工福祉</li>
                <li><strong className="text-white">農會截切加工</strong>：啟動低溫烘焙與急凍保存延長賞味期</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
