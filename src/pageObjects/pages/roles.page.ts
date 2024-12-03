import { BasePage } from "../base.page";
import { expect, Page } from "../page.fixture";
export default class Roles extends BasePage {
  constructor(readonly page: Page) {
    super(page, "/roles");
  }
  async verifyRoleUserList(name: string, status: string, role: string) {
    const roleRow = this.page.locator('[data-testid="roles-item"]').filter({ hasText: role });
    // Open edit role popup
    roleRow.getByRole("cell").nth(1).click();
    await this.popup.openTabByName("Users");
    switch (status) {
      case "displayed":
        await expect(this.page.getByLabel("Users")).toContainText(name);
        break;
      case "not displayed":
        await expect(this.page.getByLabel("Users")).not.toContainText(name);
        break;
    }
  }
}
