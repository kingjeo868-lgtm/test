import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, QrCode, Plus, Trash2, Calendar, MapPin, Award } from 'lucide-react';
import { TraceRecord } from '../../types';

interface TraceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (record: TraceRecord) => void;
  record: TraceRecord | null;
}

export const TraceModal: React.FC<TraceModalProps> = ({
  isOpen,
  onClose,
  onSave,
  record
}) => {
  const [formData, setFormData] = useState<TraceRecord>({
    traceCode: '',
    cropName: '',
    farmerName: '',
    farmName: '',
    location: '',
    landNo: '',
    certificationOrg: '國立中興大學有機農業驗證中心',
    certNo: '',
    certExpiry: '2028-12-31',
    plantingDate: '2026-03-01',
    harvestDate: '2026-08-20',
    packagingDate: '2026-08-21 09:30',
    inspectionResults: [
      { item: '381項多重農藥殘留檢驗 (SGS/興大)', standard: '未檢出 (ND)', result: '未檢出 (ND)', passed: true },
      { item: '重金屬檢測 (鉛、鎘、汞)', standard: '符合衛福部標準', result: '全數合格 (ND)', passed: true },
      { item: '甜度/品質規格檢測', standard: '≥ 12.0 °Brix', result: '14.5 °Brix', passed: true }
    ],
    farmingLogs: [
      { date: '2026-03-01', action: '整地與有機基肥施作', materialUsed: '台肥金農友有機質肥料', operator: '生產團隊' },
      { date: '2026-05-15', action: '生物天敵防治與性費洛蒙懸掛', materialUsed: '草蛉生物防治與黃色黏板', operator: '班長' },
      { date: '2026-08-20', action: '清晨鮮採與急速預冷', materialUsed: '真空預冷機 4°C 降溫', operator: '採收工班' }
    ]
  });

  useEffect(() => {
    if (record) {
      setFormData(record);
    } else {
      const randomCode = `TAP-108-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-C01`;
      setFormData({
        traceCode: randomCode,
        cropName: '',
        farmerName: '',
        farmName: '',
        location: '雲林縣西螺鎮',
        landNo: '雲林縣西螺地政事務所登錄地號 (福興段0128)',
        certificationOrg: '國立中興大學農產品驗證中心',
        certNo: `TAP-NCHU-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        certExpiry: '2028-12-31',
        plantingDate: '2026-03-01',
        harvestDate: '2026-08-20',
        packagingDate: '2026-08-21 09:30',
        inspectionResults: [
          { item: '381項多重農藥殘留檢驗', standard: '未檢出 (ND)', result: '未檢出 (ND)', passed: true },
          { item: '重金屬檢測 (鉛、鎘、砷)', standard: '符合衛福部標準', result: '全數符合 (ND)', passed: true },
          { item: '光波糖度檢測', standard: '≥ 12.0 °Brix', result: '14.8 °Brix', passed: true }
        ],
        farmingLogs: [
          { date: '2026-03-01', action: '整地與基肥施作', materialUsed: '台肥有機質肥料', operator: '陳班長' },
          { date: '2026-05-15', action: '生物天敵防治', materialUsed: '草蛉生物防治與黏板', operator: '農友' },
          { date: '2026-08-20', action: '清晨鮮採與急速預冷', materialUsed: '低溫預冷庫 4°C 降溫', operator: '工班' }
        ]
      });
    }
  }, [record, isOpen]);

  if (!isOpen) return null;

  const handleAddInspection = () => {
    setFormData(prev => ({
      ...prev,
      inspectionResults: [
        ...prev.inspectionResults,
        { item: '', standard: '未檢出 (ND)', result: '未檢出 (ND)', passed: true }
      ]
    }));
  };

  const handleRemoveInspection = (index: number) => {
    setFormData(prev => ({
      ...prev,
      inspectionResults: prev.inspectionResults.filter((_, i) => i !== index)
    }));
  };

  const handleAddFarmingLog = () => {
    setFormData(prev => ({
      ...prev,
      farmingLogs: [
        ...prev.farmingLogs,
        { date: new Date().toISOString().slice(0, 10), action: '', materialUsed: '', operator: '農友' }
      ]
    }));
  };

  const handleRemoveFarmingLog = (index: number) => {
    setFormData(prev => ({
      ...prev,
      farmingLogs: prev.farmingLogs.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.traceCode.trim() || !formData.cropName.trim() || !formData.farmerName.trim()) {
      alert('請填寫完整 TAP 追溯條碼、農作物名稱與生產農友！');
      return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 px-5 py-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-emerald-700/60 rounded-lg border border-emerald-500/30">
              <ShieldCheck className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-serif">
                {record ? '編輯 TAP 產銷履歷與農檢報告' : '新增 TAP 產銷履歷批次條碼'}
              </h2>
              <p className="text-xs text-emerald-200/80">登錄 20 碼追溯碼、SGS 381 項檢驗數據與田間日誌</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 sm:p-6 space-y-4 text-xs text-slate-700">
          {/* Top Bar Codes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200">
            <div>
              <label className="block font-bold text-emerald-950 mb-1">
                TAP 履歷追溯碼 (20 碼) *
              </label>
              <input
                type="text"
                value={formData.traceCode}
                onChange={e => setFormData({ ...formData, traceCode: e.target.value })}
                placeholder="例如: TAP-108-0921-8872-C01"
                className="w-full px-3 py-2 bg-white border border-emerald-300 rounded-lg font-mono font-bold text-emerald-900 focus:outline-emerald-600"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-emerald-950 mb-1">
                農作物名稱 (品項與規格) *
              </label>
              <input
                type="text"
                value={formData.cropName}
                onChange={e => setFormData({ ...formData, cropName: e.target.value })}
                placeholder="例如: 西螺濁水溪特級有機高麗菜 (初秋甘藍)"
                className="w-full px-3 py-2 bg-white border border-emerald-300 rounded-lg font-bold text-slate-900 focus:outline-emerald-600"
                required
              />
            </div>
          </div>

          {/* Farmer & Land */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">生產農友姓名 *</label>
              <input
                type="text"
                value={formData.farmerName}
                onChange={e => setFormData({ ...formData, farmerName: e.target.value })}
                placeholder="例如: 陳健興 (神農獎得主)"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg font-bold text-slate-900 focus:outline-emerald-600"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1">所屬農場 / 合作社 *</label>
              <input
                type="text"
                value={formData.farmName}
                onChange={e => setFormData({ ...formData, farmName: e.target.value })}
                placeholder="例如: 西螺綠金有機農場"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-emerald-600"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1">產地縣市鄉鎮</label>
              <input
                type="text"
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                placeholder="例如: 雲林縣西螺鎮福興里"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-emerald-600"
              />
            </div>
          </div>

          {/* Land Register & Cert Org */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">地政登錄地號</label>
              <input
                type="text"
                value={formData.landNo}
                onChange={e => setFormData({ ...formData, landNo: e.target.value })}
                placeholder="例如: 西螺地政事務所登錄地號 (福興段0128)"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1">第三方驗證機構</label>
              <input
                type="text"
                value={formData.certificationOrg}
                onChange={e => setFormData({ ...formData, certificationOrg: e.target.value })}
                placeholder="國立中興大學農產品驗證中心"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1">驗證證書字號</label>
              <input
                type="text"
                value={formData.certNo}
                onChange={e => setFormData({ ...formData, certNo: e.target.value })}
                placeholder="TAP-NCHU-2026-8872"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg font-mono text-slate-900"
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div>
              <label className="block font-bold text-slate-800 mb-1">播種/定植日期</label>
              <input
                type="date"
                value={formData.plantingDate}
                onChange={e => setFormData({ ...formData, plantingDate: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-800"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1">鮮採收穫日期</label>
              <input
                type="date"
                value={formData.harvestDate}
                onChange={e => setFormData({ ...formData, harvestDate: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-800"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1">預冷分裝時間</label>
              <input
                type="text"
                value={formData.packagingDate}
                onChange={e => setFormData({ ...formData, packagingDate: e.target.value })}
                placeholder="2026-08-21 09:30"
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-800"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1">證書有效期限</label>
              <input
                type="date"
                value={formData.certExpiry}
                onChange={e => setFormData({ ...formData, certExpiry: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-800"
              />
            </div>
          </div>

          {/* Inspection Results */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-700" />
                <span>SGS / 第三方實驗室農檢數據清單</span>
              </h4>
              <button
                type="button"
                onClick={handleAddInspection}
                className="px-2.5 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-lg font-bold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Plus className="w-3 h-3" />
                <span>新增檢驗項目</span>
              </button>
            </div>

            <div className="space-y-2">
              {formData.inspectionResults.map((insp, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <input
                    type="text"
                    value={insp.item}
                    onChange={e => {
                      const updated = [...formData.inspectionResults];
                      updated[idx].item = e.target.value;
                      setFormData({ ...formData, inspectionResults: updated });
                    }}
                    placeholder="檢驗項目 (例如: 381項多重農藥殘留)"
                    className="flex-1 px-2 py-1 bg-white border border-slate-200 rounded text-slate-900 font-medium"
                  />
                  <input
                    type="text"
                    value={insp.standard}
                    onChange={e => {
                      const updated = [...formData.inspectionResults];
                      updated[idx].standard = e.target.value;
                      setFormData({ ...formData, inspectionResults: updated });
                    }}
                    placeholder="合格標準 (未檢出 ND)"
                    className="w-28 px-2 py-1 bg-white border border-slate-200 rounded text-slate-700 text-center"
                  />
                  <input
                    type="text"
                    value={insp.result}
                    onChange={e => {
                      const updated = [...formData.inspectionResults];
                      updated[idx].result = e.target.value;
                      setFormData({ ...formData, inspectionResults: updated });
                    }}
                    placeholder="實測數據 (未檢出 ND)"
                    className="w-32 px-2 py-1 bg-white border border-slate-200 rounded font-bold text-emerald-800 text-center"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveInspection(idx)}
                    className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Farming Logs */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-700" />
                <span>田間農事作業日誌與用藥/資材管理</span>
              </h4>
              <button
                type="button"
                onClick={handleAddFarmingLog}
                className="px-2.5 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-lg font-bold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Plus className="w-3 h-3" />
                <span>新增農事日誌</span>
              </button>
            </div>

            <div className="space-y-2">
              {formData.farmingLogs.map((log, idx) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-4 gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <input
                    type="date"
                    value={log.date}
                    onChange={e => {
                      const updated = [...formData.farmingLogs];
                      updated[idx].date = e.target.value;
                      setFormData({ ...formData, farmingLogs: updated });
                    }}
                    className="px-2 py-1 bg-white border border-slate-200 rounded text-slate-800 font-mono"
                  />
                  <input
                    type="text"
                    value={log.action}
                    onChange={e => {
                      const updated = [...formData.farmingLogs];
                      updated[idx].action = e.target.value;
                      setFormData({ ...formData, farmingLogs: updated });
                    }}
                    placeholder="作業工項 (例如: 生物天敵防治)"
                    className="px-2 py-1 bg-white border border-slate-200 rounded text-slate-900 font-medium"
                  />
                  <input
                    type="text"
                    value={log.materialUsed}
                    onChange={e => {
                      const updated = [...formData.farmingLogs];
                      updated[idx].materialUsed = e.target.value;
                      setFormData({ ...formData, farmingLogs: updated });
                    }}
                    placeholder="使用資材/工法"
                    className="px-2 py-1 bg-white border border-slate-200 rounded text-slate-700"
                  />
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={log.operator}
                      onChange={e => {
                        const updated = [...formData.farmingLogs];
                        updated[idx].operator = e.target.value;
                        setFormData({ ...formData, farmingLogs: updated });
                      }}
                      placeholder="操作人員"
                      className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-slate-800"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveFarmingLog(idx)}
                      className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end space-x-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-all cursor-pointer"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{record ? '儲存更新履歷資料' : '發行建立履歷條碼'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
