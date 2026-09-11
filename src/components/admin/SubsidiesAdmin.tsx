import React, { useState } from 'react';
import { 
  Landmark, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Filter, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  DollarSign, 
  FileDown, 
  ExternalLink 
} from 'lucide-react';
import { SubsidyItem } from '../../types';
import { SubsidyModal } from './SubsidyModal';

interface SubsidiesAdminProps {
  subsidiesList: SubsidyItem[];
  onSaveSubsidy: (subsidy: SubsidyItem) => void;
  onDeleteSubsidy: (id: string, title: string) => void;
}

export const SubsidiesAdmin: React.FC<SubsidiesAdminProps> = ({
  subsidiesList,
  onSaveSubsidy,
  onDeleteSubsidy
}) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubsidy, setEditingSubsidy] = useState<SubsidyItem | null>(null);

  const filteredList = subsidiesList.filter(sub => {
    if (categoryFilter !== 'all' && sub.category !== categoryFilter) return false;
    if (searchKeyword.trim()) {
      const kw = searchKeyword.toLowerCase();
      const matchTitle = sub.title.toLowerCase().includes(kw);
      const matchIssuer = sub.issuer.toLowerCase().includes(kw);
      const matchCat = sub.categoryLabel.toLowerCase().includes(kw);
      if (!matchTitle && !matchIssuer && !matchCat) return false;
    }
    return true;
  });

  const getStatusBadge = (status: SubsidyItem['status']) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-bold border border-emerald-300">受理中</span>;
      case 'upcoming':
        return <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold border border-amber-300">即將開放</span>;
      case 'closed':
        return <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold border border-slate-300">本期截止</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-medium">總公告補助專案</span>
            <Landmark className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 font-mono">
            {subsidiesList.length} <span className="text-xs font-normal text-slate-500">案</span>
          </div>
          <div className="text-[10px] text-emerald-700 mt-0.5 font-medium">農業部農糧署/漁業署/合作社聯社</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-medium">現正開放受理</span>
            <Clock className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-xl font-extrabold text-emerald-700 font-mono">
            {subsidiesList.filter(s => s.status === 'active').length} <span className="text-xs font-normal text-slate-500">案</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">歡迎合作社及產銷班申請</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-medium">最高補助比例</span>
            <DollarSign className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-xl font-extrabold text-amber-600 font-mono">
            最高 100% <span className="text-xs font-normal text-slate-500">全額</span>
          </div>
          <div className="text-[10px] text-amber-700 mt-0.5 font-medium">產銷履歷驗證費全額吸收</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-medium">申請計畫書範本</span>
            <FileDown className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 font-mono">
            全套 <span className="text-xs font-normal text-slate-500">範本提供</span>
          </div>
          <div className="text-[10px] text-sky-700 mt-0.5 font-medium">協助合作社快速送審核備</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative min-w-[240px] flex-1 sm:flex-initial">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchKeyword}
              onChange={e => setSearchKeyword(e.target.value)}
              placeholder="搜尋補助名稱、發布機關、補助類別..."
              className="w-full pl-8.5 pr-3 py-1.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-lg text-xs transition-colors focus:outline-emerald-600"
            />
          </div>

          <div className="flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-emerald-600"
            >
              <option value="all">所有補助類別</option>
              <option value="coldchain">冷鏈物流與預冷設施</option>
              <option value="facility">強固型溫室設施</option>
              <option value="certification">產銷履歷/有機驗證費</option>
              <option value="machinery">智慧省工農機</option>
              <option value="disaster">天然災害復耕</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => {
            setEditingSubsidy(null);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>發布新補助政策</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                <th className="py-3 px-3.5">專案補助政策名稱 / 類別</th>
                <th className="py-3 px-3.5">主管機關 / 補助額度</th>
                <th className="py-3 px-3.5">申請對象與門檻</th>
                <th className="py-3 px-3.5">受理截止日</th>
                <th className="py-3 px-3.5">狀態</th>
                <th className="py-3 px-3.5 text-center">操作管理</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <Landmark className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="font-medium">查無符合條件的補助專案政策</p>
                  </td>
                </tr>
              ) : (
                filteredList.map(sub => (
                  <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Title & Category */}
                    <td className="py-3 px-3.5">
                      <div className="font-bold text-slate-900 max-w-[260px] text-xs leading-snug">
                        {sub.title}
                      </div>
                      <div className="text-[10px] text-emerald-800 font-semibold mt-1">
                        {sub.categoryLabel}
                      </div>
                    </td>

                    {/* Issuer & Amount */}
                    <td className="py-3 px-3.5">
                      <div className="font-medium text-slate-900">{sub.issuer}</div>
                      <div className="text-[10px] text-amber-700 font-bold font-mono mt-0.5">
                        {sub.subsidyRate} ({sub.maxAmount})
                      </div>
                    </td>

                    {/* Audience */}
                    <td className="py-3 px-3.5">
                      <div className="space-y-0.5 max-w-[220px]">
                        {sub.targetAudience.slice(0, 2).map((aud, i) => (
                          <div key={i} className="text-[10px] text-slate-600 truncate flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-emerald-500 shrink-0"></span>
                            <span className="truncate">{aud}</span>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Deadline */}
                    <td className="py-3 px-3.5 font-mono text-slate-600">
                      {sub.applyDeadline}
                    </td>

                    {/* Status */}
                    <td className="py-3 px-3.5">
                      {getStatusBadge(sub.status)}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-3.5 text-center">
                      <div className="flex items-center justify-center space-x-1.5">
                        <button
                          onClick={() => {
                            setEditingSubsidy(sub);
                            setIsModalOpen(true);
                          }}
                          className="p-1.5 bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 rounded-lg transition-colors cursor-pointer"
                          title="編輯補助專案"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteSubsidy(sub.id, sub.title)}
                          className="p-1.5 bg-slate-100 hover:bg-rose-100 text-slate-700 hover:text-rose-800 rounded-lg transition-colors cursor-pointer"
                          title="刪除補助專案"
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

      {/* Modal */}
      <SubsidyModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingSubsidy(null);
        }}
        onSave={onSaveSubsidy}
        subsidy={editingSubsidy}
      />
    </div>
  );
};
