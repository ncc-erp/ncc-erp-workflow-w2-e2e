import { ChangeOfficeRequestData } from "../data/changeOfficeRequest.data";
import { DeviceRequestData } from "../data/deviceRequest.data";
import {
  ChangeOfficeRequestForm,
  DeviceRequestForm,
  Pointer,
  RequestFormType,
  RequestTypeData,
} from "../data/requestTemplate.data";
import { users } from "../data/users.data";
import { PageObjects, test } from "../pageObjects/page.fixture";

export const userCreateDeviceRequestSteps = async (pages: PageObjects, _dataNewRequest?: DeviceRequestForm) => {
  const dataNewRequest = _dataNewRequest || DeviceRequestData.user.getRandomData();
  await pages.RequestTemplatePage.open();
  await pages.RequestTemplatePage.verifyPageLocated();
  await pages.RequestTemplatePage.createRequest(RequestTypeData.DeviceRequest.name, dataNewRequest);

  return dataNewRequest;
};

export const userCreateChangeOfficeRequestSteps = async (
  pages: PageObjects,
  _dataNewRequest?: ChangeOfficeRequestForm
) => {
  const dataNewRequest = _dataNewRequest || ChangeOfficeRequestData.user.getRandomData();
  await pages.RequestTemplatePage.open();
  await pages.RequestTemplatePage.verifyPageLocated();
  await pages.RequestTemplatePage.createRequest(RequestTypeData.ChangeOfficeRequest.name, dataNewRequest);

  return dataNewRequest;
};

export const approveRequestSteps = async (pages: PageObjects, title: string, requestUser: string, step: string) => {
  // const dataNewRequest = _dataNewRequest || DeviceRequestData.user.getRandomData();
  await pages.TaskPage.open();
  await pages.TaskPage.taskBoard.clickToBoardItemByTitle(title, 0);
  await pages.TaskPage.detailTaskPopup.approve();
  await pages.TaskPage.verifyHasApproveTask(title, requestUser, step);
  // return dataNewRequest;
};

// common
export const testTaskAssigned = (action: string, step: string, dataNewRequest: Pointer<RequestFormType>) => {
  test.describe(`${action}`, () => {
    test.beforeEach(async ({ PageObjects }) => {
      await PageObjects.TaskPage.open();
    });
    // test.describe.configure({ mode: "parallel" });
    test("I should see the request on my tasks", async ({ PageObjects }) => {
      await PageObjects.TaskPage.taskBoard.verifyHasTask(0, dataNewRequest.value.getTitle(), users.user.name, step);
    });
    test("I should approve success", async ({ PageObjects }) => {
      await PageObjects.TaskPage.taskBoard.clickToBoardItemByTitle(dataNewRequest.value.getTitle(), 0);
      await PageObjects.TaskPage.detailTaskPopup.approve();
      await PageObjects.TaskPage.taskBoard.verifyHasTask(1, dataNewRequest.value.getTitle(), users.user.name, step);
    });
    test("I should reject success", async ({ PageObjects }) => {
      await PageObjects.TaskPage.taskBoard.clickToBoardItemByTitle(dataNewRequest.value.getTitle(), 0);
      await PageObjects.TaskPage.detailTaskPopup.reject("reason");
      await PageObjects.TaskPage.taskBoard.verifyHasTask(2, dataNewRequest.value.getTitle(), users.user.name, step);
    });
  });
};
