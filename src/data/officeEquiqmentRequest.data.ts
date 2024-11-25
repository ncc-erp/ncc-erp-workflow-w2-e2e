import { getRandomContent, getRandomDevice } from "./fakerUtils";
import { OfficeEquipmentRequestForm } from "./requestTemplate.data";
import { users } from "./users.data";

export const OfficeEquipmentRequestData = {
  user: {
    getRandomData(): OfficeEquipmentRequestForm {
      return {
        CurrentOffice: {
          type: "select",
          value: "Đà Nẵng",
          code: "ĐN",
        },
        Equipment: {
          type: "text",
          value: getRandomDevice(),
        },
        Reason: {
          type: "textarea",
          value: getRandomContent(),
        },
        getTitle() {
          return `[${this.CurrentOffice.code}]: ${this.Equipment.value}`;
        },
        getNotificationSubject() {
          return `[Office Equipment Request] [${this.CurrentOffice.value}] - ${users.user.name}`;
        },
        getApprovedSubject() {
          return `[Office Equipment Request] Approved - [${this.CurrentOffice.value}] - ${users.user.name}`;
        },
        getRejectedSubject() {
          return `[Office Equipment Request] Rejected - [${this.CurrentOffice.value}] - ${users.user.name}`;
        },
      };
    },
  },
};
