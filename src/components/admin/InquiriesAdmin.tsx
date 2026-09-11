import React, { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Phone, 
  Mail, 
  HelpCircle, 
  Plus, 
  Edit3, 
  Trash2, 
  Download, 
  User, 
  Tag, 
  Check, 
  ChevronRight,
  Send
} from 'lucide-react';
import { ContactInquiry, FaqItem } from '../../types';
import { InquiryModal } from './InquiryModal';
import { FaqModal } from './FaqModal';

interface InquiriesAdminProps {
  inquiriesList: ContactInquiry[];
  faqsList: FaqItem[];
  onSaveInquiry: (inquiry: ContactInquiry) => void;
  onDeleteInquiry: (id: string, name: string) => void;
  onSaveFaq: (faq: FaqItem) => void;
  onDeleteFaq: (id: string, q: string) => void;
  showToast: (msg: string) => void;
}

export const InquiriesAdmin: React.FC<InquiriesAdminProps> = ({
  inquiriesList,
  faqsList,
  onSaveInquiry,
  onDeleteInquiry,
  onSaveFaq,
  onDeleteFaq,
  showToast
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'inquiries' | 'faqs'>('inquiries');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modals
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);

  // Inquiries filtering
  const filteredInquiries = inquiriesList.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.phone.includes(search) ||
      (item.email && item.email.toLowerCase().includes(search.toLowerCase())) ||
      (item.subject && item.subject.toLowerCase().includes(search.toLowerCase())) ||
      item.message.toLowerCase().includes(search.toLowerCase()) ||
      (item.inquiryNo && item.inquiryNo.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesCat = categoryFilter === 'all' || item.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCat;
  });

  // FAQs filtering
  const filteredFaqs = faqsList.filter(f => {
    return f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase()) ||
      (f.category && f.category.toLowerCase().includes(search.toLowerCase()));
  });

  const pendingCount = inquiriesList.filter(i => i.status === 'pending').length;
  const processingCount = inquiriesList.filter(i => i.status === 'processing').length;
  const resolvedCount = inquiriesList.filter(i => i.status === 'resolved').length;

  const handleExportCSV = () => {
    const headers = ['工單編號', '建立時間', '諮詢人', '電話', '電子郵件', '類別', '主旨', '留言內容', '處理狀態', '指派專員', '處理備註'];
    const rows = filteredInquiries.map(i => [
      i.inquiryNo || i.id,
      i.createdAt,
      i.name,
      i.phone,
      i.email || '',
      i.categoryLabel || i.category,
      `"${(i.subject || '').replace(/"/g, '""')}"`,
      `"${i.message.replace(/"/g, '""')}"`,
      i.status === 'resolved' ? '已結案' : i.status === 'processing' ? '處理中' : '待處理',
      i.assignedStaff || '',
      `"${(i.replyNote || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `好農方舟_客服諮詢工單匯出_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('客服諮詢工單已成功匯出為 CSV 報表！');
  };

  const handleQuickStatusChange = (inquiry: ContactInquiry, nextStatus: ContactInquiry['status']) => {
    const updated = { ...inquiry, status: nextStatus };
    onSaveInquiry(updated);
    showToast(`工單 ${inquiry.inquiryNo || inquiry.id} 狀態已更新為「${nextStatus === 'resolved' ? '已結案' : nextStatus === 'processing' ? '處理中' : '待處理'}」`);
  };

  return (
    <div className="space-y-4">
      
      {/* Top Header */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
              <MessageSquare className="w-4 h-4" />
            </span>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
              聯絡我們與客服工單管理 (Inquiries & FAQ Management)
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            處理前台客戶與小農諮詢表單、指派專員回覆紀錄、並維護前台常見問題 (FAQ) 資料庫
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeSubTab === 'inquiries' ? (
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>匯出工單 CSV</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setEditingFaq(null);
                setIsFaqModalOpen(true);
              }}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>新增常見問題 (FAQ)</span>
            </button>
          )}
        </div>
      </div>

      {/* Sub Tabs Selector */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveSubTab('inquiries')}
          className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'inquiries'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>諮詢工單即時處理 ({inquiriesList.length})</span>
          {pendingCount > 0 && (
            <span className="bg-rose-500 text-white text-[10px] px-1.5 py-0.2 rounded-full">
              {pendingCount} 待辦
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveSubTab('faqs')}
          className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'faqs'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>常見問答庫維護 ({faqsList.length})</span>
        </button>
      </div>

      {/* VIEW 1: INQUIRIES WORKFLOW */}
      {activeSubTab === 'inquiries' && (
        <div className="space-y-4">
          {/* KPI Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
              <div className="text-[11px] text-slate-500">工單總累計</div>
              <div className="text-lg sm:text-xl font-mono font-bold text-slate-900 mt-0.5">
                {inquiriesList.length} <span className="text-[10px] font-normal text-slate-400">筆</span>
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-rose-200 bg-rose-50/20 shadow-2xs">
              <div className="text-[11px] text-rose-600 font-bold">待處理 (Pending)</div>
              <div className="text-lg sm:text-xl font-mono font-bold text-rose-600 mt-0.5">
                {pendingCount} <span className="text-[10px] font-normal text-rose-400">筆急需聯繫</span>
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-amber-200 bg-amber-50/20 shadow-2xs">
              <div className="text-[11px] text-amber-700 font-bold">處理中 (Processing)</div>
              <div className="text-lg sm:text-xl font-mono font-bold text-amber-700 mt-0.5">
                {processingCount} <span className="text-[10px] font-normal text-amber-400">筆跟進中</span>
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-emerald-200 bg-emerald-50/20 shadow-2xs">
              <div className="text-[11px] text-emerald-700 font-bold">已結案 (Resolved)</div>
              <div className="text-lg sm:text-xl font-mono font-bold text-emerald-700 mt-0.5">
                {resolvedCount} <span className="text-[10px] font-normal text-emerald-400">筆完成</span>
              </div>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-3 flex flex-col sm:flex-row gap-2.5 items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="搜尋姓名、電話、主旨、工單號..."
                className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">所有處理狀態</option>
                <option value="pending">待處理 (Pending)</option>
                <option value="processing">處理中 (Processing)</option>
                <option value="resolved">已結案 (Resolved)</option>
              </select>

              <select
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                className="text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">所有諮詢類別</option>
                <option value="order">訂單物流問題</option>
                <option value="contract">小農契作認養</option>
                <option value="farmer_join">小農供貨加盟</option>
                <option value="b2b_wholesale">B2B 企業採購</option>
                <option value="press">媒體採訪合作</option>
                <option value="other">其他綜合諮詢</option>
              </select>
            </div>
          </div>

          {/* Inquiries Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                    <th className="py-3 px-3 w-28">工單編號</th>
                    <th className="py-3 px-3 w-36">諮詢人與電話</th>
                    <th className="py-3 px-3 w-28">分類</th>
                    <th className="py-3 px-4">主旨與提問內容</th>
                    <th className="py-3 px-3 w-28">建立時間</th>
                    <th className="py-3 px-3 w-28 text-center">狀態</th>
                    <th className="py-3 px-4 w-28 text-center">處理與操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredInquiries.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-10 text-slate-400">
                        查無符合條件的聯絡諮詢工單
                      </td>
                    </tr>
                  ) : (
                    filteredInquiries.map(inquiry => (
                      <tr key={inquiry.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-3 font-mono font-bold text-slate-800">
                          {inquiry.inquiryNo || inquiry.id}
                        </td>

                        <td className="py-3 px-3">
                          <div className="font-bold text-slate-900">{inquiry.name}</div>
                          <div className="text-[11px] font-mono text-slate-500">{inquiry.phone}</div>
                          {inquiry.email && (
                            <div className="text-[10px] text-slate-400 truncate max-w-[130px]">{inquiry.email}</div>
                          )}
                        </td>

                        <td className="py-3 px-3">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                            {inquiry.categoryLabel || inquiry.category}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900 line-clamp-1">
                            {inquiry.subject || '（無主旨）'}
                          </div>
                          <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                            {inquiry.message}
                          </div>
                          {inquiry.replyNote && (
                            <div className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded mt-1 inline-block border border-emerald-200">
                              備忘：{inquiry.replyNote}
                            </div>
                          )}
                        </td>

                        <td className="py-3 px-3 font-mono text-slate-500 text-[11px]">
                          {inquiry.createdAt}
                        </td>

                        <td className="py-3 px-3 text-center">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${
                            inquiry.status === 'resolved'
                              ? 'bg-emerald-100 text-emerald-800'
                              : inquiry.status === 'processing'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}>
                            {inquiry.status === 'resolved' ? (
                              <CheckCircle2 className="w-3 h-3" />
                            ) : inquiry.status === 'processing' ? (
                              <Clock className="w-3 h-3" />
                            ) : (
                              <AlertCircle className="w-3 h-3" />
                            )}
                            <span>
                              {inquiry.status === 'resolved' ? '已結案' : inquiry.status === 'processing' ? '處理中' : '待處理'}
                            </span>
                          </span>
                        </td>

                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => {
                                setSelectedInquiry(inquiry);
                                setIsInquiryModalOpen(true);
                              }}
                              className="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-md font-bold text-[11px] border border-emerald-200 cursor-pointer"
                            >
                              處理工單
                            </button>
                            <button
                              onClick={() => onDeleteInquiry(inquiry.id, inquiry.name)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                              title="刪除此工單"
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

      {/* VIEW 2: FAQS KNOWLEDGE BASE */}
      {activeSubTab === 'faqs' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-3 flex items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="搜尋問答題目、關鍵字、解答內容..."
                className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
            <div className="text-xs text-slate-500 font-mono">
              共 {faqsList.length} 題常見問題
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredFaqs.map(faq => (
              <div
                key={faq.id}
                className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2.5 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">
                      {faq.category || '常見問答'}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setEditingFaq(faq);
                          setIsFaqModalOpen(true);
                        }}
                        className="p-1.5 text-slate-400 hover:text-emerald-700 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                        title="編輯此問答"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteFaq(faq.id, faq.q)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                        title="刪除此問答"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                    Q: {faq.q}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    A: {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inquiries Processing Modal */}
      {isInquiryModalOpen && selectedInquiry && (
        <InquiryModal
          isOpen={isInquiryModalOpen}
          onClose={() => {
            setIsInquiryModalOpen(false);
            setSelectedInquiry(null);
          }}
          onSave={onSaveInquiry}
          inquiry={selectedInquiry}
        />
      )}

      {/* FAQ Edit Modal */}
      {isFaqModalOpen && (
        <FaqModal
          isOpen={isFaqModalOpen}
          onClose={() => {
            setIsFaqModalOpen(false);
            setEditingFaq(null);
          }}
          onSave={onSaveFaq}
          initialFaq={editingFaq}
        />
      )}

    </div>
  );
};
