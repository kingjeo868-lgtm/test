import React, { useState } from 'react';
import { X, Check, AlertCircle, Sparkles, Building2 } from 'lucide-react';
import { ProcurementRecord } from '../../types';
import { MOCK_FARMERS } from '../../data/mockData';

interface ProcurementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (record: ProcurementRecord) => void;
  initialRecord?: ProcurementRecord | null;
}

const WAREHOUSE_OPTIONS = [
  '西螺低溫物流分裝中心 (冷藏0-4℃)',
  '高雄冷鏈蔬果集貨倉 (冷藏5℃)',
  '台南七股急凍冷藏庫 (零下-40℃)',
  '台北第一果菜低溫調節倉 (冷藏2℃)',
  '南投埔里常溫通風倉'
];

export const ProcurementModal: React.FC<ProcurementModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialRecord
}) => {
  const isEditing = Boolean(initialRecord);

  const [formData, setFormData] = useState<Partial<ProcurementRecord>>(() => {
    if (initialRecord) {
      return { ...initialRecord };
    }
    const defaultFarmer = MOCK_FARMERS[0];
    return {
      procurementNo: `PUR-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(10 + Math.random() * 90)}`,
      farmerId: defaultFarmer.id,
      farmerName: defaultFarmer.name,
      farmName: defaultFarmer.farmName,
      cropName: defaultFarmer.plantedCrops[0] || '有機初秋甘藍',
      category: 'vegetable',
      batchCode: `${defaultFarmer.traceabilityId}-B${Math.floor(10 + Math.random() * 90)}`,
      purchaseDate: new Date().toISOString().split('T')[0],
      quantityKg: 300,
      unitPrice: 40,
      totalCost: 12000,
      inspectionStatus: 'passed',
      status: 'received',
      warehouse: WAREHOUSE_OPTIONS[0],
      notes: '產銷履歷驗證抽檢無農藥殘留，外觀良好無水傷'
    };
  });

  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleFarmerChange = (farmerId: string) => {
    const found = MOCK_FARMERS.find(f => f.id === farmerId);
    if (found) {
      setFormData(prev => ({
        ...prev,
        farmerId: found.id,
        farmerName: found.name,
        farmName: found.farmName,
        cropName: found.plantedCrops[0] || prev.cropName || '',
        batchCode: `${found.traceabilityId}-B${Math.floor(10 + Math.random() * 90)}`
      }));
    }
  };

  const handleQtyPriceChange = (qty: number, price: number) => {
    const safeQty = Math.max(0, qty);
    const safePrice = Math.max(0, price);
    setFormData(prev => ({
      ...prev,
      quantityKg: safeQty,
      unitPrice: safePrice,
      totalCost: safeQty * safePrice
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.cropName?.trim()) {
      setErrorMsg('請填寫收購作物名稱');
      return;
    }
    if (!formData.quantityKg || formData.quantityKg <= 0) {
      setErrorMsg('請輸入有效採購數量 (kg)');
      return;
    }
    if (!formData.unitPrice || formData.unitPrice <= 0) {
      setErrorMsg('請輸入採購單價');
      return;
    }

    const finalRecord: ProcurementRecord = {
      id: initialRecord?.id || `pur_${Date.now()}`,
      procurementNo: formData.procurementNo || `PUR-${Date.now()}`,
      farmerId: formData.farmerId || MOCK_FARMERS[0].id,
      farmerName: formData.farmerName || MOCK_FARMERS[0].name,
      farmName: formData.farmName || MOCK_FARMERS[0].farmName,
      cropName: formData.cropName || '',
      category: (formData.category as any) || 'vegetable',
      batchCode: formData.batchCode || 'TAP-TW-2026-B01',
      purchaseDate: formData.purchaseDate || new Date().toISOString().split('T')[0],
      quantityKg: Number(formData.quantityKg) || 0,
      unitPrice: Number(formData.unitPrice) || 0,
      totalCost: (Number(formData.quantityKg) || 0) * (Number(formData.unitPrice) || 0),
      inspectionStatus: (formData.inspectionStatus as any) || 'passed',
      status: (formData.status as any) || 'received',
      warehouse: formData.warehouse || WAREHOUSE_OPTIONS[0],
      notes: formData.notes || ''
    };

    onSave(finalRecord);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <h3 className="font-bold text-sm sm:text-base">
              {isEditing ? `編輯供貨採購單：${initialRecord?.procurementNo}` : '新增小農採購進貨單'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Supplier Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                供貨小農 / 產銷班 <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.farmerId || MOCK_FARMERS[0].id}
                onChange={e => handleFarmerChange(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white font-semibold"
              >
                {MOCK_FARMERS.map(f => (
                  <option key={f.id} value={f.id}>
                    {f.name} ({f.farmName})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                進貨單號
              </label>
              <input
                type="text"
                value={formData.procurementNo || ''}
                onChange={e => setFormData(prev => ({ ...prev, procurementNo: e.target.value }))}
                className="w-full text-xs font-mono font-bold px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
                required
              />
            </div>
          </div>

          {/* Crop Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                收購農產作物名稱 <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.cropName || ''}
                onChange={e => {
                  setErrorMsg('');
                  setFormData(prev => ({ ...prev, cropName: e.target.value }));
                }}
                placeholder="例：有機初秋甘藍"
                className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                作物分類
              </label>
              <select
                value={formData.category || 'vegetable'}
                onChange={e => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
                className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
              >
                <option value="vegetable">有機蔬菜</option>
                <option value="fruit">節令水果</option>
                <option value="seafood">安心水產</option>
                <option value="meat">安心肉品</option>
                <option value="processed">米糧與農會加工品</option>
              </select>
            </div>
          </div>

          {/* Pricing & Quantity Math */}
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2.5">
            <h4 className="text-xs font-bold text-slate-800">收購數量與議定保證單價</h4>
            <div className="grid grid-cols-3 gap-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                  採購重量 (kg) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.quantityKg || ''}
                  onChange={e => handleQtyPriceChange(Number(e.target.value), formData.unitPrice || 0)}
                  className="w-full text-xs font-mono font-bold px-2.5 py-1.5 bg-white border border-slate-200 rounded-md text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                  收購單價 (NT$/kg) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.unitPrice || ''}
                  onChange={e => handleQtyPriceChange(formData.quantityKg || 0, Number(e.target.value))}
                  className="w-full text-xs font-mono font-bold px-2.5 py-1.5 bg-white border border-slate-200 rounded-md text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                  採購總額 (NT$)
                </label>
                <div className="px-2.5 py-1.5 bg-slate-200/80 border border-slate-300 rounded-md font-mono font-black text-emerald-950 text-xs flex items-center justify-between">
                  <span>$</span>
                  <span>{formData.totalCost || 0}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quality inspection & Batch */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                TAP產銷履歷批號
              </label>
              <input
                type="text"
                value={formData.batchCode || ''}
                onChange={e => setFormData(prev => ({ ...prev, batchCode: e.target.value }))}
                className="w-full text-xs font-mono px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-emerald-950 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                進貨入庫日期
              </label>
              <input
                type="date"
                value={formData.purchaseDate || ''}
                onChange={e => setFormData(prev => ({ ...prev, purchaseDate: e.target.value }))}
                className="w-full text-xs font-mono px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                農藥快篩與農檢狀態
              </label>
              <select
                value={formData.inspectionStatus || 'passed'}
                onChange={e => setFormData(prev => ({ ...prev, inspectionStatus: e.target.value as any }))}
                className="w-full text-xs font-semibold px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
              >
                <option value="passed">合格 (411項農藥未檢出)</option>
                <option value="inspecting">抽檢中 (低溫暫存待驗)</option>
                <option value="failed">不合格 (退貨拒收)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                入庫進度狀態
              </label>
              <select
                value={formData.status || 'received'}
                onChange={e => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                className="w-full text-xs font-semibold px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
              >
                <option value="received">已驗收完成 (低溫入庫)</option>
                <option value="in_transit">產地冷鏈專車運送中</option>
                <option value="scheduled">已排程收購 (待採收)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              存放冷鏈物流倉儲
            </label>
            <select
              value={formData.warehouse || WAREHOUSE_OPTIONS[0]}
              onChange={e => setFormData(prev => ({ ...prev, warehouse: e.target.value }))}
              className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
            >
              {WAREHOUSE_OPTIONS.map(w => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              品質驗收備註
            </label>
            <textarea
              rows={2}
              value={formData.notes || ''}
              onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="例：糖度檢驗達15度、外觀清脆無蟲孔..."
              className="w-full text-xs px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
            />
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-500 shadow-2xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{isEditing ? '儲存採購單' : '建立進貨單'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
