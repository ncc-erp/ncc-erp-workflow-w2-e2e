import { formatDate } from "../utils/komuNotification";
import { getRandomContent, getRandomDevice } from "./fakerUtils";
import { OfficeEquipmentRequestForm } from "./requestTemplate.data";
import { users } from "./users.data";

export const OfficeEquipmentRequestData = {
  user: {
    getRandomData(): OfficeEquipmentRequestForm {
      const formattedDate = formatDate(new Date());
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
        getKomuMessage() {
          return `\n**${users.user.name}** has send **Office Equipment Request**:\n# ${formattedDate}\nCurrent office: ${this.CurrentOffice.value}\nRequest equipment: ${this.Equipment.value}\nReason: ${this.Reason.value}\n`;
        },
        getApprovedKomuMessage() {
          return `\nThe **Office Equipment Request** of **${users.user.name}** has been approved by`;
        },
        getRejectedKomuMessage() {
          return `\nThe **Office Equipment Request** of **${users.user.name}** has been rejected by`;
        },
      };
    },
  },
};
