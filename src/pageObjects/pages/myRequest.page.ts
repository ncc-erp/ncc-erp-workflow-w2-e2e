import { Page } from "@playwright/test";
import { API } from "../../data/apis";
import { BasePage } from "../base.page";
import MyRequest from "./../components/myRequests";
import RequestSettingMenu from "./../components/requestSettingMenu";
import Table from "./../components/table";
export default class MyRequestPage extends BasePage {
  public table: Table;
  public myRequest: MyRequest;
  public requestSettingMenu: RequestSettingMenu;

  constructor(readonly page: Page) {
    super(page, "/my-requests");
    this.table = new Table(page);
    this.myRequest = new MyRequest(page);
    this.requestSettingMenu = new RequestSettingMenu(page);
  }

  async filterByStatus(status: string) {
    // todo refactor
    await this.page.getByRole("combobox").nth(1).selectOption(status);
  }

  async selectRowPerPage(number: string) {
    // todo refactor
    await this.page.getByRole("combobox").nth(2).selectOption(number);
  }

  async toggleRequestsView() {
    await this.myRequest.onlyMyRequestBtn.click();
  }

  async cancelRequest(id: string) {
    await this.table.clickSettingButtonById(id);
    await this.requestSettingMenu.cancelBtn.click();
    await this.requestSettingMenu.conrfirmYesBtn.click();
    await this.page.waitForResponse(API.cancelRequest);
  }

  async viewRequestDetail(id: string) {
    await this.myRequest.clickRequestById(id);
  }

  async verifyFilterStatus(status: string) {
    await this.table.verifyCellOfCol(6, status);
  }

  async openActionMenu() {
    const actionMenuButton = this.page.locator("td").locator("button[id*=menu-button]").nth(0);
    await actionMenuButton.click();
  }
}
