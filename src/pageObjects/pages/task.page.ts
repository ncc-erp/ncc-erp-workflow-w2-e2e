import { Page } from "@playwright/test";
import { BasePage } from "../base.page";
import RejectPopup from "../components/rejectPopup";
import DetailTaskPopup from "./../components/detailTaskPopup";
import TaskBoard from "./../components/taskBoard";
import Table from "../components/table";
import { API } from "../../data/apis";

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

  async dragToApproveCol(id: string) {
    await this.taskBoard.dragItemIdToCol(id, 0, 1);
    await this.button.clickByName("Confirm");
  }

  async dragToRejectCol(id: string, reason: string) {
    await this.taskBoard.dragItemIdToCol(id, 0, 2);
    await this.rejectPopup.reject(reason);
  }
  async boardView() {
    await this.page.getByRole("button", { name: "Call Sage" }).nth(0).click();
  }

  async tableView() {
    await this.page.getByRole("button", { name: "Call Sage" }).nth(1).click();
  }

  async filterByStatus(status: string) {
    await this.page.getByRole("combobox").nth(1).selectOption(status);
  }

  async prepareApproveOrRejectInTable(id: string) {
    await this.tableView();
    await this.page.waitForResponse(API.listTask);
    await this.table.clickSettingButtonByInstanceId(id);
  }

  async approveRequestInTableMode(id: string) {
    await this.prepareApproveOrRejectInTable(id);
    await this.menuItem.clickByName("Approve");
    await this.button.clickByName("Confirm");
    await this.page.waitForResponse(API.approveTask);
  }

  async rejectRequestInTableMode(id: string, reason: string) {
    await this.prepareApproveOrRejectInTable(id);
    await this.menuItem.clickByName("Reject");
    await this.rejectPopup.reject(reason);
  }
}
