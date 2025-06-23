import path from "path";

export const authUserFile = path.join(__dirname, "../.auth/user.json");
export const authPmFile = path.join(__dirname, "../.auth/pm.json");
export const authPm2File = path.join(__dirname, "../.auth/pm2.json");
export const authItFile = path.join(__dirname, "../.auth/it.json");
export const authAdminFile = path.join(__dirname, "../.auth/admin.json");
export const authGDVPDNFile = path.join(__dirname, "../.auth/gdvpdn.json");
export const authGDVPVFile = path.join(__dirname, "../.auth/gdvpv.json");
export const authCeoFile = path.join(__dirname, "../.auth/ceo.json");
export const authHrFile = path.join(__dirname, "../.auth/hr.json");
export const authAccountantFile = path.join(__dirname, "../.auth/accountant.json");
export const authHPMFile = path.join(__dirname, "../.auth/hpm.json");
export const authSaodoFile = path.join(__dirname, "../.auth/saodo.json");
export const users = {
  user: {
    username: "manh.nguyenvan@ncc.asia",
    password: "1q2w3E*",
    name: "Manh Nguyen Van",
    authFile: authUserFile,
  },
  current_pm: {
    username: "tien.nguyenhuu@ncc.asia",
    password: "1q2w3E*",
    name: "Tien Nguyen Huu",
    authFile: authPm2File,
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
  hr: {
    username: "chi.trantung@ncc.asia",
    password: "1q2w3E*",
    name: "Chi Tran Tung",
    authFile: authHrFile,
  },
  accountant: {
    username: "tin.trananh@ncc.asia",
    password: "1q2w3E*",
    name: "Tin Tran Anh",
    authFile: authAccountantFile,
  },
  hpm: {
    username: "thu.leanh@ncc.asia",
    password: "1q2w3E*",
    name: "Thu Le Anh",
    authFile: authHPMFile,
  },
  saodo: {
    username: "anh.daovan@ncc.asia",
    password: "1q2w3E*",
    name: "Anh Dao Van",
    authFile: authSaodoFile,
  },
};
