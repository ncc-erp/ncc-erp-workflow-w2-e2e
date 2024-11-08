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

  // fail
  async dragItemIdToCol(id: string, fromIndex: number, toIndex: number) {
    const col = this.boardCols.nth(fromIndex);
    const item = col.locator(`[data-instance-id="${id}"]`);
    await item.hover();
    await this.page.mouse.down();
    await this.boardCols.nth(toIndex).locator("> div").first().hover();
    await this.page.mouse.up();
    // await item.dragTo(this.boardCols.nth(toIndex));
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
