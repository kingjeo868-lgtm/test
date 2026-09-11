import React, { useState } from 'react';
import { 
  FileText, 
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
  Pin,
  Filter,
  Tag
} from 'lucide-react';
import { NewsItem } from '../../types';
import { NewsModal } from './NewsModal';

interface NewsAdminProps {
  newsList: NewsItem[];
  onSaveNews: (news: NewsItem) => void;
  onDeleteNews: (id: string, title: string) => void;
  onTogglePinned: (id: string) => void;
  showToast: (msg: string) => void;
}

export const NewsAdmin: React.FC<NewsAdminProps> = ({
  newsList,
  onSaveNews,
  onDeleteNews,
  onTogglePinned,
  showToast
}) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [previewNews, setPreviewNews] = useState<NewsItem | null>(null);

  const filteredNews = newsList.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.summary.toLowerCase().includes(search.toLowerCase()) ||
      item.author.toLowerCase().includes(search.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesCat = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const pinnedCount = newsList.filter(n => n.isPinned).length;

  return (
    <div className="space-y-4">
      
      {/* Top Action & Stats Bar */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
              <FileText className="w-4 h-4" />
            </span>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
              最新消息與產地特報管理 (News & Announcements CMS)
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            發布產地即時快訊、節令採收特報、農業政策補助公告與契作認養招募
          </p>
        </div>

        <button
          onClick={() => {
            setEditingNews(null);
            setIsNewsModalOpen(true);
          }}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>發布最新消息</span>
        </button>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] text-slate-500">已發布消息總數</div>
          <div className="text-lg sm:text-xl font-mono font-bold text-slate-900 mt-0.5">
            {newsList.length} <span className="text-[10px] font-normal text-slate-400">則公告</span>
          </div>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] text-slate-500">首頁置頂推薦</div>
          <div className="text-lg sm:text-xl font-mono font-bold text-emerald-700 mt-0.5">
            {pinnedCount} <span className="text-[10px] font-normal text-slate-400">則置頂</span>
          </div>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] text-slate-500">產地特報與行情</div>
          <div className="text-lg sm:text-xl font-mono font-bold text-amber-700 mt-0.5">
            {newsList.filter(n => n.category === 'event' || n.category === 'market').length} <span className="text-[10px] font-normal text-slate-400">則</span>
          </div>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] text-slate-500">契作招募與政策</div>
          <div className="text-lg sm:text-xl font-mono font-bold text-teal-700 mt-0.5">
            {newsList.filter(n => n.category === 'announcement' || n.category === 'subsidy').length} <span className="text-[10px] font-normal text-slate-400">則</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-3 flex flex-col sm:flex-row gap-2.5 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="搜尋消息標題、摘要、作者或標籤..."
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
            <option value="all">所有消息分類</option>
            <option value="event">產地特報 (event)</option>
            <option value="subsidy">政策與設施 (subsidy)</option>
            <option value="market">行情產況 (market)</option>
            <option value="announcement">契作招募 (announcement)</option>
            <option value="production">生產技術 (production)</option>
          </select>
        </div>
      </div>

      {/* News Table Listing */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                <th className="py-3 px-4 w-12 text-center">置頂</th>
                <th className="py-3 px-4">消息標題與摘要</th>
                <th className="py-3 px-3 w-28">類別</th>
                <th className="py-3 px-3 w-32">發布單位 / 作者</th>
                <th className="py-3 px-3 w-28">發布日期</th>
                <th className="py-3 px-4 w-28 text-center">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredNews.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-400">
                    查無符合條件的消息公告
                  </td>
                </tr>
              ) : (
                filteredNews.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => onTogglePinned(item.id)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          item.isPinned
                            ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                            : 'text-slate-300 hover:text-slate-600 hover:bg-slate-100'
                        }`}
                        title={item.isPinned ? '取消置頂' : '設為置頂'}
                      >
                        <Pin className="w-4 h-4" />
                      </button>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-start gap-3">
                        {item.image && (
                          <img
                            src={item.image}
                            alt=""
                            className="w-12 h-10 object-cover rounded-md border border-slate-200 shrink-0 hidden sm:block"
                          />
                        )}
                        <div className="space-y-1">
                          <div className="font-bold text-slate-900 hover:text-emerald-700 transition-colors">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-slate-500 line-clamp-1">
                            {item.summary}
                          </div>
                          <div className="flex flex-wrap gap-1 mt-0.5">
                            {item.tags.map(t => (
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
                        {item.categoryLabel || item.category}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-slate-600">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{item.author}</span>
                      </div>
                    </td>

                    <td className="py-3 px-3 font-mono text-slate-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{item.publishDate}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => setPreviewNews(item)}
                          className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-md transition-colors cursor-pointer"
                          title="預覽內文"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingNews(item);
                            setIsNewsModalOpen(true);
                          }}
                          className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-md transition-colors cursor-pointer"
                          title="編輯消息"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteNews(item.id, item.title)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                          title="刪除此消息"
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
      {isNewsModalOpen && (
        <NewsModal
          isOpen={isNewsModalOpen}
          onClose={() => {
            setIsNewsModalOpen(false);
            setEditingNews(null);
          }}
          onSave={onSaveNews}
          initialNews={editingNews}
        />
      )}

      {/* Preview Modal */}
      {previewNews && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-sm">消息內文即時預覽</h3>
              </div>
              <button onClick={() => setPreviewNews(null)} className="text-slate-400 hover:text-white p-1">
                <Eye className="w-4 h-4 hidden" /> ✕
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {previewNews.image && (
                <img src={previewNews.image} alt="" className="w-full h-52 object-cover rounded-xl border border-slate-200" />
              )}
              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {previewNews.categoryLabel}
                </span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 pt-1">
                  {previewNews.title}
                </h2>
                <div className="text-xs text-slate-400 flex items-center gap-3 pt-1">
                  <span>發布日期：{previewNews.publishDate}</span>
                  <span>作者：{previewNews.author}</span>
                  <span>閱讀時間：約 {previewNews.readTimeMin} 分鐘</span>
                </div>
              </div>
              <div className="p-3 bg-slate-50 border-l-3 border-emerald-600 rounded-r-lg text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {previewNews.summary}
              </div>
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {previewNews.content}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
