import { API } from "../../data/apis";
import { BaseComponent } from "../base.component";

export default class DetailTaskPopup extends BaseComponent {
  public get approveBtn() {
    return this.host.getByRole("button", { name: "Approve" });
  }
  public get rejectBtn() {
    return this.host.getByRole("button", { name: "Reject" });
  }
  public get confirmBtn() {
    return this.host.getByRole("button", { name: "Confirm" });
  }

  public get rejectReasonField() {
    return this.host.getByRole("textbox");
  }

  async approve() {
    await this.approveBtn.click();
    await this.confirmBtn.click();
    await this.page.waitForResponse(API.approveTask);
  }

  async reject(reason: string) {
    await this.rejectBtn.click();
    await this.rejectReasonField.fill(reason);
    await this.confirmBtn.click();
    await this.page.waitForResponse(API.rejectTask);
  }
}
