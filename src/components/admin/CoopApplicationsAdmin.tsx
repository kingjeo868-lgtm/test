import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  ChevronRight,
  Eye,
  X,
  Send,
  UserCheck
} from 'lucide-react';
import { CooperativeApplication } from '../../types';

interface CoopApplicationsAdminProps {
  applicationsList: CooperativeApplication[];
  onUpdateStatus: (id: string, newStatus: CooperativeApplication['status'], auditNote?: string) => void;
  onDeleteApplication: (id: string, orgName: string) => void;
}

export const CoopApplicationsAdmin: React.FC<CoopApplicationsAdminProps> = ({
  applicationsList,
  onUpdateStatus,
  onDeleteApplication
}) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedApp, setSelectedApp] = useState<CooperativeApplication | null>(null);
  const [auditNoteInput, setAuditNoteInput] = useState('');

  const filteredList = applicationsList.filter(app => {
    if (statusFilter !== 'all' && app.status !== statusFilter) return false;
    if (searchKeyword.trim()) {
      const kw = searchKeyword.toLowerCase();
      const matchNo = app.applyNo.toLowerCase().includes(kw);
      const matchOrg = app.orgName.toLowerCase().includes(kw);
      const matchContact = app.contactName.toLowerCase().includes(kw);
      const matchPhone = app.phone.includes(kw);
      const matchCrops = app.mainCrops.toLowerCase().includes(kw);
      const matchCounty = app.countyCity.toLowerCase().includes(kw);
      if (!matchNo && !matchOrg && !matchContact && !matchPhone && !matchCrops && !matchCounty) return false;
    }
    return true;
  });

  const getStatusBadge = (status: CooperativeApplication['status']) => {
    switch (status) {
      case 'submitted':
        return <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[10px] font-bold border border-slate-300">新進申請 (待初審)</span>;
      case 'reviewing':
        return <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold border border-amber-300">書面審查與補件中</span>;
      case 'field_inspecting':
        return <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-900 text-[10px] font-bold border border-sky-300">專家實地現勘訪查</span>;
      case 'approved':
        return <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-bold border border-emerald-300">審核通過 (輔導轉型中)</span>;
      default:
        return null;
    }
  };

  const pendingCount = applicationsList.filter(a => a.status === 'submitted' || a.status === 'reviewing').length;
  const inspectingCount = applicationsList.filter(a => a.status === 'field_inspecting').length;
  const approvedCount = applicationsList.filter(a => a.status === 'approved').length;

  return (
    <div className="space-y-4">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-medium">總申請案件數</span>
            <FileText className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 font-mono">
            {applicationsList.length} <span className="text-xs font-normal text-slate-500">件</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">產銷班轉型與上架申請</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-medium">待初審與補件中</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-xl font-extrabold text-amber-600 font-mono">
            {pendingCount} <span className="text-xs font-normal text-slate-500">件</span>
          </div>
          <div className="text-[10px] text-amber-700 mt-0.5 font-medium">需 2 個工作天內聯繫</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-medium">田間現勘訪查中</span>
            <MapPin className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-xl font-extrabold text-sky-600 font-mono">
            {inspectingCount} <span className="text-xs font-normal text-slate-500">件</span>
          </div>
          <div className="text-[10px] text-sky-700 mt-0.5 font-medium">農技專家實地訪查</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-medium">已核准輔導轉型</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-extrabold text-emerald-600 font-mono">
            {approvedCount} <span className="text-xs font-normal text-slate-500">件</span>
          </div>
          <div className="text-[10px] text-emerald-700 mt-0.5 font-medium">已簽訂契作與輔導合約</div>
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
              placeholder="搜尋申請編號、申請單位、聯絡人、作物..."
              className="w-full pl-8.5 pr-3 py-1.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-lg text-xs transition-colors focus:outline-emerald-600"
            />
          </div>

          <div className="flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-emerald-600"
            >
              <option value="all">所有審核狀態</option>
              <option value="submitted">待初審 (新進申請)</option>
              <option value="reviewing">書面審查與補件中</option>
              <option value="field_inspecting">專家實地現勘訪查</option>
              <option value="approved">審核通過 (輔導轉型中)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                <th className="py-3 px-3.5">申請案號 / 日期</th>
                <th className="py-3 px-3.5">申請組織 / 身份類別</th>
                <th className="py-3 px-3.5">主要聯絡人 / 職稱</th>
                <th className="py-3 px-3.5">產區縣市 / 耕作面積</th>
                <th className="py-3 px-3.5">主力作物與驗證</th>
                <th className="py-3 px-3.5">審核進度狀態</th>
                <th className="py-3 px-3.5 text-center">檢視與審核</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="font-medium">查無符合條件的申請審核案件</p>
                  </td>
                </tr>
              ) : (
                filteredList.map(app => (
                  <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Apply No */}
                    <td className="py-3 px-3.5 font-mono">
                      <div className="font-bold text-slate-900">{app.applyNo}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{app.applyDate}</div>
                    </td>

                    {/* Org Name & Type */}
                    <td className="py-3 px-3.5">
                      <div className="font-bold text-slate-900">{app.orgName}</div>
                      <div className="text-[10px] text-emerald-800 font-medium">{app.applicantTypeName}</div>
                    </td>

                    {/* Contact */}
                    <td className="py-3 px-3.5">
                      <div className="font-bold text-slate-900">{app.contactName}</div>
                      <div className="text-[10px] text-slate-500">{app.contactTitle}</div>
                      <div className="text-[10px] text-slate-600 font-mono mt-0.5 flex items-center gap-1">
                        <Phone className="w-2.5 h-2.5 text-slate-400" />
                        <span>{app.phone}</span>
                      </div>
                    </td>

                    {/* Location & Area */}
                    <td className="py-3 px-3.5">
                      <div className="font-medium text-slate-900 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>{app.countyCity}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5 font-mono">{app.farmArea}</div>
                    </td>

                    {/* Crops */}
                    <td className="py-3 px-3.5">
                      <div className="text-slate-900 font-medium max-w-[200px] truncate">{app.mainCrops}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5 truncate max-w-[200px]">
                        {app.certifications.join(' • ')}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-3.5">
                      {getStatusBadge(app.status)}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-3.5 text-center">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-100 text-slate-800 hover:text-emerald-900 rounded-lg text-xs font-bold transition-all flex items-center gap-1 mx-auto cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>審核詳情</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Application Detail & Audit Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-emerald-800 to-teal-900 px-5 py-4 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-emerald-700/60 rounded-lg border border-emerald-500/30">
                  <Building2 className="w-5 h-5 text-emerald-200" />
                </div>
                <div>
                  <h2 className="text-base font-bold font-serif">
                    產銷班轉型／小農供貨申請案審查
                  </h2>
                  <p className="text-xs text-emerald-200/80 font-mono">案號: {selectedApp.applyNo}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-5 sm:p-6 space-y-4 text-xs text-slate-700">
              {/* Applicant Profile Box */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-bold text-slate-900">{selectedApp.orgName}</div>
                  <div>{getStatusBadge(selectedApp.status)}</div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-slate-600 pt-2 border-t border-slate-200">
                  <div>
                    <span className="text-slate-400">申請類別:</span> {selectedApp.applicantTypeName}
                  </div>
                  <div>
                    <span className="text-slate-400">統一編號/身分證:</span> {selectedApp.idOrTaxId}
                  </div>
                  <div>
                    <span className="text-slate-400">申請時間:</span> {selectedApp.applyDate}
                  </div>
                  <div>
                    <span className="text-slate-400">主要負責人:</span> {selectedApp.contactName} ({selectedApp.contactTitle})
                  </div>
                  <div>
                    <span className="text-slate-400">聯絡電話:</span> {selectedApp.phone}
                  </div>
                  <div>
                    <span className="text-slate-400">電子信箱:</span> {selectedApp.email}
                  </div>
                </div>
              </div>

              {/* Land and Crops */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900">產區土地與農作物資訊</h4>
                <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1.5">
                  <div><span className="text-slate-400">地段地號 / 地址:</span> {selectedApp.landAddress || selectedApp.countyCity}</div>
                  <div><span className="text-slate-400">總耕作面積:</span> {selectedApp.farmArea}</div>
                  <div><span className="text-slate-400">主力農作物:</span> <span className="font-bold text-emerald-800">{selectedApp.mainCrops}</span></div>
                  <div><span className="text-slate-400">取得驗證:</span> {selectedApp.certifications.join('、')}</div>
                </div>
              </div>

              {/* Collaboration Target & Cold Chain */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900">申請合作項目與冷鏈需求</h4>
                <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1.5">
                  <div><span className="text-slate-400">期望合作方案:</span> {selectedApp.targetCollaboration.join('、')}</div>
                  <div><span className="text-slate-400">冷鏈物流與集貨需求:</span> {selectedApp.coldChainNeeds || '無特殊需求'}</div>
                </div>
              </div>

              {/* Audit Status Controls */}
              <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200 space-y-3">
                <h4 className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-emerald-700" />
                  <span>審查進度更新與輔導指派</span>
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={() => {
                      onUpdateStatus(selectedApp.id, 'submitted');
                      setSelectedApp({ ...selectedApp, status: 'submitted' });
                    }}
                    className={`py-2 px-2 rounded-lg font-bold text-center border transition-all cursor-pointer ${
                      selectedApp.status === 'submitted' 
                        ? 'bg-slate-800 text-white border-slate-900' 
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    1. 待初審
                  </button>

                  <button
                    onClick={() => {
                      onUpdateStatus(selectedApp.id, 'reviewing');
                      setSelectedApp({ ...selectedApp, status: 'reviewing' });
                    }}
                    className={`py-2 px-2 rounded-lg font-bold text-center border transition-all cursor-pointer ${
                      selectedApp.status === 'reviewing' 
                        ? 'bg-amber-600 text-white border-amber-700' 
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    2. 書面補件中
                  </button>

                  <button
                    onClick={() => {
                      onUpdateStatus(selectedApp.id, 'field_inspecting');
                      setSelectedApp({ ...selectedApp, status: 'field_inspecting' });
                    }}
                    className={`py-2 px-2 rounded-lg font-bold text-center border transition-all cursor-pointer ${
                      selectedApp.status === 'field_inspecting' 
                        ? 'bg-sky-600 text-white border-sky-700' 
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    3. 專家實地訪查
                  </button>

                  <button
                    onClick={() => {
                      onUpdateStatus(selectedApp.id, 'approved');
                      setSelectedApp({ ...selectedApp, status: 'approved' });
                    }}
                    className={`py-2 px-2 rounded-lg font-bold text-center border transition-all cursor-pointer ${
                      selectedApp.status === 'approved' 
                        ? 'bg-emerald-700 text-white border-emerald-800' 
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    4. 核准輔導轉型
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
              <button
                onClick={() => {
                  onDeleteApplication(selectedApp.id, selectedApp.orgName);
                  setSelectedApp(null);
                }}
                className="text-rose-600 hover:text-rose-700 font-bold transition-colors cursor-pointer"
              >
                刪除此申請案件
              </button>

              <button
                onClick={() => setSelectedApp(null)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold cursor-pointer transition-all"
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
