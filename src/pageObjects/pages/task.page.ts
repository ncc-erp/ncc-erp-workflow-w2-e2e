import { expect, Page } from "@playwright/test";
import { DataTable } from "playwright-bdd";
import { API } from "../../data/apis";
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
    await this.page.click('button:has-text("Confirm")');
  }

  async dragToRejectCol(id: string, reason: string) {
    await this.taskBoard.dragItemIdToCol(id, 0, 2);
    await this.rejectPopup.reject(reason);
  }
  async boardView() {
    await Promise.all([
      this.page.getByRole("button", { name: "Call Sage" }).nth(0).click(),
      this.page.waitForResponse(API.listTask),
    ]);
  }

  async tableView() {
    await Promise.all([
      this.page.getByRole("button", { name: "Call Sage" }).nth(1).click(),
      this.page.waitForResponse(API.listTask),
    ]);
  }

  async verifyFilterStatusInTableView(status: string) {
    await this.table.verifyCellOfCol(5, status);
  }

  async verifyTimeDropdownOptions(dataTable: DataTable) {
    await this.dropdown.verifyDropdownOptions(this.timeDropDown, dataTable);
  }

  async verifyStatusFilterInBoardView(status: string) {
    const columns = {
      Pending: this.page.getByTestId("board-view").getByTestId("board-col").nth(0),
      Approved: this.page.getByTestId("board-view").getByTestId("board-col").nth(1),
      Rejected: this.page.getByTestId("board-view").getByTestId("board-col").nth(2),
    };

    for (const [key, column] of Object.entries(columns)) {
      const boardItems = column.locator('[data-testid="board-item"]');
      if (key === status) {
        await expect(boardItems).not.toHaveCount(0); // Expect items in the selected column
      } else {
        await expect(boardItems).toHaveCount(0); // Expect no items in other columns
      }
    }
  }

  async filterByStatus(status: string) {
    await this.page.getByRole("combobox").nth(1).selectOption(status);
  }

  async openMenuAction(id: string) {
    await this.tableView();
    await this.table.clickSettingButtonByInstanceId(id);
  }

  async approveRequestInTableMode(id: string) {
    await this.openMenuAction(id);
    await this.menuItem.clickByName("Approve");
    await this.button.clickByName("Confirm");
    await this.page.waitForResponse(API.approveTask);
  }

  async rejectRequestInTableMode(id: string, reason: string) {
    await this.openMenuAction(id);
    await this.menuItem.clickByName("Reject");
    await this.rejectPopup.reject(reason);
  }
}
