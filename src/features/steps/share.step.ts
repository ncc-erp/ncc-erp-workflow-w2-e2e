import { DataTable } from "playwright-bdd";
import { BasePage } from "../../pageObjects/base.page";
import { Given, Then, When } from "../../pageObjects/page.fixture";

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
