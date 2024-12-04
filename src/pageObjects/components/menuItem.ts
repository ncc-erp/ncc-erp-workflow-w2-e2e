import { expect } from "@playwright/test";
import { BaseComponent } from "../base.component";
export default class MenuItem extends BaseComponent {
  public getByName(name: string) {
    return this.page.getByRole("menuitem").filter({ hasText: name });
  }
  async clickByName(name: string) {
    await this.getByName(name).click();
  }

  async verifyNotDisplayByName(name: string) {
    await expect(this.getByName(name)).toBeHidden();
  }
}
