import path from "path";
import { Locator, Page } from "../pageObjects/page.fixture";

export const chooseFile = async (page: Page, filePath: string, callback_locator: (() => Promise<void>) | Locator) => {
  // Start waiting for file chooser before clicking. Note no await.
  const fileChooserPromise = page.waitForEvent("filechooser");
  if (typeof callback_locator == "function") {
    await callback_locator();
  } else {
    await (callback_locator as Locator).click();
  }

  const fileChooser = await fileChooserPromise;

  await fileChooser.setFiles(path.join(__dirname, `../data/${filePath}`));
};
