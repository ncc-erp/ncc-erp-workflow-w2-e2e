import { test as teardown } from "@playwright/test";

teardown("clean", async ({}) => {
  // eslint-disable-next-line no-console
  console.log("cleaning...");
  // Delete the database
});
