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

  public get approveNote() {
    return this.host.locator('[data-testid="Note"] textarea');
  }

  async approve(fields?: { strengthPoints?: string; weeknessPoints?: string; note?: string }) {
    await this.approveBtn.click();
    if (fields?.strengthPoints && typeof fields.strengthPoints === "string") {
      await this.approveStrengthPoints.fill(fields.strengthPoints);
    }
    if (fields?.weeknessPoints && typeof fields.weeknessPoints === "string") {
      await this.approveWeaknessPoints.fill(fields.weeknessPoints);
    }
    if (fields?.note && typeof fields.note === "string") {
      await this.approveNote.fill(fields.note);
    }
    await this.confirmBtn.click();
    await this.page.waitForResponse(API.approveTask);
  }

  async reject(reason: string) {
    // todo
    await this.rejectBtn.click();
    await this.rejectReasonField.fill(reason);
    await this.confirmBtn.click();
    await this.page.waitForResponse(API.rejectTask);
  }
}
