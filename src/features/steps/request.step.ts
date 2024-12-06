import { users } from "../../data/users.data";
import { BrowserControl, Then, When } from "../../pageObjects/page.fixture";

Then("I should see {TestData} on my request page", async ({ PageObjects }, id: string) => {
  /// verify get request
  await PageObjects.MyRequestPage.table.verifyIdInTable(id);
});
Then(
  "I should see {TestData} with status {string} on my request page",
  async ({ PageObjects }, id: string, status: string) => {
    await PageObjects.MyRequestPage.filterByStatus(status);
    await PageObjects.MyRequestPage.selectRowPerPage("100");
    await PageObjects.MyRequestPage.table.verifyIdInTable(id);
  }
);

Then(
  "{string} should see {TestData} with status {string} on my request page",
  async ({ browser }, userType: string, id: string, status: string) => {
    const authFile = users[userType.toLowerCase()].authFile;
    await BrowserControl.withAuth(browser, authFile, async ({ PageObjects }) => {
      await PageObjects.MyRequestPage.open();
      await PageObjects.MyRequestPage.filterByStatus(status);
      await PageObjects.MyRequestPage.selectRowPerPage("100");
      await PageObjects.MyRequestPage.table.verifyIdInTable(id);
    });
  }
);

Then(
  "I should see {TestData} with status {string} on all requests page",
  async ({ PageObjects }, id: string, status: string) => {
    await PageObjects.MyRequestPage.toggleRequestsView();
    await PageObjects.MyRequestPage.filterByStatus(status);
    await PageObjects.MyRequestPage.selectRowPerPage("100");
    await PageObjects.MyRequestPage.table.verifyIdInTable(id);
  }
);

When("I cancel request with id {TestData}", async ({ PageObjects }, id: string) => {
  await PageObjects.MyRequestPage.open();
  await PageObjects.MyRequestPage.cancelRequest(id);
});

When("{string} cancel request with id {TestData}", async ({ browser }, userType: string, id: string) => {
  const authFile = users[userType.toLowerCase()].authFile;
  await BrowserControl.withAuth(browser, authFile, async ({ PageObjects }) => {
    await PageObjects.MyRequestPage.open();
    await PageObjects.MyRequestPage.toggleRequestsView();
    await PageObjects.MyRequestPage.selectRowPerPage("100");
    await PageObjects.MyRequestPage.cancelRequest(id);
  });
});

Then(
  "I should see all request with status as {string} display in Request page",
  async ({ PageObjects }, status: string) => {
    await PageObjects.MyRequestPage.verifyFilterStatus(status);
  }
);

When("I open Action menu of a request", async ({ PageObjects }) => {
  await PageObjects.MyRequestPage.openActionMenu();
});

Then("I should not see Cancel option displayed in the popup", async ({ PageObjects }) => {
  await PageObjects.MyRequestPage.menuItem.verifyNotDisplayByName("Cancel");
});

Then("I should not see {string} button on My request page", async ({ PageObjects }, button: string) => {
  await PageObjects.MyRequestPage.button.verifyNotDisplayByName(button);
});
