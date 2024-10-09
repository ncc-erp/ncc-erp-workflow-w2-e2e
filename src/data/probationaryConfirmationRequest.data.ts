import { getRandomContent, getRandomDatesForProbationaryConfirmation } from "./fakerUtils";
import { ProbationaryConfirmationRequest } from "./requestTemplate.data";

export const ProbationaryConfirmationRequestData = {
  user: {
    getRandomData(): ProbationaryConfirmationRequest {
      const { startDate, endDate } = getRandomDatesForProbationaryConfirmation();
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
          value: getRandomContent(),
        },
        StartDate: {
          type: "date",
          value: startDate,
        },
        EndDate: {
          type: "date",
          value: endDate,
        },
        getTitle() {
          return `Confirm for ${this.Staff.code} (${this.EndDate.value})`;
        },
      };
    },
  },
};
