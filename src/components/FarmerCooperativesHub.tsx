import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Sprout, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Award, 
  FileText, 
  Download, 
  GraduationCap, 
  Calendar, 
  Clock, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Search, 
  Filter, 
  ChevronRight, 
  ExternalLink, 
  Truck, 
  Layers, 
  TrendingUp, 
  Check, 
  HelpCircle, 
  BookOpen, 
  Send, 
  AlertCircle,
  X,
  Compass,
  Briefcase,
  TreePine,
  Leaf,
  QrCode,
  UserCheck,
  Camera,
  Share2,
  Gift,
  CheckCircle,
  Copy
} from 'lucide-react';
import { 
  CooperativeItem, 
  SubsidyItem, 
  AcademyCourse, 
  CooperativeApplication, 
  RegionZone, 
  CooperativeType,
  ViewMode,
  TraceRecord,
  ContractProject,
  Product
} from '../types';
import { 
  MOCK_COOPERATIVES, 
  MOCK_SUBSIDIES, 
  MOCK_ACADEMY_COURSES, 
  MOCK_COOPERATIVE_APPLICATIONS,
  MOCK_TRACE_RECORDS,
  MOCK_CONTRACT_PROJECTS,
  MOCK_PRODUCTS
} from '../data/mockData';

export type FarmerHubTab = 
  | 'directory' 
  | 'trace' 
  | 'contract' 
  | 'transformation' 
  | 'subsidies' 
  | 'b2b_matching' 
  | 'academy' 
  | 'apply';

interface FarmerCooperativesHubProps {
  onNavigate: (view: ViewMode) => void;
  onNavigateContract?: () => void;
  onNavigateShop?: () => void;
  initialTab?: FarmerHubTab;
  onJoinContract?: (project: ContractProject) => void;
  onAddToCart?: (product: Product, quantity?: number) => void;
}

export const FarmerCooperativesHub: React.FC<FarmerCooperativesHubProps> = ({
  onNavigate,
  onNavigateContract,
  onNavigateShop,
  initialTab = 'directory',
  onJoinContract,
  onAddToCart
}) => {
  const [activeTab, setActiveTab] = useState<FarmerHubTab>(initialTab);
  
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Directory state
  const [selectedRegion, setSelectedRegion] = useState<RegionZone>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedCoopModal, setSelectedCoopModal] = useState<CooperativeItem | null>(null);

  // Traceability State (產銷溯源)
  const [traceSearchCode, setTraceSearchCode] = useState<string>('TAP-108-0921-8872-C01');
  const [currentTraceRecord, setCurrentTraceRecord] = useState<TraceRecord | null>(
    MOCK_TRACE_RECORDS['TAP-108-0921-8872-C01'] || null
  );
  const [traceErrorMessage, setTraceErrorMessage] = useState<string>('');
  const [isScanningQr, setIsScanningQr] = useState<boolean>(false);
  const [copyCodeSuccess, setCopyCodeSuccess] = useState<boolean>(false);

  // Contract Farming State (小農契作與果樹認養)
  const [contractFilter, setContractFilter] = useState<'all' | 'fruit' | 'tea' | 'vegetable' | 'seafood'>('all');
  const [selectedContractModal, setSelectedContractModal] = useState<ContractProject | null>(null);
  const [adoptShares, setAdoptShares] = useState<number>(1);
  const [adoptForm, setAdoptForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    treeNameplate: '闔家平安 幸福豐收',
    notes: ''
  });
  const [adoptSuccessCert, setAdoptSuccessCert] = useState<{
    certNo: string;
    projectTitle: string;
    shares: number;
    totalAmount: number;
    adopterName: string;
    treeNameplate: string;
    harvestSchedule: string;
    farmerName: string;
    location: string;
  } | null>(null);

  // Subsidy state
  const [selectedSubsidyModal, setSelectedSubsidyModal] = useState<SubsidyItem | null>(null);
  const [subsidyCalculatedAmt, setSubsidyCalculatedAmt] = useState<number | null>(null);
  const [estCost, setEstCost] = useState<string>('1500000');

  // Academy state
  const [selectedCourseModal, setSelectedCourseModal] = useState<AcademyCourse | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);
  const [courseForm, setCourseForm] = useState({ name: '', phone: '', email: '', farmName: '' });
  const [enrollSuccessMsg, setEnrollSuccessMsg] = useState<string | null>(null);

  // Application form state
  const [appForm, setAppForm] = useState({
    applicantType: 'production_class' as 'individual_farmer' | 'production_class' | 'cooperative' | 'agri_enterprise',
    contactName: '',
    contactTitle: '班長/理事主席',
    idOrTaxId: '',
    phone: '',
    email: '',
    orgName: '',
    countyCity: '雲林縣',
    landAddress: '',
    farmArea: '',
    mainCrops: '',
    certifications: [] as string[],
    targetCollaboration: [] as string[],
    coldChainNeeds: ''
  });
  const [submittedApplication, setSubmittedApplication] = useState<CooperativeApplication | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle Trace Search
  const handleTraceSearch = (codeToSearch?: string) => {
    const code = (codeToSearch || traceSearchCode).trim();
    if (MOCK_TRACE_RECORDS[code]) {
      setCurrentTraceRecord(MOCK_TRACE_RECORDS[code]);
      setTraceErrorMessage('');
      setTraceSearchCode(code);
    } else {
      setTraceErrorMessage(`查無「${code}」產銷履歷追溯條碼，請確認編號格式（例如: TAP-108-0921-8872-C01）`);
      setCurrentTraceRecord(null);
    }
  };

  const handleSimulateQrScan = () => {
    setIsScanningQr(true);
    setTimeout(() => {
      const sampleCodes = Object.keys(MOCK_TRACE_RECORDS);
      const randomCode = sampleCodes[Math.floor(Math.random() * sampleCodes.length)];
      setTraceSearchCode(randomCode);
      setCurrentTraceRecord(MOCK_TRACE_RECORDS[randomCode]);
      setTraceErrorMessage('');
      setIsScanningQr(false);
    }, 1500);
  };

  const handleCopyTraceCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopyCodeSuccess(true);
    setTimeout(() => setCopyCodeSuccess(false), 2000);
  };

  // Handle Contract Adoption Submission
  const handleAdoptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContractModal) return;
    if (!adoptForm.name || !adoptForm.phone || !adoptForm.address) {
      alert('請填寫完整認養人姓名、聯絡電話與配送地址');
      return;
    }
    const certNo = `TFA-ADOPT-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const total = selectedContractModal.pricePerShare * adoptShares;
    
    setAdoptSuccessCert({
      certNo,
      projectTitle: selectedContractModal.title,
      shares: adoptShares,
      totalAmount: total,
      adopterName: adoptForm.name,
      treeNameplate: adoptForm.treeNameplate || '闔家平安 幸福豐收',
      harvestSchedule: selectedContractModal.harvestSchedule,
      farmerName: selectedContractModal.farmerName,
      location: selectedContractModal.location
    });

    if (onJoinContract) {
      onJoinContract(selectedContractModal);
    }
  };

  // Filter cooperatives
  const filteredCooperatives = MOCK_COOPERATIVES.filter(coop => {
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

  // Filter contract projects
  const filteredContractProjects = MOCK_CONTRACT_PROJECTS.filter(cp => {
    if (contractFilter === 'all') return true;
    if (contractFilter === 'fruit') return cp.cropName.includes('柚') || cp.cropName.includes('芒果') || cp.cropName.includes('果');
    if (contractFilter === 'tea') return cp.cropName.includes('茶');
    if (contractFilter === 'vegetable') return cp.cropName.includes('菜') || cp.cropName.includes('蔬');
    if (contractFilter === 'seafood') return cp.cropName.includes('蝦') || cp.cropName.includes('魚') || cp.cropName.includes('水產');
    return true;
  });

  const handleCourseEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourseModal) return;
    if (!courseForm.name || !courseForm.phone) {
      alert('請填寫姓名與聯絡電話');
      return;
    }
    setEnrolledCourses(prev => [...prev, selectedCourseModal.id]);
    setEnrollSuccessMsg(`報名成功！已為 ${courseForm.name} 預約「${selectedCourseModal.title}」席位，確認簡訊與視訊連結已發送至 ${courseForm.phone}。`);
    setTimeout(() => {
      setSelectedCourseModal(null);
      setEnrollSuccessMsg(null);
      setCourseForm({ name: '', phone: '', email: '', farmName: '' });
    }, 2800);
  };

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appForm.contactName || !appForm.phone || !appForm.orgName) {
      alert('請填寫聯絡人、電話與社場/農場名稱');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const newApp: CooperativeApplication = {
        id: `app_${Date.now()}`,
        applyNo: `TFA-APPLY-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`,
        applicantType: appForm.applicantType,
        applicantTypeName: 
          appForm.applicantType === 'production_class' ? '農業產銷班' :
          appForm.applicantType === 'cooperative' ? '農業合作社' :
          appForm.applicantType === 'individual_farmer' ? '獨立農友' : '農業企業',
        contactName: appForm.contactName,
        contactTitle: appForm.contactTitle,
        idOrTaxId: appForm.idOrTaxId || '審查中',
        phone: appForm.phone,
        email: appForm.email || '無提供',
        orgName: appForm.orgName,
        countyCity: appForm.countyCity,
        landAddress: appForm.landAddress || '依登記地號',
        farmArea: appForm.farmArea || '未填寫',
        mainCrops: appForm.mainCrops || '多樣蔬果',
        certifications: appForm.certifications,
        targetCollaboration: appForm.targetCollaboration,
        coldChainNeeds: appForm.coldChainNeeds || '待產地專員電洽評估',
        applyDate: new Date().toISOString().slice(0, 10),
        status: 'submitted'
      };
      setSubmittedApplication(newApp);
      setIsSubmitting(false);
    }, 900);
  };

  const toggleCert = (cert: string) => {
    setAppForm(prev => {
      const exists = prev.certifications.includes(cert);
      return {
        ...prev,
        certifications: exists 
          ? prev.certifications.filter(c => c !== cert)
          : [...prev.certifications, cert]
      };
    });
  };

  const toggleCollab = (collab: string) => {
    setAppForm(prev => {
      const exists = prev.targetCollaboration.includes(collab);
      return {
        ...prev,
        targetCollaboration: exists 
          ? prev.targetCollaboration.filter(c => c !== collab)
          : [...prev.targetCollaboration, collab]
      };
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16 font-sans">
      
      {/* 1. Header Banner & Agri-Hub Identity */}
      <section className="bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 text-white relative overflow-hidden py-12 sm:py-16 border-b border-emerald-800/40">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-semibold tracking-wide mb-3 backdrop-blur-md">
                <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>台灣農業合作社聯合社 (TFA) 授權合作專區</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold font-serif tracking-tight text-white mb-3 leading-tight">
                農友社場與產銷輔導中樞
              </h1>
              <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
                匯聚全台逾 680 家優質農業合作社、產銷班與神農獎農友。提供全台社場地圖、產銷班轉型法人輔導、冷鏈設備補助申辦、共同運銷體系與農民學院專業培訓，搭起產地與市場最穩固的永續方舟。
              </p>
            </div>

            {/* Quick Summary Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4 shrink-0 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
              <div className="text-center p-2">
                <div className="text-xl sm:text-2xl font-mono font-extrabold text-emerald-400">680+</div>
                <div className="text-[11px] text-emerald-200/80 mt-0.5">全台合作社場</div>
              </div>
              <div className="text-center p-2 border-l border-white/10">
                <div className="text-xl sm:text-2xl font-mono font-extrabold text-amber-400">12,500+</div>
                <div className="text-[11px] text-amber-200/80 mt-0.5">契作面積 (公頃)</div>
              </div>
              <div className="text-center p-2 border-l border-white/10">
                <div className="text-xl sm:text-2xl font-mono font-extrabold text-teal-300">98.6%</div>
                <div className="text-[11px] text-teal-100/80 mt-0.5">冷鏈不斷鏈覆蓋</div>
              </div>
              <div className="text-center p-2 border-l border-white/10">
                <div className="text-xl sm:text-2xl font-mono font-extrabold text-cyan-300">2,400+</div>
                <div className="text-[11px] text-cyan-100/80 mt-0.5">青農與班員培訓</div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs Bar */}
          <div className="mt-8 pt-4 border-t border-emerald-800/60 flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
            <button
              onClick={() => setActiveTab('directory')}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'directory'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-white/10 text-emerald-100 hover:bg-white/15'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>全台合作社場名錄</span>
            </button>

            <button
              onClick={() => setActiveTab('trace')}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'trace'
                  ? 'bg-emerald-400 text-slate-950 shadow-md shadow-emerald-400/25 ring-2 ring-emerald-300/50'
                  : 'bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 hover:bg-emerald-500/30'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>產銷溯源與履歷查詢</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-900/60 text-emerald-200 ml-0.5">TAP</span>
            </button>

            <button
              onClick={() => setActiveTab('contract')}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'contract'
                  ? 'bg-emerald-400 text-slate-950 shadow-md shadow-emerald-400/25 ring-2 ring-emerald-300/50'
                  : 'bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 hover:bg-emerald-500/30'
              }`}
            >
              <TreePine className="w-4 h-4 text-amber-300" />
              <span>小農契作與果樹認養</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/30 text-amber-200 ml-0.5">熱門</span>
            </button>

            <button
              onClick={() => setActiveTab('transformation')}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'transformation'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-white/10 text-emerald-100 hover:bg-white/15'
              }`}
            >
              <Sprout className="w-4 h-4" />
              <span>產銷班轉型合作社指南</span>
            </button>

            <button
              onClick={() => setActiveTab('subsidies')}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'subsidies'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-white/10 text-emerald-100 hover:bg-white/15'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>農業設施與冷鏈補助</span>
            </button>

            <button
              onClick={() => setActiveTab('b2b_matching')}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'b2b_matching'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-white/10 text-emerald-100 hover:bg-white/15'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>共同運銷與企業綠色契作</span>
            </button>

            <button
              onClick={() => setActiveTab('academy')}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'academy'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-white/10 text-emerald-100 hover:bg-white/15'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>農民學院培訓課程</span>
            </button>

            <button
              onClick={() => setActiveTab('apply')}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'apply'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/30'
                  : 'bg-amber-400/20 text-amber-300 border border-amber-400/40 hover:bg-amber-400/30'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>入會申請 / 供貨上架登錄</span>
            </button>
          </div>

        </div>
      </section>

      {/* Main Tab Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* TAB 1: 全台合作社場與產銷班名錄 */}
        {activeTab === 'directory' && (
          <div className="space-y-6">
            
            {/* Search & Filter Header Bar */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-2xs">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
                
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="搜尋合作社名稱、主要作物 (如文旦、愛文芒果、高麗菜)、產區或代號..."
                    className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                  />
                  {searchKeyword && (
                    <button 
                      onClick={() => setSearchKeyword('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Region Filter Buttons */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
                  {[
                    { key: 'all', label: '全台灣' },
                    { key: 'north', label: '北部' },
                    { key: 'central', label: '中部' },
                    { key: 'south', label: '南部' },
                    { key: 'east', label: '東部' },
                  ].map(r => (
                    <button
                      key={r.key}
                      onClick={() => setSelectedRegion(r.key as RegionZone)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                        selectedRegion === r.key
                          ? 'bg-emerald-800 text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>

                {/* Type Filter Select */}
                <div className="shrink-0">
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full md:w-auto px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-700 cursor-pointer"
                  >
                    <option value="all">全產業類型 (全部社場)</option>
                    <option value="production">農業生產合作社</option>
                    <option value="marketing">蔬果運銷合作社</option>
                    <option value="class">農業產銷班</option>
                    <option value="tea">茶葉運銷合作社</option>
                    <option value="aquaculture">水產養殖合作社</option>
                    <option value="livestock">優質畜牧合作社</option>
                  </select>
                </div>

              </div>

              {/* Status Counter Bar */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
                <div>
                  已顯示 <span className="font-bold text-emerald-800">{filteredCooperatives.length}</span> 間認證合作社場 / 產銷班
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> 100% 合法立案與產銷履歷驗證
                  </span>
                </div>
              </div>
            </div>

            {/* Cooperatives Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCooperatives.map(coop => (
                <div 
                  key={coop.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col group"
                >
                  {/* Top Image & Badges */}
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img 
                      src={coop.image} 
                      alt={coop.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
                    
                    {/* Top Left Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="bg-emerald-700/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        {coop.typeName}
                      </span>
                      {coop.isExemplary && (
                        <span className="bg-amber-500/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                          <Award className="w-3 h-3" /> 標竿典範
                        </span>
                      )}
                    </div>

                    {/* Top Right Code Badge */}
                    <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-slate-200 font-mono text-[10px] px-2 py-0.5 rounded border border-white/20">
                      供應代號: {coop.supplierCode}
                    </div>

                    {/* Bottom Info on Image */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-medium mb-0.5">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{coop.county}</span>
                        <span>•</span>
                        <span>成立於 {coop.establishedYear} 年</span>
                      </div>
                      <h3 className="text-base font-bold font-serif leading-snug line-clamp-1">
                        {coop.shortName}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                    
                    <div className="space-y-3">
                      {/* Leader & Member Metrics */}
                      <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-xl text-center border border-slate-100 text-xs">
                        <div>
                          <div className="text-[10px] text-slate-400">{coop.leaderTitle}</div>
                          <div className="font-bold text-slate-800 truncate">{coop.leaderName}</div>
                        </div>
                        <div className="border-l border-slate-200">
                          <div className="text-[10px] text-slate-400">社員規模</div>
                          <div className="font-bold text-slate-800">{coop.memberCount} 戶</div>
                        </div>
                        <div className="border-l border-slate-200">
                          <div className="text-[10px] text-slate-400">產區面積</div>
                          <div className="font-bold text-emerald-700">{coop.farmAreaHectare} 公頃</div>
                        </div>
                      </div>

                      {/* Main Crops Chips */}
                      <div>
                        <div className="text-[11px] font-bold text-slate-500 mb-1.5 flex items-center justify-between">
                          <span>主力種植作物：</span>
                          <span className="text-[10px] text-emerald-700 font-medium">年供 {coop.annualVolumeTons} 公噸</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {coop.mainCrops.map((crop, idx) => (
                            <span 
                              key={idx} 
                              className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-medium border border-emerald-200/60"
                            >
                              {crop}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Cold Chain Facilities Feature */}
                      <div className="text-[11px] text-slate-600 bg-teal-50/60 p-2 rounded-lg border border-teal-100 flex items-start gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{coop.coldChainFacilities[0]}</span>
                      </div>
                    </div>

                    {/* Bottom Action Buttons */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setSelectedCoopModal(coop)}
                        className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Building2 className="w-3.5 h-3.5 text-slate-600" />
                        <span>社場詳情與設施</span>
                      </button>

                      <button
                        onClick={() => {
                          if (onNavigateShop) onNavigateShop();
                          else onNavigate('shop');
                        }}
                        className="py-2 px-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
                        title="採購此社場產地直送農產"
                      >
                        <Sprout className="w-3.5 h-3.5 text-emerald-300" />
                        <span>契作直購</span>
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB: 產銷溯源與履歷查詢 (TAP Traceability) */}
        {activeTab === 'trace' && (
          <div className="space-y-8">
            
            {/* Header Introduction */}
            <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-emerald-700/50 shadow-md">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3 border border-emerald-400/30">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>農業部 TAP 產銷履歷農產品追溯系統</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-serif mb-2">
                    產銷溯源與 SGS 檢驗報告即時查詢
                  </h2>
                  <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed">
                    好農方舟全數生鮮農產皆具備合法登錄之 20 碼產銷履歷追溯條碼。您可即時查驗生產小農、所屬合作社、地政農地地號、SGS 381項無農藥殘留檢驗報告、田間農事日誌與全程冷鏈 IoT 溫控紀錄，透明把關每一口安心。
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={handleSimulateQrScan}
                    disabled={isScanningQr}
                    className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                  >
                    <Camera className={`w-4 h-4 ${isScanningQr ? 'animate-spin' : ''}`} />
                    <span>{isScanningQr ? '模擬相機掃描辨識中...' : '掃描農產包裝 QR 碼'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Trace Code Search Form */}
            <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-2xs">
              <div className="max-w-3xl">
                <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-2">
                  輸入農產品包裝上之 20 碼產銷履歷追溯條碼 (TAP Code)
                </label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  <div className="relative flex-1">
                    <QrCode className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={traceSearchCode}
                      onChange={(e) => setTraceSearchCode(e.target.value)}
                      placeholder="例：TAP-108-0921-8872-C01"
                      className="w-full pl-10 pr-4 py-3 text-sm font-mono bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                    />
                  </div>
                  <button
                    onClick={() => handleTraceSearch()}
                    className="px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Search className="w-4 h-4" />
                    <span>即時驗證查詢</span>
                  </button>
                </div>

                {/* Quick Sample Chips */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <span className="text-xs text-slate-500 font-medium mr-2">熱門範例條碼：</span>
                  <div className="inline-flex flex-wrap gap-1.5 mt-1.5 sm:mt-0">
                    {[
                      { label: '西螺有機高麗菜', code: 'TAP-108-0921-8872-C01' },
                      { label: '枋山在欉紅愛文芒果', code: 'TAP-110-0615-3341-M08' },
                      { label: '麻豆50年老欉文旦', code: 'TAP-105-0812-7729-W05' },
                      { label: '七股純海水無毒白蝦', code: 'TAP-112-0318-9904-S02' },
                      { label: '阿里山手採金萱茶', code: 'TAP-109-0418-5521-T01' },
                      { label: '花蓮富里御皇米', code: 'TAP-109-1102-4451-R01' }
                    ].map((item) => (
                      <button
                        key={item.code}
                        onClick={() => handleTraceSearch(item.code)}
                        className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                          traceSearchCode === item.code
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {traceErrorMessage && (
                  <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{traceErrorMessage}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Trace Record Verified Details Display */}
            {currentTraceRecord && (
              <div className="bg-white rounded-3xl border border-emerald-200/80 shadow-md overflow-hidden">
                
                {/* Verified Header Certificate */}
                <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-6 sm:p-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-emerald-700/60">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-emerald-200 text-xs font-semibold mb-2 backdrop-blur-md">
                        <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                        <span>產銷履歷驗證合格・現正供應中</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold font-serif">
                        {currentTraceRecord.cropName}
                      </h3>
                      <div className="flex items-center gap-2 mt-2 font-mono text-xs sm:text-sm text-emerald-200">
                        <span>追溯碼：{currentTraceRecord.traceCode}</span>
                        <button
                          onClick={() => handleCopyTraceCode(currentTraceRecord.traceCode)}
                          className="p-1 rounded hover:bg-white/10 text-emerald-300 cursor-pointer"
                          title="複製追溯條碼"
                        >
                          {copyCodeSuccess ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center md:text-right shrink-0">
                      <div className="text-xs text-emerald-200">第三方驗證機構</div>
                      <div className="text-sm font-bold text-white mt-0.5">{currentTraceRecord.certificationOrg}</div>
                      <div className="text-xs text-emerald-300/80 mt-1 font-mono">驗證證書號：{currentTraceRecord.certNo}</div>
                      <div className="text-[11px] text-emerald-200/70 mt-0.5">有效期限至：{currentTraceRecord.certExpiry}</div>
                    </div>
                  </div>

                  {/* 4 Metadata Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
                    <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
                      <div className="text-xs text-emerald-200/80 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-emerald-300" />
                        <span>生產者 / 班長</span>
                      </div>
                      <div className="text-sm font-bold text-white mt-1">{currentTraceRecord.farmerName}</div>
                      <div className="text-[11px] text-emerald-200/70 mt-0.5 truncate">{currentTraceRecord.farmName}</div>
                    </div>

                    <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
                      <div className="text-xs text-emerald-200/80 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-300" />
                        <span>生產地段 / 合法地號</span>
                      </div>
                      <div className="text-sm font-bold text-white mt-1">{currentTraceRecord.location}</div>
                      <div className="text-[11px] text-emerald-200/70 mt-0.5">{currentTraceRecord.landNo}</div>
                    </div>

                    <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
                      <div className="text-xs text-emerald-200/80 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-emerald-300" />
                        <span>定植與生長日程</span>
                      </div>
                      <div className="text-sm font-bold text-white mt-1">定植：{currentTraceRecord.plantingDate}</div>
                      <div className="text-[11px] text-emerald-200/70 mt-0.5">採收：{currentTraceRecord.harvestDate}</div>
                    </div>

                    <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
                      <div className="text-xs text-emerald-200/80 flex items-center gap-1">
                        <Truck className="w-3.5 h-3.5 text-emerald-300" />
                        <span>分級包裝與冷鏈</span>
                      </div>
                      <div className="text-sm font-bold text-white mt-1">{currentTraceRecord.packagingDate}</div>
                      <div className="text-[11px] text-emerald-300 mt-0.5 font-bold">全程 4°C 冷鏈保鮮庫存</div>
                    </div>
                  </div>
                </div>

                {/* Content Body: Inspection Results & Logs */}
                <div className="p-6 sm:p-8 space-y-8">
                  
                  {/* Inspection Results Table */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-emerald-700" />
                        <h4 className="text-base sm:text-lg font-bold text-slate-900">
                          SGS 與第三方國家認證實驗室安全檢驗報告
                        </h4>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                        全數通過國家標準 (PASS)
                      </span>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-slate-200">
                      <table className="w-full text-left text-xs sm:text-sm">
                        <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                          <tr>
                            <th className="px-4 py-3">檢驗項目</th>
                            <th className="px-4 py-3">國家法規標準</th>
                            <th className="px-4 py-3">本批次實測檢驗數據</th>
                            <th className="px-4 py-3 text-center">判定結果</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {currentTraceRecord.inspectionResults.map((item, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                              <td className="px-4 py-3.5 font-medium text-slate-900">{item.item}</td>
                              <td className="px-4 py-3.5 text-slate-600 font-mono text-xs">{item.standard}</td>
                              <td className="px-4 py-3.5 font-bold text-emerald-800 font-mono text-xs">{item.result}</td>
                              <td className="px-4 py-3.5 text-center">
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                                  <Check className="w-3 h-3" />
                                  <span>合格</span>
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Farming Logs Timeline */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <FileText className="w-5 h-5 text-emerald-700" />
                      <h4 className="text-base sm:text-lg font-bold text-slate-900">
                        田間農事作業透明登錄日誌 (Field Work Logs)
                      </h4>
                    </div>

                    <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-200">
                      {currentTraceRecord.farmingLogs.map((log, idx) => (
                        <div key={idx} className="relative">
                          <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white shadow-xs"></div>
                          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                                {log.date}
                              </span>
                              <span className="text-xs text-slate-500 font-medium">作業人員：{log.operator}</span>
                            </div>
                            <div className="text-sm font-bold text-slate-900 mt-1.5">{log.action}</div>
                            <div className="text-xs text-slate-600 mt-0.5">使用資材 / 友善工法：{log.materialUsed}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cold Chain IoT Temperature Live Monitoring Box */}
                  <div className="bg-emerald-50/60 rounded-2xl p-5 border border-emerald-200/80">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2.5 rounded-xl bg-emerald-700 text-white shrink-0 mt-0.5">
                          <Truck className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900">
                            好農方舟產地冷鏈溫控監控履歷 (IoT Temperature Log)
                          </div>
                          <div className="text-xs text-slate-600 mt-1">
                            本批次採收後全程低溫預冷、氣調截切與冷藏保鮮（實測均溫 <span className="font-bold text-emerald-800 font-mono">4.2°C</span>，標準範圍 2°C ~ 7°C）。
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => {
                            if (onNavigateShop) onNavigateShop();
                            else onNavigate('shop');
                          }}
                          className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-colors cursor-pointer shadow-sm flex items-center gap-1.5"
                        >
                          <Sprout className="w-4 h-4 text-emerald-300" />
                          <span>前往商城選購本產區農產</span>
                        </button>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            )}

          </div>
        )}

        {/* TAB: 小農契作與果樹認養 (Contract Farming & Tree Adoption) */}
        {activeTab === 'contract' && (
          <div className="space-y-8">
            
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-emerald-700/50 shadow-md">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold mb-3 border border-amber-400/30">
                  <TreePine className="w-3.5 h-3.5 text-amber-400" />
                  <span>產地直通・綠色永續認養計畫</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-serif mb-2">
                  小農契作與果樹專屬認養專案
                </h2>
                <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed">
                  直接認養一株老欉文旦樹、愛文芒果樹、高山有機茶園或純海水生態池！免去中間盤商抽成，由金牌產銷班長全心代耕照護。享有專屬客製化檜木樹牌、即時縮時攝影、農家採果日與產季分批低溫免運直送到府。
                </p>
              </div>

              {/* 4 Guarantees Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-emerald-800/60">
                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <div className="text-xs font-bold text-amber-300 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>產量全額保障</span>
                  </div>
                  <div className="text-[11px] text-emerald-200/80 mt-0.5">天災減產由公積金差額補足</div>
                </div>

                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <div className="text-xs font-bold text-emerald-300 flex items-center gap-1">
                    <TreePine className="w-3.5 h-3.5" />
                    <span>專屬客製樹牌</span>
                  </div>
                  <div className="text-[11px] text-emerald-200/80 mt-0.5">天然檜木雷射雕刻全家姓名</div>
                </div>

                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <div className="text-xs font-bold text-teal-300 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    <span>SGS 381項零檢出</span>
                  </div>
                  <div className="text-[11px] text-emerald-200/80 mt-0.5">每批附檢驗報告與追溯碼</div>
                </div>

                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <div className="text-xs font-bold text-cyan-300 flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5" />
                    <span>分批冷鏈免運直送</span>
                  </div>
                  <div className="text-[11px] text-emerald-200/80 mt-0.5">可指定多點分寄送禮親友</div>
                </div>
              </div>
            </div>

            {/* Filter Category Chips */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {[
                { id: 'all', label: '全部契作專案' },
                { id: 'fruit', label: '果樹認養 (老欉文旦/愛文芒果)' },
                { id: 'tea', label: '高山茶園契作 (阿里山金萱)' },
                { id: 'vegetable', label: '有機蔬菜箱週週配' },
                { id: 'seafood', label: '海水水產池契作 (無毒白蝦)' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setContractFilter(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                    contractFilter === tab.id
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Contract Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContractProjects.map(project => {
                const percent = Math.min(100, Math.round((project.currentShares / project.targetShares) * 100));
                const isFull = project.currentShares >= project.targetShares;

                return (
                  <div 
                    key={project.id}
                    className="bg-white rounded-3xl border border-slate-200 shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Banner */}
                      <div className="relative h-48 sm:h-52 overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20"></div>
                        
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 rounded-full bg-emerald-900/90 backdrop-blur-md text-emerald-200 text-xs font-bold border border-emerald-500/40">
                            {project.cropName}
                          </span>
                        </div>

                        <div className="absolute top-3 right-3">
                          <span className="px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-extrabold shadow-sm">
                            剩餘 {project.daysLeft} 天
                          </span>
                        </div>

                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <div className="text-xs text-emerald-300 flex items-center gap-1 font-medium">
                            <MapPin className="w-3 h-3" />
                            <span>{project.location}・{project.farmerName}</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-5 sm:p-6 space-y-4">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 line-clamp-2 leading-snug">
                          {project.title}
                        </h3>

                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Progress Bar */}
                        <div className="space-y-1.5 pt-1">
                          <div className="flex items-center justify-between text-xs font-bold">
                            <span className="text-emerald-800">已認養 {project.currentShares} / 目標 {project.targetShares} 株(份)</span>
                            <span className="text-slate-900 font-mono">{percent}%</span>
                          </div>
                          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                              style={{ width: `${percent}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Yield & Schedule Spec */}
                        <div className="bg-slate-50 rounded-2xl p-3.5 space-y-2 border border-slate-200/70 text-xs">
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-slate-500 shrink-0">保證收成量：</span>
                            <span className="font-bold text-slate-900 text-right">{project.expectedYieldPerShare}</span>
                          </div>
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-slate-500 shrink-0">採收日程：</span>
                            <span className="font-bold text-emerald-800 text-right">{project.harvestSchedule}</span>
                          </div>
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-slate-500 shrink-0">配送次數：</span>
                            <span className="font-bold text-slate-800 text-right">{project.deliveryTimes} 次（冷鏈免運直送）</span>
                          </div>
                        </div>

                        {/* Benefits list */}
                        <div className="space-y-1.5 pt-1">
                          <div className="text-xs font-bold text-slate-800">認養人專屬權益：</div>
                          <ul className="space-y-1 text-xs text-slate-600">
                            {project.benefits.slice(0, 3).map((benefit, bIdx) => (
                              <li key={bIdx} className="flex items-start gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                      </div>
                    </div>

                    {/* Footer Button & Price */}
                    <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 flex items-center justify-between gap-3 mt-4">
                      <div>
                        <div className="text-[11px] text-slate-500">認養每株/每份</div>
                        <div className="text-xl font-extrabold text-emerald-800 font-mono">
                          ${project.pricePerShare.toLocaleString()}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedContractModal(project);
                          setAdoptShares(1);
                        }}
                        disabled={isFull}
                        className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-sm flex items-center gap-1.5 ${
                          isFull
                            ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                            : 'bg-emerald-800 hover:bg-emerald-900 text-white'
                        }`}
                      >
                        <Sprout className="w-4 h-4 text-emerald-300" />
                        <span>{isFull ? '已額滿' : '立即認養契作'}</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* TAB 2: 產銷班轉型升級農業合作社指南 */}
        {activeTab === 'transformation' && (
          <div className="space-y-8">
            
            {/* Introductory Card */}
            <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-3xl p-6 sm:p-8 border border-emerald-700/50 shadow-md">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3 border border-emerald-400/30">
                  <Sprout className="w-3.5 h-3.5" />
                  <span>農業部產銷班升級制度輔導</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-serif mb-3">
                  產銷班升級為農業合作社之 5 大階段指南
                </h2>
                <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
                  農業產銷班為非法人組織，在土地取得、融資貸款、簽署企業大宗契作與開立發票上面臨諸多法律限制。依據《農業產銷班設立及輔導辦法》及《合作社法》，好農方舟聯合輔導團隊協助產銷班轉型升級為具法人地位之「農業合作社」，享有政府全額設施設備補助與免營所稅之政策利多。
                </p>
              </div>
            </div>

            {/* 5-Step Process Timeline */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              {[
                {
                  step: '01',
                  title: '發起與章程草案',
                  subtitle: '籌備發起人會',
                  desc: '由產銷班員至少7人以上發起，召开发起人會議，確認合作社宗旨（生產、運銷或加工），並擬定合作社組織章程草案與股金認繳規範。',
                  badge: '第 1-2 週'
                },
                {
                  step: '02',
                  title: '召開創立大會',
                  subtitle: '選舉理監事會',
                  desc: '依法召集全體創社社員舉行創立大會，通過章程草案與年度業務計畫，民主投票選舉理事主席、理事及監事會成員。',
                  badge: '第 3-4 週'
                },
                {
                  step: '03',
                  title: '驗資與法定登記',
                  subtitle: '取得法人資格',
                  desc: '檢附創立大會紀錄、理監事名冊、社員名冊與金融機構股金存款證明，報請縣市政府社會局/農業處審查核發「合作社登記證」。',
                  badge: '第 5-6 週'
                },
                {
                  step: '04',
                  title: '申請供應人代號',
                  subtitle: '建構共同運銷',
                  desc: '向台北農產運銷公司（北農）及全台果菜批發市場申請專屬「合作社供應人代號」，享市場代運代銷與農糧署運費補貼。',
                  badge: '第 7-8 週'
                },
                {
                  step: '05',
                  title: '對接好農方舟',
                  subtitle: '數位大數據升級',
                  desc: '全面上架好農方舟商城品牌館、接入產銷預警大數據儀表板，並由平台輔導申辦農業部 50% 智慧冷鏈設備專案補助。',
                  badge: '持續營運'
                },
              ].map((s, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:border-emerald-300 hover:shadow-sm transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-9 h-9 rounded-xl bg-emerald-800 text-white font-mono font-extrabold text-sm flex items-center justify-center">
                        {s.step}
                      </span>
                      <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-bold border border-emerald-200">
                        {s.badge}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mb-0.5">{s.title}</h3>
                    <div className="text-[11px] font-semibold text-emerald-700 mb-2">{s.subtitle}</div>
                    <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Comparison Table: 產銷班 vs 農業合作社 */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
              <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-base font-bold font-serif">產銷班 vs 農業合作社 權益與功能優勢對照表</h3>
                </div>
                <span className="text-xs text-emerald-300">依據農業部輔導法規彙整</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                      <th className="p-3.5 font-bold">比較項目</th>
                      <th className="p-3.5 font-bold text-slate-500">傳統農業產銷班</th>
                      <th className="p-3.5 font-bold text-emerald-800 bg-emerald-50">轉型升級：農業合作社 (TFA)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    <tr>
                      <td className="p-3.5 font-bold text-slate-800">法律主體地位</td>
                      <td className="p-3.5 text-rose-600 font-medium">❌ 非法人團體（無法以班名義購置不動產）</td>
                      <td className="p-3.5 text-emerald-700 font-bold bg-emerald-50/50"> 具獨立法人資格（可持有集貨場產權與資產）</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-slate-800">企業契約與發票</td>
                      <td className="p-3.5">僅能開立農民收據，無法開立統一發票</td>
                      <td className="p-3.5 text-emerald-700 font-bold bg-emerald-50/50"> 可開立免稅農產統一發票，對接各大連鎖通路</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-slate-800">冷鏈與設施補助上限</td>
                      <td className="p-3.5">個人申請最高 50-100 萬元</td>
                      <td className="p-3.5 text-emerald-700 font-bold bg-emerald-50/50"> 合作社專案補助最高可達 500 萬至 3,000 萬元</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-slate-800">批發市場拍賣供應人</td>
                      <td className="p-3.5">多數依附於農會或代銷行底下</td>
                      <td className="p-3.5 text-emerald-700 font-bold bg-emerald-50/50"> 擁有獨立「合作社供應人代號」，直接對帳與款項撥付</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-slate-800">營利所得稅減免</td>
                      <td className="p-3.5">班員個別申報綜合所得稅</td>
                      <td className="p-3.5 text-emerald-700 font-bold bg-emerald-50/50"> 依《合作社法》依法免徵營利事業所得稅與營業稅</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* CTA Help Box */}
            <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-emerald-950">需要產銷班轉型諮詢或法規輔導專家到場？</h4>
                  <p className="text-xs text-emerald-800 mt-0.5">
                    好農方舟攜手台灣農業合作社聯合社，提供免費到班輔導、章程制定與申請代辦服務。
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('apply')}
                className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-colors whitespace-nowrap cursor-pointer shadow-sm"
              >
                立即填寫線上輔導意向書
              </button>
            </div>

          </div>
        )}

        {/* TAB 3: 農業設施與冷鏈補助專區 */}
        {activeTab === 'subsidies' && (
          <div className="space-y-8">
            
            {/* Subsidy Intro & Grant Calculator Header */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Intro Text */}
              <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-3">
                    <Award className="w-3.5 h-3.5 text-emerald-700" />
                    <span>農業部 115 年度農產補助方案總整理</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-serif mb-2">
                    智慧冷鏈物流、強固型溫網室與檢驗費全額補助
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    政府全面推動農產冷鏈旗艦工程與友善減碳農業。好農方舟提供一站式「補助資格試算、計畫書範本下載、審查輔導」服務，協助農友與合作社爭取最高 50% 設備補助與檢驗費全免補助。
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-center">
                  <div className="p-2.5 bg-emerald-50 rounded-xl">
                    <div className="text-xs text-emerald-800 font-medium">冷鏈物流庫補助</div>
                    <div className="text-base font-extrabold text-emerald-950 font-mono">最高 50%</div>
                  </div>
                  <div className="p-2.5 bg-amber-50 rounded-xl">
                    <div className="text-xs text-amber-800 font-medium">強固型溫網室</div>
                    <div className="text-base font-extrabold text-amber-950 font-mono">360 萬/公頃</div>
                  </div>
                  <div className="p-2.5 bg-teal-50 rounded-xl">
                    <div className="text-xs text-teal-800 font-medium">TAP/有機檢驗費</div>
                    <div className="text-base font-extrabold text-teal-950 font-mono">100% 全額補助</div>
                  </div>
                </div>
              </div>

              {/* Right Calculator Widget */}
              <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-3xl p-6 border border-emerald-800/60 shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-emerald-300">補助金額線上試算器</span>
                    <span className="text-[10px] bg-emerald-600/80 px-2 py-0.5 rounded font-mono">即時試算</span>
                  </div>
                  <label className="text-xs text-slate-300 block mb-1.5">
                    預估興建/購置設備總預算 (新台幣)：
                  </label>
                  <input
                    type="number"
                    value={estCost}
                    onChange={(e) => setEstCost(e.target.value)}
                    step="50000"
                    min="100000"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                  <div className="text-[11px] text-slate-400 mt-1">例如：興建 300 坪冷藏庫或購置光波分級機</div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-xs text-emerald-200">政府最高補助金額 (50%)：</span>
                    <span className="text-xl font-extrabold text-amber-400 font-mono">
                      NT$ {(parseInt(estCost || '0', 10) * 0.5).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-300">
                    <span>合作社自籌配合款 (50%)：</span>
                    <span className="font-mono">NT$ {(parseInt(estCost || '0', 10) * 0.5).toLocaleString()}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Subsidies List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_SUBSIDIES.map(sub => (
                <div 
                  key={sub.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="bg-emerald-50 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-emerald-200">
                        {sub.categoryLabel}
                      </span>
                      <span className="text-xs text-slate-500">截止日期：{sub.applyDeadline}</span>
                    </div>

                    <h3 className="text-base font-bold font-serif text-slate-900 leading-snug">
                      {sub.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {sub.description}
                    </p>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-500">補助比例：</span>
                        <span className="font-bold text-emerald-700">{sub.subsidyRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">補助上限：</span>
                        <span className="font-bold text-slate-800">{sub.maxAmount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">主辦單位：</span>
                        <span className="text-slate-700">{sub.issuer}</span>
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] font-bold text-slate-500 mb-1">申辦資格對象：</div>
                      <ul className="text-xs text-slate-600 space-y-1">
                        {sub.targetAudience.map((target, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{target}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedSubsidyModal(sub)}
                      className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-slate-600" />
                      <span>查看詳細規定與計畫範本</span>
                    </button>

                    <button
                      onClick={() => {
                        alert(`已為您下載「${sub.docTemplates[0].name}」申請書範本！`);
                      }}
                      className="py-2 px-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
                      title="下載申請書範本"
                    >
                      <Download className="w-3.5 h-3.5 text-emerald-300" />
                      <span>下載範本</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 4: 共同運銷與企業綠色契作專區 */}
        {activeTab === 'b2b_matching' && (
          <div className="space-y-8">
            
            {/* Joint Marketing & B2B Hero */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-3">
                  <Briefcase className="w-3.5 h-3.5 text-emerald-700" />
                  <span>批發市場共同運銷 ＆ 企業 ESG 契作媒合</span>
                </div>
                <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 font-serif mb-3">
                  告別盤商層層剝削：建構全透明產銷媒合體系
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  好農方舟整合全台果菜批發市場共同運銷代運代銷、各大科技企業福委會中秋端午贈禮，以及連鎖團膳與綠色餐廳採購需求。透過「保證收購價」與「收益平準基金」，守護農民耕耘汗水，為企業落實 ESG 永續供應鏈。
                </p>
              </div>
            </div>

            {/* 3 Core Mechanisms */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 font-serif">批發市場共同運銷</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  代運台北第一、第二果菜批發市場、三重市場、台中與高雄市場。集運降低單件運費 35%，並享拍賣優先排定與農糧署運費補貼。
                </p>
                <div className="text-[11px] font-bold text-emerald-700 pt-2 border-t border-slate-100">
                  ✓ 每日對帳結算，款項自動電匯
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 font-serif">保證責任收購與平準基金</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  簽訂保證價格契約，當產地市場價格低於生產成本時，啟動平台平準基金差額補貼；價格上漲時共享利潤，確保農民穩定年收。
                </p>
                <div className="text-[11px] font-bold text-amber-700 pt-2 border-t border-slate-100">
                  ✓ 無懼菜金菜土波動風險
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 font-serif">企業 ESG 契作認養專案</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  專為台積電、聯發科、富邦等百大企業量身打造產地柚樹認養、有機蔬菜箱週週配與碳匯農業減碳佐證報告。
                </p>
                <div className="text-[11px] font-bold text-teal-700 pt-2 border-t border-slate-100">
                  ✓ 產地名牌掛牌與縮時影像
                </div>
              </div>

            </div>

            {/* Contract Farming Direct Action */}
            <div className="bg-gradient-to-r from-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-emerald-800/50 shadow-md">
              <div className="space-y-2">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  HOT CONTRACT PROJECTS
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-serif">
                  正在熱烈招募中的「產地果樹與有機蔬菜箱」契作專案
                </h3>
                <p className="text-xs text-emerald-200/90 max-w-2xl">
                  包括麻豆50年老欉文旦柚樹尊榮認養、西螺濁水溪有機蔬菜箱12週直送，歡迎個人與企業立即加入！
                </p>
              </div>
              <button
                onClick={() => {
                  if (onNavigateContract) onNavigateContract();
                  else onNavigate('contract');
                }}
                className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm transition-colors whitespace-nowrap cursor-pointer shadow-lg shadow-amber-400/20"
              >
                前往小農契作專區 ➔
              </button>
            </div>

          </div>
        )}

        {/* TAB 5: 農民學院與智慧農耕技術培訓 */}
        {activeTab === 'academy' && (
          <div className="space-y-8">
            
            {/* Academy Intro */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-2">
                    <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
                    <span>農民學院 (Farmers Academy) 實務培訓</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-serif">
                    智慧農業物聯網、電商營銷與冷鏈實務研習
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    聘請產官學頂尖師資，全額由政府公費與平台基金補助，協助農民與青農掌握新時代智慧農業關鍵技能。
                  </p>
                </div>
                <span className="text-xs bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-xl font-bold border border-emerald-200 shrink-0">
                  🎓 完訓核發農業部時數研習證明
                </span>
              </div>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_ACADEMY_COURSES.map(course => {
                const isEnrolled = enrolledCourses.includes(course.id);
                const seatsLeft = course.spotsTotal - course.spotsEnrolled;

                return (
                  <div 
                    key={course.id}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Course Image Header */}
                      <div className="relative h-44 overflow-hidden bg-slate-100">
                        <img 
                          src={course.image} 
                          alt={course.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                        
                        <div className="absolute top-3 left-3 flex gap-1.5">
                          <span className="bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                            {course.categoryLabel}
                          </span>
                          <span className="bg-slate-900/80 text-slate-200 text-[10px] font-bold px-2 py-0.5 rounded">
                            {course.levelLabel}
                          </span>
                        </div>

                        {course.isFreeGovFunded && (
                          <div className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-2xs">
                            政府公費全額補助
                          </div>
                        )}

                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <h3 className="text-base font-bold font-serif leading-snug line-clamp-1">
                            {course.title}
                          </h3>
                        </div>
                      </div>

                      {/* Course Content */}
                      <div className="p-5 space-y-4">
                        {/* Instructor Info */}
                        <div className="flex items-center gap-3">
                          <img 
                            src={course.instructorAvatar} 
                            alt={course.instructorName}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded-full object-cover border border-slate-200" 
                          />
                          <div>
                            <div className="text-xs font-bold text-slate-900">{course.instructorName}</div>
                            <div className="text-[11px] text-slate-500">{course.instructorTitle}</div>
                          </div>
                        </div>

                        {/* Date & Location Grid */}
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5 text-xs text-slate-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                            <span>{course.courseDate} ｜ {course.courseTime}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                            <span className="truncate">{course.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                            <span>
                              名額：共 {course.spotsTotal} 席（已報名 {course.spotsEnrolled + (isEnrolled ? 1 : 0)} 席，剩餘 {seatsLeft - (isEnrolled ? 1 : 0)} 席）
                            </span>
                          </div>
                        </div>

                        {/* Syllabus Bullet Points */}
                        <div>
                          <div className="text-[11px] font-bold text-slate-500 mb-1.5">課程核心大綱：</div>
                          <ul className="text-xs text-slate-600 space-y-1">
                            {course.syllabus.slice(0, 3).map((item, sIdx) => (
                              <li key={sIdx} className="flex items-start gap-1.5">
                                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                <span className="line-clamp-1">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Footer Registration Button */}
                    <div className="p-5 pt-0">
                      {isEnrolled ? (
                        <div className="w-full py-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center justify-center gap-1.5 border border-emerald-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>您已報名成功（席位已保留）</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => setSelectedCourseModal(course)}
                          className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <GraduationCap className="w-4 h-4 text-emerald-300" />
                          <span>免費預約報名課程</span>
                        </button>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* TAB 6: 入會申請 / 供貨上架意向登錄 */}
        {activeTab === 'apply' && (
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Application Form Header */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-3">
                <Send className="w-3.5 h-3.5 text-amber-700" />
                <span>全台農友、產銷班與合作社線上供貨申請</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-serif mb-2">
                加入好農方舟產銷體系 ＆ 合作社夥伴登錄
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                歡迎具備 TAP 產銷履歷、有機驗證或友善耕作之農友、產銷班及合作社提出申請。完成登錄後，產銷輔導處將於 2 個工作天內指派專人電話聯繫，並安排實地訪田、輔導檢驗與對接雙溫層冷鏈物流。
              </p>
            </div>

            {/* Submission Success Banner */}
            {submittedApplication && (
              <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 border border-emerald-700/60 shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="inline-block bg-emerald-800 text-emerald-200 text-xs font-mono px-2 py-0.5 rounded">
                      申請案號：{submittedApplication.applyNo}
                    </div>
                    <h3 className="text-lg font-bold font-serif">
                      🎉 感謝您的登錄！申請資料已成功送達好農方舟產銷審查組
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                      已將案件指派至「雲林/屏東產地輔導組」。我們將盡速核對您的地號與驗證資訊，並由產地專員主動與 {submittedApplication.contactName} ({submittedApplication.phone}) 聯繫。
                    </p>
                    <div className="pt-3 flex items-center gap-3">
                      <button
                        onClick={() => {
                          alert(`已為您列印案件憑證：${submittedApplication.applyNo}`);
                        }}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/20 transition-colors"
                      >
                        列印申請存根
                      </button>
                      <button
                        onClick={() => setSubmittedApplication(null)}
                        className="text-xs text-emerald-300 hover:text-white underline cursor-pointer"
                      >
                        填寫下一筆申請
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* The Form */}
            {!submittedApplication && (
              <form onSubmit={handleApplicationSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
                
                {/* 1. Applicant Type */}
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-2">
                    1. 申請主體類型 <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { key: 'production_class', label: '農業產銷班' },
                      { key: 'cooperative', label: '農業合作社 (場)' },
                      { key: 'individual_farmer', label: '認證獨立農友' },
                      { key: 'agri_enterprise', label: '農產加工/農企' },
                    ].map(t => (
                      <button
                        key={t.key}
                        type="button"
                        onClick={() => setAppForm(prev => ({ ...prev, applicantType: t.key as any }))}
                        className={`p-3 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                          appForm.applicantType === t.key
                            ? 'bg-emerald-800 text-white border-emerald-800 shadow-2xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Contact Person & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">
                      聯絡人姓名 <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={appForm.contactName}
                      onChange={(e) => setAppForm(prev => ({ ...prev, contactName: e.target.value }))}
                      placeholder="例：陳健興"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">
                      職稱
                    </label>
                    <input
                      type="text"
                      value={appForm.contactTitle}
                      onChange={(e) => setAppForm(prev => ({ ...prev, contactTitle: e.target.value }))}
                      placeholder="例：班長 / 理事主席 / 園主"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">
                      聯絡行動電話 <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={appForm.phone}
                      onChange={(e) => setAppForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="例：0912-345-678"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                    />
                  </div>
                </div>

                {/* 3. Org Name & City */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">
                      社場 / 產銷班 / 農場全名 <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={appForm.orgName}
                      onChange={(e) => setAppForm(prev => ({ ...prev, orgName: e.target.value }))}
                      placeholder="例：雲林縣西螺鎮有機蔬菜產銷班第 1 班"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">
                      所在縣市
                    </label>
                    <select
                      value={appForm.countyCity}
                      onChange={(e) => setAppForm(prev => ({ ...prev, countyCity: e.target.value }))}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-700"
                    >
                      <option value="雲林縣">雲林縣</option>
                      <option value="彰化縣">彰化縣</option>
                      <option value="台南市">台南市</option>
                      <option value="屏東縣">屏東縣</option>
                      <option value="嘉義縣">嘉義縣</option>
                      <option value="花蓮縣">花蓮縣</option>
                      <option value="台東縣">台東縣</option>
                      <option value="宜蘭縣">宜蘭縣</option>
                      <option value="苗栗縣">苗栗縣</option>
                      <option value="台中市">台中市</option>
                      <option value="高雄市">高雄市</option>
                      <option value="其他縣市">其他縣市</option>
                    </select>
                  </div>
                </div>

                {/* 4. Crops & Farm Area */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">
                      主力作物品項
                    </label>
                    <input
                      type="text"
                      value={appForm.mainCrops}
                      onChange={(e) => setAppForm(prev => ({ ...prev, mainCrops: e.target.value }))}
                      placeholder="例：初秋高麗菜、愛文芒果、白蝦、金萱茶"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">
                      耕作產區面積
                    </label>
                    <input
                      type="text"
                      value={appForm.farmArea}
                      onChange={(e) => setAppForm(prev => ({ ...prev, farmArea: e.target.value }))}
                      placeholder="例：5.5 公頃 (或 18 分地)"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                    />
                  </div>
                </div>

                {/* 5. Existing Certifications */}
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-2">
                    現有取得之驗證標章 (可複選)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['TAP 產銷履歷', '有機驗證 (轉型期)', 'GLOBALG.A.P.', '吉園圃', '產地地理標章', '友善環境耕作'].map(cert => {
                      const isChecked = appForm.certifications.includes(cert);
                      return (
                        <button
                          key={cert}
                          type="button"
                          onClick={() => toggleCert(cert)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer border ${
                            isChecked
                              ? 'bg-emerald-50 text-emerald-900 border-emerald-400'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {isChecked ? '✓ ' : '+ '} {cert}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 6. Target Collaboration */}
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-2">
                    希望合作之服務項目 (可複選)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      '好農方舟商城品牌館產地直送上架',
                      '批發市場共同運銷代運代銷',
                      '企業 ESG 綠色契作認養媒合',
                      '申請農業部智慧冷鏈設備補助輔導',
                      '產銷班轉型升級農業合作社輔導'
                    ].map(collab => {
                      const isChecked = appForm.targetCollaboration.includes(collab);
                      return (
                        <button
                          key={collab}
                          type="button"
                          onClick={() => toggleCollab(collab)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer border ${
                            isChecked
                              ? 'bg-amber-50 text-amber-900 border-amber-400'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {isChecked ? '✓ ' : '+ '} {collab}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 7. Cold chain & other notes */}
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1.5">
                    冷鏈集貨需求或備註說明
                  </label>
                  <textarea
                    rows={3}
                    value={appForm.coldChainNeeds}
                    onChange={(e) => setAppForm(prev => ({ ...prev, coldChainNeeds: e.target.value }))}
                    placeholder="請簡述您的採收期、每週預估產量，或是否需要西螺/枋山低溫集貨預冷協助..."
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[11px] text-slate-500 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>資料受個人資料保護法保護，僅供產銷審查使用</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-900/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>送出資料中...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>確認送出入會/供貨意向書</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>
        )}

      </div>

      {/* MODAL 1: 社場詳細資料與冷鏈彈窗 */}
      {selectedCoopModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 sm:p-8 relative animate-in fade-in zoom-in-95 duration-200">
            
            <button
              onClick={() => setSelectedCoopModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-5">
              
              {/* Header Image & Titles */}
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <img 
                  src={selectedCoopModal.image} 
                  alt={selectedCoopModal.name}
                  referrerPolicy="no-referrer"
                  className="w-full sm:w-40 h-32 rounded-2xl object-cover border border-slate-200 shrink-0" 
                />
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-emerald-700 text-white font-bold px-2 py-0.5 rounded">
                      {selectedCoopModal.typeName}
                    </span>
                    <span className="text-[10px] bg-slate-800 text-slate-200 font-mono px-2 py-0.5 rounded">
                      供應代號: {selectedCoopModal.supplierCode}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-serif text-slate-900">
                    {selectedCoopModal.name}
                  </h3>
                  <div className="text-xs text-slate-500 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{selectedCoopModal.address}</span>
                  </div>
                  {selectedCoopModal.awardTitle && (
                    <div className="text-[11px] text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block">
                      🏆 {selectedCoopModal.awardTitle}
                    </div>
                  )}
                </div>
              </div>

              {/* Metrics Bar */}
              <div className="grid grid-cols-4 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center text-xs">
                <div>
                  <div className="text-[10px] text-slate-400">{selectedCoopModal.leaderTitle}</div>
                  <div className="font-bold text-slate-800">{selectedCoopModal.leaderName}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">社員人數</div>
                  <div className="font-bold text-slate-800">{selectedCoopModal.memberCount} 戶</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">產區總面積</div>
                  <div className="font-bold text-emerald-700">{selectedCoopModal.farmAreaHectare} 公頃</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">年均供貨量</div>
                  <div className="font-bold text-slate-800">{selectedCoopModal.annualVolumeTons} 公噸</div>
                </div>
              </div>

              {/* Story */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 mb-1">社場產地故事與經營理念：</h4>
                <p className="text-xs text-slate-600 leading-relaxed bg-emerald-50/40 p-3.5 rounded-xl border border-emerald-100/60">
                  {selectedCoopModal.story}
                </p>
              </div>

              {/* Cold chain facilities */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 mb-1.5 flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-teal-700" />
                  <span>現代化冷鏈與分級設備：</span>
                </h4>
                <div className="space-y-1">
                  {selectedCoopModal.coldChainFacilities.map((fac, fIdx) => (
                    <div key={fIdx} className="text-xs text-slate-700 flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg">
                      <Check className="w-3.5 h-3.5 text-teal-600" />
                      <span>{fac}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 mb-1.5">檢驗與安全標章：</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCoopModal.certifications.map((c, cIdx) => (
                    <span key={cIdx} className="text-[11px] bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg border border-emerald-200 font-medium">
                      ✓ {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <a
                  href={`tel:${selectedCoopModal.contactPhone}`}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-600" />
                  <span>電洽公務代表號 ({selectedCoopModal.contactPhone})</span>
                </a>

                <button
                  onClick={() => {
                    setSelectedCoopModal(null);
                    if (onNavigateShop) onNavigateShop();
                    else onNavigate('shop');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                >
                  <Sprout className="w-4 h-4 text-emerald-300" />
                  <span>選購此社場產地直銷農產</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* MODAL 2: 補助詳細規定與範本下載彈窗 */}
      {selectedSubsidyModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 sm:p-8 relative animate-in fade-in zoom-in-95 duration-200">
            
            <button
              onClick={() => setSelectedSubsidyModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div className="inline-block bg-emerald-100 text-emerald-900 text-xs font-bold px-2.5 py-0.5 rounded">
                {selectedSubsidyModal.categoryLabel}
              </div>
              <h3 className="text-lg font-bold font-serif text-slate-900">
                {selectedSubsidyModal.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedSubsidyModal.description}
              </p>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">補助標準：</span>
                  <span className="font-bold text-emerald-700">{selectedSubsidyModal.subsidyRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">最高金額：</span>
                  <span className="font-bold text-slate-800">{selectedSubsidyModal.maxAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">截止日期：</span>
                  <span className="text-rose-600 font-bold">{selectedSubsidyModal.applyDeadline}</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-1.5">重要審查要件：</h4>
                <ul className="text-xs text-slate-600 space-y-1">
                  {selectedSubsidyModal.keyRequirements.map((req, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-1.5">隨函申請表單範本：</h4>
                <div className="space-y-1.5">
                  {selectedSubsidyModal.docTemplates.map((doc, dIdx) => (
                    <div key={dIdx} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                      <span className="font-medium text-slate-700 truncate">{doc.name} ({doc.size})</span>
                      <button
                        onClick={() => alert(`已為您下載 ${doc.name}`)}
                        className="text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1 text-[11px]"
                      >
                        <Download className="w-3 h-3" /> 下載
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  onClick={() => setSelectedSubsidyModal(null)}
                  className="px-5 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
                >
                  關閉
                </button>
                <button
                  onClick={() => {
                    setSelectedSubsidyModal(null);
                    setActiveTab('apply');
                  }}
                  className="px-5 py-2 rounded-xl bg-emerald-800 text-white text-xs font-bold cursor-pointer"
                >
                  申請專人輔導補助
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* MODAL 3: 農民學院報名彈窗 */}
      {selectedCourseModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 sm:p-8 relative animate-in fade-in zoom-in-95 duration-200">
            
            <button
              onClick={() => setSelectedCourseModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {enrollSuccessMsg ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold font-serif text-slate-900">報名成功</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{enrollSuccessMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleCourseEnroll} className="space-y-4">
                <div className="inline-block bg-emerald-100 text-emerald-900 text-xs font-bold px-2.5 py-0.5 rounded">
                  {selectedCourseModal.categoryLabel} ｜ 公費全額補助
                </div>
                <h3 className="text-base font-bold font-serif text-slate-900">
                  報名：{selectedCourseModal.title}
                </h3>
                <div className="text-xs text-slate-500">
                  授課講師：{selectedCourseModal.instructorName} ({selectedCourseModal.instructorTitle})
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-1">
                  <div>📅 時間：{selectedCourseModal.courseDate} {selectedCourseModal.courseTime}</div>
                  <div>📍 地點：{selectedCourseModal.location}</div>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      學員姓名 <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={courseForm.name}
                      onChange={(e) => setCourseForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="例：陳大農"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      行動電話 (接收報名確認簡訊與視訊連結) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={courseForm.phone}
                      onChange={(e) => setCourseForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="例：0912-345-678"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      電子信箱 (選填)
                    </label>
                    <input
                      type="email"
                      value={courseForm.email}
                      onChange={(e) => setCourseForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="例：farmer@example.com"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      所屬合作社 / 產銷班 / 農場名稱
                    </label>
                    <input
                      type="text"
                      value={courseForm.farmName}
                      onChange={(e) => setCourseForm(prev => ({ ...prev, farmName: e.target.value }))}
                      placeholder="例：西螺有機蔬菜班 / 獨立青農"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">免繳任何費用</span>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-colors cursor-pointer shadow-sm"
                  >
                    確認預約席位
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

      {/* Contract Adoption Modal */}
      {selectedContractModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl relative my-8">
            <button
              onClick={() => setSelectedContractModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                {selectedContractModal.cropName}
              </span>
              <span className="text-xs text-slate-500">{selectedContractModal.location}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              {selectedContractModal.title}
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              由 {selectedContractModal.farmerName} 親自為您代耕照料。每株皆享有專屬雷射掛牌、生長日誌與採收免運分批直送。
            </p>

            <form onSubmit={handleAdoptSubmit} className="space-y-4">
              
              {/* Shares & Price Calculator */}
              <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">認養數量 (株/份)：</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setAdoptShares(prev => Math.max(1, prev - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-emerald-300 text-emerald-800 font-bold hover:bg-emerald-100 flex items-center justify-center cursor-pointer text-sm"
                    >
                      -
                    </button>
                    <span className="font-mono font-extrabold text-base text-slate-900 w-6 text-center">
                      {adoptShares}
                    </span>
                    <button
                      type="button"
                      onClick={() => setAdoptShares(prev => prev + 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-emerald-300 text-emerald-800 font-bold hover:bg-emerald-100 flex items-center justify-center cursor-pointer text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-emerald-200/60">
                  <span className="text-slate-600">預估保證總收成：</span>
                  <span className="font-bold text-emerald-900">
                    {adoptShares} × {selectedContractModal.expectedYieldPerShare}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-bold text-slate-700">契作認養總金額：</span>
                  <span className="text-xl font-extrabold text-emerald-800 font-mono">
                    ${(selectedContractModal.pricePerShare * adoptShares).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Form inputs */}
              <div className="space-y-3 pt-1">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    認養人全名 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={adoptForm.name}
                    onChange={(e) => setAdoptForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="例：王小明"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      聯絡手機 <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={adoptForm.phone}
                      onChange={(e) => setAdoptForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="例：0912-345-678"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      電子信箱 (發送電子合約)
                    </label>
                    <input
                      type="email"
                      value={adoptForm.email}
                      onChange={(e) => setAdoptForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="例：user@example.com"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    產季生鮮配送地址 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={adoptForm.address}
                    onChange={(e) => setAdoptForm(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="例：台北市大安區信義路四段100號6樓"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    專屬檜木掛牌題字 (雷射雕刻，限15字內)
                  </label>
                  <input
                    type="text"
                    value={adoptForm.treeNameplate}
                    onChange={(e) => setAdoptForm(prev => ({ ...prev, treeNameplate: e.target.value }))}
                    placeholder="例：王小明全家福 專屬老樹守護"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">含低溫冷鏈免運與天災保證</span>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-md flex items-center gap-1.5"
                >
                  <TreePine className="w-4 h-4 text-emerald-300" />
                  <span>確認並生成契作認養憑證</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Adoption Certificate Modal */}
      {adoptSuccessCert && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border-2 border-emerald-600 shadow-2xl relative my-8 text-center">
            
            <button
              onClick={() => {
                setAdoptSuccessCert(null);
                setSelectedContractModal(null);
              }}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3 shadow-inner">
              <Award className="w-8 h-8" />
            </div>

            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-2 border border-emerald-200">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>契作認養登記成功・專屬合約已生效</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 mb-1">
              台灣小農契作認養電子憑證
            </h3>
            <div className="text-xs font-mono text-emerald-800 font-bold mb-4">
              憑證號：{adoptSuccessCert.certNo}
            </div>

            {/* Certificate Box */}
            <div className="bg-amber-50/50 rounded-2xl p-5 border border-amber-200/80 text-left space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">認養人：</span>
                <span className="font-bold text-slate-900">{adoptSuccessCert.adopterName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">認養專案：</span>
                <span className="font-bold text-emerald-900 text-right">{adoptSuccessCert.projectTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">認養份額：</span>
                <span className="font-bold text-slate-900">{adoptSuccessCert.shares} 株/份 (總額 ${adoptSuccessCert.totalAmount.toLocaleString()})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">專屬掛牌題字：</span>
                <span className="font-bold text-amber-800">「{adoptSuccessCert.treeNameplate}」</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">代耕小農與產區：</span>
                <span className="font-bold text-slate-800">{adoptSuccessCert.farmerName} ({adoptSuccessCert.location})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">預計採收日程：</span>
                <span className="font-bold text-emerald-800">{adoptSuccessCert.harvestSchedule}</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 mt-4 leading-relaxed">
              感謝您支持台灣在地友善農業！產銷班長已為您掛上專屬檜木樹牌，即日起可於會員專區隨時查閱生長縮時影像與工作日誌。
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={() => {
                  setAdoptSuccessCert(null);
                  setSelectedContractModal(null);
                  setActiveTab('trace');
                }}
                className="flex-1 py-3 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-xs transition-colors cursor-pointer"
              >
                查看 TAP 產銷溯源檢驗
              </button>
              <button
                onClick={() => {
                  setAdoptSuccessCert(null);
                  setSelectedContractModal(null);
                }}
                className="flex-1 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs transition-colors cursor-pointer shadow-sm"
              >
                完成並返回農友社場
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
