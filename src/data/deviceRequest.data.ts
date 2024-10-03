import { getRandomContent, getRandomDevice } from "./fakerUtils";
import { DeviceRequestForm } from "./requestTemplate.data";

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
      };

      return data;
    },
  },
};
