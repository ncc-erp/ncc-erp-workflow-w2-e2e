import { expect } from "@playwright/test";
import { DataTable } from "playwright-bdd";
import { BaseComponent } from "../base.component";
export default class LeftSideMenu extends BaseComponent {
  public get releaseNoteBtn() {
    return this.host.getByRole("button", { name: "Release note" });
  }

  public get userGuideBtn() {
    return this.host.getByRole("button", { name: "User guide" });
  }

  public get logoutBtn() {
    return this.host.getByRole("button", { name: "Log out" });
  }

  async logout() {
    await this.logoutBtn.click();
  }

  async verifyNavigationLinks(dataTable: DataTable) {
    const navigationLinks = dataTable.hashes();
    for (const navigationLink of navigationLinks) {
      const linkText = navigationLink.link;
      await expect(this.page.locator(`a:text-is("${linkText}")`)).toBeVisible();
    }
  }

  async clickAccordionButton() {
    const accordionButtons = this.page.locator('button[id*="accordion-button"]');
    const count = await accordionButtons.count();
    for (let i = 0; i < count; i++) {
      await accordionButtons.nth(i).click();
    }
  }
}
