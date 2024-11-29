import { Then, When } from "../../pageObjects/page.fixture";

Then(
  "I should see a row with User Name as {string}, email as {string} and role as {string} displayed",
  async ({ PageObjects }, userName: string, email: string, role: string) => {
    await PageObjects.UserManagementPage.verifyUser(userName, email, role);
  }
);

When("I click on {string} from the Role dropdown", async ({ PageObjects }, role: string) => {
  await PageObjects.UserManagementPage.roleDropdown.click();
  await PageObjects.UserManagementPage.roleDropdown.selectOption(role);
});

Then("I should see all request with role include {string} display", async ({ PageObjects }, role: string) => {
  await PageObjects.UserManagementPage.verifyUserRole(role);
});

When("I open Edit user popup of the only user displayed", async ({ PageObjects }) => {
  await PageObjects.UserManagementPage.openEditUserPopup();
});

When("I assign user with the role {string}", async ({ PageObjects }, role: string) => {
  await PageObjects.UserManagementPage.popup.openTabByName("Roles");
  await PageObjects.UserManagementPage.assignRole(role);
});

Then("I should see the user role include role {string}", async ({ PageObjects }, role: string) => {
  await PageObjects.UserManagementPage.verifyIncludeRole(role);
});

Then(
  "I want to see name of user as {string} in {string} role user list in Role page",
  async ({ PageObjects }, name: string, role: string) => {
    await PageObjects.Roles.open();
    await PageObjects.Roles.verifyRoleUserList(name, role);
  }
);
