import { authAdminFile, authPmFile, authUserFile } from "../../data/users.data";
import { test } from "../../pageObjects/page.fixture";
import approvedTaskList from "./mock/task/approved-task-list.json";
import detailById from "./mock/task/detail-by-id.json";
import pendingTaskList from "./mock/task/pending-task-list.json";
import rejectedTaskList from "./mock/task/rejected-task-list.json";
import { takeSnapshot, VIEW_PORTS } from "./utils";

// Define empty task list mock data
const emptyTaskList = { totalCount: 0, items: [] };

// Test cases with data
test.describe("Task page with data", () => {
  test.beforeEach(async ({ PageObjects, page }) => {
    let taskCallCount = 0;
    const taskResponses = [pendingTaskList, approvedTaskList, rejectedTaskList];
    await page.route("*/**/api/app/task/list", async (route) => {
      await route.fulfill({ json: taskResponses[taskCallCount++ % 3] });
    });
    await page.route("*/**/api/app/task/*/detail-by-id", async (route) => {
      const url = route.request().url();
      const taskId = url.split("/task/")[1].split("/detail-by-id")[0];
      await route.fulfill({ json: detailById[taskId] });
    });
    await PageObjects.TaskPage.open();
  });

  test.describe("as user", () => {
    test.use({ storageState: authUserFile });
    VIEW_PORTS.forEach((viewport) => {
      test("board view snapshot" + ` ${viewport.width}x${viewport.height}`, async ({ PageObjects }) => {
        await takeSnapshot(PageObjects.LoginPage.page, viewport);
      });

      test("table view snapshot" + ` ${viewport.width}x${viewport.height}`, async ({ PageObjects }) => {
        await PageObjects.TaskPage.tableView();
        await takeSnapshot(PageObjects.LoginPage.page, viewport);
      });
    });
  });

  test.describe("as admin", () => {
    test.use({ storageState: authAdminFile });
    VIEW_PORTS.forEach((viewport) => {
      test("board view snapshot" + ` ${viewport.width}x${viewport.height}`, async ({ PageObjects }) => {
        await takeSnapshot(PageObjects.LoginPage.page, viewport);
      });

      test("table view snapshot" + ` ${viewport.width}x${viewport.height}`, async ({ PageObjects }) => {
        await PageObjects.TaskPage.tableView();
        await takeSnapshot(PageObjects.LoginPage.page, viewport);
      });
    });
  });

  test.describe("as PM", () => {
    test.use({ storageState: authPmFile });

    VIEW_PORTS.forEach((viewport) => {
      test("pending task detail snapshot" + ` ${viewport.width}x${viewport.height}`, async ({ PageObjects }) => {
        await PageObjects.TaskPage.taskBoard.clickToBoardByTaskId(pendingTaskList.items[0].id, 0);
        await takeSnapshot(PageObjects.LoginPage.page, viewport);
      });

      test("approve task snapshot" + ` ${viewport.width}x${viewport.height}`, async ({ PageObjects }) => {
        await PageObjects.TaskPage.taskBoard.clickToBoardByTaskId(pendingTaskList.items[0].id, 0);
        await PageObjects.TaskPage.detailTaskPopup.approveBtn.click();
        await takeSnapshot(PageObjects.LoginPage.page, viewport);
      });

      test("reject task snapshot" + ` ${viewport.width}x${viewport.height}`, async ({ PageObjects }) => {
        await PageObjects.TaskPage.taskBoard.clickToBoardByTaskId(pendingTaskList.items[0].id, 0);
        await PageObjects.TaskPage.detailTaskPopup.rejectBtn.click();
        await takeSnapshot(PageObjects.LoginPage.page, viewport);
      });

      test("approved task detail snapshot" + ` ${viewport.width}x${viewport.height}`, async ({ PageObjects }) => {
        await PageObjects.TaskPage.taskBoard.clickToBoardByTaskId(approvedTaskList.items[0].id, 1);
        await takeSnapshot(PageObjects.LoginPage.page, viewport);
      });

      test("rejected task detail snapshot" + ` ${viewport.width}x${viewport.height}`, async ({ PageObjects }) => {
        await PageObjects.TaskPage.taskBoard.clickToBoardByTaskId(rejectedTaskList.items[0].id, 2);
        await takeSnapshot(PageObjects.LoginPage.page, viewport);
      });
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
    VIEW_PORTS.forEach((viewport) => {
      test("board view snapshot" + ` ${viewport.width}x${viewport.height}`, async ({ PageObjects }) => {
        await takeSnapshot(PageObjects.LoginPage.page, viewport);
      });

      test("table view snapshot" + ` ${viewport.width}x${viewport.height}`, async ({ PageObjects }) => {
        await PageObjects.TaskPage.tableView();
        await takeSnapshot(PageObjects.LoginPage.page, viewport);
      });
    });
  });

  test.describe("as admin", () => {
    test.use({ storageState: authAdminFile });
    VIEW_PORTS.forEach((viewport) => {
      test("board view snapshot" + ` ${viewport.width}x${viewport.height}`, async ({ PageObjects }) => {
        await takeSnapshot(PageObjects.LoginPage.page, viewport);
      });

      test("table view snapshot" + ` ${viewport.width}x${viewport.height}`, async ({ PageObjects }) => {
        await PageObjects.TaskPage.tableView();
        await takeSnapshot(PageObjects.LoginPage.page, viewport);
      });
    });
  });
});
