import { BaseComponent } from "../base.component";

export default class Form extends BaseComponent {
  async fillByLabel(labelText: string, value: string) {
    const label = this.page.getByText(labelText, { exact: true });
    const input = label.locator(" + div > div > input");
    await input.fill(value);
  }
}
