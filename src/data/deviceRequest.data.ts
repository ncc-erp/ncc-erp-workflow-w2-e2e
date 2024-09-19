import { DeviceRequestForm } from "./requestTemplate.data";

export const DeviceRequestData = {
  user: {
    getRandomData(): DeviceRequestForm {
      const timestamp = new Date().getTime();
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
          value: `1 pc - ${timestamp}`,
        },
        Reason: {
          type: "textarea",
          value: `pc for testing- ${timestamp}`,
        },
        getTitle() {
          return `[${this.CurrentOffice.code}] [${this.Project.code}]: ${this.Device.value}`;
        },
      };

      return data;
    },
  },
};
