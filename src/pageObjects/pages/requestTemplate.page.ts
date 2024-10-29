import { Page, expect } from "@playwright/test";
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
    const response = await this.page.waitForResponse(API.createNewRequest);

    if (name == "Probationary Confirmation Request") {
      // this request not create directly
      await new Promise<void>((r) => setTimeout(() => r(), 120000));
    }
    const res = await response.json();
    return {
      id: res.workflowInstanceId,
    };
  }
  // create new template

  async verifyWorkflowDisplay(name: string, displayName: string, publish: string, expectedStatus: string) {
    const rowCount = await this.page.locator("tbody > tr").count();
    let actualStatus = "not displayed";
    for (let i = 0; i < rowCount; i++) {
      if (
        (await this.page.locator("tr:nth-child(" + (i + 1) + ") > td:nth-child(1)").innerText()) === displayName &&
        (await this.page.locator("tr:nth-child(" + (i + 1) + ") > td:nth-child(2)").innerText()) === name &&
        (await this.page.locator("tr:nth-child(" + (i + 1) + ") > td:nth-child(4)").innerText()) === publish
      ) {
        actualStatus = "displayed";
        break;
      }
    }
    expect(actualStatus).toBe(expectedStatus);
  }
}
