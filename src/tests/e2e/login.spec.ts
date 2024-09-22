import { test } from "../../pageObjects/page.fixture";

// raw code apply todo
test.describe("As user, I want to login to w2", () => {
  test("Login success", async ({ Given, PageObjects, page, browser, When, Then }) => {
    await Given('I am on "LoginPage"', null, { PageObjects, page, browser });
    await When('I login with username "manh.nguyenvan@ncc.asia" and password "1q2w3E*"', null, {
      PageObjects,
      page,
      browser,
    });
    await Then('I should see "RequestTemplatePage"', null, { PageObjects, page, browser });
  });

  test("Logout success", { tag: ["@user"] }, async ({ Given, PageObjects, page, browser, When, Then }) => {
    await Given('I am on "RequestTemplatePage"', null, { PageObjects, page, browser });
    await When("I logout", null, { PageObjects, page, browser });
    await Then('I should see "LoginPage"', null, { PageObjects, page, browser });
  });
});
