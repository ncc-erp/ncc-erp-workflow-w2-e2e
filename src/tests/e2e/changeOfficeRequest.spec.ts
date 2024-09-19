import { ChangeOfficeRequestForm } from "../../data/requestTemplate.data";
import { authGDVPDNFile, authGDVPVFile, authPmFile, authUserFile, users } from "../../data/users.data";
import { BrowserControl, test } from "../../pageObjects/page.fixture";
import { approveRequestSteps, userCreateChangeOfficeRequestSteps } from "../../steps/request.step";
import { ChangeOfficeRequestData } from "./../../data/changeOfficeRequest.data";

// create
test.describe("As user, I want to create a Change Office Request @user", () => {
  test.use({ storageState: authUserFile });
  const dataNewRequest = ChangeOfficeRequestData.user.getRandomData();

  test("When I create a new request, I should see the request on my requests", async ({ PageObjects }) => {
    await userCreateChangeOfficeRequestSteps(PageObjects, dataNewRequest);
    /// verify get request
    await PageObjects.MyRequestPage.open();
    await PageObjects.MyRequestPage.table.verifyTextInCol(0, ChangeOfficeRequestData.getTitle(dataNewRequest));
  });
});
// same as flow for PM Reviews, Current HoO Reviews and Destination HoO Reviews
[
  {
    story: "As PM, I want to received a Change Office Request from my project @pm",
    step: "PM Reviews",
    authFile: authPmFile,
  },
  {
    story: "As GDVP, I want to received a Change Office Request from my office @gdvp",
    step: "Current HoO Reviews",
    authFile: authGDVPDNFile,
  },
  {
    story: "As GDVP, I want to received a Change Office Request if anyone come to my office @gdvp",
    step: "Destination HoO Reviews",
    authFile: authGDVPVFile,
  },
].forEach((item) => {
  test.describe(`${item.story}`, () => {
    let dataNewRequest: ChangeOfficeRequestForm;
    test.use({ storageState: item.authFile }); // main context auth
    test.beforeEach(async ({ browser }) => {
      await BrowserControl.withAuth(browser, authUserFile, async ({ PageObjects }) => {
        dataNewRequest = await userCreateChangeOfficeRequestSteps(PageObjects);
      });
    });
    test.describe("when user in my office create a new request", () => {
      test.beforeEach(async ({ PageObjects }) => {
        await PageObjects.TaskPage.open();
      });
      // test.describe.configure({ mode: "parallel" });
      test("I should see the request on my tasks", async ({ PageObjects }) => {
        await PageObjects.TaskPage.verifyHasPendingTask(
          ChangeOfficeRequestData.getTitle(dataNewRequest),
          users.user.name,
          item.step
        );
      });
      test("I should approve success", async ({ PageObjects }) => {
        await PageObjects.TaskPage.taskBoard.clickToBoardItemByTitle(ChangeOfficeRequestData.getTitle(dataNewRequest));
        await PageObjects.TaskPage.detailTaskPopup.approve();
        await PageObjects.TaskPage.verifyHasApproveTask(
          ChangeOfficeRequestData.getTitle(dataNewRequest),
          users.user.name,
          item.step
        );
      });
      test("I should reject success", async ({ PageObjects }) => {
        await PageObjects.TaskPage.taskBoard.clickToBoardItemByTitle(ChangeOfficeRequestData.getTitle(dataNewRequest));
        await PageObjects.TaskPage.detailTaskPopup.reject("reason");
        await PageObjects.TaskPage.verifyHasRejectTask(
          ChangeOfficeRequestData.getTitle(dataNewRequest),
          users.user.name,
          item.step
        );
      });
    });
  });
});

// case IT
test.describe("As user, I want to see a Change Office Request after PM, GDVP1, GDVP2 approved @user", () => {
  let dataNewRequest: ChangeOfficeRequestForm;
  test.use({ storageState: authUserFile }); // main context auth
  test.beforeEach(async ({ browser }) => {
    await BrowserControl.withAuth(browser, authUserFile, async ({ PageObjects }) => {
      dataNewRequest = await userCreateChangeOfficeRequestSteps(PageObjects);
    });
    // PM approve
    await BrowserControl.withAuth(browser, authPmFile, async ({ PageObjects }) => {
      await approveRequestSteps(
        PageObjects,
        ChangeOfficeRequestData.getTitle(dataNewRequest),
        users.user.name,
        "PM Reviews"
      );
    });
    // Current Office approve
    await BrowserControl.withAuth(browser, authGDVPDNFile, async ({ PageObjects }) => {
      await approveRequestSteps(
        PageObjects,
        ChangeOfficeRequestData.getTitle(dataNewRequest),
        users.user.name,
        "Current HoO Reviews"
      );
    });
    // Destination Office approve
    await BrowserControl.withAuth(browser, authGDVPVFile, async ({ PageObjects }) => {
      await approveRequestSteps(
        PageObjects,
        ChangeOfficeRequestData.getTitle(dataNewRequest),
        users.user.name,
        "Destination HoO Reviews"
      );
    });
  });
  test.describe("when PM, Current/Destination HoO approve successfully", () => {
    // test.describe.configure({ mode: "parallel" });
    test("I should see the request with approve status on my tasks", async ({ PageObjects }) => {
      await PageObjects.MyRequestPage.open();
      await PageObjects.MyRequestPage.filterByStatus("Approved");
      await PageObjects.MyRequestPage.table.verifyTextInCol(0, ChangeOfficeRequestData.getTitle(dataNewRequest));
    });
  });
});
// cancel

// cancel
