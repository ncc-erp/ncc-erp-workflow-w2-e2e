import { check, sleep } from "k6";
import http from "k6/http";
import { users } from "../../data/user.data.js";

export const options = {
  vus: 10,
  duration: "30s",
};

export default function () {
  const user = users.user;

  const payload = JSON.stringify({
    userNameOrEmailAddress: user.username,
    password: user.password,
  });

  const headers = { "Content-Type": "application/json" };

  const response = http.post(`${__ENV.BASE_URL}api/app/auth/login-account`, payload, { headers });

  check(response, {
    "is status 200": (r) => r.status === 200,
  });

  const token = response.json("token");
  check(token, {
    "token exists": (t) => t !== undefined && t.length > 0,
  });

  sleep(1);
}
