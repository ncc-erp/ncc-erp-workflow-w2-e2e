/* eslint-disable @typescript-eslint/no-explicit-any */
import { Browser, Page, TestInfo } from "@playwright/test";
import get from "lodash.get";
import { test as base, createBdd, DataTable } from "playwright-bdd";

import { DefineStepPattern } from "playwright-bdd/dist/steps/registry";
import { StepConfig } from "playwright-bdd/dist/steps/stepConfig";
import { ParametersExceptFirst } from "playwright-bdd/dist/utils/types";
import { testData, testDataContainer } from "../data/features.data";
import { users } from "../data/users.data";
import LoginPage from "./pages/login.page";
import MyRequestPage from "./pages/myRequest.page";
import RequestTemplatePage from "./pages/requestTemplate.page";
import TaskPage from "./pages/task.page";

export type PageObjects = {
  LoginPage: LoginPage;
  RequestTemplatePage: RequestTemplatePage;
  MyRequestPage: MyRequestPage;
  TaskPage: TaskPage;
};
const convertToPageObjects = (page: Page): PageObjects => {
  return {
    LoginPage: new LoginPage(page),
    RequestTemplatePage: new RequestTemplatePage(page),
    MyRequestPage: new MyRequestPage(page),
    TaskPage: new TaskPage(page),
  };
};

class BrowserControlType {
  async withAuth(_browser: Browser, authFile: string, callback: ({ PageObjects, Page }) => Promise<any>) {
    // new page
    const context = await _browser.newContext({
      storageState: authFile, // Initial storage state
    });
    const page = await context.newPage();
    const pages = convertToPageObjects(page);
    const response = await callback({ Page: page, PageObjects: pages });
    await context.close();
    return response;
  }
}

export const BrowserControl: BrowserControlType = new BrowserControlType();
// share step data
export type WorldObject = {
  DataTest: Record<string, string>;
  // DataTests: Record<string, string>[];
};
// pass page object to test
export const test = base.extend<{ PageObjects: PageObjects; WorldObject: WorldObject; hooks: void }>({
  storageState: async ({ $tags, storageState }, use) => {
    // reset storage state for features/scenarios with @noauth tag

    for (let userType of Object.keys(users)) {
      if ($tags.includes(`@${userType}`)) {
        storageState = users[userType].authFile;
        break;
      }
    }

    await use(storageState);
  },
  PageObjects: async ({ page }, use) => {
    const pages: PageObjects = convertToPageObjects(page);
    await use(pages);
  },
  WorldObject: async ({}, use) => {
    await use({
      // init
      DataTest: {},
      // DataTests: [],
    });
  },
  hooks: [
    async ({ $testInfo }, use) => {
      $testInfo.snapshotPath = (name: string) => `${$testInfo.file}-snapshots/${name}`;
      await use();
    },
    { auto: true },
  ],
});

export { expect, Locator, Page, Response } from "@playwright/test";

export const { Given: GivenBase, When: WhenBase, Then: ThenBase } = createBdd(test);
// override support bdd
type FixtureType = {
  PageObjects: PageObjects;
  WorldObject: WorldObject;
  page: Page;
  browser: Browser;
  $testInfo: TestInfo;
};
export const Given = (
  pattern: DefineStepPattern,
  fn: (fixtures: FixtureType, ...args: ParametersExceptFirst<StepConfig["fn"]>) => Promise<any>
) => {
  // pass data, config, container data
  return GivenBase(proxyPattern(pattern), proxyFn(fn));
};

export const When = (
  pattern: DefineStepPattern,
  fn: (fixtures: FixtureType, ...args: ParametersExceptFirst<StepConfig["fn"]>) => Promise<any>
) => {
  // pass data, config, container data
  return WhenBase(proxyPattern(pattern), proxyFn(fn));
};

export const Then = (
  pattern: DefineStepPattern,
  fn: (fixtures: FixtureType, ...args: ParametersExceptFirst<StepConfig["fn"]>) => Promise<any>
) => {
  // pass data, config, container data
  return ThenBase(proxyPattern(pattern), proxyFn(fn));
};

// private function

const proxyFn = (fn: (fixtures: FixtureType, ...args: ParametersExceptFirst<StepConfig["fn"]>) => Promise<any>) => {
  return ({ PageObjects, WorldObject, page, browser, $testInfo }, ...args) => {
    const data = convertDataTest(args, WorldObject);
    return fn({ PageObjects, WorldObject, page, browser, $testInfo }, ...data).then((response) => {
      if (response) {
        // set global
        const key = args.find((f) => typeof f === "string" && f.match(/__global\[(.+)\]/));
        // Check if the key includes '__global[key]'
        const globalMatch = key.match(/__global\[(.+)\]/);
        const containerKey = globalMatch[1]; // Extract the key for testDataContainer
        // Set the value to testDataContainer
        testDataContainer[containerKey]["response"] = response;
      }
    });
  };
};
const proxyPattern = (pattern: DefineStepPattern) => {
  let patternTemp: DefineStepPattern = pattern;
  if (typeof patternTemp == "string") {
    patternTemp = patternTemp.replace(new RegExp("{TestData}", "gi"), "{string}");
  }
  return patternTemp;
};

// Function to convert key string to get data from testData
function convertKeyToDataTest(key: string): void {
  // Check if the key starts with "*testData["
  if (!key.startsWith("*testData")) {
    throw new Error('Key must start with "*testData[<property name here>]".');
  }
  const keyTestDatas = key.match(/^\*(.*?)(?:__.*)?$/);
  const keyTestData = keyTestDatas ? keyTestDatas[1] : key; // Return the captured group or the original string
  const valueOrFunction = get({ testData }, keyTestData);

  // Get the value from testData
  // const value = typeof valueOrFunction === "function" ? valueOrFunction() : valueOrFunction;
  let value = valueOrFunction;
  // Get the value from testData
  if (typeof valueOrFunction === "function") {
    value = valueOrFunction.apply(get({ testData }, keyTestData.split(".").slice(0, -1).join("."))); // Keep context
  }

  // Check if the key includes '__global[key]'
  const globalMatch = key.match(/__global\[(.+)\]/);
  if (globalMatch) {
    const containerKey = globalMatch[1]; // Extract the key for testDataContainer
    // Set the value to testDataContainer
    testDataContainer[containerKey] = value;
  }

  // Return the value regardless of whether it was set in testDataContainer
  return value;
}
// Function to get data or call method from testDataContainer by key string

function getDataFromGlobalData(key: string): any {
  // Check if the key starts with "*global["
  if (!key.startsWith("*global")) {
    throw new Error('Key must be in the format "*global[key in testDataContainer][.property]".');
  }
  const keyTestDatas = key.match(/^\*(.*?)(?:__.*)?$/);
  const keyTestData = keyTestDatas ? keyTestDatas[1] : key; // Return the captured group or the original string

  const valueOrFunction = get({ global: testDataContainer }, keyTestData);

  let value = valueOrFunction;
  // Get the value from testData
  if (typeof valueOrFunction === "function") {
    value = valueOrFunction.apply(get({ global: testDataContainer }, keyTestData.split(".").slice(0, -1).join("."))); // Keep context
  }

  return value;
}

const convertDataTestWithString = (key: string) => {
  if (key.startsWith("*testData")) {
    return convertKeyToDataTest(key);
  }
  if (key.startsWith("*global")) {
    return getDataFromGlobalData(key);
  }

  return key;
};

// More comprehensive version
function parseString(str) {
  // Stricter regex for validation
  const validationRegex = /^<[^<>]+>$/;
  const extractRegex = /<(.*?)>/;

  return {
    isValid: validationRegex.test(str),
    content: str.match(extractRegex)?.[1] || null,
  };
}

const convertDataTest = (keys: any[], worldObject: WorldObject) => {
  return keys.map((key) => {
    if (typeof key === "string") {
      // should get from worldObject get and return

      const str = parseString(key);
      if (str.isValid) {
        return convertDataTestWithString(worldObject.DataTest[str.content]);
      }
      return convertDataTestWithString(key);
    }
    if (typeof key === "object" && key instanceof DataTable) {
      const raws = key.raw();
      const newRaws = raws.map((cols) => {
        return cols.map((col) => {
          return convertDataTestWithString(col);
        });
      });

      return new DataTable(newRaws);
    }
    return key;
  });
};
