import React, { useState } from 'react';
import { 
  Building2, 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Award, 
  Truck, 
  Users, 
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { CooperativeItem, CooperativeType, RegionZone } from '../../types';
import { CooperativeModal } from './CooperativeModal';

interface CooperativesAdminProps {
  cooperativesList: CooperativeItem[];
  onSaveCooperative: (coop: CooperativeItem) => void;
  onDeleteCooperative: (id: string, name: string) => void;
}

export const CooperativesAdmin: React.FC<CooperativesAdminProps> = ({
  cooperativesList,
  onSaveCooperative,
  onDeleteCooperative
}) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<RegionZone>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoop, setEditingCoop] = useState<CooperativeItem | null>(null);
  const [detailModalCoop, setDetailModalCoop] = useState<CooperativeItem | null>(null);

  // Filter logic
  const filteredList = cooperativesList.filter(coop => {
    if (selectedRegion !== 'all' && coop.region !== selectedRegion) return false;
    if (selectedType !== 'all' && coop.type !== selectedType) return false;
    if (searchKeyword.trim()) {
      const kw = searchKeyword.toLowerCase();
      const matchName = coop.name.toLowerCase().includes(kw) || coop.shortName.toLowerCase().includes(kw);
      const matchCrop = coop.mainCrops.some(c => c.toLowerCase().includes(kw));
      const matchCounty = coop.county.toLowerCase().includes(kw);
      const matchLeader = coop.leaderName.toLowerCase().includes(kw);
      const matchCode = coop.coopCode.toLowerCase().includes(kw) || coop.supplierCode.toLowerCase().includes(kw);
      if (!matchName && !matchCrop && !matchCounty && !matchLeader && !matchCode) return false;
    }
    return true;
  });

  // Aggregated Stats
  const totalCoops = cooperativesList.length;
  const totalMembers = cooperativesList.reduce((acc, c) => acc + c.memberCount, 0);
  const totalHectares = cooperativesList.reduce((acc, c) => acc + c.farmAreaHectare, 0);
  const totalAnnualTons = cooperativesList.reduce((acc, c) => acc + c.annualVolumeTons, 0);
  const exemplaryCount = cooperativesList.filter(c => c.isExemplary).length;

  return (
    <div className="space-y-4">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-medium">合作社場總數</span>
            <Building2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 font-mono">
            {totalCoops} <span className="text-xs font-normal text-slate-500">家</span>
          </div>
          <div className="text-[10px] text-emerald-700 mt-0.5 font-medium">涵蓋全台 22 縣市</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-medium">農友社員總數</span>
            <Users className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 font-mono">
            {totalMembers.toLocaleString()} <span className="text-xs font-normal text-slate-500">人</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">契作與供貨班員</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-medium">產區總耕作面積</span>
            <Sparkles className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 font-mono">
            {totalHectares.toFixed(1)} <span className="text-xs font-normal text-slate-500">公頃</span>
          </div>
          <div className="text-[10px] text-amber-700 mt-0.5 font-medium">100% 履歷與有機驗證</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-medium">年供貨總量</span>
            <Truck className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 font-mono">
            {totalAnnualTons.toLocaleString()} <span className="text-xs font-normal text-slate-500">公噸</span>
          </div>
          <div className="text-[10px] text-sky-700 mt-0.5 font-medium">雙溫層冷鏈不斷鏈</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-medium">全國特優示範社</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-xl font-extrabold text-amber-600 font-mono">
            {exemplaryCount} <span className="text-xs font-normal text-slate-500">社場</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">神農獎與國家認證</div>
        </div>
      </div>

      {/* Control Toolbar */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search */}
          <div className="relative min-w-[240px] flex-1 sm:flex-initial">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchKeyword}
              onChange={e => setSearchKeyword(e.target.value)}
              placeholder="搜尋社名、代號、農友、作物、產地..."
              className="w-full pl-8.5 pr-3 py-1.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-lg text-xs transition-colors focus:outline-emerald-600"
            />
          </div>

          {/* Region Filter */}
          <div className="flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedRegion}
              onChange={e => setSelectedRegion(e.target.value as RegionZone)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-emerald-600"
            >
              <option value="all">全台灣所有分區</option>
              <option value="north">北部地區</option>
              <option value="central">中部地區</option>
              <option value="south">南部地區</option>
              <option value="east">東部地區</option>
              <option value="islands">外島地區</option>
            </select>
          </div>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-emerald-600"
          >
            <option value="all">所有組織型態</option>
            <option value="production">農業生產合作社</option>
            <option value="marketing">蔬果運銷合作社</option>
            <option value="class">農業產銷班</option>
            <option value="tea">茶葉運銷合作社</option>
            <option value="aquaculture">水產養殖合作社</option>
            <option value="livestock">優質畜牧合作社</option>
          </select>
        </div>

        {/* Add New Button */}
        <button
          onClick={() => {
            setEditingCoop(null);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>新增合作社場／產銷班</span>
        </button>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                <th className="py-3 px-3.5">合作社名稱 / 組織代碼</th>
                <th className="py-3 px-3.5">負責人 / 聯絡資訊</th>
                <th className="py-3 px-3.5">產地縣市 / 分區</th>
                <th className="py-3 px-3.5">主要作物與品質驗證</th>
                <th className="py-3 px-3.5 text-right">社員 / 面積 / 年產量</th>
                <th className="py-3 px-3.5">冷鏈設備評級</th>
                <th className="py-3 px-3.5 text-center">操作管理</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <Building2 className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="font-medium">查無符合條件的合作社場資料</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">請嘗試調整搜尋關鍵字或分區篩選條件</p>
                  </td>
                </tr>
              ) : (
                filteredList.map(coop => (
                  <tr key={coop.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Name & Codes */}
                    <td className="py-3 px-3.5">
                      <div className="flex items-center space-x-2.5">
                        <img
                          src={coop.image}
                          alt={coop.name}
                          className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-900 truncate max-w-[200px] text-xs">
                              {coop.shortName || coop.name}
                            </span>
                            {coop.isExemplary && (
                              <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 text-[9px] font-bold shrink-0">
                                標竿示範
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-500 font-mono">
                            <span className="bg-slate-100 px-1 py-0.2 rounded text-emerald-800 font-bold">
                              {coop.coopCode}
                            </span>
                            <span>北農代號: {coop.supplierCode}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Leader & Contact */}
                    <td className="py-3 px-3.5">
                      <div className="font-bold text-slate-900">{coop.leaderName}</div>
                      <div className="text-[10px] text-slate-500">{coop.leaderTitle}</div>
                      <div className="text-[10px] text-slate-600 font-mono mt-0.5 flex items-center gap-1">
                        <Phone className="w-2.5 h-2.5 text-slate-400" />
                        <span>{coop.contactPhone}</span>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="py-3 px-3.5">
                      <div className="font-medium text-slate-900 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>{coop.county}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {coop.typeName} ({coop.region.toUpperCase()})
                      </div>
                    </td>

                    {/* Crops & Certs */}
                    <td className="py-3 px-3.5">
                      <div className="flex flex-wrap gap-1 max-w-[240px]">
                        {coop.mainCrops.slice(0, 3).map((crop, idx) => (
                          <span key={idx} className="bg-emerald-50 text-emerald-800 border border-emerald-200/60 px-1.5 py-0.2 rounded text-[10px] font-medium">
                            {crop}
                          </span>
                        ))}
                        {coop.mainCrops.length > 3 && (
                          <span className="text-[9px] text-slate-400 self-center">
                            +{coop.mainCrops.length - 3}
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1 truncate max-w-[220px]">
                        {coop.certifications.join(' • ')}
                      </div>
                    </td>

                    {/* Scale */}
                    <td className="py-3 px-3.5 text-right font-mono">
                      <div className="font-bold text-slate-900">{coop.memberCount} 人</div>
                      <div className="text-[10px] text-slate-500">{coop.farmAreaHectare} ha</div>
                      <div className="text-[10px] text-emerald-700 font-semibold">{coop.annualVolumeTons.toLocaleString()} 噸/年</div>
                    </td>

                    {/* Facilities */}
                    <td className="py-3 px-3.5">
                      <div className="space-y-0.5 max-w-[180px]">
                        {coop.coldChainFacilities.slice(0, 2).map((fac, fIdx) => (
                          <div key={fIdx} className="text-[10px] text-slate-600 flex items-center gap-1 truncate">
                            <span className="w-1 h-1 rounded-full bg-emerald-500 shrink-0"></span>
                            <span className="truncate">{fac}</span>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-3.5 text-center">
                      <div className="flex items-center justify-center space-x-1.5">
                        <button
                          onClick={() => {
                            setEditingCoop(coop);
                            setIsModalOpen(true);
                          }}
                          className="p-1.5 bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 rounded-lg transition-colors cursor-pointer"
                          title="編輯社場資料"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteCooperative(coop.id, coop.name)}
                          className="p-1.5 bg-slate-100 hover:bg-rose-100 text-slate-700 hover:text-rose-800 rounded-lg transition-colors cursor-pointer"
                          title="刪除社場"
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

        {/* Footer info */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-slate-500 text-[11px] flex items-center justify-between">
          <span>共顯示 {filteredList.length} 家合作社場資料 (總計 {cooperativesList.length} 家)</span>
          <span className="text-slate-400">已啟用 TFA 合作社聯合社統一資料庫</span>
        </div>
      </div>

      {/* Modal */}
      <CooperativeModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCoop(null);
        }}
        onSave={onSaveCooperative}
        coop={editingCoop}
      />
    </div>
  );
};
