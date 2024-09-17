import { DeviceRequestData } from "../data/deviceRequests.data";
import { users } from "../data/users.data";
import { DeviceRequestForm } from "../pageObjects/components/deviceRequest";
import { PageObjects } from "./../pageObjects/page.fixture";

export const userCreateDeviceRequestSteps = async (pages: PageObjects, _dataNewRequest?: DeviceRequestForm) => {
  const dataNewRequest = _dataNewRequest || DeviceRequestData.user.getRandomDeviceRequest();
  await pages.RequestTemplatePage.open();
  await pages.RequestTemplatePage.verifyPageLocated();
  await pages.RequestTemplatePage.createDeviceRequest(dataNewRequest);

  return dataNewRequest;
};

export const pmApproveDeviceRequestSteps = async (pages: PageObjects, _dataNewRequest?: DeviceRequestForm) => {
  const dataNewRequest = _dataNewRequest || DeviceRequestData.user.getRandomDeviceRequest();
  await pages.TaskPage.open();
  await pages.TaskPage.taskBoard.clickToBoardItemByTitle(dataNewRequest.device);
  await pages.TaskPage.detailTaskPopup.approve();
  await pages.TaskPage.verifyHasApproveTask(dataNewRequest.device, users.user.name, "PM Reviews");
  return dataNewRequest;
};
