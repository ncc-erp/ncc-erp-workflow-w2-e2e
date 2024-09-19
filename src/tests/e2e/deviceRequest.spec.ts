import { DeviceRequestData } from "../../data/deviceRequest.data";
import { DeviceRequestForm } from "../../data/requestTemplate.data";
import { authItFile, authPmFile, authUserFile, users } from "../../data/users.data";
import { BrowserControl, test } from "../../pageObjects/page.fixture";
import { approveRequestSteps, userCreateDeviceRequestSteps } from "../../steps/request.step";

// create
test.describe("As user, I want to create a Device Request @user", () => {
  // seq this test case
  test.use({ storageState: authUserFile });
  const dataNewRequest = DeviceRequestData.user.getRandomData();
  test("When I create a new request, I should see the request on my requests", async ({ PageObjects }) => {
    await userCreateDeviceRequestSteps(PageObjects, dataNewRequest);
    /// verify get request
    await PageObjects.MyRequestPage.open();
    await PageObjects.MyRequestPage.table.verifyTextInCol(0, dataNewRequest.Device.value);
  });
});

// case PM login
test.describe("As pm, I want to received a Device Request from my project @pm", () => {
  let dataNewRequest: DeviceRequestForm;
  test.use({ storageState: authPmFile }); // main context auth
  test.beforeEach(async ({ browser }) => {
    await BrowserControl.withAuth(browser, authUserFile, async ({ PageObjects }) => {
      dataNewRequest = await userCreateDeviceRequestSteps(PageObjects);
    });
  });
  test.describe("when user in my project create a new request", () => {
    test.beforeEach(async ({ PageObjects }) => {
      await PageObjects.TaskPage.open();
    });
    // test.describe.configure({ mode: "parallel" });
    test("I should see the request on my tasks", async ({ PageObjects }) => {
      await PageObjects.TaskPage.verifyHasPendingTask(dataNewRequest.Device.value, users.user.name, "PM Reviews");
    });
    test("I should approve success", async ({ PageObjects }) => {
      await PageObjects.TaskPage.taskBoard.clickToBoardItemByTitle(dataNewRequest.Device.value);
      await PageObjects.TaskPage.detailTaskPopup.approve();
      await PageObjects.TaskPage.verifyHasApproveTask(dataNewRequest.Device.value, users.user.name, "PM Reviews");
    });
    test("I should reject success", async ({ PageObjects }) => {
      await PageObjects.TaskPage.taskBoard.clickToBoardItemByTitle(dataNewRequest.Device.value);
      await PageObjects.TaskPage.detailTaskPopup.reject("reason");
      await PageObjects.TaskPage.verifyHasRejectTask(dataNewRequest.Device.value, users.user.name, "PM Reviews");
    });
  });
});

// case IT
test.describe("As IT, I want to received a Device Request after PM approved @it", () => {
  let dataNewRequest: DeviceRequestForm;
  test.beforeEach(async ({ browser }) => {
    await BrowserControl.withAuth(browser, authUserFile, async ({ PageObjects }) => {
      dataNewRequest = await userCreateDeviceRequestSteps(PageObjects);
    });
    await BrowserControl.withAuth(browser, authPmFile, async ({ PageObjects }) => {
      await approveRequestSteps(PageObjects, DeviceRequestData.getTitle(dataNewRequest), users.user.name, "PM Reviews");
    });
  });
  test.describe("when PM approve a request successfully", () => {
    test.use({ storageState: authItFile });
    test.beforeEach(async ({ PageObjects }) => {
      await PageObjects.TaskPage.open();
    });
    // test.describe.configure({ mode: "parallel" });
    test("I should see the request on my tasks", async ({ PageObjects }) => {
      await PageObjects.TaskPage.verifyHasPendingTask(dataNewRequest.Device.value, users.user.name, "IT Reviews");
    });
    test("I should approve success", async ({ PageObjects }) => {
      await PageObjects.TaskPage.taskBoard.clickToBoardItemByTitle(dataNewRequest.Device.value);
      await PageObjects.TaskPage.detailTaskPopup.approve();
      await PageObjects.TaskPage.verifyHasApproveTask(dataNewRequest.Device.value, users.user.name, "IT Reviews");
    });
    test("I should reject success", async ({ PageObjects }) => {
      await PageObjects.TaskPage.taskBoard.clickToBoardItemByTitle(dataNewRequest.Device.value);
      await PageObjects.TaskPage.detailTaskPopup.reject("reason");
      await PageObjects.TaskPage.verifyHasRejectTask(dataNewRequest.Device.value, users.user.name, "IT Reviews");
    });
  });
});
// cancel
