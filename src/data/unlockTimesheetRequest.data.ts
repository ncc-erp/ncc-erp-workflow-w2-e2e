import { formatDate } from "../utils/komuNotification";
import { getRandomContent, getRandomPastDate } from "./fakerUtils";
import { UnlockTimesheetRequestForm } from "./requestTemplate.data";
import { users } from "./users.data";

export const UnlockTimesheetRequestData = {
  user: {
    getRandomData(): UnlockTimesheetRequestForm {
      const formattedDate = formatDate(new Date());
      return {
        TimeUnlock: {
          type: "date",
          value: `${getRandomPastDate()}`,
        },
        Reason: {
          type: "textarea",
          value: getRandomContent(),
        },
        getTitle() {
          return `Unlock Timesheet Request ${this.TimeUnlock.value}`;
        },
        getNotificationSubject() {
          return `[Unlock Timesheet Request] [${users.user.name}] - ${users.user.username}`;
        },
        getKomuMessage() {
          return `\n**${users.user.name}** has send **Unlock Timesheet Request**:\n# ${formattedDate}\nUnlock time: ${this.TimeUnlock.value}`;
        },
        getApprovedKomuMessage() {
          return `\nThe **Unlock Timesheet Request** of **${users.user.name}** has been approved by`;
        },
        getRejectedKomuMessage() {
          return `\nThe **Unlock Timesheet Request** of **${users.user.name}** has been rejected by`;
        },
      };
    },
  },
};
