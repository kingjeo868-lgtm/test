import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Check } from 'lucide-react';
import { BrandPillar } from '../../types';

interface PillarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (pillar: BrandPillar) => void;
  initialPillar?: BrandPillar | null;
}

export const PillarModal: React.FC<PillarModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialPillar
}) => {
  const [formData, setFormData] = useState<BrandPillar>({
    id: '',
    title: '',
    desc: '',
    iconName: 'ShieldCheck'
  });

  useEffect(() => {
    if (initialPillar) {
      setFormData(initialPillar);
    } else {
      setFormData({
        id: `pil_${Date.now()}`,
        title: '',
        desc: '',
        iconName: 'ShieldCheck'
      });
    }
  }, [initialPillar, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.desc.trim()) {
      alert('請填寫安心基石標題與說明');
      return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/30">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base">
                {initialPillar ? '編輯核心基石' : '新增核心基石'}
              </h3>
              <p className="text-[11px] text-slate-400">品牌承諾與四大安心核心支柱</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-md">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              基石承諾標題 (Title) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              placeholder="例如：100% 產銷履歷與有機驗證"
              className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              圖標樣式
            </label>
            <select
              value={formData.iconName}
              onChange={e => setFormData({ ...formData, iconName: e.target.value })}
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              <option value="ShieldCheck">盾牌驗證 (ShieldCheck)</option>
              <option value="Truck">冷鏈車輛 (Truck)</option>
              <option value="BarChart2">行情大數據 (BarChart2)</option>
              <option value="HeartHandshake">公平契作 (HeartHandshake)</option>
              <option value="Sprout">綠意農苗 (Sprout)</option>
              <option value="Award">專業評鑑 (Award)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              承諾說明與標準 (Description) <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              required
              value={formData.desc}
              onChange={e => setFormData({ ...formData, desc: e.target.value })}
              placeholder="詳細說明此基石的具體執行規範與檢驗標準..."
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>{initialPillar ? '儲存基石' : '確認新增'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
