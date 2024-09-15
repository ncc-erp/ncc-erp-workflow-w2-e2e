import { test as teardown } from "@playwright/test";

teardown("clean", async ({}) => {
  console.log("cleaning...");
  // Delete the database
});
