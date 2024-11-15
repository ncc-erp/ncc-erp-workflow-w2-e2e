import { BaseComponent } from "../base.component";
export default class MenuItem extends BaseComponent {
  async clickByName(name: string) {
    await this.page.getByRole("menuitem").filter({ hasText: name }).click();
  }
}
