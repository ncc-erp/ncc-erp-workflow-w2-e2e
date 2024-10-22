import { DeviceRequestForm } from "../../data/requestTemplate.data";
import { authUserFile, users } from "../../data/users.data";
import { BrowserControl, Given, Then, When } from "../../pageObjects/page.fixture";

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
// I should see request "*global[deviceRequest2]" on tasks page
Then("I should see request {TestData} on tasks page", async ({ PageObjects }, deviceRequest: DeviceRequestForm) => {
  await PageObjects.TaskPage.verifyHasPendingTask(deviceRequest.getTitle(), users.user.name, "PM Reviews");
});

When(
  "I create a new {string} with data {TestData}",
  async ({ PageObjects }, name: string, deviceRequest: DeviceRequestForm) => {
    return await PageObjects.RequestTemplatePage.createRequest(name, deviceRequest);
  }
);
