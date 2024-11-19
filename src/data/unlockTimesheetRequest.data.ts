import { getRandomContent, getRandomPastDate } from "./fakerUtils";
import { UnlockTimesheetRequestForm } from "./requestTemplate.data";

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
      };
    },
  },
};
