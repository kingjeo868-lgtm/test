import React, { useState } from 'react';
import { 
  Sparkles, 
  Compass, 
  Calendar, 
  ShieldCheck, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  Eye, 
  Save, 
  Award, 
  Truck, 
  BarChart2, 
  HeartHandshake, 
  Leaf, 
  FileText,
  Quote
} from 'lucide-react';
import { BrandStoryData, BrandMilestone, BrandPillar } from '../../types';
import { MilestoneModal } from './MilestoneModal';
import { PillarModal } from './PillarModal';

interface BrandStoryAdminProps {
  brandStory: BrandStoryData;
  onSaveBrandStory: (data: BrandStoryData) => void;
  showToast: (msg: string) => void;
}

export const BrandStoryAdmin: React.FC<BrandStoryAdminProps> = ({
  brandStory,
  onSaveBrandStory,
  showToast
}) => {
  const [data, setData] = useState<BrandStoryData>(brandStory);
  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<BrandMilestone | null>(null);
  const [isPillarModalOpen, setIsPillarModalOpen] = useState(false);
  const [editingPillar, setEditingPillar] = useState<BrandPillar | null>(null);

  // Icon mapping
  const renderIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-emerald-700" />;
      case 'Truck': return <Truck className="w-5 h-5 text-emerald-700" />;
      case 'BarChart2': return <BarChart2 className="w-5 h-5 text-emerald-700" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-emerald-700" />;
      case 'Sprout': return <Leaf className="w-5 h-5 text-emerald-700" />;
      case 'Award': return <Award className="w-5 h-5 text-emerald-700" />;
      default: return <ShieldCheck className="w-5 h-5 text-emerald-700" />;
    }
  };

  const handleSaveTextChanges = () => {
    onSaveBrandStory(data);
    showToast('品牌故事與核心理念文案已成功儲存並同步至前台！');
  };

  // Milestone handlers
  const handleSaveMilestone = (milestone: BrandMilestone) => {
    let updated: BrandMilestone[];
    if (editingMilestone) {
      updated = data.milestones.map(m => m.id === milestone.id ? milestone : m);
      showToast(`已更新「${milestone.year}年 - ${milestone.title}」里程碑！`);
    } else {
      updated = [...data.milestones, milestone];
      showToast(`已新增「${milestone.year}年 - ${milestone.title}」發展里程碑！`);
    }
    const newData = { ...data, milestones: updated };
    setData(newData);
    onSaveBrandStory(newData);
  };

  const handleDeleteMilestone = (id: string, title: string) => {
    if (window.confirm(`確定要刪除里程碑「${title}」嗎？`)) {
      const updated = data.milestones.filter(m => m.id !== id);
      const newData = { ...data, milestones: updated };
      setData(newData);
      onSaveBrandStory(newData);
      showToast(`已刪除里程碑「${title}」。`);
    }
  };

  // Pillar handlers
  const handleSavePillar = (pillar: BrandPillar) => {
    let updated: BrandPillar[];
    if (editingPillar) {
      updated = data.pillars.map(p => p.id === pillar.id ? pillar : p);
      showToast(`已更新安心基石「${pillar.title}」！`);
    } else {
      updated = [...data.pillars, pillar];
      showToast(`已新增安心基石「${pillar.title}」！`);
    }
    const newData = { ...data, pillars: updated };
    setData(newData);
    onSaveBrandStory(newData);
  };

  const handleDeletePillar = (id: string, title: string) => {
    if (data.pillars.length <= 1) {
      alert('至少需保留一項安心基石承諾');
      return;
    }
    if (window.confirm(`確定要刪除基石承諾「${title}」嗎？`)) {
      const updated = data.pillars.filter(p => p.id !== id);
      const newData = { ...data, pillars: updated };
      setData(newData);
      onSaveBrandStory(newData);
      showToast(`已刪除安心基石「${title}」。`);
    }
  };

  return (
    <div className="space-y-5">
      
      {/* Top Header Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
              <Compass className="w-4 h-4" />
            </span>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
              品牌故事與核心理念管理 (Brand Story CMS)
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            維護前台「品牌故事」頁面之願景標語、創立緣起、四大安心基石與發展歷程里程碑
          </p>
        </div>

        <button
          onClick={handleSaveTextChanges}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>儲存全部文案修改</span>
        </button>
      </div>

      {/* 1. Hero Vision & Slogan Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-4 sm:p-5 space-y-4">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">1. 首頁與品牌旗艦標語 (Hero Header)</h4>
          </div>
          <span className="text-[10px] text-slate-400">呈現於品牌故事頁面頂部大橫幅</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              品牌主要標題 (Hero Main Title)
            </label>
            <input
              type="text"
              value={data.heroTitle}
              onChange={e => setData({ ...data, heroTitle: e.target.value })}
              className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              重點高亮綠字 (Highlight Phrase)
            </label>
            <input
              type="text"
              value={data.heroHighlight}
              onChange={e => setData({ ...data, heroHighlight: e.target.value })}
              className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 text-emerald-700 font-bold"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            品牌核心使命說明 (Hero Subtitle)
          </label>
          <textarea
            rows={2}
            value={data.heroSubtitle}
            onChange={e => setData({ ...data, heroSubtitle: e.target.value })}
            className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 leading-relaxed"
          />
        </div>
      </div>

      {/* 2. Origin & Philosophy Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-4 sm:p-5 space-y-4">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-700" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">2. 品牌創立緣起與土地哲學 (Brand Origin)</h4>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            緣起區塊標題
          </label>
          <input
            type="text"
            value={data.originTitle}
            onChange={e => setData({ ...data, originTitle: e.target.value })}
            className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 font-bold"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
            <Quote className="w-3.5 h-3.5 text-amber-500" />
            <span>小農箴言引述卡片 (Farmer Quote)</span>
          </label>
          <textarea
            rows={2}
            value={data.originQuote}
            onChange={e => setData({ ...data, originQuote: e.target.value })}
            className="w-full text-xs px-3 py-2 border border-amber-200 bg-amber-50/50 rounded-lg focus:ring-2 focus:ring-amber-500 font-medium text-amber-950"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              緣起段落一（傳統困境與省思）
            </label>
            <textarea
              rows={4}
              value={data.originBody1}
              onChange={e => setData({ ...data, originBody1: e.target.value })}
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              緣起段落二（創立方舟與展望）
            </label>
            <textarea
              rows={4}
              value={data.originBody2}
              onChange={e => setData({ ...data, originBody2: e.target.value })}
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* 3. Core Pillars (安心基石) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-4 sm:p-5 space-y-4">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              3. 四大安心基石承諾 (Core Pillars)
            </h4>
          </div>
          <button
            onClick={() => {
              setEditingPillar(null);
              setIsPillarModalOpen(true);
            }}
            className="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-md text-xs font-bold border border-emerald-200 flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>新增安心基石</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {data.pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3 justify-between group hover:border-emerald-300 transition-colors"
            >
              <div className="flex items-start gap-3 flex-1">
                <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-2xs shrink-0">
                  {renderIcon(pillar.iconName)}
                </div>
                <div className="space-y-1">
                  <h5 className="font-bold text-xs sm:text-sm text-slate-900">
                    {pillar.title}
                  </h5>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0 ml-2">
                <button
                  onClick={() => {
                    setEditingPillar(pillar);
                    setIsPillarModalOpen(true);
                  }}
                  className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-white rounded-md transition-colors cursor-pointer"
                  title="編輯此基石"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDeletePillar(pillar.id, pillar.title)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-white rounded-md transition-colors cursor-pointer"
                  title="刪除此基石"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Milestones (發展歷程里程碑) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-4 sm:p-5 space-y-4">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-700" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              4. 品牌發展歷程里程碑 (Brand Milestones Timeline)
            </h4>
          </div>
          <button
            onClick={() => {
              setEditingMilestone(null);
              setIsMilestoneModalOpen(true);
            }}
            className="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-md text-xs font-bold border border-emerald-200 flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>新增歷程里程碑</span>
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {data.milestones.map((ms) => (
            <div
              key={ms.id}
              className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-slate-50/70 px-2 rounded-lg transition-colors"
            >
              <div className="flex items-start sm:items-center gap-3">
                <span className="px-2.5 py-1 bg-emerald-900 text-emerald-300 font-mono font-bold text-xs rounded-lg shrink-0">
                  {ms.year}
                </span>
                <div>
                  <h5 className="font-bold text-xs sm:text-sm text-slate-900">
                    {ms.title}
                  </h5>
                  <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                    {ms.desc}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 self-end sm:self-center shrink-0">
                <button
                  onClick={() => {
                    setEditingMilestone(ms);
                    setIsMilestoneModalOpen(true);
                  }}
                  className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-white rounded-md transition-colors cursor-pointer"
                  title="編輯此里程碑"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDeleteMilestone(ms.id, ms.title)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-white rounded-md transition-colors cursor-pointer"
                  title="刪除此里程碑"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {isMilestoneModalOpen && (
        <MilestoneModal
          isOpen={isMilestoneModalOpen}
          onClose={() => {
            setIsMilestoneModalOpen(false);
            setEditingMilestone(null);
          }}
          onSave={handleSaveMilestone}
          initialMilestone={editingMilestone}
        />
      )}

      {isPillarModalOpen && (
        <PillarModal
          isOpen={isPillarModalOpen}
          onClose={() => {
            setIsPillarModalOpen(false);
            setEditingPillar(null);
          }}
          onSave={handleSavePillar}
          initialPillar={editingPillar}
        />
      )}

    </div>
  );
};
