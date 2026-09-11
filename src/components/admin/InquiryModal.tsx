import React, { useState, useEffect } from 'react';
import { X, MessageSquare, Phone, Mail, Clock, User, CheckCircle2, AlertCircle, Send, Check, Copy, Tag } from 'lucide-react';
import { ContactInquiry } from '../../types';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (inquiry: ContactInquiry) => void;
  inquiry: ContactInquiry | null;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  onSave,
  inquiry
}) => {
  const [formData, setFormData] = useState<ContactInquiry | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    if (inquiry) {
      setFormData({ ...inquiry });
    }
  }, [inquiry, isOpen]);

  if (!isOpen || !formData) return null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onSave(formData);
      onClose();
    }
  };

  const categoryMap: Record<string, { label: string; bg: string; text: string }> = {
    order: { label: '訂單物流問題', bg: 'bg-amber-50', text: 'text-amber-800' },
    contract: { label: '小農契作認養', bg: 'bg-emerald-50', text: 'text-emerald-800' },
    farmer_join: { label: '小農供貨加盟', bg: 'bg-blue-50', text: 'text-blue-800' },
    b2b_wholesale: { label: 'B2B 企業採購', bg: 'bg-purple-50', text: 'text-purple-800' },
    press: { label: '媒體採訪合作', bg: 'bg-teal-50', text: 'text-teal-800' },
    other: { label: '其他綜合諮詢', bg: 'bg-slate-100', text: 'text-slate-700' }
  };

  const catStyle = categoryMap[formData.category] || categoryMap.other;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/30">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base">客服與諮詢工單處理</h3>
                <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                  {formData.inquiryNo || formData.id}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">建立時間：{formData.createdAt}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          
          {/* User & Category Info Card */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
                  {formData.name.slice(0, 1)}
                </div>
                <div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-2">
                    <span>{formData.name}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-200/60 ${catStyle.bg} ${catStyle.text}`}>
                      {formData.categoryLabel || catStyle.label}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-3 mt-0.5">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" /> {formData.createdAt}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1.5 ${
                  formData.status === 'resolved'
                    ? 'bg-emerald-100 text-emerald-800'
                    : formData.status === 'processing'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-rose-100 text-rose-800'
                }`}>
                  {formData.status === 'resolved' ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : formData.status === 'processing' ? (
                    <Clock className="w-3.5 h-3.5" />
                  ) : (
                    <AlertCircle className="w-3.5 h-3.5" />
                  )}
                  <span>
                    {formData.status === 'resolved' ? '已結案' : formData.status === 'processing' ? '處理中' : '待處理'}
                  </span>
                </span>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 min-w-0">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-mono text-slate-800 truncate">{formData.phone}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(formData.phone, 'phone')}
                  className="text-[10px] text-emerald-700 hover:text-emerald-800 font-bold px-2 py-0.5 bg-emerald-50 rounded cursor-pointer"
                >
                  {copiedField === 'phone' ? '已複製' : '複製電話'}
                </button>
              </div>

              <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 min-w-0">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-mono text-slate-800 truncate">{formData.email || '未填寫'}</span>
                </div>
                {formData.email && (
                  <button
                    type="button"
                    onClick={() => handleCopy(formData.email, 'email')}
                    className="text-[10px] text-emerald-700 hover:text-emerald-800 font-bold px-2 py-0.5 bg-emerald-50 rounded cursor-pointer"
                  >
                    {copiedField === 'email' ? '已複製' : '複製信箱'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Subject & Message Details */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-700">諮詢主旨</div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm font-bold text-slate-900">
              {formData.subject || '（未填寫主旨）'}
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-700">詳細提問與留言內容</div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
              {formData.message}
            </div>
          </div>

          {/* Action / Admin Handler fields */}
          <div className="border-t border-slate-200 pt-3 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  工單處理狀態
                </label>
                <select
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value as ContactInquiry['status'] })}
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white font-bold"
                >
                  <option value="pending">待處理 (Pending)</option>
                  <option value="processing">處理中 (Processing)</option>
                  <option value="resolved">已完成結案 (Resolved)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  指派處理專員 / 組別
                </label>
                <input
                  type="text"
                  value={formData.assignedStaff || ''}
                  onChange={e => setFormData({ ...formData, assignedStaff: e.target.value })}
                  placeholder="例如：產銷大宗業務組 - 王專員"
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                內部處理紀錄與客服回覆備註 (Admin Action Notes)
              </label>
              <textarea
                rows={3}
                value={formData.replyNote || ''}
                onChange={e => setFormData({ ...formData, replyNote: e.target.value })}
                placeholder="記錄與客戶的電話聯絡時間、報價進度或處理結果..."
                className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Footer Actions */}
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
              <span>儲存處理結果</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
