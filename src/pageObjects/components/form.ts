import { BaseComponent } from "../base.component";

export default class Form extends BaseComponent {
  async fillByLabel(label: string, value: string) {
    await this.page.getByLabel(label).fill(value);
  }
}
