import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  RefreshCw, 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  ShieldCheck, 
  Truck,
  DollarSign,
  Receipt,
  Tag,
  Building2,
  Calendar,
  Layers,
  Award,
  Filter,
  Check,
  X,
  Menu,
  ChevronRight,
  Activity,
  Sparkles,
  Compass,
  FileText,
  BookOpen,
  MessageSquare,
  Sprout,
  GraduationCap,
  Landmark,
  QrCode,
  FileCheck
} from 'lucide-react';
import { 
  MOCK_PRODUCTS, 
  MOCK_ORDERS, 
  MOCK_FARMERS, 
  MOCK_MEMBERS, 
  MOCK_PROCUREMENTS, 
  MOCK_SETTLEMENTS,
  MOCK_BRAND_STORY,
  MOCK_NEWS,
  MOCK_ARTICLES,
  MOCK_INQUIRIES,
  MOCK_FAQS,
  MOCK_COOPERATIVES,
  MOCK_COOPERATIVE_APPLICATIONS,
  MOCK_SUBSIDIES,
  MOCK_ACADEMY_COURSES,
  MOCK_TRACE_RECORDS,
  MOCK_CONTRACT_PROJECTS
} from '../data/mockData';
import { 
  Product, 
  Order, 
  Member, 
  ProcurementRecord, 
  FinancialSettlement,
  BrandStoryData,
  NewsItem,
  ArticleItem,
  ContactInquiry,
  FaqItem,
  CooperativeItem,
  CooperativeApplication,
  SubsidyItem,
  AcademyCourse,
  TraceRecord,
  ContractProject,
  ViewMode
} from '../types';
import { ProductModal } from './admin/ProductModal';
import { OrderModal } from './admin/OrderModal';
import { MemberModal } from './admin/MemberModal';
import { ProcurementModal } from './admin/ProcurementModal';
import { SettlementModal } from './admin/SettlementModal';
import { BrandStoryAdmin } from './admin/BrandStoryAdmin';
import { NewsAdmin } from './admin/NewsAdmin';
import { ArticlesAdmin } from './admin/ArticlesAdmin';
import { InquiriesAdmin } from './admin/InquiriesAdmin';
import { CooperativesAdmin } from './admin/CooperativesAdmin';
import { CoopApplicationsAdmin } from './admin/CoopApplicationsAdmin';
import { TraceabilityAdmin } from './admin/TraceabilityAdmin';
import { ContractsAdmin } from './admin/ContractsAdmin';
import { SubsidiesAdmin } from './admin/SubsidiesAdmin';
import { AcademyAdmin } from './admin/AcademyAdmin';

type AdminTab = 
  | 'overview' 
  | 'cooperatives_mgmt'
  | 'coop_apps_mgmt'
  | 'trace_mgmt'
  | 'contracts_mgmt'
  | 'subsidies_mgmt'
  | 'academy_mgmt'
  | 'orders' 
  | 'products' 
  | 'members' 
  | 'procurement_finance' 
  | 'market_sync' 
  | 'farmers'
  | 'news_mgmt'
  | 'articles_mgmt'
  | 'brand_mgmt'
  | 'inquiries_mgmt';

interface AdminDashboardProps {
  onNavigate?: (view: ViewMode) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('cooperatives_mgmt');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // Data State
  const [productsList, setProductsList] = useState<Product[]>(MOCK_PRODUCTS);
  const [ordersList, setOrdersList] = useState<Order[]>(MOCK_ORDERS);
  const [membersList, setMembersList] = useState<Member[]>(MOCK_MEMBERS);
  const [procurementsList, setProcurementsList] = useState<ProcurementRecord[]>(MOCK_PROCUREMENTS);
  const [settlementsList, setSettlementsList] = useState<FinancialSettlement[]>(MOCK_SETTLEMENTS);

  // Four Content Frontend Corresponding State
  const [brandStoryData, setBrandStoryData] = useState<BrandStoryData>(MOCK_BRAND_STORY);
  const [newsList, setNewsList] = useState<NewsItem[]>(MOCK_NEWS);
  const [articlesList, setArticlesList] = useState<ArticleItem[]>(MOCK_ARTICLES);
  const [inquiriesList, setInquiriesList] = useState<ContactInquiry[]>(MOCK_INQUIRIES);
  const [faqsList, setFaqsList] = useState<FaqItem[]>(MOCK_FAQS);

  // New Farmers Cooperatives Hub & Traceability & Contracts State
  const [cooperativesList, setCooperativesList] = useState<CooperativeItem[]>(MOCK_COOPERATIVES);
  const [coopAppsList, setCoopAppsList] = useState<CooperativeApplication[]>(MOCK_COOPERATIVE_APPLICATIONS);
  const [traceRecordsMap, setTraceRecordsMap] = useState<Record<string, TraceRecord>>(MOCK_TRACE_RECORDS);
  const [contractsList, setContractsList] = useState<ContractProject[]>(MOCK_CONTRACT_PROJECTS);
  const [subsidiesList, setSubsidiesList] = useState<SubsidyItem[]>(MOCK_SUBSIDIES);
  const [academyList, setAcademyList] = useState<AcademyCourse[]>(MOCK_ACADEMY_COURSES);

  // Subtab for Procurement & Finance
  const [financeSubTab, setFinanceSubTab] = useState<'procurement' | 'settlement'>('procurement');

  // Search & Filter States
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');
  const [productTempFilter, setProductTempFilter] = useState('all');

  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');

  const [memberSearch, setMemberSearch] = useState('');
  const [memberTierFilter, setMemberTierFilter] = useState('all');

  const [procurementSearch, setProcurementSearch] = useState('');
  const [settlementSearch, setSettlementSearch] = useState('');

  // Modals Open & Target Item States
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);

  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  const [isProcurementModalOpen, setIsProcurementModalOpen] = useState(false);
  const [editingProcurement, setEditingProcurement] = useState<ProcurementRecord | null>(null);

  const [isSettlementModalOpen, setIsSettlementModalOpen] = useState(false);
  const [editingSettlement, setEditingSettlement] = useState<FinancialSettlement | null>(null);

  // Sync state
  const [isSyncing, setIsSyncing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleSyncMoa = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      showToast('已完成農業部 Open Data 批發市場交易均價與產銷履歷驗證資料即時同步！');
    }, 1200);
  };

  // --- Product Handlers ---
  const handleSaveProduct = (product: Product) => {
    if (editingProduct) {
      setProductsList(prev => prev.map(p => p.id === product.id ? product : p));
      showToast(`已成功更新農產品「${product.name}」資料！`);
    } else {
      setProductsList(prev => [product, ...prev]);
      showToast(`已成功新增並上架農產品「${product.name}」！`);
    }
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (window.confirm(`確定要下架並刪除商品「${name}」嗎？`)) {
      setProductsList(prev => prev.filter(p => p.id !== id));
      showToast(`商品「${name}」已下架刪除。`);
    }
  };

  const handleToggleStock = (id: string, newStock: number) => {
    setProductsList(prev => prev.map(p => p.id === id ? { ...p, stock: Math.max(0, newStock) } : p));
  };

  // --- Order Handlers ---
  const handleSaveOrder = (order: Order) => {
    if (editingOrder) {
      setOrdersList(prev => prev.map(o => o.id === order.id ? order : o));
      showToast(`訂單「${order.orderNo}」資料已更新！`);
    } else {
      setOrdersList(prev => [order, ...prev]);
      showToast(`已成功建立新訂單「${order.orderNo}」！`);
    }
  };

  const handleDeleteOrder = (id: string, orderNo: string) => {
    if (window.confirm(`確定要取消/刪除訂單「${orderNo}」嗎？`)) {
      setOrdersList(prev => prev.filter(o => o.id !== id));
      showToast(`訂單「${orderNo}」已取消刪除。`);
    }
  };

  const handleQuickShipOrder = (orderId: string) => {
    setOrdersList(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          shippingStatus: 'shipped',
          trackingNumber: o.trackingNumber || `TC-2026-${Math.floor(10000 + Math.random() * 90000)}`
        };
      }
      return o;
    }));
    showToast('已一鍵標記為冷鏈運送中並派生物流單號！');
  };

  // --- Member Handlers ---
  const handleSaveMember = (member: Member) => {
    if (editingMember) {
      setMembersList(prev => prev.map(m => m.id === member.id ? member : m));
      showToast(`會員「${member.name}」資料已更新！`);
    } else {
      setMembersList(prev => [member, ...prev]);
      showToast(`已成功新增會員「${member.name}」！`);
    }
  };

  const handleDeleteMember = (id: string, name: string) => {
    if (window.confirm(`確定要將會員「${name}」移除或設為停權嗎？`)) {
      setMembersList(prev => prev.filter(m => m.id !== id));
      showToast(`會員「${name}」已移除。`);
    }
  };

  const handleToggleMemberStatus = (id: string) => {
    setMembersList(prev => prev.map(m => {
      if (m.id === id) {
        const nextStatus = m.status === 'active' ? 'suspended' : 'active';
        return { ...m, status: nextStatus };
      }
      return m;
    }));
    showToast('會員狀態已變更。');
  };

  // --- Procurement Handlers ---
  const handleSaveProcurement = (record: ProcurementRecord) => {
    if (editingProcurement) {
      setProcurementsList(prev => prev.map(p => p.id === record.id ? record : p));
      showToast(`進貨單「${record.procurementNo}」已更新！`);
    } else {
      setProcurementsList(prev => [record, ...prev]);
      showToast(`已成功建立小農進貨採購單「${record.procurementNo}」！`);
    }
  };

  const handleDeleteProcurement = (id: string, procurementNo: string) => {
    if (window.confirm(`確定要刪除進貨單「${procurementNo}」嗎？`)) {
      setProcurementsList(prev => prev.filter(p => p.id !== id));
      showToast(`進貨單「${procurementNo}」已刪除。`);
    }
  };

  // --- Settlement Handlers ---
  const handleSaveSettlement = (settlement: FinancialSettlement) => {
    if (editingSettlement) {
      setSettlementsList(prev => prev.map(s => s.id === settlement.id ? settlement : s));
      showToast(`財務結算單「${settlement.settlementNo}」已更新！`);
    } else {
      setSettlementsList(prev => [settlement, ...prev]);
      showToast(`已成功建立財務結算單「${settlement.settlementNo}」！`);
    }
  };

  const handleDeleteSettlement = (id: string, settlementNo: string) => {
    if (window.confirm(`確定要刪除結算單「${settlementNo}」嗎？`)) {
      setSettlementsList(prev => prev.filter(s => s.id !== id));
      showToast(`結算單「${settlementNo}」已刪除。`);
    }
  };

  const handleQuickSettlePayout = (id: string) => {
    const ref = `TXN-BOT-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;
    setSettlementsList(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          status: 'settled',
          paymentReference: ref
        };
      }
      return s;
    }));
    showToast(`款項已核撥！產生銀行匯款序號：${ref}`);
  };

  // --- Brand Story Handlers ---
  const handleSaveBrandStory = (newData: BrandStoryData) => {
    setBrandStoryData(newData);
  };

  // --- News Handlers ---
  const handleSaveNews = (news: NewsItem) => {
    setNewsList(prev => {
      const exists = prev.some(n => n.id === news.id);
      if (exists) {
        return prev.map(n => n.id === news.id ? news : n);
      }
      return [news, ...prev];
    });
    showToast(`最新消息「${news.title}」已成功儲存發布！`);
  };

  const handleDeleteNews = (id: string, title: string) => {
    if (window.confirm(`確定要刪除消息公告「${title}」嗎？`)) {
      setNewsList(prev => prev.filter(n => n.id !== id));
      showToast(`消息「${title}」已刪除。`);
    }
  };

  const handleToggleNewsPinned = (id: string) => {
    setNewsList(prev => prev.map(n => {
      if (n.id === id) {
        const next = !n.isPinned;
        showToast(`已${next ? '將' : '取消'}「${n.title}」設為置頂！`);
        return { ...n, isPinned: next };
      }
      return n;
    }));
  };

  // --- Articles Handlers ---
  const handleSaveArticle = (article: ArticleItem) => {
    setArticlesList(prev => {
      const exists = prev.some(a => a.id === article.id);
      if (exists) {
        return prev.map(a => a.id === article.id ? article : a);
      }
      return [article, ...prev];
    });
    showToast(`專欄報導「${article.title}」已成功儲存發布！`);
  };

  const handleDeleteArticle = (id: string, title: string) => {
    if (window.confirm(`確定要刪除專欄文章「${title}」嗎？`)) {
      setArticlesList(prev => prev.filter(a => a.id !== id));
      showToast(`專欄文章「${title}」已刪除。`);
    }
  };

  // --- Inquiries Handlers ---
  const handleSaveInquiry = (inquiry: ContactInquiry) => {
    setInquiriesList(prev => prev.map(i => i.id === inquiry.id ? inquiry : i));
    showToast(`工單「${inquiry.inquiryNo || inquiry.id}」處理狀態已儲存！`);
  };

  const handleDeleteInquiry = (id: string, name: string) => {
    if (window.confirm(`確定要刪除來自「${name}」的諮詢工單嗎？`)) {
      setInquiriesList(prev => prev.filter(i => i.id !== id));
      showToast(`諮詢工單已刪除。`);
    }
  };

  // --- FAQ Handlers ---
  const handleSaveFaq = (faq: FaqItem) => {
    setFaqsList(prev => {
      const exists = prev.some(f => f.id === faq.id);
      if (exists) {
        return prev.map(f => f.id === faq.id ? faq : f);
      }
      return [faq, ...prev];
    });
    showToast(`常見問題庫「${faq.q}」已更新儲存！`);
  };

  const handleDeleteFaq = (id: string, q: string) => {
    if (window.confirm(`確定要刪除常見問題「${q}」嗎？`)) {
      setFaqsList(prev => prev.filter(f => f.id !== id));
      showToast(`常見問題已刪除。`);
    }
  };

  // --- Cooperative & Farm Hub Handlers ---
  const handleSaveCooperative = (coop: CooperativeItem) => {
    setCooperativesList(prev => {
      const exists = prev.some(c => c.id === coop.id);
      if (exists) {
        return prev.map(c => c.id === coop.id ? coop : c);
      }
      return [coop, ...prev];
    });
    showToast(`合作社場「${coop.name}」已成功儲存！`);
  };

  const handleDeleteCooperative = (id: string, name: string) => {
    if (window.confirm(`確定要刪除合作社「${name}」的建檔資料嗎？`)) {
      setCooperativesList(prev => prev.filter(c => c.id !== id));
      showToast(`合作社已移除。`);
    }
  };

  const handleUpdateCoopAppStatus = (id: string, newStatus: CooperativeApplication['status']) => {
    setCoopAppsList(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
    showToast(`申請案件狀態已更新為「${newStatus}」！`);
  };

  const handleDeleteCoopApp = (id: string, orgName: string) => {
    if (window.confirm(`確定要刪除「${orgName}」的申請單嗎？`)) {
      setCoopAppsList(prev => prev.filter(a => a.id !== id));
      showToast(`申請單已刪除。`);
    }
  };

  // --- Traceability Handlers ---
  const handleSaveTraceRecord = (record: TraceRecord) => {
    setTraceRecordsMap(prev => ({
      ...prev,
      [record.traceCode]: record
    }));
    showToast(`履歷溯源碼「${record.traceCode}」檢驗報告已儲存！`);
  };

  const handleDeleteTraceRecord = (code: string) => {
    if (window.confirm(`確定要刪除履歷批次「${code}」嗎？`)) {
      setTraceRecordsMap(prev => {
        const next = { ...prev };
        delete next[code];
        return next;
      });
      showToast(`溯源履歷批次已刪除。`);
    }
  };

  // --- Contract Farming Handlers ---
  const handleSaveContractProject = (project: ContractProject) => {
    setContractsList(prev => {
      const exists = prev.some(p => p.id === project.id);
      if (exists) {
        return prev.map(p => p.id === project.id ? project : p);
      }
      return [project, ...prev];
    });
    showToast(`契作認養專案「${project.title}」已成功發布！`);
  };

  const handleDeleteContractProject = (id: string, title: string) => {
    if (window.confirm(`確定要下架刪除契作專案「${title}」嗎？`)) {
      setContractsList(prev => prev.filter(p => p.id !== id));
      showToast(`契作認養專案已下架刪除。`);
    }
  };

  // --- Subsidies Handlers ---
  const handleSaveSubsidy = (subsidy: SubsidyItem) => {
    setSubsidiesList(prev => {
      const exists = prev.some(s => s.id === subsidy.id);
      if (exists) {
        return prev.map(s => s.id === subsidy.id ? subsidy : s);
      }
      return [subsidy, ...prev];
    });
    showToast(`農業補助專案「${subsidy.title}」已更新發布！`);
  };

  const handleDeleteSubsidy = (id: string, title: string) => {
    if (window.confirm(`確定要刪除補助專案「${title}」嗎？`)) {
      setSubsidiesList(prev => prev.filter(s => s.id !== id));
      showToast(`補助專案已刪除。`);
    }
  };

  // --- Academy Handlers ---
  const handleSaveCourse = (course: AcademyCourse) => {
    setAcademyList(prev => {
      const exists = prev.some(c => c.id === course.id);
      if (exists) {
        return prev.map(c => c.id === course.id ? course : c);
      }
      return [course, ...prev];
    });
    showToast(`培訓課程「${course.title}」已成功開設！`);
  };

  const handleDeleteCourse = (id: string, title: string) => {
    if (window.confirm(`確定要停開並刪除課程「${title}」嗎？`)) {
      setAcademyList(prev => prev.filter(c => c.id !== id));
      showToast(`培訓課程已刪除。`);
    }
  };

  // Filters calculation
  const filteredProducts = productsList.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.origin.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.farmerName.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.traceCode.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCat = productCategoryFilter === 'all' || p.category === productCategoryFilter;
    const matchesTemp = productTempFilter === 'all' || p.tempZone === productTempFilter;
    return matchesSearch && matchesCat && matchesTemp;
  });

  const filteredOrders = ordersList.filter(o => {
    const matchesSearch = o.orderNo.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.phone.includes(orderSearch) ||
      o.address.toLowerCase().includes(orderSearch.toLowerCase());
    const matchesStatus = orderStatusFilter === 'all' || o.shippingStatus === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredMembers = membersList.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
      m.phone.includes(memberSearch) ||
      m.email.toLowerCase().includes(memberSearch.toLowerCase()) ||
      m.memberNo.toLowerCase().includes(memberSearch.toLowerCase());
    const matchesTier = memberTierFilter === 'all' || m.tier === memberTierFilter;
    return matchesSearch && matchesTier;
  });

  const filteredProcurements = procurementsList.filter(p => {
    return p.procurementNo.toLowerCase().includes(procurementSearch.toLowerCase()) ||
      p.farmerName.toLowerCase().includes(procurementSearch.toLowerCase()) ||
      p.farmName.toLowerCase().includes(procurementSearch.toLowerCase()) ||
      p.cropName.toLowerCase().includes(procurementSearch.toLowerCase()) ||
      p.batchCode.toLowerCase().includes(procurementSearch.toLowerCase());
  });

  const filteredSettlements = settlementsList.filter(s => {
    return s.settlementNo.toLowerCase().includes(settlementSearch.toLowerCase()) ||
      s.farmerName.toLowerCase().includes(settlementSearch.toLowerCase()) ||
      s.farmName.toLowerCase().includes(settlementSearch.toLowerCase()) ||
      s.period.toLowerCase().includes(settlementSearch.toLowerCase());
  });

  // Overview metrics
  const totalRevenue = ordersList.reduce((acc, o) => acc + o.totalAmount, 0);
  const pendingOrdersCount = ordersList.filter(o => o.shippingStatus === 'preparing').length;
  const totalMembersCount = membersList.length;
  const totalProcurementCost = procurementsList.reduce((acc, p) => acc + p.totalCost, 0);
  const pendingInquiriesCount = inquiriesList.filter(i => i.status === 'pending').length;
  const pendingAppsCount = coopAppsList.filter(a => a.status === 'submitted' || a.status === 'reviewing').length;

  // Navigation items grouped for Left Sidebar
  const navigationGroups: {
    groupTitle: string;
    items: {
      id: AdminTab;
      label: string;
      icon: any;
      badge?: string;
      badgeColor?: string;
      desc: string;
    }[];
  }[] = [
    {
      groupTitle: '農友社場與契作溯源中樞 (整合模組)',
      items: [
        {
          id: 'cooperatives_mgmt',
          label: '合作社場名錄維護',
          icon: Building2,
          badge: `${cooperativesList.length} 家`,
          badgeColor: 'bg-emerald-400 text-emerald-950',
          desc: '全台合作社與產銷班'
        },
        {
          id: 'coop_apps_mgmt',
          label: '轉型輔導申請審查',
          icon: FileCheck,
          badge: pendingAppsCount > 0 ? `${pendingAppsCount} 待審` : undefined,
          badgeColor: 'bg-amber-400 text-amber-950',
          desc: '產銷班升級與上架'
        },
        {
          id: 'trace_mgmt',
          label: 'TAP 產銷溯源與農檢',
          icon: QrCode,
          badge: `${Object.keys(traceRecordsMap).length} 組`,
          badgeColor: 'bg-emerald-400 text-emerald-950',
          desc: '20碼履歷與SGS檢驗'
        },
        {
          id: 'contracts_mgmt',
          label: '小農契作與果樹認養',
          icon: Sprout,
          badge: `${contractsList.length} 檔`,
          badgeColor: 'bg-teal-400 text-teal-950',
          desc: '認養份額與木牌名冊'
        },
        {
          id: 'subsidies_mgmt',
          label: '冷鏈與設施補助專案',
          icon: Landmark,
          badge: `${subsidiesList.length} 案`,
          badgeColor: 'bg-slate-700 text-slate-200',
          desc: '農業部補助與計畫書'
        },
        {
          id: 'academy_mgmt',
          label: '農民學院培訓課程',
          icon: GraduationCap,
          badge: `${academyList.length} 門`,
          badgeColor: 'bg-slate-700 text-slate-200',
          desc: '智慧農業與冷鏈培訓'
        }
      ]
    },
    {
      groupTitle: '內容發布與食農專欄 (前台對應)',
      items: [
        {
          id: 'news_mgmt',
          label: '最新消息發布管理',
          icon: FileText,
          badge: `${newsList.length} 則`,
          badgeColor: 'bg-emerald-400 text-emerald-950',
          desc: '產地特報與公告'
        },
        {
          id: 'articles_mgmt',
          label: '專欄報導與深度專訪',
          icon: BookOpen,
          badge: `${articlesList.length} 篇`,
          badgeColor: 'bg-emerald-400 text-emerald-950',
          desc: '食農專欄與風土誌'
        },
        {
          id: 'brand_mgmt',
          label: '品牌故事與理念維護',
          icon: Compass,
          badge: '核心理念',
          badgeColor: 'bg-slate-700 text-slate-200',
          desc: '創立緣起與里程碑'
        },
        {
          id: 'inquiries_mgmt',
          label: '聯絡諮詢與客服工單',
          icon: MessageSquare,
          badge: pendingInquiriesCount > 0 ? `${pendingInquiriesCount} 待辦` : `${inquiriesList.length} 筆`,
          badgeColor: pendingInquiriesCount > 0 ? 'bg-rose-400 text-rose-950' : 'bg-slate-700 text-slate-200',
          desc: '客戶諮詢與FAQ維護'
        }
      ]
    },
    {
      groupTitle: '核心商城營運',
      items: [
        {
          id: 'orders',
          label: '商城訂單與出貨',
          icon: ShoppingBag,
          badge: pendingOrdersCount > 0 ? `${pendingOrdersCount} 待出貨` : undefined,
          badgeColor: 'bg-amber-400 text-amber-950',
          desc: '訂單狀態與冷鏈物流'
        },
        {
          id: 'products',
          label: '農產品與庫存',
          icon: Package,
          badge: `${productsList.length} 款`,
          badgeColor: 'bg-slate-700 text-slate-200',
          desc: '規格定價與溫層管理'
        },
        {
          id: 'members',
          label: '商城會員體系',
          icon: Users,
          badge: `${membersList.length} 人`,
          badgeColor: 'bg-slate-700 text-slate-200',
          desc: '會員等級與綠色點數'
        }
      ]
    },
    {
      groupTitle: '小農契作與財務',
      items: [
        {
          id: 'procurement_finance',
          label: '供貨採購與結算',
          icon: DollarSign,
          badge: '雙向核帳',
          badgeColor: 'bg-teal-400 text-teal-950',
          desc: '農友進貨與財務分潤'
        },
        {
          id: 'farmers',
          label: '小農審核與履歷',
          icon: ShieldCheck,
          badge: `${MOCK_FARMERS.length} 班`,
          badgeColor: 'bg-slate-700 text-slate-200',
          desc: 'TAP履歷與有機驗證'
        }
      ]
    },
    {
      groupTitle: '大數據與決策中樞',
      items: [
        {
          id: 'overview',
          label: '營運總覽儀表板',
          icon: LayoutDashboard,
          desc: '營收指標與核心KPI'
        },
        {
          id: 'market_sync',
          label: '行情即時同步',
          icon: TrendingUp,
          badge: '農業部API',
          badgeColor: 'bg-emerald-400 text-emerald-950',
          desc: '批發市場交易均價'
        }
      ]
    }
  ];

  const currentTabInfo = navigationGroups
    .flatMap(g => g.items)
    .find(item => item.id === activeTab);

  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col lg:flex-row">
      
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 text-xs flex items-center gap-2.5 animate-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white p-0.5 ml-2 cursor-pointer">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Mobile Top Header (Small Screens Only) */}
      <div className="lg:hidden bg-slate-900 text-white px-4 py-3 flex items-center justify-between border-b border-slate-800 sticky top-14 z-30 shadow-xs">
        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-700 cursor-pointer"
            aria-label="開啟功能選單"
          >
            <Menu className="w-5 h-5 text-emerald-400" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-emerald-600 flex items-center justify-center font-black text-xs">
              方
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>好農後台</span>
                <span className="text-slate-500">•</span>
                <span className="text-emerald-300 font-normal">{currentTabInfo?.label}</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleSyncMoa}
          disabled={isSyncing}
          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-md text-[11px] font-bold transition-all flex items-center gap-1 shadow-2xs cursor-pointer"
        >
          <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? '同步中' : '同步行情'}</span>
        </button>
      </div>

      {/* Mobile Sidebar Overlay Backdrop */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/70 z-40 lg:hidden backdrop-blur-xs"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* ========================================================= */}
      {/* LEFT SIDEBAR (左側功能導覽欄) */}
      {/* ========================================================= */}
      <aside 
        className={`fixed lg:sticky top-0 lg:top-14 h-screen lg:h-[calc(100vh-3.5rem)] w-64 xl:w-72 bg-slate-900 border-r border-slate-800 text-white shrink-0 z-50 lg:z-20 flex flex-col justify-between transition-transform duration-300 ease-in-out overflow-y-auto ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 space-y-5">
          {/* Sidebar Brand Header */}
          <div className="pb-4 border-b border-slate-800/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center font-black text-sm shadow-md text-white border border-emerald-400/30">
                  方
                </div>
                <div>
                  <h1 className="font-extrabold text-sm tracking-tight text-white flex items-center gap-1.5">
                    好農方舟
                    <span className="bg-emerald-500/20 text-emerald-300 text-[9px] font-mono px-1.5 py-0.2 rounded border border-emerald-500/30 font-normal">
                      營運後台
                    </span>
                  </h1>
                  <p className="text-[10px] text-slate-400">農產供應鏈智慧管理系統</p>
                </div>
              </div>

              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="lg:hidden p-1 text-slate-400 hover:text-white rounded-md cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Live API Status Indicator */}
            <div className="mt-3 bg-slate-800/80 rounded-lg px-2.5 py-1.5 border border-slate-700/60 flex items-center justify-between text-[10px]">
              <span className="text-slate-300 flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>農業部 API 連線</span>
              </span>
              <span className="text-emerald-400 font-mono font-bold">正常運作</span>
            </div>
          </div>

          {/* Grouped Nav Items */}
          <nav className="space-y-4">
            {navigationGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-1">
                <div className="px-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase flex items-center justify-between">
                  <span>{group.groupTitle}</span>
                  <span className="h-px bg-slate-800 flex-1 ml-2"></span>
                </div>
                <div className="space-y-0.5 mt-1">
                  {group.items.map(tab => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id);
                          setIsMobileSidebarOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-all text-left cursor-pointer group ${
                          isActive
                            ? 'bg-emerald-600 text-white font-bold shadow-xs'
                            : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5 min-w-0">
                          <div className={`p-1 rounded-md transition-colors ${
                            isActive ? 'bg-emerald-700 text-white' : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                          }`}>
                            <Icon className="w-3.5 h-3.5 shrink-0" />
                          </div>
                          <div className="truncate">
                            <div className="truncate text-xs">{tab.label}</div>
                            <div className={`text-[9px] font-normal truncate ${
                              isActive ? 'text-emerald-100' : 'text-slate-400'
                            }`}>
                              {tab.desc}
                            </div>
                          </div>
                        </div>

                        {tab.badge && (
                          <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold shrink-0 ml-1.5 ${
                            isActive 
                              ? 'bg-white text-emerald-950' 
                              : tab.badgeColor || 'bg-slate-800 text-slate-300'
                          }`}>
                            {tab.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800/80 space-y-3 bg-slate-950/40">
          <button
            onClick={handleSyncMoa}
            disabled={isSyncing}
            className="w-full px-3 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-emerald-300 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 border border-slate-700 cursor-pointer shadow-2xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? '正在連線農業部...' : '即時同步批發行情'}</span>
          </button>

          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span>營運處 Admin</span>
            </div>
            <span className="font-mono text-slate-400">v2.6.4</span>
          </div>
        </div>
      </aside>

      {/* ========================================================= */}
      {/* RIGHT MAIN CONTENT AREA (右側主功能模組區) */}
      {/* ========================================================= */}
      <main className="flex-1 min-w-0 p-3 sm:p-5 lg:p-6 space-y-4">

        {/* Top Breadcrumb & Status Bar for Desktop */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-slate-100 rounded-lg text-slate-800">
              {currentTabInfo && <currentTabInfo.icon className="w-4 h-4 text-emerald-700" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400 font-medium">後台管理系統</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <h2 className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight">
                  {currentTabInfo?.label}
                </h2>
                {currentTabInfo?.badge && (
                  <span className="bg-emerald-50 text-emerald-800 text-[10px] font-mono font-bold px-1.5 py-0.2 rounded border border-emerald-200">
                    {currentTabInfo.badge}
                  </span>
                )}
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">
                {currentTabInfo?.desc} ｜ 提供即時數據更新、雙向核帳、批發行情比對與履歷合規審查
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <span className="text-[10px] text-slate-400 font-mono hidden md:inline">
              待出貨: <strong className="text-amber-600">{pendingOrdersCount}</strong> 筆 ｜ 總會員: <strong className="text-slate-800">{membersList.length}</strong> 人
            </span>
            <button
              onClick={handleSyncMoa}
              disabled={isSyncing}
              className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{isSyncing ? '同步中...' : '同步行情'}</span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* MODULE 1: 商城訂單與出貨管理 (Orders & Shipping Management) */}
        {/* ========================================================= */}
        {activeTab === 'orders' && (
          <div className="space-y-3">
            {/* Quick Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                <div className="text-slate-500 text-[10px] font-semibold">總訂單數量</div>
                <div className="text-lg font-mono font-black text-slate-900 mt-0.5">{ordersList.length} 筆</div>
                <div className="text-[10px] text-emerald-700">已串接黑貓/新竹物流</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                <div className="text-slate-500 text-[10px] font-semibold">低溫備貨中 (待出貨)</div>
                <div className="text-lg font-mono font-black text-amber-600 mt-0.5">{pendingOrdersCount} 筆</div>
                <div className="text-[10px] text-amber-700">急需分裝包裝</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                <div className="text-slate-500 text-[10px] font-semibold">冷鏈運送中</div>
                <div className="text-lg font-mono font-black text-teal-600 mt-0.5">
                  {ordersList.filter(o => o.shippingStatus === 'shipped').length} 筆
                </div>
                <div className="text-[10px] text-teal-700">溫控0-7℃在途</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                <div className="text-slate-500 text-[10px] font-semibold">累計訂單總交易額</div>
                <div className="text-lg font-mono font-black text-emerald-950 mt-0.5">NT$ {totalRevenue.toLocaleString()}</div>
                <div className="text-[10px] text-slate-400">含綠色點數折抵</div>
              </div>
            </div>

            {/* Filter & Action Bar */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-3 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-slate-200">
                <div>
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                    <ShoppingBag className="w-4 h-4 text-emerald-700" />
                    <span>商城訂單與出貨管理</span>
                  </h3>
                  <p className="text-[10px] text-slate-500">管理顧客訂單、冷鏈溫層分流、物流托運單號及出貨進度</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingOrder(null);
                      setIsOrderModalOpen(true);
                    }}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>新增商城訂單</span>
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="搜尋訂單編號、顧客姓名、手機電話或地址..."
                    value={orderSearch}
                    onChange={e => setOrderSearch(e.target.value)}
                    className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-emerald-600"
                  />
                </div>

                <select
                  value={orderStatusFilter}
                  onChange={e => setOrderStatusFilter(e.target.value)}
                  className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md font-semibold"
                >
                  <option value="all">所有配送狀態</option>
                  <option value="preparing">低溫備貨中</option>
                  <option value="shipped">已出貨 (冷鏈運送中)</option>
                  <option value="delivered">已送達</option>
                  <option value="cancelled">已取消</option>
                </select>
              </div>

              {/* Orders Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-[11px]">
                    <tr>
                      <th className="py-2 px-2.5">訂單編號 / 成立時間</th>
                      <th className="py-2 px-2.5">收件人 / 聯絡電話</th>
                      <th className="py-2 px-2.5">商品品項與溫層</th>
                      <th className="py-2 px-2.5 text-right">實付總額</th>
                      <th className="py-2 px-2.5">物流商 / 托運單號</th>
                      <th className="py-2 px-2 text-center">付款</th>
                      <th className="py-2 px-2 text-center">配送進度</th>
                      <th className="py-2 px-2.5 text-center">管理操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-slate-400 text-xs">
                          查無符合條件之訂單紀錄
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map(ord => (
                        <tr key={ord.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-2 px-2.5">
                            <div className="font-mono font-bold text-slate-900">{ord.orderNo}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{ord.createdAt}</div>
                          </td>
                          <td className="py-2 px-2.5">
                            <div className="font-bold text-slate-800">{ord.customerName}</div>
                            <div className="text-[10px] text-slate-500 font-mono">{ord.phone}</div>
                            <div className="text-[10px] text-slate-400 truncate max-w-[150px]">{ord.address}</div>
                          </td>
                          <td className="py-2 px-2.5">
                            <div className="space-y-0.5">
                              {ord.items.map((it, idx) => (
                                <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-700">
                                  <span className="font-medium">{it.productName}</span>
                                  <span className="text-slate-400 font-mono">×{it.quantity}</span>
                                  <span className={`text-[9px] px-1 rounded font-bold ${
                                    it.tempZone === 'chilled' ? 'bg-teal-50 text-teal-700 border border-teal-200' :
                                    it.tempZone === 'frozen' ? 'bg-cyan-50 text-cyan-700 border border-cyan-200' :
                                    'bg-slate-100 text-slate-600'
                                  }`}>
                                    {it.tempZone === 'chilled' ? '冷藏' : it.tempZone === 'frozen' ? '冷凍' : '常溫'}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="py-2 px-2.5 text-right">
                            <div className="font-mono font-black text-emerald-950 text-xs sm:text-sm">
                              ${ord.totalAmount}
                            </div>
                            {ord.shippingFee > 0 && (
                              <div className="text-[10px] text-slate-400">含運 ${ord.shippingFee}</div>
                            )}
                          </td>
                          <td className="py-2 px-2.5">
                            <div className="text-[11px] font-semibold text-slate-700">{ord.carrier || '黑貓低溫冷藏'}</div>
                            <div className="font-mono text-[10px] text-slate-500">{ord.trackingNumber || '待出貨產生'}</div>
                          </td>
                          <td className="py-2 px-2 text-center">
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              ord.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-800' :
                              ord.paymentStatus === 'pending' ? 'bg-amber-100 text-amber-800' :
                              'bg-rose-100 text-rose-800'
                            }`}>
                              {ord.paymentStatus === 'paid' ? '已付款' : ord.paymentStatus === 'pending' ? '待付款' : '失敗'}
                            </span>
                          </td>
                          <td className="py-2 px-2 text-center">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              ord.shippingStatus === 'preparing' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                              ord.shippingStatus === 'shipped' ? 'bg-teal-100 text-teal-800 border border-teal-200' :
                              ord.shippingStatus === 'delivered' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                              'bg-slate-100 text-slate-600'
                            }`}>
                              {ord.shippingStatus === 'preparing' ? '低溫備貨中' :
                               ord.shippingStatus === 'shipped' ? '已出貨' :
                               ord.shippingStatus === 'delivered' ? '已送達' : '已取消'}
                            </span>
                          </td>
                          <td className="py-2 px-2.5 text-center">
                            <div className="flex items-center justify-center gap-1">
                              {ord.shippingStatus === 'preparing' && (
                                <button
                                  onClick={() => handleQuickShipOrder(ord.id)}
                                  className="p-1 bg-teal-50 hover:bg-teal-100 text-teal-800 rounded transition-colors cursor-pointer"
                                  title="一鍵出貨"
                                >
                                  <Truck className="w-3.5 h-3.5" />
                                </button>
                              )}
                              <button
                                onClick={() => {
                                  setEditingOrder(ord);
                                  setIsOrderModalOpen(true);
                                }}
                                className="p-1 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 rounded transition-colors cursor-pointer"
                                title="編輯訂單 / 出貨物流"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteOrder(ord.id, ord.orderNo)}
                                className="p-1 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 rounded transition-colors cursor-pointer"
                                title="刪除 / 取消訂單"
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
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODULE 2: 農產品與庫存管理 (Produce & Inventory Management) */}
        {/* ========================================================= */}
        {activeTab === 'products' && (
          <div className="space-y-3">
            {/* Metric Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                <div className="text-slate-500 text-[10px] font-semibold">上架農產品總數</div>
                <div className="text-lg font-mono font-black text-slate-900 mt-0.5">{productsList.length} 款</div>
                <div className="text-[10px] text-emerald-700">涵蓋全台優質產區</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                <div className="text-slate-500 text-[10px] font-semibold">低溫冷藏 / 急凍品項</div>
                <div className="text-lg font-mono font-black text-teal-600 mt-0.5">
                  {productsList.filter(p => p.tempZone !== 'normal').length} 款
                </div>
                <div className="text-[10px] text-teal-700">全程冷鏈不斷鏈</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                <div className="text-slate-500 text-[10px] font-semibold">低庫存警戒 (庫存 &lt; 20)</div>
                <div className="text-lg font-mono font-black text-rose-600 mt-0.5">
                  {productsList.filter(p => p.stock < 20).length} 項
                </div>
                <div className="text-[10px] text-rose-700">需通知產銷班補貨</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                <div className="text-slate-500 text-[10px] font-semibold">TAP 產銷履歷驗證率</div>
                <div className="text-lg font-mono font-black text-emerald-950 mt-0.5">100%</div>
                <div className="text-[10px] text-slate-400">具備溯源QR Code</div>
              </div>
            </div>

            {/* Product List Panel */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-3 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-slate-200">
                <div>
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                    <Package className="w-4 h-4 text-emerald-700" />
                    <span>農產品與庫存管理</span>
                  </h3>
                  <p className="text-[10px] text-slate-500">管理商城上架、溫層溫控設定、產銷履歷號碼、即時調價與庫存數量</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingProduct(null);
                      setIsProductModalOpen(true);
                    }}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>新增上架農產品</span>
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="搜尋作物名稱、產地、合作小農或履歷碼..."
                    value={productSearch}
                    onChange={e => setProductSearch(e.target.value)}
                    className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-emerald-600"
                  />
                </div>

                <select
                  value={productCategoryFilter}
                  onChange={e => setProductCategoryFilter(e.target.value)}
                  className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md font-semibold"
                >
                  <option value="all">所有作物分類</option>
                  <option value="vegetable">有機蔬菜</option>
                  <option value="fruit">節令水果</option>
                  <option value="seafood">安心水產</option>
                  <option value="meat">安心肉品</option>
                  <option value="processed">優質米糧/好物</option>
                  <option value="gift">小農精品禮盒</option>
                </select>

                <select
                  value={productTempFilter}
                  onChange={e => setProductTempFilter(e.target.value)}
                  className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md font-semibold"
                >
                  <option value="all">所有冷鏈溫層</option>
                  <option value="normal">常溫配送</option>
                  <option value="chilled">低溫冷藏 (0-7℃)</option>
                  <option value="frozen">極低溫急凍 (-18℃)</option>
                </select>
              </div>

              {/* Products Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-[11px]">
                    <tr>
                      <th className="py-2 px-2.5">商品名稱 / 分類</th>
                      <th className="py-2 px-2.5">產地與供貨小農</th>
                      <th className="py-2 px-2 text-center">溫層</th>
                      <th className="py-2 px-2 text-right">會員售價 (NT$)</th>
                      <th className="py-2 px-2.5 text-center">庫存數量</th>
                      <th className="py-2 px-2.5">TAP 產銷履歷號碼</th>
                      <th className="py-2 px-2.5 text-center">管理操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-400 text-xs">
                          查無符合條件之農產品
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map(p => (
                        <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-2 px-2.5">
                            <div className="flex items-center gap-2">
                              <img src={p.image} alt={p.name} className="w-8 h-8 rounded object-cover border border-slate-200 shrink-0" />
                              <div>
                                <div className="font-bold text-slate-900">{p.name}</div>
                                <div className="text-[10px] text-slate-400">{p.categoryName} ｜ {p.weight}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-2 px-2.5">
                            <div className="font-semibold text-slate-800">{p.origin}</div>
                            <div className="text-[10px] text-emerald-800 font-bold">{p.farmerName} ({p.farmName})</div>
                          </td>
                          <td className="py-2 px-2 text-center">
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              p.tempZone === 'chilled' ? 'bg-teal-100 text-teal-800' :
                              p.tempZone === 'frozen' ? 'bg-cyan-100 text-cyan-800' : 'bg-slate-100 text-slate-700'
                            }`}>
                              {p.tempZone === 'chilled' ? '冷藏' : p.tempZone === 'frozen' ? '冷凍' : '常溫'}
                            </span>
                          </td>
                          <td className="py-2 px-2 text-right font-mono">
                            <div className="font-black text-slate-900">${p.price}</div>
                            {p.originalPrice > p.price && (
                              <div className="text-[10px] text-slate-400 line-through">${p.originalPrice}</div>
                            )}
                          </td>
                          <td className="py-2 px-2.5 text-center font-mono">
                            <div className="inline-flex items-center gap-1">
                              <button
                                onClick={() => handleToggleStock(p.id, p.stock - 5)}
                                className="w-5 h-5 bg-slate-100 hover:bg-slate-200 rounded text-slate-600 font-bold flex items-center justify-center cursor-pointer"
                                title="減少庫存 5 份"
                              >
                                -
                              </button>
                              <span className={`font-black px-1.5 text-xs min-w-[32px] text-center ${
                                p.stock < 20 ? 'text-rose-600 bg-rose-50 rounded' : 'text-slate-800'
                              }`}>
                                {p.stock}
                              </span>
                              <button
                                onClick={() => handleToggleStock(p.id, p.stock + 5)}
                                className="w-5 h-5 bg-slate-100 hover:bg-slate-200 rounded text-slate-600 font-bold flex items-center justify-center cursor-pointer"
                                title="增加庫存 5 份"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="py-2 px-2.5 font-mono text-[10px] text-emerald-800 font-bold">
                            <div>{p.traceCode}</div>
                            <div className="text-[9px] text-slate-400">採收：{p.harvestDate}</div>
                          </td>
                          <td className="py-2 px-2.5 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => {
                                  setEditingProduct(p);
                                  setIsProductModalOpen(true);
                                }}
                                className="p-1 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 rounded transition-colors cursor-pointer"
                                title="編輯農產品"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p.id, p.name)}
                                className="p-1 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 rounded transition-colors cursor-pointer"
                                title="下架刪除"
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
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODULE 3: 商城會員管理 (Shop Member Management) */}
        {/* ========================================================= */}
        {activeTab === 'members' && (
          <div className="space-y-3">
            {/* Metric Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                <div className="text-slate-500 text-[10px] font-semibold">商城總註冊會員</div>
                <div className="text-lg font-mono font-black text-slate-900 mt-0.5">{membersList.length} 人</div>
                <div className="text-[10px] text-emerald-700">實名產銷支持者</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                <div className="text-slate-500 text-[10px] font-semibold">契作尊榮VIP / 金卡優選</div>
                <div className="text-lg font-mono font-black text-amber-600 mt-0.5">
                  {membersList.filter(m => m.tier === 'vip_farm' || m.tier === 'gold').length} 人
                </div>
                <div className="text-[10px] text-amber-700">享有專屬契作配銷</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                <div className="text-slate-500 text-[10px] font-semibold">累計已發行綠色點數</div>
                <div className="text-lg font-mono font-black text-emerald-950 mt-0.5">
                  {membersList.reduce((acc, m) => acc + m.points, 0).toLocaleString()} pt
                </div>
                <div className="text-[10px] text-slate-400">1點折抵1元台幣</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                <div className="text-slate-500 text-[10px] font-semibold">會員累計消費總額</div>
                <div className="text-lg font-mono font-black text-slate-900 mt-0.5">
                  NT$ {membersList.reduce((acc, m) => acc + m.totalSpent, 0).toLocaleString()}
                </div>
                <div className="text-[10px] text-emerald-700">高黏著度回購</div>
              </div>
            </div>

            {/* Member Panel */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-3 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-slate-200">
                <div>
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-emerald-700" />
                    <span>商城會員管理</span>
                  </h3>
                  <p className="text-[10px] text-slate-500">管理會員分級、綠色點數發放、偏好標籤與實名配送地址</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingMember(null);
                      setIsMemberModalOpen(true);
                    }}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>新增商城會員</span>
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="搜尋會員卡號、姓名、手機或電子信箱..."
                    value={memberSearch}
                    onChange={e => setMemberSearch(e.target.value)}
                    className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-emerald-600"
                  />
                </div>

                <select
                  value={memberTierFilter}
                  onChange={e => setMemberTierFilter(e.target.value)}
                  className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md font-semibold"
                >
                  <option value="all">所有會員等級</option>
                  <option value="general">一般會員 (98折)</option>
                  <option value="silver">銀卡會員 (95折)</option>
                  <option value="gold">金卡優選 (9折)</option>
                  <option value="vip_farm">契作尊榮VIP (85折/免運)</option>
                </select>
              </div>

              {/* Members Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-[11px]">
                    <tr>
                      <th className="py-2 px-2.5">會員編號 / 姓名</th>
                      <th className="py-2 px-2.5">聯絡電話 / Email</th>
                      <th className="py-2 px-2 text-center">會員等級</th>
                      <th className="py-2 px-2 text-right">綠色點數</th>
                      <th className="py-2 px-2.5 text-right">累積消費 / 訂單數</th>
                      <th className="py-2 px-2.5">標籤與特徵</th>
                      <th className="py-2 px-2 text-center">狀態</th>
                      <th className="py-2 px-2.5 text-center">管理操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredMembers.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-slate-400 text-xs">
                          查無符合條件之會員資料
                        </td>
                      </tr>
                    ) : (
                      filteredMembers.map(m => (
                        <tr key={m.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-2 px-2.5">
                            <div className="font-bold text-slate-900">{m.name}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{m.memberNo}</div>
                          </td>
                          <td className="py-2 px-2.5">
                            <div className="font-mono text-slate-800">{m.phone}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{m.email || '—'}</div>
                          </td>
                          <td className="py-2 px-2 text-center">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              m.tier === 'vip_farm' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                              m.tier === 'gold' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                              m.tier === 'silver' ? 'bg-slate-100 text-slate-700 border border-slate-300' :
                              'bg-slate-50 text-slate-600'
                            }`}>
                              {m.tier === 'vip_farm' ? '👑 契作VIP' :
                               m.tier === 'gold' ? '★ 金卡優選' :
                               m.tier === 'silver' ? '銀卡會員' : '一般會員'}
                            </span>
                          </td>
                          <td className="py-2 px-2 text-right font-mono font-bold text-emerald-800">
                            {m.points} pt
                          </td>
                          <td className="py-2 px-2.5 text-right font-mono">
                            <div className="font-bold text-slate-900">${m.totalSpent.toLocaleString()}</div>
                            <div className="text-[10px] text-slate-400">{m.orderCount} 筆訂單</div>
                          </td>
                          <td className="py-2 px-2.5">
                            <div className="flex flex-wrap gap-1">
                              {m.tags.map((t, idx) => (
                                <span key={idx} className="bg-slate-100 text-slate-600 text-[10px] px-1.5 py-0.2 rounded font-medium">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="py-2 px-2 text-center">
                            <button
                              onClick={() => handleToggleMemberStatus(m.id)}
                              className={`px-1.5 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                                m.status === 'active' ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' :
                                m.status === 'pending' ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' :
                                'bg-rose-100 text-rose-800 hover:bg-rose-200'
                              }`}
                              title="點擊切換狀態"
                            >
                              {m.status === 'active' ? '正常' : m.status === 'pending' ? '審核中' : '停權'}
                            </button>
                          </td>
                          <td className="py-2 px-2.5 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => {
                                  setEditingMember(m);
                                  setIsMemberModalOpen(true);
                                }}
                                className="p-1 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 rounded transition-colors cursor-pointer"
                                title="編輯會員"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteMember(m.id, m.name)}
                                className="p-1 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 rounded transition-colors cursor-pointer"
                                title="刪除會員"
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
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODULE 4: 供貨採購與財務結算 (Supply Procurement & Financial Settlement) */}
        {/* ========================================================================= */}
        {activeTab === 'procurement_finance' && (
          <div className="space-y-3">
            {/* Subtab Toggle Buttons */}
            <div className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setFinanceSubTab('procurement')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    financeSubTab === 'procurement'
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Package className="w-3.5 h-3.5" />
                  <span>小農供貨與採購進貨管理</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full font-mono bg-slate-700 text-white">
                    {procurementsList.length}
                  </span>
                </button>

                <button
                  onClick={() => setFinanceSubTab('settlement')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    financeSubTab === 'settlement'
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Receipt className="w-3.5 h-3.5" />
                  <span>小農契作財務結算與撥款管理</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full font-mono bg-slate-700 text-white">
                    {settlementsList.length}
                  </span>
                </button>
              </div>

              <div>
                {financeSubTab === 'procurement' ? (
                  <button
                    onClick={() => {
                      setEditingProcurement(null);
                      setIsProcurementModalOpen(true);
                    }}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>新增採購進貨單</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditingSettlement(null);
                      setIsSettlementModalOpen(true);
                    }}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>新增財務結算單</span>
                  </button>
                )}
              </div>
            </div>

            {/* Subtab 1: Procurement Table */}
            {financeSubTab === 'procurement' && (
              <div className="space-y-3">
                {/* Metric banner */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                    <div className="text-slate-500 text-[10px] font-semibold">本期採購進貨總額</div>
                    <div className="text-lg font-mono font-black text-slate-900 mt-0.5">
                      NT$ {totalProcurementCost.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-emerald-700">保證收購契作機制</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                    <div className="text-slate-500 text-[10px] font-semibold">總收購鮮果蔬菜量</div>
                    <div className="text-lg font-mono font-black text-slate-900 mt-0.5">
                      {procurementsList.reduce((acc, p) => acc + p.quantityKg, 0).toLocaleString()} kg
                    </div>
                    <div className="text-[10px] text-slate-400">產地冷鏈直收</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                    <div className="text-slate-500 text-[10px] font-semibold">農藥快篩檢驗合格率</div>
                    <div className="text-lg font-mono font-black text-emerald-950 mt-0.5">100%</div>
                    <div className="text-[10px] text-emerald-700">411項質譜快檢未檢出</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                    <div className="text-slate-500 text-[10px] font-semibold">低溫驗收入庫中批次</div>
                    <div className="text-lg font-mono font-black text-teal-600 mt-0.5">
                      {procurementsList.filter(p => p.status === 'received').length} 批
                    </div>
                    <div className="text-[10px] text-teal-700">已入西螺/高雄冷鏈倉</div>
                  </div>
                </div>

                {/* Table container */}
                <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-3 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="搜尋進貨單號、小農姓名、農場產區、作物名稱或批號..."
                        value={procurementSearch}
                        onChange={e => setProcurementSearch(e.target.value)}
                        className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-emerald-600"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-[11px]">
                        <tr>
                          <th className="py-2 px-2.5">採購進貨單號 / 日期</th>
                          <th className="py-2 px-2.5">供貨小農 / 農場</th>
                          <th className="py-2 px-2.5">作物名稱 / 履歷批號</th>
                          <th className="py-2 px-2 text-right">進貨量 (kg)</th>
                          <th className="py-2 px-2 text-right">收購單價</th>
                          <th className="py-2 px-2.5 text-right">採購總額 (NT$)</th>
                          <th className="py-2 px-2 text-center">農藥檢驗</th>
                          <th className="py-2 px-2 text-center">入庫狀態</th>
                          <th className="py-2 px-2.5 text-center">管理操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredProcurements.length === 0 ? (
                          <tr>
                            <td colSpan={9} className="py-8 text-center text-slate-400 text-xs">
                              查無符合條件之採購進貨紀錄
                            </td>
                          </tr>
                        ) : (
                          filteredProcurements.map(p => (
                            <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                              <td className="py-2 px-2.5">
                                <div className="font-mono font-bold text-slate-900">{p.procurementNo}</div>
                                <div className="text-[10px] text-slate-400 font-mono">{p.purchaseDate}</div>
                              </td>
                              <td className="py-2 px-2.5">
                                <div className="font-bold text-slate-800">{p.farmerName}</div>
                                <div className="text-[10px] text-slate-500">{p.farmName}</div>
                              </td>
                              <td className="py-2 px-2.5">
                                <div className="font-semibold text-slate-900">{p.cropName}</div>
                                <div className="text-[10px] text-emerald-800 font-mono">{p.batchCode}</div>
                              </td>
                              <td className="py-2 px-2 text-right font-mono font-bold text-slate-800">
                                {p.quantityKg.toLocaleString()} kg
                              </td>
                              <td className="py-2 px-2 text-right font-mono text-slate-600">
                                ${p.unitPrice}/kg
                              </td>
                              <td className="py-2 px-2.5 text-right font-mono font-black text-emerald-950">
                                ${p.totalCost.toLocaleString()}
                              </td>
                              <td className="py-2 px-2 text-center">
                                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                  p.inspectionStatus === 'passed' ? 'bg-emerald-100 text-emerald-800' :
                                  p.inspectionStatus === 'inspecting' ? 'bg-amber-100 text-amber-800' :
                                  'bg-rose-100 text-rose-800'
                                }`}>
                                  {p.inspectionStatus === 'passed' ? '合格' : p.inspectionStatus === 'inspecting' ? '抽檢中' : '退貨'}
                                </span>
                              </td>
                              <td className="py-2 px-2 text-center">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  p.status === 'received' ? 'bg-teal-100 text-teal-800' :
                                  p.status === 'in_transit' ? 'bg-blue-100 text-blue-800' :
                                  'bg-slate-100 text-slate-700'
                                }`}>
                                  {p.status === 'received' ? '已入庫' : p.status === 'in_transit' ? '運送中' : '排程中'}
                                </span>
                              </td>
                              <td className="py-2 px-2.5 text-center">
                                <div className="flex items-center justify-center gap-1">
                                  <button
                                    onClick={() => {
                                      setEditingProcurement(p);
                                      setIsProcurementModalOpen(true);
                                    }}
                                    className="p-1 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 rounded transition-colors cursor-pointer"
                                    title="編輯進貨單"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteProcurement(p.id, p.procurementNo)}
                                    className="p-1 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 rounded transition-colors cursor-pointer"
                                    title="刪除進貨單"
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
                </div>
              </div>
            )}

            {/* Subtab 2: Settlement Table */}
            {financeSubTab === 'settlement' && (
              <div className="space-y-3">
                {/* Metric banner */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                    <div className="text-slate-500 text-[10px] font-semibold">應結算採購款原額</div>
                    <div className="text-lg font-mono font-black text-slate-900 mt-0.5">
                      NT$ {settlementsList.reduce((acc, s) => acc + s.grossAmount, 0).toLocaleString()}
                    </div>
                    <div className="text-[10px] text-slate-400">依契作約定價格</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                    <div className="text-slate-500 text-[10px] font-semibold">農業部履歷冷鏈補貼總額</div>
                    <div className="text-lg font-mono font-black text-emerald-950 mt-0.5">
                      +NT$ {settlementsList.reduce((acc, s) => acc + s.subsidyMoa, 0).toLocaleString()}
                    </div>
                    <div className="text-[10px] text-emerald-700">專案政策補助加項</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                    <div className="text-slate-500 text-[10px] font-semibold">實付撥款淨額 (Net Payout)</div>
                    <div className="text-lg font-mono font-black text-emerald-950 mt-0.5">
                      NT$ {settlementsList.reduce((acc, s) => acc + s.netPayout, 0).toLocaleString()}
                    </div>
                    <div className="text-[10px] text-emerald-700">已扣除5%冷鏈物流服務費</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                    <div className="text-slate-500 text-[10px] font-semibold">撥款完成率</div>
                    <div className="text-lg font-mono font-black text-slate-900 mt-0.5">
                      {Math.round((settlementsList.filter(s => s.status === 'settled').length / (settlementsList.length || 1)) * 100)}%
                    </div>
                    <div className="text-[10px] text-slate-400">全數電匯入農會帳戶</div>
                  </div>
                </div>

                {/* Table container */}
                <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-3 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="搜尋結算單號、小農姓名、農場或結算期別..."
                        value={settlementSearch}
                        onChange={e => setSettlementSearch(e.target.value)}
                        className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-emerald-600"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-[11px]">
                        <tr>
                          <th className="py-2 px-2.5">結算單號 / 期別</th>
                          <th className="py-2 px-2.5">受款小農 / 農會匯款帳號</th>
                          <th className="py-2 px-2 text-right">應付原款 (+)</th>
                          <th className="py-2 px-2 text-right">冷鏈服務費 (-)</th>
                          <th className="py-2 px-2 text-right">農業部補貼 (+)</th>
                          <th className="py-2 px-2.5 text-right">實付撥款淨額 (NT$)</th>
                          <th className="py-2 px-2 text-center">撥款進度</th>
                          <th className="py-2 px-2.5">銀行電匯序號</th>
                          <th className="py-2 px-2.5 text-center">管理操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredSettlements.length === 0 ? (
                          <tr>
                            <td colSpan={9} className="py-8 text-center text-slate-400 text-xs">
                              查無符合條件之財務結算單
                            </td>
                          </tr>
                        ) : (
                          filteredSettlements.map(s => (
                            <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                              <td className="py-2 px-2.5">
                                <div className="font-mono font-bold text-slate-900">{s.settlementNo}</div>
                                <div className="text-[10px] text-slate-500">{s.period}</div>
                              </td>
                              <td className="py-2 px-2.5">
                                <div className="font-bold text-slate-800">{s.farmerName} ({s.farmName})</div>
                                <div className="text-[10px] text-slate-400 font-mono truncate max-w-[160px]">{s.bankAccount}</div>
                              </td>
                              <td className="py-2 px-2 text-right font-mono font-semibold text-slate-800">
                                ${s.grossAmount.toLocaleString()}
                              </td>
                              <td className="py-2 px-2 text-right font-mono text-rose-600">
                                -${s.platformFee.toLocaleString()}
                              </td>
                              <td className="py-2 px-2 text-right font-mono text-emerald-800">
                                +${s.subsidyMoa.toLocaleString()}
                              </td>
                              <td className="py-2 px-2.5 text-right font-mono font-black text-emerald-950 text-xs sm:text-sm">
                                ${s.netPayout.toLocaleString()}
                              </td>
                              <td className="py-2 px-2 text-center">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  s.status === 'settled' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                                  s.status === 'processing' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                                  'bg-amber-100 text-amber-800 border border-amber-200'
                                }`}>
                                  {s.status === 'settled' ? '已撥款入帳' : s.status === 'processing' ? '審核撥款中' : '待對帳'}
                                </span>
                              </td>
                              <td className="py-2 px-2.5 font-mono text-[10px] text-slate-600">
                                {s.paymentReference || (
                                  <span className="text-slate-400 italic">待電匯產生</span>
                                )}
                              </td>
                              <td className="py-2 px-2.5 text-center">
                                <div className="flex items-center justify-center gap-1">
                                  {s.status !== 'settled' && (
                                    <button
                                      onClick={() => handleQuickSettlePayout(s.id)}
                                      className="p-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded transition-colors cursor-pointer"
                                      title="一鍵審核並標記已撥款"
                                    >
                                      <Check className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                  <button
                                    onClick={() => {
                                      setEditingSettlement(s);
                                      setIsSettlementModalOpen(true);
                                    }}
                                    className="p-1 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 rounded transition-colors cursor-pointer"
                                    title="編輯結算單"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteSettlement(s.id, s.settlementNo)}
                                    className="p-1 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 rounded transition-colors cursor-pointer"
                                    title="刪除結算單"
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
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* MODULE 5: 營運總覽儀表板 (Overview Dashboard) */}
        {/* ========================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>本月商城營收</span>
                  <span className="bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded text-[10px]">+14.5%</span>
                </div>
                <div className="text-lg sm:text-xl font-black text-slate-900 font-mono mt-0.5">
                  NT$ {totalRevenue.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">累積訂單共 {ordersList.length} 筆</div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>農業部行情連線</span>
                  <span className="bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded text-[10px]">即時連線中</span>
                </div>
                <div className="text-lg sm:text-xl font-black text-emerald-950 font-mono mt-0.5">
                  24.2 <span className="text-[10px] font-normal text-slate-500">高麗菜均價/kg</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">每 30 分鐘自動校時同步</div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>契作小農產銷班</span>
                  <span className="bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded text-[10px]">全數通過履歷</span>
                </div>
                <div className="text-lg sm:text-xl font-black text-slate-900 font-mono mt-0.5">
                  {MOCK_FARMERS.length} <span className="text-[10px] font-normal text-slate-500">戶主要合作</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">涵蓋西螺、枋山、麻豆、七股產區</div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>註冊商城會員</span>
                  <span className="bg-teal-100 text-teal-800 font-bold px-1.5 py-0.2 rounded text-[10px]">正常運作中</span>
                </div>
                <div className="text-lg sm:text-xl font-black text-slate-900 font-mono mt-0.5">
                  {membersList.length} <span className="text-[10px] font-normal text-slate-500">位會員</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">總點數 {membersList.reduce((acc, m) => acc + m.points, 0)} pt</div>
              </div>
            </div>

            {/* Quick module entry cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                    <ShoppingBag className="w-4 h-4 text-emerald-700" />
                    <span>最新待出貨訂單快捷處理</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-emerald-800 hover:underline font-bold cursor-pointer"
                  >
                    進入訂單管理 →
                  </button>
                </div>
                <div className="divide-y divide-slate-100">
                  {ordersList.slice(0, 3).map(ord => (
                    <div key={ord.id} className="py-2 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-slate-800">{ord.customerName} ({ord.orderNo})</div>
                        <div className="text-[10px] text-slate-400">
                          {ord.items.map(i => `${i.productName} × ${i.quantity}`).join(', ')}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-bold text-emerald-950">${ord.totalAmount}</div>
                        <span className="text-[9px] bg-amber-50 text-amber-800 font-bold px-1.5 py-0.2 rounded border border-amber-200">
                          {ord.shippingStatus === 'preparing' ? '低溫備貨' : '冷鏈中'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                    <Receipt className="w-4 h-4 text-emerald-700" />
                    <span>小農契作結算與補貼概況</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('procurement_finance')}
                    className="text-xs text-emerald-800 hover:underline font-bold cursor-pointer"
                  >
                    進入財務結算 →
                  </button>
                </div>
                <div className="divide-y divide-slate-100">
                  {settlementsList.map(s => (
                    <div key={s.id} className="py-2 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-slate-800">{s.farmerName} ({s.farmName})</div>
                        <div className="text-[10px] text-slate-400">{s.period}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-bold text-emerald-950">實撥 ${s.netPayout.toLocaleString()}</div>
                        <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                          s.status === 'settled' ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'
                        }`}>
                          {s.status === 'settled' ? '已撥款' : '審核中'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODULE 6: 農業部行情同步中樞 (Market Sync) */}
        {/* ========================================================= */}
        {activeTab === 'market_sync' && (
          <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-3 sm:p-3.5 space-y-3">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
              <div>
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm">農業部開放資料 API 自動同步中樞</h3>
                <p className="text-[10px] text-slate-500">資料來源：中華民國農業部開放資料平台 (https://data.moa.gov.tw)</p>
              </div>
              <button
                onClick={handleSyncMoa}
                disabled={isSyncing}
                className="px-3 py-1.5 bg-emerald-600 text-white rounded-md text-xs font-bold hover:bg-emerald-500 flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>執行排程抓取</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-md border border-slate-200 space-y-0.5">
                <div className="text-slate-400 text-[10px]">上次同步時間</div>
                <div className="text-xs sm:text-sm font-bold font-mono text-slate-900">2026-08-23 07:30:12</div>
                <div className="text-emerald-700 text-[10px]">更新 128 項作物批發均價</div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-md border border-slate-200 space-y-0.5">
                <div className="text-slate-400 text-[10px]">排程 Crontab 設定</div>
                <div className="text-xs sm:text-sm font-bold font-mono text-slate-900">30 7,14 * * *</div>
                <div className="text-slate-500 text-[10px]">每日 07:30 與 14:00 自動執行</div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-md border border-slate-200 space-y-0.5">
                <div className="text-slate-400 text-[10px]">連線通訊協定</div>
                <div className="text-xs sm:text-sm font-bold font-mono text-slate-900">HTTPS REST / JSON</div>
                <div className="text-emerald-700 text-[10px]">SSL 憑證校驗合格</div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODULE 7: 小農審核與履歷管理 (Farmers Management) */}
        {/* ========================================================= */}
        {activeTab === 'farmers' && (
          <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-3 sm:p-3.5 space-y-2.5">
            <h3 className="font-bold text-slate-900 text-xs sm:text-sm">小農入駐審核與產銷履歷驗證</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {MOCK_FARMERS.map(f => (
                <div key={f.id} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2.5">
                  <img src={f.avatar} alt={f.name} className="w-9 h-9 rounded-md object-cover" />
                  <div className="flex-1 text-xs space-y-0.5">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{f.name} ({f.farmName})</h4>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.2 rounded border border-emerald-200">審核通過</span>
                    </div>
                    <div className="text-slate-500 text-[10px]">{f.location} ｜ 電話: {f.contactPhone}</div>
                    <div className="font-mono text-emerald-800 text-[10px] font-semibold">履歷字號: {f.traceabilityId}</div>
                    <div className="text-[10px] text-slate-500 pt-0.5">
                      主要作物：{f.plantedCrops.join('、')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODULE 8: 最新消息發布管理 (News CMS) */}
        {/* ========================================================= */}
        {activeTab === 'news_mgmt' && (
          <NewsAdmin
            newsList={newsList}
            onSaveNews={handleSaveNews}
            onDeleteNews={handleDeleteNews}
            onTogglePinned={handleToggleNewsPinned}
            showToast={showToast}
          />
        )}

        {/* ========================================================= */}
        {/* MODULE 9: 專欄報導管理 (Articles CMS) */}
        {/* ========================================================= */}
        {activeTab === 'articles_mgmt' && (
          <ArticlesAdmin
            articlesList={articlesList}
            onSaveArticle={handleSaveArticle}
            onDeleteArticle={handleDeleteArticle}
            showToast={showToast}
            onNavigate={onNavigate}
          />
        )}

        {/* ========================================================= */}
        {/* MODULE 10: 品牌故事與理念維護 (Brand Story CMS) */}
        {/* ========================================================= */}
        {activeTab === 'brand_mgmt' && (
          <BrandStoryAdmin
            brandStory={brandStoryData}
            onSaveBrandStory={handleSaveBrandStory}
            showToast={showToast}
          />
        )}

        {/* ========================================================= */}
        {/* MODULE 11: 聯絡諮詢與客服工單 (Inquiries & FAQ Management) */}
        {/* ========================================================= */}
        {activeTab === 'inquiries_mgmt' && (
          <InquiriesAdmin
            inquiriesList={inquiriesList}
            faqsList={faqsList}
            onSaveInquiry={handleSaveInquiry}
            onDeleteInquiry={handleDeleteInquiry}
            onSaveFaq={handleSaveFaq}
            onDeleteFaq={handleDeleteFaq}
            showToast={showToast}
          />
        )}

        {/* ========================================================= */}
        {/* MODULE 12: 合作社場名錄維護 (Cooperatives Management) */}
        {/* ========================================================= */}
        {activeTab === 'cooperatives_mgmt' && (
          <CooperativesAdmin
            cooperativesList={cooperativesList}
            onSaveCooperative={handleSaveCooperative}
            onDeleteCooperative={handleDeleteCooperative}
          />
        )}

        {/* ========================================================= */}
        {/* MODULE 13: 產銷班轉型輔導申請審查 (Cooperative Applications) */}
        {/* ========================================================= */}
        {activeTab === 'coop_apps_mgmt' && (
          <CoopApplicationsAdmin
            applicationsList={coopAppsList}
            onUpdateStatus={handleUpdateCoopAppStatus}
            onDeleteApplication={handleDeleteCoopApp}
          />
        )}

        {/* ========================================================= */}
        {/* MODULE 14: TAP 產銷溯源與農檢報告管理 (Traceability Admin) */}
        {/* ========================================================= */}
        {activeTab === 'trace_mgmt' && (
          <TraceabilityAdmin
            traceRecordsMap={traceRecordsMap}
            onSaveRecord={handleSaveTraceRecord}
            onDeleteRecord={handleDeleteTraceRecord}
          />
        )}

        {/* ========================================================= */}
        {/* MODULE 15: 小農契作與果樹認養管理 (Contracts Admin) */}
        {/* ========================================================= */}
        {activeTab === 'contracts_mgmt' && (
          <ContractsAdmin
            contractsList={contractsList}
            onSaveContract={handleSaveContractProject}
            onDeleteContract={handleDeleteContractProject}
          />
        )}

        {/* ========================================================= */}
        {/* MODULE 16: 農業部補助與冷鏈政策管理 (Subsidies Admin) */}
        {/* ========================================================= */}
        {activeTab === 'subsidies_mgmt' && (
          <SubsidiesAdmin
            subsidiesList={subsidiesList}
            onSaveSubsidy={handleSaveSubsidy}
            onDeleteSubsidy={handleDeleteSubsidy}
          />
        )}

        {/* ========================================================= */}
        {/* MODULE 17: 農民學院專業培訓課程管理 (Academy Admin) */}
        {/* ========================================================= */}
        {activeTab === 'academy_mgmt' && (
          <AcademyAdmin
            academyCoursesList={academyList}
            onSaveCourse={handleSaveCourse}
            onDeleteCourse={handleDeleteCourse}
          />
        )}

      </main>

      {/* ========================================================= */}
      {/* ALL MODAL DIALOGS */}
      {/* ========================================================= */}
      {isProductModalOpen && (
        <ProductModal
          isOpen={isProductModalOpen}
          onClose={() => {
            setIsProductModalOpen(false);
            setEditingProduct(null);
          }}
          onSave={handleSaveProduct}
          initialProduct={editingProduct}
        />
      )}

      {isOrderModalOpen && (
        <OrderModal
          isOpen={isOrderModalOpen}
          onClose={() => {
            setIsOrderModalOpen(false);
            setEditingOrder(null);
          }}
          onSave={handleSaveOrder}
          initialOrder={editingOrder}
          availableProducts={productsList}
        />
      )}

      {isMemberModalOpen && (
        <MemberModal
          isOpen={isMemberModalOpen}
          onClose={() => {
            setIsMemberModalOpen(false);
            setEditingMember(null);
          }}
          onSave={handleSaveMember}
          initialMember={editingMember}
        />
      )}

      {isProcurementModalOpen && (
        <ProcurementModal
          isOpen={isProcurementModalOpen}
          onClose={() => {
            setIsProcurementModalOpen(false);
            setEditingProcurement(null);
          }}
          onSave={handleSaveProcurement}
          initialRecord={editingProcurement}
        />
      )}

      {isSettlementModalOpen && (
        <SettlementModal
          isOpen={isSettlementModalOpen}
          onClose={() => {
            setIsSettlementModalOpen(false);
            setEditingSettlement(null);
          }}
          onSave={handleSaveSettlement}
          initialSettlement={editingSettlement}
        />
      )}

    </div>
  );
};
