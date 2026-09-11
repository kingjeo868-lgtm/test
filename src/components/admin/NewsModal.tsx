import React, { useState, useEffect } from 'react';
import { X, Sparkles, Image, Tag, Calendar, User, Clock, Check, FileText } from 'lucide-react';
import { NewsItem } from '../../types';

interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (news: NewsItem) => void;
  initialNews?: NewsItem | null;
}

export const NewsModal: React.FC<NewsModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialNews
}) => {
  const [formData, setFormData] = useState<NewsItem>({
    id: '',
    title: '',
    category: 'announcement',
    categoryLabel: '產地特報',
    publishDate: new Date().toISOString().slice(0, 10),
    summary: '',
    content: '',
    author: '好農方舟 產銷營運組',
    isPinned: false,
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80',
    tags: ['產地特選', 'TAP產銷履歷'],
    readTimeMin: 3
  });

  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (initialNews) {
      setFormData(initialNews);
    } else {
      setFormData({
        id: `news_${Date.now()}`,
        title: '',
        category: 'announcement',
        categoryLabel: '產地特報',
        publishDate: new Date().toISOString().slice(0, 10),
        summary: '',
        content: '',
        author: '好農方舟 產銷營運組',
        isPinned: false,
        image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80',
        tags: ['產地特選', 'TAP產銷履歷'],
        readTimeMin: 3
      });
    }
  }, [initialNews, isOpen]);

  if (!isOpen) return null;

  const categoryOptions: { key: NewsItem['category']; label: string }[] = [
    { key: 'event', label: '產地特報' },
    { key: 'subsidy', label: '政策與設施' },
    { key: 'market', label: '行情產況' },
    { key: 'announcement', label: '契作招募' },
    { key: 'production', label: '生產技術' }
  ];

  const handleCategoryChange = (cat: NewsItem['category']) => {
    const selected = categoryOptions.find(c => c.key === cat);
    setFormData(prev => ({
      ...prev,
      category: cat,
      categoryLabel: selected ? selected.label : '消息公告'
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
    if (!formData.title || !formData.summary) {
      alert('請填寫新聞標題與簡短摘要');
      return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/30">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base">
                {initialNews ? '編輯最新消息 / 公告' : '發布最新消息 / 產地特報'}
              </h3>
              <p className="text-[11px] text-slate-400">發布即時產地特訊、政策公告與節令預購情報</p>
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
          
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              消息標題 <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              placeholder="例如：【中秋首選】2026年麻豆50年老欉文旦評鑑特等獎！"
              className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          {/* Category & Date & Read Time */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                分類別 <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={e => handleCategoryChange(e.target.value as NewsItem['category'])}
                className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                {categoryOptions.map(cat => (
                  <option key={cat.key} value={cat.key}>
                    {cat.label} ({cat.key})
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
              >
              </input>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                預估閱讀時間 (分鐘)
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={formData.readTimeMin}
                onChange={e => setFormData({ ...formData, readTimeMin: parseInt(e.target.value) || 1 })}
                className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 font-mono"
              />
            </div>
          </div>

          {/* Author & IsPinned */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                發布單位 / 作者
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={e => setFormData({ ...formData, author: e.target.value })}
                placeholder="例如：好農方舟 產銷營運組"
                className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer pt-4">
                <input
                  type="checkbox"
                  checked={formData.isPinned}
                  onChange={e => setFormData({ ...formData, isPinned: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                />
                <span className="text-xs font-bold text-slate-800">
                  設為首頁與列表頂端「置頂推薦」
                </span>
              </label>
            </div>
          </div>

          {/* Cover Image URL */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              封面照片 URL
            </label>
            <input
              type="url"
              value={formData.image || ''}
              onChange={e => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 font-mono"
            />
          </div>

          {/* Summary */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              消息摘要 (Card Summary) <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={2}
              required
              value={formData.summary}
              onChange={e => setFormData({ ...formData, summary: e.target.value })}
              placeholder="簡述此則消息的核心要點（顯示於最新消息卡片）"
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              完整內文與說明細節 (Full Article Content)
            </label>
            <textarea
              rows={5}
              value={formData.content}
              onChange={e => setFormData({ ...formData, content: e.target.value })}
              placeholder="填寫完整發布內容，支援分段與活動規範說明..."
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              關鍵字標籤 (Tags)
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
                placeholder="輸入標籤後按新增（例如：中秋禮盒）"
                className="flex-1 text-xs px-3 py-1.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-3 py-1.5 bg-slate-800 text-white rounded-lg text-xs font-bold hover:bg-slate-700"
              >
                新增標籤
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

          {/* Footer Buttons */}
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
              <span>{initialNews ? '儲存更新' : '確認發布公告'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
