import { Page } from "@playwright/test";
import { BasePage } from "../base.page";
import { API } from "./../../data/apis";
import { RequestTypeData } from "./../../data/requestTemplates/requestType";
import DeviceRequest, { DeviceRequestForm } from "./../components/deviceRequest";

export default class RequestTemplatePage extends BasePage {
  public deviceRequestForm: DeviceRequest;
  constructor(readonly page: Page) {
    super(page, "/request-templates");
    this.deviceRequestForm = new DeviceRequest(this.page);
  }

  async clickAddRequest(requestName: string) {
    await this.page
      .getByRole("row", { name: `${requestName} Popup modal` })
      .getByLabel("Popup modal")
      .click();
  }

  async createDeviceRequest(data: DeviceRequestForm) {
    await this.clickAddRequest(RequestTypeData.DeviceRequest.name);
    await this.deviceRequestForm.fillForm(data);
    await this.deviceRequestForm.submit();
    await this.page.waitForResponse(API.createNewRequest);
  }
  // create new template
}
