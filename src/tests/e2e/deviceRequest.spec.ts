import { DeviceRequestData } from "../../data/deviceRequest.data";
import { DeviceRequestForm, Pointer } from "../../data/requestTemplate.data";
import { authItFile, authPmFile, authUserFile, users } from "../../data/users.data";
import { BrowserControl, test } from "../../pageObjects/page.fixture";
import { approveRequestSteps, testTaskAssigned, userCreateDeviceRequestSteps } from "../../steps/request.step";

// create
test.describe("As user, When I create a new request @user", () => {
  // seq this test case
  test.use({ storageState: authUserFile });
  const dataNewRequest = DeviceRequestData.user.getRandomData();
  test("I should see the request on my requests", async ({ PageObjects }) => {
    await userCreateDeviceRequestSteps(PageObjects, dataNewRequest);
    /// verify get request
    await PageObjects.MyRequestPage.open();
    await PageObjects.MyRequestPage.table.verifyTextInCol(0, dataNewRequest.getTitle());
  });
});

// case PM login
test.describe("As pm, I want to received a Device Request from my project", () => {
  let dataNewRequest: Pointer<DeviceRequestForm> = {};
  test.use({ storageState: authPmFile });
  test.beforeEach(async ({ browser }) => {
    await BrowserControl.withAuth(browser, authUserFile, async ({ PageObjects }) => {
      dataNewRequest.value = await userCreateDeviceRequestSteps(PageObjects);
    });
  });
  testTaskAssigned("As pm, when user in my project create a new request @pm", "PM Reviews", dataNewRequest);
});

// case IT
test.describe("As IT, I want to received a Device Request after PM approved", () => {
  let dataNewRequest: Pointer<DeviceRequestForm> = {};
  test.use({ storageState: authItFile });
  test.beforeEach(async ({ browser }) => {
    await BrowserControl.withAuth(browser, authUserFile, async ({ PageObjects }) => {
      dataNewRequest.value = await userCreateDeviceRequestSteps(PageObjects);
    });
    await BrowserControl.withAuth(browser, authPmFile, async ({ PageObjects }) => {
      await approveRequestSteps(PageObjects, dataNewRequest.value.getTitle(), users.user.name, "PM Reviews");
    });
  });

  testTaskAssigned("As IT, when PM approve a request successfully @it", "IT Reviews", dataNewRequest);
});
// cancel
