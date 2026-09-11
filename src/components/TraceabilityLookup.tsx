import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  QrCode, 
  MapPin, 
  CheckCircle2, 
  FileText, 
  Calendar, 
  UserCheck, 
  Building2, 
  Leaf,
  Info
} from 'lucide-react';
import { MOCK_TRACE_RECORDS } from '../data/mockData';
import { TraceRecord } from '../types';

export const TraceabilityLookup: React.FC = () => {
  const [searchCode, setSearchCode] = useState<string>('TAP-108-0921-8872-C01');
  const [currentRecord, setCurrentRecord] = useState<TraceRecord | null>(
    MOCK_TRACE_RECORDS['TAP-108-0921-8872-C01']
  );
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSearch = () => {
    const trimmed = searchCode.trim();
    if (MOCK_TRACE_RECORDS[trimmed]) {
      setCurrentRecord(MOCK_TRACE_RECORDS[trimmed]);
      setErrorMessage('');
    } else {
      setErrorMessage('查無此產銷履歷追溯條碼，請確認格式 (例如: TAP-108-0921-8872-C01)');
      setCurrentRecord(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-12">
      {/* Header - High Density */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white py-6 px-4 sm:px-6 lg:px-8 border-b border-emerald-900 shadow-xs">
        <div className="max-w-4xl mx-auto text-center space-y-2.5">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold px-2.5 py-0.5 rounded border border-emerald-400/30 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5" /> 國家級 TAP 產銷履歷與有機驗證溯源系統
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold font-serif">
            農產品產銷履歷與檢驗報告追溯
          </h1>
          <p className="text-emerald-200 text-xs sm:text-sm max-w-xl mx-auto font-light">
            輸入生鮮包裝上的 20 碼產銷履歷編號或掃描 QR Code，即刻檢視從播種、田間施肥、SGS 農檢到採收包裝的完整歷程。
          </p>

          {/* Quick Search Input Box */}
          <div className="pt-2 max-w-2xl mx-auto">
            <div className="flex bg-white rounded-xl p-1 shadow-xs border border-slate-200">
              <input
                type="text"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                placeholder="輸入產銷履歷追溯號碼 (例如: TAP-108-0921-8872-C01)"
                className="flex-1 px-3 py-2 text-slate-900 text-xs sm:text-sm focus:outline-hidden font-mono"
              />
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
                <span>立即查詢</span>
              </button>
            </div>
            {/* Sample query shortcuts */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-2 text-[11px] text-emerald-300">
              <span>快速試查範例：</span>
              <button
                onClick={() => {
                  setSearchCode('TAP-108-0921-8872-C01');
                  setCurrentRecord(MOCK_TRACE_RECORDS['TAP-108-0921-8872-C01']);
                  setErrorMessage('');
                }}
                className="underline hover:text-white cursor-pointer"
              >
                西螺有機高麗菜 (中興大學驗證)
              </button>
              <span>・</span>
              <button
                onClick={() => {
                  setSearchCode('TAP-110-0615-3341-M08');
                  setCurrentRecord(MOCK_TRACE_RECORDS['TAP-110-0615-3341-M08']);
                  setErrorMessage('');
                }}
                className="underline hover:text-white cursor-pointer"
              >
                屏東枋山在欉紅愛文芒果 (SGS驗證)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Results View */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        {errorMessage && (
          <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg text-xs text-center font-medium">
            {errorMessage}
          </div>
        )}

        {currentRecord && (
          <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden space-y-3 p-3.5 sm:p-4">
            
            {/* Top Verification Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2.5">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                    履歷驗證通過有效
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    有效期限至：{currentRecord.certExpiry}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                  {currentRecord.cropName}
                </h2>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                  追溯碼：{currentRecord.traceCode}
                </div>
              </div>

              <div className="text-left sm:text-right sm:border-l sm:border-slate-200 sm:pl-4">
                <div className="text-[10px] text-slate-500">第三方驗證機構</div>
                <div className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">
                  {currentRecord.certificationOrg}
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                  證書字號: {currentRecord.certNo}
                </div>
              </div>
            </div>

            {/* Farm & Location Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              <div className="bg-slate-50 rounded-lg p-2.5 sm:p-3 border border-slate-200 space-y-1 text-xs">
                <div className="font-bold text-slate-800 flex items-center gap-1.5 text-xs">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-600" /> 生產者與農場資訊
                </div>
                <div className="text-slate-600 text-[11px]">
                  生產者：<strong className="text-slate-900">{currentRecord.farmerName}</strong>
                </div>
                <div className="text-slate-600 text-[11px]">
                  農場名稱：<strong className="text-slate-900">{currentRecord.farmName}</strong>
                </div>
                <div className="text-slate-600 text-[11px]">
                  合法地號：<span className="font-mono text-slate-700">{currentRecord.landNo}</span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-2.5 sm:p-3 border border-slate-200 space-y-1 text-xs">
                <div className="font-bold text-slate-800 flex items-center gap-1.5 text-xs">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" /> 生產與出貨期程
                </div>
                <div className="text-slate-600 text-[11px]">
                  定植日期：<span className="font-mono text-slate-800">{currentRecord.plantingDate}</span>
                </div>
                <div className="text-slate-600 text-[11px]">
                  採收日期：<span className="font-mono font-bold text-emerald-800">{currentRecord.harvestDate}</span>
                </div>
                <div className="text-slate-600 text-[11px]">
                  分級包裝：<span className="font-mono text-slate-800">{currentRecord.packagingDate}</span>
                </div>
              </div>
            </div>

            {/* SGS / Inspection Results Table */}
            <div>
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm mb-1.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-emerald-600" />
                安全檢驗與農藥殘留檢測結果 (第三方公證檢驗)
              </h3>
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-[11px]">
                    <tr>
                      <th className="py-1.5 px-3">檢驗項目</th>
                      <th className="py-1.5 px-3">國家法規標準</th>
                      <th className="py-1.5 px-3">實測結果</th>
                      <th className="py-1.5 px-3 text-center">判定</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {currentRecord.inspectionResults.map((res, i) => (
                      <tr key={i} className="hover:bg-slate-50/60">
                        <td className="py-1.5 px-3 font-medium text-slate-900">{res.item}</td>
                        <td className="py-1.5 px-3 text-slate-600 font-mono">{res.standard}</td>
                        <td className="py-1.5 px-3 font-mono font-bold text-emerald-800">{res.result}</td>
                        <td className="py-1.5 px-3 text-center">
                          <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            合格
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Field Farming Logs Timeline */}
            <div>
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm mb-1.5 flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                田間農事工作日誌 (全程透明登錄)
              </h3>
              <div className="space-y-1.5">
                {currentRecord.farmingLogs.map((log, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                    <span className="font-mono font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded text-[10px] shrink-0 border border-emerald-200">
                      {log.date}
                    </span>
                    <div className="flex-1">
                      <div className="font-bold text-slate-900">{log.action}</div>
                      <div className="text-slate-600 text-[11px] mt-0.5">使用資材：{log.materialUsed}</div>
                    </div>
                    <span className="text-[10px] text-slate-400">作業員: {log.operator}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
