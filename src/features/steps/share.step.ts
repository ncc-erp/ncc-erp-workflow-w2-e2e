import path from "path";
import { DataTable } from "playwright-bdd";
import { BasePage } from "../../pageObjects/base.page";
import Button from "../../pageObjects/components/button";
import Popup from "../../pageObjects/components/popup";
import { expect, Given, Then, When } from "../../pageObjects/page.fixture";
import { checkColor } from "../../utils/checkColor";
import { chooseFile } from "../../utils/chooseFile";
import { convertHexToRGB } from "../../utils/convertHexToRGB";

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

Then("I delete the record with name as {string}", async ({ page }, expectedName: string) => {
  await page.getByRole("row", { name: expectedName }).getByRole("button").first().click();
  await page.getByRole("menuitem", { name: "Delete" }).click();
  await page.getByRole("button", { name: "Yes" }).click();
  await expect(page.getByText("Do you want to delete")).toBeHidden();
});

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

Then(
  "I should see the color as {string}, title as {string} in {string} workflow Define Input popup",
  async ({ page }, color: string, title: string, name: string) => {
    const expectedRGBcolor = convertHexToRGB(color);
    await checkColor(
      page
        .locator("div")
        .filter({ hasText: new RegExp("^Color:" + name + "$") })
        .locator("div")
        .nth(3),
      "background",
      await expectedRGBcolor
    );
    await expect(page.getByTestId("title").getByRole("textbox")).toHaveValue(title);
    await expect(page.getByLabel("Define Workflow Input")).toContainText(name);
  }
);

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
