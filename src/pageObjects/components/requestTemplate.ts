import { BaseComponent } from "../base.component";

export default class RequestTemplate extends BaseComponent {
  async clickSettingButtonById(id: string) {
    const row = this.host.locator(`[data-id="${id}"]`);
    await row.locator('[id^="menu-button"]').click();
  }
}
