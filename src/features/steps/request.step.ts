import { BrowserControl, Given, Then, When } from "../../pageObjects/page.fixture";
import { authAdminFile, users } from "../../data/users.data";

Then("I should see {TestData} on my request page", async ({ PageObjects }, id: string) => {
  /// verify get request
  await PageObjects.MyRequestPage.table.verifyIdInTable(id);
});
Then(
  "I should see {TestData} with status {string} on my request page",
  async ({ PageObjects }, id: string, status: string) => {
    await PageObjects.MyRequestPage.filterByStatus(status);
    await PageObjects.MyRequestPage.table.verifyIdInTable(id);
  }
);

Then(
  "I should see {TestData} with status {string} on all requests page",
  async ({ PageObjects }, id: string, status: string) => {
    await PageObjects.MyRequestPage.showAllRequests();
    await PageObjects.MyRequestPage.filterByStatus(status);
    await PageObjects.MyRequestPage.table.verifyIdInTable(id);
  }
);

When("I cancel request with id {TestData}",
async ({ PageObjects }, id: string) => {
  await PageObjects.MyRequestPage.open();
  await PageObjects.MyRequestPage.cancelRequest(id);
});

When("Admin cancel request with id {TestData}",
async ({ browser }, id: string) => {
  await BrowserControl.withAuth(browser, authAdminFile, async ({ PageObjects }) => {
    await PageObjects.MyRequestPage.open();
    await PageObjects.MyRequestPage.showAllRequests();
    await PageObjects.MyRequestPage.cancelRequest(id);
  });
});