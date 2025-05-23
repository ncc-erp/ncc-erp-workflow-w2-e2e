import { Page, expect } from "@playwright/test";
import { DataTable } from "playwright-bdd";
import { RequestFormType } from "../../data/requestTemplate.data";
import { checkColor } from "../../utils/checkColor";
import { chooseFile } from "../../utils/chooseFile";
import { convertHexToRGB } from "../../utils/convertHexToRGB";
import { waitLoading } from "../../utils/waitLoading";
import { BasePage } from "../base.page";
import Form from "../components/form";
import LeftSideMenu from "../components/leftSideMenu";
import RequestTemplate from "../components/requestTemplate";
import RequestTemplateSettingMenu from "../components/requestTemplateSettingMenu";
import { API } from "./../../data/apis";
import RequestForm from "./../components/requestForm";

export default class RequestTemplatePage extends BasePage {
  public requestTemplate: RequestTemplate;
  public requestTemplateSettingMenu: RequestTemplateSettingMenu;
  public deviceRequestForm: RequestForm;
  createWorkflowPopup: Form;
  public leftSideMenu: LeftSideMenu;

  constructor(readonly page: Page) {
    super(page, "/request-templates");
    this.deviceRequestForm = new RequestForm(this.page);
    this.createWorkflowPopup = new Form(this.page);
    this.requestTemplate = new RequestTemplate(this.page);
    this.requestTemplateSettingMenu = new RequestTemplateSettingMenu(this.page);
    this.leftSideMenu = new LeftSideMenu(this.page);
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
    const response = await this.deviceRequestForm.submit();

    if (name == "Probationary Confirmation Request") {
      // this request not create directly
      await new Promise<void>((r) => setTimeout(() => r(), 120000));
    }
    return {
      id: response.workflowInstanceId,
    };
  }
  // create new template
  async createWorkflow(name: string, displayName: string) {
    await this.button.clickByName("Create");
    await this.fillWorkflowField("Name", name);
    await this.fillWorkflowField("Display Name", displayName);
    await Promise.all([this.page.waitForResponse(API.listAll), this.button.clickByName("Create")]);
  }

  async import(path: string) {
    // Import workflow and workflow input have some steps in common
    await this.importInput(path);
    await Promise.all([this.page.waitForResponse(API.listAll), this.button.clickByName("Create")]);
  }

  async importInput(path: string) {
    await this.button.clickByName("Import");
    await chooseFile(this.page, path, this.page.getByRole("textbox"));
    await expect(this.page.getByText("No data imported !")).toBeHidden();
    await this.button.clickByName("Import");
  }

  async verifyWorkflowDisplay(
    expectedName: string,
    expectedDisplayName: string,
    expectedPublish: string,
    expectedStatus: string
  ) {
    // wait render
    const workflowRow = this.page.locator("tbody > tr");
    // filter rightRow
    const rowFound = workflowRow
      .filter({
        has: this.page.locator(`td:nth-child(2):text-is("${expectedName}")`),
      })
      .filter({
        has: this.page.locator(`td:nth-child(1):text-is("${expectedDisplayName}")`),
      })
      .filter({
        has: this.page.locator(`td:nth-child(4) > div:text-is("${expectedPublish}")`),
      });

    if (expectedStatus == "displayed") {
      await expect(rowFound).toBeVisible();
    } else {
      await expect(rowFound).toBeHidden();
    }
  }

  async fillWorkflowField(label: string, value: string) {
    await this.form.fillFormFieldByLabel(label, value);
  }

  async openSettingMenuByWorkflowName(workflowName: string) {
    await this.page
      .locator("tbody > tr")
      .filter({
        has: this.page.locator(`td:nth-child(2):text-is("${workflowName}")`),
      })
      .locator("button")
      .nth(1)
      .click();
  }

  async openActionPopupByWorkflowName(workflowName: string) {
    await this.page.getByRole("row", { name: workflowName }).getByRole("button").nth(0).click();
  }

  async clickOptionInSettingMenu(option: string) {
    if (option === "Publish" || option === "Unpublish") {
      await Promise.all([
        this.page.waitForResponse(API.changeWorkflowStatus),
        this.page.waitForResponse(API.listAll),
        this.menuItem.clickByName(option),
      ]);
    } else if (option === "Define Input") {
      await Promise.all([this.page.waitForResponse(API.workflowInputDefinition), this.menuItem.clickByName(option)]);
    } else {
      await this.menuItem.clickByName(option);
    }
  }

  // Method to add and edit properties in Define Input
  async inputProperty(dataTable: DataTable) {
    const properties = dataTable.hashes();
    // Determine the expected row count need to modify by finding the maximum row number in the list
    const expectedRowCount = Math.max(...properties.map((property) => Number(property.row)));
    for (let i = 0; i < properties.length; i++) {
      const row = Number(properties[i].row);
      const name = properties[i].name;
      const type = properties[i].type;
      const required = properties[i].required;

      let actualPropertyCount = await this.page.getByText("Property Name *").count();
      if (actualPropertyCount < row) {
        await this.button.clickByName("Add field");
        actualPropertyCount++; // Increase the actual row count to reflect the added row
      }
      const nameInput = this.form
        .getFormGroupByLabel("Property Name")
        .nth(row - 1)
        .getByRole("textbox");
      if ((await nameInput.inputValue()) !== name) {
        await nameInput.fill(name);
      }
      const typeInput = this.form
        .getFormGroupByLabel("Property Type")
        .nth(row - 1)
        .getByRole("combobox");
      if ((await typeInput.inputValue()) !== type) {
        await typeInput.selectOption(type);
      }
      const requiredElement = this.form
        .getFormGroupByLabel("Required")
        .nth(row - 1)
        .locator("span");
      const requiredInput = (await requiredElement.getAttribute("data-checked")) !== null ? "true" : "false";

      if (requiredInput !== required) {
        await requiredElement.click();
      }
      if (actualPropertyCount < expectedRowCount) {
        await this.button.clickByName("Add field");
      }
    }
  }

  async verifyFieldDisplayInActionPopup(dataTable: DataTable) {
    const labels = dataTable.hashes();
    for (const { label } of labels) {
      await expect(this.page.getByText(label)).toBeVisible();
    }
  }

  async removeProperty(dataTable: DataTable) {
    const properties = dataTable.hashes();
    const propertyCount = await this.page.getByText("Property Name *").count(); // Total count of properties displayed in the UI
    for (const property of properties) {
      const propertyName = property.name;
      for (let i = 0; i < propertyCount; i++) {
        const actualProperty = this.form.getFormGroupByLabel("Property Name").nth(i).getByRole("textbox");
        const actualPropertyValue = await actualProperty.inputValue();
        if (actualPropertyValue === propertyName) {
          const removeButton = this.page.getByRole("button", { name: "Remove" }).nth(i);
          await removeButton.click();
          break;
        }
      }
    }
  }

  async verifyProperty(dataTable: DataTable) {
    const properties = dataTable.hashes();
    const propertyCount = await this.page.getByText("Property Name *").count();
    for (let i = 0; i < propertyCount; i++) {
      const propertyName = properties[i].propertyName;
      const type = properties[i].type;
      const required = properties[i].required;

      await expect(this.form.getFormGroupByLabel("Property Name").nth(i).getByRole("textbox")).toHaveValue(
        propertyName
      );
      await expect(this.form.getFormGroupByLabel("Property Type").nth(i).getByRole("combobox")).toHaveValue(type);
      const dataChecked = this.form.getFormGroupByLabel("Required").nth(i).locator("span").getAttribute("data-checked");
      const requiredInput = dataChecked !== null ? "true" : "false";
      expect(requiredInput).toBe(required);
    }
  }

  async verifyPropertyTypeDropdown(propertyName: string, dataTable: DataTable) {
    const propertyCount = await this.page.getByText("Property Name *").count();
    for (let i = 0; i < propertyCount; i++) {
      if (
        (await this.form.getFormGroupByLabel("Property Name").nth(i).getByRole("textbox").inputValue()) === propertyName
      ) {
        const propertyTypeLocator = this.form.getFormGroupByLabel("Property Type").nth(i).getByRole("combobox");
        await this.dropdown.verifyDropdownOptions(propertyTypeLocator, dataTable);
        break;
      }
    }
  }

  async selectTypeDropdownByPropertyName(propertyName: string) {
    const propertyCount = await this.page.getByText("Property Name *").count();
    for (let i = 0; i < propertyCount; i++) {
      if (
        (await this.form.getFormGroupByLabel("Property Name").nth(i).getByRole("textbox").inputValue()) === propertyName
      ) {
        await this.form.getFormGroupByLabel("Property Type").nth(i).locator("select").click();
        break;
      }
    }
  }

  async verifyWorkflowStatus(workflowName: string, status: string) {
    const rowCount = await this.page.locator("tbody > tr").count();
    for (let i = 1; i <= rowCount; i++) {
      if ((await this.page.locator("tr:nth-child(" + i + ") > td:nth-child(2)").innerText()) === workflowName) {
        await expect(this.page.locator("tr:nth-child(" + i + ") > td:nth-child(4)")).toContainText(status);
        break;
      }
    }
  }

  async verifyWorkflowColor(color: string, workflowName: string) {
    const expectedRGBcolor = convertHexToRGB(color);
    await checkColor(
      this.page
        .locator("div")
        .filter({ hasText: new RegExp("^Color:" + workflowName + "$") })
        .locator("div")
        .nth(3),
      "background",
      await expectedRGBcolor
    );
  }

  async verifyWorkflowTitle(title: string) {
    await expect(this.page.getByTestId("title").getByRole("textbox")).toHaveValue(title);
  }

  async deleteWorkflowByName(workflowName: string) {
    await waitLoading(this.page);
    const workflowCount = await this.page.locator(`tr:has(td:has-text("${workflowName}"))`).count();
    for (let i = 1; i <= workflowCount; i++) {
      await this.openSettingMenuByWorkflowName(workflowName);
      await this.clickOptionInSettingMenu("Delete");
      await Promise.all([this.page.waitForResponse(API.deleteWorkflow), this.button.clickByName("Yes")]);
    }
  }
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
