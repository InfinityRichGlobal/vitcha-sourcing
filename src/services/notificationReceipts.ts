import { AppNotification } from '../types';

// Only IDs and desired read/clear state are persisted, never notification content
// or credentials. Scope them by API origin and member, including after reload.
export class NotificationReceipts {
  readonly read = new Set<string>();
  readonly clear = new Set<string>();
  readonly acknowledgedRead = new Set<string>();
  readonly acknowledgedClear = new Set<string>();
  busy = false;
  private storageKey: string;
  constructor(readonly key: string) {
    this.storageKey = `vitcha-notification-receipts-v1:${encodeURIComponent(key)}`;
    try {
      const value = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
      for (const kind of ['read', 'clear'] as const) if (Array.isArray(value[kind])) for (const id of value[kind].slice(-160)) if (typeof id === 'string') this[kind].add(id);
    } catch { /* In-memory receipts still work when storage is unavailable. */ }
  }
  private persist() {
    try {
      if (!this.read.size && !this.clear.size) localStorage.removeItem(this.storageKey);
      else localStorage.setItem(this.storageKey, JSON.stringify({ read: [...this.read], clear: [...this.clear] }));
    } catch {}
  }
  remember(ids: string[], kind: 'read' | 'clear') {
    for (const id of ids) this[kind].add(id);
    this.persist();
  }
  pending(kind: 'read' | 'clear') {
    const acknowledged = kind === 'read' ? this.acknowledgedRead : this.acknowledgedClear;
    return [...this[kind]].filter(id => !acknowledged.has(id)).slice(0, 80);
  }
  acknowledge(ids: string[], kind: 'read' | 'clear') {
    const acknowledged = kind === 'read' ? this.acknowledgedRead : this.acknowledgedClear;
    for (const id of ids) acknowledged.add(id);
  }
  merge(snapshot: AppNotification[]) {
    const byId = new Map(snapshot.map(n => [n.id, n]));
    for (const id of this.read) if (!byId.has(id) || byId.get(id)?.read) { this.read.delete(id); this.acknowledgedRead.delete(id); }
    for (const id of this.clear) if (!byId.has(id)) { this.clear.delete(id); this.acknowledgedClear.delete(id); }
    this.persist();
    return snapshot.filter(n => !this.clear.has(n.id)).map(n => this.read.has(n.id) ? { ...n, read: true } : n);
  }
}
