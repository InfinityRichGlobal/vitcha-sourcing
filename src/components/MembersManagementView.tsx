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
  "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100";
const roles = [
  ["reviewer", "Reviewer"],
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
  const [role, setRole] = useState<UserRole>("reviewer");
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
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            VITCHA TEAM
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            สมาชิกและคำเชิญ
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            จัดการสมาชิกในทีมและติดตามคำเชิญในที่เดียว
          </p>
        </div>
        <button
          aria-label="รีเฟรชสมาชิก"
          onClick={() => void refreshCentralData()}
          className="rounded-xl border bg-white p-3 text-slate-600"
        >
          <RefreshCw size={18} />
        </button>
      </header>
      {error && (
        <p
          role="alert"
          className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700"
        >
          {error}
        </p>
      )}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="flex items-center gap-2 font-bold">
            <UserPlus size={19} className="text-emerald-700" />
            เชิญสมาชิก
          </h2>
          <form
            className="mt-5 space-y-4"
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
            <label className="block space-y-2 text-sm font-medium">
              <span>ชื่อผู้รับคำเชิญ</span>
              <input
                className={control}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ชื่อที่ต้องการใส่ในข้อความเชิญ"
                maxLength={120}
                required
                disabled={busy}
              />
            </label>
            <label className="block space-y-2 text-sm font-medium">
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
              className="w-full rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white disabled:opacity-50"
            >
              {busy ? "กำลังสร้างคำเชิญ…" : "สร้างคำเชิญ"}
            </button>
          </form>
          {preview && (
            <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <p className="mb-2 text-xs font-semibold text-emerald-800">
                ข้อความพร้อมส่ง
              </p>
              <textarea
                aria-label="ข้อความเชิญพร้อมลิงก์"
                readOnly
                value={inviteMessage(preview, window.location.href)}
                className="min-h-48 w-full resize-y rounded-lg border border-emerald-200 bg-white p-3 text-sm leading-relaxed"
              />
              <button
                onClick={() => void copy(preview)}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-700 px-3 py-2.5 text-sm font-semibold text-white"
              >
                {copied === preview.id ? (
                  <Check size={16} />
                ) : (
                  <Copy size={16} />
                )}{" "}
                {copied === preview.id ? "คัดลอกแล้ว" : "คัดลอกข้อความและลิงก์"}
              </button>
            </div>
          )}
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="font-bold">
            คำเชิญล่าสุด{" "}
            <span className="ml-1 text-sm font-normal text-slate-400">
              {invites.length}
            </span>
          </h2>
          <div className="mt-4 max-h-[560px] space-y-3 overflow-y-auto">
            {invites.length === 0 && (
              <p className="py-12 text-center text-sm text-slate-400">
                ยังไม่มีคำเชิญ
              </p>
            )}
            {invites.map((inv) => (
              <div
                key={inv.id}
                className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3"
                data-testid="invite-row"
              >
                <div className="min-w-0 flex-1">
                  <p className="break-words text-sm font-semibold">
                    {inv.prefilledAlias || "สมาชิกใหม่"}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {inv.role} ·{" "}
                    {inv.createdAt && Number.isFinite(Date.parse(inv.createdAt))
                      ? new Date(inv.createdAt).toLocaleDateString("th-TH")
                      : "ไม่ระบุวันที่"}
                  </p>
                  <span
                    className={`mt-2 inline-block rounded-full px-2 py-1 text-[11px] ${inv.isUsed ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}
                  >
                    {inv.isUsed ? "สมัครแล้ว" : "รอเข้าร่วม"}
                  </span>
                </div>
                {!inv.isUsed && (
                  <>
                    <button
                      aria-label={`คัดลอกคำเชิญ ${inv.prefilledAlias || inv.code}`}
                      onClick={() => void copy(inv)}
                      className="rounded-lg border bg-white p-2.5 text-slate-600"
                    >
                      {copied === inv.id ? (
                        <Check size={16} />
                      ) : (
                        <Copy size={16} />
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
                      className="rounded-lg p-2.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                    >
                      <X size={16} />
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="flex items-center gap-2 font-bold">
            <Users size={19} className="text-emerald-700" />
            สมาชิก {members.length} คน
          </h2>
          <label className="flex w-full items-center gap-2 rounded-xl border px-3 sm:w-72">
            <Search size={16} className="text-slate-400" />
            <input
              aria-label="ค้นหาสมาชิก"
              className="min-w-0 flex-1 bg-transparent py-2.5 text-sm outline-none"
              placeholder="ค้นหาชื่อหรือไอดี"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
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
                className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-100 p-3"
              >
                <AvatarImage
                  src={user.avatar}
                  className="h-11 w-11 shrink-0 rounded-full object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">
                    {user.alias || user.name}
                  </p>
                  <p className="truncate text-xs text-slate-400">
                    {user.emailOrId}
                  </p>
                </div>
                {user.id !== "user-ice" ? (
                  <div className="flex items-center gap-2">
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
                      className="rounded-lg border bg-slate-50 p-2 text-xs"
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
                        className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ) : (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100">
                    ผู้ดูแลระบบ (Admin)
                  </span>
                )}
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
