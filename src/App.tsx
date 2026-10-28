import React, { useState, useEffect, lazy, Suspense } from 'react';
import { ConnectionStatus } from './components/ConnectionStatus';
import { AppProvider, useApp } from './context/AppContext';
import { TopHeader } from './components/TopHeader';
import { NavigationTabs } from './components/NavigationTabs';
import { DashboardOverview } from './components/DashboardOverview';
import { SupplierList } from './components/SupplierList';
import { StoreInspoList } from './components/StoreInspoList';
import { CategoryExplorerView } from './components/CategoryExplorerView';
const HandoffManagementView = lazy(() => import('./components/HandoffManagementView').then(m => ({ default: m.HandoffManagementView })));
const SettingsManagementView = lazy(() => import('./components/SettingsManagementView').then(m => ({ default: m.SettingsManagementView })));
const MembersManagementView = lazy(() => import('./components/MembersManagementView').then(m => ({ default: m.MembersManagementView })));
const ProductWorkspace = lazy(() => import('./components/ProductWorkspace').then(m => ({ default: m.ProductWorkspace })));
const NewSupplierModal = lazy(() => import('./components/NewSupplierModal').then(m => ({ default: m.NewSupplierModal })));
const NewStoreInspoModal = lazy(() => import('./components/NewStoreInspoModal').then(m => ({ default: m.NewStoreInspoModal })));
const DetailModal = lazy(() => import('./components/DetailModal').then(m => ({ default: m.DetailModal })));
import { UserProfileModal } from './components/UserProfileModal';
import { ShareLineModal } from './components/ShareLineModal';
import { PinLoginModal } from './components/PinLoginModal';
import { CurrencyCalculatorModal } from './components/CurrencyCalculatorModal';
import { InstallPromptModal } from './components/InstallPromptModal';
import { NotificationSheetModal } from './components/NotificationSheetModal';
import { NotificationToast } from './components/NotificationToast';
import { RegisterWithInviteModal } from './components/RegisterWithInviteModal';
import { SupplierRecord, StoreInspoRecord } from './types';

const ModalLoading = () => <div className="fixed inset-0 z-[110] grid place-items-center bg-slate-950/30 p-4 backdrop-blur-sm"><div role="status" className="rounded-2xl bg-white px-8 py-6 text-sm font-medium text-slate-600 shadow-xl">กำลังเปิดรายละเอียด…</div></div>;

const MainApp: React.FC = () => {
  const { activeTab, setActiveTab, suppliers, drinkStores, isAuthenticated, editingSupplier, editingStore } = useApp();

  const [isNewSupplierOpen, setIsNewSupplierOpen] = useState(false);
  const [isNewStoreInspoOpen, setIsNewStoreInspoOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isInstallOpen, setIsInstallOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [selectedDetailItem, setSelectedDetailItem] = useState<SupplierRecord | StoreInspoRecord | null>(null);
  const [shareLineItem, setShareLineItem] = useState<SupplierRecord | StoreInspoRecord | null>(null);
  const [isPinLoginOpen, setIsPinLoginOpen] = useState(false);

  // Parse invite param from URL immediately
  const [inviteCodeUrl, setInviteCodeUrl] = useState<string | null>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('invite');
  });
  const [authView, setAuthView] = useState<'login' | 'invite'>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('invite') ? 'invite' : 'login';
  });

  const dismissInvite = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('invite'); url.searchParams.delete('role');
    window.history.replaceState({}, '', url);
    setInviteCodeUrl(null); setAuthView('login');
  };

  // Check URL query parameters (e.g. ?invite=CODE or ?view=ITEM_ID)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const inviteParam = params.get('invite');
    const viewParam = params.get('view');
    const typeParam = params.get('type');

    if (inviteParam && !isAuthenticated) {
      setInviteCodeUrl(inviteParam);
      setAuthView('invite');
    }

    if (viewParam) {
      if (typeParam === 'supplier') {
        const found = suppliers.find((s) => s.id === viewParam);
        if (found) setSelectedDetailItem(found);
      } else if (typeParam === 'drink_store') {
        const found = drinkStores.find((d) => d.id === viewParam);
        if (found) setSelectedDetailItem(found);
      }
    }
  }, [suppliers, drinkStores, isAuthenticated]);

  const handleScrollToMap = () => {
    if (activeTab !== 'dashboard') {
      setActiveTab('dashboard');
    }
    setTimeout(() => {
      const mapEl = document.getElementById('map-section');
      if (mapEl) {
        mapEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  const handleSelectFromNotification = (targetId: string, _type: string) => {
    const foundSupplier = suppliers.find((s) => s.id === targetId);
    if (foundSupplier) {
      setSelectedDetailItem(foundSupplier);
      setTimeout(() => {
        const commentSection = document.getElementById('detail-comments-section');
        if (commentSection) {
          commentSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
      return;
    }

    const foundStore = drinkStores.find((d) => d.id === targetId);
    if (foundStore) {
      setSelectedDetailItem(foundStore);
      setTimeout(() => {
        const commentSection = document.getElementById('detail-comments-section');
        if (commentSection) {
          commentSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
    }
  };

  // Lockscreen Gate: ทุกคนต้องล็อกอินก่อนเข้าถึงหน้าหลักและข้อมูล
  // หากมีรหัสคำเชิญ (?invite=...) จะพาเข้าสู่หน้าสมัครสมาชิกทันที
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
        <ConnectionStatus />
        {authView === 'invite' && inviteCodeUrl ? (
          <RegisterWithInviteModal
            isOpen={true}
            inviteCode={inviteCodeUrl}
            onClose={dismissInvite}
            onSwitchToLogin={dismissInvite}
          />
        ) : (
          <PinLoginModal
            isOpen={true}
            isGate={true}
            onOpenInvite={(code) => {
              setAuthView('invite');
              setInviteCodeUrl(code);
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans pb-16 selection:bg-emerald-500 selection:text-white">
      <ConnectionStatus />
      {/* Real-time In-App Floating Toast Notification */}
      <NotificationToast onSelectItem={handleSelectFromNotification} />

      {/* 1. Header with "ฉันจะเป็นหัวแถว", Menu Drawer, Install App, and Notifications */}
      <TopHeader
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenNewSupplier={() => setIsNewSupplierOpen(true)}
        onOpenNewStoreInspo={() => setIsNewStoreInspoOpen(true)}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenInstall={() => setIsInstallOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenInvites={() => setActiveTab('members')}
        onScrollToMap={handleScrollToMap}
      />

      {/* 2. Top Standalone Navigation Bar (สลับหน้าใครหน้ามันได้ทันที) */}
      <NavigationTabs />

      {/* 3. Filterable & Independent View Pages */}
      <main className="flex-1 bg-slate-50/40">
        <Suspense fallback={<div role="status" className="p-8 text-center text-slate-500">กำลังเปิดหน้า…</div>}>
        {activeTab === 'dashboard' && (
          <DashboardOverview
            onSelectSupplier={(s) => setSelectedDetailItem(s)}
            onSelectStore={(st) => setSelectedDetailItem(st)}
            onOpenNewSupplier={() => setIsNewSupplierOpen(true)}
            onOpenNewStoreInspo={() => setIsNewStoreInspoOpen(true)}
            onShareToLine={(item) => setShareLineItem(item)}
          />
        )}

        {activeTab === 'suppliers' && (
          <SupplierList
            onSelectSupplier={(s) => setSelectedDetailItem(s)}
            onOpenNewSupplier={() => setIsNewSupplierOpen(true)}
            onShareToLine={(s) => setShareLineItem(s)}
          />
        )}

        {activeTab === 'drink_stores' && (
          <StoreInspoList
            onSelectStore={(st) => setSelectedDetailItem(st)}
            onOpenNewStoreInspo={() => setIsNewStoreInspoOpen(true)}
            onShareToLine={(st) => setShareLineItem(st)}
          />
        )}

        {activeTab === 'categories' && (
          <CategoryExplorerView
            onSelectSupplier={(s) => setSelectedDetailItem(s)}
            onSelectStore={(st) => setSelectedDetailItem(st)}
            onShareToLine={(item) => setShareLineItem(item)}
            onOpenNewSupplier={() => setIsNewSupplierOpen(true)}
            onOpenNewStoreInspo={() => setIsNewStoreInspoOpen(true)}
          />
        )}

        {activeTab === 'handoff' && (
          <HandoffManagementView
            onSelectItem={(item) => setSelectedDetailItem(item)}
          />
        )}

        {activeTab === 'members' && <MembersManagementView />}
        {activeTab === 'products' && <ProductWorkspace onOpenSupplier={id => { const item = suppliers.find(s => s.id === id); if (item) setSelectedDetailItem(item); }} />}
        {activeTab === 'settings' && (
          <SettingsManagementView />
        )}
      </Suspense>
      </main>

      {/* Modals */}
      {(isNewSupplierOpen || editingSupplier) && <Suspense fallback={<ModalLoading />}><NewSupplierModal
        isOpen={isNewSupplierOpen}
        onClose={() => setIsNewSupplierOpen(false)}
      /></Suspense>}

      {(isNewStoreInspoOpen || editingStore) && <Suspense fallback={<ModalLoading />}><NewStoreInspoModal
        isOpen={isNewStoreInspoOpen}
        onClose={() => setIsNewStoreInspoOpen(false)}
      /></Suspense>}

      {selectedDetailItem && <Suspense fallback={<ModalLoading />}><DetailModal
        item={selectedDetailItem}
        isOpen={!!selectedDetailItem}
        onClose={() => setSelectedDetailItem(null)}
        onShareToLine={(item) => setShareLineItem(item)}
      /></Suspense>}

      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      <ShareLineModal
        item={shareLineItem}
        isOpen={!!shareLineItem}
        onClose={() => setShareLineItem(null)}
      />

      <PinLoginModal
        isOpen={isPinLoginOpen}
        onClose={() => setIsPinLoginOpen(false)}
      />

      <CurrencyCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />

      <InstallPromptModal
        isOpen={isInstallOpen}
        onClose={() => setIsInstallOpen(false)}
      />

      <NotificationSheetModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onSelectItem={handleSelectFromNotification}
      />

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
