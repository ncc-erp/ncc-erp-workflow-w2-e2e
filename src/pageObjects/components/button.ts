import { expect } from "@playwright/test";
import { BaseComponent } from "../base.component";

export default class Button extends BaseComponent {
  async verifyButtonDisplay(name: string) {
    const button = this.page.getByRole("button", { name: `${name}` });
    await expect(button).toBeVisible();
  }

  async clickButtonByName(name: string) {
    await this.page.getByRole("button", { name: `${name}` }).click();
  }
}
