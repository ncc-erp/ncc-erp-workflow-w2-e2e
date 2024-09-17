import { test as setup } from "../pageObjects/page.fixture";
import { authAdminFile, authPmFile, authUserFile, users } from "./../data/users";
import { loginAndVerify } from "./../steps/login.step";

setup("As user, I want to login to w2", async ({ PageObjects }) => {
  await loginAndVerify(PageObjects, users.user.username, users.user.password, users.user.name, authUserFile);
});

setup("As pm, I want to login to w2", async ({ PageObjects }) => {
  await loginAndVerify(PageObjects, users.pm.username, users.pm.password, users.pm.name, authPmFile);
});

setup("As admin, I want to login to w2", async ({ PageObjects }) => {
  await loginAndVerify(PageObjects, users.admin.username, users.admin.password, users.admin.name, authAdminFile);
});
