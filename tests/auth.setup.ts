import path from "path";
import { test as setup } from "../pageObjects/page.fixture";
import { users } from "./../data/users";

export const authUserFile = path.join(__dirname, "../.auth/user.json");
export const authPmFile = path.join(__dirname, "../.auth/pm.json");
export const authAdminFile = path.join(__dirname, "../.auth/admin.json");

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
