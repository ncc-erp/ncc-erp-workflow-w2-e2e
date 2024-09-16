import { test as setup } from "../pageObjects/page.fixture";
import { authAdminFile, authUserFile, users } from "./../data/users";

setup("As user, I want to login to w2", async ({ page, LoginPage, RequestTemplatePage }) => {
  await LoginPage.open();
  await LoginPage.login(users.user.username, users.user.password);
  await page.waitForURL(RequestTemplatePage.path);
  await RequestTemplatePage.header.verifyUsername(users.user.name);
  await page.context().storageState({ path: authUserFile });
});

setup("As admin, I want to login to w2", async ({ page, LoginPage, RequestTemplatePage }) => {
  await LoginPage.open();
  await LoginPage.login(users.admin.username, users.admin.password);
  await page.waitForURL(RequestTemplatePage.path);
  await RequestTemplatePage.header.verifyUsername(users.admin.name);
  await page.context().storageState({ path: authAdminFile });
});
