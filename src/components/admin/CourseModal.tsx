import React, { useState, useEffect } from 'react';
import { X, GraduationCap, Calendar, Clock, MapPin, Users, Award, ShieldCheck } from 'lucide-react';
import { AcademyCourse } from '../../types';

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (course: AcademyCourse) => void;
  course: AcademyCourse | null;
}

export const CourseModal: React.FC<CourseModalProps> = ({
  isOpen,
  onClose,
  onSave,
  course
}) => {
  const [formData, setFormData] = useState<Partial<AcademyCourse>>({
    title: '',
    category: 'smart_agri',
    categoryLabel: '智慧農業與物聯網',
    level: 'intermediate',
    levelLabel: '實戰進階',
    instructorName: '',
    instructorTitle: '',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    courseDate: '2026-09-12',
    courseTime: '09:30 - 16:30 (共 6 小時)',
    location: '農業部智慧冷鏈示範基地 (雲林西螺) / 線上同步視訊',
    durationHours: 6,
    spotsTotal: 40,
    spotsEnrolled: 0,
    syllabus: [
      '台灣農業冷鏈政策與補助申請要點解析',
      '真空預冷機與自動化壓差預冷庫溫控管理實務',
      'TAP 產銷履歷批次條碼與溫控聯網上傳操作'
    ],
    isFreeGovFunded: true,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80'
  });

  const [syllabusInput, setSyllabusInput] = useState('');

  const categoryLabelMap: Record<AcademyCourse['category'], string> = {
    smart_agri: '智慧農業與物聯網',
    coldchain_logistics: '產地冷鏈物流與溫控',
    ecommerce_brand: '農產電商與品牌行銷',
    sustainability_esg: '淨零永續與 ESG 減碳',
    certification_law: '法規轉型與驗證輔導'
  };

  const levelLabelMap: Record<AcademyCourse['level'], string> = {
    beginner: '入門基礎',
    intermediate: '實戰進階',
    advanced: '領袖專班'
  };

  useEffect(() => {
    if (course) {
      setFormData(course);
      setSyllabusInput(course.syllabus.join('\n'));
    } else {
      setFormData({
        id: `course_${Date.now()}`,
        title: '',
        category: 'smart_agri',
        categoryLabel: '智慧農業與物聯網',
        level: 'intermediate',
        levelLabel: '實戰進階',
        instructorName: '',
        instructorTitle: '農業部智慧農業推廣專家',
        instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        courseDate: '2026-09-15',
        courseTime: '09:30 - 16:30 (共 6 小時)',
        location: '農業部大數據講堂 / 線上同步直播',
        durationHours: 6,
        spotsTotal: 40,
        spotsEnrolled: 0,
        syllabus: [
          '智慧溫室環境感測與自動滴灌系統調校',
          '微氣候數據與病蟲害預警實戰分析',
          '物聯網設備政府補助計畫書填寫實戰'
        ],
        isFreeGovFunded: true,
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80'
      });
      setSyllabusInput('智慧溫室環境感測與自動滴灌系統調校\n微氣候數據與病蟲害預警實戰分析\n物聯網設備政府補助計畫書填寫實戰');
    }
  }, [course, isOpen]);

  if (!isOpen) return null;

  const handleCategoryChange = (cat: AcademyCourse['category']) => {
    setFormData(prev => ({
      ...prev,
      category: cat,
      categoryLabel: categoryLabelMap[cat]
    }));
  };

  const handleLevelChange = (lvl: AcademyCourse['level']) => {
    setFormData(prev => ({
      ...prev,
      level: lvl,
      levelLabel: levelLabelMap[lvl]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim() || !formData.instructorName?.trim()) {
      alert('請填寫課程名稱與授課講師姓名！');
      return;
    }

    const cleanedSyllabus = syllabusInput
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const result: AcademyCourse = {
      id: formData.id || `course_${Date.now()}`,
      title: formData.title || '',
      category: formData.category || 'smart_agri',
      categoryLabel: formData.categoryLabel || '智慧農業與物聯網',
      level: formData.level || 'intermediate',
      levelLabel: formData.levelLabel || '實戰進階',
      instructorName: formData.instructorName || '',
      instructorTitle: formData.instructorTitle || '專業講師',
      instructorAvatar: formData.instructorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      courseDate: formData.courseDate || '2026-09-20',
      courseTime: formData.courseTime || '09:30 - 16:30',
      location: formData.location || '線上與實體同步',
      durationHours: Number(formData.durationHours) || 6,
      spotsTotal: Number(formData.spotsTotal) || 40,
      spotsEnrolled: Number(formData.spotsEnrolled) || 0,
      syllabus: cleanedSyllabus.length > 0 ? cleanedSyllabus : ['專業實務精華教學與討論'],
      isFreeGovFunded: Boolean(formData.isFreeGovFunded),
      image: formData.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80'
    };

    onSave(result);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 px-5 py-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-emerald-700/60 rounded-lg border border-emerald-500/30">
              <GraduationCap className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-serif">
                {course ? '編輯農民學院培訓課程' : '開設新農民學院培訓課程'}
              </h2>
              <p className="text-xs text-emerald-200/80">建立智慧農業、冷鏈溫控與法規升級培育專業課程</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 sm:p-6 space-y-4 text-xs text-slate-700">
          {/* Course Title */}
          <div>
            <label className="block font-bold text-slate-800 mb-1">
              課程主題名稱 *
            </label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              placeholder="例如: 農業冷鏈保鮮與自動化壓差預冷溫控管理實務專班"
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg font-bold text-slate-900 focus:outline-emerald-600"
              required
            />
          </div>

          {/* Category & Level & Gov Funded */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">課程領域類別</label>
              <select
                value={formData.category || 'smart_agri'}
                onChange={e => handleCategoryChange(e.target.value as AcademyCourse['category'])}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-emerald-600"
              >
                <option value="smart_agri">智慧農業與物聯網</option>
                <option value="coldchain_logistics">產地冷鏈物流與溫控</option>
                <option value="ecommerce_brand">農產電商與品牌行銷</option>
                <option value="sustainability_esg">淨零永續與 ESG 減碳</option>
                <option value="certification_law">法規轉型與驗證輔導</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1">課程難度等級</label>
              <select
                value={formData.level || 'intermediate'}
                onChange={e => handleLevelChange(e.target.value as AcademyCourse['level'])}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-emerald-600"
              >
                <option value="beginner">入門基礎班</option>
                <option value="intermediate">實戰進階班</option>
                <option value="advanced">領袖主管專班</option>
              </select>
            </div>
            <div className="flex items-center pt-5">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(formData.isFreeGovFunded)}
                  onChange={e => setFormData({ ...formData, isFreeGovFunded: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
                <span className="font-bold text-emerald-950">農業部公費全額補助</span>
              </label>
            </div>
          </div>

          {/* Instructor */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div>
              <label className="block font-bold text-slate-800 mb-1">主講講師姓名 *</label>
              <input
                type="text"
                value={formData.instructorName || ''}
                onChange={e => setFormData({ ...formData, instructorName: e.target.value })}
                placeholder="例如: 廖宏達 博士"
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-bold text-slate-900"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1">講師職稱與經歷</label>
              <input
                type="text"
                value={formData.instructorTitle || ''}
                onChange={e => setFormData({ ...formData, instructorTitle: e.target.value })}
                placeholder="例如: 國立中興大學園藝學系 教授 / 冷鏈研究中心主任"
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-800"
              />
            </div>
          </div>

          {/* Date, Time, Location & Spots */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">開課日期</label>
              <input
                type="date"
                value={formData.courseDate || ''}
                onChange={e => setFormData({ ...formData, courseDate: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-mono text-slate-800"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1">授課時數 (小時)</label>
              <input
                type="number"
                value={formData.durationHours || 6}
                onChange={e => setFormData({ ...formData, durationHours: Number(e.target.value) })}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-mono text-slate-800"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1">總名額上限</label>
              <input
                type="number"
                value={formData.spotsTotal || 40}
                onChange={e => setFormData({ ...formData, spotsTotal: Number(e.target.value) })}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-mono text-slate-800"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1">目前報名人數</label>
              <input
                type="number"
                value={formData.spotsEnrolled || 0}
                onChange={e => setFormData({ ...formData, spotsEnrolled: Number(e.target.value) })}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-mono text-emerald-800 font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">授課時間與地點說明</label>
            <input
              type="text"
              value={formData.location || ''}
              onChange={e => setFormData({ ...formData, location: e.target.value })}
              placeholder="例如: 農業部智慧冷鏈示範基地 (雲林西螺) / 線上同步視訊"
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900"
            />
          </div>

          {/* Syllabus */}
          <div>
            <label className="block font-bold text-slate-800 mb-1">
              課程大綱與實作核心 (每行一單元)
            </label>
            <textarea
              rows={4}
              value={syllabusInput}
              onChange={e => setSyllabusInput(e.target.value)}
              placeholder="例如：&#10;台灣農業冷鏈政策與補助申請要點解析&#10;真空預冷機與自動化壓差預冷庫溫控管理實務&#10;TAP 產銷履歷批次條碼與溫控聯網上傳操作"
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 leading-relaxed"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block font-bold text-slate-800 mb-1">主視覺封面 (Unsplash URL)</label>
            <input
              type="url"
              value={formData.image || ''}
              onChange={e => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg font-mono text-[11px]"
            />
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end space-x-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-all cursor-pointer"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{course ? '儲存培訓課程' : '發布開設課程'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
