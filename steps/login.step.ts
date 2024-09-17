import { PageObjects } from "../pageObjects/page.fixture";

export const loginAndVerify = async (
  pageObjects: PageObjects,
  username: string,
  password: string,
  name: string,
  authFile?: string
) => {
  await pageObjects.LoginPage.open();
  await pageObjects.LoginPage.login(username, password);
  await pageObjects.LoginPage.page.waitForURL(pageObjects.RequestTemplatePage.path);
  await pageObjects.RequestTemplatePage.header.verifyUsername(name);
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  authFile && (await pageObjects.LoginPage.page.context().storageState({ path: authFile }));
};
