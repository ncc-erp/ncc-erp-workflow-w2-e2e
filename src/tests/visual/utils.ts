import { expect, Page } from "@playwright/test";

export interface IViewport {
  width: number;
  height: number;
}
export const VIEW_PORTS: IViewport[] = [
  { width: 1920, height: 1080 },
  { width: 375, height: 667 },
  { width: 768, height: 1024 },
  { width: 1356, height: 960 },
];

export async function takeSnapshot(page: Page, viewport?: IViewport, isFullPage = true) {
  if (viewport) {
    await page.setViewportSize(viewport); // Apply the viewport size before taking a snapshot
  }
  await page.waitForLoadState("domcontentloaded");
  // eslint-disable-next-line playwright/no-networkidle
  await page.waitForLoadState("networkidle");
  await expect.soft(page).toHaveScreenshot({
    fullPage: isFullPage,
    maxDiffPixels: 100, // Allow small pixel differences
    threshold: 0.16, // Allow 1% difference in color changes
  });
}
export async function takeSnapshots(page: Page, isFullPage = true) {
  for (const viewport of VIEW_PORTS) {
    await takeSnapshot(page, viewport, isFullPage);
  }
}
