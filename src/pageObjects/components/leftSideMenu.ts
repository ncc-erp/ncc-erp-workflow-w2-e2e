import { expect } from "@playwright/test";
import { DataTable } from "playwright-bdd";
import { BaseComponent } from "../base.component";
export default class LeftSideMenu extends BaseComponent {
  async verifyNavigationLinks(dataTable: DataTable) {
    const navigationLinks = dataTable.hashes();
    for (const navigationLink of navigationLinks) {
      const linkText = navigationLink.text; // Replace 'text' with the correct key if needed
      await expect(this.page.locator("a").filter({ hasText: linkText })).toBeVisible();
    }
  }
}
