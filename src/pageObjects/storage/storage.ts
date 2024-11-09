/* eslint-disable @typescript-eslint/no-explicit-any */
import * as fs from "fs";
import * as path from "path";

const filePath = path.join(__dirname, ".local/data.json");
fs.mkdirSync(path.join(__dirname, ".local"), { recursive: true });
// Function to read data from JSON file
const readData = (): Record<string, any> => {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  }
  return {};
};

// Function to write data to JSON file
const writeData = (data: Record<string, any>): void => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
};

// Function to set a key-value pair in the JSON file
const setData = (key: string, value: any): void => {
  const data = readData();
  data[key] = value;
  writeData(data);
};

// Function to get a value by key from the JSON file
const getData = (key: string): any => {
  const data = readData();
  return data[key];
};

// Function to remove a key from the JSON file
const removeData = (key: string): void => {
  const data = readData();
  delete data[key];
  writeData(data);
};

export const Storage = {
  readData,
  writeData,
  setData,
  getData,
  removeData,
};
