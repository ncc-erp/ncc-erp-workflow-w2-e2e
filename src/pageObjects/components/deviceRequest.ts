import { DeviceRequestForm } from "../../data/requestTemplate.data";
import { BaseComponent } from "../base.component";

export default class DeviceRequest extends BaseComponent {
  public get currentOffice() {
    return this.host.locator(".css-1xc3v61-indicatorContainer").first();
  }
  public get project() {
    return this.host.locator(
      "div:nth-child(2) > .css-b62m3t-container > .css-13cymwt-control > .css-1wy0on6 > .css-1xc3v61-indicatorContainer"
    );
  }
  public get device() {
    return this.host.getByPlaceholder("Device");
  }
  public get reason() {
    return this.host.getByPlaceholder("Content");
  }
  public get saveBtn() {
    return this.host.getByRole("button", { name: "Save" });
  }

  async fillForm(data: DeviceRequestForm) {
    await this.currentOffice.click();
    await this.host.getByText(data.CurrentOffice.value, { exact: true }).click();

    await this.project.click();
    await this.host.getByText(data.Project.value, { exact: true }).click();

    await this.device.fill(data.Device.value);
    await this.reason.fill(data.Reason.value);
  }

  async submit() {
    await this.saveBtn.click();
  }
}
