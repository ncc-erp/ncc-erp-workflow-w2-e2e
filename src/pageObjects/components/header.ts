import { expect } from "@playwright/test";
import { BaseComponent } from "../base.component";

export default class Header extends BaseComponent {
  public get title() {
    return this.host.locator("h1");
  }
  public get username() {
    return this.host.locator(".css-bdvyq0 h2");
  }

  public get themeBtn() {
    return this.host.locator(".css-3i2zwo");
  }

  async verifyPageTitle(title: string) {
    const pageTitle = this.title;
    await expect(pageTitle).toHaveText(title);
  }

  async verifyUsername(userName: string) {
    const _username = this.username;
    await expect(_username).toHaveText(userName);
  }

  async verifyCurrentTheme(theme: string) {
    const _theme = this.themeBtn;
    await expect(_theme).toHaveText(theme);
  }
}
