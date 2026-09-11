import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Truck, 
  CreditCard, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  Receipt
} from 'lucide-react';
import { CartItem, ProductTempZone } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, qty: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onOrderSuccess: (orderNo: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderSuccess
}) => {
  const [isCheckoutStep, setIsCheckoutStep] = useState(false);
  const [customerName, setCustomerName] = useState('王小明');
  const [customerPhone, setCustomerPhone] = useState('0912-345-678');
  const [customerAddress, setCustomerAddress] = useState('台北市信義區忠孝東路五段68號');
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'line_pay' | 'atm'>('line_pay');
  const [invoiceType, setInvoiceType] = useState('mobile_carrier');
  const [carrierCode, setCarrierCode] = useState('/ABC.123');

  if (!isOpen) return null;

  // Calculate totals by temperature zone
  const chilledAndFrozenItems = cartItems.filter(i => i.product.tempZone !== 'normal');
  const normalItems = cartItems.filter(i => i.product.tempZone === 'normal');

  const coldSubtotal = chilledAndFrozenItems.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
  const normalSubtotal = normalItems.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
  const rawSubtotal = coldSubtotal + normalSubtotal;

  const coldShipping = coldSubtotal > 0 && coldSubtotal < 1500 ? 160 : 0;
  const normalShipping = normalSubtotal > 0 && normalSubtotal < 999 ? 100 : 0;
  const totalShipping = coldShipping + normalShipping;
  const finalTotal = rawSubtotal + totalShipping;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderNo = `HNA-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.floor(1000 + Math.random() * 9000)}`;
    onClearCart();
    setIsCheckoutStep(false);
    onClose();
    onOrderSuccess(orderNo);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header - High Density */}
          <div className="p-3.5 sm:p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-4 h-4 text-emerald-700" />
              <h2 className="text-sm font-bold text-slate-900">
                {isCheckoutStep ? '結帳與配送資料' : `產地採購車 (${cartItems.length})`}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cartItems.length === 0 ? (
              <div className="text-center py-12 space-y-2.5">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-800">您的購物車是空的</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  快去逛逛當季鮮採的有機蔬菜與果園直發的時令鮮果吧！
                </p>
                <button
                  onClick={onClose}
                  className="mt-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  去選購好農生鮮
                </button>
              </div>
            ) : !isCheckoutStep ? (
              /* Cart Items List */
              <div className="space-y-3">
                {/* Cold Chain Notification */}
                <div className="bg-emerald-50/80 border border-emerald-200 rounded-lg p-2.5 text-xs text-emerald-900 flex items-start gap-2">
                  <Truck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">溫層冷鏈分流配送</span>
                    <p className="text-[11px] text-emerald-700 mt-0.5">
                      低溫商品滿 $1500 免運 (差 ${Math.max(0, 1500 - coldSubtotal)}) ｜ 常溫商品滿 $999 免運
                    </p>
                  </div>
                </div>

                <div className="divide-y divide-slate-100">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="py-2 flex gap-2">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-md object-cover border border-slate-200 shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900 line-clamp-1">
                              {item.product.name}
                            </span>
                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              className="text-slate-300 hover:text-rose-500 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {item.product.tempZone === 'chilled' ? '冷藏' : item.product.tempZone === 'frozen' ? '冷凍' : '常溫'} ｜ {item.product.origin}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-1">
                          <div className="text-xs font-black text-emerald-900 font-mono">
                            NT$ {item.product.price * item.quantity}
                          </div>

                          <div className="flex items-center border border-slate-200 rounded-md overflow-hidden text-xs">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                              className="px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 font-bold cursor-pointer"
                            >
                              -
                            </button>
                            <span className="px-2 py-0.5 font-mono font-medium text-[11px]">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 font-bold cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Checkout Form Step */
              <form onSubmit={handleCheckoutSubmit} id="checkout-form" className="space-y-2.5 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1 text-[11px]">收件人姓名</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1 text-[11px]">聯絡手機</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1 text-[11px]">宅配收件地址</label>
                  <input
                    type="text"
                    required
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1 text-[11px]">付款方式</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('line_pay')}
                      className={`p-1.5 rounded-md border text-center font-bold text-xs transition-all cursor-pointer ${
                        paymentMethod === 'line_pay'
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-800 shadow-2xs'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      LINE Pay
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('credit_card')}
                      className={`p-1.5 rounded-md border text-center font-bold text-xs transition-all cursor-pointer ${
                        paymentMethod === 'credit_card'
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-800 shadow-2xs'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      信用卡
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('atm')}
                      className={`p-1.5 rounded-md border text-center font-bold text-xs transition-all cursor-pointer ${
                        paymentMethod === 'atm'
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-800 shadow-2xs'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      ATM虛擬帳號
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1 text-[11px]">電子發票載具</label>
                  <input
                    type="text"
                    value={carrierCode}
                    onChange={(e) => setCarrierCode(e.target.value)}
                    placeholder="手機條碼載具 (例如: /ABC.123)"
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md font-mono text-xs"
                  />
                </div>
              </form>
            )}
          </div>

          {/* Footer Summary & Action */}
          {cartItems.length > 0 && (
            <div className="p-3 border-t border-slate-200 bg-slate-50 space-y-2">
              <div className="space-y-1 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>商品小計</span>
                  <span className="font-mono">NT$ {rawSubtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>冷鏈與常溫運費</span>
                  <span className="font-mono">
                    {totalShipping === 0 ? <strong className="text-emerald-700 font-bold">免運費</strong> : `NT$ ${totalShipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-xs font-bold text-slate-900 pt-1 border-t border-slate-200">
                  <span>應付總額</span>
                  <span className="text-emerald-900 font-mono text-sm font-black">NT$ {finalTotal}</span>
                </div>
              </div>

              {!isCheckoutStep ? (
                <button
                  onClick={() => setIsCheckoutStep(true)}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-md shadow-2xs transition-colors flex items-center justify-center gap-1.5 text-xs cursor-pointer"
                >
                  <span>前往填寫收件與結帳</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCheckoutStep(false)}
                    className="px-2.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-md text-xs transition-colors cursor-pointer"
                  >
                    返回修改
                  </button>
                  <button
                    type="submit"
                    form="checkout-form"
                    className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-md shadow-2xs transition-colors text-xs cursor-pointer"
                  >
                    確認付款 NT$ {finalTotal}
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
