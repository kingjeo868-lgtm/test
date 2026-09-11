import React, { useState, useEffect } from 'react';
import { X, Sprout, Calendar, DollarSign, Award, Truck, ShieldCheck, MapPin, Plus, Trash2 } from 'lucide-react';
import { ContractProject } from '../../types';

interface ContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: ContractProject) => void;
  project: ContractProject | null;
}

export const ContractModal: React.FC<ContractModalProps> = ({
  isOpen,
  onClose,
  onSave,
  project
}) => {
  const [formData, setFormData] = useState<Partial<ContractProject>>({
    title: '',
    cropName: '',
    farmerName: '',
    location: '',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80',
    targetShares: 50,
    currentShares: 0,
    pricePerShare: 3600,
    expectedYieldPerShare: '保證 4 箱 (每箱 5 斤，共 20 斤特級老欉)',
    harvestSchedule: '預計 2026 白露前一週 (約 8/28 - 9/02)',
    deliveryTimes: 2,
    benefits: [
      '專屬客製化柚樹認養名牌與樹上即時縮時攝影',
      '中秋節前低溫免運直送到府或分寄親友',
      '邀請全家免費參與麻豆柚園採果農家一日體驗',
      'SGS 381項無農藥殘留檢驗報告全額保證'
    ],
    daysLeft: 30,
    description: ''
  });

  const [benefitsInput, setBenefitsInput] = useState('');

  useEffect(() => {
    if (project) {
      setFormData(project);
      setBenefitsInput(project.benefits.join('\n'));
    } else {
      setFormData({
        id: `cp_${Date.now()}`,
        title: '',
        cropName: '',
        farmerName: '',
        location: '台南市麻豆區',
        image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80',
        targetShares: 50,
        currentShares: 0,
        pricePerShare: 3600,
        expectedYieldPerShare: '保證 4 箱 (每箱 5 斤，共 20 斤特級)',
        harvestSchedule: '預計 2026 秋季鮮採低溫直送',
        deliveryTimes: 2,
        benefits: [
          '專屬樹牌客製題字與認養證書',
          '產季盛夏分批次低溫直送到府',
          'SGS 381項無農藥殘留安心保證',
          '天然天災補償公積金全額守護'
        ],
        daysLeft: 30,
        description: ''
      });
      setBenefitsInput('專屬樹牌客製題字與認養證書\n產季盛夏分批次低溫直送到府\nSGS 381項無農藥殘留安心保證\n天然天災補償公積金全額守護');
    }
  }, [project, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim() || !formData.cropName?.trim() || !formData.farmerName?.trim()) {
      alert('請填寫專案標題、作物名稱與契作農友！');
      return;
    }

    const cleanedBenefits = benefitsInput
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const result: ContractProject = {
      id: formData.id || `cp_${Date.now()}`,
      title: formData.title || '',
      cropName: formData.cropName || '',
      farmerName: formData.farmerName || '',
      location: formData.location || '台灣產區',
      image: formData.image || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80',
      targetShares: Number(formData.targetShares) || 50,
      currentShares: Number(formData.currentShares) || 0,
      pricePerShare: Number(formData.pricePerShare) || 3000,
      expectedYieldPerShare: formData.expectedYieldPerShare || '依合約約定產量',
      harvestSchedule: formData.harvestSchedule || '產季成熟時出貨',
      deliveryTimes: Number(formData.deliveryTimes) || 1,
      benefits: cleanedBenefits.length > 0 ? cleanedBenefits : ['專屬認養證書與免運直送'],
      daysLeft: Number(formData.daysLeft) || 30,
      description: formData.description || '支持友善小農，建立穩定產銷連結。'
    };

    onSave(result);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 px-5 py-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-emerald-700/60 rounded-lg border border-emerald-500/30">
              <Sprout className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-serif">
                {project ? '編輯小農契作／果樹認養專案' : '發起新小農契作／果樹認養專案'}
              </h2>
              <p className="text-xs text-emerald-200/80">設定認養份額、採收期程、每株定價與專屬權益</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 sm:p-6 space-y-4 text-xs text-slate-700">
          {/* Project Title */}
          <div>
            <label className="block font-bold text-slate-800 mb-1">
              契作認養專案全稱 *
            </label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              placeholder="例如: 【2026秋收契作】台南麻豆50年老欉文旦柚樹一株認養 (尊榮採收專案)"
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg font-bold text-slate-900 focus:outline-emerald-600"
              required
            />
          </div>

          {/* Crop & Farmer & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">認養作物品項 *</label>
              <input
                type="text"
                value={formData.cropName || ''}
                onChange={e => setFormData({ ...formData, cropName: e.target.value })}
                placeholder="例如: 50年老欉文旦柚"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg font-bold text-slate-900 focus:outline-emerald-600"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1">代耕農友 / 班長 *</label>
              <input
                type="text"
                value={formData.farmerName || ''}
                onChange={e => setFormData({ ...formData, farmerName: e.target.value })}
                placeholder="例如: 張美蘭 班長"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-emerald-600"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1">產區鄉鎮</label>
              <input
                type="text"
                value={formData.location || ''}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                placeholder="例如: 台南市麻豆區"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-emerald-600"
              />
            </div>
          </div>

          {/* Pricing & Shares */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-200">
            <div>
              <label className="block font-bold text-emerald-950 mb-1">認養單價 (元/份或株) *</label>
              <input
                type="number"
                value={formData.pricePerShare || ''}
                onChange={e => setFormData({ ...formData, pricePerShare: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-white border border-emerald-300 rounded-lg font-mono font-bold text-emerald-900 focus:outline-emerald-600"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-emerald-950 mb-1">目標開放認養份額 *</label>
              <input
                type="number"
                value={formData.targetShares || ''}
                onChange={e => setFormData({ ...formData, targetShares: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-white border border-emerald-300 rounded-lg font-mono font-bold text-slate-900 focus:outline-emerald-600"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-emerald-950 mb-1">目前已認養份數</label>
              <input
                type="number"
                value={formData.currentShares || 0}
                onChange={e => setFormData({ ...formData, currentShares: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-white border border-emerald-300 rounded-lg font-mono font-bold text-emerald-700"
              />
            </div>
            <div>
              <label className="block font-bold text-emerald-950 mb-1">募資/認養剩餘天數</label>
              <input
                type="number"
                value={formData.daysLeft || 30}
                onChange={e => setFormData({ ...formData, daysLeft: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-white border border-emerald-300 rounded-lg font-mono font-bold text-amber-700"
              />
            </div>
          </div>

          {/* Expected Yield & Harvest Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-800 mb-1">預計每份保證產量與規格</label>
              <input
                type="text"
                value={formData.expectedYieldPerShare || ''}
                onChange={e => setFormData({ ...formData, expectedYieldPerShare: e.target.value })}
                placeholder="例如: 保證 4 箱 (每箱 5 斤，共 20 斤特級老欉)"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1">分批配送次數</label>
              <input
                type="number"
                value={formData.deliveryTimes || 1}
                onChange={e => setFormData({ ...formData, deliveryTimes: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">預計採收與出貨時程</label>
            <input
              type="text"
              value={formData.harvestSchedule || ''}
              onChange={e => setFormData({ ...formData, harvestSchedule: e.target.value })}
              placeholder="例如: 預計 2026 白露前一週 (約 8/28 - 9/02) 低溫冷藏直送"
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900"
            />
          </div>

          {/* Benefits */}
          <div>
            <label className="block font-bold text-slate-800 mb-1">
              專屬認養權益與尊榮好禮 (每行一項)
            </label>
            <textarea
              rows={4}
              value={benefitsInput}
              onChange={e => setBenefitsInput(e.target.value)}
              placeholder="每行輸入一項專屬權益，例如：&#10;落山風果園專屬樹牌懸掛與認養證書&#10;外銷日本等級大果保證，甜度達 15 度以上&#10;提供專屬賀卡代寫與企業 ESG 證明"
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 leading-relaxed"
            />
          </div>

          {/* Image & Description */}
          <div className="space-y-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">專案主視覺封面 (Unsplash / CDN URL)</label>
              <input
                type="url"
                value={formData.image || ''}
                onChange={e => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">契作故事與風土特色說明</label>
              <textarea
                rows={3}
                value={formData.description || ''}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                placeholder="介紹耕作理念、天然風土條件、無毒友善農法..."
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 leading-relaxed"
              />
            </div>
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
              <Sprout className="w-4 h-4" />
              <span>{project ? '儲存契作專案' : '確認發布契作專案'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
