import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  QrCode, 
  Award, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Eye,
  ExternalLink,
  X
} from 'lucide-react';
import { TraceRecord } from '../../types';
import { TraceModal } from './TraceModal';

interface TraceabilityAdminProps {
  traceRecordsMap: Record<string, TraceRecord>;
  onSaveRecord: (record: TraceRecord) => void;
  onDeleteRecord: (code: string) => void;
}

export const TraceabilityAdmin: React.FC<TraceabilityAdminProps> = ({
  traceRecordsMap,
  onSaveRecord,
  onDeleteRecord
}) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<TraceRecord | null>(null);
  const [previewRecord, setPreviewRecord] = useState<TraceRecord | null>(null);

  const recordsList: TraceRecord[] = Object.values(traceRecordsMap);

  const filteredList = recordsList.filter(rec => {
    if (searchKeyword.trim()) {
      const kw = searchKeyword.toLowerCase();
      const matchCode = rec.traceCode.toLowerCase().includes(kw);
      const matchCrop = rec.cropName.toLowerCase().includes(kw);
      const matchFarmer = rec.farmerName.toLowerCase().includes(kw);
      const matchFarm = rec.farmName.toLowerCase().includes(kw);
      const matchCert = rec.certNo.toLowerCase().includes(kw) || rec.certificationOrg.toLowerCase().includes(kw);
      if (!matchCode && !matchCrop && !matchFarmer && !matchFarm && !matchCert) return false;
    }
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-medium">已登錄 TAP 條碼</span>
            <QrCode className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 font-mono">
            {recordsList.length} <span className="text-xs font-normal text-slate-500">組</span>
          </div>
          <div className="text-[10px] text-emerald-700 mt-0.5 font-medium">農業部溯源系統同步中</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-medium">農藥殘留檢驗</span>
            <ShieldCheck className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-xl font-extrabold text-emerald-700 font-mono">
            100% <span className="text-xs font-normal text-slate-500">合格 (ND)</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">SGS 381項全數零檢出</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-medium">第三方驗證機構</span>
            <Award className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 font-mono">
            4 <span className="text-xs font-normal text-slate-500">所國立大學</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">興大/屏科大/成大/慈心</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-medium">田間日誌登錄</span>
            <Calendar className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 font-mono">
            即時 <span className="text-xs font-normal text-slate-500">透明更新</span>
          </div>
          <div className="text-[10px] text-sky-700 mt-0.5 font-medium">施肥與採收作業履歷</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative min-w-[280px] flex-1 sm:flex-initial">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchKeyword}
            onChange={e => setSearchKeyword(e.target.value)}
            placeholder="搜尋 20 碼追溯碼、作物名稱、生產農友、驗證字號..."
            className="w-full pl-8.5 pr-3 py-1.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-lg text-xs transition-colors focus:outline-emerald-600"
          />
        </div>

        <button
          onClick={() => {
            setEditingRecord(null);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>登錄新產銷履歷 (TAP 條碼)</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                <th className="py-3 px-3.5">TAP 履歷追溯碼 / 農作物</th>
                <th className="py-3 px-3.5">生產者 / 所屬社場</th>
                <th className="py-3 px-3.5">產區地號 / 採收日期</th>
                <th className="py-3 px-3.5">第三方驗證 / 證號</th>
                <th className="py-3 px-3.5">農檢項目與判定</th>
                <th className="py-3 px-3.5 text-center">操作管理</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <ShieldCheck className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="font-medium">查無符合條件的產銷履歷條碼資料</p>
                  </td>
                </tr>
              ) : (
                filteredList.map(rec => (
                  <tr key={rec.traceCode} className="hover:bg-slate-50/80 transition-colors">
                    {/* Code & Crop */}
                    <td className="py-3 px-3.5">
                      <div className="font-bold text-slate-900 text-xs">{rec.cropName}</div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="bg-emerald-50 text-emerald-900 border border-emerald-200 px-1.5 py-0.2 rounded font-mono font-bold text-[10px]">
                          {rec.traceCode}
                        </span>
                      </div>
                    </td>

                    {/* Farmer */}
                    <td className="py-3 px-3.5">
                      <div className="font-bold text-slate-900">{rec.farmerName}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{rec.farmName}</div>
                    </td>

                    {/* Location & Harvest */}
                    <td className="py-3 px-3.5">
                      <div className="text-slate-900 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span className="truncate max-w-[180px]">{rec.location}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                        採收: {rec.harvestDate} | 分裝: {rec.packagingDate}
                      </div>
                    </td>

                    {/* Certification */}
                    <td className="py-3 px-3.5">
                      <div className="text-slate-900 font-medium truncate max-w-[200px]">{rec.certificationOrg}</div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">{rec.certNo}</div>
                    </td>

                    {/* Inspection */}
                    <td className="py-3 px-3.5">
                      <div className="flex items-center gap-1 text-emerald-700 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{rec.inspectionResults.length} 項安全農檢合格</span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {rec.inspectionResults[0]?.item}: {rec.inspectionResults[0]?.result}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-3.5 text-center">
                      <div className="flex items-center justify-center space-x-1.5">
                        <button
                          onClick={() => setPreviewRecord(rec)}
                          className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
                          title="預覽履歷卡片"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingRecord(rec);
                            setIsModalOpen(true);
                          }}
                          className="p-1.5 bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 rounded-lg transition-colors cursor-pointer"
                          title="編輯履歷"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteRecord(rec.traceCode)}
                          className="p-1.5 bg-slate-100 hover:bg-rose-100 text-slate-700 hover:text-rose-800 rounded-lg transition-colors cursor-pointer"
                          title="刪除條碼"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Preview Modal */}
      {previewRecord && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-emerald-800 to-teal-900 px-5 py-4 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-200" />
                <h3 className="font-bold text-base">產銷履歷驗證卡片預覽</h3>
              </div>
              <button
                onClick={() => setPreviewRecord(null)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-5 space-y-4 text-xs">
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 space-y-2">
                <div className="text-sm font-bold text-slate-900">{previewRecord.cropName}</div>
                <div className="font-mono text-emerald-800 font-bold text-xs bg-white px-2.5 py-1 rounded inline-block border border-emerald-300">
                  {previewRecord.traceCode}
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-600 pt-2 border-t border-emerald-200/60">
                  <div>生產者: {previewRecord.farmerName}</div>
                  <div>所屬農場: {previewRecord.farmName}</div>
                  <div>產地: {previewRecord.location}</div>
                  <div>地號: {previewRecord.landNo}</div>
                </div>
              </div>

              {/* Inspection Box */}
              <div>
                <h4 className="font-bold text-slate-900 mb-1.5">檢驗報告數據</h4>
                <div className="space-y-1.5">
                  {previewRecord.inspectionResults.map((insp, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="font-medium text-slate-800">{insp.item}</span>
                      <span className="font-bold text-emerald-700">{insp.result} (合格)</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Farming Logs */}
              <div>
                <h4 className="font-bold text-slate-900 mb-1.5">田間作業歷程</h4>
                <div className="space-y-1.5">
                  {previewRecord.farmingLogs.map((log, i) => (
                    <div key={i} className="p-2 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                      <div>
                        <span className="font-mono text-slate-500 mr-2">{log.date}</span>
                        <span className="font-bold text-slate-800">{log.action}</span>
                        <span className="text-slate-500 ml-2">({log.materialUsed})</span>
                      </div>
                      <span className="text-slate-400">{log.operator}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setPreviewRecord(null)}
                className="px-4 py-1.5 bg-slate-800 text-white rounded-lg font-bold text-xs cursor-pointer"
              >
                關閉預覽
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      <TraceModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingRecord(null);
        }}
        onSave={onSaveRecord}
        record={editingRecord}
      />
    </div>
  );
};
