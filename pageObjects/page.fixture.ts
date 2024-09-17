import { test as base, Browser, Page } from "@playwright/test";
import LoginPage from "./pages/login.page";
import MyRequestPage from "./pages/myRequest.page";
import RequestTemplatePage from "./pages/requestTemplate.page";
import TaskPage from "./pages/task.page";

export type PageObjects = {
  LoginPage: LoginPage;
  RequestTemplatePage: RequestTemplatePage;
  MyRequestPage: MyRequestPage;
  TaskPage: TaskPage;
};
const convertToPageObjects = (page: Page): PageObjects => {
  return {
    LoginPage: new LoginPage(page),
    RequestTemplatePage: new RequestTemplatePage(page),
    MyRequestPage: new MyRequestPage(page),
    TaskPage: new TaskPage(page),
  };
};

class BrowserControlType {
  async withAuth(_browser: Browser, authFile: string, callback: ({ PageObjects, Page }) => Promise<void>) {
    // new page
    const context = await _browser.newContext({
      storageState: authFile, // Initial storage state
    });
    const page = await context.newPage();
    const pages = convertToPageObjects(page);
    await callback({ Page: page, PageObjects: pages });
    await context.close();
  }
}

export const BrowserControl: BrowserControlType = new BrowserControlType();
// pass page object to test
export const test = base.extend<{ PageObjects: PageObjects }>({
  PageObjects: async ({ page }, use) => {
    const pages: PageObjects = convertToPageObjects(page);
    await use(pages);
  },
});

export { expect, Locator, Page, Response } from "@playwright/test";
