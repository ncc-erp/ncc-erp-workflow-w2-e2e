import path from "path";

export const users = {
  user: {
    username: "manh.nguyenvan@ncc.asia",
    password: "1q2w3E*",
    name: "Manh Nguyen Van",
  },
  pm: {
    username: "thu.leanh@ncc.asia",
    password: "1q2w3E*",
    name: "Thu Le Anh",
  },
  admin: {
    username: "thien.dang@ncc.asia",
    password: "1q2w3E*",
    name: "Thien Dang An",
  },
};

export const authUserFile = path.join(__dirname, "../.auth/user.json");
export const authPmFile = path.join(__dirname, "../.auth/pm.json");
export const authAdminFile = path.join(__dirname, "../.auth/admin.json");
