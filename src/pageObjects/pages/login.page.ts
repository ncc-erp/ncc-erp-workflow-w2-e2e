import { expect, Page } from "@playwright/test";
import { boxedStep } from "../../utils/decorator";
import { BasePage } from "../base.page";

export default class LoginPage extends BasePage {
  private get username() {
    return this.page.getByPlaceholder("Username or email address");
  }
  private get password() {
    return this.page.getByPlaceholder("Password");
  }
  private get signinBtn() {
    return this.page.getByTestId("login-form").getByRole("button", { name: "Sign in" });
  }
  private get titleTest() {
    return this.page.locator("h1");
  }

  constructor(readonly page: Page) {
    super(page, "/login");
  }

  @boxedStep
  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.signinBtn.click();
  }

  async verifyTitle(_title: string) {
    await expect(this.titleTest).toContainText(_title);
  }
}
