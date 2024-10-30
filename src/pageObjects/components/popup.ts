import { BaseComponent } from "../base.component";

export default class Popup extends BaseComponent {
  async closePopup(popup: string) {
    await this.page.getByLabel(popup).getByLabel("Close").click();
  }
}
