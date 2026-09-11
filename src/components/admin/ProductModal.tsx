import React, { useState } from 'react';
import { X, Check, AlertCircle, Sparkles } from 'lucide-react';
import { Product, ProductTempZone, CertificationType } from '../../types';
import { MOCK_FARMERS } from '../../data/mockData';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  initialProduct?: Product | null;
}

const CATEGORY_OPTIONS = [
  { key: 'vegetable', name: '有機蔬菜' },
  { key: 'fruit', name: '節令水果' },
  { key: 'seafood', name: '安心水產' },
  { key: 'meat', name: '安心肉品' },
  { key: 'processed', name: '優質米糧/農會好物' },
  { key: 'gift', name: '小農精品禮盒' }
];

const CERT_OPTIONS: CertificationType[] = [
  '有機認證',
  'TAP產銷履歷',
  '友善農法',
  '吉園圃',
  '產地地理標章'
];

const PRESET_IMAGES = [
  { label: '特級高麗菜', url: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&auto=format&fit=crop&q=80' },
  { label: '愛文芒果', url: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&auto=format&fit=crop&q=80' },
  { label: '老欉文旦', url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=80' },
  { label: '無毒白蝦', url: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=800&auto=format&fit=crop&q=80' },
  { label: '段木香菇', url: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=800&auto=format&fit=crop&q=80' },
  { label: '富里御皇米', url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&auto=format&fit=crop&q=80' },
  { label: '梅花肉排', url: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&auto=format&fit=crop&q=80' },
  { label: '水果小黃瓜', url: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=800&auto=format&fit=crop&q=80' }
];

export const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialProduct
}) => {
  const isEditing = Boolean(initialProduct);

  const [formData, setFormData] = useState<Partial<Product>>(() => {
    if (initialProduct) {
      return { ...initialProduct };
    }
    return {
      name: '',
      category: 'vegetable',
      categoryName: '有機蔬菜',
      price: 120,
      originalPrice: 150,
      unit: '包',
      weight: '約 500g ± 10%',
      tempZone: 'chilled',
      certifications: ['TAP產銷履歷'],
      origin: '雲林縣西螺鎮',
      farmerId: MOCK_FARMERS[0].id,
      farmerName: MOCK_FARMERS[0].name,
      farmName: MOCK_FARMERS[0].farmName,
      stock: 50,
      soldCount: 0,
      rating: 5.0,
      reviewCount: 0,
      image: PRESET_IMAGES[0].url,
      description: '產地嚴選安心農產，符合農業部產銷履歷驗證規範。',
      harvestDate: new Date().toISOString().split('T')[0],
      traceCode: `TAP-108-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
      isSeasonalSpecial: false,
      featured: false
    };
  });

  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleFarmerChange = (farmerId: string) => {
    const found = MOCK_FARMERS.find(f => f.id === farmerId);
    if (found) {
      setFormData(prev => ({
        ...prev,
        farmerId: found.id,
        farmerName: found.name,
        farmName: found.farmName,
        origin: found.location,
        traceCode: `${found.traceabilityId}-${Math.floor(100 + Math.random() * 900)}`
      }));
    }
  };

  const handleCategoryChange = (catKey: any) => {
    const found = CATEGORY_OPTIONS.find(c => c.key === catKey);
    setFormData(prev => ({
      ...prev,
      category: catKey,
      categoryName: found ? found.name : '安心農產'
    }));
  };

  const toggleCertification = (cert: CertificationType) => {
    const cur = formData.certifications || [];
    if (cur.includes(cert)) {
      setFormData(prev => ({ ...prev, certifications: cur.filter(c => c !== cert) }));
    } else {
      setFormData(prev => ({ ...prev, certifications: [...cur, cert] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) {
      setErrorMsg('請輸入農產品名稱');
      return;
    }
    if (!formData.price || formData.price <= 0) {
      setErrorMsg('請填寫有效的商品售價');
      return;
    }

    const finalProduct: Product = {
      id: initialProduct?.id || `p_${Date.now()}`,
      name: formData.name || '',
      category: (formData.category as any) || 'vegetable',
      categoryName: formData.categoryName || '有機蔬菜',
      price: Number(formData.price) || 100,
      originalPrice: Number(formData.originalPrice) || Number(formData.price) || 120,
      unit: formData.unit || '份',
      weight: formData.weight || '500g',
      tempZone: (formData.tempZone as ProductTempZone) || 'chilled',
      certifications: formData.certifications || ['TAP產銷履歷'],
      origin: formData.origin || '台灣產地',
      farmerId: formData.farmerId || MOCK_FARMERS[0].id,
      farmerName: formData.farmerName || MOCK_FARMERS[0].name,
      farmName: formData.farmName || MOCK_FARMERS[0].farmName,
      stock: Number(formData.stock) || 0,
      soldCount: initialProduct?.soldCount || 0,
      rating: initialProduct?.rating || 5.0,
      reviewCount: initialProduct?.reviewCount || 0,
      image: formData.image || PRESET_IMAGES[0].url,
      description: formData.description || '',
      harvestDate: formData.harvestDate || new Date().toISOString().split('T')[0],
      traceCode: formData.traceCode || 'TAP-TW-2026-0001',
      isSeasonalSpecial: Boolean(formData.isSeasonalSpecial),
      featured: Boolean(formData.featured)
    };

    onSave(finalProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <h3 className="font-bold text-sm sm:text-base">
              {isEditing ? `編輯農產品：${initialProduct?.name}` : '新增上架農產品'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Basic Info */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                農產品全名 <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={e => {
                  setErrorMsg('');
                  setFormData(prev => ({ ...prev, name: e.target.value }));
                }}
                placeholder="例：西螺濁水溪特級有機高麗菜 (高山甘藍)"
                className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-emerald-600 font-medium"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  所屬作物分類
                </label>
                <select
                  value={formData.category || 'vegetable'}
                  onChange={e => handleCategoryChange(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-emerald-600"
                >
                  {CATEGORY_OPTIONS.map(c => (
                    <option key={c.key} value={c.key}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  合作小農 / 產銷班
                </label>
                <select
                  value={formData.farmerId || MOCK_FARMERS[0].id}
                  onChange={e => handleFarmerChange(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-emerald-600"
                >
                  {MOCK_FARMERS.map(f => (
                    <option key={f.id} value={f.id}>{f.name} ({f.farmName} - {f.location})</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  會員售價 (NT$) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.price || ''}
                  onChange={e => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-emerald-950"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  市價原價 (NT$)
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.originalPrice || ''}
                  onChange={e => setFormData(prev => ({ ...prev, originalPrice: Number(e.target.value) }))}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  包裝單位 (粒/袋/箱)
                </label>
                <input
                  type="text"
                  value={formData.unit || '份'}
                  onChange={e => setFormData(prev => ({ ...prev, unit: e.target.value }))}
                  placeholder="顆 / 盒 / 箱"
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  目前庫存數量
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.stock !== undefined ? formData.stock : 50}
                  onChange={e => setFormData(prev => ({ ...prev, stock: Number(e.target.value) }))}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  冷鏈溫層規格
                </label>
                <select
                  value={formData.tempZone || 'chilled'}
                  onChange={e => setFormData(prev => ({ ...prev, tempZone: e.target.value as ProductTempZone }))}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-emerald-600 font-semibold"
                >
                  <option value="normal">常溫配送 (Normal 15-25℃)</option>
                  <option value="chilled">低溫冷藏 (Chilled 0-7℃)</option>
                  <option value="frozen">極低溫急凍 (Frozen -18℃)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  規格重量描述
                </label>
                <input
                  type="text"
                  value={formData.weight || ''}
                  onChange={e => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                  placeholder="例：約 1.2kg ± 10%"
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>
            </div>

            {/* Traceability and Certifications */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2.5">
              <div className="text-xs font-bold text-slate-800 flex items-center justify-between">
                <span>農業部認證標章與產銷履歷追溯碼</span>
                <span className="text-[10px] text-emerald-700">通過檢核即自動串接溯源平台</span>
              </div>
              
              <div className="flex flex-wrap gap-1.5">
                {CERT_OPTIONS.map(cert => {
                  const isSelected = formData.certifications?.includes(cert);
                  return (
                    <button
                      key={cert}
                      type="button"
                      onClick={() => toggleCertification(cert)}
                      className={`px-2.5 py-1 rounded-md text-xs font-semibold border transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs' 
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 inline mr-1" />}
                      {cert}
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                    TAP產銷履歷號碼
                  </label>
                  <input
                    type="text"
                    value={formData.traceCode || ''}
                    onChange={e => setFormData(prev => ({ ...prev, traceCode: e.target.value }))}
                    placeholder="例：TAP-108-0921-8872-C01"
                    className="w-full text-xs font-mono px-2.5 py-1.5 bg-white border border-slate-200 rounded-md text-emerald-950 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                    採收與包裝日期
                  </label>
                  <input
                    type="date"
                    value={formData.harvestDate || ''}
                    onChange={e => setFormData(prev => ({ ...prev, harvestDate: e.target.value }))}
                    className="w-full text-xs font-mono px-2.5 py-1.5 bg-white border border-slate-200 rounded-md"
                  />
                </div>
              </div>
            </div>

            {/* Product Image & Description */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                商品代表照片 (可選擇預設或自訂 URL)
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {PRESET_IMAGES.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, image: img.url }))}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium border transition-colors cursor-pointer ${
                      formData.image === img.url 
                        ? 'bg-slate-900 text-white border-slate-900' 
                        : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {img.label}
                  </button>
                ))}
              </div>
              <input
                type="url"
                value={formData.image || ''}
                onChange={e => setFormData(prev => ({ ...prev, image: e.target.value }))}
                placeholder="https://..."
                className="w-full text-xs font-mono px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                商品產地簡介與口感特色
              </label>
              <textarea
                rows={2}
                value={formData.description || ''}
                onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="描述其土壤特質、農法堅持、甜度與口感..."
                className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-emerald-600"
              />
            </div>

            {/* Flags */}
            <div className="flex items-center gap-4 pt-1">
              <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(formData.featured)}
                  onChange={e => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="font-semibold">設為首頁推薦熱銷品</span>
              </label>
              <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(formData.isSeasonalSpecial)}
                  onChange={e => setFormData(prev => ({ ...prev, isSeasonalSpecial: e.target.checked }))}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="font-semibold">節令當季主打限量</span>
              </label>
            </div>

          </div>

          {/* Modal Footer */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-500 shadow-2xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{isEditing ? '儲存更新資料' : '確定新增上架'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
