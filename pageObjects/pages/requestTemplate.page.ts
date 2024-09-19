import { Page } from "@playwright/test";
import { RequestFormType } from "../../data/requestTemplate.data";
import { BasePage } from "../base.page";
import { API } from "./../../data/apis";
import RequestForm from "./../components/requestForm";

export default class RequestTemplatePage extends BasePage {
  public deviceRequestForm: RequestForm;
  constructor(readonly page: Page) {
    super(page, "/request-templates");
    this.deviceRequestForm = new RequestForm(this.page);
  }

  async clickAddRequest(requestName: string) {
    await this.page
      .getByRole("row", { name: `${requestName}` })
      .getByLabel("Popup modal")
      .click();
  }

  async createRequest(name: string, data: RequestFormType) {
    await this.clickAddRequest(name);
    await this.deviceRequestForm.fillForm(data);
    await this.deviceRequestForm.submit();
    await this.page.waitForResponse(API.createNewRequest);
  }
  // create new template
}
