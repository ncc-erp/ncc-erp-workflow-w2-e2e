import http from "k6/http";
export function loginAPI(user) {
  const payload = JSON.stringify({
    userNameOrEmailAddress: user.username,
    password: user.password,
  });

  const headers = { "Content-Type": "application/json" };

  return http.post(`${__ENV.BASE_URL}api/app/auth/login-account`, payload, { headers });
}
