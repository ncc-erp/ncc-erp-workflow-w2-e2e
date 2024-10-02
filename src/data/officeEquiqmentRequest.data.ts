import { OfficeEquipmentRequestForm } from "./requestTemplate.data";

export const OfficeEquipmentRequestData = {
  user: {
    getRandomData(): OfficeEquipmentRequestForm {
      const timestamp = new Date().getTime();
      return {
        CurrentOffice: {
          type: "select",
          value: "Đà Nẵng",
          code: "ĐN",
        },
        Equipment: {
          type: "text",
          value: "pc",
        },
        Reason: {
          type: "textarea",
          value: `pc for testing- ${timestamp}`,
        },
        getTitle() {
          return `[${this.CurrentOffice.code}]: ${this.Equipment.value}`;
        },
      };
    },
  },
};
