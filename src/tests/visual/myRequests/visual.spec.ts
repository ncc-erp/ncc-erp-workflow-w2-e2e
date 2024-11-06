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
