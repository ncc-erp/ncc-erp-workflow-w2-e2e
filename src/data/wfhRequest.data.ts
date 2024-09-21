import { WFHRequestForm } from "./requestTemplate.data";

export const WfhRequestData = {
  user: {
    getRandomData(): WFHRequestForm {
      const timestamp = new Date().getTime();
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
          value: `wfh reason - ${timestamp}`,
        },
        Dates: {
          type: "mutidate",
          value: `22/11/2024, 23/11/2024, 24/11/2024`,
        },
        getTitle() {
          //[{{CurrentOffice}}][{{Project}}]: {{Dates}}
          return `[${this.CurrentOffice.code}][${this.Project.code}]: ${this.Dates.value.replaceAll(" ", "")}`;
        },
      };

      return data;
    },
  },
};
