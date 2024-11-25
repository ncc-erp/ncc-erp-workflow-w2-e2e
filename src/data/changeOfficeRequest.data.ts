import { getRandomContent, getRandomDates } from "./fakerUtils";
import { ChangeOfficeRequestForm } from "./requestTemplate.data";
import { users } from "./users.data";

export const ChangeOfficeRequestData = {
  user: {
    getRandomData(): ChangeOfficeRequestForm {
      const { startDate, endDate } = getRandomDates();
      return {
        CurrentOffice: {
          type: "select",
          value: "Đà Nẵng",
          code: "ĐN",
        },
        DestinationOffice: {
          type: "select",
          value: "Vinh",
          code: "V",
        },
        Content: {
          type: "textarea",
          value: getRandomContent(),
        },
        StartDate: {
          type: "date",
          value: `${startDate}`,
        },
        EndDate: {
          type: "date",
          value: `${endDate}`,
        },
        getTitle() {
          return `Change office from ${this.CurrentOffice.code} to ${this.DestinationOffice.code}`;
        },
        getNotificationSubject() {
          return `[Change Office Request] [${this.CurrentOffice.value}] - ${users.user.name}`;
        },
        getApprovedSubject() {
          return `[Change Office Request] Approved - [${this.CurrentOffice.value}] - ${users.user.name}`;
        },
        getRejectedSubject() {
          return `[Change Office Request] Rejected - [${this.CurrentOffice.value}] - ${users.user.name}`;
        },
      };
    },
  },
};

// {
//   "name": "CurrentOffice",
//   "type": "OfficeList",
//   "isRequired": true,
//   "id": "e448fa37-3278-4d0e-9f48-9657b9f4430e"
// },
// {
//   "name": "DestinationOffice",
//   "type": "OfficeList",
//   "isRequired": true,
//   "id": "72341bed-8a65-4f4b-b2a2-97ae0d61c729"
// },
// {
//   "name": "Content",
//   "type": "RichText",
//   "isRequired": true,
//   "id": "01e38533-ed11-4767-8a28-d4ff2fb21c47"
// },
// {
//   "name": "StartDate",
//   "type": "DateTime",
//   "isRequired": true,
//   "id": "0946a404-8b3a-4326-8b74-32d4da299133"
// },
// {
//   "name": "EndDate",
//   "type": "DateTime",
//   "isRequired": false,
//   "id": "59ccd688-e6e3-4583-85e5-bc8daa77038e"
// }
