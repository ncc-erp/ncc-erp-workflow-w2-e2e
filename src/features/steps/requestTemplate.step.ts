import { DeviceRequestForm } from "../../data/requestTemplate.data";
import { authUserFile } from "../../data/users.data";
import { BrowserControl, Given, When } from "../../pageObjects/page.fixture";

// User create Device Request "*testData[random_device_request]__global[deviceRequest2]" success
Given(
  "User create {string} with {TestData} success",
  async ({ browser }, name: string, deviceRequest: DeviceRequestForm) => {
    const response = await BrowserControl.withAuth(browser, authUserFile, async ({ PageObjects }) => {
      await PageObjects.RequestTemplatePage.open();
      await PageObjects.RequestTemplatePage.verifyPageLocated();
      const response = await PageObjects.RequestTemplatePage.createRequest(name, deviceRequest);

      return response;
    });

    return response;
  }
);

When(
  "I create a new {string} with data {TestData}",
  async ({ PageObjects }, name: string, deviceRequest: DeviceRequestForm) => {
    return await PageObjects.RequestTemplatePage.createRequest(name, deviceRequest);
  }
);

When(
  "I create a new workflow with name as {string} and display name as {string}",
  async ({ PageObjects }, name: string, displayName: string) => {
    return await PageObjects.form.fillByLabel("Name", name);
    return await PageObjects.form.fillByLabel("Display Nam", displayName);
  }
);
