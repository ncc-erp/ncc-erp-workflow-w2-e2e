import { getMultiFutureDates, getRandomContent } from "./fakerUtils";
import { WFHRequestForm } from "./requestTemplate.data";
import { users } from "./users.data";

export const WfhRequestData = {
  user: {
    getRandomData(): WFHRequestForm {
      const data: WFHRequestForm = {
        CurrentOffice: {
          type: "select",
          value: "Đà Nẵng",
          code: "ĐN",
        },
        Project: {
          type: "select",
          value: "Support",
          code: "support",
        },
        Reason: {
          type: "textarea",
          value: getRandomContent(),
        },
        Dates: {
          type: "mutidate",
          value: `${getMultiFutureDates(3)}`,
        },
        getTitle() {
          return `[${this.CurrentOffice.code}][${this.Project.code}]: ${this.Dates.value.replaceAll(" ", "")}`;
        },
        getNotificationSubject() {
          return `[WFH Request] [Support] - ${users.user.name}`;
        },
        getApprovedSubject() {
          return `[WFH Request] Approved - [Support] - ${users.user.name}`;
        },
        getRejectedSubject() {
          return `[WFH Request] Rejected - [Support] - ${users.user.name}`;
        },
      };

      return data;
    },
  },
};
