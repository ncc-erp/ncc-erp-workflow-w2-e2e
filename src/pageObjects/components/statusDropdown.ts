import { Page } from "@playwright/test";
import { DataTable } from "playwright-bdd/dist/cucumber/DataTable";
import { BaseComponent } from "../base.component";
import Dropdown from "./dropdown";
export default class StatusDropdown extends BaseComponent {
  public dropdown: Dropdown;
  constructor(readonly page: Page) {
    super(page);
    this.dropdown = new Dropdown(page);
  }

  public get locator() {
    return this.page.getByRole("combobox").nth(1);
  }

  async verifyStatusDropdownOptions(dataTable: DataTable) {
    await this.dropdown.verifyDropdownOptions(this.locator, dataTable);
  }
}
