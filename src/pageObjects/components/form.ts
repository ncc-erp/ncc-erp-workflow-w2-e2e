import { BaseComponent } from "../base.component";

export default class Form extends BaseComponent {
  public getFormGroupByLabel(label: string) {
    return this.page
      .locator('form div[role="group"]')
      .filter({ hasText: new RegExp(`^${label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`) });
  }

  public async fillFormFieldByLabel(label: string, value: string) {
    const formGroup = this.getFormGroupByLabel(label); // Get the form group
    await formGroup.locator("input").fill(value); // Fill the input within the form group
  }
}
