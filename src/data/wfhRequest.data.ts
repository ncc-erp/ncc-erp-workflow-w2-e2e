import { faker } from "@faker-js/faker";
import { getRandomContent } from "./fakerUtils";
import { WFHRequestForm } from "./requestTemplate.data";

function getMultiFutureDates(count) {
  const dates = [];

  for (let i = 0; i < count; i++) {
    const date = faker.date.future();
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    dates.push(formattedDate);
  }

  return dates.join(", ");
}

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
