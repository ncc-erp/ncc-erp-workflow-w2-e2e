import { expect, Locator } from "@playwright/test";
import { DataTable } from "playwright-bdd";
import { BaseComponent } from "../base.component";
export default class Dropdown extends BaseComponent {
  async verifyDropdownOptions(dropdownLocator: Locator, dataTable: DataTable) {
    const expectedOptions = dataTable.rows().map((row) => row[0]);
    const actualOptions = (await dropdownLocator.innerText()).split("\n").map((option) => option.trim());
    expect(actualOptions).toEqual(expectedOptions);
  }
}