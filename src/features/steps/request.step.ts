import { Then } from "../../pageObjects/page.fixture";

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
