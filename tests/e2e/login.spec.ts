import { authUserFile, users } from "../../data/users";
import { test } from "../../pageObjects/page.fixture";

test.describe("As user, I want to login to w2", () => {
  test.beforeEach(async ({ LoginPage }) => {
    await LoginPage.open();
  });
  test("should login success", async ({ RequestTemplatePage, LoginPage }) => {
    await LoginPage.login(users.user.username, users.user.password);
    await RequestTemplatePage.verifyPageLocated();
  });
});

test.describe("As user, I want to logout", () => {
  test.beforeEach(async ({ RequestTemplatePage }) => {
    await RequestTemplatePage.open();
  });
  test.use({ storageState: authUserFile });

  test("should logout success", async ({ RequestTemplatePage, LoginPage }) => {
    await RequestTemplatePage.header.logout();
    await LoginPage.verifyPageLocated();
  });
});
