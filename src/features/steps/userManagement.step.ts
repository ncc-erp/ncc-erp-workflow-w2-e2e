import { Then } from "../../pageObjects/page.fixture";

Then(
  "I should see a row with User Name as {string}, email as {string} and role as {string} displayed",
  async ({ PageObjects }, userName: string, email: string, role: string) => {
    await PageObjects.UserManagementPage.verifyUser(userName, email, role);
  }
);
