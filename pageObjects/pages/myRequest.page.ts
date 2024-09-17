import { Page } from "@playwright/test";
import { BasePage } from "../base.page";
import Table from "./../components/table";

export default class MyRequestPage extends BasePage {
  public table: Table;
  constructor(readonly page: Page) {
    super(page, "/my-requests");
    this.table = new Table(page);
  }
}
