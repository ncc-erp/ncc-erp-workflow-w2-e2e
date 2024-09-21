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
// todo
1. trying to reuse test steps

- POM in pageObjects
- write common steps in steps folder (multiple steps combine)
- if you want to handle multiple authenticated in one testcase, you can use BrowserControl object

```
await BrowserControl.withAuth(browser, authUserFile, async ({ PageObjects }) => {
  // user authenticated as user in this context
  await userCreateDeviceRequestSteps(PageObjects);
});
```

### Test Data
// todo
1. prepare test data in folder data
2. trying dynamic data for you test cases
