import { expect } from "@playwright/test";
import { waitLoading } from "../../utils/waitLoading";
import { BaseComponent } from "../base.component";
export default class WorkflowTag extends BaseComponent {
  async verifyWorkflowTag(workflow: string) {
    await waitLoading(this.page);
    const workflowTags = this.page.locator('div[class*="_title"]');
    const tagsCount = await workflowTags.count();
    for (let i = 0; i < tagsCount; i++) {
      const tagText = await workflowTags.nth(i).textContent();
      expect(tagText).toContain(workflow);
    }
  }
}
