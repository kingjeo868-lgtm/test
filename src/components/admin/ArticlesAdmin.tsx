import React, { useState } from 'react';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Sparkles, 
  Calendar, 
  User, 
  Clock, 
  Eye, 
  CheckCircle2, 
  Filter, 
  Layers,
  Quote,
  Info,
  Tag,
  Bot,
  Terminal
} from 'lucide-react';
import { ArticleItem, ViewMode } from '../../types';
import { ArticleModal } from './ArticleModal';

interface ArticlesAdminProps {
  articlesList: ArticleItem[];
  onSaveArticle: (article: ArticleItem) => void;
  onDeleteArticle: (id: string, title: string) => void;
  showToast: (msg: string) => void;
  onNavigate?: (view: ViewMode) => void;
}

export const ArticlesAdmin: React.FC<ArticlesAdminProps> = ({
  articlesList,
  onSaveArticle,
  onDeleteArticle,
  showToast,
  onNavigate
}) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<ArticleItem | null>(null);
  const [previewArticle, setPreviewArticle] = useState<ArticleItem | null>(null);

  const filteredArticles = articlesList.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(search.toLowerCase()) ||
      art.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      art.authorName.toLowerCase().includes(search.toLowerCase()) ||
      art.summary.toLowerCase().includes(search.toLowerCase()) ||
      art.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesCat = categoryFilter === 'all' || art.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-4">
      
      {/* Top Header */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
              <BookOpen className="w-4 h-4" />
            </span>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
              專欄報導與深度專訪管理 (Articles & Editorial CMS)
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            發布產地職人專訪、農業大數據專題、土壤風土研究與食農教育專欄
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onNavigate && (
            <button
              onClick={() => onNavigate('article_mcp')}
              className="px-3.5 py-2 bg-purple-950 hover:bg-purple-900 text-purple-200 border border-purple-800/80 rounded-lg text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
              title="開啟文章 Model Context Protocol (MCP) 沙盒與 AI Agent 協定端點"
            >
              <Bot className="w-3.5 h-3.5 text-purple-400" />
              <span>文章 MCP 智慧中樞</span>
              <span className="text-[10px] bg-purple-500/30 text-purple-300 px-1.5 py-0.2 rounded font-mono">
                v1.4
              </span>
            </button>
          )}

          <button
            onClick={() => {
              setEditingArticle(null);
              setIsArticleModalOpen(true);
            }}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>撰寫全新深度專欄</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] text-slate-500">專欄文章總篇數</div>
          <div className="text-lg sm:text-xl font-mono font-bold text-slate-900 mt-0.5">
            {articlesList.length} <span className="text-[10px] font-normal text-slate-400">篇報導</span>
          </div>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] text-slate-500">產地人物誌</div>
          <div className="text-lg sm:text-xl font-mono font-bold text-emerald-700 mt-0.5">
            {articlesList.filter(a => a.category === 'story').length} <span className="text-[10px] font-normal text-slate-400">篇</span>
          </div>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] text-slate-500">栽培技術與風土</div>
          <div className="text-lg sm:text-xl font-mono font-bold text-amber-700 mt-0.5">
            {articlesList.filter(a => a.category === 'tech').length} <span className="text-[10px] font-normal text-slate-400">篇</span>
          </div>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] text-slate-500">產銷大數據專題</div>
          <div className="text-lg sm:text-xl font-mono font-bold text-teal-700 mt-0.5">
            {articlesList.filter(a => a.category === 'market_analysis').length} <span className="text-[10px] font-normal text-slate-400">篇</span>
          </div>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-3 flex flex-col sm:flex-row gap-2.5 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="搜尋專欄標題、作者、關鍵字標籤..."
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 w-full sm:w-auto"
          >
            <option value="all">所有專欄分類</option>
            <option value="story">產地人物誌 (story)</option>
            <option value="tech">栽培技術與風土 (tech)</option>
            <option value="market_analysis">產銷大數據 (market_analysis)</option>
            <option value="sustainability">綠色永續與ESG (sustainability)</option>
            <option value="policy">政策與食農教育 (policy)</option>
          </select>
        </div>
      </div>

      {/* Articles Listing Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                <th className="py-3 px-4">專欄主標題與副標題</th>
                <th className="py-3 px-3 w-28">專欄類別</th>
                <th className="py-3 px-3 w-40">作者資訊</th>
                <th className="py-3 px-3 w-24 text-center">章節數</th>
                <th className="py-3 px-3 w-28">發布日期</th>
                <th className="py-3 px-4 w-28 text-center">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredArticles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-400">
                    查無符合條件的專欄報導
                  </td>
                </tr>
              ) : (
                filteredArticles.map(article => (
                  <tr key={article.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-start gap-3">
                        <img
                          src={article.coverImage}
                          alt=""
                          className="w-14 h-11 object-cover rounded-md border border-slate-200 shrink-0 hidden sm:block"
                        />
                        <div className="space-y-0.5">
                          <div className="font-bold text-slate-900 hover:text-emerald-700 transition-colors">
                            {article.title}
                          </div>
                          <div className="text-[11px] text-slate-500 line-clamp-1">
                            {article.subtitle}
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {article.tags.map(t => (
                              <span key={t} className="text-[9px] font-mono text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                                #{t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {article.categoryLabel || article.category}
                      </span>
                    </td>

                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={article.authorAvatar}
                          alt=""
                          className="w-6 h-6 rounded-full object-cover border border-slate-200 shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="font-bold text-slate-800 truncate">{article.authorName}</div>
                          <div className="text-[9px] text-slate-400 truncate">{article.authorTitle}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3 text-center">
                      <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        {article.sections.length} 段
                      </span>
                      <div className="text-[9px] text-slate-400 mt-0.5">
                        {article.readTimeMin} 分鐘讀
                      </div>
                    </td>

                    <td className="py-3 px-3 font-mono text-slate-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{article.publishDate}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => setPreviewArticle(article)}
                          className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-md transition-colors cursor-pointer"
                          title="專欄排版預覽"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingArticle(article);
                            setIsArticleModalOpen(true);
                          }}
                          className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-md transition-colors cursor-pointer"
                          title="編輯專欄"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteArticle(article.id, article.title)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                          title="刪除此專欄"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Add Modal */}
      {isArticleModalOpen && (
        <ArticleModal
          isOpen={isArticleModalOpen}
          onClose={() => {
            setIsArticleModalOpen(false);
            setEditingArticle(null);
          }}
          onSave={onSaveArticle}
          initialArticle={editingArticle}
        />
      )}

      {/* Preview Article Modal */}
      {previewArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-sm">專欄完整排版即時預覽</h3>
              </div>
              <button onClick={() => setPreviewArticle(null)} className="text-slate-400 hover:text-white p-1">
                ✕
              </button>
            </div>
            
            <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
              <img
                src={previewArticle.coverImage}
                alt=""
                className="w-full h-64 object-cover rounded-xl border border-slate-200"
              />

              <div className="space-y-2">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {previewArticle.categoryLabel}
                </span>
                <h1 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
                  {previewArticle.title}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  {previewArticle.subtitle}
                </p>

                {/* Author card */}
                <div className="flex items-center gap-3 pt-3 border-t border-slate-100 mt-3">
                  <img
                    src={previewArticle.authorAvatar}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <div className="font-bold text-xs text-slate-900">{previewArticle.authorName}</div>
                    <div className="text-[11px] text-slate-500">{previewArticle.authorTitle}</div>
                  </div>
                  <div className="ml-auto text-[11px] text-slate-400 font-mono">
                    {previewArticle.publishDate} ｜ 約 {previewArticle.readTimeMin} 分鐘讀
                  </div>
                </div>
              </div>

              {/* Summary lead */}
              <div className="p-4 bg-emerald-50/70 border-l-4 border-emerald-600 rounded-r-xl text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
                {previewArticle.summary}
              </div>

              {/* Sections */}
              <div className="space-y-6 pt-2">
                {previewArticle.sections.map((sec, i) => (
                  <div key={i} className="space-y-3">
                    <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-1.5">
                      {sec.heading}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {sec.body}
                    </p>

                    {sec.quote && (
                      <div className="my-3 p-3.5 bg-amber-50 border-l-3 border-amber-500 rounded-r-lg text-xs sm:text-sm font-serif italic text-amber-950">
                        {sec.quote}
                      </div>
                    )}

                    {sec.highlightBox && (
                      <div className="my-3 p-3 bg-teal-50 border border-teal-200 rounded-lg text-xs text-teal-900 font-medium flex items-center gap-2">
                        <Info className="w-4 h-4 text-teal-600 shrink-0" />
                        <span>{sec.highlightBox}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
