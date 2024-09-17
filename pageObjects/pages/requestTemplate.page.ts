import { Page } from "@playwright/test";
import { BasePage } from "../base.page";
import { API } from "./../../data/apis";
import DeviceRequest, { DeviceRequestForm } from "./../components/deviceRequest";

export type RequestType = "Device Request";

export default class RequestTemplatePage extends BasePage {
  public deviceRequestForm: DeviceRequest;
  constructor(readonly page: Page) {
    super(page, "/request-templates");
    this.deviceRequestForm = new DeviceRequest(this.page);
  }

  async clickAddRequest(requestName: RequestType) {
    await this.page
      .getByRole("row", { name: `${requestName} Popup modal` })
      .getByLabel("Popup modal")
      .click();
  }

  async createDeviceRequest(data: DeviceRequestForm) {
    await this.clickAddRequest("Device Request");
    await this.deviceRequestForm.fillForm(data);
    await this.deviceRequestForm.submit();
    await this.page.waitForResponse(API.createNewRequest);
  }
}
