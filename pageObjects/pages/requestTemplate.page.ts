import { Page } from "@playwright/test";
import { BasePage } from "../base.page";

export default class RequestTemplatePage extends BasePage {
  constructor(readonly page: Page) {
    super(page, "/request-templates");
  }
}
