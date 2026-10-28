import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Factory, Coffee, ArrowUpRight, Package } from "lucide-react";
import { useApp } from "../context/AppContext";
import { SupplierCard } from "./SupplierCard";
import { StoreInspoCard } from "./StoreInspoCard";
import { SupplierRecord, StoreInspoRecord } from "../types";
const MapView = lazy(() =>
  import("./MapView").then((m) => ({ default: m.MapView })),
);
interface Props {
  onSelectSupplier: (s: SupplierRecord) => void;
  onSelectStore: (s: StoreInspoRecord) => void;
  onOpenNewSupplier: () => void;
  onOpenNewStoreInspo: () => void;
  onShareToLine?: (item: SupplierRecord | StoreInspoRecord) => void;
}
export function DashboardOverview({
  onSelectSupplier,
  onSelectStore,
  onShareToLine,
}: Props) {
  const { suppliers, drinkStores, products, setActiveTab } = useApp();
  const [visible, setVisible] = useState(12);
  const more = useRef<HTMLDivElement>(null);
  const feed = [...suppliers, ...drinkStores].sort(
    (a, b) =>
      new Date(b.updatedAt || b.creator.timestamp).getTime() -
      new Date(a.updatedAt || a.creator.timestamp).getTime(),
  );
  useEffect(() => {
    const node = more.current;
    if (!node || visible >= feed.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setVisible((n) => n + 12);
      },
      { rootMargin: "400px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [visible, feed.length]);
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-3 py-5 sm:px-6 sm:py-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-emerald-700">
            VITCHA FIELD NOTES
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            ทุกการค้นพบของทีม
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            เชื่อมเรื่องราวจากหน้างาน สู่ไอเดียที่ไปต่อด้วยกัน
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {[
          {
            label: "ซัพพลายเออร์",
            count: suppliers.length,
            tab: "suppliers" as const,
            icon: Factory,
          },
          {
            label: "ร้านน้ำ & เรฟ",
            count: drinkStores.length,
            tab: "drink_stores" as const,
            icon: Coffee,
          },
          {
            label: "รายการสินค้า",
            count: products.length,
            tab: "products" as const,
            icon: Package,
          },
        ].map(({ label, count, tab, icon: Icon }) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="rounded-2xl border border-slate-200 bg-white p-3 text-left transition hover:border-emerald-300 sm:p-5"
          >
            <div className="flex items-center justify-between">
              <Icon className="h-4 w-4 text-emerald-700 sm:h-5 sm:w-5" />
              <ArrowUpRight className="h-3.5 w-3.5 text-slate-300" />
            </div>
            <p className="mt-3 text-xl font-bold sm:text-2xl">{count}</p>
            <p className="mt-1 text-[11px] text-slate-500 sm:text-sm">
              {label}
            </p>
          </button>
        ))}
      </div>
      <section
        id="map-section"
        aria-label="แผนที่ของทีม"
        className="scroll-mt-32 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        <div className="px-4 pt-4 sm:px-5">
          <h2 className="font-bold">สำรวจบนแผนที่</h2>
          <p className="mt-1 text-xs text-slate-400">
            เลือกประเทศและประเภทจุดบนแผนที่
          </p>
        </div>
        <Suspense
          fallback={
            <div className="grid h-80 place-items-center text-sm text-slate-400">
              กำลังเปิดแผนที่…
            </div>
          }
        >
          <MapView
            onSelectSupplier={onSelectSupplier}
            onSelectStoreInspo={onSelectStore}
          />
        </Suspense>
      </section>
      <section
        data-testid="team-feed"
        className="mx-auto max-w-3xl space-y-4 pb-6"
      >
        <div className="flex items-baseline justify-between pt-4">
          <div>
            <h2 className="text-xl font-bold">ฟีดของทีม</h2>
            <p className="mt-1 text-xs text-slate-400">
              บันทึกและบทสนทนาล่าสุดจากทุกพื้นที่
            </p>
          </div>
          <span className="text-xs text-slate-400" data-testid="feed-count">
            {feed.length} โพสต์
          </span>
        </div>
        {feed.slice(0, visible).map((item) => (
          <article key={item.id} data-feed-id={item.id}>
            {item.type === "supplier" ? (
              <SupplierCard
                supplier={item as SupplierRecord}
                onSelect={onSelectSupplier}
                onShareToLine={(item) => onShareToLine?.(item)}
              />
            ) : (
              <StoreInspoCard
                store={item as StoreInspoRecord}
                onSelect={onSelectStore}
                onShareToLine={(item) => onShareToLine?.(item)}
              />
            )}
          </article>
        ))}
        {!feed.length && (
          <div className="rounded-2xl border border-dashed bg-white px-4 py-14 text-center text-sm text-slate-400">
            ยังไม่มีบันทึกในฟีด เริ่มเพิ่มรายการแรกของทีมได้เลย
          </div>
        )}
        <div ref={more}>
          {visible < feed.length ? (
            <button
              onClick={() => setVisible((n) => n + 12)}
              className="w-full rounded-xl border bg-white p-3 text-sm font-semibold text-slate-600"
            >
              ดูโพสต์เพิ่มเติม
            </button>
          ) : (
            feed.length > 0 && (
              <p className="py-6 text-center text-xs text-slate-400">
                อ่านครบทุกโพสต์แล้ว
              </p>
            )
          )}
        </div>
      </section>
    </div>
  );
}
