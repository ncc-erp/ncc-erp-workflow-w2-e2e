import { Browser, Page } from "@playwright/test";
import { test as base, createBdd } from "playwright-bdd";

import { DefineStepPattern } from "playwright-bdd/dist/steps/registry";
import { StepConfig } from "playwright-bdd/dist/steps/stepConfig";
import { ParametersExceptFirst } from "playwright-bdd/dist/utils/types";
import { dataTest, dataTestContainer } from "../data";
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
  async withAuth(_browser: Browser, authFile: string, callback: ({ PageObjects, Page }) => Promise<void>) {
    // new page
    const context = await _browser.newContext({
      storageState: authFile, // Initial storage state
    });
    const page = await context.newPage();
    const pages = convertToPageObjects(page);
    await callback({ Page: page, PageObjects: pages });
    await context.close();
  }
}

export const BrowserControl: BrowserControlType = new BrowserControlType();
// pass page object to test
export const test = base.extend<{ PageObjects: PageObjects }>({
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
});

export { expect, Locator, Page, Response } from "@playwright/test";

export const { Given: GivenBase, When: WhenBase, Then: ThenBase } = createBdd(test);
// override support bdd
type FixtureType = { PageObjects: PageObjects; page: Page; browser: Browser };
export const Given = (
  pattern: DefineStepPattern,
  fn: (fixtures: FixtureType, ...args: ParametersExceptFirst<StepConfig["fn"]>) => void
) => {
  // pass data, config, container data
  return GivenBase(proxyPattern(pattern), proxyFn(fn));
};

export const When = (
  pattern: DefineStepPattern,
  fn: (fixtures: FixtureType, ...args: ParametersExceptFirst<StepConfig["fn"]>) => void
) => {
  // pass data, config, container data
  return WhenBase(proxyPattern(pattern), proxyFn(fn));
};

export const Then = (
  pattern: DefineStepPattern,
  fn: (fixtures: FixtureType, ...args: ParametersExceptFirst<StepConfig["fn"]>) => void
) => {
  // pass data, config, container data
  return ThenBase(proxyPattern(pattern), proxyFn(fn));
};

// private function
const proxyFn = (fn: (fixtures: FixtureType, ...args: ParametersExceptFirst<StepConfig["fn"]>) => void) => {
  return ({ PageObjects, page, browser }, ...args) => {
    const data = convertDataTest(args);
    return fn({ PageObjects, page, browser }, ...data);
  };
};
const proxyPattern = (pattern: DefineStepPattern) => {
  let patternTemp: DefineStepPattern = pattern;
  if (typeof patternTemp == "string") {
    patternTemp = patternTemp.replace(new RegExp("{TestData}", "gi"), "{string}");
  }
  return patternTemp;
};

// Function to convert key string to get data from dataTest
function convertKeyToDataTest(key: string): void {
  // Check if the key starts with "__testData["
  if (!key.startsWith("__testData[")) {
    throw new Error('Key must start with "__testData[<property name here>]".');
  }

  // Extract the property name from the key
  const propertyMatch = key.match(/__testData\[(.*?)\]/);
  if (!propertyMatch || propertyMatch.length < 2) {
    throw new Error("Invalid key format. Could not extract property name.");
  }

  const propertyName = propertyMatch[1];

  // Check if the property exists in dataTest
  if (dataTest.hasOwnProperty(propertyName)) {
    // Get the value from dataTest
    const value = typeof dataTest[propertyName] === "function" ? dataTest[propertyName]() : dataTest[propertyName];

    // Check if the key includes '__global-'
    const globalMatch = key.match(/__global-(.+)/);
    if (globalMatch) {
      const containerKey = globalMatch[1]; // Extract the key for dataTestContainer
      // Set the value to dataTestContainer
      dataTestContainer[containerKey] = value;
    }

    // Return the value regardless of whether it was set in dataTestContainer
    return value;
  } else {
    throw new Error(`Property "${propertyName}" does not exist in dataTest.`);
  }
}
// Function to get data or call method from dataTestContainer by key string
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getDataFromGlobalData(key: string): any {
  // Check if the key starts with "__globalData["
  if (!key.startsWith("__globalData[") || !key.includes("]")) {
    throw new Error('Key must be in the format "__globalData[key in dataTestContainer][.property]".');
  }

  // Extract the key name and property/method
  const keyMatch = key.match(/__globalData\[(.*?)\](?:\.(.*))?/);
  if (!keyMatch || keyMatch.length < 2) {
    throw new Error("Invalid key format. Could not extract key name.");
  }

  const containerKey = keyMatch[1];
  const propertyName = keyMatch[2]; // This may be undefined if no property is specified

  // Check if the key exists in dataTestContainer
  if (containerKey in dataTestContainer) {
    const containerValue = dataTestContainer[containerKey];

    // If propertyName is defined, try to access it
    if (propertyName) {
      if (typeof containerValue[propertyName] === "function") {
        // If the property is a function, call it and return the result
        return containerValue[propertyName]();
      } else if (propertyName in containerValue) {
        // If it's a property, return its value
        return containerValue[propertyName];
      } else {
        throw new Error(`Property "${propertyName}" does not exist on "${containerKey}".`);
      }
    }

    // If no property is specified, return the whole object
    return containerValue;
  } else {
    throw new Error(`Key "${containerKey}" does not exist in dataTestContainer.`);
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const convertDataTest = (keys: any[]) => {
  return keys.map((key) => {
    if (typeof key !== "string" || !key.startsWith("__")) {
      return key;
    }
    if (key.startsWith("__globalData")) {
      return getDataFromGlobalData(key);
    }
    return convertKeyToDataTest(key);
  });
};
