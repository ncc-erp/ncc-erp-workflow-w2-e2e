import { EditUserInfoRequest } from "./adminManagement.data";

export const EditUserInfoData = {
  user: {
    getRandomData(): EditUserInfoRequest {
      const data: EditUserInfoRequest = {
        UserName: {
          type: "text",
          value: "admin",
        },
        Name: {
          type: "text",
          value: "admin",
        },
        Surname: {
          type: "text",
          value: "123aaa",
        },
        Password: {
          type: "password",
          value: "",
        },
        ConfirmPassword: {
          type: "password",
          value: "",
        },
        EmailAddress: {
          type: "email",
          value: "admin@abp.io",
        },
        PhoneNumber: {
          type: "text",
          value: "",
        },
      };

      return data;
    },
  },
};
