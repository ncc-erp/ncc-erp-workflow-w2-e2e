import { getRandomContent, getRandomPastDate } from "./fakerUtils";
import { UnlockTimesheetRequestForm } from "./requestTemplate.data";
import { users } from "./users.data";

export const UnlockTimesheetRequestData = {
  user: {
    getRandomData(): UnlockTimesheetRequestForm {
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
      };
    },
  },
};
