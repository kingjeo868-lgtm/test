import React, { useState, useEffect } from 'react';
import { X, BookOpen, Plus, Trash2, User, Sparkles, Check, Image, Tag, Quote, Info } from 'lucide-react';
import { ArticleItem } from '../../types';

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (article: ArticleItem) => void;
  initialArticle?: ArticleItem | null;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialArticle
}) => {
  const [formData, setFormData] = useState<ArticleItem>({
    id: '',
    title: '',
    subtitle: '',
    category: 'story',
    categoryLabel: '產地人物誌',
    publishDate: new Date().toISOString().slice(0, 10),
    authorName: '',
    authorTitle: '',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1000&auto=format&fit=crop&q=80',
    readTimeMin: 5,
    summary: '',
    sections: [
      {
        heading: '一、章節大標題',
        body: '填寫此章節的深入採訪或專訪文字內容...',
        quote: '',
        highlightBox: ''
      }
    ],
    tags: ['產地深度採訪', '有機農業']
  });

  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (initialArticle) {
      setFormData(initialArticle);
    } else {
      setFormData({
        id: `art_${Date.now()}`,
        title: '',
        subtitle: '',
        category: 'story',
        categoryLabel: '產地人物誌',
        publishDate: new Date().toISOString().slice(0, 10),
        authorName: '林語晨',
        authorTitle: '食農特約作家 / 資深農經專欄作者',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        coverImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1000&auto=format&fit=crop&q=80',
        readTimeMin: 6,
        summary: '',
        sections: [
          {
            heading: '一、土地的初心與呼喚',
            body: '在此輸入第一段深度專題訪談內文...',
            quote: '「只要好好對待土地，土地就會給予最甘美的回應。」',
            highlightBox: '關鍵數據：導入滴灌與天敵防治後，用水量節省 35%，土壤有機質顯著提升。'
          }
        ],
        tags: ['產地人物誌', '友善農法']
      });
    }
  }, [initialArticle, isOpen]);

  if (!isOpen) return null;

  const categoryOptions: { key: ArticleItem['category']; label: string }[] = [
    { key: 'story', label: '產地人物誌' },
    { key: 'tech', label: '栽培技術與風土' },
    { key: 'market_analysis', label: '產銷大數據' },
    { key: 'sustainability', label: '綠色永續與ESG' },
    { key: 'policy', label: '政策與食農教育' }
  ];

  const handleCategoryChange = (cat: ArticleItem['category']) => {
    const selected = categoryOptions.find(c => c.key === cat);
    setFormData(prev => ({
      ...prev,
      category: cat,
      categoryLabel: selected ? selected.label : '專題報導'
    }));
  };

  const handleAddSection = () => {
    const sectionNumber = ['一', '二', '三', '四', '五', '六', '七', '八'][formData.sections.length] || `${formData.sections.length + 1}`;
    setFormData(prev => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          heading: `${sectionNumber}、新段落章節標題`,
          body: '',
          quote: '',
          highlightBox: ''
        }
      ]
    }));
  };

  const handleUpdateSection = (index: number, field: keyof ArticleItem['sections'][0], val: string) => {
    setFormData(prev => {
      const updated = [...prev.sections];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, sections: updated };
    });
  };

  const handleRemoveSection = (index: number) => {
    if (formData.sections.length <= 1) {
      alert('專欄文章至少需保留一個章節段落');
      return;
    }
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index)
    }));
  };

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    if (!formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
    }
    setTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tagToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.authorName || !formData.summary) {
      alert('請填寫文章主標題、作者姓名與文章前言摘要');
      return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/30">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base">
                {initialArticle ? '編輯專欄報導 / 深度專訪' : '發布全新深度專欄報導'}
              </h3>
              <p className="text-[11px] text-slate-400">撰寫產地職人專訪、農業大數據專題與栽培技術深入報導</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          
          {/* Main Title & Subtitle */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                文章主標題 <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                placeholder="例如：濁水溪畔的綠色奇蹟：西螺有機蔬菜聚落的十年轉型之路"
                className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                副標題 / 專訪引言 (Subtitle)
              </label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="例如：專訪西螺綠金有機農場 陳健興班長，談友善農法如何喚醒沉睡的土壤活力"
                className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 text-slate-600"
              />
            </div>
          </div>

          {/* Category, Date, ReadTime */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                專欄類別 <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={e => handleCategoryChange(e.target.value as ArticleItem['category'])}
                className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                {categoryOptions.map(cat => (
                  <option key={cat.key} value={cat.key}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                發布日期
              </label>
              <input
                type="date"
                value={formData.publishDate}
                onChange={e => setFormData({ ...formData, publishDate: e.target.value })}
                className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                預估閱讀時間 (分鐘)
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={formData.readTimeMin}
                onChange={e => setFormData({ ...formData, readTimeMin: parseInt(e.target.value) || 1 })}
                className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 font-mono"
              />
            </div>
          </div>

          {/* Author Details */}
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-2.5">
            <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-emerald-600" />
              <span>專欄作者與認證資訊</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="block text-[11px] text-slate-600 mb-0.5">
                  作者姓名 <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.authorName}
                  onChange={e => setFormData({ ...formData, authorName: e.target.value })}
                  placeholder="例如：林語晨"
                  className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-600 mb-0.5">
                  作者職稱 / 專業背景
                </label>
                <input
                  type="text"
                  value={formData.authorTitle}
                  onChange={e => setFormData({ ...formData, authorTitle: e.target.value })}
                  placeholder="例如：農業部食農特約作家"
                  className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-600 mb-0.5">
                  作者頭像 URL
                </label>
                <input
                  type="url"
                  value={formData.authorAvatar}
                  onChange={e => setFormData({ ...formData, authorAvatar: e.target.value })}
                  placeholder="https://..."
                  className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Cover Image & Summary */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              文章首圖 / 封面照片 URL
            </label>
            <input
              type="url"
              value={formData.coverImage}
              onChange={e => setFormData({ ...formData, coverImage: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              專題摘要 (Summary Lead) <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={2}
              required
              value={formData.summary}
              onChange={e => setFormData({ ...formData, summary: e.target.value })}
              placeholder="簡要描述文章核心探討主題與結論，呈現於文章頭部導讀區..."
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Dynamic Article Sections */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                <span>專欄章節段落編輯 ({formData.sections.length} 個章節)</span>
              </div>
              <button
                type="button"
                onClick={handleAddSection}
                className="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-md text-xs font-bold border border-emerald-200 flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>新增章節段落</span>
              </button>
            </div>

            <div className="space-y-3">
              {formData.sections.map((sec, idx) => (
                <div key={idx} className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-2.5 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">
                      第 {idx + 1} 章節
                    </span>
                    {formData.sections.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSection(idx)}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors"
                        title="刪除此章節"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      章節小標題
                    </label>
                    <input
                      type="text"
                      value={sec.heading}
                      onChange={e => handleUpdateSection(idx, 'heading', e.target.value)}
                      placeholder="例如：一、濁水溪黑泥的恩賜與省思"
                      className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-md font-bold text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      段落內文
                    </label>
                    <textarea
                      rows={3}
                      value={sec.body}
                      onChange={e => handleUpdateSection(idx, 'body', e.target.value)}
                      placeholder="填寫本章節報導內文..."
                      className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-md"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-0.5 flex items-center gap-1">
                        <Quote className="w-3 h-3 text-amber-500" />
                        <span>金句引述卡片 (Quote，選填)</span>
                      </label>
                      <input
                        type="text"
                        value={sec.quote || ''}
                        onChange={e => handleUpdateSection(idx, 'quote', e.target.value)}
                        placeholder="例如：「土地不會騙人，你怎麼對它...」"
                        className="w-full text-[11px] px-2 py-1 bg-white border border-slate-200 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-500 mb-0.5 flex items-center gap-1">
                        <Info className="w-3 h-3 text-teal-500" />
                        <span>數據焦點框 (Highlight Box，選填)</span>
                      </label>
                      <input
                        type="text"
                        value={sec.highlightBox || ''}
                        onChange={e => handleUpdateSection(idx, 'highlightBox', e.target.value)}
                        placeholder="例如：關鍵數據：節水38%，土壤有機質提升至4.5%"
                        className="w-full text-[11px] px-2 py-1 bg-white border border-slate-200 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              文章標籤 (Tags)
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                placeholder="輸入標籤（例如：西螺蔬菜）"
                className="flex-1 text-xs px-3 py-1.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-3 py-1.5 bg-slate-800 text-white rounded-lg text-xs font-bold hover:bg-slate-700"
              >
                新增
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {formData.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-[11px] px-2 py-0.5 rounded-md border border-emerald-200"
                >
                  <span>#{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-slate-400 hover:text-rose-600"
                  >
                    ×
                  </button>
                </span>
              ))}
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
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>{initialArticle ? '儲存專欄更新' : '確認發布專欄'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
