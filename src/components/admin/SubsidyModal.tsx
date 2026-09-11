import React, { useState, useEffect } from 'react';
import { X, Landmark, Calendar, DollarSign, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';
import { SubsidyItem } from '../../types';

interface SubsidyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (subsidy: SubsidyItem) => void;
  subsidy: SubsidyItem | null;
}

export const SubsidyModal: React.FC<SubsidyModalProps> = ({
  isOpen,
  onClose,
  onSave,
  subsidy
}) => {
  const [formData, setFormData] = useState<Partial<SubsidyItem>>({
    title: '',
    issuer: '農業部農糧署',
    category: 'coldchain',
    categoryLabel: '冷鏈物流與預冷設施補助',
    subsidyRate: '最高補助 50%',
    maxAmount: '最高 500 萬元 / 案',
    applyDeadline: '2026-11-30',
    status: 'active',
    targetAudience: ['依法登記立案之農業生產合作社', '取得產銷履歷驗證之農民團體'],
    keyRequirements: ['須具備自有或合法租用之集貨包裝用地', '同意配合農糧署產銷冷鏈即時聯網資訊系統'],
    docTemplates: [
      { name: '冷鏈設備補助申請書 (含營運企劃書範本).docx', size: '2.4 MB' },
      { name: '設備規格估價單與切結書.pdf', size: '850 KB' }
    ],
    description: ''
  });

  const [audienceInput, setAudienceInput] = useState('');
  const [reqsInput, setReqsInput] = useState('');

  const categoryLabelMap: Record<SubsidyItem['category'], string> = {
    coldchain: '冷鏈物流與預冷設施補助',
    facility: '強固型溫室與抗颱設施補助',
    certification: '產銷履歷與有機驗證費全額補助',
    machinery: '智慧省工農機與自動化設備補助',
    disaster: '天然災害復耕與專案低利貸款'
  };

  useEffect(() => {
    if (subsidy) {
      setFormData(subsidy);
      setAudienceInput(subsidy.targetAudience.join('\n'));
      setReqsInput(subsidy.keyRequirements.join('\n'));
    } else {
      setFormData({
        id: `sub_${Date.now()}`,
        title: '',
        issuer: '農業部農糧署',
        category: 'coldchain',
        categoryLabel: '冷鏈物流與預冷設施補助',
        subsidyRate: '最高補助 50%',
        maxAmount: '最高 500 萬元 / 案',
        applyDeadline: '2026-11-30',
        status: 'active',
        targetAudience: ['依法登記立案之農業合作社', '取得TAP產銷履歷驗證之產銷班'],
        keyRequirements: ['具備合法農地或集貨場使用執照', '配合農產品冷鏈溫控聯網登錄'],
        docTemplates: [
          { name: '補助申請書與營運計畫書範本.docx', size: '2.1 MB' },
          { name: '檢附文件檢核清單與切結書.pdf', size: '720 KB' }
        ],
        description: ''
      });
      setAudienceInput('依法登記立案之農業合作社\n取得TAP產銷履歷驗證之產銷班');
      setReqsInput('具備合法農地或集貨場使用執照\n配合農產品冷鏈溫控聯網登錄');
    }
  }, [subsidy, isOpen]);

  if (!isOpen) return null;

  const handleCategoryChange = (cat: SubsidyItem['category']) => {
    setFormData(prev => ({
      ...prev,
      category: cat,
      categoryLabel: categoryLabelMap[cat]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim() || !formData.issuer?.trim()) {
      alert('請填寫補助專案名稱與主管發布機關！');
      return;
    }

    const cleanedAudience = audienceInput
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const cleanedReqs = reqsInput
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const result: SubsidyItem = {
      id: formData.id || `sub_${Date.now()}`,
      title: formData.title || '',
      issuer: formData.issuer || '農業部農糧署',
      category: formData.category || 'coldchain',
      categoryLabel: formData.categoryLabel || '冷鏈物流與預冷設施補助',
      subsidyRate: formData.subsidyRate || '最高補助 50%',
      maxAmount: formData.maxAmount || '最高 300 萬元',
      applyDeadline: formData.applyDeadline || '2026-12-31',
      status: formData.status || 'active',
      targetAudience: cleanedAudience.length > 0 ? cleanedAudience : ['農業合作社與產銷班員'],
      keyRequirements: cleanedReqs.length > 0 ? cleanedReqs : ['符合農業部規定之申請要點'],
      docTemplates: formData.docTemplates || [
        { name: '專案申請書與切結書範本.docx', size: '1.8 MB' }
      ],
      description: formData.description || '落實智慧農業發展，提升農村產業基礎競爭力。'
    };

    onSave(result);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 px-5 py-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-emerald-700/60 rounded-lg border border-emerald-500/30">
              <Landmark className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-serif">
                {subsidy ? '編輯農業補助與輔導專案' : '發布新農業部補助專案'}
              </h2>
              <p className="text-xs text-emerald-200/80">公告冷鏈設備、強固溫室、省工農機與檢驗費補貼政策</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 sm:p-6 space-y-4 text-xs text-slate-700">
          {/* Title */}
          <div>
            <label className="block font-bold text-slate-800 mb-1">
              專案補助政策名稱 *
            </label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              placeholder="例如: 115年度 農業部「建構冷鏈物流體系與低溫集貨設備升級補助計畫」"
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg font-bold text-slate-900 focus:outline-emerald-600"
              required
            />
          </div>

          {/* Issuer & Category & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">主管/發布機關 *</label>
              <input
                type="text"
                value={formData.issuer || ''}
                onChange={e => setFormData({ ...formData, issuer: e.target.value })}
                placeholder="例如: 農業部農糧署"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-emerald-600"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1">補助類別</label>
              <select
                value={formData.category || 'coldchain'}
                onChange={e => handleCategoryChange(e.target.value as SubsidyItem['category'])}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-emerald-600"
              >
                <option value="coldchain">冷鏈物流與預冷設施補助</option>
                <option value="facility">強固型溫室與抗颱設施補助</option>
                <option value="certification">產銷履歷與有機驗證費全額補助</option>
                <option value="machinery">智慧省工農機與自動化設備補助</option>
                <option value="disaster">天然災害復耕與專案低利貸款</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1">受理狀態</label>
              <select
                value={formData.status || 'active'}
                onChange={e => setFormData({ ...formData, status: e.target.value as SubsidyItem['status'] })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg font-bold text-slate-900 focus:outline-emerald-600"
              >
                <option value="active">即日起開放受理中</option>
                <option value="upcoming">即將開放申請 (公告中)</option>
                <option value="closed">本期受理截止</option>
              </select>
            </div>
          </div>

          {/* Rates & Deadline */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200">
            <div>
              <label className="block font-bold text-emerald-950 mb-1">最高補助比例</label>
              <input
                type="text"
                value={formData.subsidyRate || ''}
                onChange={e => setFormData({ ...formData, subsidyRate: e.target.value })}
                placeholder="例如: 最高補助 50%"
                className="w-full px-3 py-1.5 bg-white border border-emerald-300 rounded-lg font-bold text-emerald-900"
              />
            </div>
            <div>
              <label className="block font-bold text-emerald-950 mb-1">最高補助上限額度</label>
              <input
                type="text"
                value={formData.maxAmount || ''}
                onChange={e => setFormData({ ...formData, maxAmount: e.target.value })}
                placeholder="例如: 最高 500 萬元 / 案"
                className="w-full px-3 py-1.5 bg-white border border-emerald-300 rounded-lg font-bold text-emerald-900"
              />
            </div>
            <div>
              <label className="block font-bold text-emerald-950 mb-1">申請截止日期</label>
              <input
                type="date"
                value={formData.applyDeadline || ''}
                onChange={e => setFormData({ ...formData, applyDeadline: e.target.value })}
                className="w-full px-3 py-1.5 bg-white border border-emerald-300 rounded-lg font-mono text-slate-800"
              />
            </div>
          </div>

          {/* Target Audience */}
          <div>
            <label className="block font-bold text-slate-800 mb-1">
              申請對象與資格門檻 (每行一項)
            </label>
            <textarea
              rows={3}
              value={audienceInput}
              onChange={e => setAudienceInput(e.target.value)}
              placeholder="例如：&#10;依法登記立案之農業生產合作社或運銷合作社&#10;取得產銷履歷或有機驗證之農業產銷班"
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 leading-relaxed"
            />
          </div>

          {/* Key Requirements */}
          <div>
            <label className="block font-bold text-slate-800 mb-1">
              必備要件與審查規範 (每行一項)
            </label>
            <textarea
              rows={3}
              value={reqsInput}
              onChange={e => setReqsInput(e.target.value)}
              placeholder="例如：&#10;須檢附合法農地使用執照或租賃契約（5年以上）&#10;設備須符合農業部冷鏈溫控聯網登錄標準"
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 leading-relaxed"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-bold text-slate-800 mb-1">政策目的與補助內容詳細說明</label>
            <textarea
              rows={3}
              value={formData.description || ''}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              placeholder="詳細說明補助緣起、適用設備清單、審核程序與核銷要點..."
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 leading-relaxed"
            />
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
              <span>{subsidy ? '儲存補助專案' : '確認發布補助政策'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
