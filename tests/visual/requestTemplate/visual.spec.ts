import { authAdminFile, authUserFile } from "../../../data/users.data";
import { expect, test } from "../../../pageObjects/page.fixture";
import requests from "../mock/list-request.json";

test.beforeEach(async ({ PageObjects, page }) => {
  // mock
  await page.route("*/**/api/app/workflow-definition/list-all", async (route) => {
    await route.fulfill({ json: requests });
  });
  // open page
  await PageObjects.RequestTemplatePage.open();
});

// eslint-disable-next-line playwright/no-skipped-test
test.describe.skip("as user, request template page", () => {
  test.use({ storageState: authUserFile });

  test("snapshot", async ({ PageObjects }) => {
    await expect(PageObjects.LoginPage.page).toHaveScreenshot({
      fullPage: true,
    });
  });
});

// eslint-disable-next-line playwright/no-skipped-test
test.describe.skip("as admin, request template page", () => {
  test.use({ storageState: authAdminFile });

  test("snapshot", async ({ PageObjects }) => {
    await expect(PageObjects.LoginPage.page).toHaveScreenshot({
      fullPage: true,
    });
  });
});
