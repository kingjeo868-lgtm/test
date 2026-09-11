import React from 'react';
import { 
  Sprout, 
  ShieldCheck, 
  PhoneCall, 
  Mail, 
  MapPin, 
  ExternalLink, 
  Heart,
  TrendingUp,
  BarChart3,
  BookOpen,
  Newspaper,
  Info
} from 'lucide-react';
import { ViewMode } from '../types';

interface FooterProps {
  onNavigate: (view: ViewMode) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-xs">
      {/* Upper Info Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-2.5">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-2xs">
                <Sprout className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-white tracking-tight">
                好農方舟 HaoNong Ark
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              立足台灣土地，匯聚在地金牌小農與友善耕作職人。全站生鮮農產 100% 通過產銷履歷檢驗與 381 項無農藥殘留檢驗，並首創整合農業部即時批發交易行情與產銷預警大數據。
            </p>
            <div className="text-[10px] text-slate-500 pt-0.5 font-mono">
              系統架構：PHP 8.1 / CodeIgniter 3 / MySQL 8.0 / 雙溫層 IoT 冷鏈
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-xs tracking-wider uppercase">
              平台導覽與專區
            </h4>
            <ul className="space-y-1.5 text-slate-400 text-[11px]">
              <li>
                <button onClick={() => onNavigate('brand_story')} className="hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer">
                  <Info className="w-3 h-3 text-emerald-400" />
                  <span>品牌故事與使命</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('news')} className="hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer">
                  <Newspaper className="w-3 h-3 text-emerald-400" />
                  <span>最新消息與產地特報</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  產地商城（嚴選生鮮）
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('farmer_hub')} className="hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer text-emerald-300 font-semibold">
                  <span>農友社場 (社場名錄・溯源・契作)</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('trace')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  TAP 產銷履歷溯源查詢
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contract')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  小農契作與果樹認養
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('articles')} className="hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer">
                  <BookOpen className="w-3 h-3 text-emerald-400" />
                  <span>專欄報導與食農專題</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('article_mcp')} className="hover:text-purple-300 text-purple-400 font-semibold transition-colors flex items-center gap-1 cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  <span>文章 MCP 智慧功能中樞 (AI Agent)</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  聯絡我們與客服諮詢
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Industry Analytics */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-xs tracking-wider uppercase">
              產業分析 (農業部)
            </h4>
            <ul className="space-y-1.5 text-slate-400 text-[11px]">
              <li>
                <button onClick={() => onNavigate('market')} className="hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer">
                  <TrendingUp className="w-3 h-3 text-amber-400" />
                  <span>即時交易行情大數據</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('stats')} className="hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer">
                  <BarChart3 className="w-3 h-3 text-teal-400" />
                  <span>生產統計與氣象預報</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  後台管理系統（左側欄）
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('demo_hub')} className="hover:text-emerald-400 transition-colors cursor-pointer text-amber-300 font-bold flex items-center gap-1">
                  <span>⚡ 全站演示與離線包下載</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Hubs */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-xs tracking-wider uppercase">
              服務諮詢與冷鏈中心
            </h4>
            <div className="space-y-1 text-slate-400 text-[11px]">
              <div className="flex items-center space-x-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>免付費專線: 0800-088-299</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>service@haonong-ark.tw</span>
              </div>
              <div className="flex items-start space-x-1.5 pt-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-tight">西螺冷鏈中心：雲林縣西螺鎮福興路88號</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-slate-950 py-3 border-t border-slate-800/80 text-[11px] text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            © 2026 好農方舟 (HaoNong Ark). 保留所有權利 ｜ 農業部輔導智慧產銷數位平台
          </div>
          <div className="flex items-center space-x-4">
            <span className="hover:text-slate-400 transition-colors cursor-pointer" onClick={() => onNavigate('contact')}>
              服務條款與隱私權
            </span>
            <span>•</span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer" onClick={() => onNavigate('contact')}>
              小農加盟政策
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
