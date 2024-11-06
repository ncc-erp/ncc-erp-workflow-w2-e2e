import { authAdminFile, authUserFile } from "../../../data/users.data";
import { expect, test } from "../../../pageObjects/page.fixture";
import pendingTaskList from "../mock/task/pending-task-list.json";
import approvedTaskList from "../mock/task/approved-task-list.json";
import rejectedTaskList from "../mock/task/rejected-task-list.json";

test.beforeEach(async ({ PageObjects, page }) => {
  let taskCallCount = 0;
  const taskResponses = [pendingTaskList, approvedTaskList, rejectedTaskList];
  // mock
  await page.route("*/**/api/app/task/list", async (route) => {
    await route.fulfill({ json: taskResponses[taskCallCount++ % 3] });
  });
  // open page
  await PageObjects.TaskPage.open();
});

test.describe("as user, task page", () => {
  test.use({ storageState: authUserFile });
  test("snapshot", async ({ PageObjects }) => {
    await expect(PageObjects.LoginPage.page).toHaveScreenshot({
      fullPage: true,
    });
  });
});

test.describe("as admin, task page", () => {
  test.use({ storageState: authAdminFile });
  test("snapshot", async ({ PageObjects }) => {
    await expect(PageObjects.LoginPage.page).toHaveScreenshot({
      fullPage: true,
    });
  });
});
