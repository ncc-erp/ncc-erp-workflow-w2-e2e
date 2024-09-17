import { expect } from "@playwright/test";
import { BaseComponent } from "../base.component";

export default class Table extends BaseComponent {
  async getTableRows() {
    return this.host.locator("tbody tr");
  }

  async getCellValue(row, columnIndex) {
    return await row.locator("td").nth(columnIndex).innerText();
  }

  async getColumnValues(columnIndex) {
    // eslint-disable-next-line playwright/no-networkidle
    await this.page.waitForLoadState("networkidle");
    const rows = await this.getTableRows();
    const values = [];
    for (let i = 0; i < (await rows.count()); i++) {
      const cellValue = await this.getCellValue(rows.nth(i), columnIndex);
      values.push(cellValue);
    }
    return values;
  }

  async verifyCellOfRow(row: number, _cell: number, text: string) {
    const cell = this.host.getByRole("row").nth(row).getByRole("cell").nth(_cell);
    await expect(cell).toContainText(text);
  }
  async verifyTextInCol(col: number, text: string) {
    const cells = await this.getColumnValues(col);
    await expect(cells.join(",")).toContain(text);
  }
}
