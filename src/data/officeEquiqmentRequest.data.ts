import { getRandomContent, getRandomDevice } from "./fakerUtils";
import { OfficeEquipmentRequestForm } from "./requestTemplate.data";

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
      };
    },
  },
};
