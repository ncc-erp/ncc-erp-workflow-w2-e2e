import { test as base } from "@playwright/test";
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

// pass page object to test
export const test = base.extend<{ PageObjects: PageObjects }>({
  PageObjects: async ({ page }, use) => {
    const pages: PageObjects = {
      LoginPage: new LoginPage(page),
      RequestTemplatePage: new RequestTemplatePage(page),
      MyRequestPage: new MyRequestPage(page),
      TaskPage: new TaskPage(page),
    };
    await use(pages);
  },
});

export { expect, Locator, Page, Response } from "@playwright/test";
