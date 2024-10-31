import { DeviceRequestForm } from "../../data/requestTemplate.data";
import { authUserFile } from "../../data/users.data";
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

When(
  "I create a new {string} with data {TestData}",
  async ({ PageObjects }, name: string, deviceRequest: DeviceRequestForm) => {
    return await PageObjects.RequestTemplatePage.createRequest(name, deviceRequest);
  }
);

When(
  "I create a new workflow with name as {string} and display name as {string}",
  async ({ PageObjects }, name: string, displayName: string) => {
    await PageObjects.RequestTemplatePage.createWorkflow(name, displayName);
  }
);

When("I import a {string} with file path as {string}", async ({ PageObjects }, type: string, path: string) => {
  await PageObjects.RequestTemplatePage.import(type, path);
});

// When("I export a workflow input with name as {string}", async ({ PageObjects }, name: string) => {
//   await PageObjects.RequestTemplatePage.exportWorkflowInput(name);
// });

When("I click on the close icon in popup with label as {string}", async ({ PageObjects }, popup: string) => {
  await PageObjects.RequestTemplatePage.popup.closePopup(popup);
});

When(
  "I open {string} modal of workflow with name as {string}",
  async ({ PageObjects }, type: "Setting" | "Action", workflowName: string) => {
    return await PageObjects.RequestTemplatePage.openPopupModal(workflowName, type);
  }
);

Then(
  "I should see a record with name as {string}, display name as {string}, and {string} publish status {string}",
  async ({ PageObjects }, name: string, displayName: string, publish: string, status: string) => {
    await PageObjects.RequestTemplatePage.verifyWorkflowDisplay(name, displayName, publish, status);
  }
);

When(
  "I open {string} modal popup of workflow with name as {string} and click on {string} option",
  async ({ PageObjects }, type: "Setting" | "Action", workflowName: string, option: string) => {
    await PageObjects.RequestTemplatePage.openPopupModal(workflowName, type);
    await PageObjects.RequestTemplatePage.clickOptionInSettingModalPopup(option);
  }
);

When("I {string} a workflow with name as {string}", async ({ PageObjects }, action: string, workflowName: string) => {
  await PageObjects.RequestTemplatePage.openPopupModal(workflowName, "Setting");
  await PageObjects.RequestTemplatePage.clickOptionInSettingModalPopup(action);
});
