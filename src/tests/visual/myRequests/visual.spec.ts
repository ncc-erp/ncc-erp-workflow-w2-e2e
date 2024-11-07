import { authAdminFile, authUserFile } from "../../../data/users.data";
import { expect, test } from "../../../pageObjects/page.fixture";
import userRequests from "../mock/request/my-request-user.json";
import adminRequests from "../mock/request/my-request-admin.json";

test.beforeEach(async ({ PageObjects, page, storageState }) => {
  // mock
  await page.route("*/**/api/app/workflow-instance/list", async (route) => {
    const data = storageState === authAdminFile ? adminRequests : userRequests;
    await route.fulfill({ json: data });
  });
  // open page
  await PageObjects.MyRequestPage.open();
});

test.describe("as user, request page", () => {
  test.use({ storageState: authUserFile });

  test("snapshot", async ({ PageObjects }) => {
    await expect(PageObjects.LoginPage.page).toHaveScreenshot({
      fullPage: true,
    });
  });
});

test.describe("as admin, request page", () => {
  test.use({ storageState: authAdminFile });

  test("snapshot", async ({ PageObjects }) => {
    await expect(PageObjects.LoginPage.page).toHaveScreenshot({
      fullPage: true,
    });
  });
});

test.describe("as user, request page: request details popup", () => {
  test.use({ storageState: authUserFile });

  test("snapshot", async ({ PageObjects }) => {
    await PageObjects.MyRequestPage.viewRequestDetail(userRequests.items[0].id);
    await expect(PageObjects.LoginPage.page).toHaveScreenshot({
      fullPage: true,
    });
  });
});

test.describe("as admin, request page: request details popup", () => {
  test.use({ storageState: authAdminFile });

  test("snapshot", async ({ PageObjects }) => {
    await PageObjects.MyRequestPage.viewRequestDetail(adminRequests.items[0].id);
    await expect(PageObjects.LoginPage.page).toHaveScreenshot({
      fullPage: true,
    });
  });
});

test.describe("as admin, request page: click Only my request button", () => {
  test.use({ storageState: authAdminFile });

  test("snapshot", async ({ PageObjects }) => {
    await PageObjects.MyRequestPage.toggleRequestsView();
    await expect(PageObjects.LoginPage.page).toHaveScreenshot({
      fullPage: true,
    });
  });
});

test.describe("as admin, request page: click cancel button", () => {
  test.use({ storageState: authAdminFile });

  test("snapshot", async ({ PageObjects }) => {
    await PageObjects.MyRequestPage.table.clickSettingButtonById(adminRequests.items[0].id);
    await PageObjects.MyRequestPage.requestSettingMenu.cancelBtn.click();
    await expect(PageObjects.LoginPage.page).toHaveScreenshot({
      fullPage: true,
    });
  });
});

test.describe("as admin, request page: click workflow button", () => {
  test.use({ storageState: authAdminFile });

  test("snapshot", async ({ PageObjects }) => {
    await PageObjects.MyRequestPage.table.clickSettingButtonById(adminRequests.items[0].id);
    await PageObjects.MyRequestPage.requestSettingMenu.workflowBtn.click();
    await expect(PageObjects.LoginPage.page).toHaveScreenshot({
      fullPage: true,
    });
  });
});

test.describe("as user, request page: click cancel button", () => {
  test.use({ storageState: authUserFile });

  test("snapshot", async ({ PageObjects }) => {
    await PageObjects.MyRequestPage.table.clickSettingButtonById(userRequests.items[4].id);
    await PageObjects.MyRequestPage.requestSettingMenu.cancelBtn.click();
    await expect(PageObjects.LoginPage.page).toHaveScreenshot({
      fullPage: true,
    });
  });
});

test.describe("as user, request page: click workflow button", () => {
  test.use({ storageState: authUserFile });

  test("snapshot", async ({ PageObjects }) => {
    await PageObjects.MyRequestPage.table.clickSettingButtonById(userRequests.items[4].id);
    await PageObjects.MyRequestPage.requestSettingMenu.workflowBtn.click();
    await expect(PageObjects.LoginPage.page).toHaveScreenshot({
      fullPage: true,
    });
  });
});
