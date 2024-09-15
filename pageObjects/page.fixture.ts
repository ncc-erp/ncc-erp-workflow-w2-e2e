import { test as base } from "@playwright/test";
import LoginPage from "./pages/login.page";
import RequestTemplatePage from "./pages/requestTemplate.page";

export type PageObjects = {
  LoginPage: LoginPage;
  RequestTemplatePage: RequestTemplatePage;
};

// pass page object to test
export const test = base.extend<PageObjects>({
  LoginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  RequestTemplatePage: async ({ page }, use) => {
    await use(new RequestTemplatePage(page));
  },
});

export { expect, Page, Locator, Response } from "@playwright/test";
