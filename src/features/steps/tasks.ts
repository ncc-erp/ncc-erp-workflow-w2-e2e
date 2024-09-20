import { users } from "../../data/users.data";
import { BrowserControl, Given, Then, When } from "../../pageObjects/page.fixture";

//I should see request is "reject" with title "__globalData[deviceRequest2].getTitle" and state "PM Reviews" on tasks page
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
  await PageObjects.TaskPage.taskBoard.clickToBoardItemByTitle(title);
  await PageObjects.TaskPage.detailTaskPopup.approve();
});

When(
  "I reject request by title {TestData} with reason {string}",
  async ({ PageObjects }, title: string, reason: string) => {
    await PageObjects.TaskPage.taskBoard.clickToBoardItemByTitle(title);
    await PageObjects.TaskPage.detailTaskPopup.reject(reason);
  }
);

Given("{string} approve the request {TestData} success", async ({ browser }, userType: string, title: string) => {
  const authFile = users[userType.toLowerCase()].authFile;
  const stateData = {
    pm: "PM Reviews",
    gdvpdn: "Current HoO Reviews",
    gdvpv: "Destination HoO Reviews",
  };
  await BrowserControl.withAuth(browser, authFile, async ({ PageObjects }) => {
    await PageObjects.TaskPage.open();
    await PageObjects.TaskPage.taskBoard.clickToBoardItemByTitle(title);
    await PageObjects.TaskPage.detailTaskPopup.approve();
    await PageObjects.TaskPage.verifyHasApproveTask(title, users.user.name, stateData[userType.toLowerCase()]);
  });
});
