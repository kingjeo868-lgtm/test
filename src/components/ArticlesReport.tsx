import React, { useState } from 'react';
import { 
  BookOpen, 
  User, 
  Calendar, 
  Clock, 
  Tag, 
  ArrowRight, 
  Sparkles, 
  Quote, 
  ChevronRight, 
  X, 
  Share2, 
  Bookmark, 
  CheckCircle2,
  TrendingUp,
  Award,
  Bot,
  Terminal,
  Zap
} from 'lucide-react';
import { MOCK_ARTICLES } from '../data/mockData';
import { ArticleItem, ViewMode } from '../types';

interface ArticlesReportProps {
  onNavigate?: (view: ViewMode) => void;
}

export const ArticlesReport: React.FC<ArticlesReportProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArticleModal, setActiveArticleModal] = useState<ArticleItem | null>(null);

  const categories = [
    { id: 'all', label: '全部專欄' },
    { id: 'story', label: '產地人物誌' },
    { id: 'tech', label: '栽培技術與風土' },
    { id: 'market_analysis', label: '產銷大數據' },
  ];

  const filteredArticles = MOCK_ARTICLES.filter(item => {
    return selectedCategory === 'all' || item.category === selectedCategory;
  });

  const featuredArticle = MOCK_ARTICLES[0];

  return (
    <div className="min-h-screen bg-slate-50/60 pb-16">
      
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-emerald-900 shadow-xs">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl space-y-2.5">
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-2.5 py-0.5 rounded border border-emerald-400/30">
              <BookOpen className="w-3.5 h-3.5" /> 深度食農專題與產銷觀點
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-serif">
              好農方舟・產地專欄報導
            </h1>
            <p className="text-emerald-200 text-xs sm:text-sm font-light leading-relaxed">
              走進全台田野果園，記錄在地農友的耕作智慧，剖析氣候變遷與大數據下的農業新趨勢。
            </p>
          </div>

          {/* MCP Hub Quick Launch Pill */}
          <div className="mt-5 p-3 sm:p-4 rounded-xl bg-slate-900/90 border border-emerald-500/40 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
                    <span>文章 MCP 智慧功能中樞</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Model Context Protocol v2024-11-05
                    </span>
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  支援 Anthropic MCP 協定：開放 6 大 AI Agent 工具、全文語意切片與批發行情即時關聯調用
                </p>
              </div>
            </div>

            {onNavigate && (
              <button
                onClick={() => onNavigate('article_mcp')}
                className="px-3.5 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-extrabold rounded-lg text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>進入文章 MCP 調用中樞</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Featured Lead Article */}
      {featuredArticle && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-5">
          <div 
            onClick={() => setActiveArticleModal(featuredArticle)}
            className="bg-white rounded-xl border border-slate-200 shadow-md overflow-hidden hover:shadow-lg transition-all cursor-pointer grid grid-cols-1 lg:grid-cols-12 group"
          >
            <div className="lg:col-span-7 relative min-h-[220px] lg:min-h-[320px] bg-slate-100 overflow-hidden">
              <img
                src={featuredArticle.coverImage}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-emerald-800 text-white text-xs font-bold px-2.5 py-1 rounded shadow-2xs">
                ★ 焦點深度報導
              </div>
            </div>

            <div className="lg:col-span-5 p-5 sm:p-6 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <span className="text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {featuredArticle.categoryLabel}
                  </span>
                  <span>•</span>
                  <span>{featuredArticle.publishDate}</span>
                  <span>•</span>
                  <span>約 {featuredArticle.readTimeMin} 分鐘</span>
                </div>

                <h2 className="text-base sm:text-xl font-bold text-slate-900 font-serif leading-snug group-hover:text-emerald-700 transition-colors">
                  {featuredArticle.title}
                </h2>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {featuredArticle.summary}
                </p>
              </div>

              {/* Author & Read More */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={featuredArticle.authorAvatar}
                    alt={featuredArticle.authorName}
                    className="w-8 h-8 rounded-full object-cover border border-emerald-500"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-800">{featuredArticle.authorName}</div>
                    <div className="text-[10px] text-slate-400 truncate max-w-[160px]">{featuredArticle.authorTitle}</div>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
                  閱讀全文 <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Category Filter Tabs & Article Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-400 hidden sm:inline font-mono">
            共 {filteredArticles.length} 篇專題
          </span>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => setActiveArticleModal(article)}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-emerald-800 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-2xs">
                    {article.categoryLabel}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                    <span>{article.publishDate}</span>
                    <span>•</span>
                    <span>{article.readTimeMin} 分鐘閱讀</span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0">
                <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <img
                      src={article.authorAvatar}
                      alt={article.authorName}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-[11px] font-medium text-slate-700">{article.authorName}</span>
                  </div>

                  <span className="text-emerald-700 font-bold text-xs flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                    閱讀 <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Full Article Modal */}
      {activeArticleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            
            {/* Modal Hero Cover */}
            <div className="relative h-56 sm:h-72 bg-slate-100">
              <img
                src={activeArticleModal.coverImage}
                alt={activeArticleModal.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent"></div>
              
              <button
                onClick={() => setActiveArticleModal(null)}
                className="absolute top-3.5 right-3.5 p-1.5 bg-slate-900/70 hover:bg-slate-900 text-white rounded-full transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <span className="bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded shadow-2xs">
                  {activeArticleModal.categoryLabel}
                </span>
                <h1 className="text-base sm:text-2xl font-black font-serif leading-tight">
                  {activeArticleModal.title}
                </h1>
                <p className="text-xs sm:text-sm text-emerald-200 font-light">
                  {activeArticleModal.subtitle}
                </p>
              </div>
            </div>

            {/* Modal Body Content */}
            <div className="p-5 sm:p-8 space-y-6">
              
              {/* Author & Meta Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <img
                    src={activeArticleModal.authorAvatar}
                    alt={activeArticleModal.authorName}
                    className="w-10 h-10 rounded-full object-cover border border-emerald-500"
                  />
                  <div>
                    <div className="font-bold text-sm text-slate-900">{activeArticleModal.authorName}</div>
                    <div className="text-xs text-slate-500">{activeArticleModal.authorTitle}</div>
                  </div>
                </div>

                <div className="text-right text-xs text-slate-400 font-mono">
                  <div>發布：{activeArticleModal.publishDate}</div>
                  <div>閱讀時間：約 {activeArticleModal.readTimeMin} 分鐘</div>
                </div>
              </div>

              {/* Lead Summary */}
              <div className="p-4 bg-emerald-50/80 rounded-xl border border-emerald-200 text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
                <strong>導讀：</strong>{activeArticleModal.summary}
              </div>

              {/* Article Content Sections */}
              <div className="space-y-5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                {activeArticleModal.sections.map((sec, idx) => (
                  <div key={idx} className="space-y-2.5">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 font-serif">
                      {sec.heading}
                    </h3>
                    <p className="whitespace-pre-line leading-relaxed">
                      {sec.body}
                    </p>

                    {sec.quote && (
                      <div className="my-3 p-3.5 bg-slate-50 border-l-4 border-emerald-600 rounded-r-lg text-xs sm:text-sm italic font-medium text-slate-800 flex items-start gap-2">
                        <Quote className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{sec.quote}</span>
                      </div>
                    )}

                    {sec.highlightBox && (
                      <div className="my-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-950 font-medium">
                        {sec.highlightBox}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Article Footer & Tags */}
              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {activeArticleModal.tags.map((t, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-md font-mono">
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveArticleModal(null)}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold cursor-pointer"
                  >
                    完成閱讀
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
