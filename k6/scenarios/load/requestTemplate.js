import { check, sleep } from "k6";
import http from "k6/http";
import { login } from "../../utils/auth.js";

export const options = {
  vus: 10,
  duration: "30s",
};

export default function () {
  const input = {
    CurrentOffice: "HN1",
    Project: "nca",
    Device: "Mouse",
    Reason: "broken",
    shortHeader: "",
  };

  const payload = JSON.stringify({
    input: input,
    workflowDefinitionId: "3a057e11-7cde-1749-5c03-60520662a1f5",
  });

  const headers = {
    "Content-Type": "application/json",
    // eslint-disable-next-line prettier/prettier
    "Authorization": `Bearer ${login()}`,
  };

  const response = http.post(`${__ENV.BASE_URL}api/app/workflow-instance/new-instance`, payload, { headers });

  check(response, {
    "Workflow created successfully": (r) => r.status === 200,
  });

  sleep(1);
}
