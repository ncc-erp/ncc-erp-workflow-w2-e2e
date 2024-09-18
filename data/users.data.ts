import path from "path";

export const users = {
  user: {
    username: "manh.nguyenvan@ncc.asia",
    password: "1q2w3E*",
    name: "Manh Nguyen Van",
  },
  pm: {
    username: "hieu.dohoang@ncc.asia",
    password: "1q2w3E*",
    name: "Hieu Do Hoang",
  },
  it: {
    username: "thiet.nguyenba@ncc.asia",
    password: "1q2w3E*",
    name: "Thiet Nguyen Ba",
  },
  admin: {
    username: "thien.dang@ncc.asia",
    password: "1q2w3E*",
    name: "Thien Dang An",
  },
};

export const authUserFile = path.join(__dirname, "../.auth/user.json");
export const authPmFile = path.join(__dirname, "../.auth/pm.json");
export const authItFile = path.join(__dirname, "../.auth/it.json");
export const authAdminFile = path.join(__dirname, "../.auth/admin.json");
