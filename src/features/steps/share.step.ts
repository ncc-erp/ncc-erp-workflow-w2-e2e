import { DataTable } from "playwright-bdd";
import { BasePage } from "../../pageObjects/base.page";
import { expect, Given, Then, When } from "../../pageObjects/page.fixture";
import { chooseFile } from "../../utils/chooseFile";

Given("I am on {string}", async ({ PageObjects }, page: string) => {
  await (PageObjects[page] as BasePage).open();
});

// Then("I should see in title {string}", async ({ PageObjects }, title: string) => {
//   await PageObjects.LoginPage.verifyTitle(title);
// });

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
  "I should see a record with name as {string}, display name as {string} and {string} publish status {string}",
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
      expectedRGBcolor
    );
    await expect(page.getByTestId("title").getByRole("textbox")).toHaveValue(title);
    await expect(page.getByLabel("Define Workflow Input")).toContainText(name);
  }
);

Then("I should see the property display in Define Input popup", async ({ page }, dataTable: DataTable) => {
  const properties = dataTable.hashes();
  const propertyCount = await page.getByText("Property Name *").count();
  for (let i = 0; i < propertyCount; i++) {
    const propertyName = properties[i].propertyName;
    const type = properties[i].type;
    const required = properties[i].required;
    await expect(page.getByTestId("items." + i + ".name").getByRole("textbox")).toHaveValue(propertyName);
    await expect(page.getByTestId("items." + i + ".type").getByRole("combobox")).toHaveValue(type);
    await expect(page.getByText("Property Name *Property").nth(i).locator("span").nth(1))[
      required === "true" ? "toHaveAttribute" : "not.toHaveAttribute"
    ]("data-checked");
  }
});

When("I click on {string} option", async ({ page }, option: string) => {
  await page.getByRole("menuitem", { name: option }).click();
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

When("I input property with data below", async ({ page }, dataTable: DataTable) => {
  const properties = dataTable.hashes();
  const expectedRowCount = Math.max(...properties.map((property) => Number(property.row)));
  for (let i = 0; i < properties.length; i++) {
    const name = properties[i].name;
    const type = properties[i].type;
    const required = properties[i].required;
    const row = Number(properties[i].row);
    let actualRowCount = await page.getByText("Property Name *").count();
    if (actualRowCount < row) {
      await page.getByTestId("button-add-field").click();
      actualRowCount++;
    }
    const nameInput = page.getByTestId("items." + (row - 1) + ".name").getByRole("textbox");
    if ((await nameInput.inputValue()) !== name) {
      await nameInput.fill(name);
    }
    const typeInput = page.getByTestId("items." + (row - 1) + ".type").getByRole("combobox");
    if ((await typeInput.inputValue()) !== type) {
      await typeInput.selectOption(type);
    }
    const requiredElement = page
      .getByText("Property Name *Property")
      .nth(row - 1)
      .locator("span")
      .nth(1);
    const requiredInput = (await requiredElement.getAttribute("data-checked")) !== null ? "true" : "false";
    if (requiredInput !== required) {
      await requiredElement.click();
    }
    if ((await page.getByText("Property Name *").count()) < expectedRowCount) {
      await page.getByTestId("button-add-field").click();
    }
  }
});

When("I open Action modal of {string} workflow", async ({ page }, workflow: string) => {
  await page.getByRole("row", { name: workflow }).getByRole("button").nth(1).click();
});

When("I open Setting modal of workflow with name as {string}", async ({ page }, workflow: string) => {
  await page.getByRole("row", { name: workflow }).getByRole("button").first().click();
});

Then("I should see the property display in Action modal popup", async ({ page }, dataTable: DataTable) => {
  const labels = dataTable.hashes();
  for (const { label } of labels) {
    await expect(page.getByText(label, { exact: true })).toBeVisible();
  }
});

// When("I click on Remove button of property", async ({}, dataTable: DataTable) => {
//   // const properties = dataTable.hashes();
// });
