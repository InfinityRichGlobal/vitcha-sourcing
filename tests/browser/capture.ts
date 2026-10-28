import type { Page } from "@playwright/test";
// Some local macOS Chrome builds occasionally stall a capture after layout.
// A fresh paint retries artifact capture only; application assertions are never retried here.
export async function capture(
  page: Page,
  options: Parameters<Page["screenshot"]>[0],
) {
  if (process.env.TEST_CAPTURE !== "1") return;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      return await page.screenshot({
        ...options,
        animations: "disabled",
        timeout: 8000,
      });
    } catch (error) {
      if (attempt === 2) throw error;
      await page.evaluate(() => {
        const position = scrollY;
        window.scrollTo(0, position + 1);
        requestAnimationFrame(() => window.scrollTo(0, position));
      });
    }
  }
}
