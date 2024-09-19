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

  async clickToBoardItemByTitle(title: string) {
    await this.host.getByTestId("board-item-title").filter({ hasText: title }).first().click();
  }

  async verifyHasTask(columnNumber: number, title: string, requestUser: string, currentStatus: string) {
    await waitLoading(this.page);
    // eslint-disable-next-line playwright/no-wait-for-timeout
    await this.page.waitForTimeout(200);
    const col = this.boardCols.nth(columnNumber);
    await expect(col).toContainText(`${title}`);
    await expect(col).toContainText(`Request user:${requestUser}`);
    await expect(col).toContainText(`Current State:${currentStatus}`);
  }
}
