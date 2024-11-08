import { BaseComponent } from "../base.component";

export default class Button extends BaseComponent {
  async getByName(name: string) {
    return this.page.getByRole("button").getByText(name);
  }

  async clickByName(name: string) {
    const button = await this.getByName(name);

    // Check if the button is present and visible
    // if (await button.isVisible()) {
    await button.click();
    // } else {
    //   throw new Error(`Button with name "${name}" is not visible on the page.`);
    // }
  }
}
