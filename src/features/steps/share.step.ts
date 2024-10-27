import { DataTable } from "playwright-bdd";
import { users } from "../../data/users.data";
import { BasePage } from "../../pageObjects/base.page";
import { expect, Given, test, Then, When } from "../../pageObjects/page.fixture";
import { chooseFile } from "../../utils/chooseFile";
import { BasePage } from "../../pageObjects/base.page";
import { Given, Then, When } from "../../pageObjects/page.fixture";

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

When("I click on {string} button", async ({ page }, name: string) => {
  await page.getByRole("button", { name: `${name}` }).click();
});

When("I fill {string} into {string} field", async ({ page }, data: string, field: string) => {
  await page
    .getByPlaceholder(field, {
      exact: true,
    })
    .fill(data);
});

When("I click on close icon", async ({ page }) => {
  await page.getByLabel("Workflow Detail").getByLabel("Close").click();
});

When("I click on the close icon in {string} popup", async ({ page }, popup: string) => {
  await page.getByLabel(popup).getByLabel("Close").click();
});

Then(
  "I should see a new record with name as {string}, display name as {string} and {string} publish status {string}",
  async ({ PageObjects }, name: string, displayName: string, publish: string, status: string) => {
    await PageObjects.RequestTemplatePage.verifyWorkflowDisplay(name, displayName, publish, status);
  }
);

Then("I delete the record with name as {string}", async ({ page }, expectedName: string) => {
  await page.getByRole("row", { name: expectedName }).getByRole("button").first().click();
  await page.getByRole("menuitem", { name: "Delete" }).click();
  await page.getByRole("button", { name: "Yes" }).click();
});

Then("I should see {string} toast message display", async ({ page }, message: string) => {
  const actualMsg = page.locator("#toast-1").nth(1);
  await expect(actualMsg).toHaveText(message);
});

When("I upload a file with path {string}", async ({ page }, path: string) => {
  await chooseFile(page, path, page.getByRole("textbox"));
});

When("I open {string} of {string} workflow", async ({ page }, option: string, expectedName: string) => {
  await page.getByRole("row", { name: expectedName }).getByRole("button").first().click();
  await page.getByRole("menuitem", { name: option }).click();
});

Then("I should see a file with name as {string} downloaded successfully", async ({ page }, fileName: string) => {
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe(fileName);
});

function convertHexToRGB(hex) {
  hex = hex.replace(/^#/, "");
  const red = parseInt(hex.substring(0, 2), 16);
  const green = parseInt(hex.substring(2, 4), 16);
  const blue = parseInt(hex.substring(4, 6), 16);
  return {
    red: red,
    green: green,
    blue: blue,
  };
}

async function checkColor(element, cssProperty, rgbColors) {
  const cssValue = await element.evaluate((el: Element, cssProperty) => {
    return window.getComputedStyle(el).getPropertyValue(cssProperty);
  }, cssProperty);
  const expectedColor = `rgb(${rgbColors.red}, ${rgbColors.green}, ${rgbColors.blue})`;
  expect(cssValue).toContain(expectedColor);
}

Then(
  "I should see the color as {string}, title as {string} and these Properties of {string} workflow display",
  async ({ page }, color: string, title: string, name: string, dataTable: DataTable) => {
    const expectedRGBcolor = convertHexToRGB(color);
    await checkColor(
      page
        .locator("div")
        .filter({ hasText: new RegExp(`^Color:${name}$`) })
        .locator("div")
        .nth(3),
      "background",
      expectedRGBcolor
    );
    await expect(page.getByTestId("title").getByRole("textbox")).toHaveValue(title);
    await expect(page.getByLabel("Define Workflow Input")).toContainText(name);
    const properties = dataTable.hashes();
    const propertyCount = await page.getByText("Property Name *").count();
    for (let i = 0; i < propertyCount; i++) {
      const propertyName = properties[i].propertyName;
      const type = properties[i].type;
      const required = properties[i].required;
      await expect(page.getByTestId("items." + i + ".name").getByRole("textbox")).toHaveValue(propertyName);
      await expect(page.getByTestId("items." + i + ".type").getByRole("combobox")).toHaveValue(type);
      await expect(page.getByText("Property Name *Property").nth(i).locator("span").nth(1))[
        required ? "toHaveAttribute" : "not.toHaveAttribute"
      ]("data-checked");
    }
  }
);

When("I open Setting modal of {string} workflow", async ({ page }, workflow: string) => {
  await page.getByRole("row", { name: workflow }).getByRole("button").first().click();
});

When("I click on {string} option", async ({ page }, option: string) => {
  await page.getByRole("menuitem", { name: option }).click();
});

Then(
  "I should see Published field of the {string} workflow as {string}",
  async ({ page }, name: string, status: string) => {
    const rowCount = await page.getByRole("row").count();
    for (let i = 0; i <= rowCount; i++) {
      if ((await page.locator("tr:nth-child(" + (i + 1) + ") > td:nth-child(2)").innerText()) === name) {
        await expect(page.locator("tr:nth-child(" + (i + 1) + ") > td:nth-child(4)")).toContainText(status);
        break;
      }
    }
  }
);
