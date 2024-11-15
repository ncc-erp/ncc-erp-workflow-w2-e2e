import { expect } from "@playwright/test";
import { waitLoading } from "../../utils/waitLoading";
import { BaseComponent } from "../base.component";
export default class WorkflowTag extends BaseComponent {
  async verifyWorkflowTag(workflow: string) {
    await waitLoading(this.page);
    const workflowTags = this.page.locator('div[class*="_title"]');
    await expect(workflowTags.filter({ hasNotText: workflow })).toHaveCount(0);
  }
}
