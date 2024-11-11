import { getRandomContent } from "./fakerUtils";
import { AdvancePaymentRequestForm } from "./requestTemplate.data";

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
      };
    },
  },
};
