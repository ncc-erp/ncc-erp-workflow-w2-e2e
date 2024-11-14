import { expect } from "@playwright/test";
import { DataTable } from "playwright-bdd/dist/cucumber/DataTable";
import { BaseComponent } from "../base.component";
export default class WorkflowTypeDropdown extends BaseComponent {
  public typeDropdown() {
    return this.page.locator("role=combobox").nth(0);
  }
  async verifyNewWorkflowInTypeDropdown(workflowName: string, status: string) {
    await this.typeDropdown().click();
    const optionLocator = this.typeDropdown().locator("option").filter({ hasText: workflowName });
    if (status === "displayed") {
      await expect(optionLocator).toBeAttached();
    } else {
      await expect(optionLocator).toBeHidden();
    }
  }

  async verifyTypeDropdownOptions(dataTable: DataTable) {
    const expectedOptions = dataTable.rows().map((row) => row[0]);
    const actualOptions = (await this.typeDropdown().innerText()).split("\n").map((option) => option);
    expect(actualOptions).toEqual(expectedOptions);
  }

  async clickByName(name: string) {
    await this.typeDropdown().selectOption(name);
  }
}
