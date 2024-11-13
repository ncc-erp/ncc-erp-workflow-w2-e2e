import { expect } from "@playwright/test";
import { BaseComponent } from "../base.component";
export default class WorkflowTypeDropdown extends BaseComponent {
  async verifyNewWorkflowInTypeDropdown(workflowName: string, status: string) {
    const typeDropdown = this.page.locator("role=combobox").nth(0);
    await typeDropdown.click();
    const optionLocator = typeDropdown.locator("option").filter({ hasText: workflowName });
    if (status === "displayed") {
      await expect(optionLocator).toBeVisible();
    } else {
      await expect(optionLocator).toBeHidden();
    }
  }
}
