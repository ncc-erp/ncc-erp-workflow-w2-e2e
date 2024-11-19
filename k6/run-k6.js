const { execSync } = require("child_process");
const glob = require("glob").sync;
require("dotenv").config();

const getEnvString = () =>
  ["BASE_URL"].map((key) => (process.env[key] ? `-e ${key}=${process.env[key]}` : "")).join(" ");

try {
  const files = glob("./k6/scenarios/**/*.js");

  if (!files.length) {
    console.log("No test files found.");
  } else {
    const envString = getEnvString();

    files.forEach((file) => {
      try {
        console.log(`Running: ${file}`);
        execSync(`k6 run ${envString} ${file}`, { stdio: "inherit", env: process.env });
      } catch (error) {
        console.error(`Error running file: ${file}`, error);
      }
    });
  }
} catch (err) {
  console.error("Error finding files:", err);
}
