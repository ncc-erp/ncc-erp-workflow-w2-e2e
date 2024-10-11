import { BasePage } from "../../pageObjects/base.page";
import { Given, Then, When } from "../../pageObjects/page.fixture";

Given("I am on {string} with {string}", async ({ PageObjects }, page: string) => {
  await (PageObjects[page] as BasePage).open();
});

When("I search users by email {string}", async ({ PageObjects }, emailAddress: string) => {
  await PageObjects.UserManagementPage.open();
  await PageObjects.UserManagementPage.fillSearchField(emailAddress);
});

When("I filter users by role {string}", async ({ PageObjects }, role: string) => {
  await PageObjects.UserManagementPage.open();
  await PageObjects.UserManagementPage.selectRoleFilter(role);
});

When("I open the action menu for the user with email {string}", async ({ PageObjects }, emailAddress: string) => {
  await PageObjects.UserManagementPage.open();
  await PageObjects.UserManagementPage.fillSearchField(emailAddress);
  await PageObjects.UserManagementPage.openActionMenuForUser(emailAddress);
});

When('I select "Edit" from the action menu', async ({ PageObjects }) => {
  await PageObjects.UserManagementPage.selectEditFromActionMenu();
});

Then("I should be redirected to the edit page for the user", async ({ PageObjects }) => {
  await PageObjects.UserManagementPage.verifyRedirectToEditPage();
});

Then(
  "I should see the list of users with username {string}, email address {string}, phone number {string}, role {string}",
  async () => {
    // const usernameLocator = await PageObjects.UserManagementPage.getUserRowByUsername(username);
    // await expect(usernameLocator).toBeVisible();
    // const emailLocator = await PageObjects.UserManagementPage.getUserRowByEmail(emailAddress);
    // await expect(emailLocator).toBeVisible();
    // const phoneLocator = await PageObjects.UserManagementPage.getUserRowByPhoneNumber(phoneNumber);
    // await expect(phoneLocator).toBeVisible();
    // const roleLocator = await PageObjects.UserManagementPage.getUserRowByRole(role);
    // await expect(roleLocator).toBeVisible();
  }
);
