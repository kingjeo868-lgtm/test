import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  ShoppingBag, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  QrCode, 
  X, 
  Star,
  Truck,
  Leaf,
  TreePine,
  Clock,
  Users,
  Gift,
  ArrowRight
} from 'lucide-react';
import { MOCK_PRODUCTS, MOCK_FARMERS, MOCK_TRACE_RECORDS, MOCK_CONTRACT_PROJECTS } from '../data/mockData';
import { Product, ProductTempZone, CertificationType, ContractProject } from '../types';

interface ShopCatalogProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  selectedProductModal: Product | null;
  onCloseProductModal: () => void;
  onJoinContract?: (project: ContractProject) => void;
  initialTab?: 'products' | 'contracts';
}

export const ShopCatalog: React.FC<ShopCatalogProps> = ({
  onSelectProduct,
  onAddToCart,
  selectedProductModal,
  onCloseProductModal,
  onJoinContract,
  initialTab = 'products'
}) => {
  const [shopSection, setShopSection] = useState<'products' | 'contracts'>(initialTab);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTemp, setSelectedTemp] = useState<string>('all');
  const [selectedCert, setSelectedCert] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc' | 'sales'>('featured');
  const [modalQty, setModalQty] = useState<number>(1);

  const categories = [
    { id: 'all', label: '全部商品' },
    { id: 'vegetable', label: '有機蔬菜' },
    { id: 'fruit', label: '節令水果' },
    { id: 'meat', label: '安心肉品' },
    { id: 'seafood', label: '生鮮水產' },
    { id: 'processed', label: '農會好物' }
  ];

  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesTemp = selectedTemp === 'all' || p.tempZone === selectedTemp;
    const matchesCert = selectedCert === 'all' || p.certifications.includes(selectedCert as CertificationType);
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.farmerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesTemp && matchesCert && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price_asc') return a.price - b.price;
    if (sortBy === 'price_desc') return b.price - a.price;
    if (sortBy === 'sales') return b.soldCount - a.soldCount;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  return (
    <div className="min-h-screen bg-slate-50/60 pb-16">
      
      {/* Top Banner Header - High Density */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white py-6 px-4 sm:px-6 lg:px-8 border-b border-emerald-900 shadow-xs">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-2 py-0.5 rounded border border-emerald-400/30">
                  產地直送 × 小農契作
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold font-serif">
                產地嚴選商城與契作認養
              </h1>
              <p className="text-emerald-200 text-xs mt-0.5 font-light">
                100% 通過產銷履歷與 381 項農藥殘留檢驗，新鮮直達餐桌
              </p>
            </div>

            {/* Shop Section Switcher Tabs */}
            <div className="bg-slate-900/90 p-1 rounded-xl border border-slate-700 flex items-center gap-1 self-start sm:self-auto">
              <button
                onClick={() => setShopSection('products')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  shopSection === 'products'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>產地現貨商城</span>
                <span className="text-[10px] bg-slate-800 px-1.5 py-0.2 rounded font-mono">
                  {MOCK_PRODUCTS.length}
                </span>
              </button>

              <button
                onClick={() => setShopSection('contracts')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  shopSection === 'contracts'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <TreePine className="w-3.5 h-3.5" />
                <span>小農契作與果樹認養</span>
                <span className="text-[10px] bg-amber-500 text-slate-950 font-bold px-1.5 py-0.2 rounded font-mono">
                  {MOCK_CONTRACT_PROJECTS.length} 案
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: 產地現貨商品 */}
      {shopSection === 'products' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 space-y-4">
          
          {/* Quick Contract Highlight Banner */}
          <div className="bg-gradient-to-r from-emerald-900/90 to-teal-900/90 text-white rounded-xl p-3 sm:p-4 border border-emerald-700/60 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-700 flex items-center justify-center shrink-0">
                <TreePine className="w-5 h-5 text-emerald-200" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold">
                  【小農契作專區】2026 第四季產地果樹認養與蔬菜箱開放預約！
                </h4>
                <p className="text-[11px] text-emerald-200">
                  跳過盤商中間轉手，直接與金牌小農簽約，享專屬掛牌與產季分批低溫直送。
                </p>
              </div>
            </div>
            <button
              onClick={() => setShopSection('contracts')}
              className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-lg transition-colors shrink-0 cursor-pointer shadow-2xs flex items-center gap-1"
            >
              <span>查看契作專案</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Filter and Search Bar */}
          <div className="bg-white rounded-xl border border-slate-200 p-3 sm:p-4 shadow-xs space-y-3">
            {/* Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sub Filters & Search */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2.5 border-t border-slate-100 text-xs">
              {/* Search */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="搜尋品名、產地或農民..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              {/* Temp Zone */}
              <select
                value={selectedTemp}
                onChange={(e) => setSelectedTemp(e.target.value)}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700 text-xs focus:outline-hidden cursor-pointer"
              >
                <option value="all">配送溫層：全部</option>
                <option value="normal">常溫商品</option>
                <option value="chilled">冷藏保鮮 (4°C)</option>
                <option value="frozen">冷凍急凍 (-18°C)</option>
              </select>

              {/* Certifications */}
              <select
                value={selectedCert}
                onChange={(e) => setSelectedCert(e.target.value)}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700 text-xs focus:outline-hidden cursor-pointer"
              >
                <option value="all">認證標章：全部</option>
                <option value="有機認證">有機認證</option>
                <option value="TAP產銷履歷">TAP產銷履歷</option>
                <option value="友善農法">友善農法</option>
                <option value="產地地理標章">產地地理標章</option>
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700 text-xs focus:outline-hidden cursor-pointer"
              >
                <option value="featured">推薦排序：精選推薦</option>
                <option value="sales">熱銷排行</option>
                <option value="price_asc">價格由低至高</option>
                <option value="price_desc">價格由高至低</option>
              </select>
            </div>
          </div>

          {/* Product Results Grid */}
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2.5">
              <span>共找到 <strong className="text-slate-900 font-bold">{filteredProducts.length}</strong> 件當季優質農產品</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all duration-150 cursor-pointer flex flex-col group"
                >
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                      {product.certifications.map((cert, idx) => (
                        <span
                          key={idx}
                          className="bg-emerald-800/90 text-white text-[10px] font-bold px-1.5 py-0.2 rounded shadow-2xs"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                    <div className="absolute bottom-2 right-2 bg-slate-950/75 text-white text-[10px] font-medium px-1.5 py-0.2 rounded">
                      {product.tempZone === 'chilled' ? '冷藏' : product.tempZone === 'frozen' ? '冷凍' : '常溫'}
                    </div>
                  </div>

                  <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <div className="flex items-center gap-1 text-[10px] text-emerald-800 font-medium mb-0.5">
                        <MapPin className="w-3 h-3" />
                        <span>{product.origin} ｜ {product.farmerName}</span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug line-clamp-2 group-hover:text-emerald-800 transition-colors">
                        {product.name}
                      </h3>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="text-sm sm:text-base font-black text-emerald-900 font-mono">
                          NT$ {product.price}
                          <span className="text-[10px] font-normal text-slate-500 ml-0.5">/ {product.unit}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 line-through font-mono">
                          原價 ${product.originalPrice}
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(product);
                        }}
                        className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs transition-colors cursor-pointer"
                        title="加入購物車"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: 小農契作與果樹認養 */}
      {shopSection === 'contracts' && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 space-y-4">
          <div className="text-center max-w-2xl mx-auto py-2">
            <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 font-serif">
              在地小農契作與年度果樹認養專案
            </h2>
            <p className="text-slate-600 text-xs mt-1">
              直接與產地金牌班長簽約，由小農為您專屬照料，產季分批鮮採直送，並享專屬名牌與果園探訪。
            </p>
          </div>

          <div className="space-y-4">
            {MOCK_CONTRACT_PROJECTS.map((project) => {
              const progressPercent = Math.round((project.currentShares / project.targetShares) * 100);

              return (
                <div
                  key={project.id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow grid grid-cols-1 lg:grid-cols-12"
                >
                  {/* Left Image Section (5 Cols) */}
                  <div className="lg:col-span-5 relative min-h-[200px] lg:min-h-full">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-emerald-800 text-white text-xs font-bold px-2.5 py-1 rounded shadow-2xs">
                      契作認養招募中
                    </div>
                    <div className="absolute bottom-3 left-3 bg-slate-900/85 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      {project.location} ｜ {project.farmerName}
                    </div>
                  </div>

                  {/* Right Details Section (7 Cols) */}
                  <div className="lg:col-span-7 p-4 sm:p-6 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Progress Bar */}
                      <div className="mt-3 pt-3 border-t border-slate-100">
                        <div className="flex justify-between text-xs font-bold mb-1">
                          <span className="text-emerald-800">
                            已認養 {project.currentShares} 份 / 目標 {project.targetShares} 份
                          </span>
                          <span className="text-emerald-700 font-mono">{progressPercent}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                            style={{ width: `${Math.min(100, progressPercent)}%` }}
                          ></div>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-slate-400 mt-1.5 font-mono">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-amber-500" /> 剩餘: {project.daysLeft} 天
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-emerald-600" /> {project.currentShares} 位認養人
                          </span>
                        </div>
                      </div>

                      {/* Benefits checklist */}
                      <div className="mt-3 bg-emerald-50/70 rounded-lg p-3 border border-emerald-200 space-y-1.5">
                        <div className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                          <Gift className="w-4 h-4 text-emerald-700" /> 契作專屬尊榮權益
                        </div>
                        <ul className="text-xs text-emerald-900 space-y-1">
                          {project.benefits.map((b, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Price and Join button */}
                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                      <div>
                        <div className="text-lg sm:text-2xl font-black text-emerald-900 font-mono">
                          NT$ {project.pricePerShare.toLocaleString()}
                          <span className="text-xs font-normal text-slate-500 ml-1">/ 份</span>
                        </div>
                        <div className="text-xs text-slate-500">
                          收穫期程：{project.harvestSchedule} (共配送 {project.deliveryTimes} 次)
                        </div>
                      </div>

                      <button
                        onClick={() => onJoinContract && onJoinContract(project)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 text-xs sm:text-sm cursor-pointer"
                      >
                        <span>立即參與契作認養</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl border border-slate-200">
            {/* Header / Close */}
            <div className="relative">
              <img
                src={selectedProductModal.image}
                alt={selectedProductModal.name}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={onCloseProductModal}
                className="absolute top-2.5 right-2.5 p-1.5 bg-slate-900/70 hover:bg-slate-900 text-white rounded-full transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <div className="absolute bottom-2 left-2.5 flex gap-1">
                {selectedProductModal.certifications.map((c, i) => (
                  <span key={i} className="bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded shadow-2xs">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 space-y-3">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] text-emerald-800 font-semibold">
                    <MapPin className="w-3 h-3" />
                    <span>產地：{selectedProductModal.origin} ({selectedProductModal.farmName})</span>
                  </div>
                  <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded font-mono">
                    規格: {selectedProductModal.weight}
                  </span>
                </div>
                <h2 className="text-base font-bold text-slate-900 mt-1">
                  {selectedProductModal.name}
                </h2>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {selectedProductModal.description}
                </p>
              </div>

              {/* Traceability Audit Info Card */}
              <div className="bg-emerald-50/80 border border-emerald-200 rounded-lg p-2.5 text-xs space-y-1">
                <div className="font-bold text-emerald-950 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    TAP 產銷履歷檢驗追溯合格
                  </span>
                  <span className="font-mono text-[10px] text-emerald-800 font-bold">
                    {selectedProductModal.traceCode}
                  </span>
                </div>
                <p className="text-emerald-800 text-[11px]">
                  採收日期：<strong>{selectedProductModal.harvestDate}</strong> ｜ 驗證機構：國立中興大學農產品驗證中心 ｜ 381項農藥殘留檢驗未檢出 (ND)。
                </p>
              </div>

              {/* Quantity and Price Footer */}
              <div className="flex items-center justify-between pt-2.5 border-t border-slate-200">
                <div>
                  <div className="text-lg font-black text-emerald-900 font-mono">
                    NT$ {selectedProductModal.price * modalQty}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    單價 NT$ {selectedProductModal.price} / {selectedProductModal.unit}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center border border-slate-300 rounded-md overflow-hidden text-xs">
                    <button
                      onClick={() => setModalQty(Math.max(1, modalQty - 1))}
                      className="px-2 py-1 bg-slate-100 hover:bg-slate-200 font-bold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-2.5 py-1 font-mono font-bold">{modalQty}</span>
                    <button
                      onClick={() => setModalQty(modalQty + 1)}
                      className="px-2 py-1 bg-slate-100 hover:bg-slate-200 font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      onAddToCart(selectedProductModal, modalQty);
                      onCloseProductModal();
                      setModalQty(1);
                    }}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-md shadow-2xs transition-colors flex items-center gap-1 text-xs cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>加入購物車</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
