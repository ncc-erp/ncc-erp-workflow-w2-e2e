import { test } from "../../pageObjects/page.fixture";
import { takeSnapshot, VIEW_PORTS } from "./utils";

test.describe("login page", () => {
  test.beforeEach(async ({ PageObjects }) => {
    await PageObjects.LoginPage.open();
  });

  VIEW_PORTS.forEach(({ width, height }) => {
    test(`snapshot for ${width}x${height} viewport`, async ({ PageObjects }) => {
      await takeSnapshot(PageObjects.LoginPage.page, { width, height });
    });
  });
});
