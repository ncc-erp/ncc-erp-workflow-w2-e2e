import { BaseComponent } from "../base.component";

export default class MyRequest extends BaseComponent {
  public get onlyMyRequestBtn() {
    return this.host.getByRole("button", { name: "Only my request" });
  }

  async clickRequestById(id: string) {
    await this.host.locator(`[data-id="${id}"]`).click();
  }
}
