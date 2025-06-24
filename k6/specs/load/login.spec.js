import { check, sleep } from "k6";
import { loginAPI } from "../../apis/auth.api.js";
import { users } from "../../data/user.data.js";

export const options = {
  vus: 10,
  duration: "30s",
};

export default function () {
  const response = loginAPI(users.user);

  check(response, {
    "is status 200": (r) => r.status === 200,
  });

  const token = response.json("token");
  check(token, {
    "token exists": (t) => t !== undefined && t.length > 0,
  });

  sleep(1);
}
