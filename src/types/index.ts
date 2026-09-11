export type ViewMode = 
  | 'home' 
  | 'brand_story'
  | 'news'
  | 'farmer_hub'
  | 'shop' 
  | 'market' 
  | 'stats' 
  | 'trace' 
  | 'contract' 
  | 'articles'
  | 'article_mcp'
  | 'contact'
  | 'admin' 
  | 'code_package'
  | 'demo_hub';

export * from './mcp';

export type ProductTempZone = 'normal' | 'chilled' | 'frozen';

export type CertificationType = '有機認證' | 'TAP產銷履歷' | '友善農法' | '吉園圃' | '產地地理標章';

export interface Product {
  id: string;
  name: string;
  category: 'vegetable' | 'fruit' | 'meat' | 'seafood' | 'processed' | 'gift';
  categoryName: string;
  price: number;
  originalPrice: number;
  unit: string;
  weight: string;
  tempZone: ProductTempZone;
  certifications: CertificationType[];
  origin: string; // e.g. 雲林西螺, 屏東枋山, 台南麻豆
  farmerId: string;
  farmerName: string;
  farmName: string;
  stock: number;
  soldCount: number;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  harvestDate: string;
  traceCode: string;
  isSeasonalSpecial?: boolean;
  featured?: boolean;
  season?: 'spring' | 'summer' | 'autumn' | 'winter' | 'all';
  harvestMonths?: number[]; // e.g. [6, 7, 8] for summer months 1-12
  solarTerm?: string;
  sweetnessBrix?: number;
  promoTag?: string;
  promoDiscountText?: string;
  rushStockLeft?: number;
}

export interface Farmer {
  id: string;
  name: string;
  farmName: string;
  location: string;
  avatar: string;
  coverImage: string;
  story: string;
  certifications: string[];
  plantedCrops: string[];
  establishedYear: number;
  traceabilityId: string;
  rating: number;
  contactPhone: string;
}

export interface MarketPriceRecord {
  id: string;
  cropCode: string;
  cropName: string;
  category: 'vegetable' | 'fruit' | 'flower' | 'fishery' | 'poultry';
  marketName: string; // e.g. 台北一, 台北二, 板橋, 台中, 高雄, 西螺
  marketCode: string;
  tradeDate: string; // YYYY-MM-DD
  highPrice: number; // 上價 NT$/kg
  midPrice: number;  // 中價 NT$/kg
  lowPrice: number;  // 下價 NT$/kg
  avgPrice: number;  // 平均價 NT$/kg
  volumeKg: number;  // 交易量 公斤
  priceChangePercent: number; // 與前日漲跌幅 %
  volumeChangePercent: number;
  originSupplyArea: string; // 主力產地
  statusWarning?: 'normal' | 'high_surge' | 'price_drop' | 'supply_shortage';
}

export interface ProductionStat {
  id: string;
  cropName: string;
  category: string;
  year: number;
  month?: number;
  quarter?: string;
  city: string; // 彰化縣, 雲林縣, 屏東縣, 嘉義縣, 台南市, etc.
  plantedAreaHectare: number; // 種植面積 (公頃)
  harvestAreaHectare: number; // 收穫面積 (公頃)
  estimatedYieldTons: number; // 預估產量 (公噸)
  actualYieldTons: number;    // 實際產量 (公噸)
  balanceStatus: 'surplus' | 'balanced' | 'shortage'; // 產銷失衡狀態
  surplusAlertLevel: 'green' | 'yellow' | 'red'; // 綠色正常, 黃色注意, 紅色超產警戒
  notes: string;
}

export interface TraceRecord {
  traceCode: string;
  cropName: string;
  farmerName: string;
  farmName: string;
  location: string;
  landNo: string;
  certificationOrg: string;
  certNo: string;
  certExpiry: string;
  plantingDate: string;
  harvestDate: string;
  packagingDate: string;
  inspectionResults: {
    item: string;
    standard: string;
    result: string;
    passed: boolean;
  }[];
  farmingLogs: {
    date: string;
    action: string;
    materialUsed: string;
    operator: string;
  }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  orderNo: string;
  createdAt: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    tempZone: ProductTempZone;
  }[];
  shippingFee: number;
  totalAmount: number;
  paymentMethod: 'credit_card' | 'atm' | 'line_pay' | 'cod';
  paymentStatus: 'paid' | 'pending' | 'failed';
  shippingStatus: 'preparing' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
  carrier?: string; // 黑貓宅急便冷鏈, 新竹物流, 台灣宅配通
  notes?: string;
}

export type MemberTier = 'general' | 'silver' | 'gold' | 'vip_farm';

export interface Member {
  id: string;
  memberNo: string;
  name: string;
  phone: string;
  email: string;
  tier: MemberTier; // general: 一般會員, silver: 銀卡會員, gold: 金卡優選, vip_farm: 契作尊榮VIP
  registeredDate: string;
  points: number; // 綠色回饋點數
  totalSpent: number;
  orderCount: number;
  status: 'active' | 'suspended' | 'pending';
  address: string;
  tags: string[]; // e.g. '有機熱愛者', '契作認養人', '大宗採購'
  notes?: string;
}

export interface ProcurementRecord {
  id: string;
  procurementNo: string;
  farmerId: string;
  farmerName: string;
  farmName: string;
  cropName: string;
  category: 'vegetable' | 'fruit' | 'seafood' | 'meat' | 'processed';
  batchCode: string; // 履歷批次號碼
  purchaseDate: string;
  quantityKg: number;
  unitPrice: number; // 採購單價 NT$/kg
  totalCost: number; // 採購總金額
  inspectionStatus: 'passed' | 'inspecting' | 'failed'; // 檢驗狀態
  status: 'received' | 'in_transit' | 'scheduled'; // 入庫狀態
  warehouse: string; // 西螺低溫物流分裝中心, 高雄冷鏈倉, etc.
  notes?: string;
}

export interface FinancialSettlement {
  id: string;
  settlementNo: string;
  farmerId: string;
  farmerName: string;
  farmName: string;
  bankAccount: string; // e.g. 土地銀行西螺分行 054-001-xxxxxx
  period: string; // e.g. 2026年8月上半期
  grossAmount: number; // 應付採購款
  platformFee: number; // 平台冷鏈物流服務費 (扣減)
  subsidyMoa: number; // 農業部產銷履歷包裝補貼 (加項)
  netPayout: number; // 實付結算款
  settlementDate: string;
  status: 'settled' | 'processing' | 'pending_audit'; // 已撥款 / 審核撥款中 / 待對帳
  paymentReference?: string; // 銀行轉帳序號
  notes?: string;
}

export interface ContractProject {
  id: string;
  title: string;
  cropName: string;
  farmerName: string;
  location: string;
  image: string;
  targetShares: number;
  currentShares: number;
  pricePerShare: number;
  expectedYieldPerShare: string;
  harvestSchedule: string;
  deliveryTimes: number;
  benefits: string[];
  daysLeft: number;
  description: string;
}

export interface NewsItem {
  id: string;
  title: string;
  category: 'production' | 'announcement' | 'market' | 'event' | 'subsidy';
  categoryLabel: string;
  publishDate: string;
  summary: string;
  content: string;
  author: string;
  isPinned?: boolean;
  image?: string;
  tags: string[];
  readTimeMin: number;
}

export interface ArticleItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'tech' | 'story' | 'market_analysis' | 'sustainability' | 'policy';
  categoryLabel: string;
  publishDate: string;
  authorName: string;
  authorTitle: string;
  authorAvatar: string;
  coverImage: string;
  readTimeMin: number;
  summary: string;
  sections: {
    heading: string;
    body: string;
    quote?: string;
    highlightBox?: string;
  }[];
  tags: string[];
}

export interface ContactInquiry {
  id: string;
  inquiryNo: string;
  name: string;
  phone: string;
  email: string;
  category: 'order' | 'contract' | 'farmer_join' | 'b2b_wholesale' | 'press' | 'other';
  categoryLabel?: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'pending' | 'processing' | 'resolved';
  replyNote?: string;
  assignedStaff?: string;
}

export interface FaqItem {
  id: string;
  q: string;
  a: string;
  category?: string;
}

export interface BrandMilestone {
  id: string;
  year: string;
  title: string;
  desc: string;
}

export interface BrandPillar {
  id: string;
  title: string;
  desc: string;
  iconName: string;
}

export interface BrandStoryData {
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  originTitle: string;
  originQuote: string;
  originBody1: string;
  originBody2: string;
  milestones: BrandMilestone[];
  pillars: BrandPillar[];
}

export type CooperativeType = 
  | 'production'     // 農業生產合作社
  | 'marketing'      // 蔬果運銷合作社
  | 'class'          // 農業產銷班
  | 'tea'            // 茶葉運銷合作社
  | 'organic_flower' // 有機與花卉合作社
  | 'aquaculture'    // 水產水產養殖合作社
  | 'livestock';     // 優質畜牧產銷合作社

export type RegionZone = 'all' | 'north' | 'central' | 'south' | 'east' | 'islands';

export interface CooperativeItem {
  id: string;
  coopCode: string; // e.g. TFA-COOP-6301
  supplierCode: string; // 北農/批發市場供應人代號 e.g. 63-019
  name: string;
  shortName: string;
  type: CooperativeType;
  typeName: string;
  region: RegionZone;
  county: string; // e.g. 雲林縣西螺鎮, 彰化縣溪湖鎮, 屏東縣枋山鄉
  address: string;
  leaderTitle: string; // 理事主席 / 產銷班長 / 總幹事
  leaderName: string;
  contactPhone: string;
  contactEmail?: string;
  memberCount: number; // 社員數 / 班員數
  farmAreaHectare: number; // 產區總面積 (公頃)
  annualVolumeTons: number; // 年供貨量 (公噸)
  mainCrops: string[];
  certifications: string[];
  coldChainFacilities: string[]; // e.g. 800坪立體低溫預冷庫, 光波糖度分級機, -40°C 急速冷凍庫
  establishedYear: number;
  image: string;
  story: string;
  isExemplary?: boolean; // 全國績優產銷班/標竿示範合作社
  awardTitle?: string;
  contractProductsCount: number;
  coordinates?: { lat: number; lng: number };
}

export interface SubsidyItem {
  id: string;
  title: string;
  issuer: string; // e.g. 農業部農糧署, 農業部漁業署, 台灣農業合作社聯合社
  category: 'facility' | 'coldchain' | 'certification' | 'machinery' | 'disaster';
  categoryLabel: string;
  subsidyRate: string; // e.g. 最高補助 50%, 全額檢驗費補助
  maxAmount: string; // e.g. 最高 500 萬元 / 案
  applyDeadline: string;
  status: 'active' | 'upcoming' | 'closed';
  targetAudience: string[]; // e.g. 依法登記之農業合作社, 經核准設立之農業產銷班, 取得產銷履歷之青年農民
  keyRequirements: string[];
  docTemplates: { name: string; size: string }[];
  description: string;
}

export interface AcademyCourse {
  id: string;
  title: string;
  category: 'smart_agri' | 'coldchain_logistics' | 'ecommerce_brand' | 'sustainability_esg' | 'certification_law';
  categoryLabel: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  levelLabel: string;
  instructorName: string;
  instructorTitle: string;
  instructorAvatar: string;
  courseDate: string;
  courseTime: string;
  location: string; // e.g. 農業部大數據多功能講堂 / 線上同步視訊
  durationHours: number;
  spotsTotal: number;
  spotsEnrolled: number;
  syllabus: string[];
  isFreeGovFunded: boolean;
  image: string;
}

export interface CooperativeApplication {
  id: string;
  applyNo: string;
  applicantType: 'individual_farmer' | 'production_class' | 'cooperative' | 'agri_enterprise';
  applicantTypeName: string;
  contactName: string;
  contactTitle: string;
  idOrTaxId: string;
  phone: string;
  email: string;
  orgName: string;
  countyCity: string;
  landAddress: string;
  farmArea: string;
  mainCrops: string;
  certifications: string[];
  targetCollaboration: string[];
  coldChainNeeds: string;
  applyDate: string;
  status: 'submitted' | 'reviewing' | 'field_inspecting' | 'approved';
}



