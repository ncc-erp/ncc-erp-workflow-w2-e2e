import { check } from "k6";
import { loginAPI } from "../apis/auth.api.js";

export function login(user) {
  const response = loginAPI(user);

  check(response, {
    "Login successful": (r) => r.status === 200,
  });

  return response.json("token");
}
