import { expect, type Page } from "@playwright/test";
import Header from "./components/header";
import NavBar from "./components/navBar";

export abstract class BasePage {
  public header: Header;
  public navBar: NavBar;
  constructor(
    readonly page: Page,
    public path: string
  ) {
    this.header = new Header(this.page);
    this.navBar = new NavBar(this.page);
  }

  async open(path?: string) {
    await this.page.goto(path || this.path);
  }

  async verifyPageLocated() {
    await expect(this.page).toHaveURL(this.path);
  }
}
