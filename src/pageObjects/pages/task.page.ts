import { Page } from "@playwright/test";
import { BasePage } from "../base.page";
import DetailTaskPopup from "./../components/detailTaskPopup";
import TaskBoard from "./../components/taskBoard";

export default class TaskPage extends BasePage {
  public taskBoard: TaskBoard;
  public detailTaskPopup: DetailTaskPopup;
  constructor(readonly page: Page) {
    super(page, "/tasks");
    this.taskBoard = new TaskBoard(page);
    this.detailTaskPopup = new DetailTaskPopup(page);
  }

  async verifyHasPendingTask(title: string, requestUser: string, currentStatus: string) {
    await this.taskBoard.verifyHasTask(0, title, requestUser, currentStatus);
  }
  async verifyHasApproveTask(title: string, requestUser: string, currentStatus: string) {
    await this.taskBoard.verifyHasTask(1, title, requestUser, currentStatus);
  }
  async verifyHasRejectTask(title: string, requestUser: string, currentStatus: string) {
    await this.taskBoard.verifyHasTask(2, title, requestUser, currentStatus);
  }
}
