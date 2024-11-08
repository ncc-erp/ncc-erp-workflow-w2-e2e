import fs from "fs";
import path from "path";
import { DataTable } from "playwright-bdd";
import { BasePage } from "../../pageObjects/base.page";
import Button from "../../pageObjects/components/button";
import MenuItem from "../../pageObjects/components/menuItem";
import Popup from "../../pageObjects/components/popup";
import { expect, Given, Then, When } from "../../pageObjects/page.fixture";

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
Given("Following test data", async ({ WorldObject }, dataTest: DataTable) => {
  // set test data
  const data = dataTest.hashes();
  if (data.length === 0) {
    throw new Error("test data is invalid");
  }
  // WorldObject.DataTests = data;
  WorldObject.DataTest = data.at(0);
});

When("I close popup with label as {string}", async ({ page }, label: string) => {
  const popup = new Popup(page);
  await popup.closeByTitle(label);
});

When("I click on {string} option in the menu item display", async ({ page }, option: string) => {
  const menuItem = new MenuItem(page);
  await menuItem.clickByName(option);
});
