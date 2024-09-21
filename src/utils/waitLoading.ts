import { Page } from "@playwright/test";

export const waitLoading = async (page: Page) => {
  // make sure page load
  await page.locator("body").waitFor({ state: "visible" });
  // Wait for the Skeleton to be visible
  const skeleton = page.locator(".chakra-skeleton"); // Adjust the selector as needed
  // await skeleton.waitFor({ state: "visible" });
  // Check if the Skeleton exists before waiting
  if ((await skeleton.count()) > 0) {
    // Wait for the Skeleton to be visible
    // await skeleton.first().waitFor({ state: "visible" });
    // Wait for the Skeleton to disappear
    await skeleton.first().waitFor({ state: "hidden" });
  }

  // Wait for the Skeleton to disappear
  // await skeleton.waitFor({ state: "hidden" });
};
