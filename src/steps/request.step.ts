import { ChangeOfficeRequestData } from "../data/changeOfficeRequest.data";
import { DeviceRequestData } from "../data/deviceRequest.data";
import { ChangeOfficeRequestForm, DeviceRequestForm, RequestTypeData } from "../data/requestTemplate.data";
import { PageObjects } from "../pageObjects/page.fixture";

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
  await pages.TaskPage.taskBoard.clickToBoardItemByTitle(title);
  await pages.TaskPage.detailTaskPopup.approve();
  await pages.TaskPage.verifyHasApproveTask(title, requestUser, step);
  // return dataNewRequest;
};