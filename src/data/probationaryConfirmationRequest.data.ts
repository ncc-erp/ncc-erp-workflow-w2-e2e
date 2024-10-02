import { ProbationaryConfirmationRequest } from "./requestTemplate.data";

export const ProbationaryConfirmationRequestData = {
  user: {
    getRandomData(): ProbationaryConfirmationRequest {
      const timestamp = new Date().getTime();
      return {
        Staff: {
          type: "select",
          value: "Mạnh Nguyễn Văn (manh.nguyenvan@ncc.asia)",
          code: `manh.nguyenvan@ncc.asia`,
        },
        Project: {
          type: "select",
          value: "Fintech Control Tower",
          code: "fintech control tower",
        },
        CurrentOffice: {
          type: "select",
          value: "Đà Nẵng",
          code: "ĐN",
        },
        Content: {
          type: "textarea",
          value: `test probationary request - ${timestamp}`,
        },
        StartDate: {
          type: "date",
          value: `30/09/2024`,
        },
        EndDate: {
          type: "date",
          value: `01/10/2024`,
        },
        getTitle() {
          return `Confirm for ${this.Staff.code} (${this.EndDate.value})`;
        },
      };
    },
  },
};
