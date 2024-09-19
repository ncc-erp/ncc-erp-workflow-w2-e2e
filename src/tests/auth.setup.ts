import { users } from "../data/users.data";
import { test as setup } from "../pageObjects/page.fixture";
import { loginAndVerifySteps } from "./../steps/login.step";

for (let key of Object.keys(users)) {
  const user = users[key];
  setup(`As ${key}, I want to login to w2`, async ({ PageObjects }) => {
    await loginAndVerifySteps(PageObjects, user.username, user.password, user.name, user.authFile);
  });
}
