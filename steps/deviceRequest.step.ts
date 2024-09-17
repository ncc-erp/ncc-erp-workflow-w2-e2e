import { DeviceRequestData } from "../data/deviceRequests.data";
import { DeviceRequestForm } from "../pageObjects/components/deviceRequest";
import { PageObjects } from "./../pageObjects/page.fixture";

export const userCreateRequestSteps = async (pages: PageObjects, _dataNewRequest?: DeviceRequestForm) => {
  const dataNewRequest = _dataNewRequest || DeviceRequestData.user.getRandomDeviceRequest();
  await pages.RequestTemplatePage.open();
  await pages.RequestTemplatePage.verifyPageLocated();
  await pages.RequestTemplatePage.createDeviceRequest(dataNewRequest);

  return dataNewRequest;
};
