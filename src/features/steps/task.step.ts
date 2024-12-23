import { DataTable } from "playwright-bdd/dist/cucumber/DataTable";
import { API } from "../../data/apis";
import { users } from "../../data/users.data";
import { BrowserControl, Given, Then, When } from "../../pageObjects/page.fixture";

// 1. Missing step definition for "src\features\changeOfficeRequest.feature:9:7"
Then(
  "I should see request is {string} with id {TestData} and state {string} on tasks page",
  async ({ PageObjects }, status: "pending" | "approve" | "reject", id: string, state: string) => {
    switch (status) {
      case "pending":
        await PageObjects.TaskPage.taskBoard.verifyHasTaskById(0, id, users.user.name, state);
        break;
      case "approve":
        await PageObjects.TaskPage.taskBoard.verifyHasTaskById(1, id, users.user.name, state);
        break;
      case "reject":
        await PageObjects.TaskPage.taskBoard.verifyHasTaskById(2, id, users.user.name, state);
        break;
    }
  }
);

Then(
  "I should see {TestData} with status {string} on tasks page table mode",
  async ({ PageObjects }, id: string, status: string) => {
    await PageObjects.TaskPage.filterByStatus(status);
    await PageObjects.TaskPage.table.verifyInstanceIdInTable(id);
  }
);
// 2. Missing step definition for "src\features\changeOfficeRequest.feature:12:7"
When("I approve request with id {string}", async ({ PageObjects }, id: string) => {
  await PageObjects.TaskPage.taskBoard.clickToBoardItemById(id, 0);
  await Promise.all([
    PageObjects.TaskPage.page.waitForResponse(API.listTask),
    PageObjects.TaskPage.detailTaskPopup.approve(),
  ]);
});
// 3. Missing step definition for "src\features\changeOfficeRequest.feature:16:7"
When("I reject request with id {string} with reason {string}", async ({ PageObjects }, id: string, reason: string) => {
  await PageObjects.TaskPage.taskBoard.clickToBoardItemById(id, 0);
  await Promise.all([
    PageObjects.TaskPage.page.waitForResponse(API.listTask),
    PageObjects.TaskPage.detailTaskPopup.reject(reason),
  ]);
});

When(
  "I approve request with id {TestData} with strength points {string} and weekness points {string}",
  async ({ PageObjects }, id: string, strengthPoints?: string, weeknessPoints?: string) => {
    await PageObjects.TaskPage.taskBoard.clickToBoardItemById(id, 0);
    await Promise.all([
      PageObjects.TaskPage.page.waitForResponse(API.listTask),
      PageObjects.TaskPage.detailTaskPopup.approve({ strengthPoints, weeknessPoints }),
    ]);
  }
);

When("I approve request with id {TestData} with note {string}", async ({ PageObjects }, id: string, note: string) => {
  await PageObjects.TaskPage.taskBoard.clickToBoardItemById(id, 0);
  await PageObjects.TaskPage.detailTaskPopup.approve({ note });
});

Given(
  "{string} approve the request {string}, current state {string} success",
  async ({ browser }, userType: string, id: string, currentState?: string) => {
    const authFile = users[userType.toLowerCase()].authFile;
    await BrowserControl.withAuth(browser, authFile, async ({ PageObjects }) => {
      await PageObjects.TaskPage.open();
      await PageObjects.TaskPage.taskBoard.clickToBoardItemById(id, 0);
      await Promise.all([
        PageObjects.TaskPage.page.waitForResponse(API.listTask),
        PageObjects.TaskPage.detailTaskPopup.approve(),
      ]);
      await PageObjects.TaskPage.taskBoard.verifyHasTaskById(1, id, users.user.name, currentState);
    });
  }
);
Given(
  "{string} reject the request {TestData}, current state {string} success with reason {string}",
  async ({ browser }, userType: string, id: string, currentState?: string, reason?: string) => {
    const authFile = users[userType.toLowerCase()].authFile;
    await BrowserControl.withAuth(browser, authFile, async ({ PageObjects }) => {
      await PageObjects.TaskPage.open();
      await PageObjects.TaskPage.taskBoard.clickToBoardItemById(id, 0);
      await Promise.all([
        PageObjects.TaskPage.page.waitForResponse(API.listTask),
        PageObjects.TaskPage.detailTaskPopup.reject(reason),
      ]);
      await PageObjects.TaskPage.taskBoard.verifyHasTaskById(2, id, users.user.name, currentState);
    });
  }
);
Given(
  "{string} approve the request {TestData} with strength points {string} and weekness points {string} success and current state {string}",
  async (
    { browser },
    userType: string,
    id: string,
    strengthPoints?: string,
    weeknessPoints?: string,
    currentState?: string
  ) => {
    const authFile = users[userType.toLowerCase()].authFile;
    await BrowserControl.withAuth(browser, authFile, async ({ PageObjects }) => {
      await PageObjects.TaskPage.open();
      await PageObjects.TaskPage.taskBoard.clickToBoardItemById(id, 0);
      await PageObjects.TaskPage.detailTaskPopup.approve({ strengthPoints, weeknessPoints });
      await PageObjects.TaskPage.taskBoard.verifyHasTaskById(1, id, users.user.name, currentState);
    });
  }
);

When("I approve request by drag with id {string}", async ({ PageObjects }, id: string) => {
  await PageObjects.TaskPage.dragToApproveCol(id);
});

When(
  "I reject request by drag with id {string} and reason {string}",
  async ({ PageObjects }, id: string, reason: string) => {
    await PageObjects.TaskPage.dragToRejectCol(id, reason);
  }
);

Then("I should see all request with status as {string} display in table", async ({ PageObjects }, status: string) => {
  await PageObjects.TaskPage.verifyFilterStatusInTableView(status);
});

Given("I am at Board view mode", async ({ PageObjects }) => {
  await PageObjects.TaskPage.boardView();
});

Then("I should see these option below Time dropdown", async ({ PageObjects }, dataTable: DataTable) => {
  await PageObjects.TaskPage.verifyTimeDropdownOptions(dataTable);
});

Given("I click on Time dropdown", async ({ PageObjects }) => {
  await PageObjects.TaskPage.timeDropDown.click();
});

Given("I am at List Task view mode", async ({ PageObjects }) => {
  await PageObjects.TaskPage.tableView();
});

Then("I should see only request in {string} column display", async ({ PageObjects }, status: string) => {
  await PageObjects.TaskPage.verifyStatusFilterInBoardView(status);
});
When("I approve request in table mode with id {string}", async ({ PageObjects }, id: string) => {
  await PageObjects.TaskPage.open();
  await PageObjects.TaskPage.approveRequestInTableMode(id);
});

When(
  "I reject request in table mode with id {string} and reason {string}",
  async ({ PageObjects }, id: string, reason: string) => {
    await PageObjects.TaskPage.open();
    await PageObjects.TaskPage.rejectRequestInTableMode(id, reason);
  }
);
