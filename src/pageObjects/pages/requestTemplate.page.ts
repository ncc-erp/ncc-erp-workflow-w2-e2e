import { Page } from "@playwright/test";
import { RequestFormType } from "../../data/requestTemplate.data";
import { BasePage } from "../base.page";
import { API } from "./../../data/apis";
import RequestForm from "./../components/requestForm";
import RequestTemplate from "../components/requestTemplate";
import RequestTemplateSettingMenu from "../components/requestTemplateSettingMenu";

export default class RequestTemplatePage extends BasePage {
  public requestTemplate: RequestTemplate;
  public requestTemplateSettingMenu: RequestTemplateSettingMenu;
  public deviceRequestForm: RequestForm;
  constructor(readonly page: Page) {
    super(page, "/request-templates");
    this.deviceRequestForm = new RequestForm(this.page);
    this.requestTemplate = new RequestTemplate(this.page);
    this.requestTemplateSettingMenu = new RequestTemplateSettingMenu(this.page);
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
  async clickCreateNewTemplate() {
    await this.page.getByRole("button", { name: "Create" }).click();
  }
  // import new template
  async clickImportNewTemplate() {
    await this.page.getByRole("button", { name: "Import" }).click();
  }
  async clickMenuButton(id: string, btnName: string) {
    await this.requestTemplate.clickSettingButtonById(id);
    (await this.requestTemplateSettingMenu.menuButton(btnName)).click();
  }
}
