import React, { useState, useEffect, lazy, Suspense } from 'react';
import { ConnectionStatus } from './components/ConnectionStatus';
import { AppProvider, useApp } from './context/AppContext';
import { TopHeader } from './components/TopHeader';
import { PullToRefresh } from './components/PullToRefresh';
import { NavigationTabs } from './components/NavigationTabs';
import { DashboardOverview } from './components/DashboardOverview';
import { SupplierList } from './components/SupplierList';
import { StoreInspoList } from './components/StoreInspoList';
import { CategoryExplorerView } from './components/CategoryExplorerView';
const LocationList = lazy(() => import('./components/LocationList').then(m => ({ default: m.LocationList })));
const HandoffManagementView = lazy(() => import('./components/HandoffManagementView').then(m => ({ default: m.HandoffManagementView })));
const SettingsManagementView = lazy(() => import('./components/SettingsManagementView').then(m => ({ default: m.SettingsManagementView })));
const MembersManagementView = lazy(() => import('./components/MembersManagementView').then(m => ({ default: m.MembersManagementView })));
const ProductWorkspace = lazy(() => import('./components/ProductWorkspace').then(m => ({ default: m.ProductWorkspace })));
const TrashView = lazy(() => import('./components/TrashView').then(m => ({ default: m.TrashView })));
const LeadLabView = lazy(() => import('./components/LeadLabView').then(m => ({ default: m.LeadLabView })));
const FranchiseStoreView = lazy(() => import('./components/FranchiseStoreView').then(m => ({ default: m.FranchiseStoreView })));
const NewSupplierModal = lazy(() => import('./components/NewSupplierModal').then(m => ({ default: m.NewSupplierModal })));
const NewStoreInspoModal = lazy(() => import('./components/NewStoreInspoModal').then(m => ({ default: m.NewStoreInspoModal })));
const NewLocationModal = lazy(() => import('./components/NewLocationModal').then(m => ({ default: m.NewLocationModal })));
const DetailModal = lazy(() => import('./components/DetailModal').then(m => ({ default: m.DetailModal })));
import { UserProfileModal } from './components/UserProfileModal';
import { ShareLineModal } from './components/ShareLineModal';
import { PinLoginModal } from './components/PinLoginModal';
import { CurrencyCalculatorModal } from './components/CurrencyCalculatorModal';
import { InstallPromptModal } from './components/InstallPromptModal';
import { NotificationSheetModal } from './components/NotificationSheetModal';
import { NotificationToast } from './components/NotificationToast';
import { RegisterWithInviteModal } from './components/RegisterWithInviteModal';
import { Loader2 } from 'lucide-react';
import { SupplierRecord, StoreInspoRecord, LocationRecord } from './types';

const ModalLoading = () => <div className="fixed inset-0 z-[110] grid place-items-center bg-slate-950/30 p-4 backdrop-blur-sm"><div role="status" className="rounded-2xl bg-white px-8 py-6 text-sm font-medium text-slate-600 shadow-xl">กำลังเปิดรายละเอียด…</div></div>;

const MainApp: React.FC = () => {
  const { activeTab, setActiveTab, suppliers, drinkStores, locations, isAuthenticated, isRestoringSession, editingSupplier, editingStore, editingLocation, isMockLoading, mockLoadMessage, mockLoadStatus } = useApp();

  const [isNewSupplierOpen, setIsNewSupplierOpen] = useState(false);
  const [isNewStoreInspoOpen, setIsNewStoreInspoOpen] = useState(false);
  const [isNewLocationOpen, setIsNewLocationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isInstallOpen, setIsInstallOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [selectedDetailItem, setSelectedDetailItem] = useState<SupplierRecord | StoreInspoRecord | LocationRecord | null>(null);
  const [shareLineItem, setShareLineItem] = useState<any>(null);
  const [isPinLoginOpen, setIsPinLoginOpen] = useState(false);
  const [initialLeadLabItemId, setInitialLeadLabItemId] = useState<string | null>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('tab') === 'lead_lab' ? params.get('view') : null;
  });
  const [initialFranchiseStoreId, setInitialFranchiseStoreId] = useState<string | null>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('tab') === 'franchise_stores' ? params.get('view') : null;
  });

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
    const tabParam = params.get('tab');

    if (inviteParam && !isAuthenticated) {
      setInviteCodeUrl(inviteParam);
      setAuthView('invite');
    }

    if (tabParam && ['dashboard', 'suppliers', 'drink_stores', 'locations', 'handoff', 'products', 'members', 'settings', 'trash', 'lead_lab', 'franchise_stores'].includes(tabParam)) {
      setActiveTab(tabParam as any);
      if (tabParam === 'lead_lab' && viewParam) {
        setInitialLeadLabItemId(viewParam);
      } else if (tabParam === 'franchise_stores' && viewParam) {
        setInitialFranchiseStoreId(viewParam);
      }
    }

    if (viewParam) {
      if (typeParam === 'supplier') {
        const found = suppliers.find((s) => s.id === viewParam);
        if (found) setSelectedDetailItem(found);
      } else if (typeParam === 'drink_store') {
        const found = drinkStores.find((d) => d.id === viewParam);
        if (found) setSelectedDetailItem(found);
      } else if (typeParam === 'location') {
        const found = locations.find((l) => l.id === viewParam);
        if (found) setSelectedDetailItem(found);
      }
    }
  }, [suppliers, drinkStores, isAuthenticated]);

  const [dashboardFeedFilter, setDashboardFeedFilter] = useState<'all' | 'suppliers' | 'drink_stores' | 'locations'>('all');
  const [dashboardMapFilter, setDashboardMapFilter] = useState<'all' | 'suppliers' | 'drink_stores' | 'locations'>('all');

  const handleScrollToMap = () => {
    setDashboardFeedFilter('locations');
    setDashboardMapFilter('locations');
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
      return;
    }

    const foundLocation = locations.find((l) => l.id === targetId);
    if (foundLocation) {
      setSelectedDetailItem(foundLocation);
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
    if (isRestoringSession && !(authView === 'invite' && inviteCodeUrl)) {
      return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center font-sans text-slate-600 gap-3">
          <img
            src="./logo.jpg"
            alt="ฉันจะเป็นหัวแถว"
            className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shadow-xs animate-pulse"
          />
          <div role="status" className="text-xs font-semibold text-slate-500">
            กำลังเข้าสู่ระบบอัตโนมัติ...
          </div>
        </div>
      );
    }
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
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      <ConnectionStatus />
      {/* Real-time In-App Floating Toast Notification */}
      <NotificationToast onSelectItem={handleSelectFromNotification} />


      {/* 1. Header with "ฉันจะเป็นหัวแถว", Menu Drawer, Install App, and Notifications */}
      <TopHeader
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenNewSupplier={() => setIsNewSupplierOpen(true)}
        onOpenNewStoreInspo={() => setIsNewStoreInspoOpen(true)}
        onOpenNewLocation={() => setIsNewLocationOpen(true)}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenInstall={() => setIsInstallOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenInvites={() => setActiveTab('members')}
        onScrollToMap={handleScrollToMap}
      />

      {/* 2. Top Standalone Navigation Bar (สลับหน้าใครหน้ามันได้ทันที) */}
      <NavigationTabs />
      <PullToRefresh />
      {mockLoadStatus !== 'idle' && (
        <div role="status" data-testid="mockup-result" className={`mx-auto w-full max-w-6xl px-4 py-3 text-sm ${mockLoadStatus === 'error' ? 'text-rose-800 bg-rose-50' : 'text-emerald-900 bg-emerald-50'}`}>
          <div className="flex items-start gap-2">
            {isMockLoading && <Loader2 className="w-5 h-5 shrink-0 animate-spin" />}
            <span>{mockLoadMessage}</span>
          </div>
        </div>
      )}

      {/* 3. Filterable & Independent View Pages */}
      <main className="flex-1 bg-slate-50/40">
        <Suspense fallback={<div role="status" className="p-8 text-center text-slate-500">กำลังเปิดหน้า…</div>}>
        {activeTab === 'dashboard' && (
          <DashboardOverview
            onSelectSupplier={(s) => setSelectedDetailItem(s)}
            onSelectStore={(st) => setSelectedDetailItem(st)}
            onSelectLocation={(l) => setSelectedDetailItem(l)}
            onOpenNewSupplier={() => setIsNewSupplierOpen(true)}
            onOpenNewStoreInspo={() => setIsNewStoreInspoOpen(true)}
            onOpenNewLocation={() => setIsNewLocationOpen(true)}
            onShareToLine={(item) => setShareLineItem(item)}
            initialFeedFilter={dashboardFeedFilter}
            initialMapFilter={dashboardMapFilter}
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

        {activeTab === 'locations' && (
          <LocationList
            onSelectLocation={(loc) => setSelectedDetailItem(loc)}
            onOpenNewLocation={() => setIsNewLocationOpen(true)}
            onShareToLine={(loc) => setShareLineItem(loc)}
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
        {activeTab === 'trash' && <TrashView />}
        {activeTab === 'lead_lab' && (
          <LeadLabView
            initialItemId={initialLeadLabItemId}
            onOpenStoreSimulator={() => setActiveTab('franchise_stores')}
          />
        )}
        {activeTab === 'franchise_stores' && (
          <FranchiseStoreView
            initialStoreId={initialFranchiseStoreId}
            onNavigateToLab={() => setActiveTab('lead_lab')}
          />
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

      {(isNewLocationOpen || editingLocation) && <Suspense fallback={<ModalLoading />}><NewLocationModal
        isOpen={isNewLocationOpen}
        onClose={() => setIsNewLocationOpen(false)}
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
