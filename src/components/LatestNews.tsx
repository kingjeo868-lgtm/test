import React, { useState } from 'react';
import { 
  Newspaper, 
  Calendar, 
  Tag, 
  Clock, 
  ArrowRight, 
  Search, 
  Sparkles, 
  Pin, 
  X, 
  ChevronRight, 
  Share2, 
  Mail, 
  CheckCircle2,
  Bell
} from 'lucide-react';
import { MOCK_NEWS } from '../data/mockData';
import { NewsItem, ViewMode } from '../types';

interface LatestNewsProps {
  onNavigate?: (view: ViewMode) => void;
}

export const LatestNews: React.FC<LatestNewsProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeNewsModal, setActiveNewsModal] = useState<NewsItem | null>(null);
  const [subscribedEmail, setSubscribedEmail] = useState('');
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);

  const categories = [
    { id: 'all', label: '全部消息' },
    { id: 'event', label: '產地特報' },
    { id: 'subsidy', label: '政策與設施' },
    { id: 'market', label: '行情產況' },
    { id: 'announcement', label: '契作招募' }
  ];

  const filteredNews = MOCK_NEWS.filter(item => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const pinnedNews = MOCK_NEWS.filter(item => item.isPinned);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribedEmail) return;
    setSubscribeSuccess(true);
    setTimeout(() => {
      setSubscribeSuccess(false);
      setSubscribedEmail('');
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-16">
      
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white py-8 px-4 sm:px-6 lg:px-8 border-b border-emerald-900 shadow-xs">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-2.5 py-0.5 rounded border border-emerald-400/30 mb-2">
                <Bell className="w-3.5 h-3.5" /> 即時產銷速報與官方公告
              </div>
              <h1 className="text-xl sm:text-3xl font-extrabold font-serif">
                最新消息與產地特報
              </h1>
              <p className="text-emerald-200 text-xs mt-1 font-light">
                掌握全台產地第一手鮮採情報、冷鏈升級動態與農業部政策補助公告
              </p>
            </div>

            {/* Quick Search */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="搜尋最新公告或標籤..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-800/80 border border-slate-700 text-white placeholder-slate-400 rounded-lg text-xs focus:outline-hidden focus:ring-1 focus:ring-emerald-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Pinned Top Alerts */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {pinnedNews.map((news) => (
            <div
              key={news.id}
              onClick={() => setActiveNewsModal(news)}
              className="bg-white rounded-xl border border-emerald-200 p-4 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="bg-rose-50 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded border border-rose-200 flex items-center gap-1">
                    <Pin className="w-3 h-3 text-rose-600" /> 置頂重要公告
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {news.publishDate}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors leading-snug line-clamp-2">
                  {news.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {news.summary}
                </p>
              </div>

              <div className="pt-2.5 mt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-emerald-700 font-semibold text-[11px]">
                  {news.author}
                </span>
                <span className="inline-flex items-center gap-1 text-emerald-700 font-bold group-hover:translate-x-0.5 transition-transform text-[11px]">
                  閱讀全文 <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Category Filter Tabs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-b border-slate-200">
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

        {/* News List */}
        <div className="mt-4 space-y-3.5">
          {filteredNews.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500 text-xs">
              沒有找到符合條件的新聞公告
            </div>
          ) : (
            filteredNews.map((news) => (
              <div
                key={news.id}
                onClick={() => setActiveNewsModal(news)}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-sm hover:border-emerald-300 transition-all cursor-pointer grid grid-cols-1 md:grid-cols-12 group"
              >
                {/* News Image (If exists) */}
                {news.image && (
                  <div className="md:col-span-4 relative h-44 md:h-full bg-slate-100 overflow-hidden">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-emerald-800 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-2xs">
                      {news.categoryLabel}
                    </div>
                  </div>
                )}

                {/* News Content */}
                <div className={`${news.image ? 'md:col-span-8' : 'md:col-span-12'} p-4 sm:p-5 flex flex-col justify-between space-y-2.5`}>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-mono">
                        {news.categoryLabel}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-mono">
                        <Calendar className="w-3 h-3" /> {news.publishDate}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> 約 {news.readTimeMin} 分鐘閱讀
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                      {news.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 sm:line-clamp-3">
                      {news.summary}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {news.tags.map((t, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded font-mono">
                          #{t}
                        </span>
                      ))}
                    </div>

                    <span className="text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      詳閱內容 <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 4. Newsletter Subscription */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-gradient-to-r from-slate-900 to-emerald-950 rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-slate-800">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-xs font-bold text-emerald-400 flex items-center justify-center md:justify-start gap-1">
              <Mail className="w-3.5 h-3.5" /> 好農週報訂閱
            </div>
            <h3 className="text-base sm:text-lg font-bold">
              每週一接收第一手產銷即時情報與當季鮮採優惠
            </h3>
            <p className="text-xs text-slate-300">
              包含農業部行情漲跌預警、節令水果預購通知與小農故事專題。
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="請輸入您的 Email 電子郵件..."
              value={subscribedEmail}
              onChange={(e) => setSubscribedEmail(e.target.value)}
              className="px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-emerald-400 w-full sm:w-64"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors shrink-0 cursor-pointer shadow-2xs"
            >
              {subscribeSuccess ? '✓ 已訂閱' : '免費訂閱'}
            </button>
          </form>
        </div>
      </div>

      {/* 5. News Modal */}
      {activeNewsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200">
            {activeNewsModal.image && (
              <div className="relative h-56 sm:h-64 bg-slate-100">
                <img
                  src={activeNewsModal.image}
                  alt={activeNewsModal.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setActiveNewsModal(null)}
                  className="absolute top-3 right-3 p-1.5 bg-slate-900/70 hover:bg-slate-900 text-white rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 left-3 bg-emerald-800 text-white text-xs font-bold px-2.5 py-1 rounded shadow-2xs">
                  {activeNewsModal.categoryLabel}
                </div>
              </div>
            )}

            <div className="p-5 sm:p-6 space-y-4">
              {!activeNewsModal.image && (
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="bg-emerald-50 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded border border-emerald-200">
                    {activeNewsModal.categoryLabel}
                  </span>
                  <button
                    onClick={() => setActiveNewsModal(null)}
                    className="text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}

              <div className="space-y-1.5">
                <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                  <span>發布日期：{activeNewsModal.publishDate}</span>
                  <span>•</span>
                  <span>發布單位：{activeNewsModal.author}</span>
                </div>
                <h2 className="text-base sm:text-xl font-bold text-slate-900 leading-snug">
                  {activeNewsModal.title}
                </h2>
              </div>

              <div className="p-3 bg-emerald-50/80 rounded-lg border border-emerald-200 text-xs text-emerald-950 leading-relaxed font-medium">
                <strong>摘要：</strong>{activeNewsModal.summary}
              </div>

              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-2">
                {activeNewsModal.content}
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {activeNewsModal.tags.map((t, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-700 text-[11px] px-2 py-0.5 rounded font-mono">
                      #{t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setActiveNewsModal(null)}
                  className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold cursor-pointer"
                >
                  關閉
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
