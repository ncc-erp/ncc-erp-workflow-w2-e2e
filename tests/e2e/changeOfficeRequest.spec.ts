import { authUserFile } from "../../data/users.data";
import { test } from "../../pageObjects/page.fixture";
import { userCreateChangeOfficeRequestSteps } from "../../steps/deviceRequest.step";
import { ChangeOfficeRequestData } from "./../../data/changeOfficeRequest.data";

// create
test.describe("As user, I want to create a Device Request @user", () => {
  // seq this test case
  test.use({ storageState: authUserFile });
  const dataNewRequest = ChangeOfficeRequestData.user.getRandomData();
  test("When user create a new request, should be success", async ({ PageObjects }) => {
    await userCreateChangeOfficeRequestSteps(PageObjects, dataNewRequest);
    /// verify get request
    await PageObjects.MyRequestPage.open();
    await PageObjects.MyRequestPage.table.verifyTextInCol(0, ChangeOfficeRequestData.getTitle(dataNewRequest));
  });
});

// cancel
