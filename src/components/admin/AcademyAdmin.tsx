import React, { useState } from 'react';
import { 
  GraduationCap, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Filter, 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Award, 
  ExternalLink 
} from 'lucide-react';
import { AcademyCourse } from '../../types';
import { CourseModal } from './CourseModal';

interface AcademyAdminProps {
  academyCoursesList: AcademyCourse[];
  onSaveCourse: (course: AcademyCourse) => void;
  onDeleteCourse: (id: string, title: string) => void;
}

export const AcademyAdmin: React.FC<AcademyAdminProps> = ({
  academyCoursesList,
  onSaveCourse,
  onDeleteCourse
}) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<AcademyCourse | null>(null);

  const filteredList = academyCoursesList.filter(crs => {
    if (categoryFilter !== 'all' && crs.category !== categoryFilter) return false;
    if (searchKeyword.trim()) {
      const kw = searchKeyword.toLowerCase();
      const matchTitle = crs.title.toLowerCase().includes(kw);
      const matchInst = crs.instructorName.toLowerCase().includes(kw);
      const matchCat = crs.categoryLabel.toLowerCase().includes(kw);
      if (!matchTitle && !matchInst && !matchCat) return false;
    }
    return true;
  });

  // Stats
  const totalCourses = academyCoursesList.length;
  const totalSpots = academyCoursesList.reduce((acc, c) => acc + c.spotsTotal, 0);
  const totalEnrolled = academyCoursesList.reduce((acc, c) => acc + c.spotsEnrolled, 0);
  const avgEnrollmentRate = totalSpots > 0 ? Math.round((totalEnrolled / totalSpots) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-medium">開辦培訓課程</span>
            <GraduationCap className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 font-mono">
            {totalCourses} <span className="text-xs font-normal text-slate-500">門課</span>
          </div>
          <div className="text-[10px] text-emerald-700 mt-0.5 font-medium">智慧農業 / 冷鏈 / 法規轉型</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-medium">總受訓學員人數</span>
            <Users className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 font-mono">
            {totalEnrolled} / {totalSpots} <span className="text-xs font-bold text-emerald-700">({avgEnrollmentRate}%)</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">合作社理事/班員踴躍報名</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-medium">公費補助資格</span>
            <Award className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-xl font-extrabold text-emerald-700 font-mono">
            100% <span className="text-xs font-normal text-slate-500">免費公費</span>
          </div>
          <div className="text-[10px] text-amber-700 mt-0.5 font-medium">農業部專款全額補助</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-medium">實作時數累計</span>
            <Clock className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 font-mono">
            {academyCoursesList.reduce((acc, c) => acc + c.durationHours, 0)} <span className="text-xs font-normal text-slate-500">小時</span>
          </div>
          <div className="text-[10px] text-sky-700 mt-0.5 font-medium">含冷鏈示範基地實機操作</div>
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
              placeholder="搜尋課程名稱、主講講師、領域類別..."
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
              <option value="all">所有領域課程</option>
              <option value="smart_agri">智慧農業與物聯網</option>
              <option value="coldchain_logistics">產地冷鏈物流與溫控</option>
              <option value="ecommerce_brand">農產電商與品牌行銷</option>
              <option value="sustainability_esg">淨零永續與 ESG 減碳</option>
              <option value="certification_law">法規轉型與驗證輔導</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => {
            setEditingCourse(null);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>開設新培訓課程</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                <th className="py-3 px-3.5">課程主題名稱 / 類別</th>
                <th className="py-3 px-3.5">主講講師 / 經歷</th>
                <th className="py-3 px-3.5">開課日期 / 地點</th>
                <th className="py-3 px-3.5">報名名額進度</th>
                <th className="py-3 px-3.5">公費與等級</th>
                <th className="py-3 px-3.5 text-center">操作管理</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <GraduationCap className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="font-medium">查無符合條件的培訓課程</p>
                  </td>
                </tr>
              ) : (
                filteredList.map(crs => {
                  const percent = Math.round((crs.spotsEnrolled / crs.spotsTotal) * 100);
                  return (
                    <tr key={crs.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Title */}
                      <td className="py-3 px-3.5">
                        <div className="flex items-center space-x-2.5">
                          <img
                            src={crs.image}
                            alt={crs.title}
                            className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <div className="font-bold text-slate-900 truncate max-w-[220px] text-xs">
                              {crs.title}
                            </div>
                            <div className="text-[10px] text-emerald-800 font-semibold mt-0.5">
                              {crs.categoryLabel}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Instructor */}
                      <td className="py-3 px-3.5">
                        <div className="flex items-center space-x-2">
                          <img
                            src={crs.instructorAvatar}
                            alt={crs.instructorName}
                            className="w-6 h-6 rounded-full object-cover border border-slate-200 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <div className="font-bold text-slate-900">{crs.instructorName}</div>
                            <div className="text-[10px] text-slate-500 truncate max-w-[160px]">{crs.instructorTitle}</div>
                          </div>
                        </div>
                      </td>

                      {/* Date & Location */}
                      <td className="py-3 px-3.5">
                        <div className="font-mono text-slate-900 font-bold">{crs.courseDate}</div>
                        <div className="text-[10px] text-slate-500 truncate max-w-[180px] mt-0.5">
                          {crs.location}
                        </div>
                      </td>

                      {/* Spots */}
                      <td className="py-3 px-3.5">
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="font-bold text-slate-800">{crs.spotsEnrolled} / {crs.spotsTotal} 人</span>
                          <span className="font-bold text-emerald-700 font-mono">{percent}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden border border-slate-200">
                          <div
                            className="bg-emerald-600 h-1.5 rounded-full"
                            style={{ width: `${Math.min(percent, 100)}%` }}
                          />
                        </div>
                      </td>

                      {/* Gov funded & Level */}
                      <td className="py-3 px-3.5">
                        <div className="flex flex-col gap-1">
                          {crs.isFreeGovFunded && (
                            <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-900 font-bold text-[9px] w-fit">
                              公費全額補助
                            </span>
                          )}
                          <span className="text-[10px] text-slate-500">{crs.levelLabel} ({crs.durationHours}hr)</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-3.5 text-center">
                        <div className="flex items-center justify-center space-x-1.5">
                          <button
                            onClick={() => {
                              setEditingCourse(crs);
                              setIsModalOpen(true);
                            }}
                            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
                            title="編輯課程"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteCourse(crs.id, crs.title)}
                            className="p-1.5 bg-slate-100 hover:bg-rose-100 text-slate-700 hover:text-rose-800 rounded-lg transition-colors cursor-pointer"
                            title="刪除課程"
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

      {/* Modal */}
      <CourseModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCourse(null);
        }}
        onSave={onSaveCourse}
        course={editingCourse}
      />
    </div>
  );
};
