import { BaseComponent } from "../base.component";

export default class Checkbox extends BaseComponent {
  public async getCheckboxByLabel(label: string) {
    const formGroup = this.page.locator("label").filter({ hasText: label });
    return formGroup.locator('input[type="checkbox"]');
  }
}
