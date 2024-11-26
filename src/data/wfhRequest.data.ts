import { formatDate } from "../utils/komuNotification";
import { getMultiFutureDates, getRandomContent } from "./fakerUtils";
import { WFHRequestForm } from "./requestTemplate.data";
import { users } from "./users.data";

export const WfhRequestData = {
  user: {
    getRandomData(): WFHRequestForm {
      const formattedDate = formatDate(new Date());
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
        getKomuMessage() {
          return `\n**${users.user.name}** has send **WFH Request**:\n# ${formattedDate}\nOffice: ${this.CurrentOffice.value}\nProject: ${this.Project.value}\nPM: Tiến Nguyễn Hữu, Trung Đỗ Trọng, Trung Đỗ Đức, Hiếu Đỗ Hoàng\nWFH dates: ${this.Dates.value}`;
        },
        getApprovedKomuMessage() {
          return `\nThe **WFH Request** of **${users.user.name}** has been approved by`;
        },
        getRejectedKomuMessage() {
          return `\nThe **WFH Request** of **${users.user.name}** has been rejected by`;
        },
      };

      return data;
    },
  },
};
