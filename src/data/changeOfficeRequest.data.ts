import { ChangeOfficeRequestForm } from "./requestTemplate.data";

export const ChangeOfficeRequestData = {
  user: {
    getRandomData(): ChangeOfficeRequestForm {
      const timestamp = new Date().getTime();
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
          value: `test change office - ${timestamp}`,
        },
        StartDate: {
          type: "date",
          value: `15/09/2024`,
        },
        EndDate: {
          type: "date",
          value: `20/09/2024`,
        },
        getTitle() {
          return `Change office from ${this.CurrentOffice.code} to ${this.DestinationOffice.code}`;
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
