import { useRef, useState } from "react";
import {
  Copy,
  Check,
  UserPlus,
  Search,
  Users,
  RefreshCw,
  X,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { UserRole, InviteLink } from "../types";
import { AvatarImage } from "./AvatarImage";
import { inviteMessage } from "../utils/inviteMessage";

const control =
  "w-full rounded-xl border border-slate-200/90 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-emerald-500";
const roles = [
  ["editor", "Editor — ผู้แก้ไขข้อมูล"],
  ["viewer", "Viewer"],
  ["admin", "Admin"],
];
export function MembersManagementView() {
  const {
    currentUser,
    users,
    invites,
    createInvite,
    deleteInvite,
    updateUserRole,
    deleteUser,
    refreshCentralData,
  } = useApp();
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole>("editor");
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState(false);
  const creating = useRef(false);
  const [copied, setCopied] = useState("");
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<InviteLink | null>(null);
  const [pendingUser, setPendingUser] = useState("");
  if (currentUser.role !== "admin") return null;
  const members = users.filter(
    (u) => !["user-mook", "user-ann", "user-beam"].includes(u.id),
  );
  async function copy(invite: InviteLink) {
    try {
      await navigator.clipboard.writeText(
        inviteMessage(invite, window.location.href),
      );
      setCopied(invite.id);
      setPreview(invite);
      setError("");
    } catch {
      setPreview(invite);
      setError("คัดลอกอัตโนมัติไม่ได้ กรุณาเลือกข้อความด้านล่างเพื่อคัดลอก");
    }
  }
  return (
    <div className="mx-auto max-w-6xl space-y-3.5 px-3 py-3 sm:px-4 animate-in fade-in">
      <div className="bg-white px-3.5 py-2.5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 border border-purple-200/60 flex items-center justify-center shrink-0">
            <i aria-hidden="true" className="fa-solid fa-user-shield text-xs" />
          </div>
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <h1 className="text-xs sm:text-sm font-extrabold tracking-tight text-slate-900">
              สมาชิกและคำเชิญ
            </h1>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 border border-purple-200">
              {members.length} คน
            </span>
          </div>
        </div>
        <button
          aria-label="รีเฟรชสมาชิก"
          onClick={() => void refreshCentralData()}
          className="rounded-lg border border-slate-200/80 bg-slate-50 hover:bg-slate-100 p-1.5 text-slate-600 transition-colors shrink-0"
        >
          <RefreshCw size={14} />
        </button>
      </div>
      {error && (
        <p
          role="alert"
          className="rounded-xl bg-rose-50 border border-rose-200 px-3 py-2 text-xs font-bold text-rose-700"
        >
          {error}
        </p>
      )}
      <div className="grid gap-3.5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <section className="rounded-2xl border border-slate-200/80 bg-white p-3.5 sm:p-4 shadow-2xs space-y-3">
          <h2 className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-900">
            <UserPlus size={15} className="text-emerald-700" />
            <span>เชิญสมาชิก</span>
          </h2>
          <form
            className="space-y-2.5"
            onSubmit={async (e) => {
              e.preventDefault();
              if (creating.current) return;
              creating.current = true;
              setBusy(true);
              setError("");
              try {
                const invite = await createInvite(role, name.trim());
                setPreview(invite);
                setName("");
              } catch (e) {
                setError(
                  e instanceof Error ? e.message : "สร้างคำเชิญไม่สำเร็จ",
                );
              } finally {
                creating.current = false;
                setBusy(false);
              }
            }}
          >
            <label className="block space-y-1 text-xs font-bold text-slate-700">
              <span>ชื่อผู้รับคำเชิญ</span>
              <input
                className={control}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="เช่น คุณแอน (จัดซื้อ) หรือ ช่างบีม"
                maxLength={120}
                required
                disabled={busy}
              />
            </label>
            <label className="block space-y-1 text-xs font-bold text-slate-700">
              <span>ระดับสมาชิก</span>
              <select
                className={control}
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                disabled={busy}
              >
                {roles.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <button
              disabled={busy}
              className="w-full rounded-xl bg-slate-900 hover:bg-emerald-700 px-3.5 py-2 text-xs font-bold text-white transition-colors disabled:opacity-50"
            >
              {busy ? "กำลังสร้างคำเชิญ…" : "สร้างคำเชิญ"}
            </button>
          </form>
          {preview && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3 space-y-2">
              <p className="text-[11px] font-bold text-emerald-800">
                ข้อความพร้อมส่ง
              </p>
              <textarea
                aria-label="ข้อความเชิญพร้อมลิงก์"
                readOnly
                value={inviteMessage(preview, window.location.href)}
                className="min-h-32 w-full resize-y rounded-lg border border-emerald-200 bg-white p-2.5 text-xs leading-relaxed text-slate-800"
              />
              <button
                onClick={() => void copy(preview)}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 px-3 py-2 text-xs font-bold text-white transition-colors"
              >
                {copied === preview.id ? (
                  <Check size={14} />
                ) : (
                  <Copy size={14} />
                )}{" "}
                {copied === preview.id ? "คัดลอกแล้ว" : "คัดลอกข้อความและลิงก์"}
              </button>
            </div>
          )}
        </section>
        <section className="rounded-2xl border border-slate-200/80 bg-white p-3.5 sm:p-4 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs sm:text-sm font-bold text-slate-900">
              คำเชิญล่าสุด
            </h2>
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
              {invites.length} รายการ
            </span>
          </div>
          <div className="max-h-[420px] space-y-2 overflow-y-auto pr-0.5">
            {invites.length === 0 && (
              <p className="py-8 text-center text-xs text-slate-400">
                ยังไม่มีคำเชิญ
              </p>
            )}
            {invites.map((inv) => (
              <div
                key={inv.id}
                className="flex items-center justify-between gap-2 rounded-xl border border-slate-200/70 bg-slate-50/70 px-3 py-2"
                data-testid="invite-row"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <p className="truncate text-xs font-bold text-slate-900">
                      {inv.prefilledAlias || "สมาชิกใหม่"}
                    </p>
                    <span
                      className={`inline-block rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
                        inv.isUsed
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-800 border border-amber-200"
                      }`}
                    >
                      {inv.isUsed ? "สมัครแล้ว" : "รอเข้าร่วม"}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-slate-500 font-mono">
                    {inv.role} ·{" "}
                    {inv.createdAt && Number.isFinite(Date.parse(inv.createdAt))
                      ? new Date(inv.createdAt).toLocaleDateString("th-TH")
                      : "ไม่ระบุวันที่"}
                  </p>
                </div>
                {!inv.isUsed && (
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      aria-label={`คัดลอกคำเชิญ ${inv.prefilledAlias || inv.code}`}
                      onClick={() => void copy(inv)}
                      className="rounded-lg border border-slate-200 bg-white hover:bg-slate-100 p-1.5 text-slate-600 transition-colors"
                    >
                      {copied === inv.id ? (
                        <Check size={14} className="text-emerald-600" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                    <button
                      aria-label={`ยกเลิกคำเชิญ ${inv.prefilledAlias || inv.code}`}
                      onClick={async () => {
                        if (confirm("ยกเลิกคำเชิญนี้?")) {
                          if (await deleteInvite(inv.id)) {
                            if (preview?.id === inv.id) setPreview(null);
                          }
                        }
                      }}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
      <section className="rounded-2xl border border-slate-200/80 bg-white p-3.5 sm:p-4 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-900">
            <Users size={15} className="text-emerald-700" />
            <span>สมาชิกในระบบ ({members.length} คน)</span>
          </h2>
          <label className="flex w-full items-center gap-1.5 rounded-xl border border-slate-200/80 bg-slate-50 px-2.5 sm:w-60">
            <Search size={14} className="text-slate-400 shrink-0" />
            <input
              aria-label="ค้นหาสมาชิก"
              className="min-w-0 flex-1 bg-transparent py-1.5 text-xs outline-none"
              placeholder="ค้นหาชื่อหรือไอดี..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
        <div className="grid gap-2.5 md:grid-cols-2">
          {members
            .filter((u) =>
              `${u.alias} ${u.emailOrId}`
                .toLowerCase()
                .includes(query.toLowerCase()),
            )
            .map((user) => (
              <div
                key={user.id}
                data-testid="member-row"
                className="flex items-center justify-between gap-2.5 rounded-xl border border-slate-200/70 bg-slate-50/40 px-3 py-2"
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <AvatarImage
                    src={user.avatar}
                    className="h-8 w-8 shrink-0 rounded-full object-cover border border-slate-200"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold text-slate-900">
                      {user.alias || user.name}
                    </p>
                    <p className="truncate text-[11px] text-slate-400 font-mono">
                      {user.emailOrId}
                    </p>
                  </div>
                </div>
                {user.id !== "user-ice" ? (
                  <div className="flex items-center gap-1.5 shrink-0">
                    <select
                      aria-label={`ระดับสมาชิก ${user.alias}`}
                      value={user.role}
                      disabled={pendingUser === user.id}
                      onChange={async (e) => {
                        const value = e.target.value as UserRole;
                        if (
                          user.id === currentUser.id &&
                          !confirm("เปลี่ยนระดับสมาชิกของบัญชีที่กำลังใช้อยู่?")
                        )
                          return;
                        setPendingUser(user.id);
                        await updateUserRole(user.id, value);
                        setPendingUser("");
                      }}
                      className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700"
                    >
                      {roles.map(([v, l]) => (
                        <option key={v} value={v}>
                          {l}
                        </option>
                      ))}
                    </select>
                    {user.id !== currentUser.id && (
                      <button
                        aria-label={`ลบสมาชิก ${user.alias}`}
                        disabled={pendingUser === user.id}
                        onClick={async () => {
                          if (confirm(`ลบสมาชิก ${user.alias}?`)) {
                            setPendingUser(user.id);
                            await deleteUser(user.id);
                            setPendingUser("");
                          }
                        }}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ) : (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                    Admin
                  </span>
                )}
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
