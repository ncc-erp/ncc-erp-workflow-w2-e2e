import { DeviceRequestForm } from "./requestTemplate.data";

export const DeviceRequestData = {
  user: {
    getTitle({ CurrentOffice, Project, Device }: DeviceRequestForm) {
      return `[${CurrentOffice.value}] [${Project.value}]: ${Device.value}`;
    },
    getRandomData(): DeviceRequestForm {
      const timestamp = new Date().getTime();
      return {
        CurrentOffice: {
          type: "select",
          value: "Đà Nẵng",
        },
        Project: {
          type: "select",
          value: "Support",
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
