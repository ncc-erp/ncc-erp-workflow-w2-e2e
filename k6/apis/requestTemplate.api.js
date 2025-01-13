import http from "k6/http";
import { login } from "../utils/auth.js";

function getHeaders(user) {
  const token = login(user);
  return {
    "Content-Type": "application/json",
    // eslint-disable-next-line prettier/prettier
    "Authorization": `Bearer ${token}`,
  };
}
export function createWorkflowInstance(user, payload) {
  const headers = getHeaders(user);
  return http.post(`${__ENV.BASE_URL}api/app/workflow-instance/new-instance`, JSON.stringify(payload), { headers });
}
