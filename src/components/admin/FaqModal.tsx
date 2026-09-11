import React, { useState, useEffect } from 'react';
import { X, HelpCircle, Check, Tag } from 'lucide-react';
import { FaqItem } from '../../types';

interface FaqModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (faq: FaqItem) => void;
  initialFaq?: FaqItem | null;
}

export const FaqModal: React.FC<FaqModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialFaq
}) => {
  const [formData, setFormData] = useState<FaqItem>({
    id: '',
    q: '',
    a: '',
    category: '常見問答'
  });

  useEffect(() => {
    if (initialFaq) {
      setFormData(initialFaq);
    } else {
      setFormData({
        id: `faq_${Date.now()}`,
        q: '',
        a: '',
        category: '常見問答'
      });
    }
  }, [initialFaq, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.q.trim() || !formData.a.trim()) {
      alert('請填寫問答題目與詳細解答內容');
      return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/30">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base">
                {initialFaq ? '編輯常見問題 (FAQ)' : '新增常見問題 (FAQ)'}
              </h3>
              <p className="text-[11px] text-slate-400">維護前台聯絡我們之常見問答庫</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-md">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              分類標籤
            </label>
            <input
              type="text"
              value={formData.category || ''}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
              placeholder="例如：物流配送、安心認證、小農契作"
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              常見問題題目 (Question) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.q}
              onChange={e => setFormData({ ...formData, q: e.target.value })}
              placeholder="例如：雙溫層冷鏈配送如何運作？"
              className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              解答內容 (Answer) <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={4}
              required
              value={formData.a}
              onChange={e => setFormData({ ...formData, a: e.target.value })}
              placeholder="詳細回答此問題的解答內容..."
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Footer */}
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
              <span>{initialFaq ? '儲存問答' : '確認新增'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
