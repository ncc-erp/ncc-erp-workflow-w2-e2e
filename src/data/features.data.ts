import { ChangeOfficeRequestData } from "./changeOfficeRequest.data";
import { DeviceRequestData } from "./deviceRequest.data";
import { users } from "./users.data";
import { WfhRequestData } from "./wfhRequest.data";

// data public for using in features file
export const testData = {
  users,
  // DeviceRequestData,
  // ChangeOfficeRequestData,
  // RequestTypeData,
  random_device_request() {
    return DeviceRequestData.user.getRandomData();
  },
  random_change_office_request() {
    return ChangeOfficeRequestData.user.getRandomData();
  },
  random_wfh_request() {
    return WfhRequestData.user.getRandomData();
  },
};

export const testDataContainer = {};
