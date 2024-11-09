import { test as setup } from "@playwright/test";
import * as fs from "fs";
import path from "path";

const directoryPath = path.join(__dirname, "..", "pageObjects", "storage", ".local");

setup("init", async ({}) => {
  // eslint-disable-next-line no-console
  console.log("Initialize...");
  // Initialize the database
  // clean local storage
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return console.error("Unable to scan directory: " + err);
    }

    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);
      fs.unlink(filePath, (err) => {
        if (err) {
          return console.error(`Error deleting file ${filePath}: ${err}`);
        }
        console.log(`Deleted file: ${filePath}`);
      });
    });
  });
});
