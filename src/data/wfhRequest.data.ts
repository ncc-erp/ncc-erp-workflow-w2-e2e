import { getMultiFutureDates, getRandomContent } from "./fakerUtils";
import { WFHRequestForm } from "./requestTemplate.data";

export const WfhRequestData = {
  user: {
    getRandomData(): WFHRequestForm {
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
          value: `${getMultiFutureDates(3)}`,
        },
        getTitle() {
          return `[${this.CurrentOffice.code}][${this.Project.code}]: ${this.Dates.value.replaceAll(" ", "")}`;
        },
      };

      return data;
    },
  },
};
