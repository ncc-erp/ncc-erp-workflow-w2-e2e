import { expect } from "@playwright/test";
import { BaseComponent } from "../base.component";
export default class WorkflowTypeDropdown extends BaseComponent {
  public typeDropdown() {
    return this.page.getByRole("combobox").nth(0);
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

  async clickByName(name: string) {
    await this.typeDropdown().selectOption(name);
  }
}
