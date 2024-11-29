import { getRandomContent } from "./fakerUtils";
import { AdvancePaymentRequestForm } from "./requestTemplate.data";
import { users } from "./users.data";
import { formatDate } from "../utils/komuNotification";
export const AdvancePaymentRequestData = {
  user: {
    getRandomData(): AdvancePaymentRequestForm {
      const formattedDate = formatDate(new Date());
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
        getApprovedNotiSubject() {
          return `[Advance Payment Request] [${users.user.name}] - ${users.user.username}]`;
        },
        getApprovedSubject() {
          return `[Advance Payment Request] Approved - [${users.user.name} - ${users.user.username}]`;
        },
        getRejectedSubject() {
          return `[Advance Payment Request] Rejected - [${users.user.name} - ${users.user.username}]`;
        },
        getKomuMessage() {
          return `\n**${users.user.name}** has send **Advance Payment Request**:\n# ${formattedDate}\nAmount Of Money: ${this.AmountOfMoney.value}\nReason: ${this.Reason.value}\n`;
        },
        getApprovedKomuMessage() {
          return `\n**Advance Payment Request** of **${users.user.name}** has been approved by **${users.accountant.name}**:\n# ${formattedDate}\n`;
        },
        getRejectedKomuMessage() {
          return `\nYour **Advance Payment Request** has been rejected by **${users.accountant.name}**:\n# ${formattedDate}\nReason: test reason\n`;
        },
      };
    },
  },
};
