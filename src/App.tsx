import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { TopHeader } from './components/TopHeader';
import { NavigationTabs } from './components/NavigationTabs';
import { DashboardOverview } from './components/DashboardOverview';
import { SupplierList } from './components/SupplierList';
import { StoreInspoList } from './components/StoreInspoList';
import { CategoryExplorerView } from './components/CategoryExplorerView';
import { HandoffManagementView } from './components/HandoffManagementView';
import { SettingsManagementView } from './components/SettingsManagementView';
import { InviteManagerModal } from './components/InviteManagerModal';
import { NewSupplierModal } from './components/NewSupplierModal';
import { NewStoreInspoModal } from './components/NewStoreInspoModal';
import { DetailModal } from './components/DetailModal';
import { UserProfileModal } from './components/UserProfileModal';
import { ShareLineModal } from './components/ShareLineModal';
import { PinLoginModal } from './components/PinLoginModal';
import { CurrencyCalculatorModal } from './components/CurrencyCalculatorModal';
import { InstallPromptModal } from './components/InstallPromptModal';
import { NotificationSheetModal } from './components/NotificationSheetModal';
import { NotificationToast } from './components/NotificationToast';
import { SupplierRecord, StoreInspoRecord } from './types';

const MainApp: React.FC = () => {
  const { activeTab, setActiveTab, suppliers, drinkStores } = useApp();

  const [isNewSupplierOpen, setIsNewSupplierOpen] = useState(false);
  const [isNewStoreInspoOpen, setIsNewStoreInspoOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isInstallOpen, setIsInstallOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [selectedDetailItem, setSelectedDetailItem] = useState<SupplierRecord | StoreInspoRecord | null>(null);
  const [shareLineItem, setShareLineItem] = useState<SupplierRecord | StoreInspoRecord | null>(null);
  const [isPinLoginOpen, setIsPinLoginOpen] = useState(false);

  // Check URL query parameters (e.g. ?invite=CODE or ?view=ITEM_ID)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const inviteParam = params.get('invite');
    const viewParam = params.get('view');
    const typeParam = params.get('type');

    if (inviteParam) {
      setIsInviteModalOpen(true);
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
  }, [suppliers, drinkStores]);

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

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans pb-16 selection:bg-emerald-500 selection:text-white">
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
        onOpenInvites={() => setIsInviteModalOpen(true)}
        onScrollToMap={handleScrollToMap}
      />

      {/* 2. Top Standalone Navigation Bar (สลับหน้าใครหน้ามันได้ทันที) */}
      <NavigationTabs />

      {/* 3. Filterable & Independent View Pages */}
      <main className="flex-1 bg-slate-50/40">
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

        {activeTab === 'settings' && (
          <SettingsManagementView />
        )}
      </main>

      {/* Modals */}
      <NewSupplierModal
        isOpen={isNewSupplierOpen}
        onClose={() => setIsNewSupplierOpen(false)}
      />

      <NewStoreInspoModal
        isOpen={isNewStoreInspoOpen}
        onClose={() => setIsNewStoreInspoOpen(false)}
      />

      <DetailModal
        item={selectedDetailItem}
        isOpen={!!selectedDetailItem}
        onClose={() => setSelectedDetailItem(null)}
        onShareToLine={(item) => setShareLineItem(item)}
      />

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

      <InviteManagerModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
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
