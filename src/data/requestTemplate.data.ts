export const RequestTypeData = {
  ChangeOfficeRequest: {
    name: "Change Office Request",
  },
  DeviceRequest: {
    name: "Device Request",
  },
  OfficeEquipmentRequest: {
    name: "Office Equipment Request",
  },
  ProbationaryConfirmationRequest: {
    name: "Probationary Confirmation Request",
  },
  WFHRequest: {
    name: "WFH Request",
  },
};

type InputItem = {
  type: "text" | "textarea" | "select" | "date" | "mutidate";
  value: string;
  code?: string;
};

export interface Pointer<T> {
  value?: T;
}
export interface DeviceRequestForm {
  CurrentOffice: InputItem;
  Project: InputItem;
  Device: InputItem;
  Reason: InputItem;
  getTitle: () => string;
}
export interface ChangeOfficeRequestForm {
  CurrentOffice: InputItem;
  DestinationOffice: InputItem;
  Content: InputItem;
  StartDate: InputItem;
  EndDate: InputItem;
  getTitle: () => string;
}

export interface WFHRequestForm {
  CurrentOffice: InputItem;
  Project: InputItem;
  Reason: InputItem;
  Dates: InputItem;
  getTitle: () => string;
}

export interface OfficeEquipmentRequestForm {
  CurrentOffice: InputItem;
  Equipment: InputItem;
  Reason: InputItem;
  getTitle: () => string;
}

export interface ProbationaryConfirmationRequest {
  Staff: InputItem;
  Project: InputItem;
  CurrentOffice: InputItem;
  Content: InputItem;
  StartDate: InputItem;
  EndDate: InputItem;
  getTitle: () => string;
}

export type RequestFormType =
  | DeviceRequestForm
  | ChangeOfficeRequestForm
  | OfficeEquipmentRequestForm
  | ProbationaryConfirmationRequest;
