import { Page, expect } from "@playwright/test";
import { DataTable } from "playwright-bdd";
import { RequestFormType } from "../../data/requestTemplate.data";
import { checkColor } from "../../utils/checkColor";
import { chooseFile } from "../../utils/chooseFile";
import { convertHexToRGB } from "../../utils/convertHexToRGB";
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
    for (let i = 1; i <= rowCount; i++) {
      if (
        (await this.page.locator("tr:nth-child(" + i + ") > td:nth-child(1)").innerText()) === displayName &&
        (await this.page.locator("tr:nth-child(" + i + ") > td:nth-child(2)").innerText()) === name &&
        (await this.page.locator("tr:nth-child(" + i + ") > td:nth-child(4)").innerText()) === publish
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

  async openPopupModal(workflowDisplayName: string, type: "Setting" | "Action") {
    const buttonIndex = type === "Setting" ? 0 : 1;
    await this.page.getByRole("row", { name: workflowDisplayName }).getByRole("button").nth(buttonIndex).click();
  }

  async clickOptionInSettingModalPopup(option: string) {
    const optionElement = this.page.getByRole("menuitem", { name: option });
    await expect(optionElement).toBeVisible({ timeout: 30000 });
    if (option === "Publish" || option === "Unpublish") {
      await Promise.all([
        optionElement.click(),
        this.page.waitForResponse(API.changeWorkflowStatus),
        this.page.waitForResponse(API.listAll),
      ]);
    } else {
      await optionElement.click();
    }
  }

  // Method to add and edit properties in Define Input
  async inputProperty(dataTable: DataTable) {
    // Get the list of properties from the DataTable
    const properties = dataTable.hashes();

    // Determine the expected row count need to modify by finding the maximum row number in the list
    // The 'row' property is convert to a number because DataTable values are read as strings by default
    const expectedRowCount = Math.max(...properties.map((property) => Number(property.row)));

    // Loop through each property in the properties list
    for (let i = 0; i < properties.length; i++) {
      const row = Number(properties[i].row);
      const name = properties[i].name;
      const type = properties[i].type;
      const required = properties[i].required;

      // Get the current number of properties displayed
      let actualRowCount = await this.page.getByText("Property Name *").count();

      // If the actual rows are fewer than expected, click "Add Field" to add more
      if (actualRowCount < row) {
        await this.page.getByTestId("button-add-field").click();
        actualRowCount++; // Increase the actual row count to reflect the added row
      }

      // Locate the input field of property name in corresponding row
      // Adjust index as 'row - 1' because passed data is one-based indexing whil code is zero-based one
      const nameInput = this.page.getByTestId("items." + (row - 1) + ".name").getByRole("textbox");

      // If the actual property name differs from expected, fill in the expected name
      if ((await nameInput.inputValue()) !== name) {
        await nameInput.fill(name);
      }

      // Locate the input field of property type in corresponding row
      const typeInput = this.page.getByTestId("items." + (row - 1) + ".type").getByRole("combobox");

      // If the actual property type differs from expected, select the expected type
      if ((await typeInput.inputValue()) !== type) {
        await typeInput.selectOption(type);
      }

      // Locate the "Required" checkbox element in corresponding row
      const requiredElement = this.page
        .getByText("Property Name *Property")
        .nth(row - 1)
        .locator("span")
        .nth(1);

      // Verify if the corresponding refired checkbox get attribute 'data-checked' or not
      const requiredInput = (await requiredElement.getAttribute("data-checked")) !== null ? "true" : "false";

      // If the status differs from the expected, toggle the checkbox
      if (requiredInput !== required) {
        await requiredElement.click();
      }
      // After modify values of a row, add additional rows if the current row count is still less than expected
      if (actualRowCount < expectedRowCount) {
        await this.page.getByTestId("button-add-field").click();
      }
    }
  }

  async verifyFieldInActionPopup(dataTable: DataTable) {
    const labels = dataTable.hashes();
    for (const { label } of labels) {
      await expect(this.page.getByText(label, { exact: true })).toBeVisible();
    }
  }

  async removeProperty(dataTable: DataTable) {
    const properties = dataTable.hashes(); // Properties from the data table
    const propertyCount = await this.page.getByText("Property Name *").count(); // Total count of properties displayed in the UI
    for (const property of properties) {
      const propertyName = property.name;
      for (let i = 0; i < propertyCount; i++) {
        // Dynamically construct the locator for each property name textbox
        const actualProperty = this.page.getByTestId("items." + i + ".name").getByRole("textbox");
        const actualPropertyValue = await actualProperty.inputValue();
        // If the UI propertyValue value matches the property name in data table, click the corresponding "Remove" button
        if (actualPropertyValue === propertyName) {
          const removeButton = this.page.getByRole("button", { name: "Remove" }).nth(i);
          await removeButton.click();
          break;
        }
      }
    }
  }

  async verifyRemovePropertyButtonStatus() {
    const removeButton = this.page.getByRole("button", { name: "Remove" }).nth(0);
    await expect(removeButton).toHaveAttribute("disabled");
  }

  async verifyProperty(dataTable: DataTable) {
    const properties = dataTable.hashes();
    const propertyCount = await this.page.getByText("Property Name *").count();
    for (let i = 0; i < propertyCount; i++) {
      const propertyName = properties[i].propertyName;
      const type = properties[i].type;
      const required = properties[i].required;
      await expect(this.page.getByTestId("items." + i + ".name").getByRole("textbox")).toHaveValue(propertyName);
      await expect(this.page.getByTestId("items." + i + ".type").getByRole("combobox")).toHaveValue(type);
      const dataChecked = await this.page
        .getByText("Property Name *Property")
        .nth(i)
        .locator("span")
        .nth(1)
        .getAttribute("data-checked");
      const requiredInput = dataChecked !== null ? "true" : "false";
      expect(requiredInput).toBe(required);
    }
  }

  async verifyPropertyTypeDropdown(propertyName: string, dataTable: DataTable) {
    const propertyCount = await this.page.getByText("Property Name *").count();
    const expectedOptions = dataTable.rows().map((row) => row[0]);
    for (let i = 0; i < propertyCount; i++) {
      if (
        (await this.page
          .getByTestId("items." + i + ".name")
          .getByRole("textbox")
          .inputValue()) === propertyName
      ) {
        const actualOptions = (
          await this.page
            .getByTestId("items." + i + ".type")
            .getByRole("combobox")
            .innerText()
        )
          .split("\n")
          .map((option) => option);
        expect(actualOptions).toEqual(expectedOptions);
        break;
      }
    }
  }

  async selectPropertyType(propertyName: string) {
    const propertyCount = await this.page.getByText("Property Name *").count();
    for (let i = 0; i < propertyCount; i++) {
      if (
        (await this.page
          .getByTestId("items." + i + ".name")
          .getByRole("textbox")
          .inputValue()) === propertyName
      ) {
        await this.page
          .getByTestId("items." + i + ".type")
          .getByRole("combobox")
          .click();
        break;
      }
    }
  }

  async verifyWorkflowStatus(workflowName: string, status: string) {
    const rowCount = await this.page.getByRole("row").count();
    for (let i = 1; i < rowCount; i++) {
      if ((await this.page.locator("tr:nth-child(" + i + ") > td:nth-child(2)").innerText()) === workflowName) {
        await expect(this.page.locator("tr:nth-child(" + i + ") > td:nth-child(4)")).toContainText(status);
        break;
      }
    }
  }

  async verifyColorWorkflow(color: string, workflowName: string) {
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

  async verifyTitleWorkflow(title: string) {
    await expect(this.page.getByTestId("title").getByRole("textbox")).toHaveValue(title);
  }

  async deleteWorkflow(workflowName: string) {
    await this.openPopupModal(workflowName, "Setting");
    await this.clickOptionInSettingModalPopup("Delete");
    await this.button.clickButtonByName("Yes");
    await expect(this.page.getByText("Do you want to delete")).toBeHidden();
  }

  async deleteMultiWorkflow(dataTable: DataTable) {
    const workflows = dataTable.hashes();
    for (let i = 0; i < workflows.length; i++) {
      const expectedName = workflows[i].workflowName;
      await this.openPopupModal(expectedName, "Setting");
      await this.clickOptionInSettingModalPopup("Delete");
      await this.button.clickButtonByName("Yes");
      await expect(this.page.getByText("Do you want to delete")).toBeHidden();
    }
  }
}
