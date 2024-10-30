import { BaseComponent } from "../base.component";

export default class Button extends BaseComponent {
  async clickButtonByName(name: string) {
    await this.page.getByRole("button", { name: `${name}` }).click();
  }
}
