import { Then } from "../../pageObjects/page.fixture";

Then("I should see {TestData} on my request page", async ({ PageObjects }, title: string) => {
  /// verify get request
  await PageObjects.MyRequestPage.table.verifyTextInCol(0, title);
});
Then(
  "I should see {TestData} with status {string} on my request page",
  async ({ PageObjects }, title: string, status: string) => {
    await PageObjects.MyRequestPage.filterByStatus(status);
    await PageObjects.MyRequestPage.table.verifyTextInCol(0, title);
  }
);
