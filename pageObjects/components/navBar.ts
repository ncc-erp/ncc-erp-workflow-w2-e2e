import { BaseComponent } from "../base.component";

export default class NavBar extends BaseComponent {
  async clickToMenu(menuName: string) {
    await this.page.getByRole("link", { name: menuName }).click();
  }
}
