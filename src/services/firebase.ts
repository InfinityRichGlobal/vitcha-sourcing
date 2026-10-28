import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  Firestore,
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  Unsubscribe,
} from 'firebase/firestore';
import { SupplierRecord, StoreInspoRecord, User, InviteLink } from '../types';

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

const STORAGE_KEY = 'vitcha_firebase_config_v1';

let appInstance: FirebaseApp | null = null;
let dbInstance: Firestore | null = null;

// Read saved config from storage or environment
export function getSavedFirebaseConfig(): FirebaseConfig | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // Ignore error
  }
  return null;
}

export function saveFirebaseConfig(config: FirebaseConfig): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  initFirebase(config);
}

export function removeFirebaseConfig(): void {
  localStorage.removeItem(STORAGE_KEY);
  appInstance = null;
  dbInstance = null;
}

export function initFirebase(config?: FirebaseConfig): Firestore | null {
  const activeConfig = config || getSavedFirebaseConfig();
  if (!activeConfig || !activeConfig.projectId) {
    return null;
  }

  try {
    if (!getApps().length) {
      appInstance = initializeApp(activeConfig);
    } else {
      appInstance = getApp();
    }
    dbInstance = getFirestore(appInstance);
    return dbInstance;
  } catch (err) {
    console.warn('Firebase init warning:', err);
    return null;
  }
}

export function isFirebaseConfigured(): boolean {
  return dbInstance !== null || getSavedFirebaseConfig() !== null;
}

export function getDb(): Firestore | null {
  if (!dbInstance) {
    dbInstance = initFirebase();
  }
  return dbInstance;
}

// ----------------- Real-time Cloud Subscriptions -----------------

export function subscribeCloudSuppliers(
  onUpdate: (suppliers: SupplierRecord[]) => void
): Unsubscribe | null {
  const db = getDb();
  if (!db) return null;

  try {
    const colRef = collection(db, 'suppliers');
    return onSnapshot(
      colRef,
      (snapshot) => {
        const items: SupplierRecord[] = [];
        snapshot.forEach((docSnap) => {
          items.push(docSnap.data() as SupplierRecord);
        });
        if (items.length > 0) {
          onUpdate(items);
        }
      },
      (error) => {
        console.warn('Firestore suppliers sync error:', error);
      }
    );
  } catch (e) {
    console.warn('Error subscribing to cloud suppliers:', e);
    return null;
  }
}

export function subscribeCloudDrinkStores(
  onUpdate: (stores: StoreInspoRecord[]) => void
): Unsubscribe | null {
  const db = getDb();
  if (!db) return null;

  try {
    const colRef = collection(db, 'drink_stores');
    return onSnapshot(
      colRef,
      (snapshot) => {
        const items: StoreInspoRecord[] = [];
        snapshot.forEach((docSnap) => {
          items.push(docSnap.data() as StoreInspoRecord);
        });
        if (items.length > 0) {
          onUpdate(items);
        }
      },
      (error) => {
        console.warn('Firestore drink stores sync error:', error);
      }
    );
  } catch (e) {
    console.warn('Error subscribing to cloud drink stores:', e);
    return null;
  }
}

export function subscribeCloudUsers(
  onUpdate: (users: User[]) => void
): Unsubscribe | null {
  const db = getDb();
  if (!db) return null;

  try {
    const colRef = collection(db, 'users');
    return onSnapshot(
      colRef,
      (snapshot) => {
        const items: User[] = [];
        snapshot.forEach((docSnap) => {
          items.push(docSnap.data() as User);
        });
        if (items.length > 0) {
          onUpdate(items);
        }
      },
      (error) => {
        console.warn('Firestore users sync error:', error);
      }
    );
  } catch (e) {
    console.warn('Error subscribing to cloud users:', e);
    return null;
  }
}

export function subscribeCloudInvites(
  onUpdate: (invites: InviteLink[]) => void
): Unsubscribe | null {
  const db = getDb();
  if (!db) return null;

  try {
    const colRef = collection(db, 'invites');
    return onSnapshot(
      colRef,
      (snapshot) => {
        const items: InviteLink[] = [];
        snapshot.forEach((docSnap) => {
          items.push(docSnap.data() as InviteLink);
        });
        if (items.length > 0) {
          onUpdate(items);
        }
      },
      (error) => {
        console.warn('Firestore invites sync error:', error);
      }
    );
  } catch (e) {
    console.warn('Error subscribing to cloud invites:', e);
    return null;
  }
}

// ----------------- Cloud Write / Mutation Operations -----------------

export async function saveSupplierToCloud(supplier: SupplierRecord): Promise<void> {
  const db = getDb();
  if (!db) return;
  try {
    const docRef = doc(db, 'suppliers', supplier.id);
    await setDoc(docRef, supplier, { merge: true });
  } catch (err) {
    console.warn('Error saving supplier to cloud:', err);
  }
}

export async function deleteSupplierFromCloud(supplierId: string): Promise<void> {
  const db = getDb();
  if (!db) return;
  try {
    const docRef = doc(db, 'suppliers', supplierId);
    await deleteDoc(docRef);
  } catch (err) {
    console.warn('Error deleting supplier from cloud:', err);
  }
}

export async function saveStoreToCloud(store: StoreInspoRecord): Promise<void> {
  const db = getDb();
  if (!db) return;
  try {
    const docRef = doc(db, 'drink_stores', store.id);
    await setDoc(docRef, store, { merge: true });
  } catch (err) {
    console.warn('Error saving drink store to cloud:', err);
  }
}

export async function deleteStoreFromCloud(storeId: string): Promise<void> {
  const db = getDb();
  if (!db) return;
  try {
    const docRef = doc(db, 'drink_stores', storeId);
    await deleteDoc(docRef);
  } catch (err) {
    console.warn('Error deleting drink store from cloud:', err);
  }
}

export async function saveUserToCloud(user: User): Promise<void> {
  const db = getDb();
  if (!db) return;
  try {
    const docRef = doc(db, 'users', user.id);
    await setDoc(docRef, user, { merge: true });
  } catch (err) {
    console.warn('Error saving user to cloud:', err);
  }
}

export async function saveInviteToCloud(invite: InviteLink): Promise<void> {
  const db = getDb();
  if (!db) return;
  try {
    const docRef = doc(db, 'invites', invite.id);
    await setDoc(docRef, invite, { merge: true });
  } catch (err) {
    console.warn('Error saving invite to cloud:', err);
  }
}
