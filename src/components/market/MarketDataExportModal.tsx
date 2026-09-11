import React, { useState } from 'react';
import { X, Download, FileText, CheckCircle2, Copy, Share2 } from 'lucide-react';
import { MarketPriceRecord } from '../../types';

interface MarketDataExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: MarketPriceRecord[];
}

export const MarketDataExportModal: React.FC<MarketDataExportModalProps> = ({
  isOpen,
  onClose,
  data
}) => {
  const [exportFormat, setExportFormat] = useState<'csv' | 'json' | 'summary'>('csv');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Generate CSV String
  const generateCSV = () => {
    const headers = ['作物代碼', '作物名稱', '類別', '交易市場', '交易日期', '上價(元/kg)', '中價(元/kg)', '下價(元/kg)', '平均價(元/kg)', '交易量(kg)', '漲跌幅(%)', '主力產地'];
    const rows = data.map(item => [
      item.cropCode,
      `"${item.cropName}"`,
      item.category,
      item.marketName,
      item.tradeDate,
      item.highPrice,
      item.midPrice,
      item.lowPrice,
      item.avgPrice,
      item.volumeKg,
      item.priceChangePercent,
      `"${item.originSupplyArea}"`
    ]);
    return [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  };

  // Generate JSON String
  const generateJSON = () => {
    return JSON.stringify(data, null, 2);
  };

  // Generate Summary Text
  const generateSummary = () => {
    const totalVolume = data.reduce((acc, curr) => acc + curr.volumeKg, 0);
    const avgPriceAll = (data.reduce((acc, curr) => acc + curr.avgPrice, 0) / data.length).toFixed(1);
    const topGainer = [...data].sort((a, b) => b.priceChangePercent - a.priceChangePercent)[0];
    const topLoser = [...data].sort((a, b) => a.priceChangePercent - b.priceChangePercent)[0];

    return `【好農方舟】台灣農產品批發行情日報表 (${data[0]?.tradeDate || '2026-08-23'})
==============================================
監測品項數：${data.length} 項
全台監測總交易量：${(totalVolume / 1000).toFixed(1)} 公噸
全品項平均批發價：NT$ ${avgPriceAll} /公斤

📈 今日最大漲幅：${topGainer?.cropName || '-'} (${topGainer?.marketName || '-'}) +${topGainer?.priceChangePercent}% (均價 $${topGainer?.avgPrice})
📉 今日最大跌幅：${topLoser?.cropName || '-'} (${topLoser?.marketName || '-'}) ${topLoser?.priceChangePercent}% (均價 $${topLoser?.avgPrice})

📋 重點作物行情簡表：
${data.slice(0, 8).map(d => `• ${d.cropName.padEnd(12, ' ')} [${d.marketName}] 均價 $${d.avgPrice}/kg (漲跌 ${d.priceChangePercent > 0 ? '+' : ''}${d.priceChangePercent}%) 到貨 ${(d.volumeKg/1000).toFixed(1)}噸`).join('\n')}

數據來源：農業部農產品批發市場交易行情站 ＆ 好農方舟產銷履歷合作社聯網
`;
  };

  const currentContent = exportFormat === 'csv' ? generateCSV() : exportFormat === 'json' ? generateJSON() : generateSummary();

  const handleDownload = () => {
    const blob = new Blob([currentContent], { 
      type: exportFormat === 'json' ? 'application/json' : 'text/plain;charset=utf-8;' 
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `haonong_market_prices_${exportFormat}_${new Date().toISOString().split('T')[0]}.${exportFormat === 'summary' ? 'txt' : exportFormat}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-base">匯出批發行情數據報表</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format Selector */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">選擇格式：</span>
            <div className="bg-white p-1 rounded-lg border border-slate-200 flex items-center gap-1 shadow-2xs">
              <button
                onClick={() => setExportFormat('csv')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                  exportFormat === 'csv' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                CSV 試算表
              </button>
              <button
                onClick={() => setExportFormat('json')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                  exportFormat === 'json' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                JSON 結構檔
              </button>
              <button
                onClick={() => setExportFormat('summary')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                  exportFormat === 'summary' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                TXT 綜合日報
              </button>
            </div>
          </div>

          <div className="text-xs text-slate-500 font-mono">
            共 {data.length} 筆農產批發行情記錄
          </div>
        </div>

        {/* Content Preview */}
        <div className="p-4 flex-1 overflow-auto">
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
            <span>資料即時預覽：</span>
            <button 
              onClick={handleCopy}
              className="text-xs text-emerald-600 hover:text-emerald-700 font-bold flex items-center gap-1 cursor-pointer"
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? '已複製到剪貼簿' : '複製全部'}
            </button>
          </label>
          <pre className="bg-slate-950 text-emerald-300 p-3 rounded-lg text-[11px] font-mono overflow-auto max-h-64 whitespace-pre border border-slate-800 leading-relaxed">
            {currentContent}
          </pre>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <p className="text-[11px] text-slate-500">
            檔案編碼使用 UTF-8，可相容於 Excel 與 Google 試算表
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 border border-slate-300 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              關閉
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4" /> 下載 {exportFormat.toUpperCase()} 檔案
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
