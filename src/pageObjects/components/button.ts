import { expect } from "@playwright/test";
import { API } from "../../data/apis";
import { BaseComponent } from "../base.component";

export default class Button extends BaseComponent {
  async verifyButtonDisplay(name: string) {
    const button = this.page.getByRole("button", { name: `${name}` });
    await expect(button).toBeVisible();
  }

  async clickButtonByName(name: string) {
    const button = this.page.getByRole("button", { name: `${name}` });
    await this.verifyButtonDisplay(name);
    if (name === "Save") {
      await Promise.all([
        this.page.waitForResponse(API.saveWorkflowInput),
        this.page.waitForResponse(API.listAll),
        button.click(),
      ]);
    } else {
      await button.click();
    }
  }
}
