# Setup

### Install

1. git clone project
2. npm i
3. create .env file (see .env.example)

### Command to run

1. npm run test (For headless mode)
2. npm run test:ui (For ui mode)
3. npm run test:report (For showing the report by html)
4. npm run test:codegen (For showing the recording mode)

## Notes

1. Development setup mock send mail from https://www.smtpbucket.com/

## How to write the test cases
Pattern: BDD, PageObject (POM), Test Data
### Conventions
1. All folder and file name use camelCase
2. Class use CapitalCase
3. All variable should have specify type
4. Should fix all lint/pretier

### BDD
1. Create features file in folder `src/features` name file end with `.feature`
2. `Given, When, Then` apply

- Use `I` for writing and follow this format
```
Feature: `Feature you want to test`
  Rule: `User story in your feature`
  Scenario: `I can|should ...` the specify expectation in the story
    Given: `Initial context or setup`
    When: `I <action> ... (Action taken by the user)`
    Then: `I should ... (Expected outcome)`
```
- Use `And` instead of `When ... When` or `Then ... Then` or `Given ... Given`
```
Scenario: I should login success
  Given I navigate to the Website
  When I enters credentials
  When I clicks on the sign-in button
  Then I should see the title after login
In this case `When ... When` should be change to `When ... And`
Scenario: I should login success
  Given I navigate to the Website
  When I enters credentials
  And I clicks on the sign-in button
  Then I should see the title after login
```
- Use `Background` `Scenario Outline` to reduce time cost
- Use a Data Table to verify sets of Similar Data
```
Scenario: Login as a new sign-up user with valid data
  When I entered valid credential
  | email                     | validpassword |title   |
  | qatubeupdate1@yopmail.com | 12345         | Home   |
  | qatubeupdate2@yopmail.com | 12345         | Home   |
  | qatubeupdate3@yopmail.com | 12345         | Home   |
  | qatubeupdate4@yopmail.com | 12345         | Home   |

  When User click on sign-in button
  Then Validate the title after login
```
- Use tags you can use with Feature/Rule/Scenario
1. Link to ticket number. Example: `@W-212`
2. Mark as user authenticated `@user` `@pm` `@hpm` `@sale` `@it` `@gdvpdn` `@gdvpv` (keep this tags lower case)
If you want to create the new tag for user. Example: create the new tag `@gdvphn1`. Please add a new object `gdvphn1` to file `src/data/users.data.ts`
```
export const authGDVPVFile = path.join(__dirname, "../.auth/GDVPHN1.json");
export const users = {
  gdvphn1: {
    username: "*****@ncc.asia",
    password: "*****",
    name: "*****",
    authFile: authGDVPDNFile,
  },
};
```
- Avoid Conjunctive Steps for reusing. **Conjunctive Steps:** These are steps that combine multiple actions or conditions into one. 
Example:
```
Given the user is logged in and on the dashboard and has notifications

Should be change to this way: 
Given the user is logged in
And the user is on the dashboard
And the user has notifications
```
- Should keep scenarios are easy to read and understand. Write in a declarative way, not Imperative (dont need put more more detail steps). 
Example: 
```
# Declarative scenario
Rule: as user, I want to login to the system
  Scenario: I should login success
    Given I navigate to the Website
    When I enters credentials
    And I clicks on the sign-in button
    Then I should see the title after login
  -------------------------------------------
# Imperative scenario
Rule: as user, I want to login to the system
  Scenario: I should login success
    Given I navigate to the Website
    When I enter “username” # more detail
    And I enter “password” # more detail
    And I check the “Remember me” check box # more detail
    And I user clicks on the sign-in button
    Then I should see the title after login
```

2. Create steps file in folder `src/features/steps` name file `<name>.step.ts`
step file should follow page by page. if any common steps should put them to `share.step.ts`
### POM
#### 1. Overview

- PageObjects: Located in `src/pageObjects/pages`
- Components: Located in `src/pageObjects/components`

#### 2. How to use PageObjects
- Create a new PageObject: Create a new file with format `<name>.page.ts` in `src/pageObjects/pages`. Then you have to add them to `page.fixture.ts` Example:
```
# src/pageObjects/page.fixture.ts
# example I create new page object `TaskPage` in file `task.page.ts`

export type PageObjects = {
  LoginPage: LoginPage;
  RequestTemplatePage: RequestTemplatePage;
  MyRequestPage: MyRequestPage;
  # should add your page object in here
  TaskPage: TaskPage;
};
const convertToPageObjects = (page: Page): PageObjects => {
  return {
    LoginPage: new LoginPage(page),
    RequestTemplatePage: new RequestTemplatePage(page),
    MyRequestPage: new MyRequestPage(page),
    # should create new your page object in here
    TaskPage: new TaskPage(page),
  };
};
```
- Use pageObject in steps. You can get them in callback function. Example:
```
When( // same way for Given, Then
  "I login with username {string} and password {string}",
  async ({ PageObjects }, username: string, password: string) => {
    await PageObjects.LoginPage.login(username, password);
  }
);
```
- Use pageObject with BrowserControl.withAuth. You can get them in callback function. Example:
```
await BrowserControl.withAuth(browser, authUserFile, async ({ PageObjects }) => {
  await PageObjects.RequestTemplatePage.open();
  await PageObjects.RequestTemplatePage.verifyPageLocated();
  await PageObjects.RequestTemplatePage.createRequest(name, deviceRequest);
});
```
**BrowserControl.withAuth in use:** Your main context is authenticated with normal user. but you want to make some actions in others user (Ex: pm, sale, it...). so, should handle in other context (open the new browser to handle it)
### 3. Rule for PageObject
- Page Object should extends from BasePage
- Properties in PageObject should present elements in page (should private property). In case, the properties are component objects we can set them public property.
- Methods in PageObject should present user action can integrate to the page or verify method to check expectation

Example:
```
export default class RequestTemplatePage extends BasePage { // should extends base page
  public table: Table; // component in page, It's custom components in ./components folder
  public form: TemplateForm; // component in page, It's custom components in ./components folder
  private get createBtn() { // element in page
    return this.page.getByRole("button", { name: "Create" }); // use playwright locator
  }
  constructor(readonly page: Page) {
    super(page, "/my-requests"); // set path of page
    this.table = new Table(page, this.page.getByTestId("request-table")); // new component you want to set
    
    this.form = new TemplateForm(page, this.page.getByTestId("request-form")); // new component you want to set
  }

  async createNewTemplate(data: TemplateForm) { // user action - create new template
    await this.createBtn.click(); // click create btn
    await this.form.fill(data); // fill form
    await this.form.submit(); // click submit
  }

  async verifyTemplateByTitle(title: string) { // verify method to check expectation
    await this.table.verifyTextInCol(0, title)
  }
}
```
4. Rules for components (almost same as Page Objects)
- Component Object should extends from BaseComponent
- Properties and Methods has the same rules as Page Object

5. Utils
- waitLoading: wait for skeleton loading completely
- BrowserControl: support open new browser and authenticated for them
```
// authAdminFile ==> is the path to auth user (setup in users.data.ts)
await BrowserControl.withAuth(browser, authAdminFile, async ({ PageObjects }) => {
  // in this callback. You can action as Admin user
  await PageObjects.RequestTemplatePage.open();
  await PageObjects.RequestTemplatePage.verifyPageLocated();
  // create a new template (only admin have permission)
  await PageObjects.RequestTemplatePage.createNewTemplate(templateData);
});
```

### Test Data
// todo
1. Use data test config
2. Use generate data in feature file
2. Some best practices
