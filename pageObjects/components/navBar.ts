import { BaseComponent } from "../base.component";

export default class NavBar extends BaseComponent {
  async clickToMenu(menuName: string) {
    await this.host.getByRole("link", { name: menuName }).click();
  }
}
