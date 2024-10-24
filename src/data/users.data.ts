import path from "path";

export const authUserFile = path.join(__dirname, "../.auth/user.json");
export const authPmFile = path.join(__dirname, "../.auth/pm.json");
export const authItFile = path.join(__dirname, "../.auth/it.json");
export const authAdminFile = path.join(__dirname, "../.auth/admin.json");
export const authGDVPDNFile = path.join(__dirname, "../.auth/gdvpdn.json");
export const authGDVPVFile = path.join(__dirname, "../.auth/gdvpv.json");
export const authCeoFile = path.join(__dirname, "../.auth/ceo.json");
export const users = {
  user: {
    username: "manh.nguyenvan@ncc.asia",
    password: "1q2w3E*",
    name: "Manh Nguyen Van",
    authFile: authUserFile,
  },
  pm: {
    username: "hieu.dohoang@ncc.asia",
    password: "1q2w3E*",
    name: "Hieu Do Hoang",
    authFile: authPmFile,
  },
  it: {
    username: "thiet.nguyenba@ncc.asia",
    password: "1q2w3E*",
    name: "Thiet Nguyen Ba",
    authFile: authItFile,
  },
  admin: {
    username: "cuong.nguyenngoc@ncc.asia",
    password: "1q2w3E*",
    name: "Cuong Nguyen Ngoc",
    authFile: authAdminFile,
  },
  gdvpdn: {
    username: "thien.dang@ncc.asia",
    password: "1q2w3E*",
    name: "Thien Dang An",
    authFile: authGDVPDNFile,
  },
  gdvpv: {
    username: "dai.trinhduc@ncc.asia",
    password: "1q2w3E*",
    name: "Dai Trinh Duc",
    authFile: authGDVPVFile,
  },
  ceo: {
    username: "nhan.huynhba@ncc.asia",
    password: "1q2w3E*",
    name: "Nhan Huynh Ba",
    authFile: authCeoFile,
  },
};
