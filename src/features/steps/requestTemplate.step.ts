import { DataTable } from "playwright-bdd/dist/cucumber/DataTable";
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
  "I open Setting modal popup of workflow with display name as {string} and click on {string} option",
  async ({ PageObjects }, workflowDisplayName: string, option: string) => {
    await PageObjects.RequestTemplatePage.openPopupModal(workflowDisplayName, "Setting");
    await PageObjects.RequestTemplatePage.clickOptionInSettingModalPopup(option);
  }
);

When("I {string} a workflow with name as {string}", async ({ PageObjects }, action: string, workflowName: string) => {
  await PageObjects.RequestTemplatePage.openPopupModal(workflowName, "Setting");
  await PageObjects.RequestTemplatePage.clickOptionInSettingModalPopup(action);
});

When(
  "I input property with data below in Define Input popup of workflow with display name as {string}",
  async ({ PageObjects }, workflowDisplayName: string, dataTable: DataTable) => {
    await PageObjects.RequestTemplatePage.openPopupModal(workflowDisplayName, "Setting");
    await PageObjects.RequestTemplatePage.clickOptionInSettingModalPopup("Define Input");
    await PageObjects.RequestTemplatePage.inputProperty(dataTable);
    await PageObjects.RequestTemplatePage.button.clickButtonByName("Save");
  }
);

Then(
  "I open Action modal popup of workflow with display name as {string} to see the property display",
  async ({ PageObjects }, workflowDisplayName: string, dataTable: DataTable) => {
    await PageObjects.RequestTemplatePage.openPopupModal(workflowDisplayName, "Action");
    await PageObjects.RequestTemplatePage.verifyFieldInActionPopup(dataTable);
    await PageObjects.RequestTemplatePage.popup.closePopup(workflowDisplayName);
  }
);

When(
  "I open Define Input popup of {string} workflow to remove property",
  async ({ PageObjects }, workflowName: string, dataTable: DataTable) => {
    await PageObjects.RequestTemplatePage.openPopupModal(workflowName, "Setting");
    await PageObjects.RequestTemplatePage.clickOptionInSettingModalPopup("Define Input");
    await PageObjects.RequestTemplatePage.removeProperty(dataTable);
  }
);

Then("I should see the remaining Remove button as disabled status", async ({ PageObjects }) => {
  await PageObjects.RequestTemplatePage.verifyRemovePropertyButtonStatus();
});

Then("I should see the property display in Define Input popup", async ({ PageObjects }, dataTable: DataTable) => {
  await PageObjects.RequestTemplatePage.verifyProperty(dataTable);
  await PageObjects.RequestTemplatePage.button.clickButtonByName("Save");
});

Then(
  "I see options display below Property Type dropdown list of property {string}",
  async ({ PageObjects }, property: string, dataTable: DataTable) => {
    await PageObjects.RequestTemplatePage.verifyPropertyTypeDropdown(property, dataTable);
  }
);

When("I click on Property Type dropdown list of property {string}", async ({ PageObjects }, property: string) => {
  await PageObjects.RequestTemplatePage.selectPropertyType(property);
});

Then(
  "I should see Published field of the {string} workflow as {string}",
  async ({ PageObjects }, workflowName: string, status: string) => {
    await PageObjects.RequestTemplatePage.verifyWorkflowStatus(workflowName, status);
  }
);

Then(
  "I should see the color as {string}, title as {string} in {string} workflow Define Input popup",
  async ({ PageObjects }, color: string, title: string, workflowName: string) => {
    await PageObjects.RequestTemplatePage.verifyColorWorkflow(color, workflowName);
    await PageObjects.RequestTemplatePage.verifyTitleWorkflow(title);
  }
);

Then("I delete the workflow with name below", async ({ PageObjects }, dataTable: DataTable) => {
  await PageObjects.RequestTemplatePage.deleteMultiWorkflow(dataTable);
});

When("I delete the workflow with name as {string}", async ({ PageObjects }, workflowName: string) => {
  await PageObjects.RequestTemplatePage.deleteWorkflow(workflowName);
});
