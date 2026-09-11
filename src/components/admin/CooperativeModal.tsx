import React, { useState, useEffect } from 'react';
import { X, Building2, MapPin, Phone, Mail, Award, Truck, Users, Sprout, ShieldCheck } from 'lucide-react';
import { CooperativeItem, CooperativeType, RegionZone } from '../../types';

interface CooperativeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (coop: CooperativeItem) => void;
  coop: CooperativeItem | null;
}

export const CooperativeModal: React.FC<CooperativeModalProps> = ({
  isOpen,
  onClose,
  onSave,
  coop
}) => {
  const [formData, setFormData] = useState<Partial<CooperativeItem>>({
    coopCode: '',
    supplierCode: '',
    name: '',
    shortName: '',
    type: 'production',
    typeName: '農業生產合作社',
    region: 'central',
    county: '雲林縣西螺鎮',
    address: '',
    leaderTitle: '理事主席',
    leaderName: '',
    contactPhone: '',
    contactEmail: '',
    memberCount: 50,
    farmAreaHectare: 100,
    annualVolumeTons: 2000,
    mainCrops: [],
    certifications: ['TAP產銷履歷'],
    coldChainFacilities: [],
    establishedYear: 2000,
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80',
    story: '',
    isExemplary: false,
    awardTitle: '',
    contractProductsCount: 5
  });

  const [cropsInput, setCropsInput] = useState('');
  const [certsInput, setCertsInput] = useState('');
  const [facilitiesInput, setFacilitiesInput] = useState('');

  useEffect(() => {
    if (coop) {
      setFormData(coop);
      setCropsInput(coop.mainCrops.join('、'));
      setCertsInput(coop.certifications.join('、'));
      setFacilitiesInput(coop.coldChainFacilities.join('、'));
    } else {
      const newId = `coop_${Date.now()}`;
      setFormData({
        id: newId,
        coopCode: `TFA-COOP-${Math.floor(1000 + Math.random() * 9000)}`,
        supplierCode: `${Math.floor(10 + Math.random() * 89)}-${Math.floor(100 + Math.random() * 899)}`,
        name: '',
        shortName: '',
        type: 'production',
        typeName: '農業生產合作社',
        region: 'central',
        county: '雲林縣西螺鎮',
        address: '',
        leaderTitle: '理事主席',
        leaderName: '',
        contactPhone: '',
        contactEmail: '',
        memberCount: 60,
        farmAreaHectare: 120,
        annualVolumeTons: 3000,
        mainCrops: ['有機高麗菜', '小黃瓜'],
        certifications: ['TAP產銷履歷', '有機驗證'],
        coldChainFacilities: ['冷藏預冷庫 (0-4°C)', '自動化分級包裝線'],
        establishedYear: 2010,
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
        story: '',
        isExemplary: false,
        awardTitle: '',
        contractProductsCount: 6
      });
      setCropsInput('有機高麗菜、小黃瓜');
      setCertsInput('TAP產銷履歷、有機驗證');
      setFacilitiesInput('冷藏預冷庫 (0-4°C)、自動化分級包裝線');
    }
  }, [coop, isOpen]);

  if (!isOpen) return null;

  const typeNameMap: Record<CooperativeType, string> = {
    production: '農業生產合作社',
    marketing: '蔬果運銷合作社',
    class: '農業產銷班',
    tea: '茶葉運銷合作社',
    organic_flower: '有機與花卉合作社',
    aquaculture: '水產養殖合作社',
    livestock: '優質畜牧合作社'
  };

  const handleTypeChange = (t: CooperativeType) => {
    setFormData(prev => ({
      ...prev,
      type: t,
      typeName: typeNameMap[t]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim() || !formData.leaderName?.trim()) {
      alert('請填寫合作社全名與主要負責人姓名！');
      return;
    }

    const cleanedCrops = cropsInput
      .split(/[,、，]/)
      .map(s => s.trim())
      .filter(Boolean);

    const cleanedCerts = certsInput
      .split(/[,、，]/)
      .map(s => s.trim())
      .filter(Boolean);

    const cleanedFacilities = facilitiesInput
      .split(/[,、，]/)
      .map(s => s.trim())
      .filter(Boolean);

    const result: CooperativeItem = {
      id: formData.id || `coop_${Date.now()}`,
      coopCode: formData.coopCode || `TFA-COOP-6301`,
      supplierCode: formData.supplierCode || '63-019',
      name: formData.name || '',
      shortName: formData.shortName || formData.name?.slice(0, 10) || '',
      type: formData.type || 'production',
      typeName: formData.typeName || '農業生產合作社',
      region: formData.region || 'central',
      county: formData.county || '雲林縣西螺鎮',
      address: formData.address || '',
      leaderTitle: formData.leaderTitle || '理事主席',
      leaderName: formData.leaderName || '',
      contactPhone: formData.contactPhone || '',
      contactEmail: formData.contactEmail || '',
      memberCount: Number(formData.memberCount) || 30,
      farmAreaHectare: Number(formData.farmAreaHectare) || 50,
      annualVolumeTons: Number(formData.annualVolumeTons) || 1000,
      mainCrops: cleanedCrops.length > 0 ? cleanedCrops : ['優質農特產'],
      certifications: cleanedCerts.length > 0 ? cleanedCerts : ['TAP產銷履歷'],
      coldChainFacilities: cleanedFacilities.length > 0 ? cleanedFacilities : ['雙溫層低溫保鮮庫'],
      establishedYear: Number(formData.establishedYear) || 2015,
      image: formData.image || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
      story: formData.story || '堅持友善土地，結合在地小農共同運銷，落實產銷履歷與冷鏈保鮮。',
      isExemplary: Boolean(formData.isExemplary),
      awardTitle: formData.awardTitle || '',
      contractProductsCount: Number(formData.contractProductsCount) || 5
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
              <Building2 className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-serif">
                {coop ? '編輯農業合作社／產銷班社場資料' : '新增農業合作社／產銷班'}
              </h2>
              <p className="text-xs text-emerald-200/80">維護全台農業合作社組織、供貨代號、冷鏈設備與主要作物</p>
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
          {/* Top Key Codes & Type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                合作社代碼 (Coop Code) *
              </label>
              <input
                type="text"
                value={formData.coopCode || ''}
                onChange={e => setFormData({ ...formData, coopCode: e.target.value })}
                placeholder="例如: TFA-COOP-6301"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-emerald-800 focus:outline-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                批發市場供應人代號 *
              </label>
              <input
                type="text"
                value={formData.supplierCode || ''}
                onChange={e => setFormData({ ...formData, supplierCode: e.target.value })}
                placeholder="例如: 63-019"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-slate-800 focus:outline-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                組織類型 *
              </label>
              <select
                value={formData.type || 'production'}
                onChange={e => handleTypeChange(e.target.value as CooperativeType)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg font-medium text-slate-800 focus:outline-emerald-500"
              >
                <option value="production">農業生產合作社</option>
                <option value="marketing">蔬果運銷合作社</option>
                <option value="class">農業產銷班</option>
                <option value="tea">茶葉運銷合作社</option>
                <option value="organic_flower">有機與花卉合作社</option>
                <option value="aquaculture">水產養殖合作社</option>
                <option value="livestock">優質畜牧合作社</option>
              </select>
            </div>
          </div>

          {/* Names */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-800 mb-1">
                合作社／產銷班完整全稱 *
              </label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="例如: 雲林縣西螺有機蔬菜產銷運銷合作社"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg font-medium text-slate-900 focus:outline-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                前台顯示簡稱
              </label>
              <input
                type="text"
                value={formData.shortName || ''}
                onChange={e => setFormData({ ...formData, shortName: e.target.value })}
                placeholder="例如: 西螺有機蔬菜合作社"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg font-medium text-slate-900 focus:outline-emerald-500"
              />
            </div>
          </div>

          {/* Location & Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">所屬分區</label>
              <select
                value={formData.region || 'central'}
                onChange={e => setFormData({ ...formData, region: e.target.value as RegionZone })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-emerald-500"
              >
                <option value="north">北部地區 (北基桃竹苗)</option>
                <option value="central">中部地區 (中彰投雲)</option>
                <option value="south">南部地區 (嘉南高屏)</option>
                <option value="east">東部地區 (宜花東)</option>
                <option value="islands">外島離島地區</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1">縣市鄉鎮 *</label>
              <input
                type="text"
                value={formData.county || ''}
                onChange={e => setFormData({ ...formData, county: e.target.value })}
                placeholder="例如: 雲林縣西螺鎮"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-emerald-500"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-800 mb-1">社址 / 通訊地址</label>
              <input
                type="text"
                value={formData.address || ''}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
                placeholder="例如: 雲林縣西螺鎮福興里福興路 88 號"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-emerald-500"
              />
            </div>
          </div>

          {/* Leaders & Contacts */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div>
              <label className="block font-bold text-slate-800 mb-1">負責人職稱</label>
              <input
                type="text"
                value={formData.leaderTitle || ''}
                onChange={e => setFormData({ ...formData, leaderTitle: e.target.value })}
                placeholder="理事主席 / 班長 / 總幹事"
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-800"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1">負責人姓名 *</label>
              <input
                type="text"
                value={formData.leaderName || ''}
                onChange={e => setFormData({ ...formData, leaderName: e.target.value })}
                placeholder="例如: 陳健興 (神農獎得主)"
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-bold text-slate-900"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1">聯絡電話</label>
              <input
                type="text"
                value={formData.contactPhone || ''}
                onChange={e => setFormData({ ...formData, contactPhone: e.target.value })}
                placeholder="05-586-2218"
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-800"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1">電子信箱</label>
              <input
                type="email"
                value={formData.contactEmail || ''}
                onChange={e => setFormData({ ...formData, contactEmail: e.target.value })}
                placeholder="coop@haonongark.tw"
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-800"
              />
            </div>
          </div>

          {/* Scale & Capacity */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">社員/班員人數</label>
              <input
                type="number"
                value={formData.memberCount || ''}
                onChange={e => setFormData({ ...formData, memberCount: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg font-medium text-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1">耕作總面積 (公頃)</label>
              <input
                type="number"
                step="0.1"
                value={formData.farmAreaHectare || ''}
                onChange={e => setFormData({ ...formData, farmAreaHectare: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg font-medium text-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1">年供貨量 (公噸)</label>
              <input
                type="number"
                value={formData.annualVolumeTons || ''}
                onChange={e => setFormData({ ...formData, annualVolumeTons: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg font-medium text-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1">創立年份</label>
              <input
                type="number"
                value={formData.establishedYear || ''}
                onChange={e => setFormData({ ...formData, establishedYear: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg font-medium text-slate-900"
              />
            </div>
          </div>

          {/* Main Crops, Certs & Cold Chain (Comma separated) */}
          <div className="space-y-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                主要代表作物 (以「、」或逗號分隔)
              </label>
              <input
                type="text"
                value={cropsInput}
                onChange={e => setCropsInput(e.target.value)}
                placeholder="例如: 有機高麗菜、小松菜、水果小黃瓜、有機地瓜葉"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                品質驗證與標章 (以「、」或逗號分隔)
              </label>
              <input
                type="text"
                value={certsInput}
                onChange={e => setCertsInput(e.target.value)}
                placeholder="例如: TAP產銷履歷、國立中興大學有機認證、GLOBALG.A.P."
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                冷鏈與分級設備 (以「、」或逗號分隔)
              </label>
              <input
                type="text"
                value={facilitiesInput}
                onChange={e => setFacilitiesInput(e.target.value)}
                placeholder="例如: 1200坪智慧立體冷藏庫 (0-4°C)、真空急速預冷機、光波糖度選果機"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900"
              />
            </div>
          </div>

          {/* Exemplary & Award */}
          <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <label className="flex items-center space-x-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(formData.isExemplary)}
                onChange={e => setFormData({ ...formData, isExemplary: e.target.checked })}
                className="w-4 h-4 text-emerald-600 rounded"
              />
              <span className="font-bold text-amber-950">標記為「全國特優等示範社場 / 全國績優產銷班」</span>
            </label>
            <div className="flex-1 sm:max-w-xs">
              <input
                type="text"
                value={formData.awardTitle || ''}
                onChange={e => setFormData({ ...formData, awardTitle: e.target.value })}
                placeholder="獲獎名銜 (例如: 農業部全國特優等示範合作社)"
                className="w-full px-2.5 py-1 bg-white border border-amber-300 rounded-lg text-[11px] text-amber-950 placeholder-amber-700/50"
              />
            </div>
          </div>

          {/* Image & Story */}
          <div className="space-y-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">封面圖片網址 (Unsplash / CDN URL)</label>
              <input
                type="url"
                value={formData.image || ''}
                onChange={e => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">合作社風土簡介與產地故事</label>
              <textarea
                rows={3}
                value={formData.story || ''}
                onChange={e => setFormData({ ...formData, story: e.target.value })}
                placeholder="描述產地氣候、土壤特點、社員共同運銷理念與冷鏈品質把關..."
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 leading-relaxed"
              />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end space-x-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-all cursor-pointer"
            >
              取消返回
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{coop ? '儲存更新社場資料' : '確認新增合作社場'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
