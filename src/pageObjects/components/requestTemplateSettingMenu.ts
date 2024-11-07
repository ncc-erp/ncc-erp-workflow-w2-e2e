import { BaseComponent } from "../base.component";
import Table from "./../components/table";
import { Page } from "@playwright/test";

export default class RequestTemplateSettingMenu extends BaseComponent {
  public table: Table;

  constructor(readonly page: Page) {
    super(page);
    this.table = new Table(page);
  }

  async menuButton(name: string) {
    return this.host.getByRole("menuitem", { name: `${name}` });
  }

  public get conrfirmCancelBtn() {
    return this.host.getByRole("button", { name: "Cancel" });
  }
}
