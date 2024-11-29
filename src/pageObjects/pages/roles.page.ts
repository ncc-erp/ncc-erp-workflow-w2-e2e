import { BasePage } from "../base.page";
import { expect, Page } from "../page.fixture";
export default class Roles extends BasePage {
  constructor(readonly page: Page) {
    super(page, "/roles");
  }
  async verifyRoleUserList(name: string, role: string) {
    const roleRow = this.page.locator('[data-testid="roles-item"]').filter({ hasText: role });
    // Open edit role popup
    roleRow.locator("path").click();
    await this.popup.openTabByName("Users");
    await expect(this.page.getByLabel("Users")).toContainText(name);
  }
}
