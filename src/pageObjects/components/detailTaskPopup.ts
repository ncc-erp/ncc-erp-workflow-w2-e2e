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

  public get approveStrengthPoints() {
    return this.host.locator('[data-testid="StrengthPoints"] textarea');
  }

  public get approveWeaknessPoints() {
    return this.host.locator('[data-testid="WeaknessPoints"] textarea');
  }

  async approve(strengthPoints?, weaknessPoints?) {
    await this.approveBtn.click();
    if (strengthPoints && typeof strengthPoints === "string") {
      await this.approveStrengthPoints.fill(strengthPoints);
    }
    if (weaknessPoints && typeof weaknessPoints === "string") {
      await this.approveWeaknessPoints.fill(weaknessPoints);
    }
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
