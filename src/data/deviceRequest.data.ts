import { getRandomContent, getRandomDevice } from "./fakerUtils";
import { DeviceRequestForm } from "./requestTemplate.data";
import { users } from "./users.data";

export const DeviceRequestData = {
  user: {
    getRandomData(): DeviceRequestForm {
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
      };

      return data;
    },
  },
};
