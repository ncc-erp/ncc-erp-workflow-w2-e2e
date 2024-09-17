import { DeviceRequestForm } from "../pageObjects/components/deviceRequest";

export const DeviceRequestData = {
  user: {
    getRandomDeviceRequest(): DeviceRequestForm {
      const timestamp = new Date().getTime();
      return {
        currentOffice: "Đà Nẵng",
        project: "Support",
        device: `1 pc - ${timestamp}`,
        reason: `pc for testing- ${timestamp}`,
      };
    },
  },
};
