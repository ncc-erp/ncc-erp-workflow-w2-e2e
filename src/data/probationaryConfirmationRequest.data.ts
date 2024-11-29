import { formatDate } from "../utils/komuNotification";
import { getRandomContent, getRandomDatesForProbationaryConfirmation } from "./fakerUtils";
import { ProbationaryConfirmationRequest } from "./requestTemplate.data";
import { users } from "./users.data";

export const ProbationaryConfirmationRequestData = {
  user: {
    getRandomData(): ProbationaryConfirmationRequest {
      const formattedDate = formatDate(new Date());
      const { startDate, endDate } = getRandomDatesForProbationaryConfirmation();
      return {
        Staff: {
          type: "select",
          value: "Mạnh Nguyễn Văn (manh.nguyenvan@ncc.asia)",
          code: `manh.nguyenvan@ncc.asia`,
        },
        Project: {
          type: "select",
          value: "Fintech Control Tower",
          code: "fintech control tower",
        },
        CurrentOffice: {
          type: "select",
          value: "Đà Nẵng",
          code: "ĐN",
        },
        Content: {
          type: "textarea",
          value: getRandomContent(),
        },
        StartDate: {
          type: "date",
          value: startDate,
        },
        EndDate: {
          type: "date",
          value: endDate,
        },
        getTitle() {
          return `Confirm for ${this.Staff.code} (${this.EndDate.value})`;
        },
        getNotificationSubject() {
          return `[Probationary Confirmation Request] [${this.CurrentOffice.value}] - ${users.user.username}`;
        },
        getKomuMessage() {
          return `\n**${users.user.name}** has send **Probationary Confirmation Request**:\n# ${formattedDate}\nprobationary employee email: ${this.Staff.code}\nOffice: ${this.CurrentOffice.value}\nStart Day: ${this.StartDate.value}\nEnd Day: ${this.EndDate.value}`;
        },
        getApprovedKomuMessage() {
          return `\nThe **Probationary Confirmation Request** of **${users.user.name}** has been approved by`;
        },
        getRejectedKomuMessage() {
          return `\nThe **Probationary Confirmation Request** of **${users.user.name}** has been rejected by`;
        },
      };
    },
  },
};
