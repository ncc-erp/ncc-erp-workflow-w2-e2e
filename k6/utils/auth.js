import http from "k6/http";
import { check } from "k6";
import { users } from "../data/user.data.js";

export function login() {
  const user = users.user;

  const payload = JSON.stringify({
    userNameOrEmailAddress: user.username,
    password: user.password,
  });

  const headers = { "Content-Type": "application/json" };

  const response = http.post(`${__ENV.BASE_URL}api/app/auth/login-account`, payload, { headers });

  check(response, {
    "Login successful": (r) => r.status === 200,
  });

  return response.json("token");
}
