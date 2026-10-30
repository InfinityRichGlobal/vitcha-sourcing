import { useMemo, useState } from "react";
import {
  Package,
  Search,
  Layers,
  Tag,
  Plus,
  X,
  ArrowUp,
  ArrowDown,
  Check,
  ExternalLink,
  SlidersHorizontal,
  MessageSquare,
  Send,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { CuratedProduct, ProductSet, ProductChanges } from "../types";
import { useDialog } from "../hooks/useDialog";
import { VideoPlayer } from "./VideoPlayer";

const decisions = {
  pending: "ยังไม่คัด",
  keep: "ใช้ได้",
  hold: "รอตรวจ",
  reject: "ไม่ใช้",
};
const statusStyle = {
  pending: "bg-slate-100 text-slate-600",
  keep: "bg-emerald-50 text-emerald-800",
  hold: "bg-amber-50 text-amber-800",
  reject: "bg-rose-50 text-rose-700",
};
const button =
  "inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200/90 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-colors";
const input =
  "w-full rounded-xl border border-slate-200/90 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500";

export function ProductWorkspace({
  onOpenSupplier,
}: {
  onOpenSupplier: (id: string) => void;
}) {
  const {
    products,
    productCategories,
    productTags,
    productSets,
    currentUser,
    isMutating,
    updateProducts,
    saveProductSet,
    deleteProductSet,
  } = useApp();
  const canManage = ["admin", "editor", "reviewer"].includes(currentUser.role);
  const [query, setQuery] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [category, setCategory] = useState("all");
  const [decision, setDecision] = useState("all");
  const [supplier, setSupplier] = useState("all");
  const [tag, setTag] = useState("all");
  const [setId, setSetId] = useState("all");
  const [selected, setSelected] = useState(new Set<string>());
  const [opened, setOpened] = useState<CuratedProduct | null>(null);
  const [taxOpen, setTaxOpen] = useState(false);
  const [setDraft, setSetDraft] = useState<ProductSet | null>(null);
  const [bulkDecision, setBulkDecision] =
    useState<CuratedProduct["decision"]>("keep");
  const [bulkTag, setBulkTag] = useState("");
  const [targetSet, setTargetSet] = useState("");
  const activeSet = productSets.find((item) => item.id === setId);
  const selectedIds = [...selected].filter((id) =>
    products.some((item) => item.id === id),
  );
  const filtered = useMemo(() => {
    const list = products.filter((item) => {
      const terms =
        `${item.title} ${item.supplierName} ${item.sourceMemo} ${item.memo}`.toLocaleLowerCase();
      return (
        (!query || terms.includes(query.toLocaleLowerCase())) &&
        (category === "all" || item.categoryId === category) &&
        (decision === "all" || item.decision === decision) &&
        (supplier === "all" || item.supplierId === supplier) &&
        (tag === "all" || item.tagIds.includes(tag)) &&
        (!activeSet || activeSet.productIds.includes(item.id))
      );
    });
    if (activeSet)
      list.sort(
        (a, b) =>
          activeSet.productIds.indexOf(a.id) -
          activeSet.productIds.indexOf(b.id),
      );
    return list;
  }, [products, query, category, decision, supplier, tag, activeSet]);
  const supplierOptions = [
    ...new Map(
      products.map((item) => [item.supplierId, item.supplierName]),
    ).entries(),
  ];
  const toggle = (id: string) =>
    setSelected((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  const move = async (id: string, delta: number) => {
    if (!activeSet) return;
    const ids = [...activeSet.productIds],
      index = ids.indexOf(id),
      next = index + delta;
    if (next < 0 || next >= ids.length) return;
    [ids[index], ids[next]] = [ids[next], ids[index]];
    await saveProductSet({ ...activeSet, productIds: ids });
  };
  const addToSet = async () => {
    const destination = productSets.find((item) => item.id === targetSet);
    if (
      destination &&
      (await saveProductSet({
        ...destination,
        productIds: [...new Set([...destination.productIds, ...selectedIds])],
      }))
    ) {
      setSetId(destination.id);
      setSelected(new Set());
    }
  };
  const clearFilters = () => {
    setQuery("");
    setCategory("all");
    setDecision("all");
    setSupplier("all");
    setTag("all");
  };
  return (
    <div
      className="mx-auto max-w-6xl space-y-3.5 px-3 py-3 sm:px-4 animate-in fade-in"
      data-testid="product-workspace"
    >
      <div className="bg-white px-3.5 py-2.5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200/60 flex items-center justify-center shrink-0">
            <i aria-hidden="true" className="fa-solid fa-boxes-stacked text-xs" />
          </span>
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <h1 className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight">รายการสินค้า</h1>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
              {products.length} ชิ้น
            </span>
          </div>
        </div>
        {canManage && (
          <button className={button} onClick={() => setTaxOpen(true)}>
            <SlidersHorizontal size={14} />
            หมวดหมู่และแท็ก
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {Object.entries(decisions).map(([key, label]) => (
          <button
            key={key}
            aria-pressed={decision === key}
            onClick={() => setDecision(decision === key ? "all" : key)}
            className={`rounded-2xl border p-3 text-left transition-all shadow-2xs ${decision === key ? "border-emerald-500 ring-1 ring-emerald-500 bg-white" : "border-slate-200/80 bg-white hover:border-slate-300"}`}
          >
            <span
              className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-bold ${statusStyle[key as keyof typeof decisions]}`}
            >
              {label}
            </span>
            <strong className="mt-1.5 block text-xl font-extrabold font-mono text-slate-950">
              {products.filter((item) => item.decision === key).length}
            </strong>
          </button>
        ))}
      </div>
      <div
        className="flex flex-wrap items-center gap-2"
        aria-label="ชุดเปรียบเทียบสินค้า"
      >
        <button
          className={`${button} ${setId === "all" ? "!bg-slate-900 !text-white" : ""}`}
          onClick={() => setSetId("all")}
        >
          <Layers size={16} />
          สินค้าทั้งหมด ({products.length})
        </button>
        {productSets.map((set) => (
          <button
            key={set.id}
            className={`${button} ${setId === set.id ? "!border-emerald-600 !bg-emerald-50 !text-emerald-800" : ""}`}
            onClick={() => {
              setSetId(set.id);
              clearFilters();
            }}
          >
            {set.name}{" "}
            <span className="text-xs opacity-60">{set.productIds.length}</span>
          </button>
        ))}
        {canManage && (
          <button
            className={button}
            onClick={() =>
              setSetDraft({
                id: crypto.randomUUID(),
                name: "",
                memo: "",
                productIds: selectedIds,
              })
            }
          >
            <Plus size={16} />
            สร้างชุด{selectedIds.length ? ` (${selectedIds.length} ชิ้น)` : ""}
          </button>
        )}
      </div>
      {activeSet && (
        <div className="flex flex-wrap items-start justify-between gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4">
          <div>
            <h2 className="font-bold text-emerald-950">{activeSet.name}</h2>
            <p className="mt-1 whitespace-pre-wrap text-sm text-emerald-800">
              {activeSet.memo || "ยังไม่มีหมายเหตุของชุดนี้"}
            </p>
            <p className="mt-2 text-xs text-emerald-700">
              เรียงรายการด้วยปุ่มขึ้น–ลง
              เพื่อวางตัวเลือกที่ต้องการเปรียบเทียบไว้ใกล้กัน
            </p>
          </div>
          {canManage && (
            <div className="flex gap-2">
              <button
                className={button}
                onClick={() => setSetDraft({ ...activeSet })}
              >
                แก้ไขชุด
              </button>
              <button
                className={button}
                disabled={isMutating}
                onClick={async () => {
                  if (
                    confirm("ลบชุดนี้? สินค้าต้นฉบับยังคงอยู่") &&
                    (await deleteProductSet(activeSet))
                  )
                    setSetId("all");
                }}
              >
                ลบชุด
              </button>
            </div>
          )}
        </div>
      )}
      <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
        <div className="relative">
          <Search
            size={17}
            className="absolute left-3 top-3.5 text-slate-400"
          />
          <input
            aria-label="ค้นหาสินค้า"
            placeholder="ค้นหาสินค้า ซัพพลายเออร์ หรือหมายเหตุ…"
            className={`${input} pl-10`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="flex min-h-10 items-center gap-2 text-sm font-semibold text-slate-600 sm:hidden"
          aria-expanded={filtersOpen}
          onClick={() => setFiltersOpen(!filtersOpen)}
        >
          <SlidersHorizontal size={16} />
          ตัวกรอง
        </button>
        <div
          className={`${filtersOpen ? "grid" : "hidden"} grid-cols-1 gap-2 sm:grid sm:grid-cols-3`}
        >
          <select
            aria-label="หมวดสินค้า"
            className={input}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">ทุกหมวดสินค้า</option>
            <option value="">ยังไม่จัดหมวด</option>
            {productCategories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <select
            aria-label="ซัพพลายเออร์สินค้า"
            className={input}
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
          >
            <option value="all">ทุกซัพพลายเออร์</option>
            {supplierOptions.map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
          <select
            aria-label="แท็กสินค้า"
            className={input}
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          >
            <option value="all">ทุกแท็ก</option>
            {productTags.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
          <span>
            แสดง {filtered.length} รายการ ·
            สินค้าแยกจากแคตตาล็อกซัพพลายเออร์โดยอัตโนมัติ
          </span>
          <button className="min-h-10 font-semibold" onClick={clearFilters}>
            ล้างตัวกรอง
          </button>
        </div>
      </div>
      {canManage && (
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <label className="flex min-h-11 items-center gap-2">
            <input
              type="checkbox"
              checked={
                !!filtered.length &&
                filtered.every((item) => selected.has(item.id))
              }
              onChange={(e) =>
                setSelected(
                  e.target.checked
                    ? new Set([...selected, ...filtered.map((item) => item.id)])
                    : new Set(
                        [...selected].filter(
                          (id) => !filtered.some((item) => item.id === id),
                        ),
                      ),
                )
              }
            />
            เลือกทั้งหมดที่เห็น
          </label>
          <span className="text-slate-500">
            เลือก {selectedIds.length} ชิ้น
          </span>
          {selectedIds.length > 0 && (
            <button
              className="min-h-11 font-semibold text-slate-500"
              onClick={() => setSelected(new Set())}
            >
              ยกเลิกการเลือก
            </button>
          )}
        </div>
      )}
      {canManage && selectedIds.length > 0 && (
        <fieldset
          disabled={isMutating}
          className="grid gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 md:grid-cols-3"
        >
          <div className="flex gap-2">
            <select
              aria-label="สถานะสินค้าที่เลือก"
              className={input}
              value={bulkDecision}
              onChange={(e) =>
                setBulkDecision(e.target.value as CuratedProduct["decision"])
              }
            >
              {Object.entries(decisions).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <button
              className={button}
              onClick={() =>
                void updateProducts(selectedIds, { decision: bulkDecision })
              }
            >
              ใช้สถานะ
            </button>
          </div>
          <div className="flex gap-2">
            <select
              aria-label="เพิ่มแท็กให้สินค้าที่เลือก"
              className={input}
              value={bulkTag}
              onChange={(e) => setBulkTag(e.target.value)}
            >
              <option value="">เลือกแท็ก</option>
              {productTags.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <button
              disabled={!bulkTag}
              className={button}
              onClick={() => void updateProducts(selectedIds, {}, [bulkTag])}
            >
              ติดแท็ก
            </button>
          </div>
          <div className="flex gap-2">
            <select
              aria-label="ชุดสำหรับสินค้าที่เลือก"
              className={input}
              value={targetSet}
              onChange={(e) => setTargetSet(e.target.value)}
            >
              <option value="">เลือกชุด</option>
              {productSets.map((set) => (
                <option key={set.id} value={set.id}>
                  {set.name}
                </option>
              ))}
            </select>
            <button
              disabled={!targetSet}
              className={button}
              onClick={() => void addToSet()}
            >
              เพิ่มเข้าชุด
            </button>
          </div>
        </fieldset>
      )}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center">
          <Package className="mx-auto mb-3 text-slate-400" size={32} />
          <h2 className="font-semibold">ยังไม่มีสินค้าที่ตรงกับมุมมองนี้</h2>
          <p className="mt-2 text-sm text-slate-500">
            เพิ่มสินค้ารายชิ้นในแคตตาล็อกซัพพลายเออร์
            หรือเปลี่ยนตัวกรองเพื่อเริ่มจัดกลุ่ม
          </p>
        </div>
      ) : (
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((product) => (
            <article
              key={product.id}
              className={`group flex flex-col justify-between overflow-hidden rounded-2xl border bg-white p-2.5 shadow-2xs transition-all hover:shadow-sm ${selected.has(product.id) ? "border-emerald-500 ring-1 ring-emerald-500" : "border-slate-200/90 hover:border-slate-300"}`}
            >
              <div>
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-100 border border-slate-200/60">
                  <button
                    className="block h-full w-full text-left"
                    onClick={() => setOpened(product)}
                  >
                    <img
                      src={product.photo || "./logo.jpg"}
                      alt={product.title}
                      loading="lazy"
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </button>
                  {canManage && (
                    <label className="absolute left-2 top-2 grid h-7 w-7 place-items-center rounded-lg border border-slate-200/90 bg-white/95 shadow-2xs cursor-pointer">
                      <input
                        aria-label={`เลือก ${product.title}`}
                        type="checkbox"
                        checked={selected.has(product.id)}
                        onChange={() => toggle(product.id)}
                        className="accent-emerald-600"
                      />
                    </label>
                  )}
                  <span
                    className={`absolute right-2 top-2 rounded-md px-2 py-0.5 text-[10px] font-bold shadow-2xs ${statusStyle[product.decision]}`}
                  >
                    {decisions[product.decision]}
                  </span>
                </div>

                <div className="mt-2.5 space-y-1.5 px-0.5">
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-[10px] font-semibold text-slate-400 truncate">
                      {product.supplierName}
                    </p>
                    <p className="font-mono text-xs font-extrabold text-emerald-700 shrink-0">
                      {product.priceThb != null
                        ? `฿${Number(product.priceThb).toLocaleString()}`
                        : product.priceRmb != null
                          ? `¥${Number(product.priceRmb).toLocaleString()}`
                          : "รอราคา"}
                    </p>
                  </div>

                  <button
                    className="block w-full text-left text-xs sm:text-sm font-extrabold text-slate-900 line-clamp-1 hover:text-emerald-700 transition-colors"
                    onClick={() => setOpened(product)}
                  >
                    {product.title}
                  </button>

                  <div className="flex flex-wrap gap-1 text-[10px]">
                    <span className="rounded-md bg-slate-100 px-1.5 py-0.5 font-semibold text-slate-600 truncate max-w-full">
                      {productCategories.find(
                        (item) => item.id === product.categoryId,
                      )?.name || "ยังไม่จัดหมวด"}
                    </span>
                    {product.tagIds.map((id) => (
                      <span
                        key={id}
                        className="rounded-md bg-emerald-50 px-1.5 py-0.5 font-semibold text-emerald-800 border border-emerald-200/60"
                      >
                        {productTags.find((item) => item.id === id)?.name}
                      </span>
                    ))}
                  </div>

                  <p className="line-clamp-2 text-[11px] text-slate-500 leading-snug">
                    {product.memo ||
                      product.sourceMemo ||
                      "แตะเพื่อดูสเปกและเพิ่มหมายเหตุ"}
                  </p>
                </div>
              </div>

              <div className="mt-2.5 flex items-center justify-between gap-1.5 border-t border-slate-100 pt-2">
                <button
                  className="flex-1 py-1.5 px-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold transition-colors text-center"
                  onClick={() => setOpened(product)}
                >
                  เปิดรายละเอียด
                </button>
                {activeSet && canManage && (
                  <div className="flex gap-0.5 shrink-0">
                    <button
                      aria-label={`เลื่อน ${product.title} ขึ้น`}
                      disabled={
                        isMutating ||
                        activeSet.productIds.indexOf(product.id) === 0
                      }
                      className="rounded-lg p-1.5 hover:bg-slate-100 disabled:opacity-30"
                      onClick={() => void move(product.id, -1)}
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button
                      aria-label={`เลื่อน ${product.title} ลง`}
                      disabled={
                        isMutating ||
                        activeSet.productIds.indexOf(product.id) ===
                          activeSet.productIds.length - 1
                      }
                      className="rounded-lg p-1.5 hover:bg-slate-100 disabled:opacity-30"
                      onClick={() => void move(product.id, 1)}
                    >
                      <ArrowDown size={14} />
                    </button>
                    <button
                      title="นำออกจากชุด"
                      disabled={isMutating}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                      onClick={() =>
                        void saveProductSet({
                          ...activeSet,
                          productIds: activeSet.productIds.filter(
                            (id) => id !== product.id,
                          ),
                        })
                      }
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
      {opened && (
        <ProductEditor
          product={opened}
          canManage={canManage}
          onClose={() => setOpened(null)}
          onOpenSupplier={() => {
            onOpenSupplier(opened.supplierId);
            setOpened(null);
          }}
        />
      )}
      {taxOpen && <TaxonomyEditor onClose={() => setTaxOpen(false)} />}
      {setDraft && (
        <SetEditor
          initial={setDraft}
          onClose={() => setSetDraft(null)}
          onSaved={(id) => {
            setSetId(id);
            setSelected(new Set());
            clearFilters();
          }}
        />
      )}
    </div>
  );
}

function ProductEditor({
  product,
  canManage,
  onClose,
  onOpenSupplier,
}: {
  product: CuratedProduct;
  canManage: boolean;
  onClose: () => void;
  onOpenSupplier: () => void;
}) {
  const { productCategories, productTags, saveProduct, isMutating, currentUser, broadcastNotification } = useApp();
  const [draft, setDraft] = useState<ProductChanges>({
    title: product.title,
    memo: product.memo,
    decision: product.decision,
    categoryId: product.categoryId,
    tagIds: [...product.tagIds],
  });
  const [newCommentText, setNewCommentText] = useState("");
  const [isEditingRawMemo, setIsEditingRawMemo] = useState(false);
  const dialog = useDialog(true);

  const memoComments = useMemo(() => {
    const raw = (draft.memo || "").trim();
    if (!raw) return [];
    const regex = /\[([^•]+)•([^\]]+)\]:\s*([\s\S]*?)(?=\n\s*\[[^•]+•[^\]]+\]:|$)/g;
    const items: Array<{ author: string; time: string; text: string }> = [];
    let match;
    while ((match = regex.exec(raw)) !== null) {
      items.push({
        author: match[1].trim(),
        time: match[2].trim(),
        text: match[3].trim(),
      });
    }
    if (items.length === 0 && raw) {
      return [{ author: "บันทึกของทีม", time: "บันทึกเริ่มต้น", text: raw }];
    }
    return items;
  }, [draft.memo]);

  const handleSendComment = async () => {
    if (!newCommentText.trim()) return;
    const author = currentUser.alias || currentUser.name || "ทีมงาน";
    const timeStr = new Date().toLocaleString("th-TH", {
      dateStyle: "short",
      timeStyle: "short",
    });
    const entry = `[${author} • ${timeStr}]: ${newCommentText.trim()}`;
    const updated = (draft.memo ? `${draft.memo.trim()}\n\n${entry}` : entry).trim();
    setDraft((prev) => ({ ...prev, memo: updated }));
    setNewCommentText("");
    await saveProduct(product, { ...draft, memo: updated });
    await broadcastNotification(
      `อัปเดตความเห็นสินค้า: ${product.title || product.sourceName}`,
      `${author}: ${newCommentText.trim()}`,
      "supplier",
      product.supplierId,
      currentUser.avatar,
      false,
      { localOnly: true }
    );
  };
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/45 p-3 backdrop-blur-sm">
      <div
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-label="รายละเอียดสินค้า"
        className="flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b p-4">
          <div>
            <h2 className="font-bold">รายละเอียดสินค้า</h2>
            <p className="text-xs text-slate-500">{product.supplierName}</p>
          </div>
          <button
            className="p-3"
            aria-label="ปิดรายละเอียดสินค้า"
            disabled={isMutating}
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
        <form
          className="overflow-y-auto p-4"
          onSubmit={async (e) => {
            e.preventDefault();
            if (await saveProduct(product, draft)) onClose();
          }}
        >
          <fieldset disabled={!canManage || isMutating} className="space-y-4">
            <img
              src={product.photo || "./logo.jpg"}
              alt={product.title}
              className="max-h-64 w-full rounded-xl bg-slate-50 object-contain"
            />
            <label className="block space-y-1 text-sm font-semibold">
              ชื่อสินค้า
              <input
                required
                className={input}
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="space-y-1 text-sm">
                สถานะคัดเลือก
                <select
                  aria-label="สถานะคัดเลือก"
                  className={input}
                  value={draft.decision}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      decision: e.target.value as CuratedProduct["decision"],
                    })
                  }
                >
                  {Object.entries(decisions).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="space-y-1 text-sm">
                หมวดสินค้า
                <select
                  aria-label="หมวดสินค้า"
                  className={input}
                  value={draft.categoryId}
                  onChange={(e) =>
                    setDraft({ ...draft, categoryId: e.target.value })
                  }
                >
                  <option value="">ยังไม่จัดหมวด</option>
                  {productCategories.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold">แท็ก</p>
              <div className="flex flex-wrap gap-2">
                {productTags.map((tag) => (
                  <label
                    key={tag.id}
                    className="flex min-h-10 items-center gap-2 rounded-lg border border-slate-200 px-3 text-xs"
                  >
                    <input
                      type="checkbox"
                      checked={draft.tagIds?.includes(tag.id)}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          tagIds: e.target.checked
                            ? [...(draft.tagIds || []), tag.id]
                            : draft.tagIds?.filter((id) => id !== tag.id),
                        })
                      }
                    />
                    {tag.name}
                  </label>
                ))}
                {!productTags.length && (
                  <span className="text-xs text-slate-500">
                    สร้างแท็กได้จากปุ่มหมวดหมู่และแท็ก
                  </span>
                )}
              </div>
            </div>
            {/* เมมโม / การสนทนาถามตอบและหมายเหตุของทีม */}
            <div className="space-y-2 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <MessageSquare size={14} className="text-emerald-600" />
                  <span>ประวัติการติดต่อ & ความเห็นทีมงาน ({memoComments.length})</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsEditingRawMemo((prev) => !prev)}
                  className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 underline"
                >
                  {isEditingRawMemo ? 'ดูมุมมองไทม์ไลน์' : '✏️ แก้ไขข้อความดิบ'}
                </button>
              </div>

              {isEditingRawMemo ? (
                <label className="block space-y-1 text-sm font-semibold">
                  เมมโม / หมายเหตุของทีม
                  <textarea
                    aria-label="เมมโม / หมายเหตุของทีม"
                    className={`${input} min-h-28`}
                    value={draft.memo}
                    onChange={(e) => setDraft({ ...draft, memo: e.target.value })}
                    placeholder="ผลเทียบสเปก สิ่งที่ใช้ได้ หรือเรื่องที่ต้องถามเพิ่ม…"
                  />
                </label>
              ) : (
                <div className="space-y-2">
                  {/* Comments Timeline */}
                  {memoComments.length > 0 ? (
                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                      {memoComments.map((c, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-white border border-slate-200/70 shadow-2xs space-y-1">
                          <div className="flex items-center justify-between text-[11px]">
                            <div className="flex items-center gap-1.5 font-bold text-slate-800">
                              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] flex items-center justify-center font-bold">
                                {c.author.slice(0, 1)}
                              </span>
                              <span>{c.author}</span>
                            </div>
                            <span className="text-[10px] text-slate-400 font-mono">{c.time}</span>
                          </div>
                          <p className="text-xs text-slate-700 whitespace-pre-wrap pl-6 leading-relaxed">
                            {c.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-white border border-dashed border-slate-200 text-center text-xs text-slate-400">
                      ยังไม่มีการพูดคุยหรือบันทึกหมายเหตุในสินค้านี้ เริ่มพิมพ์ถาม-ตอบด้านล่างได้เลย
                    </div>
                  )}

                  {/* Add New Comment / Memo Input */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600 block">
                      เมมโม / หมายเหตุของทีม
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        aria-label="เมมโม / หมายเหตุของทีม"
                        placeholder="พิมพ์ความเห็น / อัปเดตสเปกสินค้า..."
                        value={newCommentText}
                        onChange={(e) => {
                          setNewCommentText(e.target.value);
                          setDraft((prev) => ({
                            ...prev,
                            memo: prev.memo ? `${prev.memo}\n${e.target.value}` : e.target.value,
                          }));
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSendComment();
                          }
                        }}
                        className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                      />
                      <button
                        type="button"
                        disabled={!newCommentText.trim() || isMutating}
                        onClick={handleSendComment}
                        className="inline-flex items-center gap-1 rounded-xl bg-emerald-700 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-800 disabled:opacity-40 transition-colors shadow-2xs shrink-0"
                      >
                        <Send size={13} />
                        <span>ส่ง</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {canManage && (
              <button
                disabled={isMutating}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-emerald-700 px-5 font-semibold text-white"
                type="submit"
              >
                <Check size={17} />
                บันทึกรายละเอียด
              </button>
            )}
          </fieldset>
          <div className="mt-5 space-y-3 border-t pt-4">
            <p className="text-sm text-slate-600">
              สเปกต้นฉบับ: {product.dimensions || "ไม่ระบุขนาด"}
              {product.weightKg ? ` · ${product.weightKg} kg` : ""}
            </p>
            <p className="whitespace-pre-wrap text-sm text-slate-500">
              {product.sourceMemo}
            </p>
            {product.voiceNotes.map((note) => (
              <div key={note.id}>
                <p className="text-xs text-slate-500">
                  {note.label || "เสียงของสินค้านี้"}
                </p>
                <audio
                  controls
                  preload="none"
                  src={note.url}
                  className="mt-1 w-full"
                />
              </div>
            ))}
            {product.supplierVideos.length > 0 && (
              <p className="text-xs text-slate-500">
                วิดีโอจากซัพพลายเออร์ต้นทาง
              </p>
            )}
            {product.supplierVideos.map((url) => (
              <VideoPlayer key={url} src={url} />
            ))}
            <button type="button" className={button} onClick={onOpenSupplier}>
              <ExternalLink size={16} />
              เปิดซัพพลายเออร์ต้นทาง
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function TaxonomyEditor({ onClose }: { onClose: () => void }) {
  const { productCategories, productTags, manageProductTaxonomy, isMutating } =
    useApp();
  const [kind, setKind] = useState<"categories" | "tags">("categories");
  const [name, setName] = useState("");
  const [editing, setEditing] = useState("");
  const dialog = useDialog(true);
  const items = kind === "categories" ? productCategories : productTags;
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/45 p-3">
      <div
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-label="หมวดหมู่และแท็กสินค้า"
        className="max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-5 shadow-xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-bold">หมวดหมู่และแท็กสินค้า</h2>
          <button aria-label="ปิดจัดการแท็ก" className="p-2" onClick={onClose}>
            <X />
          </button>
        </div>
        <div className="mb-4 flex gap-2">
          {(["categories", "tags"] as const).map((value) => (
            <button
              className={`${button} ${kind === value ? "!bg-slate-900 !text-white" : ""}`}
              key={value}
              onClick={() => {
                setKind(value);
                setName("");
                setEditing("");
              }}
            >
              {value === "categories" ? "หมวดสินค้า" : "ป้ายแท็ก"}
            </button>
          ))}
        </div>
        <form
          className="flex gap-2"
          onSubmit={async (e) => {
            e.preventDefault();
            if (
              await manageProductTaxonomy(
                kind,
                editing ? "rename" : "add",
                editing,
                name,
              )
            ) {
              setName("");
              setEditing("");
            }
          }}
        >
          <input
            aria-label="ชื่อหมวดหรือแท็ก"
            required
            className={input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ชื่อหมวดหรือแท็กใหม่"
          />
          <button disabled={isMutating} className={button}>
            {editing ? "บันทึก" : "เพิ่ม"}
          </button>
        </form>
        <div className="mt-4 space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-2 rounded-xl bg-slate-50 p-3"
            >
              <span className="text-sm">{item.name}</span>
              <div className="flex gap-2">
                <button
                  className="min-h-10 text-xs font-semibold"
                  onClick={() => {
                    setEditing(item.id);
                    setName(item.name);
                  }}
                >
                  เปลี่ยนชื่อ
                </button>
                <button
                  disabled={isMutating}
                  className="min-h-10 text-xs text-rose-600"
                  onClick={() => {
                    if (confirm("ลบหมวดหรือแท็กนี้ออกจากสินค้าทั้งหมด?"))
                      void manageProductTaxonomy(kind, "delete", item.id);
                  }}
                >
                  ลบ
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SetEditor({
  initial,
  onClose,
  onSaved,
}: {
  initial: ProductSet;
  onClose: () => void;
  onSaved: (id: string) => void;
}) {
  const { saveProductSet, isMutating } = useApp();
  const [draft, setDraft] = useState(initial);
  const dialog = useDialog(true);
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/45 p-3">
      <form
        ref={undefined}
        role="dialog"
        aria-modal="true"
        aria-label="ชุดเปรียบเทียบสินค้า"
        className="w-full max-w-lg rounded-3xl bg-white p-5 shadow-xl"
        onSubmit={async (e) => {
          e.preventDefault();
          if (await saveProductSet(draft)) {
            onSaved(draft.id);
            onClose();
          }
        }}
      >
        <div ref={dialog}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold">
              {initial.revision ? "แก้ไขชุดเปรียบเทียบ" : "สร้างชุดเปรียบเทียบ"}
            </h2>
            <button
              type="button"
              className="p-2"
              aria-label="ปิดชุดสินค้า"
              onClick={onClose}
            >
              <X />
            </button>
          </div>
          <label className="block space-y-1 text-sm">
            ชื่อชุด
            <input
              required
              className={input}
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              placeholder="เช่น เครื่องซีลแก้วสำหรับสาขาใหม่"
            />
          </label>
          <label className="mt-4 block space-y-1 text-sm">
            หมายเหตุชุด
            <textarea
              className={`${input} min-h-24`}
              value={draft.memo}
              onChange={(e) => setDraft({ ...draft, memo: e.target.value })}
              placeholder="เกณฑ์เปรียบเทียบ งบประมาณ หรือสิ่งที่ต้องตัดสินใจ"
            />
          </label>
          <p className="my-4 text-xs text-slate-500">
            มีสินค้า {draft.productIds.length} รายการ ·
            เพิ่มหรือนำออกจากชุดได้ภายหลัง
          </p>
          <button
            disabled={isMutating}
            className="min-h-11 rounded-xl bg-emerald-700 px-5 font-semibold text-white"
          >
            บันทึกชุดสินค้า
          </button>
        </div>
      </form>
    </div>
  );
}
