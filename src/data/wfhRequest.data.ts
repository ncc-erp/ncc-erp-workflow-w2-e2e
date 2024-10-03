import { getRandomContent, getRandomDatesForWFH } from "./fakerUtils";
import { WFHRequestForm } from "./requestTemplate.data";

export const WfhRequestData = {
  user: {
    getRandomData(): WFHRequestForm {
      const { firstDate, secondDate, thirdDate } = getRandomDatesForWFH();
      const data: WFHRequestForm = {
        CurrentOffice: {
          type: "select",
          value: "Đà Nẵng",
          code: "ĐN",
        },
        Project: {
          type: "select",
          value: "Support",
          code: "support",
        },
        Reason: {
          type: "textarea",
          value: getRandomContent(),
        },
        Dates: {
          type: "mutidate",
          value: `${firstDate}, ${secondDate}, ${thirdDate}`,
        },
        getTitle() {
          return `[${this.CurrentOffice.code}][${this.Project.code}]: ${this.Dates.value.replaceAll(" ", "")}`;
        },
      };

      return data;
    },
  },
};
