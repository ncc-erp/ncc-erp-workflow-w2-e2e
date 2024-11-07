import { authAdminFile, authUserFile } from "../../../data/users.data";
import { expect, test } from "../../../pageObjects/page.fixture";
import userRequests from "../mock/request/my-request-user.json";
import adminRequests from "../mock/request/my-request-admin.json";

async function takeSnapshot(page) {
  await expect(page).toHaveScreenshot({ fullPage: true });
}

// With data
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

    test("displays page snapshot", async ({ PageObjects }) => {
      await takeSnapshot(PageObjects.LoginPage.page);
    });

    test("request details popup snapshot", async ({ PageObjects }) => {
      await PageObjects.MyRequestPage.viewRequestDetail(userRequests.items[0].id);
      await takeSnapshot(PageObjects.LoginPage.page);
    });

    test("click cancel button snapshot", async ({ PageObjects }) => {
      await PageObjects.MyRequestPage.table.clickSettingButtonById(userRequests.items[4].id);
      await PageObjects.MyRequestPage.requestSettingMenu.cancelBtn.click();
      await takeSnapshot(PageObjects.LoginPage.page);
    });

    test("click workflow button snapshot", async ({ PageObjects }) => {
      await PageObjects.MyRequestPage.table.clickSettingButtonById(userRequests.items[4].id);
      await PageObjects.MyRequestPage.requestSettingMenu.workflowBtn.click();
      await takeSnapshot(PageObjects.LoginPage.page);
    });
  });

  test.describe("as admin", () => {
    test.use({ storageState: authAdminFile });

    test("displays page snapshot", async ({ PageObjects }) => {
      await takeSnapshot(PageObjects.LoginPage.page);
    });

    test("request details popup snapshot", async ({ PageObjects }) => {
      await PageObjects.MyRequestPage.viewRequestDetail(adminRequests.items[0].id);
      await takeSnapshot(PageObjects.LoginPage.page);
    });

    test("click Only my request button snapshot", async ({ PageObjects }) => {
      await PageObjects.MyRequestPage.toggleRequestsView();
      await takeSnapshot(PageObjects.LoginPage.page);
    });

    test("click cancel button snapshot", async ({ PageObjects }) => {
      await PageObjects.MyRequestPage.table.clickSettingButtonById(adminRequests.items[0].id);
      await PageObjects.MyRequestPage.requestSettingMenu.cancelBtn.click();
      await takeSnapshot(PageObjects.LoginPage.page);
    });

    test("click workflow button snapshot", async ({ PageObjects }) => {
      await PageObjects.MyRequestPage.table.clickSettingButtonById(adminRequests.items[0].id);
      await PageObjects.MyRequestPage.requestSettingMenu.workflowBtn.click();
      await takeSnapshot(PageObjects.LoginPage.page);
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

    test("displays page snapshot", async ({ PageObjects }) => {
      await takeSnapshot(PageObjects.LoginPage.page);
    });
  });

  test.describe("as admin", () => {
    test.use({ storageState: authAdminFile });

    test("displays page snapshot", async ({ PageObjects }) => {
      await takeSnapshot(PageObjects.LoginPage.page);
    });

    test("click Only my request button snapshot", async ({ PageObjects }) => {
      await PageObjects.MyRequestPage.toggleRequestsView();
      await takeSnapshot(PageObjects.LoginPage.page);
    });
  });
});
