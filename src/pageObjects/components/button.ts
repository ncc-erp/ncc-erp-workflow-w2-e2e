import { BaseComponent } from "../base.component";

export default class Button extends BaseComponent {
  async getByName(name: string) {
    return this.page.getByRole("button").getByText(name);
  }

  async clickByName(name: string) {
    const button = await this.getByName(name);
    await button.click();
  }
}
