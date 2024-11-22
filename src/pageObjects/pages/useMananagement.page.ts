import { expect, Page } from "@playwright/test";
import { BasePage } from "../base.page";
export default class UserManagementPage extends BasePage {
  constructor(readonly page: Page) {
    super(page, "/administration/user-management");
  }
  async verifyUser(userName: string, email: string, role: string) {
    const userRow = this.page.locator("tbody > tr");
    const rowFound = userRow
      .filter({
        has: this.page.locator(`td:nth-child(1):text-is("${userName}")`),
      })
      .filter({
        has: this.page.locator(`td:nth-child(2):text-is("${email}")`),
      })
      .filter({
        has: this.page.locator(`td:nth-child(4):has-text("${role}")`),
      });
    await expect(rowFound).toBeVisible();
  }
}
