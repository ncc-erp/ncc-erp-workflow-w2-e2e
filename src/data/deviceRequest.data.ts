import { formatDate } from "../utils/komuNotification";
import { getRandomContent, getRandomDevice } from "./fakerUtils";
import { DeviceRequestForm } from "./requestTemplate.data";
import { users } from "./users.data";

export const DeviceRequestData = {
  user: {
    getRandomData(): DeviceRequestForm {
      const formattedDate = formatDate(new Date());
      const data: DeviceRequestForm = {
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
        Device: {
          type: "text",
          value: getRandomDevice(),
        },
        Reason: {
          type: "textarea",
          value: getRandomContent(),
        },
        getTitle() {
          return `[${this.CurrentOffice.code}] [${this.Project.code}]: ${this.Device.value}`;
        },
        getNotificationSubject() {
          return `[Device Request] [Support] - ${users.user.name}`;
        },
        getApprovedSubject() {
          return `[Device Request] Approved - [Support] - ${users.user.name}`;
        },
        getRejectedSubject() {
          return `[Device Request] Rejected - [Support] - ${users.user.name}`;
        },
        getKomuMessage() {
          return `\n**${users.user.name}** has send **Device Request**:\n# ${formattedDate}\nCurrent office: ${this.CurrentOffice.value}\nProject: [${this.Project.code}] ${this.Project.value}\nRequest device: ${this.Device.value}`;
        },
        getApprovedKomuMessage() {
          return `\nThe **Device Request** of **${users.user.name}** has been rejected by`;
        },
        getRejectedKomuMessage() {
          return `\nThe **Device Request** of **${users.user.name}** has been rejected by`;
        },
      };

      return data;
    },
  },
};
