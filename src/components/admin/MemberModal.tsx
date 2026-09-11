import React, { useState } from 'react';
import { X, Check, AlertCircle, User, Award, Tag } from 'lucide-react';
import { Member, MemberTier } from '../../types';

interface MemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (member: Member) => void;
  initialMember?: Member | null;
}

const PRESET_TAGS = [
  '有機熱愛者',
  '契作認養人',
  '企業大宗採購',
  '水產肉品控',
  '節令送禮VIP',
  '高回購率',
  '蔬食主義'
];

export const MemberModal: React.FC<MemberModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialMember
}) => {
  const isEditing = Boolean(initialMember);

  const [formData, setFormData] = useState<Partial<Member>>(() => {
    if (initialMember) {
      return { ...initialMember };
    }
    return {
      memberNo: `MEM-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      name: '',
      phone: '',
      email: '',
      tier: 'general',
      registeredDate: new Date().toISOString().split('T')[0],
      points: 50,
      totalSpent: 0,
      orderCount: 0,
      status: 'active',
      address: '',
      tags: ['新加入會員'],
      notes: ''
    };
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [customTagInput, setCustomTagInput] = useState('');

  if (!isOpen) return null;

  const toggleTag = (tag: string) => {
    const cur = formData.tags || [];
    if (cur.includes(tag)) {
      setFormData(prev => ({ ...prev, tags: cur.filter(t => t !== tag) }));
    } else {
      setFormData(prev => ({ ...prev, tags: [...cur, tag] }));
    }
  };

  const handleAddCustomTag = () => {
    if (!customTagInput.trim()) return;
    const cur = formData.tags || [];
    if (!cur.includes(customTagInput.trim())) {
      setFormData(prev => ({ ...prev, tags: [...cur, customTagInput.trim()] }));
    }
    setCustomTagInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) {
      setErrorMsg('請填寫會員姓名');
      return;
    }
    if (!formData.phone?.trim()) {
      setErrorMsg('請填寫會員電話');
      return;
    }

    const finalMember: Member = {
      id: initialMember?.id || `mem_${Date.now()}`,
      memberNo: formData.memberNo || `MEM-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      name: formData.name || '',
      phone: formData.phone || '',
      email: formData.email || '',
      tier: (formData.tier as MemberTier) || 'general',
      registeredDate: formData.registeredDate || new Date().toISOString().split('T')[0],
      points: Number(formData.points) || 0,
      totalSpent: Number(formData.totalSpent) || 0,
      orderCount: Number(formData.orderCount) || 0,
      status: (formData.status as any) || 'active',
      address: formData.address || '',
      tags: formData.tags || [],
      notes: formData.notes || ''
    };

    onSave(finalMember);
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
              {isEditing ? `編輯會員：${initialMember?.name} (${initialMember?.memberNo})` : '新增商城會員'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Basic Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                會員姓名 <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={e => {
                  setErrorMsg('');
                  setFormData(prev => ({ ...prev, name: e.target.value }));
                }}
                placeholder="例：王怡婷"
                className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-emerald-600 font-semibold"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                會員卡號編號
              </label>
              <input
                type="text"
                value={formData.memberNo || ''}
                onChange={e => setFormData(prev => ({ ...prev, memberNo: e.target.value }))}
                className="w-full text-xs font-mono font-bold px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                聯絡手機 <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone || ''}
                onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="0912-345-678"
                className="w-full text-xs font-mono px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-emerald-600"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                電子信箱
              </label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="user@example.com"
                className="w-full text-xs font-mono px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-emerald-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              常用配送 / 通訊地址
            </label>
            <input
              type="text"
              value={formData.address || ''}
              onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
              placeholder="例：台北市大安區信義路四段100號6樓"
              className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
            />
          </div>

          {/* Membership Tier & Status */}
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-emerald-700" />
              <span>會員等級與點數帳戶</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                  會員等級組別
                </label>
                <select
                  value={formData.tier || 'general'}
                  onChange={e => setFormData(prev => ({ ...prev, tier: e.target.value as MemberTier }))}
                  className="w-full text-xs font-bold px-2.5 py-1.5 bg-white border border-slate-200 rounded-md"
                >
                  <option value="general">一般會員 (98折)</option>
                  <option value="silver">銀卡會員 (95折)</option>
                  <option value="gold">金卡優選 (9折)</option>
                  <option value="vip_farm">契作尊榮VIP (85折/免運)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                  綠色回饋點數 (Points)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.points !== undefined ? formData.points : 50}
                  onChange={e => setFormData(prev => ({ ...prev, points: Number(e.target.value) }))}
                  className="w-full text-xs font-mono font-bold px-2.5 py-1.5 bg-white border border-slate-200 rounded-md text-emerald-950"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                  帳號啟用狀態
                </label>
                <select
                  value={formData.status || 'active'}
                  onChange={e => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                  className="w-full text-xs font-semibold px-2.5 py-1.5 bg-white border border-slate-200 rounded-md"
                >
                  <option value="active">正常啟用 (Active)</option>
                  <option value="pending">審核中 (Pending)</option>
                  <option value="suspended">停權凍結 (Suspended)</option>
                </select>
              </div>
            </div>

            {isEditing && (
              <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-slate-200 text-xs">
                <div className="p-2 bg-white rounded border border-slate-200">
                  <div className="text-slate-400 text-[10px]">歷史累積消費</div>
                  <div className="font-mono font-bold text-slate-800">NT$ {formData.totalSpent || 0}</div>
                </div>
                <div className="p-2 bg-white rounded border border-slate-200">
                  <div className="text-slate-400 text-[10px]">成功完成訂單數</div>
                  <div className="font-mono font-bold text-slate-800">{formData.orderCount || 0} 筆</div>
                </div>
              </div>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <Tag className="w-3 h-3 text-slate-500" />
              <span>會員特徵標籤</span>
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {PRESET_TAGS.map(tag => {
                const isSelected = formData.tags?.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium border transition-colors cursor-pointer ${
                      isSelected 
                        ? 'bg-slate-900 text-white border-slate-900 shadow-2xs' 
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {isSelected && <Check className="w-2.5 h-2.5 inline mr-1" />}
                    {tag}
                  </button>
                );
              })}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={customTagInput}
                onChange={e => setCustomTagInput(e.target.value)}
                placeholder="自訂標籤..."
                className="flex-1 text-xs px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md"
              />
              <button
                type="button"
                onClick={handleAddCustomTag}
                className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-md text-xs font-bold cursor-pointer"
              >
                加入
              </button>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              管理員內部備註
            </label>
            <textarea
              rows={2}
              value={formData.notes || ''}
              onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="例：客戶偏好特定產地、企業端採購窗口..."
              className="w-full text-xs px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
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
              <span>{isEditing ? '儲存會員資料' : '確定新增會員'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
