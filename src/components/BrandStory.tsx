import React from 'react';
import { 
  Sprout, 
  ShieldCheck, 
  Truck, 
  BarChart2, 
  HeartHandshake, 
  Award, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Leaf, 
  Sun, 
  Droplets,
  Calendar,
  Users,
  Compass
} from 'lucide-react';
import { ViewMode } from '../types';
import { MOCK_FARMERS } from '../data/mockData';

interface BrandStoryProps {
  onNavigate: (view: ViewMode) => void;
}

export const BrandStory: React.FC<BrandStoryProps> = ({ onNavigate }) => {
  const milestones = [
    {
      year: '2020',
      title: '好農方舟誕生於濁水溪畔',
      desc: '創辦團隊深入雲林西螺與屏東產地，攜手第一批12位堅持友善耕作與產銷履歷的小農，建立最初的產地直接配送服務。'
    },
    {
      year: '2022',
      title: '建構雙溫層智慧冷鏈分裝中心',
      desc: '於雲林西螺與高雄設立現代化低溫集貨倉，全面落實田間採收急速預冷與4°C/-18°C雙溫層精準溫控，大幅降低生鮮損耗率。'
    },
    {
      year: '2024',
      title: '首創全透明雙向結算與契作認養',
      desc: '推行「產地果樹與蔬菜箱年度契作」，並落實財務結算透明化，讓農民跳過層層盤商剝削，享有最穩定實質收益。'
    },
    {
      year: '2026',
      title: '全面對接農業部大數據行情與產銷預警',
      desc: '深度整合全台17處果菜批發市場即時行情與全台作物種植面積大數據，打造生產者與消費者雙贏的智慧產銷生態圈。'
    }
  ];

  const pillars = [
    {
      icon: ShieldCheck,
      title: '100% 產銷履歷與有機驗證',
      desc: '每一項生鮮蔬果皆通過第三方 TAP 產銷履歷驗證或有機認證，並完成 381 項農藥殘留檢驗未檢出 (ND)，地號透明公開。'
    },
    {
      icon: Truck,
      title: '雙溫層全程冷鏈不斷鏈',
      desc: '從產地採收預冷、恆溫包裝到冷藏/冷凍溫控配送，配備 IoT 即時溫濕度追蹤，維持宛如清晨現採的極致鮮脆。'
    },
    {
      icon: BarChart2,
      title: '農業部大數據行情中樞',
      desc: '即時連線農業部開放資料，產地價格公開透明。透過產銷大數據預警模型，提早調節供需，平抑菜金菜土波動。'
    },
    {
      icon: HeartHandshake,
      title: '公平契作與農友永續共好',
      desc: '保證責任收購與果樹認養計畫，跳過多層盤商剝削，小農專注土地耕耘，消費者享受安心無毒，實踐食農正義。'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/60 pb-16">
      
      {/* 1. Hero Header Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white py-12 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-emerald-900">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        <div className="max-w-5xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-400/30 shadow-2xs">
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span>好農方舟・品牌核心使命</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight leading-tight">
            立足台灣沃土，<br className="sm:hidden" />
            <span className="text-emerald-400">搭起土地與餐桌</span> 的永續方舟。
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto font-light leading-relaxed">
            我們相信，每一位在烈日下揮灑汗水的小農，都值得合理的尊嚴回報；每一戶圍繞在餐桌旁的家庭，都值得享用最純淨、安心且甘甜的土地產物。
          </p>
        </div>
      </section>

      {/* 2. Brand Origin & Philosophy */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-md p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 space-y-4">
            <div className="text-emerald-700 font-bold text-xs tracking-wider uppercase flex items-center gap-1">
              <Sprout className="w-4 h-4" /> OUR ORIGIN
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-serif leading-snug">
              從濁水溪畔的一籃蔬菜，<br />
              到全台智慧農業產銷生態圈
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              台灣擁有得天獨厚的風土氣候與極致精湛的農業技術，但長期以來，傳統產銷體系中「菜金菜土」的價格劇烈波動、層層盤商的利潤壓縮，讓無數認真耕作的農友面臨豐產不豐收的無奈。
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              「好農方舟」應運而生——我們不是單純的中介電商，而是一艘結合<strong>「TAP 產銷履歷驗證」</strong>、<strong>「現代化雙溫層冷鏈」</strong>與<strong>「農業部大數據行情與產銷預警」</strong>的數位方舟。我們將生產端的努力透明化，讓消費者的每一次購買，都成為對台灣永續農業最實質的投票。
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-800">
              <div className="flex items-center gap-1.5 text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% 合法農地登記產銷班</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>381項農藥殘留檢驗未檢出</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-xl overflow-hidden shadow-lg border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=900&auto=format&fit=crop&q=80"
                alt="西螺綠金有機農場"
                className="w-full h-72 sm:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-xs font-bold text-emerald-300">雲林西螺濁水溪畔 ｜ 綠金有機產銷班</div>
                <div className="text-sm font-semibold mt-0.5 font-serif">堅持友善耕作三十載，每一寸土地都有生命</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Four Core Pillars */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="text-xs font-bold text-emerald-800 tracking-wider uppercase mb-1">
            CORE FOUNDATION
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-serif">
            好農方舟的四大安心承諾
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            以數據為舵、以冷鏈為翼、以品質為根，打造值得全家人託付的生鮮產銷體系。
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:shadow-sm hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">{p.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Development Timeline */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="text-xs font-bold text-emerald-800 tracking-wider uppercase mb-1">
            OUR JOURNEY
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-serif">
            耕耘歷程與里程碑
          </h2>
        </div>

        <div className="space-y-4">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:bg-slate-50 transition-colors"
            >
              <div className="w-16 h-16 rounded-xl bg-emerald-800 text-white flex flex-col items-center justify-center font-bold shrink-0 shadow-2xs">
                <span className="text-[10px] text-emerald-200">YEAR</span>
                <span className="text-base sm:text-lg font-mono leading-none">{m.year}</span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm sm:text-base font-bold text-slate-900">{m.title}</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Farmer Voices */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-2xl p-6 sm:p-10 shadow-xl border border-slate-800">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-900/60 px-3 py-1 rounded-full border border-emerald-700">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>產地直送與契作認養</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold font-serif">
                與好農方舟一同支持台灣土地，品嚐最真摯的純淨滋味
              </h3>
              <p className="text-xs text-emerald-100/80 max-w-xl">
                立即逛逛嚴選產銷商城，或加入小農契作認養專案，親身體驗產地直通餐桌的感動。
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => onNavigate('shop')}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>選購當季鮮採</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg text-xs sm:text-sm border border-white/20 transition-all cursor-pointer"
              >
                <span>小農加盟諮詢</span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
