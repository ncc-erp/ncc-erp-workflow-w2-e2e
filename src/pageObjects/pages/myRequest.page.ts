import { Page } from "@playwright/test";
import { BasePage } from "../base.page";
import Table from "./../components/table";
import MyRequest from "./../components/myRequests";
import RequestSettingMenu from "./../components/requestSettingMenu";
export default class MyRequestPage extends BasePage {
  public table: Table;
  public MyRequest: MyRequest;
  public RequestSettingMenu: RequestSettingMenu;

  constructor(readonly page: Page) {
    super(page, "/my-requests");
    this.table = new Table(page);
    this.MyRequest = new MyRequest(page);
    this.RequestSettingMenu = new RequestSettingMenu(page);
  }

  async filterByStatus(status: string) {
    // todo refactor
    await this.page.getByRole("combobox").nth(1).selectOption(status);
  }

  async showAllRequests() {
    await this.MyRequest.onlyMyRequestBtn.click();
  }

  async cancelRequest(id: string) {
    await this.table.clickSettingButtonById(id);
    await this.RequestSettingMenu.cancelBtn.click();
    await this.RequestSettingMenu.conrfirmYesBtn.click();
  }
}
