import { formatDate } from "../utils/komuNotification";
import { getRandomContent, getRandomFutureDate } from "./fakerUtils";
import { ResignationRequestForm } from "./requestTemplate.data";
import { users } from "./users.data";

export const ResignationRequestData = {
  user: {
    getRandomData(): ResignationRequestForm {
      const formattedDate = formatDate(new Date());
      return {
        DesiredLastWorkingDay: {
          type: "date",
          value: `${getRandomFutureDate()}`,
        },
        Reason: {
          type: "textarea",
          value: getRandomContent(),
        },
        getTitle() {
          return `Request for Resignation: Final Day ${this.DesiredLastWorkingDay.value}`;
        },
        getNotificationSubject() {
          return `[Resignation Request] [Fintech Control Tower] - ${users.user.name}`;
        },
        getKomuMessage() {
          return `\n**${users.user.name}** has send **Resignation Request**:\n# ${formattedDate}`;
        },
        getApprovedKomuMessage() {
          return `\nThe **Resignation Request** of **${users.user.name}** has been approved by`;
        },
        getRejectedKomuMessage() {
          return `\nThe **Resignation Request** of **${users.user.name}** has been rejected by`;
        },
      };
    },
  },
};
