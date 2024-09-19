import { RequestFormType } from "../../data/requestTemplate.data";
import { BaseComponent } from "../base.component";

export default class RequestForm extends BaseComponent {
  public get saveBtn() {
    return this.host.getByRole("button", { name: "Save" });
  }

  async fillForm(data: RequestFormType) {
    for (let key of Object.keys(data)) {
      // fill by key
      let field = this.host.getByTestId(key);
      switch (data[key].type) {
        case "select":
          await field.click();
          await field.getByText(data[key].value, { exact: true }).click();
          break;
        case "date":
          await field.locator("input").fill(data[key].value);
          await field.locator('[aria-selected="true"]').click();
          break;
        case "mutidate":
        case "text":
          await field.locator("input").fill(data[key].value);
          break;
        case "textarea":
          await field.locator("textarea").fill(data[key].value);
          break;
        default:
        // await field.fill(data[key].value);
      }
    }
  }

  async submit() {
    await this.saveBtn.click();
  }
}
