import { getRandomContent } from "./fakerUtils";
import { AdvancePaymentRequestForm } from "./requestTemplate.data";
import { users } from "./users.data";

export const AdvancePaymentRequestData = {
  user: {
    getRandomData(): AdvancePaymentRequestForm {
      return {
        AmountOfMoney: {
          type: "text",
          value: "1000000",
        },
        Reason: {
          type: "textarea",
          value: getRandomContent(),
        },
        getTitle() {
          return `Advance Payment Request: ${this.AmountOfMoney.value} VNĐ`;
        },
        getNotificationSubject() {
          return `[Advance Payment Request] [${users.user.name} - ${users.user.username}]`;
        },
        getApprovedSubject() {
          return `[Advance Payment Request] Approved - [${users.user.name}] - ${users.user.username}]`;
        },
        getRejectedSubject() {
          return `[Advance Payment Request] Rejected - [${users.user.name} - ${users.user.username}]`;
        },
      };
    },
  },
};
