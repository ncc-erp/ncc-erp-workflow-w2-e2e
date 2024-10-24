import path from "path";

export const users = {
  user: {
    username: "manh.nguyenvan@ncc.asia",
    password: "1q2w3E*",
    name: "Manh Nguyen Van",
    authFile: "",
  },
  pm: {
    username: "hieu.dohoang@ncc.asia",
    password: "1q2w3E*",
    name: "Hieu Do Hoang",
    authFile: "",
  },
  it: {
    username: "thiet.nguyenba@ncc.asia",
    password: "1q2w3E*",
    name: "Thiet Nguyen Ba",
    authFile: "",
  },
  admin: {
    username: "cuong.nguyenngoc@ncc.asia",
    password: "1q2w3E*",
    name: "Cuong Nguyen Ngoc",
    authFile: "",
  },
  gdvpdn: {
    username: "thien.dang@ncc.asia",
    password: "1q2w3E*",
    name: "Thien Dang An",
    authFile: "",
  },
  gdvpv: {
    username: "dai.trinhduc@ncc.asia",
    password: "1q2w3E*",
    name: "Dai Trinh Duc",
    authFile: "",
  },
  ceo: {
    username: "nhan.huynhba@ncc.asia",
    password: "1q2w3E*",
    name: "Nhan Huynh Ba",
    authFile: "",
  },
};

for (const key in users) {
  users[key].authFile = path.join(__dirname, `../.auth/${key}.json`);
}
