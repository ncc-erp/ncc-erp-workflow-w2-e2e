import { authAdminFile, authUserFile } from "../../data/users.data";
import { expect, test } from "../../pageObjects/page.fixture";
import requests from "./mock/list-request.json";

async function takeSnapshot(page) {
  await expect(page).toHaveScreenshot({ fullPage: true });
}

// With data
test.describe("Request template page with data", () => {
  test.beforeEach(async ({ PageObjects, page }) => {
    // Mock API response
    await page.route("*/**/api/app/workflow-definition/list-all", async (route) => {
      await route.fulfill({ json: requests });
    });
    await PageObjects.RequestTemplatePage.open();
  });

  test.describe("as user", () => {
    test.use({ storageState: authUserFile });

    test("displays page snapshot", async ({ PageObjects }) => {
      await takeSnapshot(PageObjects.LoginPage.page);
    });

    test("create new request snapshot", async ({ PageObjects }) => {
      await PageObjects.RequestTemplatePage.clickAddRequest(requests.items[0].name);
      await takeSnapshot(PageObjects.LoginPage.page);
    });
  });

  test.describe("as admin", () => {
    test.use({ storageState: authAdminFile });

    test("displays page snapshot", async ({ PageObjects }) => {
      await takeSnapshot(PageObjects.LoginPage.page);
    });

    test("create new template snapshot", async ({ PageObjects }) => {
      await PageObjects.RequestTemplatePage.clickCreateNewTemplate();
      await takeSnapshot(PageObjects.LoginPage.page);
    });

    test("import new template snapshot", async ({ PageObjects }) => {
      await PageObjects.RequestTemplatePage.clickImportNewTemplate();
      await takeSnapshot(PageObjects.LoginPage.page);
    });

    test("define input snapshot", async ({ PageObjects }) => {
      await PageObjects.RequestTemplatePage.clickMenuButton(requests.items[0].id, "Define Input");
      await takeSnapshot(PageObjects.LoginPage.page);
    });

    test("edit workflow snapshot", async ({ PageObjects }) => {
      await PageObjects.RequestTemplatePage.clickMenuButton(requests.items[0].id, "Edit Workflow");
      await takeSnapshot(PageObjects.LoginPage.page);
    });

    test("delete request snapshot", async ({ PageObjects }) => {
      await PageObjects.RequestTemplatePage.clickMenuButton(requests.items[0].id, "Delete");
      await takeSnapshot(PageObjects.LoginPage.page);
    });
  });
});

// With empty data
const emptyRequestList = { totalCount: 0, items: [] };
test.describe("Request template page with empty data", () => {
  test.beforeEach(async ({ PageObjects, page }) => {
    await page.route("*/**/api/app/workflow-definition/list-all", async (route) => {
      await route.fulfill({ json: emptyRequestList });
    });
    await PageObjects.RequestTemplatePage.open();
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

    test("create new template snapshot", async ({ PageObjects }) => {
      await PageObjects.RequestTemplatePage.clickCreateNewTemplate();
      await takeSnapshot(PageObjects.LoginPage.page);
    });

    test("import new template snapshot", async ({ PageObjects }) => {
      await PageObjects.RequestTemplatePage.clickImportNewTemplate();
      await takeSnapshot(PageObjects.LoginPage.page);
    });
  });
});
