import { authAdminFile, authPmFile, authUserFile } from "../../../data/users.data";
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

test.describe("as PM, task page: pending task detail", () => {
  test.use({ storageState: authPmFile });
  test("snapshot", async ({ PageObjects }) => {
    await PageObjects.TaskPage.taskBoard.clickToBoardByTaskId(pendingTaskList.items[0].id, 0);
    await expect(PageObjects.LoginPage.page).toHaveScreenshot({
      fullPage: true,
    });
  });
});

test.describe("as PM, task page: approve", () => {
  test.use({ storageState: authPmFile });
  test("snapshot", async ({ PageObjects }) => {
    await PageObjects.TaskPage.taskBoard.clickToBoardByTaskId(pendingTaskList.items[0].id, 0);
    await PageObjects.TaskPage.detailTaskPopup.approveBtn.click();
    await expect(PageObjects.LoginPage.page).toHaveScreenshot({
      fullPage: true,
    });
  });
});

test.describe("as PM, task page: reject", () => {
  test.use({ storageState: authPmFile });
  test("snapshot", async ({ PageObjects }) => {
    await PageObjects.TaskPage.taskBoard.clickToBoardByTaskId(pendingTaskList.items[0].id, 0);
    await PageObjects.TaskPage.detailTaskPopup.rejectBtn.click();
    await expect(PageObjects.LoginPage.page).toHaveScreenshot({
      fullPage: true,
    });
  });
});

test.describe("as PM, task page: approved task detail", () => {
  test.use({ storageState: authPmFile });
  test("snapshot", async ({ PageObjects }) => {
    await PageObjects.TaskPage.taskBoard.clickToBoardByTaskId(approvedTaskList.items[0].id, 1);
    await expect(PageObjects.LoginPage.page).toHaveScreenshot({
      fullPage: true,
    });
  });
});

test.describe("as PM, task page: rejected task detail", () => {
  test.use({ storageState: authPmFile });
  test("snapshot", async ({ PageObjects }) => {
    await PageObjects.TaskPage.taskBoard.clickToBoardByTaskId(rejectedTaskList.items[0].id, 2);
    await expect(PageObjects.LoginPage.page).toHaveScreenshot({
      fullPage: true,
    });
  });
});
