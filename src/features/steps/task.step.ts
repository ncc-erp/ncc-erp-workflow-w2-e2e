import { users } from "../../data/users.data";
import { BrowserControl, Given, Then, When } from "../../pageObjects/page.fixture";

//I should see request is "reject" with title "*global[deviceRequest2].getTitle" and state "PM Reviews" on tasks page
Then(
  "I should see request is {string} with title {TestData} and state {string} on tasks page",
  async ({ PageObjects }, status: "pending" | "approve" | "reject", title: string, state: string) => {
    switch (status) {
      case "pending":
        await PageObjects.TaskPage.verifyHasPendingTask(title, users.user.name, state);
        break;
      case "approve":
        await PageObjects.TaskPage.verifyHasApproveTask(title, users.user.name, state);
        break;
      case "reject":
        await PageObjects.TaskPage.verifyHasRejectTask(title, users.user.name, state);
        break;
    }
  }
);

When("I approve request by title {TestData}", async ({ PageObjects }, title: string) => {
  await PageObjects.TaskPage.taskBoard.clickToBoardItemByTitle(title, 0);
  await PageObjects.TaskPage.detailTaskPopup.approve();
});

When(
  "I approve request by title {TestData} with strength points {string} and weekness points {string}",
  async ({ PageObjects }, title: string, strengthPoints?: string, weeknessPoints?: string) => {
    await PageObjects.TaskPage.taskBoard.clickToBoardItemByTitle(title, 0);
    await PageObjects.TaskPage.detailTaskPopup.approve(strengthPoints, weeknessPoints);
  }
);

When(
  "I reject request by title {TestData} with reason {string}",
  async ({ PageObjects }, title: string, reason: string) => {
    await PageObjects.TaskPage.taskBoard.clickToBoardItemByTitle(title, 0);
    await PageObjects.TaskPage.detailTaskPopup.reject(reason);
  }
);

Given(
  "{string} approve the request {TestData} success and current state {string}",
  async ({ browser }, userType: string, title: string, currentState?: string) => {
    const authFile = users[userType.toLowerCase()].authFile;
    await BrowserControl.withAuth(browser, authFile, async ({ PageObjects }) => {
      await PageObjects.TaskPage.open();
      await PageObjects.TaskPage.taskBoard.clickToBoardItemByTitle(title, 0);
      await PageObjects.TaskPage.detailTaskPopup.approve();
      await PageObjects.TaskPage.verifyHasApproveTask(title, users.user.name, currentState);
    });
  }
);

Given(
  "{string} approve the request {TestData} with strength points {string} and weekness points {string} success and current state {string}",
  async (
    { browser },
    userType: string,
    title: string,
    strengthPoints?: string,
    weeknessPoints?: string,
    currentState?: string
  ) => {
    const authFile = users[userType.toLowerCase()].authFile;
    await BrowserControl.withAuth(browser, authFile, async ({ PageObjects }) => {
      await PageObjects.TaskPage.open();
      await PageObjects.TaskPage.taskBoard.clickToBoardItemByTitle(title, 0);
      await PageObjects.TaskPage.detailTaskPopup.approve(strengthPoints, weeknessPoints);
      await PageObjects.TaskPage.verifyHasApproveTask(title, users.user.name, currentState);
    });
  }
);
