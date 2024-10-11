export const SettingTypeData = {
  UserManagement: {
    name: "User Management",
  },
  Settings: {
    name: "Admin Settings",
  },
};

type InputItem = {
  type: "text" | "textarea" | "select" | "date" | "mutidate" | "password" | "email";
  value: string;
  code?: string;
};

export interface UserManagement {
  UserName: InputItem;
  EmailAddress: InputItem;
  PhoneNumber: InputItem;
  Role: InputItem;
  Actions: InputItem;
  getUserName: () => string;
  getEmailAddress: () => string;
  getPhoneNumber: () => string;
  getRole: () => string;
}

export interface EditUserInfoRequest {
  UserName: InputItem;
  Name: InputItem;
  Surname: InputItem;
  Password: InputItem;
  ConfirmPassword: InputItem;
  EmailAddress: InputItem;
  PhoneNumber: InputItem;
  IsActive?: boolean;
  IsLockAccount?: boolean;
}

export type AdminManagementType = UserManagement;
