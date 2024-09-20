import { ChangeOfficeRequestForm, Pointer } from "../../data/requestTemplate.data";
import { authGDVPDNFile, authGDVPVFile, authPmFile, authUserFile, users } from "../../data/users.data";
import { BrowserControl, test } from "../../pageObjects/page.fixture";
import { approveRequestSteps, testTaskAssigned, userCreateChangeOfficeRequestSteps } from "../../steps/request.step";
import { ChangeOfficeRequestData } from "./../../data/changeOfficeRequest.data";

// create
test.describe("As user, I want to create a Change Office Request @user", () => {
  test.use({ storageState: authUserFile });
  const dataNewRequest = ChangeOfficeRequestData.user.getRandomData();

  test("When I create a new request, I should see the request on my requests", async ({ PageObjects }) => {
    await userCreateChangeOfficeRequestSteps(PageObjects, dataNewRequest);
    /// verify get request
    await PageObjects.MyRequestPage.open();
    await PageObjects.MyRequestPage.table.verifyTextInCol(0, dataNewRequest.getTitle());
  });
});
// same as flow for PM Reviews, Current HoO Reviews and Destination HoO Reviews
[
  {
    story: "As pm, I want to received a Change Office Request from my project",
    step: "PM Reviews",
    authFile: authPmFile,
    user: "pm",
  },
  {
    story: "As gdvp, I want to received a Change Office Request from my office",
    step: "Current HoO Reviews",
    authFile: authGDVPDNFile,
    user: "gdvp",
  },
  {
    story: "As gdvp, I want to received a Change Office Request if anyone come to my office",
    step: "Destination HoO Reviews",
    authFile: authGDVPVFile,
    user: "gdvp",
  },
].forEach((item) => {
  test.describe(`${item.story}`, () => {
    let dataNewRequest: Pointer<ChangeOfficeRequestForm> = {};
    test.use({ storageState: item.authFile }); // main context auth
    test.beforeEach(async ({ browser }) => {
      await BrowserControl.withAuth(browser, authUserFile, async ({ PageObjects }) => {
        dataNewRequest.value = await userCreateChangeOfficeRequestSteps(PageObjects);
      });
    });
    testTaskAssigned(
      `As ${item.user}, when user in my office create a new request @${item.user}`,
      item.step,
      dataNewRequest
    );
  });
});

test.describe("As user, I want to see a Change Office Request after PM, GDVP1, GDVP2 approved", () => {
  let dataNewRequest: ChangeOfficeRequestForm;
  test.use({ storageState: authUserFile }); // main context auth
  test.beforeEach(async ({ browser }) => {
    await BrowserControl.withAuth(browser, authUserFile, async ({ PageObjects }) => {
      dataNewRequest = await userCreateChangeOfficeRequestSteps(PageObjects);
    });
    // PM approve
    await BrowserControl.withAuth(browser, authPmFile, async ({ PageObjects }) => {
      await approveRequestSteps(PageObjects, dataNewRequest.getTitle(), users.user.name, "PM Reviews");
    });
    // Current Office approve
    await BrowserControl.withAuth(browser, authGDVPDNFile, async ({ PageObjects }) => {
      await approveRequestSteps(PageObjects, dataNewRequest.getTitle(), users.user.name, "Current HoO Reviews");
    });
    // Destination Office approve
    await BrowserControl.withAuth(browser, authGDVPVFile, async ({ PageObjects }) => {
      await approveRequestSteps(PageObjects, dataNewRequest.getTitle(), users.user.name, "Destination HoO Reviews");
    });
  });
  test.describe("As user, when PM, Current/Destination HoO approve successfully @user", () => {
    // test.describe.configure({ mode: "parallel" });
    test("I should see the request with approve status on my requests", async ({ PageObjects }) => {
      await PageObjects.MyRequestPage.open();
      await PageObjects.MyRequestPage.filterByStatus("Approved");
      await PageObjects.MyRequestPage.table.verifyTextInCol(0, dataNewRequest.getTitle());
    });
  });
});
