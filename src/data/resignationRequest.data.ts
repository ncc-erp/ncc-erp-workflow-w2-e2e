import { getRandomContent, getRandomFutureDate } from "./fakerUtils";
import { ResignationRequestForm } from "./requestTemplate.data";
import { users } from "./users.data";

export const ResignationRequestData = {
  user: {
    getRandomData(): ResignationRequestForm {
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
      };
    },
  },
};
