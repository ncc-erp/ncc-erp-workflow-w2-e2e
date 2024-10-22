
# Setup

### Install

1. Clone the project:  
   `git clone <repository-url>`
2. Install dependencies:  
   `npm install`
3. Install dependencies:  
   `npx playwright install`
4. Create a `.env` file (based on `.env.example`).

### Commands to Run

1. Run tests in headless mode:  
   `npm run test`
2. Run tests with UI mode:  
   `npm run test:ui`
3. View test reports in HTML:  
   `npm run test:report`
4. Start recording mode:  
   `npm run test:codegen`

### Vscode Extensions should be have
- Prettier
- Spell Checker
- ESLint
- Git Lens
- Cucumber (Gherkin) Full Support
- Playwright Test for VSCode 
- Quokka.js
- TypeScript Toolbox
- TypeScript Importer

## Notes

1. Development environment uses [SMTPBucket](https://www.smtpbucket.com/) to mock sending emails.

## Writing Test Cases

Tests follow the **BDD** and **Page Object Model (POM)** patterns with structured test data.

### Conventions

1. Folder and file names should use `camelCase`.
2. Classes should use `CapitalCase`.
3. All variables should have explicit types.
4. Ensure all lint and Prettier rules are adhered to (fix linting issues using the provided configuration).

### BDD

#### 1. Overview

- **Features**: Located in `src/features`.
- **Step Definitions**: Located in `src/features/steps`.

#### 2. Creating Feature Files

Feature files should be placed in `src/features` and have a `.feature` extension.

Use the `Given, When, Then` format to define steps:

```
Feature: Feature you want to test
  Rule: Describe the user story or functionality
  Scenario: I can/should... (the expected behavior)
    Given I <initial setup>
    When I <action>
    Then I should <expected outcome>
```

- Use `And` for subsequent steps instead of repeating `Given`, `When`, or `Then`.

### Example of Incorrect and Correct Usage

**Wrong Example:**

```
Scenario: I should log in successfully
  Given I navigate to the Website
  When I enter credentials
  When I click on the sign-in button
  Then I should see the title after login
```

**Correct Example:**

```
Scenario: I should log in successfully
  Given I navigate to the Website
  When I enter credentials
  And I click on the sign-in button
  Then I should see the title after login
```

- Leverage `Background` and `Scenario Outline` for reusable steps and reduce code duplication.
- Use a **Data Table** for similar data sets.

**Correct Data Table Example:**

```
Scenario: Log in as a newly registered user with valid data
  When I enter valid credentials
    | email                      | password | title  |
    | user1@example.com           | pass123  | Home   |
    | user2@example.com           | pass123  | Home   |
  And I click the sign-in button
  Then I should see the homepage
```

#### 4. tags

Use tags with Feature, Rule, or Scenario:

- Link to ticket number. Example: @W-212
- Mark user authentication levels: @user, @pm, @hpm, @sale, @it, @gdvpdn, @gdvpv (keep these tags lowercase)

If you need to create a new tag for the new user type. Example: To create a new tag @gdvphn1, add a new object to the file src/data/users.data.ts
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
#### 3. Avoiding Conjunctive Steps

Avoid combining multiple actions into one step. This will improve reusability and readability.

### Example of Incorrect and Correct Usage

**Wrong Example:**

```
Given the user is logged in and on the dashboard and has notifications
```

**Correct Example:**

```
Given the user is logged in  
And the user is on the dashboard  
And the user has notifications
```

#### 4. Writing Declarative Scenarios

Focus on **what** happens, not **how** it happens.

### Example of Incorrect and Correct Usage

**Wrong Example (Imperative):**

```
Scenario: I should log in successfully
  Given I navigate to the Website
  When I enter “username”
  And I enter “password”
  And I check the “Remember me” check box
  And I click on the sign-in button
  Then I should see the title after login
```

**Correct Example (Declarative):**

```
Scenario: I should log in successfully
  Given I navigate to the Website
  When I enter credentials
  And I click the sign-in button
  Then I should see the title after login
```

#### 3. Step Definitions

Step definition files are located in `src/features/steps`. Each step file should map to a specific page. Common steps should be placed in `share.step.ts`.

### Page Object Model (POM)

#### 1. Overview

- **Page Objects**: Located in `src/pageObjects/pages`.
- **Components**: Located in `src/pageObjects/components`.

#### 2. Creating Page Objects

To create a new Page Object:

1. Create a new file in `src/pageObjects/pages` with the format `<name>.page.ts`.
2. Register the new Page Object in `page.fixture.ts`.

Example:

```ts
export type PageObjects = {
  LoginPage: LoginPage;
  MyRequestPage: MyRequestPage;
  TaskPage: TaskPage;
};
const convertToPageObjects = (page: Page): PageObjects => ({
  LoginPage: new LoginPage(page),
  MyRequestPage: new MyRequestPage(page),
  TaskPage: new TaskPage(page),
});
```

#### 3. Page Object Rules

- Page Objects should extend `BasePage`.
- Properties representing page elements should be private, except when they are component objects.
- Methods should describe user actions or verification steps.

Example:

```ts
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

### Utilities

- `waitLoading`: Wait for skeleton loading to complete.
- `BrowserControl`: Supports opening a new browser session with user authentication.
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

### Test Data Management

#### Data test in config
- All test data should locate in `src/data`
- All data or function you want to call in feature files, should public in file `src/data/features.data.ts`

#### Use data test in feature file
1. Accessing Config Data:
When test data is configured in src/data and made public in features.data.ts, you can access functions or properties of the testData object using the following syntax: `*testData[<property or method of testData object>].<next property or method>`

Example:
```
Feature: As user, I want to login to w2
  Scenario: Login success
    Given I am on "LoginPage"
    When I login with username "*testData[users].user.username" and password "*testData[users].user.password"
    Then I should see "RequestTemplatePage"
```
2. Dynamic Data and Global Storage:
- To call a method for dynamic data from the testData object and save it to global data for use in subsequent steps, use this syntax: `*testData[<method of testData object>]__global[<key in global object>]`
- To get data from global data, use this syntax: `*global[<key in global object>].<method or property>`

Example: 

```
Feature: Device Request
  Rule: As pm, I want to received a Device Request from my project
    Background:
      Given User create "Device Request" with "*testData[random_device_request]__global[drkey1]" success
      And I am on "TaskPage"

    Scenario: I should see the request with pending status on my tasks
      Then I should see request is "pending" with title "*global[drkey1].getTitle" and state "PM Reviews" on tasks page
```
3. Best practices
- Utilize dynamic data as much as possible
- Make extensive use of data tables in features
- Configure test data on a feature-by-feature


