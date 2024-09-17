import { authAdminFile, authPmFile, authUserFile, users } from "../data/users.data";
import { test as setup } from "../pageObjects/page.fixture";
import { loginAndVerifySteps } from "./../steps/login.step";

setup("As user, I want to login to w2", async ({ PageObjects }) => {
  await loginAndVerifySteps(PageObjects, users.user.username, users.user.password, users.user.name, authUserFile);
});

setup("As pm, I want to login to w2", async ({ PageObjects }) => {
  await loginAndVerifySteps(PageObjects, users.pm.username, users.pm.password, users.pm.name, authPmFile);
});

setup("As admin, I want to login to w2", async ({ PageObjects }) => {
  await loginAndVerifySteps(PageObjects, users.admin.username, users.admin.password, users.admin.name, authAdminFile);
});
