import { BaseComponent } from "../base.component";

export default class Form extends BaseComponent {
  public getFormGroupByLabel(label: string, locator: string) {
    return this.page
      .locator(locator)
      .filter({ hasText: new RegExp(`^${label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`) });
  }

  public async fillFormFieldByLabel(label: string, value: string, locator: string) {
    const formGroup = this.getFormGroupByLabel(label, locator); // Get the form group
    await formGroup.locator("input").fill(value); // Fill the input within the form group
  }
}
