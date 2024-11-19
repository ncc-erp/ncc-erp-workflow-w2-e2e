import { faker } from "@faker-js/faker";
import { AdvancePaymentRequestData } from "./advancePaymentRequest.data";
import { ChangeOfficeRequestData } from "./changeOfficeRequest.data";
import { DeviceRequestData } from "./deviceRequest.data";
import { OfficeEquipmentRequestData } from "./officeEquiqmentRequest.data";
import { ProbationaryConfirmationRequestData } from "./probationaryConfirmationRequest.data";
import { ResignationRequestData } from "./resignationRequest.data";
import { UnlockTimesheetRequestData } from "./unlockTimesheetRequest.data";
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
  random_advance_payment_request() {
    return AdvancePaymentRequestData.user.getRandomData();
  },
  random_unlock_timesheet_request() {
    return UnlockTimesheetRequestData.user.getRandomData();
  },
  random_resignation_request() {
    return ResignationRequestData.user.getRandomData();
  },
};

export const testDataContainer = {};
