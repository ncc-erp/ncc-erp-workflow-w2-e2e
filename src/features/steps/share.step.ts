import path from "path";
import { DataTable } from "playwright-bdd";
import { BasePage } from "../../pageObjects/base.page";
import Button from "../../pageObjects/components/button";
import Popup from "../../pageObjects/components/popup";
import { expect, Given, Then, When } from "../../pageObjects/page.fixture";
import { chooseFile } from "../../utils/chooseFile";

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

When("I upload a file with path {string}", async ({ page }, path: string) => {
  await chooseFile(page, path, page.getByRole("textbox"));
  await expect(page.getByText("No data imported !")).toBeHidden();
});

Then("I should see a file with name as {string} downloaded successfully", async ({ page }, fileName: string) => {
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export" }).click();
  const download = await downloadPromise;
  await download.saveAs(path.join(__dirname, `../../data/downloads`, download.suggestedFilename()));
  expect(download.suggestedFilename()).toBe(fileName);
  const popup = new Popup(page);
  await popup.closePopup("Define Workflow Input");
});

When("I click on {string} button", async ({ page }, buttonName: string) => {
  const button = new Button(page);
  await button.verifyButtonDisplay(buttonName);
  await button.clickButtonByName(buttonName);
  if (buttonName === "Yes") {
    await expect(page.getByText("Do you want to delete")).toBeHidden();
  }
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
