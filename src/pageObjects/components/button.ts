import { expect } from "@playwright/test";
import { BaseComponent } from "../base.component";

export default class Button extends BaseComponent {
  public getByName(name: string) {
    return this.page.getByRole("button").getByText(name);
  }

  async clickByName(name: string) {
    const button = await this.getByName(name);
    await button.click();
  }

  async verifyNotDisplayByName(name: string) {
    await expect(this.getByName(name)).toBeHidden();
  }
}
