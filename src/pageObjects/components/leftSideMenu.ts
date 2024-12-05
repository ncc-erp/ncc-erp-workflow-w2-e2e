import { expect } from "@playwright/test";
import { DataTable } from "playwright-bdd";
import { BaseComponent } from "../base.component";
export default class LeftSideMenu extends BaseComponent {
  async verifyNavigationLinks(dataTable: DataTable) {
    const navigationLinks = dataTable.hashes();
    for (const navigationLink of navigationLinks) {
      const linkText = navigationLink.link;
      await expect(this.page.locator(`a:text-is("${linkText}")`)).toBeVisible();
    }
  }
}
