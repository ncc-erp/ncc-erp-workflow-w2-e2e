import { Then, When } from "../../pageObjects/page.fixture";

Then(
  "I should see a row with User Name as {string} and email as {string}",
  async ({ PageObjects }, userName: string, email: string) => {
    await PageObjects.UserManagementPage.verifyUser(userName, email);
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

When("I {string} user with the role {string}", async ({ PageObjects }, action: string, role: string) => {
  await PageObjects.UserManagementPage.popup.openTabByName("Roles");
  await PageObjects.UserManagementPage.manageRole(action, role);
});

Then("I should see role {string} {string} in the user role", async ({ PageObjects }, status: string, role: string) => {
  await PageObjects.UserManagementPage.verifyIncludeRole(status, role);
});

Then(
  "I should see name of user as {string} {string} in {string} role user list in Role page",
  async ({ PageObjects }, name: string, status: string, role: string) => {
    await PageObjects.Roles.open();
    await PageObjects.Roles.verifyRoleUserList(name, status, role);
  }
);
