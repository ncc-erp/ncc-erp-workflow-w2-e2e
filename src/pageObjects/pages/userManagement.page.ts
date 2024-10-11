import { Page } from "@playwright/test";
import { API } from "../../data/apis";
import { BasePage } from "../base.page";
import Table from "../components/table";

export default class UserManagementPage extends BasePage {
  public table: Table;
  constructor(readonly page: Page) {
    super(page, "/administration/user-management");
    this.table = new Table(page);
  }

  async fillSearchField(emailAddress: string) {
    const searchField = this.page.getByPlaceholder("Enter email");
    await searchField.fill(emailAddress);
    console.log(`${API.searchUsers}filter=&maxResultCount=10&skipCount=0&sorting=${emailAddress}+asc&roles=`);

    await this.page.waitForResponse(
      `${API.searchUsers}filter=&maxResultCount=10&skipCount=0&sorting=${emailAddress}+asc&roles=`
    );
  }

  async selectRoleFilter(role: string) {
    const roleDropdown = this.page.getByPlaceholder("All Roles");
    await roleDropdown.selectOption({ value: role });
  }

  async openActionMenuForUser(emailAddress: string) {
    const userRow = this.page.locator(`td:has-text("${emailAddress}")`);
    const actionButton = userRow.locator('button[aria-haspopup="menu"]');
    await actionButton.click();
  }

  async selectEditFromActionMenu() {
    const editButton = this.page.locator('button[role="menuitem"]:has-text("Edit")');
    await editButton.click();
  }

  async verifyRedirectToEditPage() {
    await this.page.waitForURL(/\/user-management\/edit/);
  }

  async getUserRowByUsername(username: string) {
    await this.page.waitForSelector('tr[data-testid="user-manager-item"]');
    return this.page.locator(`tr[data-testid="user-manager-item"] td:has-text("${username}")`);
  }

  async getUserRowByEmail(emailAddress: string) {
    await this.page.waitForSelector('tr[data-testid="user-manager-item"]');
    return this.page.locator(`tr[data-testid="user-manager-item"] td:has-text("${emailAddress}")`);
  }

  async getUserRowByPhoneNumber(phoneNumber: string) {
    await this.page.waitForSelector('tr[data-testid="user-manager-item"]');
    return this.page.locator(`tr[data-testid="user-manager-item"] td:has-text("${phoneNumber}")`);
  }

  async getUserRowByRole(role: string) {
    await this.page.waitForSelector('tr[data-testid="user-manager-item"]');
    return this.page.locator(`tr[data-testid="user-manager-item"] td:has-text("${role}")`);
  }
}
