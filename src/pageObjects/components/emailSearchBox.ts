import { BaseComponent } from "../base.component";
export default class EmailSearchBox extends BaseComponent {
  async searchByEmail(email: string) {
    const emailSearchBox = this.page.getByPlaceholder("Enter Email");
    await Promise.all([
      this.page.waitForResponse(new RegExp("api/app/users\\?filter=" + encodeURIComponent(email) + ".*")),
      emailSearchBox.fill(email),
    ]);
    //todo: add attribute role = searchbox/data-testid=search-input
  }
}
