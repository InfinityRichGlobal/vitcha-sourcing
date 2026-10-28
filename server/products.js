import { createHash, randomUUID } from "node:crypto";

const now = () => new Date().toISOString();
const clean = (value) => (typeof value === "string" ? value.trim() : "");
const stages = ["pending", "keep", "hold", "reject"];
const fail = (status, message) => {
  throw Object.assign(new Error(message), { status });
};
const version = (record) => record?.revision || 0;
const expectVersion = (record, expected) => {
  if (!Number.isInteger(expected) || version(record) !== expected)
    fail(409, "รายการถูกปรับปรุงแล้ว กรุณาโหลดข้อมูลล่าสุดก่อนบันทึก");
};
const workspace = (db) => ({
  entries: {},
  categories: [],
  tags: [],
  sets: [],
  taxonomyRevision: 0,
  ...db.productWorkspace,
});
const productId = (supplierId, itemId) =>
  `product-${createHash("sha256").update(`${supplierId}\0${itemId}`).digest("hex").slice(0, 24)}`;

export function productData(db) {
  const ws = workspace(db);
  const products = (db.suppliers || []).flatMap((supplier) =>
    (supplier.catalogItems || [])
      .filter((item) => item && typeof item === "object")
      .map((item, index) => {
        const id = productId(supplier.id, item.id || `index-${index}`);
        const entry = ws.entries[id] || {};
        return {
          id,
          supplierId: supplier.id,
          supplierName: supplier.name,
          country: supplier.country || "CN",
          sourceItemId: item.id,
          sourceName: item.name || "สินค้ายังไม่ระบุชื่อ",
          photo: item.photo || "",
          dimensions: item.dimensions || "",
          weightKg: item.weightKg || "",
          priceRmb: item.priceRmb,
          priceThb: item.priceThb,
          sourceMemo: item.memo || "",
          voiceNotes:
            item.voiceNotes ||
            (item.voiceNoteUrl
              ? [
                  {
                    id: "legacy",
                    url: item.voiceNoteUrl,
                    durationSec: item.voiceDurationSec || 0,
                  },
                ]
              : []),
          supplierVideos: supplier.videos || [],
          title: entry.title || item.name || "สินค้ายังไม่ระบุชื่อ",
          memo: entry.memo || "",
          categoryId: entry.categoryId || "",
          tagIds: entry.tagIds || [],
          decision: entry.decision || "pending",
          revision: version(entry),
          updatedAt: entry.updatedAt || supplier.updatedAt,
        };
      }),
  );
  const ids = new Set(products.map((item) => item.id));
  return {
    products,
    productCategories: ws.categories,
    productTags: ws.tags,
    productSets: ws.sets.map((set) => ({
      ...set,
      productIds: set.productIds.filter((id) => ids.has(id)),
    })),
    productTaxonomyRevision: ws.taxonomyRevision,
  };
}

export function registerProductRoutes(app, { read, save, requireWriter }) {
  const findProduct = (db, id) => {
    const product = productData(db).products.find((item) => item.id === id);
    if (!product) fail(404, "ไม่พบสินค้าในแคตตาล็อก");
    return product;
  };
  function patchEntry(ws, id, changes, actor, addTagIds = []) {
    const entry = ws.entries[id] || {};
    const patch = {};
    for (const key of ["title", "memo", "categoryId", "decision"])
      if (changes[key] !== undefined) {
        if (
          typeof changes[key] !== "string" ||
          changes[key].length > (key === "memo" ? 20000 : 250)
        )
          fail(400, "รายละเอียดสินค้าไม่ถูกต้อง");
        patch[key] = changes[key].trim();
      }
    if (patch.decision !== undefined && !stages.includes(patch.decision))
      fail(400, "สถานะสินค้าไม่ถูกต้อง");
    if (
      patch.categoryId &&
      !ws.categories.some((item) => item.id === patch.categoryId)
    )
      fail(400, "ไม่พบหมวดสินค้า");
    if (!Array.isArray(addTagIds) || addTagIds.length > 100)
      fail(400, "ป้ายกำกับไม่ถูกต้อง");
    if (changes.tagIds !== undefined && !Array.isArray(changes.tagIds))
      fail(400, "ป้ายกำกับไม่ถูกต้อง");
    const tags = [
      ...new Set([...(changes.tagIds ?? entry.tagIds ?? []), ...addTagIds]),
    ];
    if (
      tags.length > 100 ||
      tags.some((id) => !ws.tags.some((tag) => tag.id === id))
    )
      fail(400, "ป้ายกำกับไม่ถูกต้อง");
    ws.entries[id] = {
      ...entry,
      ...patch,
      tagIds: tags,
      revision: version(entry) + 1,
      updatedAt: now(),
      updatedBy: actor.id,
    };
  }
  app.patch("/api/products/:id", (req, res) => {
    requireWriter(req);
    const db = read();
    const product = findProduct(db, req.params.id);
    expectVersion(product, req.body.revision);
    const ws = workspace(db);
    patchEntry(ws, product.id, req.body.changes || {}, req.user);
    db.productWorkspace = ws;
    save(db);
    res.json({ success: true });
  });
  app.post("/api/products/batch", (req, res) => {
    requireWriter(req);
    const db = read();
    const { items, changes = {}, addTagIds = [] } = req.body;
    if (
      !Array.isArray(items) ||
      !items.length ||
      items.length > 500 ||
      new Set(items.map((item) => item.id)).size !== items.length
    )
      fail(400, "กรุณาเลือกสินค้า 1–500 รายการโดยไม่ซ้ำกัน");
    // Validate all revisions before changing any entry: batches are all-or-nothing.
    for (const item of items)
      expectVersion(findProduct(db, item.id), item.revision);
    const ws = workspace(db);
    for (const item of items)
      patchEntry(ws, item.id, changes, req.user, addTagIds);
    db.productWorkspace = ws;
    save(db);
    res.json({ success: true });
  });
  app.post("/api/product-taxonomy", (req, res) => {
    requireWriter(req);
    const db = read();
    const ws = workspace(db);
    const { kind, action, id, revision, name } = req.body;
    if (!["categories", "tags"].includes(kind)) fail(400, "ประเภทไม่ถูกต้อง");
    expectVersion({ revision: ws.taxonomyRevision }, revision);
    const list = ws[kind];
    const target = list.find((item) => item.id === id);
    if (action !== "delete" && (!clean(name) || clean(name).length > 120))
      fail(400, "กรุณาระบุชื่อไม่เกิน 120 ตัวอักษร");
    if (
      action !== "delete" &&
      list.some(
        (item) =>
          item.id !== id &&
          item.name.toLocaleLowerCase() === clean(name).toLocaleLowerCase(),
      )
    )
      fail(409, "มีชื่อนี้อยู่แล้ว");
    if (action === "add") list.push({ id: randomUUID(), name: clean(name) });
    else if (action === "rename") {
      if (!target) fail(404, "ไม่พบรายการ");
      target.name = clean(name);
    } else if (action === "delete") {
      if (!target) fail(404, "ไม่พบรายการ");
      ws[kind] = list.filter((item) => item.id !== id);
      for (const entry of Object.values(ws.entries)) {
        if (kind === "categories" && entry.categoryId === id) {
          entry.categoryId = "";
          entry.revision = version(entry) + 1;
        }
        if (kind === "tags" && entry.tagIds?.includes(id)) {
          entry.tagIds = entry.tagIds.filter((tag) => tag !== id);
          entry.revision = version(entry) + 1;
        }
      }
    } else fail(400, "คำสั่งไม่ถูกต้อง");
    ws.taxonomyRevision++;
    db.productWorkspace = ws;
    save(db);
    res.json({ success: true });
  });
  app.post("/api/product-sets", (req, res) => {
    requireWriter(req);
    const db = read();
    const ws = workspace(db);
    const input = req.body;
    const target = ws.sets.find((set) => set.id === input.id);
    if (
      !clean(input.id) ||
      !clean(input.name) ||
      clean(input.name).length > 120 ||
      typeof input.memo !== "string" ||
      input.memo.length > 20000
    )
      fail(400, "ชื่อหรือหมายเหตุชุดสินค้าไม่ถูกต้อง");
    if (target) expectVersion(target, input.revision);
    else if (input.revision !== undefined) fail(404, "ชุดนี้ถูกลบแล้ว");
    const valid = new Set(productData(db).products.map((item) => item.id));
    if (
      !Array.isArray(input.productIds) ||
      input.productIds.length > 500 ||
      input.productIds.some((id) => !valid.has(id))
    )
      fail(400, "สินค้าในชุดไม่ถูกต้อง");
    const set = {
      id: input.id,
      name: clean(input.name),
      memo: clean(input.memo),
      productIds: [...new Set(input.productIds)],
      revision: version(target) + 1,
      updatedAt: now(),
      updatedBy: req.user.id,
    };
    if (target) ws.sets[ws.sets.indexOf(target)] = set;
    else ws.sets.push(set);
    db.productWorkspace = ws;
    save(db);
    res.json({ success: true, set });
  });
  app.delete("/api/product-sets/:id", (req, res) => {
    requireWriter(req);
    const db = read();
    const ws = workspace(db);
    const target = ws.sets.find((set) => set.id === req.params.id);
    if (!target) fail(404, "ไม่พบชุดสินค้า");
    expectVersion(target, req.body.revision);
    ws.sets = ws.sets.filter((set) => set.id !== target.id);
    db.productWorkspace = ws;
    save(db);
    res.json({ success: true });
  });
}
