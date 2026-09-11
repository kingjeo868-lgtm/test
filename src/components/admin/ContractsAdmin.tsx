import React, { useState } from 'react';
import { 
  Sprout, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Users, 
  DollarSign, 
  Calendar, 
  MapPin, 
  TrendingUp, 
  Award, 
  ExternalLink, 
  CheckCircle2,
  FileCheck,
  Eye,
  X
} from 'lucide-react';
import { ContractProject } from '../../types';
import { ContractModal } from './ContractModal';

interface ContractsAdminProps {
  contractProjectsList: ContractProject[];
  onSaveContractProject: (project: ContractProject) => void;
  onDeleteContractProject: (id: string, title: string) => void;
}

export const ContractsAdmin: React.FC<ContractsAdminProps> = ({
  contractProjectsList,
  onSaveContractProject,
  onDeleteContractProject
}) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ContractProject | null>(null);
  const [selectedRosterProject, setSelectedRosterProject] = useState<ContractProject | null>(null);

  const filteredList = contractProjectsList.filter(proj => {
    if (searchKeyword.trim()) {
      const kw = searchKeyword.toLowerCase();
      const matchTitle = proj.title.toLowerCase().includes(kw);
      const matchCrop = proj.cropName.toLowerCase().includes(kw);
      const matchFarmer = proj.farmerName.toLowerCase().includes(kw);
      const matchLoc = proj.location.toLowerCase().includes(kw);
      if (!matchTitle && !matchCrop && !matchFarmer && !matchLoc) return false;
    }
    return true;
  });

  // Calculate totals
  const totalTargetShares = contractProjectsList.reduce((acc, p) => acc + p.targetShares, 0);
  const totalCurrentShares = contractProjectsList.reduce((acc, p) => acc + p.currentShares, 0);
  const totalContractValue = contractProjectsList.reduce((acc, p) => acc + (p.currentShares * p.pricePerShare), 0);
  const overallProgress = totalTargetShares > 0 ? Math.round((totalCurrentShares / totalTargetShares) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-medium">進行中契作專案</span>
            <Sprout className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 font-mono">
            {contractProjectsList.length} <span className="text-xs font-normal text-slate-500">檔</span>
          </div>
          <div className="text-[10px] text-emerald-700 mt-0.5 font-medium">果樹認養 / 契作茶園 / 蔬菜箱</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-medium">總認養份數與進度</span>
            <Users className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 font-mono">
            {totalCurrentShares} / {totalTargetShares} <span className="text-xs font-bold text-emerald-700">({overallProgress}%)</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">累計 {totalCurrentShares} 位企業與家庭認養人</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-medium">累計契作總保證金</span>
            <DollarSign className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-xl font-extrabold text-amber-600 font-mono">
            NT$ {totalContractValue.toLocaleString()}
          </div>
          <div className="text-[10px] text-amber-700 mt-0.5 font-medium">100% 撥付小農專戶保障</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-medium">履約收穫保證</span>
            <Award className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 font-mono">
            100% <span className="text-xs font-normal text-slate-500">安心保證</span>
          </div>
          <div className="text-[10px] text-sky-700 mt-0.5 font-medium">產銷公積金天然天災補足</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative min-w-[280px] flex-1 sm:flex-initial">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchKeyword}
            onChange={e => setSearchKeyword(e.target.value)}
            placeholder="搜尋契作專案名稱、代耕農友、作物、產地..."
            className="w-full pl-8.5 pr-3 py-1.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-lg text-xs transition-colors focus:outline-emerald-600"
          />
        </div>

        <button
          onClick={() => {
            setEditingProject(null);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>發起新契作認養專案</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                <th className="py-3 px-3.5">契作認養專案名稱 / 作物</th>
                <th className="py-3 px-3.5">代耕農友 / 產區</th>
                <th className="py-3 px-3.5 text-right">認養單價 / 總金額</th>
                <th className="py-3 px-3.5">認養份額達成率</th>
                <th className="py-3 px-3.5">預估保證產量與收穫時程</th>
                <th className="py-3 px-3.5 text-center">認養人清冊與管理</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <Sprout className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="font-medium">查無符合條件的契作專案</p>
                  </td>
                </tr>
              ) : (
                filteredList.map(proj => {
                  const percent = Math.round((proj.currentShares / proj.targetShares) * 100);
                  const totalRaised = proj.currentShares * proj.pricePerShare;
                  return (
                    <tr key={proj.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Title & Image */}
                      <td className="py-3 px-3.5">
                        <div className="flex items-center space-x-2.5">
                          <img
                            src={proj.image}
                            alt={proj.title}
                            className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <div className="font-bold text-slate-900 truncate max-w-[220px] text-xs">
                              {proj.title}
                            </div>
                            <div className="text-[10px] text-emerald-800 font-semibold mt-0.5">
                              {proj.cropName}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Farmer & Location */}
                      <td className="py-3 px-3.5">
                        <div className="font-bold text-slate-900">{proj.farmerName}</div>
                        <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>{proj.location}</span>
                        </div>
                      </td>

                      {/* Price & Value */}
                      <td className="py-3 px-3.5 text-right font-mono">
                        <div className="font-bold text-slate-900">NT$ {proj.pricePerShare.toLocaleString()} / 份</div>
                        <div className="text-[10px] text-amber-700 font-semibold mt-0.5">
                          累計 NT$ {totalRaised.toLocaleString()}
                        </div>
                      </td>

                      {/* Shares Progress */}
                      <td className="py-3 px-3.5">
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="font-bold text-slate-800">{proj.currentShares} / {proj.targetShares} 份</span>
                          <span className="font-bold text-emerald-700 font-mono">{percent}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                          <div
                            className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full transition-all"
                            style={{ width: `${Math.min(percent, 100)}%` }}
                          />
                        </div>
                        <div className="text-[9px] text-slate-400 mt-1">剩餘 {proj.daysLeft} 天截止</div>
                      </td>

                      {/* Yield & Schedule */}
                      <td className="py-3 px-3.5">
                        <div className="text-slate-900 font-medium max-w-[200px] truncate">
                          {proj.expectedYieldPerShare}
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5 max-w-[200px] truncate">
                          {proj.harvestSchedule}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-3.5 text-center">
                        <div className="flex items-center justify-center space-x-1.5">
                          <button
                            onClick={() => setSelectedRosterProject(proj)}
                            className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-[11px] font-bold transition-colors flex items-center gap-1 cursor-pointer"
                            title="檢視認養人名冊與樹牌題字"
                          >
                            <Users className="w-3 h-3" />
                            <span>名冊 ({proj.currentShares})</span>
                          </button>
                          <button
                            onClick={() => {
                              setEditingProject(proj);
                              setIsModalOpen(true);
                            }}
                            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
                            title="編輯專案"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteContractProject(proj.id, proj.title)}
                            className="p-1.5 bg-slate-100 hover:bg-rose-100 text-slate-700 hover:text-rose-800 rounded-lg transition-colors cursor-pointer"
                            title="刪除專案"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Adopter Roster Modal */}
      {selectedRosterProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-emerald-800 to-teal-900 px-5 py-4 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <FileCheck className="w-5 h-5 text-emerald-200" />
                <div>
                  <h3 className="font-bold text-base font-serif">契作認養人清冊與掛牌題字</h3>
                  <p className="text-xs text-emerald-200/80 truncate max-w-md">{selectedRosterProject.title}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedRosterProject(null)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-5 space-y-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between text-slate-700">
                <span>目前已認養 <strong>{selectedRosterProject.currentShares}</strong> 份（目標 {selectedRosterProject.targetShares} 份）</span>
                <span className="font-mono font-bold text-emerald-800">單價: NT$ {selectedRosterProject.pricePerShare.toLocaleString()}</span>
              </div>

              {/* Sample Adopters */}
              <div className="space-y-2">
                {[
                  { name: '王怡婷 博士', shares: 2, treePlate: '「怡然自得，綠意常青」', date: '2026-08-15', status: '已發行電子憑證' },
                  { name: '綠光生機廚房 (李經理)', shares: 5, treePlate: '「綠光生機友善餐桌專屬果樹」', date: '2026-08-18', status: '已懸掛檜木樹牌' },
                  { name: '張哲銘 建築師', shares: 1, treePlate: '「張氏家族幸福柚樹」', date: '2026-08-20', status: '已發行電子憑證' },
                  { name: '新竹科技企業福委會', shares: 10, treePlate: '「2026 科技員工健康契作園」', date: '2026-08-21', status: '已發行電子憑證' }
                ].map((adopter, idx) => (
                  <div key={idx} className="p-3 bg-white border border-slate-200 rounded-xl hover:border-emerald-300 transition-colors space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-slate-900 text-xs flex items-center gap-2">
                        <span>{adopter.name}</span>
                        <span className="bg-emerald-100 text-emerald-900 px-2 py-0.2 rounded-full text-[10px] font-mono">
                          認養 {adopter.shares} 份
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {adopter.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100 flex items-center justify-between">
                      <span>專屬掛牌題字: <strong className="text-emerald-950 font-serif">{adopter.treePlate}</strong></span>
                      <span className="text-[10px] text-slate-400 font-mono">{adopter.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedRosterProject(null)}
                className="px-4 py-1.5 bg-slate-800 text-white rounded-lg font-bold text-xs cursor-pointer"
              >
                關閉清冊
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      <ContractModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProject(null);
        }}
        onSave={onSaveContractProject}
        project={editingProject}
      />
    </div>
  );
};
