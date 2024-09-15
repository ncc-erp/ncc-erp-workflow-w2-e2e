import { test } from "../../pageObjects/page.fixture";
test.beforeEach(async ({ LoginPage }) => {
  await LoginPage.open();
});

test.describe("As user, I want to login to w2", () => {
  test("login success", async ({ RequestTemplatePage, LoginPage }) => {
    await LoginPage.login("manh.nguyenvan@ncc.asia", "1q2w3E*");
    await RequestTemplatePage.verifyPageLocated();
  });
});
