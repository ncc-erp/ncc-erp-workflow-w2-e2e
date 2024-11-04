import { DataTable } from "playwright-bdd";
import { API } from "../../data/apis";
import { BasePage } from "../../pageObjects/base.page";
import Button from "../../pageObjects/components/button";
import { expect, Given, Then, When } from "../../pageObjects/page.fixture";
import { checkColor } from "../../utils/checkColor";
import { chooseFile } from "../../utils/chooseFile";
import { convertHexToRGB } from "../../utils/convertHexToRGB";

Given("I am on {string}", async ({ PageObjects }, page: string) => {
  await (PageObjects[page] as BasePage).open();
});

Then("I should see in title {string}", async ({ PageObjects }, title: string) => {
  await PageObjects.LoginPage.verifyTitle(title);
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
  const actualMsg = page.locator("#toast-1").nth(1);
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
  expect(download.suggestedFilename()).toBe(fileName);
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

When("I click on {string} option", async ({ page }, option: string) => {
  await page.getByRole("menuitem", { name: option }).click();
  if (option === "Publish" || option === "Unpublish") {
    await page.waitForResponse(API.changeWorkflowStatus);
    await new Promise<void>((resolve) => setTimeout(resolve, 120000)); // Wait 2 minutes after response
  }
});

Then(
  "I should see Published field of the {string} workflow as {string}",
  async ({ page }, name: string, status: string) => {
    const rowCount = await page.getByRole("row").count();
    for (let i = 1; i < rowCount; i++) {
      if ((await page.locator("tr:nth-child(" + i + ") > td:nth-child(2)").innerText()) === name) {
        await expect(page.locator("tr:nth-child(" + i + ") > td:nth-child(4)")).toContainText(status);
        break;
      }
    }
  }
);

When("I click on Property Type dropdown list of property {string}", async ({ page }, property: string) => {
  const propertyCount = await page.getByText("Property Name *").count();
  for (let i = 0; i < propertyCount; i++) {
    if (
      (await page
        .getByTestId("items." + i + ".name")
        .getByRole("textbox")
        .inputValue()) === property
    ) {
      await page
        .getByTestId("items." + i + ".type")
        .getByRole("combobox")
        .click();
      break;
    }
  }
});

Then(
  "I see options display below Property Type dropdown list of property {string}",
  async ({ page }, property: string, dataTable: DataTable) => {
    const propertyCount = await page.getByText("Property Name *").count();
    const expectedOptions = dataTable.rows().map((row) => row[0]);
    for (let i = 0; i < propertyCount; i++) {
      if (
        (await page
          .getByTestId("items." + i + ".name")
          .getByRole("textbox")
          .inputValue()) === property
      ) {
        const actualOptions = (
          await page
            .getByTestId("items." + i + ".type")
            .getByRole("combobox")
            .innerText()
        )
          .split("\n")
          .map((option) => option);
        expect(actualOptions).toEqual(expectedOptions);
        break;
      }
    }
  }
);

When("I open Setting modal of workflow with name as {string}", async ({ page }, workflow: string) => {
  await page.getByRole("row", { name: workflow }).getByRole("button").first().click();
});

When("I click on {string} button", async ({ page }, buttonName: string) => {
  const button = new Button(page);
  await button.verifyButtonDisplay(buttonName);
  await button.clickButtonByName(buttonName);
  if (buttonName === "Yes") {
    await expect(page.getByText("Do you want to delete")).toBeHidden();
  }
});
