import { BaseComponent } from "../base.component";

export default class DetailUserInfoPopup extends BaseComponent {
  public get confirmBtn() {
    return this.host.getByRole("button", { name: "Submit" });
  }
  public get cancelBtn() {
    return this.host.getByRole("button", { name: "Cancel" });
  }
}
