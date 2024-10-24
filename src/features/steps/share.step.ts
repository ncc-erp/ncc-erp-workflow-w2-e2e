import { DataTable } from "playwright-bdd";
import { users } from "../../data/users.data";
import { BasePage } from "../../pageObjects/base.page";
import { Given, test, Then, When } from "../../pageObjects/page.fixture";

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

Then("I authenticated as {string}", async ({ PageObjects }, userType: string) => {
  test.use({ storageState: users[userType].authFile });
  await PageObjects.RequestTemplatePage.open();
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
  "I should see a new record with the data below {string}",
  async ({ PageObjects }, status: string, dataTable: DataTable) => {
    const rows = dataTable.hashes();
    const name = rows[0].name;
    const displayName = rows[0].displayName;
    const publishStatus = rows[0].publish;
    await PageObjects.RequestTemplatePage.verifyWorkflowDisplay(status, name, displayName, publishStatus);
  }
);

Then("I delete the record just created", async ({ page }, dataTable: DataTable) => {
  const rows = dataTable.hashes();
  const expectedName = rows[0].name;
  await page.getByRole("row", { name: expectedName }).getByRole("button").first().click();
  await page.getByRole("menuitem", { name: "Delete" }).click();
  await page.getByRole("button", { name: "Yes" }).click();
});
