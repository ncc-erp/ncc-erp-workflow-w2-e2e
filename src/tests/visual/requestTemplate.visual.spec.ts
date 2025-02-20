import { authAdminFile, authUserFile } from "../../data/users.data";
import { test } from "../../pageObjects/page.fixture";
import requests from "./mock/list-request.json";
import { takeSnapshot, VIEW_PORTS } from "./utils";

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

    VIEW_PORTS.forEach((viewport) => {
      test("displays page snapshot" + ` ${viewport.width}x${viewport.height}`, async ({ PageObjects }) => {
        await takeSnapshot(PageObjects.LoginPage.page, viewport);
      });

      test("create new request snapshot" + ` ${viewport.width}x${viewport.height}`, async ({ PageObjects }) => {
        await PageObjects.RequestTemplatePage.clickAddRequest(requests.items[0].name);
        await takeSnapshot(PageObjects.LoginPage.page, viewport);
      });
    });
  });

  test.describe("as admin", () => {
    test.use({ storageState: authAdminFile });

    VIEW_PORTS.forEach((viewport) => {
      test("displays page snapshot" + ` ${viewport.width}x${viewport.height}`, async ({ PageObjects }) => {
        await takeSnapshot(PageObjects.LoginPage.page, viewport);
      });

      test("create new template snapshot" + ` ${viewport.width}x${viewport.height}`, async ({ PageObjects }) => {
        await PageObjects.RequestTemplatePage.clickCreateNewTemplate();
        await takeSnapshot(PageObjects.LoginPage.page, viewport);
      });

      test("import new template snapshot" + ` ${viewport.width}x${viewport.height}`, async ({ PageObjects }) => {
        await PageObjects.RequestTemplatePage.clickImportNewTemplate();
        await takeSnapshot(PageObjects.LoginPage.page, viewport);
      });

      test("define input snapshot" + ` ${viewport.width}x${viewport.height}`, async ({ PageObjects }) => {
        await PageObjects.RequestTemplatePage.clickMenuButton(requests.items[0].id, "Define Input");
        await takeSnapshot(PageObjects.LoginPage.page, viewport);
      });

      test("edit workflow snapshot" + ` ${viewport.width}x${viewport.height}`, async ({ PageObjects }) => {
        await PageObjects.RequestTemplatePage.clickMenuButton(requests.items[0].id, "Edit Workflow");
        await takeSnapshot(PageObjects.LoginPage.page, viewport);
      });

      test("delete request snapshot" + ` ${viewport.width}x${viewport.height}`, async ({ PageObjects }) => {
        await PageObjects.RequestTemplatePage.clickMenuButton(requests.items[0].id, "Delete");
        await takeSnapshot(PageObjects.LoginPage.page, viewport);
      });
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

    VIEW_PORTS.forEach((viewport) => {
      test("displays page snapshot" + ` ${viewport.width}x${viewport.height}`, async ({ PageObjects }) => {
        await takeSnapshot(PageObjects.LoginPage.page, viewport);
      });
    });
  });

  test.describe("as admin", () => {
    test.use({ storageState: authAdminFile });

    VIEW_PORTS.forEach((viewport) => {
      test("displays page snapshot" + ` ${viewport.width}x${viewport.height}`, async ({ PageObjects }) => {
        await takeSnapshot(PageObjects.LoginPage.page, viewport);
      });

      test("create new template snapshot" + ` ${viewport.width}x${viewport.height}`, async ({ PageObjects }) => {
        await PageObjects.RequestTemplatePage.clickCreateNewTemplate();
        await takeSnapshot(PageObjects.LoginPage.page, viewport);
      });

      test("import new template snapshot" + ` ${viewport.width}x${viewport.height}`, async ({ PageObjects }) => {
        await PageObjects.RequestTemplatePage.clickImportNewTemplate();
        await takeSnapshot(PageObjects.LoginPage.page, viewport);
      });
    });
  });
});
