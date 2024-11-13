import { DataTable } from "playwright-bdd/dist/cucumber/DataTable";
import { API } from "../../data/apis";
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
  "I close popup with label as {string} after create a workflow with name as {string} and display name as {string}",
  async ({ PageObjects }, label: string, name: string, displayName: string) => {
    await PageObjects.RequestTemplatePage.createWorkflow(name, displayName);
    await PageObjects.RequestTemplatePage.popup.closeByTitle(label);
  }
);

When(
  "I create a workflow with name as {string} and display name as {string}",
  async ({ PageObjects }, name: string, displayName: string) => {
    await PageObjects.RequestTemplatePage.createWorkflow(name, displayName);
  }
);

When("I import a workflow with file path as {string}", async ({ PageObjects }, path: string) => {
  await PageObjects.RequestTemplatePage.import(path);
});

When("I import a workflow input with file path as {string}", async ({ PageObjects }, path: string) => {
  await PageObjects.RequestTemplatePage.importInput(path);
});

Then(
  "I should see a record with name as {string}, display name as {string}, and {string} publish status {string}",
  async ({ PageObjects }, name: string, displayName: string, publish: string, status: string) => {
    await PageObjects.RequestTemplatePage.verifyWorkflowDisplay(name, displayName, publish, status);
  }
);

When(
  "I click on {string} option in Setting menu of workflow with name as {string}",
  async ({ PageObjects }, option: string, workflowName: string) => {
    await PageObjects.RequestTemplatePage.openSettingMenuByWorkflowName(workflowName);
    await PageObjects.RequestTemplatePage.clickOptionInSettingMenu(option);
  }
);

When("I input the property below to the workflow", async ({ PageObjects }, dataTable: DataTable) => {
  await PageObjects.RequestTemplatePage.inputProperty(dataTable);
  await Promise.all([
    PageObjects.RequestTemplatePage.page.waitForResponse(API.saveWorkflowInput),
    PageObjects.RequestTemplatePage.page.waitForResponse(API.listAll),
    PageObjects.RequestTemplatePage.button.clickByName("Save"),
  ]);
});

Then(
  "I open Action modal popup of workflow with name as {string} to see the property display",
  async ({ PageObjects }, workflowName: string, dataTable: DataTable) => {
    await PageObjects.RequestTemplatePage.openActionPopupByWorkflowName(workflowName);
    await PageObjects.RequestTemplatePage.verifyFieldDisplayInActionPopup(dataTable);
  }
);

When(
  "I open Define Input popup of {string} workflow to remove property",
  async ({ PageObjects }, workflowName: string, dataTable: DataTable) => {
    await PageObjects.RequestTemplatePage.openSettingMenuByWorkflowName(workflowName);
    await PageObjects.RequestTemplatePage.menuItem.clickByName("Define Input");
    await PageObjects.RequestTemplatePage.removeProperty(dataTable);
    await PageObjects.RequestTemplatePage.button.clickByName("Save");
  }
);

Then(
  "I see options display below Property Type dropdown list of property {string}",
  async ({ PageObjects }, property: string, dataTable: DataTable) => {
    await PageObjects.RequestTemplatePage.verifyPropertyTypeDropdown(property, dataTable);
  }
);

When("I click on Property Type dropdown list of property {string}", async ({ PageObjects }, property: string) => {
  await PageObjects.RequestTemplatePage.selectTypeDropdownByPropertyName(property);
});

Then(
  "I should see Published field of the {string} workflow as {string}",
  async ({ PageObjects }, workflowName: string, status: string) => {
    await PageObjects.RequestTemplatePage.verifyWorkflowStatus(workflowName, status);
  }
);

When(
  "I save the imported data with color as {string}, title as {string} and below property in {string} workflow Define Input popup",
  async ({ PageObjects }, color: string, title: string, workflowName: string, dataTable: DataTable) => {
    await PageObjects.RequestTemplatePage.verifyWorkflowColor(color, workflowName);
    await PageObjects.RequestTemplatePage.verifyWorkflowTitle(title);
    await PageObjects.RequestTemplatePage.verifyProperty(dataTable);
    await PageObjects.RequestTemplatePage.button.clickByName("Save");
  }
);

Then("I should see the property display in Define Input popup", async ({ PageObjects }, dataTable: DataTable) => {
  await PageObjects.RequestTemplatePage.verifyProperty(dataTable);
});

When("I delete the workflow with name as {string}", async ({ PageObjects }, workflowName: string) => {
  await PageObjects.RequestTemplatePage.deleteWorkflowByName(workflowName);
});

When("I click on Yes button to delete the workflow", async ({ PageObjects }) => {
  await Promise.all([
    PageObjects.RequestTemplatePage.page.waitForResponse(API.listAll),
    PageObjects.RequestTemplatePage.button.clickByName("Yes"),
  ]);
});

When("I open Setting menu of workflow with name as {string}", async ({ PageObjects }, workflowName: string) => {
  await PageObjects.RequestTemplatePage.openSettingMenuByWorkflowName(workflowName);
});

Then(
  "I should see {string} workflow {string} in the Type dropdown on the page",
  async ({ PageObjects }, workflowDisplayName: string, status: string, dataTable: DataTable) => {
    await PageObjects.RequestTemplatePage.verifyNewWorkflowInTypeDropDown(workflowDisplayName, status, dataTable);
  }
);

When(
  "I click on {string} option in the menu item to change workflow status",
  async ({ PageObjects }, option: string) => {
    await Promise.all([
      PageObjects.RequestTemplatePage.page.waitForResponse(API.changeWorkflowStatus),
      PageObjects.RequestTemplatePage.menuItem.clickByName(option),
    ]);
  }
);
