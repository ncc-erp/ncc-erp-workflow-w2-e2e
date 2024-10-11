import { UserManagement } from "./adminManagement.data";

export const UserManagementData = {
  user: {
    getRandomData(): UserManagement {
      const data: UserManagement = {
        UserName: {
          type: "text",
          value: "admin",
        },
        EmailAddress: {
          type: "text",
          value: "admin@abp.io",
        },
        PhoneNumber: {
          type: "text",
          value: "",
        },
        Role: {
          type: "text",
          value: "Admin",
        },
        Actions: {
          type: "select",
          value: "",
        },
        getUserName() {
          return this.UserName.value;
        },
        getEmailAddress() {
          return this.EmailAddress.value;
        },
        getPhoneNumber() {
          return this.PhoneNumber.value;
        },
        getRole() {
          return this.Role.value;
        },
      };
      return data;
    },
  },
};
