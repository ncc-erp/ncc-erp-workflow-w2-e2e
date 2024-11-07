import { BaseComponent } from "../base.component";
export default class MenuItem extends BaseComponent {
  async clickByName(name: string) {
    this.page.getByRole("menuitem", { name }).click();
  }
}
