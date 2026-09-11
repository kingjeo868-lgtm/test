import React, { useState } from 'react';
import { ViewMode, Product, CartItem, ContractProject } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FrontHome } from './components/FrontHome';
import { ShopCatalog } from './components/ShopCatalog';
import { MarketPrices } from './components/MarketPrices';
import { ProductionStats } from './components/ProductionStats';
import { TraceabilityLookup } from './components/TraceabilityLookup';
import { ContractFarming } from './components/ContractFarming';
import { AdminDashboard } from './components/AdminDashboard';
import { CodePackager } from './components/CodePackager';
import { SystemDemoHub } from './components/SystemDemoHub';
import { BrandStory } from './components/BrandStory';
import { LatestNews } from './components/LatestNews';
import { ArticlesReport } from './components/ArticlesReport';
import { ArticleMcpHub } from './components/ArticleMcpHub';
import { ContactUs } from './components/ContactUs';
import { FarmerCooperativesHub } from './components/FarmerCooperativesHub';
import { CartDrawer } from './components/CartDrawer';
import { CheckCircle2, Sparkles, X } from 'lucide-react';
import { MOCK_PRODUCTS } from './data/mockData';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: MOCK_PRODUCTS[0], quantity: 2 },
    { product: MOCK_PRODUCTS[1], quantity: 1 }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`已將「${product.name}」(${quantity}件) 加入採購車`);
  };

  const handleUpdateQuantity = (productId: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
    showToast('已從採購車移除商品');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOrderSuccess = (orderNo: string) => {
    showToast(`🎉 訂單已成功建立！訂單編號: ${orderNo}，我們將盡速安排產地低溫直送。`);
  };

  const handleJoinContract = (project: ContractProject) => {
    showToast(`已為您登記參與「${project.title}」，正為您導向產地履歷確認！`);
    setCurrentView('trace');
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-slate-50">
      
      {/* Universal Navigation Header */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 max-w-md bg-slate-900/95 backdrop-blur-md text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700/80 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="leading-snug">{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <FrontHome
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectProduct={(p) => setSelectedProductModal(p)}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentView === 'brand_story' && (
          <BrandStory
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'news' && (
          <LatestNews
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'shop' && (
          <ShopCatalog
            onSelectProduct={(p) => setSelectedProductModal(p)}
            onAddToCart={handleAddToCart}
            selectedProductModal={selectedProductModal}
            onCloseProductModal={() => setSelectedProductModal(null)}
            onJoinContract={handleJoinContract}
            initialTab="products"
          />
        )}

        {currentView === 'contract' && (
          <FarmerCooperativesHub
            initialTab="contract"
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateContract={() => {
              setCurrentView('contract');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateShop={() => {
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'market' && (
          <MarketPrices />
        )}

        {currentView === 'stats' && (
          <ProductionStats />
        )}

        {currentView === 'trace' && (
          <FarmerCooperativesHub
            initialTab="trace"
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateContract={() => {
              setCurrentView('contract');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateShop={() => {
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'articles' && (
          <ArticlesReport
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'article_mcp' && (
          <ArticleMcpHub
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'farmer_hub' && (
          <FarmerCooperativesHub
            initialTab="directory"
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateContract={() => {
              setCurrentView('contract');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateShop={() => {
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'contact' && (
          <ContactUs
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'admin' && (
          <AdminDashboard
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'demo_hub' && (
          <SystemDemoHub 
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}

        {currentView === 'code_package' && (
          <SystemDemoHub 
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}
      </main>

      {/* Floating Demo Hub Quick Launcher */}
      {currentView !== 'demo_hub' && (
        <div className="fixed bottom-5 left-5 z-40">
          <button
            onClick={() => {
              setCurrentView('demo_hub');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group px-3.5 py-2.5 bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-950 text-white rounded-full shadow-2xl border border-emerald-500/40 hover:border-emerald-400 hover:scale-105 transition-all flex items-center gap-2 text-xs font-bold cursor-pointer"
            title="開啟全站系統功能演示、情境引導與單一檔案離線包下載"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-emerald-200 group-hover:text-white transition-colors">
              全站演示中樞・離線包下載
            </span>
          </button>
        </div>
      )}

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Universal Footer */}
      <Footer
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

    </div>
  );
}
