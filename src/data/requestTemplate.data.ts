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
  getNotificationSubject: () => string;
  getApprovedSubject: () => string;
  getRejectedSubject: () => string;
  getKomuMessage(): string;
  getApprovedKomuMessage(): string;
  getRejectedKomuMessage(): string;
}
export interface ChangeOfficeRequestForm {
  CurrentOffice: InputItem;
  DestinationOffice: InputItem;
  Content: InputItem;
  StartDate: InputItem;
  EndDate: InputItem;
  getTitle: () => string;
  getNotificationSubject: () => string;
  getApprovedSubject: () => string;
  getRejectedSubject: () => string;
  getKomuMessage(): string;
  getApprovedKomuMessage(): string;
  getRejectedKomuMessage(): string;
}

export interface WFHRequestForm {
  CurrentOffice: InputItem;
  Project: InputItem;
  Reason: InputItem;
  Dates: InputItem;
  getTitle: () => string;
  getNotificationSubject: () => string;
  getApprovedSubject: () => string;
  getRejectedSubject: () => string;
  getKomuMessage(): string;
  getApprovedKomuMessage(): string;
  getRejectedKomuMessage(): string;
}

export interface OfficeEquipmentRequestForm {
  CurrentOffice: InputItem;
  Equipment: InputItem;
  Reason: InputItem;
  getTitle: () => string;
  getNotificationSubject: () => string;
  getApprovedSubject: () => string;
  getRejectedSubject: () => string;
  getKomuMessage(): string;
  getApprovedKomuMessage(): string;
  getRejectedKomuMessage(): string;
}

export interface ProbationaryConfirmationRequest {
  Staff: InputItem;
  Project: InputItem;
  CurrentOffice: InputItem;
  Content: InputItem;
  StartDate: InputItem;
  EndDate: InputItem;
  getTitle: () => string;
  getNotificationSubject: () => string;
  getKomuMessage(): string;
  getApprovedKomuMessage(): string;
  getRejectedKomuMessage(): string;
}

export interface AdvancePaymentRequestForm {
  AmountOfMoney: InputItem;
  Reason: InputItem;
  getTitle: () => string;
  getNotificationSubject: () => string;
  getApprovedSubject: () => string;
  getRejectedSubject: () => string;
  getApprovedNotiSubject: () => string;
  getKomuMessage: () => string;
  getApprovedKomuMessage: () => string;
  getRejectedKomuMessage: () => string;
}

export interface UnlockTimesheetRequestForm {
  TimeUnlock: InputItem;
  Reason: InputItem;
  getTitle: () => string;
  getNotificationSubject: () => string;
  getKomuMessage(): string;
  getApprovedKomuMessage(): string;
  getRejectedKomuMessage(): string;
}

export interface ResignationRequestForm {
  DesiredLastWorkingDay: InputItem;
  Reason: InputItem;
  getTitle: () => string;
  getNotificationSubject: () => string;
  getKomuMessage(): string;
  getApprovedKomuMessage(): string;
  getRejectedKomuMessage(): string;
}

export type RequestFormType =
  | DeviceRequestForm
  | ChangeOfficeRequestForm
  | OfficeEquipmentRequestForm
  | ProbationaryConfirmationRequest
  | AdvancePaymentRequestForm
  | UnlockTimesheetRequestForm
  | ResignationRequestForm;
