import crypto from "crypto";
import fs from "fs";
import path from "path";
import { DataTable } from "playwright-bdd";
import { BasePage } from "../../pageObjects/base.page";
import Button from "../../pageObjects/components/button";
import LeftSideMenu from "../../pageObjects/components/leftSideMenu";
import MenuItem from "../../pageObjects/components/menuItem";
import Popup from "../../pageObjects/components/popup";
import StatusDropdown from "../../pageObjects/components/statusDropdown";
import WorkflowTag from "../../pageObjects/components/workflowTag";
import WorkflowTypeDropdown from "../../pageObjects/components/workflowTypeDropdown";
import { expect, Given, Then, When } from "../../pageObjects/page.fixture";
import { Storage } from "../../pageObjects/storage/storage";
import { verifyMail } from "../../utils/email";
import { verifyNotification } from "../../utils/komuNotification";
import { waitLoading } from "../../utils/waitLoading";

Given("I am on {string}", async ({ PageObjects }, page: string) => {
  await (PageObjects[page] as BasePage).open();
});

When(
  "I login with username {string} and password {string}",
  async ({ PageObjects }, username: string, password: string) => {
    await PageObjects.LoginPage.login(username, password);
  }
);

Then("I should see {string}", async ({ PageObjects }, page: string) => {
  await (PageObjects[page] as BasePage).verifyPageLocated();
});

Then("I logout", async ({ PageObjects }) => {
  await PageObjects.RequestTemplatePage.header.logout();
});
///

Then("I should see {string} toast message display", async ({ page }, message: string) => {
  const actualMsg = page.locator('[id^="toast-"]').nth(1);
  await expect(actualMsg).toHaveText(message);
});

When("I click on {string} button", async ({ page }, buttonName: string) => {
  const button = new Button(page);
  await button.clickByName(buttonName);
});

When("I click on Export button", async ({ page }) => {
  const downloadPromise = page.waitForEvent("download");
  const button = new Button(page);
  await button.clickByName("Export");
  const download = await downloadPromise;
  const downloadPath = path.join(__dirname, `../../data/downloads`, download.suggestedFilename());
  await download.saveAs(downloadPath);
});

Then("I should see a file with name as {string} downloaded successfully", async ({}, fileName: string) => {
  const downloadPath = path.join(__dirname, `../../data/downloads`, fileName);
  expect(fs.existsSync(downloadPath)).toBe(true);
});

// support only one row now
Given("Following test data", async ({ WorldObject, $testInfo }, dataTest: DataTable) => {
  // Generate key based on selected parts of titlePath
  const selectedParts = $testInfo.titlePath.slice(0, -1).join(" > ");
  const key = crypto.createHash("sha256").update(selectedParts).digest("hex");
  const item = Storage.getData(key);

  if (item) {
    WorldObject.DataTest = item;
  } else {
    // set test data
    const data = dataTest.hashes();
    if (data.length === 0) {
      throw new Error("test data is invalid");
    }

    Storage.setData(key, data.at(0));
    WorldObject.DataTest = data.at(0);
  }
});

When("I close popup with label as {string}", async ({ page }, label: string) => {
  const popup = new Popup(page);
  await popup.closeByTitle(label);
});

When("I click on {string} option in the menu item display", async ({ page }, option: string) => {
  const menuItem = new MenuItem(page);
  await menuItem.clickByName(option);
});

Given("I click on Type dropdown", async ({ page }) => {
  const workflowTypeDropdown = new WorkflowTypeDropdown(page);
  await workflowTypeDropdown.typeDropdown.click();
});

Given("I should see these option below Status dropdown", async ({ page }, dataTable: DataTable) => {
  const statusDropdown = new StatusDropdown(page);
  await statusDropdown.verifyStatusDropdownOptions(dataTable);
});

When("I click on {string} from the Type dropdown", async ({ page }, option: string) => {
  const workflowTypeDropdown = new WorkflowTypeDropdown(page);
  await workflowTypeDropdown.typeDropdown.click();
  await workflowTypeDropdown.typeDropdown.selectOption(option);
});

Then("I should see all request with tag as {string} display", async ({ page }, workflowDisplayName: string) => {
  const workflowTag = new WorkflowTag(page);
  await workflowTag.verifyWorkflowTag(workflowDisplayName);
});

Given("I click on Status dropdown", async ({ page }) => {
  const statusDropdown = new StatusDropdown(page);
  await statusDropdown.locator.click();
});

When("I click on {string} option from the Status dropdown", async ({ page }, option: string) => {
  const statusDropdown = new StatusDropdown(page);
  await statusDropdown.locator.click();
  await statusDropdown.locator.selectOption(option);
  await waitLoading(page);
});

Then("I should see an email send to {string} with subject {string}", async ({}, email: string, subject: string) => {
  await verifyMail(email, subject);
});

Then(
  "I should see a komu notification sent to {string} with message {string}",
  async ({}, userName: string, message: string) => {
    await verifyNotification(userName, message);
  }
);

Then("I should see these Navigation Links on Left Side Menu", async ({ page }, dataTable: DataTable) => {
  await waitLoading(page);
  const leftSideMenu = new LeftSideMenu(page);
  await leftSideMenu.verifyNavigationLinks(dataTable);
});
