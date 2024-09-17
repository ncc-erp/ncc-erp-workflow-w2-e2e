import { authPmFile, authUserFile } from "../../data/users";
import { DeviceRequestForm } from "../../pageObjects/components/deviceRequest";
import { test } from "../../pageObjects/page.fixture";
import { users } from "./../../data/users";
import { userCreateRequestSteps } from "./../../steps/deviceRequest.step";
import { DeviceRequestData } from "./deviceRequest.data";

// create
test.describe("As user, I want to create a Device Request", () => {
  // seq this test case
  test.use({ storageState: authUserFile });
  const dataNewRequest = DeviceRequestData.user.getRandomDeviceRequest();
  test("When user create a new request, should be success", async ({ PageObjects }) => {
    await userCreateRequestSteps(PageObjects, dataNewRequest);
    /// verify get request
    await PageObjects.MyRequestPage.open();
    await PageObjects.MyRequestPage.table.verifyCellOfRow(1, 0, dataNewRequest.device);
  });
});

// case PM login
test.describe("As pm, I want to received a Device Request from my project", () => {
  test.use({ storageState: authUserFile });
  let dataNewRequest: DeviceRequestForm;
  test.beforeEach(async ({ PageObjects }) => {
    dataNewRequest = await userCreateRequestSteps(PageObjects);
  });
  test.describe("when user in my project, create a new request", () => {
    test.use({ storageState: authPmFile });
    test("should see the request on my tasks", async ({ PageObjects }) => {
      await PageObjects.TaskPage.open();
      await PageObjects.TaskPage.verifyHasPendingTask(dataNewRequest.device, users.user.name, "PM Reviews");
    });
    test("should approve success", async ({ PageObjects }) => {
      await PageObjects.TaskPage.open();
      await PageObjects.TaskPage.taskBoard.clickToBoardItemByTitle(dataNewRequest.device);
      await PageObjects.TaskPage.detailTaskPopup.approve();
      await PageObjects.TaskPage.verifyHasApproveTask(dataNewRequest.device, users.pm.name, "PM Reviews");
    });
  });
  test.describe("when user in my project, create a new request", () => {
    test.use({ storageState: authPmFile });
    test("should reject success", async ({ PageObjects }) => {
      await PageObjects.TaskPage.open();
      await PageObjects.TaskPage.taskBoard.clickToBoardItemByTitle(dataNewRequest.device);
      await PageObjects.TaskPage.detailTaskPopup.reject("reason");
      await PageObjects.TaskPage.verifyHasRejectTask(dataNewRequest.device, users.pm.name, "PM Reviews");
    });
  });
});

// cancel
