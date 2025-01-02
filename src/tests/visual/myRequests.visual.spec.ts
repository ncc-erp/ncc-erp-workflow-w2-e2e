import { authAdminFile, authUserFile } from "../../data/users.data";
import { expect, test } from "../../pageObjects/page.fixture";
import adminRequests from "./mock/request/my-request-admin.json";
import userRequests from "./mock/request/my-request-user.json";

async function takeSnapshot(page, viewport, isFullPage = true) {
  await page.setViewportSize(viewport); // Apply the viewport size before taking a snapshot
  await page.waitForLoadState("domcontentloaded");
  // eslint-disable-next-line playwright/no-networkidle
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveScreenshot({ fullPage: isFullPage });
}

// Viewport sizes
const viewports = [
  { width: 1920, height: 1080 },
  { width: 375, height: 667 },
  { width: 768, height: 1024 },
  { width: 1356, height: 960 },
];

test.describe("Request page with data", () => {
  test.beforeEach(async ({ PageObjects, page, storageState }) => {
    // mock
    await page.route("*/**/api/app/workflow-instance/list", async (route) => {
      const data = storageState === authAdminFile ? adminRequests : userRequests;
      await route.fulfill({ json: data });
    });
    // open page
    await PageObjects.MyRequestPage.open();
  });

  test.describe("as user", () => {
    test.use({ storageState: authUserFile });

    viewports.forEach((viewport) => {
      const isNotFullPage = viewport.height === 667 && viewport.width === 375;

      test(`displays page snapshot ${viewport.width}x${viewport.height}`, async ({ PageObjects }) => {
        await takeSnapshot(PageObjects.LoginPage.page, viewport);
      });

      test(`request details popup snapshot ${viewport.width}x${viewport.height}`, async ({ PageObjects }) => {
        await PageObjects.MyRequestPage.viewRequestDetail(userRequests.items[0].id);
        await takeSnapshot(PageObjects.LoginPage.page, viewport, !isNotFullPage);
      });

      test(`click cancel button snapshot ${viewport.width}x${viewport.height}`, async ({ PageObjects }) => {
        await PageObjects.MyRequestPage.table.clickSettingButtonById(userRequests.items[4].id);
        await PageObjects.MyRequestPage.requestSettingMenu.cancelBtn.click();
        await takeSnapshot(PageObjects.LoginPage.page, viewport, !isNotFullPage);
      });

      test(`click workflow button snapshot ${viewport.width}x${viewport.height}`, async ({ PageObjects }) => {
        await PageObjects.MyRequestPage.table.clickSettingButtonById(userRequests.items[4].id);
        await PageObjects.MyRequestPage.requestSettingMenu.workflowBtn.click();
        await takeSnapshot(PageObjects.LoginPage.page, viewport, !isNotFullPage);
      });
    });
  });

  test.describe("as admin", () => {
    test.use({ storageState: authAdminFile });

    viewports.forEach((viewport) => {
      test(`displays page snapshot ${viewport.width}x${viewport.height}`, async ({ PageObjects }) => {
        await takeSnapshot(PageObjects.LoginPage.page, viewport);
      });

      test(`request details popup snapshot ${viewport.width}x${viewport.height}`, async ({ PageObjects }) => {
        await PageObjects.MyRequestPage.viewRequestDetail(adminRequests.items[0].id);
        await takeSnapshot(PageObjects.LoginPage.page, viewport);
      });

      test(`click Only my request button snapshot ${viewport.width}x${viewport.height}`, async ({ PageObjects }) => {
        await PageObjects.MyRequestPage.toggleRequestsView();
        await takeSnapshot(PageObjects.LoginPage.page, viewport);
      });

      test(`click cancel button snapshot ${viewport.width}x${viewport.height}`, async ({ PageObjects }) => {
        await PageObjects.MyRequestPage.table.clickSettingButtonById(adminRequests.items[0].id);
        await PageObjects.MyRequestPage.requestSettingMenu.cancelBtn.click();
        await takeSnapshot(PageObjects.LoginPage.page, viewport);
      });

      test(`click workflow button snapshot ${viewport.width}x${viewport.height}`, async ({ PageObjects }) => {
        await PageObjects.MyRequestPage.table.clickSettingButtonById(adminRequests.items[0].id);
        await PageObjects.MyRequestPage.requestSettingMenu.workflowBtn.click();
        await takeSnapshot(PageObjects.LoginPage.page, viewport);
      });
    });
  });
});

// With empty data
const emptyRequestList = { totalCount: 0, items: [] };
test.describe("Request page with empty data", () => {
  test.beforeEach(async ({ PageObjects, page }) => {
    // mock
    await page.route("*/**/api/app/workflow-instance/list", async (route) => {
      await route.fulfill({ json: emptyRequestList });
    });
    // open page
    await PageObjects.MyRequestPage.open();
  });

  test.describe("as user", () => {
    test.use({ storageState: authUserFile });

    viewports.forEach((viewport) => {
      test(`displays page snapshot ${viewport.width}x${viewport.height}`, async ({ PageObjects }) => {
        await takeSnapshot(PageObjects.LoginPage.page, viewport);
      });
    });
  });

  test.describe("as admin", () => {
    test.use({ storageState: authAdminFile });

    viewports.forEach((viewport) => {
      test(`displays page snapshot ${viewport.width}x${viewport.height}`, async ({ PageObjects }) => {
        await takeSnapshot(PageObjects.LoginPage.page, viewport);
      });

      test(`click Only my request button snapshot ${viewport.width}x${viewport.height}`, async ({ PageObjects }) => {
        await PageObjects.MyRequestPage.toggleRequestsView();
        await takeSnapshot(PageObjects.LoginPage.page, viewport);
      });
    });
  });
});
