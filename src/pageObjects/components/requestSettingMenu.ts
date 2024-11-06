import { BaseComponent } from "../base.component";
import Table from "./../components/table";
import { Page } from "@playwright/test";

export default class RequestSettingMenu extends BaseComponent {
  public table: Table;

  constructor(readonly page: Page) {
    super(page);
    this.table = new Table(page);
  }

  public get viewBtn() {
    return this.host.getByRole("menuitem", { name: "View" });
  }

  public get workflowBtn() {
    return this.host.getByRole("menuitem", { name: "Workflow" });
  }

  public get cancelBtn() {
    return this.host.getByRole("menuitem", { name: "Cancel" });
  }

  public get conrfirmYesBtn() {
    return this.host.getByRole("button", { name: "Yes" });
  }

  public get conrfirmCancelBtn() {
    return this.host.getByRole("button", { name: "Cancel" });
  }
}
