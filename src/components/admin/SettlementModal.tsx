import React, { useState } from 'react';
import { X, Check, AlertCircle, DollarSign, Receipt, Sparkles } from 'lucide-react';
import { FinancialSettlement } from '../../types';
import { MOCK_FARMERS } from '../../data/mockData';

interface SettlementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (settlement: FinancialSettlement) => void;
  initialSettlement?: FinancialSettlement | null;
}

const DEFAULT_BANK_ACCOUNTS: Record<string, string> = {
  farmer_01: '台灣土地銀行 西螺分行 (054) 054-001-182901',
  farmer_02: '屏東縣枋山地區農會信用部 (620) 620-001-098234',
  farmer_03: '台南市麻豆區農會信用部 (619) 619-002-334112',
  farmer_04: '台南市七股區農會信用部 (618) 618-005-223190'
};

export const SettlementModal: React.FC<SettlementModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialSettlement
}) => {
  const isEditing = Boolean(initialSettlement);

  const [formData, setFormData] = useState<Partial<FinancialSettlement>>(() => {
    if (initialSettlement) {
      return { ...initialSettlement };
    }
    const defaultFarmer = MOCK_FARMERS[0];
    const gross = 50000;
    const fee = Math.round(gross * 0.05);
    const subsidy = 2500;
    return {
      settlementNo: `SET-${new Date().toISOString().slice(0, 7).replace(/-/g, '')}-${Math.floor(10 + Math.random() * 90)}`,
      farmerId: defaultFarmer.id,
      farmerName: defaultFarmer.name,
      farmName: defaultFarmer.farmName,
      bankAccount: DEFAULT_BANK_ACCOUNTS[defaultFarmer.id] || '台灣土地銀行 西螺分行 054-001-xxxxxx',
      period: '2026年8月 下半期 (08/16 - 08/31)',
      grossAmount: gross,
      platformFee: fee,
      subsidyMoa: subsidy,
      netPayout: gross - fee + subsidy,
      settlementDate: new Date().toISOString().split('T')[0],
      status: 'pending_audit',
      paymentReference: '',
      notes: '產銷履歷與冷鏈保鮮撥款對帳單'
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
        bankAccount: DEFAULT_BANK_ACCOUNTS[found.id] || `${found.farmName} 專用帳戶`
      }));
    }
  };

  const handleFinancialMathChange = (gross: number, fee: number, sub: number) => {
    const g = Math.max(0, gross);
    const f = Math.max(0, fee);
    const s = Math.max(0, sub);
    setFormData(prev => ({
      ...prev,
      grossAmount: g,
      platformFee: f,
      subsidyMoa: s,
      netPayout: g - f + s
    }));
  };

  const generatePaymentReference = () => {
    const ref = `TXN-BOT-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;
    setFormData(prev => ({ ...prev, paymentReference: ref, status: 'settled' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.grossAmount || formData.grossAmount <= 0) {
      setErrorMsg('請填寫有效的應付採購金額');
      return;
    }
    if (!formData.bankAccount?.trim()) {
      setErrorMsg('請填寫匯款指定銀行帳戶');
      return;
    }

    const g = Number(formData.grossAmount) || 0;
    const f = Number(formData.platformFee) || 0;
    const s = Number(formData.subsidyMoa) || 0;
    const net = g - f + s;

    const finalSettlement: FinancialSettlement = {
      id: initialSettlement?.id || `set_${Date.now()}`,
      settlementNo: formData.settlementNo || `SET-${Date.now()}`,
      farmerId: formData.farmerId || MOCK_FARMERS[0].id,
      farmerName: formData.farmerName || MOCK_FARMERS[0].name,
      farmName: formData.farmName || MOCK_FARMERS[0].farmName,
      bankAccount: formData.bankAccount || '',
      period: formData.period || '2026年8月',
      grossAmount: g,
      platformFee: f,
      subsidyMoa: s,
      netPayout: net,
      settlementDate: formData.settlementDate || new Date().toISOString().split('T')[0],
      status: (formData.status as any) || 'pending_audit',
      paymentReference: formData.paymentReference || undefined,
      notes: formData.notes || ''
    };

    onSave(finalSettlement);
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
              {isEditing ? `編輯財務結算撥款：${initialSettlement?.settlementNo}` : '建立小農契作財務結算單'}
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

          {/* Supplier */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                受款小農 / 產銷班 <span className="text-rose-500">*</span>
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
                結算單據號碼
              </label>
              <input
                type="text"
                value={formData.settlementNo || ''}
                onChange={e => setFormData(prev => ({ ...prev, settlementNo: e.target.value }))}
                className="w-full text-xs font-mono font-bold px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                對帳結算結算期別
              </label>
              <input
                type="text"
                value={formData.period || ''}
                onChange={e => setFormData(prev => ({ ...prev, period: e.target.value }))}
                placeholder="例：2026年8月 上半期"
                className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                預計撥款入帳日期
              </label>
              <input
                type="date"
                value={formData.settlementDate || ''}
                onChange={e => setFormData(prev => ({ ...prev, settlementDate: e.target.value }))}
                className="w-full text-xs font-mono px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              指定匯款銀行 / 農會信用部帳戶 <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.bankAccount || ''}
              onChange={e => setFormData(prev => ({ ...prev, bankAccount: e.target.value }))}
              placeholder="銀行代碼與帳號"
              className="w-full text-xs font-mono px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
              required
            />
          </div>

          {/* Money calculation breakdown */}
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2.5">
            <h4 className="text-xs font-bold text-slate-800">結算金額試算明細 (自動計算實撥金額)</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                  應付採購原額 (+) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.grossAmount || ''}
                  onChange={e => handleFinancialMathChange(Number(e.target.value), formData.platformFee || 0, formData.subsidyMoa || 0)}
                  className="w-full text-xs font-mono font-bold px-2.5 py-1.5 bg-white border border-slate-200 rounded-md text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                  平台與冷鏈費 (-)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.platformFee !== undefined ? formData.platformFee : 0}
                  onChange={e => handleFinancialMathChange(formData.grossAmount || 0, Number(e.target.value), formData.subsidyMoa || 0)}
                  className="w-full text-xs font-mono font-bold px-2.5 py-1.5 bg-white border border-slate-200 rounded-md text-rose-700"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                  農業部履歷補貼 (+)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.subsidyMoa !== undefined ? formData.subsidyMoa : 0}
                  onChange={e => handleFinancialMathChange(formData.grossAmount || 0, formData.platformFee || 0, Number(e.target.value))}
                  className="w-full text-xs font-mono font-bold px-2.5 py-1.5 bg-white border border-slate-200 rounded-md text-emerald-800"
                />
              </div>
            </div>

            {/* Net Payout Banner */}
            <div className="p-3 bg-emerald-950 text-white rounded-lg flex items-center justify-between">
              <div>
                <div className="text-[10px] text-emerald-300 font-medium">實付結算款 (Net Payout)</div>
                <div className="text-xs text-emerald-100 font-light">採購原款 - 服務費 + 農業部冷鏈補貼</div>
              </div>
              <div className="text-xl font-black font-mono text-emerald-400">
                NT$ {formData.netPayout || 0}
              </div>
            </div>
          </div>

          {/* Payout Status & Bank Reference */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                審核與撥款狀態
              </label>
              <select
                value={formData.status || 'pending_audit'}
                onChange={e => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                className="w-full text-xs font-bold px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
              >
                <option value="pending_audit">待核對帳 (Pending Audit)</option>
                <option value="processing">審核撥款中 (Processing)</option>
                <option value="settled">已撥款入帳 (Settled)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                <span>銀行電匯序號</span>
                <button
                  type="button"
                  onClick={generatePaymentReference}
                  className="text-[10px] text-emerald-700 font-bold hover:underline cursor-pointer"
                >
                  一鍵生成並標記已撥款
                </button>
              </label>
              <input
                type="text"
                value={formData.paymentReference || ''}
                onChange={e => setFormData(prev => ({ ...prev, paymentReference: e.target.value }))}
                placeholder="例：TXN-BOT-20260818-9941"
                className="w-full text-xs font-mono px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              財務備註說明
            </label>
            <textarea
              rows={2}
              value={formData.notes || ''}
              onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="例：款項已於農會交換中心清算完成..."
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
              <span>{isEditing ? '儲存結算單據' : '確定建立結算單'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
