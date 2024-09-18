import { DeviceRequestData } from "../../data/deviceRequests.data";
import { authItFile, authPmFile, authUserFile, users } from "../../data/users.data";
import { DeviceRequestForm } from "../../pageObjects/components/deviceRequest";
import { BrowserControl, test } from "../../pageObjects/page.fixture";
import { pmApproveDeviceRequestSteps, userCreateDeviceRequestSteps } from "./../../steps/deviceRequest.step";

// create
test.describe("As user, I want to create a Device Request @user @Sa68baf65", () => {
  // seq this test case
  test.use({ storageState: authUserFile });
  const dataNewRequest = DeviceRequestData.user.getRandomDeviceRequest();
  test("When user create a new request, should be success @Taf9769f7", async ({ PageObjects }) => {
    await userCreateDeviceRequestSteps(PageObjects, dataNewRequest);
    /// verify get request
    await PageObjects.MyRequestPage.open();
    await PageObjects.MyRequestPage.table.verifyTextInCol(0, dataNewRequest.device);
  });
});

// case PM login
// test.describe.configure({ mode: "serial" });
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
    test("I should see the request on my tasks @T0b88dab7", async ({ PageObjects }) => {
      await PageObjects.TaskPage.verifyHasPendingTask(dataNewRequest.device, users.user.name, "PM Reviews");
    });
    test("I should approve success @Te096e368", async ({ PageObjects }) => {
      await PageObjects.TaskPage.taskBoard.clickToBoardItemByTitle(dataNewRequest.device);
      await PageObjects.TaskPage.detailTaskPopup.approve();
      await PageObjects.TaskPage.verifyHasApproveTask(dataNewRequest.device, users.user.name, "PM Reviews");
    });
    test("I should reject success @T969594da", async ({ PageObjects }) => {
      await PageObjects.TaskPage.taskBoard.clickToBoardItemByTitle(dataNewRequest.device);
      await PageObjects.TaskPage.detailTaskPopup.reject("reason");
      await PageObjects.TaskPage.verifyHasRejectTask(dataNewRequest.device, users.user.name, "PM Reviews");
    });
  });
});

// case IT
test.describe("As IT, I want to received a Device Request after PM approved @it", () => {
  test.use({ storageState: authItFile });
  let dataNewRequest: DeviceRequestForm;
  test.beforeEach(async ({ browser }) => {
    await BrowserControl.withAuth(browser, authUserFile, async ({ PageObjects }) => {
      dataNewRequest = await userCreateDeviceRequestSteps(PageObjects);
    });
    await BrowserControl.withAuth(browser, authPmFile, async ({ PageObjects }) => {
      await pmApproveDeviceRequestSteps(PageObjects, dataNewRequest);
    });
  });
  test.describe("when PM approve a request successfully", () => {
    test.beforeEach(async ({ PageObjects }) => {
      await PageObjects.TaskPage.open();
    });
    // test.describe.configure({ mode: "parallel" });
    test("I should see the request on my tasks @T0b88dab7", async ({ PageObjects }) => {
      await PageObjects.TaskPage.verifyHasPendingTask(dataNewRequest.device, users.user.name, "IT Reviews");
    });
    test("I should approve success @Te096e368", async ({ PageObjects }) => {
      await PageObjects.TaskPage.taskBoard.clickToBoardItemByTitle(dataNewRequest.device);
      await PageObjects.TaskPage.detailTaskPopup.approve();
      await PageObjects.TaskPage.verifyHasApproveTask(dataNewRequest.device, users.user.name, "IT Reviews");
    });
    test("I should reject success @T969594da", async ({ PageObjects }) => {
      await PageObjects.TaskPage.taskBoard.clickToBoardItemByTitle(dataNewRequest.device);
      await PageObjects.TaskPage.detailTaskPopup.reject("reason");
      await PageObjects.TaskPage.verifyHasRejectTask(dataNewRequest.device, users.user.name, "IT Reviews");
    });
  });
});
// cancel
