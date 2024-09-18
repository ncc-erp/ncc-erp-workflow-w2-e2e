import { authUserFile, users } from "../../data/users.data";
import { test } from "../../pageObjects/page.fixture";

test.describe("As user, I want to login to w2 @user", () => {
  test.beforeEach(async ({ PageObjects }) => {
    await PageObjects.LoginPage.open();
  });
  test("should login success", async ({ PageObjects }) => {
    await PageObjects.LoginPage.login(users.user.username, users.user.password);
    await PageObjects.RequestTemplatePage.verifyPageLocated();
  });
});

test.describe("As user, I want to logout @user", () => {
  test.beforeEach(async ({ PageObjects }) => {
    await PageObjects.RequestTemplatePage.open();
  });
  test.use({ storageState: authUserFile });

  test("should logout success", async ({ PageObjects }) => {
    await PageObjects.RequestTemplatePage.header.logout();
    await PageObjects.LoginPage.verifyPageLocated();
  });
});
