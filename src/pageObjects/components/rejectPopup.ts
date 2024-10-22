import { API } from "../../data/apis";
import { BaseComponent } from "../base.component";

export default class RejectPopup extends BaseComponent {
  public get confirmBtn() {
    return this.host.getByRole("button", { name: "Confirm" });
  }

  public get rejectReasonField() {
    return this.host.getByRole("textbox");
  }

  async reject(reason: string) {
    await this.rejectReasonField.fill(reason);
    await this.confirmBtn.click();
    await this.page.waitForResponse(API.rejectTask);
  }
}
