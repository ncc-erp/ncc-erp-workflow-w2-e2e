import { expect } from "@playwright/test";
import { waitLoading } from "../../utils/waitLoading";
import { BaseComponent } from "../base.component";

export default class TaskBoard extends BaseComponent {
  public get boardView() {
    return this.host.locator(".css-ztxjyy").first();
  }
  public get boardItems() {
    return this.host.getByTestId("board-item");
  }
  public get boardCols() {
    return this.host.getByTestId("board-col");
  }

  async dragItemIdToCol(id: string, fromIndex: number, toIndex: number) {
    const item = this.boardCols.nth(fromIndex).locator(`[data-instance-id="${id}"]`);
    const target = this.boardCols.nth(toIndex).locator("> div").first();

    const sourceBox = await item.boundingBox();
    const targetBox = await target.boundingBox();

    await this.page.mouse.move(sourceBox.x + sourceBox.width / 2, sourceBox.y + sourceBox.height / 2);
    await this.page.mouse.down();
    await this.page.mouse.move(targetBox.x + targetBox.width / 2, targetBox.y + targetBox.height / 2, { steps: 5 });
    await this.page.mouse.up();
  }

  async clickToBoardItemByTitle(title: string, col: number) {
    await this.boardCols.nth(col).getByTestId("board-item-title").filter({ hasText: title }).first().click();
  }
  async clickToBoardItemById(id: string, col: number) {
    await this.boardCols.nth(col).locator(`[data-instance-id="${id}"]`).click();
  }
  async verifyHasTask(columnNumber: number, title: string, requestUser: string, currentStatus: string) {
    await waitLoading(this.page);
    const col = this.boardCols.nth(columnNumber);
    await expect(col).toContainText(`${title}`);
    await expect(col).toContainText(`Request user:${requestUser}`);
    await expect(col).toContainText(`Current State:${currentStatus || ""}`);
  }

  async verifyHasTaskById(columnNumber: number, id: string, requestUser: string, currentStatus: string) {
    await waitLoading(this.page);
    const col = this.boardCols.nth(columnNumber);
    const item = col.locator(`[data-instance-id="${id}"]`);
    await expect(item).toBeVisible();
    await expect(item).toContainText(`Request user:${requestUser}`);
    await expect(item).toContainText(`Current State:${currentStatus || ""}`);
  }

  async clickToBoardByTaskId(id: string, col: number) {
    await this.boardCols.nth(col).locator(`[data-id="${id}"]`).click();
  }
}
