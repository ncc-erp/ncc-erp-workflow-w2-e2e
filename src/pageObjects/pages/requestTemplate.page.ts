import { Page, expect } from "@playwright/test";
import { RequestFormType } from "../../data/requestTemplate.data";
import { chooseFile } from "../../utils/chooseFile";
import { BasePage } from "../base.page";
import Button from "../components/button";
import Form from "../components/form";
import Popup from "../components/popup";
import { API } from "./../../data/apis";
import RequestForm from "./../components/requestForm";

export default class RequestTemplatePage extends BasePage {
  public deviceRequestForm: RequestForm;
  createWorkflowPopup: Form;
  popup: Popup;
  form: Form;
  constructor(readonly page: Page) {
    super(page, "/request-templates");
    this.deviceRequestForm = new RequestForm(this.page);
    this.button = new Button(this.page);
    this.createWorkflowPopup = new Form(this.page);
    this.popup = new Popup(this.page);
    this.form = new Form(this.page);
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

  async createWorkflow(name: string, displayName: string) {
    await this.button.clickButtonByName("Create");
    await this.fillWorkflowField("Name", name);
    await this.fillWorkflowField("Display Name", displayName);
    await this.button.clickButtonByName("Create");
    await this.popup.closePopup("Workflow Detail");
  }

  async import(type: string, path: string) {
    await this.button.clickButtonByName("Import");
    await chooseFile(this.page, path, this.page.getByRole("textbox"));
    // Verify that data has been imported
    await expect(this.page.getByText("No data imported !")).toBeHidden();
    await this.button.clickButtonByName("Import");
    // Import workflow and workflow input have some steps in common
    if (type === "workflow") {
      await this.button.clickButtonByName("Create");
      await this.popup.closePopup("Workflow Detail");
    }
  }

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

  async fillWorkflowField(label: string, value: string) {
    const locator = 'form>div>div[role="group"]';
    await this.form.fillFormFieldByLabel(label, value, locator);
  }

  async openPopupModal(workflowName: string, type: "Setting" | "Action") {
    const buttonIndex = type === "Setting" ? 0 : 1;
    await this.page.getByRole("row", { name: workflowName }).getByRole("button").nth(buttonIndex).click();
  }

  // async exportWorkflowInput(workflowName: string) {
  //   await this.openPopupModal(workflowName, "Setting");
  //   await this.clickOptionInSettingModalPopup("Define Input");
  //   await this.button.clickButtonByName("Export");
  // }

  async clickOptionInSettingModalPopup(option: string) {
    await this.page.getByRole("menuitem", { name: option }).click();
    if (option === "Publish" || option === "Unpublish") {
      await this.page.waitForResponse(API.changeWorkflowStatus);
    }
  }
}
