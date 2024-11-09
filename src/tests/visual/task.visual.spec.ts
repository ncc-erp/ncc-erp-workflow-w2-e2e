import { authAdminFile, authPmFile, authUserFile } from "../../data/users.data";
import { expect, test } from "../../pageObjects/page.fixture";
import approvedTaskList from "./mock/task/approved-task-list.json";
import pendingTaskList from "./mock/task/pending-task-list.json";
import rejectedTaskList from "./mock/task/rejected-task-list.json";

// Define empty task list mock data
const emptyTaskList = { totalCount: 0, items: [] };

async function takeSnapshot(page) {
  await expect(page).toHaveScreenshot({ fullPage: true });
}

// Test cases with data
test.describe("Task page with data", () => {
  test.beforeEach(async ({ PageObjects, page }) => {
    let taskCallCount = 0;
    const taskResponses = [pendingTaskList, approvedTaskList, rejectedTaskList];
    await page.route("*/**/api/app/task/list", async (route) => {
      await route.fulfill({ json: taskResponses[taskCallCount++ % 3] });
    });
    await PageObjects.TaskPage.open();
  });

  test.describe("as user", () => {
    test.use({ storageState: authUserFile });
    test("board view snapshot", async ({ PageObjects }) => {
      await takeSnapshot(PageObjects.LoginPage.page);
    });

    test("table view snapshot", async ({ PageObjects }) => {
      await PageObjects.TaskPage.tableView();
      await takeSnapshot(PageObjects.LoginPage.page);
    });
  });

  test.describe("as admin", () => {
    test.use({ storageState: authAdminFile });
    test("board view snapshot", async ({ PageObjects }) => {
      await takeSnapshot(PageObjects.LoginPage.page);
    });

    test("table view snapshot", async ({ PageObjects }) => {
      await PageObjects.TaskPage.tableView();
      await takeSnapshot(PageObjects.LoginPage.page);
    });
  });

  test.describe("as PM", () => {
    test.use({ storageState: authPmFile });

    test("pending task detail snapshot", async ({ PageObjects }) => {
      await PageObjects.TaskPage.taskBoard.clickToBoardByTaskId(pendingTaskList.items[0].id, 0);
      await takeSnapshot(PageObjects.LoginPage.page);
    });

    test("approve task snapshot", async ({ PageObjects }) => {
      await PageObjects.TaskPage.taskBoard.clickToBoardByTaskId(pendingTaskList.items[0].id, 0);
      await PageObjects.TaskPage.detailTaskPopup.approveBtn.click();
      await takeSnapshot(PageObjects.LoginPage.page);
    });

    test("reject task snapshot", async ({ PageObjects }) => {
      await PageObjects.TaskPage.taskBoard.clickToBoardByTaskId(pendingTaskList.items[0].id, 0);
      await PageObjects.TaskPage.detailTaskPopup.rejectBtn.click();
      await takeSnapshot(PageObjects.LoginPage.page);
    });

    test("approved task detail snapshot", async ({ PageObjects }) => {
      await PageObjects.TaskPage.taskBoard.clickToBoardByTaskId(approvedTaskList.items[0].id, 1);
      await takeSnapshot(PageObjects.LoginPage.page);
    });

    test("rejected task detail snapshot", async ({ PageObjects }) => {
      await PageObjects.TaskPage.taskBoard.clickToBoardByTaskId(rejectedTaskList.items[0].id, 2);
      await takeSnapshot(PageObjects.LoginPage.page);
    });
  });
});

// Test cases with empty data
test.describe("Task page with empty data", () => {
  test.beforeEach(async ({ PageObjects, page }) => {
    let taskCallCount = 0;
    const taskResponses = [emptyTaskList, emptyTaskList, emptyTaskList];
    await page.route("*/**/api/app/task/list", async (route) => {
      await route.fulfill({ json: taskResponses[taskCallCount++ % 3] });
    });
    await PageObjects.TaskPage.open();
  });

  test.describe("as user", () => {
    test.use({ storageState: authUserFile });
    test("board view snapshot", async ({ PageObjects }) => {
      await takeSnapshot(PageObjects.LoginPage.page);
    });

    test("table view snapshot", async ({ PageObjects }) => {
      await PageObjects.TaskPage.tableView();
      await takeSnapshot(PageObjects.LoginPage.page);
    });
  });

  test.describe("as admin", () => {
    test.use({ storageState: authAdminFile });
    test("board view snapshot", async ({ PageObjects }) => {
      await takeSnapshot(PageObjects.LoginPage.page);
    });

    test("table view snapshot", async ({ PageObjects }) => {
      await PageObjects.TaskPage.tableView();
      await takeSnapshot(PageObjects.LoginPage.page);
    });
  });
});
