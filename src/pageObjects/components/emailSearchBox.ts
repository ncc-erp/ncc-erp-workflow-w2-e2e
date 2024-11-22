import { BaseComponent } from "../base.component";
export default class EmailSearchBox extends BaseComponent {
  async searchByEmail(email: string) {
    const emailSearchBox = this.page.getByPlaceholder("Enter Email");
    await emailSearchBox.fill(email);
    //todo: add attribute role = searchbox/data-testid=search-input
  }
}
