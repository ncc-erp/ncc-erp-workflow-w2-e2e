import { DeviceRequestForm } from "./requestTemplate.data";

export const DeviceRequestData = {
  getTitle({ CurrentOffice, Project, Device }: DeviceRequestForm) {
    return `[${CurrentOffice.code}] [${Project.code}]: ${Device.value}`;
  },
  user: {
    getRandomData(): DeviceRequestForm {
      const timestamp = new Date().getTime();
      return {
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
      };
    },
  },
};
