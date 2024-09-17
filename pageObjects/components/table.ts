import { expect } from "@playwright/test";
import { BaseComponent } from "../base.component";

export default class Table extends BaseComponent {
  async verifyCellOfRow(row: number, _cell: number, text: string) {
    const cell = this.host.getByRole("row").nth(row).getByRole("cell").nth(_cell);
    await expect(cell).toContainText(text);
  }
}
