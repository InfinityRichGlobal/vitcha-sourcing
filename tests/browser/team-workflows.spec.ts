import { capture } from './capture';
import { test, expect, Page } from "@playwright/test";
// Avoid this host's unstable Metal screenshot compositor; map coverage uses its own renderer.
test.use({ launchOptions: { args: ['--disable-gpu'] } });
import path from "node:path";
const password = "qa-only-876543";
test.beforeEach(async ({ page }) => {
  await page.route("https://tiles.openfreemap.org/**", (r) =>
    r.fulfill({ status: 503, body: "QA map offline" }),
  );
});
async function login(page: Page, id = "qa-admin") {
  const result = await page.request.post("/api/login", {
    data: { idOrEmail: id, pin: password },
  });
  expect(result.ok()).toBeTruthy();
  const { token } = await result.json();
  await page.addInitScript(
    (t) => sessionStorage.setItem("vitcha_session_token", t),
    token,
  );
  await page.goto("/");
  await expect(page.getByRole("banner")).toBeVisible();
  return token;
}
async function navigateTab(page: Page, name: string) {
  const topNav = page.getByRole("navigation").getByRole("button", { name: new RegExp(name) });
  if (await topNav.isVisible().catch(() => false)) {
    await topNav.click();
    return;
  }
  await page.getByRole("button", { name: /แพลตฟอร์ม/ }).click();
  const drawer = page.locator(".fixed.inset-0");
  await drawer.getByRole("button", { name: new RegExp(name) }).first().click();
}
async function data(page: Page, token: string) {
  return (
    await page.request.get("/api/data", {
      headers: { Authorization: `Bearer ${token}` },
    })
  ).json();
}

test("other admins cannot see private tools, Render settings or private wording; members have their own page", async ({
  page,
}) => {
  await login(page);
  await navigateTab(page, "ตั้งค่าเนื้อหา");
  await expect(
    page.getByRole("heading", { name: "ตั้งค่าเนื้อหา", exact: true }),
  ).toBeVisible();
  await expect(page.locator("main")).not.toContainText(
    /Mockup|รีเซ็ต|Render|ผู้ก่อตั้ง|คุณไอซ์|เจ้าของระบบ|จัดการสิทธิ์สมาชิก/i,
  );
  await navigateTab(page, "สมาชิก");
  await expect(
    page.getByRole("heading", { name: "สมาชิกและคำเชิญ" }),
  ).toBeVisible();
  const iceRow = page.getByTestId("member-row").filter({ hasText: "SuperiCez" });
  await expect(iceRow).toBeVisible();
  await expect(iceRow).toContainText("Admin");
  await expect(iceRow).not.toContainText(/ผู้ก่อตั้ง|เจ้าของระบบ|👑/);
  await expect(iceRow.locator("select")).toHaveCount(0);
  await page.getByLabel("ระดับสมาชิก QA viewer").selectOption("reviewer");
  await expect(page.getByLabel("ระดับสมาชิก QA viewer")).toHaveValue(
    "reviewer",
  );
  await page.getByLabel("ระดับสมาชิก QA viewer").selectOption("viewer");
  await capture(page, {
    path: "test-results/members-desktop.png",
    fullPage: true,
  });
  await page.getByTitle("กดที่โลโก้เพื่อเปิดเมนูเข้าหน้าต่างๆ").click();
  await expect(page.locator("body")).not.toContainText(
    /จำลองข้อมูล|รีเซ็ตระบบ|Dev Mode|ผู้ก่อตั้ง|คุณไอซ์|เจ้าของระบบ/,
  );
});

test("private maintenance controls appear only in the actual primary session", async ({
  page,
}) => {
  await login(page, "ice");
  await navigateTab(page, "ตั้งค่าเนื้อหา");
  await expect(
    page.getByText("เซิร์ฟเวอร์กลางหลัก VITCHA (Render · onrender.com)"),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: /ล้างข้อมูลเป็น 0|ล้างข้อมูลว่างเปล่า/ }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "สำรองข้อมูล (.json)" }),
  ).toBeVisible();
  await expect(page.locator("main")).not.toContainText(
    /ผู้ก่อตั้ง|คุณไอซ์|เจ้าของระบบ/,
  );
});

test("both maintenance menus send confirmation passwords and preserve data on rejection", async ({ page }) => {
  const token = await login(page, "ice");
  const before = await data(page, token);
  await navigateTab(page, "ตั้งค่าเนื้อหา");
  for (const surface of ['settings', 'drawer']) {
    // A rejected password keeps the drawer open so the user can retry.
    if (surface === 'drawer') await page.getByRole('button', { name: /แพลตฟอร์ม/ }).click();
    const container = surface === 'drawer' ? page.locator('.fixed.inset-0') : page.locator('main');
    for (const [name, confirm] of [['ล้างเฉพาะ Mockup', 'CLEAR_MOCKUP'], ['ล้างข้อมูลเป็น 0', 'CLEAR_RECORDS']]) {
      page.once('dialog', dialog => dialog.accept('wrong-confirmation'));
      const responsePromise = page.waitForResponse(response => new URL(response.url()).pathname === '/api/system/clear');
      await container.getByRole('button', { name, exact: true }).click();
      const response = await responsePromise;
      expect(response.request().postDataJSON()).toMatchObject({ confirm, password: 'wrong-confirmation' });
      expect(response.status()).toBe(403);
      await expect(page.getByRole('alert')).toContainText('รหัสผ่านยืนยันการล้างข้อมูลไม่ถูกต้อง');
      await page.getByRole('button', { name: 'ปิดข้อความแจ้งเตือน', exact: true }).click();
      await expect(container).toBeVisible();
      await expect(container.getByRole('button', { name, exact: true })).toBeEnabled();
    }
  }
  const after = await data(page, token);
  for (const collection of ['suppliers', 'drinkStores', 'locations']) expect(after[collection]).toEqual(before[collection]);
});

test('deleted drink stores retain their name and photo, can be searched and restored', async ({ page }) => {
  const token = await login(page, 'ice');
  const headers = { Authorization: `Bearer ${token}` };
  const snapshot = await data(page, token);
  const store = { ...snapshot.drinkStores[0], id: 'qa-trash-store', storeName: 'ร้านทดสอบถังขยะ', revision: undefined };
  delete store.name;
  expect((await page.request.post('/api/drink-stores', { headers, data: store })).ok()).toBeTruthy();
  expect((await page.request.delete(`/api/drink-stores/${store.id}`, { headers, data: { revision: 1 } })).ok()).toBeTruthy();
  await navigateTab(page, 'ถังขยะ');
  await expect(page.getByRole('heading', { name: store.storeName, exact: true })).toBeVisible();
  await page.getByPlaceholder('ค้นหาตามชื่อรายการ, หมวดหมู่, หรือผู้ลบ...').fill(store.storeName);
  await expect(page.getByRole('heading', { name: store.storeName, exact: true })).toBeVisible();
  await expect(page.locator('main img').first()).toHaveAttribute('src', store.photos.storefrontAndAtmosphere[0]);
  await capture(page, { path: 'test-results/trash-store.png' });
  await page.getByRole('button', { name: 'กู้คืนสู่ระบบ', exact: true }).click();
  await expect(page.getByText(`กู้คืน "${store.storeName}" กลับสู่ระบบเรียบร้อยแล้ว`, { exact: true })).toBeVisible();
  const restored = (await data(page, token)).drinkStores.find((record: any) => record.id === store.id);
  expect(restored.storeName).toBe(store.storeName);
  expect(restored.revision).toBeGreaterThan(1);
});

test('failed logout reports the failure and keeps the session until the server confirms', async ({ page }) => {
  await login(page, 'ice');
  await page.route('**/api/logout', route => route.fulfill({ status: 503, contentType: 'application/json', body: JSON.stringify({ error: 'QA logout unavailable' }) }));
  await page.getByRole('button', { name: /แพลตฟอร์ม/ }).click();
  await page.getByRole('button', { name: 'ออกจากระบบ (Lock PIN)', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('ออกจากระบบไม่สำเร็จ');
  expect(await page.evaluate(() => sessionStorage.getItem('vitcha_session_token'))).toBeTruthy();
  await page.getByRole('button', { name: 'ปิดข้อความแจ้งเตือน', exact: true }).click();
  await page.unroute('**/api/logout');
  await page.getByRole('button', { name: /แพลตฟอร์ม/ }).click();
  const response = page.waitForResponse(r => new URL(r.url()).pathname === '/api/logout');
  await page.getByRole('button', { name: 'ออกจากระบบ (Lock PIN)', exact: true }).click();
  expect((await response).ok()).toBeTruthy();
  await expect.poll(() => page.evaluate(() => sessionStorage.getItem('vitcha_session_token'))).toBeNull();
});

test("invitation copy contains spaced greeting, recipient and a unique link; existing-account login works", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  const token = await login(page);
  await navigateTab(page, "สมาชิก");
  const links: string[] = [];
  for (const name of ["คุณเอ QA", "คุณบี QA", "คุณซี QA"]) {
    await page.getByLabel("ชื่อผู้รับคำเชิญ").fill(name);
    await page
      .getByRole("button", { name: "สร้างคำเชิญ", exact: true })
      .click();
    await expect(page.getByLabel("ข้อความเชิญพร้อมลิงก์")).toContainText(name);
    await page
      .getByRole("button", { name: "คัดลอกข้อความและลิงก์", exact: true })
      .click();
    const copied = await page.evaluate(() => navigator.clipboard.readText());
    expect(copied).toContain(name);
    expect(copied).toContain("\n\n");
    links.push(copied.match(/http[^\s]+/)![0]);
  }
  expect(new Set(links).size).toBe(3);
  expect(
    (await data(page, token)).invites.filter((i: any) =>
      i.prefilledAlias?.endsWith("QA"),
    ).length,
  ).toBeGreaterThanOrEqual(3);
  await capture(page, { path: "test-results/invitation-desktop.png" });
  await page.evaluate(() => sessionStorage.clear());
  await page.context().clearCookies();
  // Use a fresh unauthenticated context so login initializers cannot restore the session.
  const fresh = await page.context().browser()!.newContext();
  const guest = await fresh.newPage();
  await guest.goto(links[0]);
  await expect(
    guest.getByText("ตรวจสอบคำเชิญแล้ว", { exact: true }),
  ).toBeVisible();
  await expect(
    guest.getByPlaceholder("เช่น ช่างบีม (วิศวกร) หรือ คุณแอน (จัดซื้อ)"),
  ).toHaveValue("คุณเอ QA");
  await guest.getByRole("button", { name: /มีบัญชีในระบบอยู่แล้ว/ }).click();
  await expect(guest.locator('input[autocomplete="username"]')).toBeVisible();
  expect(guest.url()).not.toContain("invite=");
  await fresh.close();
});

test("map filters leave the whole team feed and its count unchanged", async ({
  page,
}) => {
  await login(page, "qa-viewer");
  const feed = page.getByTestId("team-feed");
  const ids = await feed
    .locator("[data-feed-id]")
    .evaluateAll((nodes) => nodes.map((n) => n.getAttribute("data-feed-id")));
  const count = await page.getByTestId("feed-count").textContent();
  const map = page.getByRole("region", { name: "แผนที่ของทีม" });
  await map.getByRole("button", { name: "Thailand", exact: true }).click();
  await map.getByRole("button", { name: /ร้านน้ำ/ }).click();
  expect(
    await feed
      .locator("[data-feed-id]")
      .evaluateAll((nodes) => nodes.map((n) => n.getAttribute("data-feed-id"))),
  ).toEqual(ids);
  await expect(page.getByTestId("feed-count")).toHaveText(count!);
  await page.setViewportSize({ width: 390, height: 844 });
  await feed.scrollIntoViewIfNeeded();
  await capture(page, { path: "test-results/feed-mobile.png" });
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(390);
});

test("reviewer curates a product, adds category and tag, creates and reorders a set, and persists after reload", async ({
  page,
}) => {
  const token = await login(page, "qa-reviewer");
  await navigateTab(page, "รายการสินค้า");
  const ws = page.getByTestId("product-workspace");
  await expect(ws).toBeVisible();
  const before = await data(page, token);
  expect(before.products.length).toBeGreaterThan(1);
  await page
    .getByRole("button", { name: "หมวดหมู่และแท็ก", exact: true })
    .click();
  const tax = page.getByRole("dialog", { name: "หมวดหมู่และแท็กสินค้า" });
  await tax.getByLabel("ชื่อหมวดหรือแท็ก").fill("QA หมวดสินค้า");
  await tax.getByRole("button", { name: "เพิ่ม", exact: true }).click();
  await expect(tax.getByText("QA หมวดสินค้า", { exact: true })).toBeVisible();
  await tax.getByRole("button", { name: "ป้ายแท็ก", exact: true }).click();
  await tax.getByLabel("ชื่อหมวดหรือแท็ก").fill("QA เทียบสเปก");
  await tax.getByRole("button", { name: "เพิ่ม", exact: true }).click();
  await expect(tax.getByText("QA เทียบสเปก", { exact: true })).toBeVisible();
  await tax.getByLabel("ปิดจัดการแท็ก").click();
  await ws
    .getByRole("button", { name: "เปิดรายละเอียด", exact: true })
    .first()
    .click();
  const editor = page.getByRole("dialog", { name: "รายละเอียดสินค้า" });
  await editor
    .getByLabel("ชื่อสินค้า", { exact: true })
    .fill("QA curated machine");
  await editor
    .getByLabel("เมมโม / หมายเหตุของทีม")
    .fill("ตรวจขนาดและราคาก่อนสั่ง");
  await editor
    .getByLabel("หมวดสินค้า", { exact: true })
    .selectOption({ label: "QA หมวดสินค้า" });
  await editor.getByLabel("QA เทียบสเปก").check();
  await editor.getByLabel("สถานะคัดเลือก").selectOption("keep");
  await editor.getByRole("button", { name: "บันทึกรายละเอียด" }).click();
  await expect(editor).not.toBeVisible();
  const checks = ws.locator('article input[type="checkbox"]');
  await checks.nth(0).check();
  await checks.nth(1).check();
  await ws
    .getByRole("button", { name: "สร้างชุด (2 ชิ้น)", exact: true })
    .click();
  const set = page.getByRole("dialog", { name: "ชุดเปรียบเทียบสินค้า" });
  await set.getByLabel("ชื่อชุด", { exact: true }).fill("QA ชุดเปรียบเทียบ");
  await set.getByLabel("หมายเหตุชุด").fill("สองตัวเลือกสำหรับทดลอง");
  await set.getByRole("button", { name: "บันทึกชุดสินค้า" }).click();
  await expect(set).not.toBeVisible();
  await expect(ws.locator("article")).toHaveCount(2);
  const first = (await data(page, token)).productSets.find(
    (s: any) => s.name === "QA ชุดเปรียบเทียบ",
  );
  await ws
    .getByRole("button", { name: /เลื่อน .* ลง/ })
    .first()
    .click();
  await expect
    .poll(
      async () =>
        (await data(page, token)).productSets.find(
          (s: any) => s.id === first.id,
        ).productIds[0],
    )
    .toBe(first.productIds[1]);
  await page.evaluate(() => window.scrollTo(0, 0));
  await capture(page, {
    path: "test-results/products-desktop.png",
    fullPage: true,
  });
  await page.reload();
  await navigateTab(page, "รายการสินค้า");
  await expect(
    page
      .getByRole("button", { name: "QA curated machine", exact: true })
      .first(),
  ).toBeVisible();
  const after = await data(page, token);
  expect(after.suppliers).toEqual(before.suppliers);
  await page.setViewportSize({ width: 390, height: 844 });
  await capture(page, { path: "test-results/products-mobile.png" });
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(390);
});

test("profile has one name field and avatar saves immediately without submitting the form", async ({
  page,
}) => {
  const token = await login(page, "qa-reviewer");
  await page.getByTitle("กดเพื่อแก้ไขรูปโปรไฟล์ ชื่อ และรหัสผ่าน").click();
  const profile = page.getByRole("dialog", { name: "โปรไฟล์" });
  await expect(profile.locator('input[type="text"]')).toHaveCount(2); // display name + login ID
  await expect(profile).not.toContainText(/สิทธิ์|ชื่อ-นามสกุล \/ ตำแหน่งเต็ม/);
  await profile
    .locator('input[type="file"]')
    .first()
    .setInputFiles(path.resolve("tests/fixtures/photo.png"));
  await expect(profile.getByRole("status")).toContainText(
    "บันทึกรูปบนเซิร์ฟเวอร์แล้ว",
  );
  const saved = await data(page, token);
  expect(saved.user.avatar).toMatch(/^data:image\/jpeg;base64,/);
  await profile.getByLabel("ปิดโปรไฟล์").first().click();
  await page.reload();
  await expect(page.locator("header img").last()).toHaveAttribute(
    "src",
    saved.user.avatar,
  );
});

test("failed audio upload keeps save disabled until retry; uploaded audio and video decode from server", async ({
  page,
}) => {
  await login(page, "qa-reviewer");
  await page
    .getByTitle("เพิ่มข้อมูลใหม่ (ซัพพลายเออร์ หรือ ร้านน้ำ & เรฟ)")
    .click();
  await page
    .getByRole("button", {
      name: "เพิ่มซัพพลายเออร์ โรงงาน · อุปกรณ์ · วัตถุดิบชา & บรรจุภัณฑ์",
    })
    .click();
  const form = page.getByRole("dialog");
  await form.locator('input[placeholder*="FEST"]').fill('ซัพพลายเออร์ทดสอบ');
  await form.locator('select').first().selectOption({ index: 1 });
  await page.route("**/api/upload", (route) =>
    route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({ error: "QA upload interrupted" }),
    }),
  );
  await form
    .locator('input[accept="audio/*"]')
    .last()
    .setInputFiles(path.resolve("tests/fixtures/tone.wav"));
  await expect(form.getByRole("alert")).toContainText("QA upload interrupted");
  const save = form.getByRole("button", {
    name: "บันทึกเข้าระบบ",
    exact: true,
  });
  await expect(save).toBeDisabled();
  await page.unroute("**/api/upload");
  await form.getByRole("button", { name: "ลองส่งอีกครั้ง" }).click();
  await expect(form.locator("audio")).toHaveCount(1);
  await expect(save).toBeEnabled();
  await form
    .locator('input[accept="video/*"]')
    .setInputFiles(path.resolve("tests/fixtures/clip.webm"));
  await expect(form.locator("video")).toHaveCount(1);
  await expect(save).toBeEnabled();
  await expect
    .poll(() =>
      form.locator("audio").evaluate((el: HTMLAudioElement) => el.readyState),
    )
    .toBeGreaterThanOrEqual(1);
  await expect
    .poll(() =>
      form.locator("video").evaluate((el: HTMLVideoElement) => el.videoWidth),
    )
    .toBe(160);
  const pending = page.waitForResponse(
    (r) =>
      r.url().endsWith("/api/suppliers") && r.request().method() === "POST",
  );
  await save.click();
  const saved = (await (await pending).json()).item;
  expect(saved.voiceNotes).toHaveLength(1);
  expect(saved.videos).toHaveLength(1);
  expect(saved.voiceNotes[0].url).toContain("/uploads/");
  await expect(form).not.toBeVisible();
});

test("viewer product page is read-only and announcement controls are private", async ({
  page,
}) => {
  await login(page, "qa-viewer");
  await navigateTab(page, "รายการสินค้า");
  const ws = page.getByTestId("product-workspace");
  await expect(
    ws.getByRole("button", { name: "หมวดหมู่และแท็ก", exact: true }),
  ).toHaveCount(0);
  await expect(ws.locator('input[type="checkbox"]')).toHaveCount(0);
  await ws
    .getByRole("button", { name: "เปิดรายละเอียด", exact: true })
    .first()
    .click();
  const details = page.getByRole("dialog", { name: "รายละเอียดสินค้า" });
  await expect(
    details.getByLabel("ชื่อสินค้า", { exact: true }),
  ).toBeDisabled();
  await expect(
    details.getByRole("button", { name: "บันทึกรายละเอียด" }),
  ).toHaveCount(0);
  await details.getByLabel("ปิดรายละเอียดสินค้า").click();
  await login(page, "qa-admin");
  await page
    .locator("header")
    .getByRole("button", { name: /กดเพื่อติดตั้งและเปิดแจ้งเตือน/ })
    .click();
  const install = page.getByRole("dialog", { name: "ติดตั้งแอพ" });
  await expect(install).toBeVisible();
  await expect(
    install.getByText("ส่งประกาศถึงทีม", { exact: true }),
  ).toHaveCount(0);
  await expect(install).not.toContainText(/คุณไอซ์|เจ้าของระบบ|ผู้ก่อตั้ง/);
});

test("failed announcement cannot show success before the server acknowledges it", async ({
  page,
}) => {
  await login(page, "ice");
  await page
    .locator("header")
    .getByRole("button", { name: /กดเพื่อติดตั้งและเปิดแจ้งเตือน/ })
    .click();
  const install = page.getByRole("dialog", { name: "ติดตั้งแอพ" });
  await expect(
    install.getByText("ส่งประกาศถึงทีม", { exact: true }),
  ).toBeVisible();
  await page.route("**/api/notifications", (r) =>
    r.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({ error: "QA broadcast unavailable" }),
    }),
  );
  await install.getByRole("button", { name: "ส่งประกาศ", exact: true }).click();
  await expect(
    install.getByText("ส่งประกาศไม่สำเร็จ กรุณาลองใหม่"),
  ).toBeVisible();
  await expect(
    install.getByText("ส่งประกาศถึงทีมแล้ว", { exact: true }),
  ).toHaveCount(0);
});
