import React, { useState, useEffect } from 'react';
import { X, Calendar, Check } from 'lucide-react';
import { BrandMilestone } from '../../types';

interface MilestoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (milestone: BrandMilestone) => void;
  initialMilestone?: BrandMilestone | null;
}

export const MilestoneModal: React.FC<MilestoneModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialMilestone
}) => {
  const [formData, setFormData] = useState<BrandMilestone>({
    id: '',
    year: '2026',
    title: '',
    desc: ''
  });

  useEffect(() => {
    if (initialMilestone) {
      setFormData(initialMilestone);
    } else {
      setFormData({
        id: `ms_${Date.now()}`,
        year: '2026',
        title: '',
        desc: ''
      });
    }
  }, [initialMilestone, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.year.trim() || !formData.title.trim() || !formData.desc.trim()) {
      alert('請填寫年份、里程碑主題與詳細內容');
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
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base">
                {initialMilestone ? '編輯發展里程碑' : '新增發展里程碑'}
              </h3>
              <p className="text-[11px] text-slate-400">記錄品牌創立與重要推動階段</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-md">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              年份 / 階段 (Year) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.year}
              onChange={e => setFormData({ ...formData, year: e.target.value })}
              placeholder="例如：2026、2024"
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 font-mono font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              里程碑主題 (Title) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              placeholder="例如：全面對接農業部大數據行情與產銷預警"
              className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              推動成果與歷程敘述 (Description) <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              required
              value={formData.desc}
              onChange={e => setFormData({ ...formData, desc: e.target.value })}
              placeholder="敘述該年度推動的重大里程碑與成果..."
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
              <span>{initialMilestone ? '儲存里程碑' : '確認新增'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
