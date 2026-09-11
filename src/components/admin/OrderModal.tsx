import React, { useState } from 'react';
import { X, Check, AlertCircle, Plus, Trash2, Truck, Sparkles } from 'lucide-react';
import { Order, Product, ProductTempZone } from '../../types';
import { MOCK_PRODUCTS } from '../../data/mockData';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (order: Order) => void;
  initialOrder?: Order | null;
  availableProducts?: Product[];
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialOrder,
  availableProducts = MOCK_PRODUCTS
}) => {
  const isEditing = Boolean(initialOrder);

  const [formData, setFormData] = useState<Partial<Order>>(() => {
    if (initialOrder) {
      return { ...initialOrder };
    }
    const defaultProduct = availableProducts[0] || MOCK_PRODUCTS[0];
    return {
      orderNo: `HNA-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: `${new Date().toISOString().slice(0, 10)} ${new Date().toTimeString().slice(0, 5)}`,
      customerName: '',
      phone: '',
      email: '',
      address: '',
      items: [
        {
          productId: defaultProduct.id,
          productName: defaultProduct.name,
          price: defaultProduct.price,
          quantity: 1,
          tempZone: defaultProduct.tempZone
        }
      ],
      shippingFee: 0,
      totalAmount: defaultProduct.price,
      paymentMethod: 'credit_card',
      paymentStatus: 'paid',
      shippingStatus: 'preparing',
      trackingNumber: `TC-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      carrier: '黑貓宅急便 (低溫冷藏)',
      notes: ''
    };
  });

  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const calculateTotal = (items: typeof formData.items, fee: number) => {
    const itemsTotal = (items || []).reduce((acc, item) => acc + (item.price * item.quantity), 0);
    return itemsTotal + (Number(fee) || 0);
  };

  const handleAddItem = () => {
    const firstProd = availableProducts[0] || MOCK_PRODUCTS[0];
    const newItems = [
      ...(formData.items || []),
      {
        productId: firstProd.id,
        productName: firstProd.name,
        price: firstProd.price,
        quantity: 1,
        tempZone: firstProd.tempZone
      }
    ];
    setFormData(prev => ({
      ...prev,
      items: newItems,
      totalAmount: calculateTotal(newItems, prev.shippingFee || 0)
    }));
  };

  const handleRemoveItem = (index: number) => {
    if ((formData.items || []).length <= 1) {
      setErrorMsg('訂單必須包含至少一項商品品項');
      return;
    }
    const newItems = (formData.items || []).filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      items: newItems,
      totalAmount: calculateTotal(newItems, prev.shippingFee || 0)
    }));
  };

  const handleItemProductChange = (index: number, productId: string) => {
    const prod = availableProducts.find(p => p.id === productId);
    if (!prod) return;

    const newItems = (formData.items || []).map((item, i) => {
      if (i === index) {
        return {
          ...item,
          productId: prod.id,
          productName: prod.name,
          price: prod.price,
          tempZone: prod.tempZone
        };
      }
      return item;
    });

    setFormData(prev => ({
      ...prev,
      items: newItems,
      totalAmount: calculateTotal(newItems, prev.shippingFee || 0)
    }));
  };

  const handleItemQuantityChange = (index: number, qty: number) => {
    const safeQty = Math.max(1, qty);
    const newItems = (formData.items || []).map((item, i) => {
      if (i === index) {
        return { ...item, quantity: safeQty };
      }
      return item;
    });

    setFormData(prev => ({
      ...prev,
      items: newItems,
      totalAmount: calculateTotal(newItems, prev.shippingFee || 0)
    }));
  };

  const handleShippingFeeChange = (fee: number) => {
    const safeFee = Math.max(0, fee);
    setFormData(prev => ({
      ...prev,
      shippingFee: safeFee,
      totalAmount: calculateTotal(prev.items, safeFee)
    }));
  };

  const generateTrackingNumber = () => {
    const randomNo = `TC-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    setFormData(prev => ({ ...prev, trackingNumber: randomNo }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName?.trim()) {
      setErrorMsg('請填寫收件人姓名');
      return;
    }
    if (!formData.phone?.trim()) {
      setErrorMsg('請填寫聯絡電話');
      return;
    }
    if (!formData.address?.trim()) {
      setErrorMsg('請填寫完整配送地址');
      return;
    }
    if (!formData.items || formData.items.length === 0) {
      setErrorMsg('請至少加入一項商品');
      return;
    }

    const finalOrder: Order = {
      id: initialOrder?.id || `ord_${Date.now()}`,
      orderNo: formData.orderNo || `HNA-${Date.now()}`,
      createdAt: formData.createdAt || new Date().toISOString(),
      customerName: formData.customerName || '',
      phone: formData.phone || '',
      email: formData.email || '',
      address: formData.address || '',
      items: formData.items || [],
      shippingFee: Number(formData.shippingFee) || 0,
      totalAmount: Number(formData.totalAmount) || 0,
      paymentMethod: (formData.paymentMethod as any) || 'credit_card',
      paymentStatus: (formData.paymentStatus as any) || 'paid',
      shippingStatus: (formData.shippingStatus as any) || 'preparing',
      trackingNumber: formData.trackingNumber || '',
      carrier: formData.carrier || '黑貓宅急便 (低溫冷藏)',
      notes: formData.notes || ''
    };

    onSave(finalOrder);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <h3 className="font-bold text-sm sm:text-base">
              {isEditing ? `編輯訂單與冷鏈出貨：${initialOrder?.orderNo}` : '後台新增商城訂單'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Top Order Meta */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                訂單流水編號
              </label>
              <input
                type="text"
                value={formData.orderNo || ''}
                onChange={e => setFormData(prev => ({ ...prev, orderNo: e.target.value }))}
                className="w-full text-xs font-mono font-bold px-2.5 py-1.5 bg-white border border-slate-200 rounded-md text-slate-800"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                訂單成立時間
              </label>
              <input
                type="text"
                value={formData.createdAt || ''}
                onChange={e => setFormData(prev => ({ ...prev, createdAt: e.target.value }))}
                className="w-full text-xs font-mono px-2.5 py-1.5 bg-white border border-slate-200 rounded-md text-slate-700"
              />
            </div>
          </div>

          {/* Customer Info */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-800">收件顧客資料</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                  收件人姓名 <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.customerName || ''}
                  onChange={e => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                  placeholder="例：王怡婷"
                  className="w-full text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-emerald-600"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                  聯絡手機 <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone || ''}
                  onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="0912-345-678"
                  className="w-full text-xs font-mono px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-emerald-600"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                  電子信箱 (選填)
                </label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="user@example.com"
                  className="w-full text-xs font-mono px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                完整配送地址 (含樓層/備註) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.address || ''}
                onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
                placeholder="例：台北市大安區信義路四段100號6樓"
                className="w-full text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-emerald-600"
                required
              />
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-800">購買生鮮農產項目</h4>
              <button
                type="button"
                onClick={handleAddItem}
                className="px-2 py-1 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>新增品項</span>
              </button>
            </div>

            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {(formData.items || []).map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                  <div className="flex-1">
                    <select
                      value={item.productId}
                      onChange={e => handleItemProductChange(idx, e.target.value)}
                      className="w-full text-xs px-2 py-1 bg-white border border-slate-200 rounded font-medium"
                    >
                      {availableProducts.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.name} (NT${p.price} / {p.tempZone === 'chilled' ? '冷藏' : p.tempZone === 'frozen' ? '冷凍' : '常溫'})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-20">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={e => handleItemQuantityChange(idx, Number(e.target.value))}
                      className="w-full text-xs font-mono font-bold px-2 py-1 bg-white border border-slate-200 rounded text-center"
                    />
                  </div>
                  <div className="w-24 text-right font-mono font-bold text-emerald-900">
                    ${item.price * item.quantity}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(idx)}
                    className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                    title="移除品項"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Logistics & Shipping Setting */}
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2.5">
            <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-emerald-700" />
              <span>冷鏈物流與配送狀態設定</span>
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                  指定配合物流商
                </label>
                <select
                  value={formData.carrier || '黑貓宅急便 (低溫冷藏)'}
                  onChange={e => setFormData(prev => ({ ...prev, carrier: e.target.value }))}
                  className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-md"
                >
                  <option value="黑貓宅急便 (低溫冷藏)">黑貓宅急便 (低溫冷藏)</option>
                  <option value="黑貓宅急便 (急凍冷凍)">黑貓宅急便 (急凍冷凍)</option>
                  <option value="新竹物流 (冷鏈專車)">新竹物流 (冷鏈專車)</option>
                  <option value="台灣宅配通 (低溫快遞)">台灣宅配通 (低溫快遞)</option>
                  <option value="產地冷藏專車直達">產地冷藏專車直達</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-0.5 flex items-center justify-between">
                  <span>物流托運單號</span>
                  <button
                    type="button"
                    onClick={generateTrackingNumber}
                    className="text-[10px] text-emerald-700 font-bold hover:underline cursor-pointer"
                  >
                    自動產生單號
                  </button>
                </label>
                <input
                  type="text"
                  value={formData.trackingNumber || ''}
                  onChange={e => setFormData(prev => ({ ...prev, trackingNumber: e.target.value }))}
                  placeholder="例：TC-2026-88019"
                  className="w-full text-xs font-mono px-2.5 py-1.5 bg-white border border-slate-200 rounded-md text-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                  出貨與配送進度
                </label>
                <select
                  value={formData.shippingStatus || 'preparing'}
                  onChange={e => setFormData(prev => ({ ...prev, shippingStatus: e.target.value as any }))}
                  className="w-full text-xs font-semibold px-2.5 py-1.5 bg-white border border-slate-200 rounded-md"
                >
                  <option value="preparing">低溫備貨中 (集貨包裝)</option>
                  <option value="shipped">已出貨 (冷鏈運送中)</option>
                  <option value="delivered">已送達 (買家已簽收)</option>
                  <option value="cancelled">已取消 (退單處理)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                  付款狀態
                </label>
                <select
                  value={formData.paymentStatus || 'paid'}
                  onChange={e => setFormData(prev => ({ ...prev, paymentStatus: e.target.value as any }))}
                  className="w-full text-xs font-semibold px-2.5 py-1.5 bg-white border border-slate-200 rounded-md"
                >
                  <option value="paid">已完成付款 (Paid)</option>
                  <option value="pending">待付款核銷 (Pending)</option>
                  <option value="failed">付款失敗 (Failed)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Financial summary & Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                備註與配送需求
              </label>
              <textarea
                rows={2}
                value={formData.notes || ''}
                onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="例：大樓管理室代收、請電聯..."
                className="w-full text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md focus:bg-white"
              />
            </div>

            <div className="p-3 bg-slate-900 text-white rounded-lg flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>運費 (低溫冷鏈免運門檻 $1500)：</span>
                <div className="flex items-center gap-1">
                  <span>NT$</span>
                  <input
                    type="number"
                    min="0"
                    value={formData.shippingFee !== undefined ? formData.shippingFee : 0}
                    onChange={e => handleShippingFeeChange(Number(e.target.value))}
                    className="w-16 text-right text-xs font-mono font-bold px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-white"
                  />
                </div>
              </div>
              <div className="flex items-baseline justify-between pt-2 border-t border-slate-800">
                <span className="text-xs font-bold text-slate-300">應付訂單總金額：</span>
                <span className="text-lg font-black font-mono text-emerald-400">
                  NT$ {formData.totalAmount || 0}
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
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
              <span>{isEditing ? '儲存訂單變更' : '確定建立訂單'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
