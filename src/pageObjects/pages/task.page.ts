import { Page } from "@playwright/test";
import { BasePage } from "../base.page";
import RejectPopup from "../components/rejectPopup";
import DetailTaskPopup from "./../components/detailTaskPopup";
import TaskBoard from "./../components/taskBoard";

export default class TaskPage extends BasePage {
  public taskBoard: TaskBoard;
  public detailTaskPopup: DetailTaskPopup;
  public rejectPopup: RejectPopup;
  constructor(readonly page: Page) {
    super(page, "/tasks");
    this.taskBoard = new TaskBoard(page);
    this.detailTaskPopup = new DetailTaskPopup(page);
    this.rejectPopup = new RejectPopup(page);
  }

  async dragToApproveCol(id: string) {
    await this.taskBoard.dragItemIdToCol(id, 0, 1);
  }

  async dragToRejectCol(id: string, reason: string) {
    await this.taskBoard.dragItemIdToCol(id, 0, 2);
    await this.rejectPopup.reject(reason);
  }
}
