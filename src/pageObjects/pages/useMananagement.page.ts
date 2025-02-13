import { expect, Page } from "@playwright/test";
import { API } from "../../data/apis";
import { BasePage } from "../base.page";
export default class UserManagementPage extends BasePage {
  constructor(readonly page: Page) {
    super(page, "/administration/user-management");
  }
  async verifyUser(userName: string, email: string) {
    const userRow = this.page.locator("tbody > tr");
    const rowFound = userRow
      .filter({
        has: this.page.locator(`td:nth-child(1) > div:text-is("${userName}")`),
      })
      .filter({
        has: this.page.locator(`td:nth-child(2):text-is("${email}")`),
      });
    await expect(rowFound).toBeVisible();
  }
  public get roleDropdown() {
    return this.page.getByRole("combobox").first();
  }

  async verifyUserRole(role: string) {
    const roleCol = this.page.locator("tbody > tr").filter({
      has: this.page.locator(`td:nth-child(4)`),
    });
    await expect(roleCol.filter({ hasNotText: role })).toHaveCount(0);
  }

  async openEditUserPopup() {
    const userRow = this.page.locator("tbody > tr");
    await userRow.getByRole("button").click();
    await this.menuItem.clickByName("Edit");
  }

  async manageRole(action: string, role: string) {
    const roleCheckbox = await this.checkBox.getCheckboxByLabel(role);
    switch (action) {
      case "assign":
        await roleCheckbox.setChecked(true, { force: true });
        break;
      case "unassign":
        await roleCheckbox.setChecked(false, { force: true });
        break;
    }
    await this.button.clickByName("Submit");
    await this.page.waitForResponse(API.editUser);
  }

  async verifyIncludeRole(status: string, role: string) {
    const userRow = this.page.locator("tbody > tr").filter({
      has: this.page.locator(`td:nth-child(4)`),
    });
    switch (status) {
      case "displayed":
        await expect(userRow.filter({ hasText: role })).toBeVisible();
        break;
      case "not displayed":
        await expect(userRow.filter({ hasText: role })).toBeHidden();
        break;
    }
  }
}
