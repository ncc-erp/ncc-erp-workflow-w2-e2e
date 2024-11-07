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

test.describe("as user, request template page", () => {
  test.use({ storageState: authUserFile });

  test("snapshot", async ({ PageObjects }) => {
    await expect(PageObjects.LoginPage.page).toHaveScreenshot({
      fullPage: true,
    });
  });
});

test.describe("as user, request template page: click button create new request", () => {
  test.use({ storageState: authUserFile });

  test("snapshot", async ({ PageObjects }) => {
    await PageObjects.RequestTemplatePage.clickAddRequest(requests.items[0].name);
    await expect(PageObjects.LoginPage.page).toHaveScreenshot({
      fullPage: true,
    });
  });
});

test.describe("as admin, request template page", () => {
  test.use({ storageState: authAdminFile });

  test("snapshot", async ({ PageObjects }) => {
    await expect(PageObjects.LoginPage.page).toHaveScreenshot({
      fullPage: true,
    });
  });
});

test.describe("as admin, request template page: click create button", () => {
  test.use({ storageState: authAdminFile });

  test("snapshot", async ({ PageObjects }) => {
    await PageObjects.RequestTemplatePage.clickCreateNewTemplate();
    await expect(PageObjects.LoginPage.page).toHaveScreenshot({
      fullPage: true,
    });
  });
});

test.describe("as admin, request template page: click import button", () => {
  test.use({ storageState: authAdminFile });

  test("snapshot", async ({ PageObjects }) => {
    await PageObjects.RequestTemplatePage.clickImportNewTemplate();
    await expect(PageObjects.LoginPage.page).toHaveScreenshot({
      fullPage: true,
    });
  });
});

test.describe("as admin, request template page: define input", () => {
  test.use({ storageState: authAdminFile });

  test("snapshot", async ({ PageObjects }) => {
    await PageObjects.RequestTemplatePage.clickMenuButton(requests.items[0].id, "Define Input");
    await expect(PageObjects.LoginPage.page).toHaveScreenshot({
      fullPage: true,
    });
  });
});

test.describe("as admin, request template page: edit workflow", () => {
  test.use({ storageState: authAdminFile });

  test("snapshot", async ({ PageObjects }) => {
    await PageObjects.RequestTemplatePage.clickMenuButton(requests.items[0].id, "Edit Workflow");
    await expect(PageObjects.LoginPage.page).toHaveScreenshot({
      fullPage: true,
    });
  });
});

test.describe("as admin, request template page: delete", () => {
  test.use({ storageState: authAdminFile });

  test("snapshot", async ({ PageObjects }) => {
    await PageObjects.RequestTemplatePage.clickMenuButton(requests.items[0].id, "Delete");
    await expect(PageObjects.LoginPage.page).toHaveScreenshot({
      fullPage: true,
    });
  });
});
