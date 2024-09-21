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
