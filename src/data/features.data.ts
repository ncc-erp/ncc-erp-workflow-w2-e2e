import { faker } from "@faker-js/faker";
import { ChangeOfficeRequestData } from "./changeOfficeRequest.data";
import { DeviceRequestData } from "./deviceRequest.data";
import { OfficeEquipmentRequestData } from "./officeEquiqmentRequest.data";
import { ProbationaryConfirmationRequestData } from "./probationaryConfirmationRequest.data";
import { users } from "./users.data";
import { WfhRequestData } from "./wfhRequest.data";

// data public for using in features file
export const testData = {
  users,
  faker,
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
  random_office_equipment_request() {
    return OfficeEquipmentRequestData.user.getRandomData();
  },
  random_probationary_confirmation_request() {
    return ProbationaryConfirmationRequestData.user.getRandomData();
  },
};

export const testDataContainer = {};
