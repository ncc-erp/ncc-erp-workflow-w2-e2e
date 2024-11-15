import { Page } from "@playwright/test";
import { DataTable } from "playwright-bdd";
import { waitLoading } from "../../utils/waitLoading";
import { BasePage } from "../base.page";
import RejectPopup from "../components/rejectPopup";
import Table from "../components/table";
import DetailTaskPopup from "./../components/detailTaskPopup";
import TaskBoard from "./../components/taskBoard";

export default class TaskPage extends BasePage {
  public taskBoard: TaskBoard;
  public detailTaskPopup: DetailTaskPopup;
  public rejectPopup: RejectPopup;
  public table: Table;

  constructor(readonly page: Page) {
    super(page, "/tasks");
    this.taskBoard = new TaskBoard(page);
    this.detailTaskPopup = new DetailTaskPopup(page);
    this.rejectPopup = new RejectPopup(page);
    this.table = new Table(page);
  }

  public get timeDropDown() {
    return this.page.getByRole("combobox").nth(2);
  }

  async dragToApproveCol(id: string) {
    await this.taskBoard.dragItemIdToCol(id, 0, 1);
  }

  async dragToRejectCol(id: string, reason: string) {
    await this.taskBoard.dragItemIdToCol(id, 0, 2);
    await this.rejectPopup.reject(reason);
  }
  async boardView() {
    await this.page.getByRole("button", { name: "Call Sage" }).nth(0).click();
    await waitLoading(this.page);
  }

  async tableView() {
    await this.page.getByRole("button", { name: "Call Sage" }).nth(1).click();
    await waitLoading(this.page);
  }

  async verifyFilterStatus(status: string) {
    await this.table.verifyCellOfCol(5, status);
  }

  async verifyTimeDropdownOptions(dataTable: DataTable) {
    await this.dropdown.verifyDropdownOptions(this.timeDropDown, dataTable);
  }
}
