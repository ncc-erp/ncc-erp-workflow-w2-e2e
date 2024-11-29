import { API } from "../../data/apis";
import { BaseComponent } from "../base.component";
export default class EmailSearchBox extends BaseComponent {
  async searchByEmail(email: string) {
    const emailSearchBox = this.page.getByPlaceholder("Enter Email");
    await Promise.all([this.page.waitForResponse(API.filterUser), emailSearchBox.fill(email)]);
    //todo: add attribute role = searchbox/data-testid=search-input
  }
}
