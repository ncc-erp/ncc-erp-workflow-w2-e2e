import { check, sleep } from "k6";
import { users } from "../../data/user.data.js";
import { createWorkflowInstance } from "../../apis/requestTemplate.api.js";
import { deviceRequestPayload } from "../../data/deviceRequest.data.js";

export const options = {
  vus: 10,
  duration: "30s",
};

export default function () {
  const response = createWorkflowInstance(users.user, deviceRequestPayload);

  check(response, {
    "Device Request created successfully": (r) => r.status === 200,
  });

  sleep(1);
}
