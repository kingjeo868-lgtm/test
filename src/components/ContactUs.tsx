import React, { useState } from 'react';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  MessageSquare, 
  Building2, 
  Truck, 
  Sprout,
  ChevronDown,
  ChevronUp,
  AlertCircle
} from 'lucide-react';
import { MOCK_FAQS } from '../data/mockData';
import { ViewMode } from '../types';

interface ContactUsProps {
  onNavigate?: (view: ViewMode) => void;
}

export const ContactUs: React.FC<ContactUsProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: 'order',
    subject: '',
    message: ''
  });
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const ticketNo = `TKT-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedTicket(ticketNo);
      setIsSubmitting(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        category: 'order',
        subject: '',
        message: ''
      });
    }, 800);
  };

  const branches = [
    {
      name: '雲林西螺產地低溫集貨中心',
      role: '葉菜預冷・產銷履歷檢驗・農民交貨',
      address: '雲林縣西螺鎮福興路 88 號 (鄰近西螺果菜市場)',
      phone: '(05) 586-2299',
      hours: '週一至週六 06:00 - 18:00'
    },
    {
      name: '高雄冷鏈物流旗艦倉',
      role: '南區生鮮水產・節令水果包裝・雙溫層物流',
      address: '高雄市燕巢區高鐵路二段 320 號',
      phone: '(07) 616-8833',
      hours: '週一至週日 24 小時恆溫運作'
    },
    {
      name: '台北營運總部與顧客服務中心',
      role: '大數據產銷分析・電商營運・企業大宗採購',
      address: '台北市中正區重慶南路二段 51 號 8 樓',
      phone: '0800-088-299 / (02) 2388-9900',
      hours: '週一至週五 08:30 - 17:30'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/60 pb-16">
      
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-emerald-900 shadow-xs">
        <div className="max-w-6xl mx-auto text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-2.5 py-0.5 rounded border border-emerald-400/30">
            <MessageSquare className="w-3.5 h-3.5" /> 顧客服務與產銷合作諮詢
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-serif">
            聯絡好農方舟團隊
          </h1>
          <p className="text-emerald-200 text-xs sm:text-sm font-light max-w-xl mx-auto leading-relaxed">
            無論是生鮮訂單諮詢、農民產銷班加盟、企業節慶大宗送禮，或是契作認養合作，我們隨時傾聽您的需求。
          </p>
        </div>
      </div>

      {/* 2. Contact Cards Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col justify-between space-y-2">
            <div className="space-y-1.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200">
                <PhoneCall className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 text-xs">免付費客服專線</h4>
              <p className="text-[11px] text-slate-500">週一至週五 08:30 - 17:30</p>
            </div>
            <div className="text-base font-black text-emerald-900 font-mono pt-1 border-t border-slate-100">
              0800-088-299
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col justify-between space-y-2">
            <div className="space-y-1.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200">
                <Mail className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 text-xs">客服與商務信箱</h4>
              <p className="text-[11px] text-slate-500">24小時內專人回覆確認</p>
            </div>
            <div className="text-xs font-bold text-emerald-900 font-mono pt-1 border-t border-slate-100 truncate">
              service@haonong-ark.tw
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col justify-between space-y-2">
            <div className="space-y-1.5">
              <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center border border-amber-200">
                <Sprout className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 text-xs">小農產銷輔導專線</h4>
              <p className="text-[11px] text-slate-500">西螺產地中心輔導組</p>
            </div>
            <div className="text-sm font-bold text-slate-900 font-mono pt-1 border-t border-slate-100">
              (05) 586-2299
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col justify-between space-y-2">
            <div className="space-y-1.5">
              <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center border border-teal-200">
                <Building2 className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 text-xs">企業大宗團購禮盒</h4>
              <p className="text-[11px] text-slate-500">專屬業務經理客製規劃</p>
            </div>
            <div className="text-sm font-bold text-slate-900 font-mono pt-1 border-t border-slate-100">
              (02) 2388-9900
            </div>
          </div>

        </div>
      </div>

      {/* 3. Main Form & Hubs Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 sm:p-7 shadow-xs space-y-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-serif">
              線上諮詢與合作留言
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              填寫以下表單，我們的專員將在 1 個工作天內主動與您聯繫。
            </p>
          </div>

          {submittedTicket ? (
            <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-5 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-emerald-950">
                  諮詢表單已成功送出！
                </h3>
                <p className="text-xs text-emerald-800 mt-1">
                  您的案件追蹤編號為：<strong className="font-mono text-emerald-950 text-sm">{submittedTicket}</strong>
                </p>
                <p className="text-[11px] text-slate-600 mt-2">
                  客服人員已收到您的留言，將儘速於上班時間內電話或 Email 回覆您。
                </p>
              </div>
              <button
                onClick={() => setSubmittedTicket(null)}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                填寫另一筆諮詢
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    聯絡人姓名 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="請輸入您的姓名"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    聯絡電話 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="例: 0912-345-678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    電子郵件 Email
                  </label>
                  <input
                    type="email"
                    placeholder="example@mail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    諮詢類別
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="order">商城訂單與冷鏈配送進度</option>
                    <option value="farmer_join">小農／產銷班加盟與供貨合作</option>
                    <option value="b2b_wholesale">企業節慶送禮／大宗團購</option>
                    <option value="contract">小農契作與果樹認養諮詢</option>
                    <option value="press">媒體採訪／學術研究交流</option>
                    <option value="other">其他問題與建言</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  諮詢主旨
                </label>
                <input
                  type="text"
                  placeholder="請簡述您的諮詢事項"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  詳細留言內容 <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="請在此詳細描述您的問題或合作構想..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-500 resize-y"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? '正在送出中...' : '送出線上諮詢'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Operational Hubs (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="font-bold text-slate-900 text-sm font-serif flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-emerald-600" />
              全台集貨冷鏈與營運據點
            </h3>

            <div className="space-y-3">
              {branches.map((b, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs space-y-1">
                  <div className="font-bold text-slate-900 flex items-center justify-between">
                    <span>{b.name}</span>
                  </div>
                  <div className="text-[11px] text-emerald-800 font-medium">{b.role}</div>
                  <div className="text-[11px] text-slate-500 flex items-start gap-1 pt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{b.address}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1">
                    <PhoneCall className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-mono">{b.phone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* 4. FAQs Accordion */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <div className="text-xs font-bold text-emerald-800 tracking-wider uppercase mb-1">
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-serif">
            常見問題解答 (FAQ)
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-2.5">
          {MOCK_FAQS.map((faq, idx) => {
            const isOpen = expandedFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => setExpandedFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
