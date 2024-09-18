# Setup

### Install

1. git clone project
2. npm i

### Command to run

1. npm run test (For headless mode)
2. npm run test:ui (For ui mode)
3. npm run test:report (For showing the report by html)
4. npm run test:codegen (For showing the recording mode)

## Notes

1. Development setup mock send mail from https://www.smtpbucket.com/

## How to write the test cases

### Notes

1. follow user story style

```
As {user}, I want {target}
When ....
I should ...
```

2. set tags for test cases @userType (user, pm, it, sale...), @bug (handel for bug fixing)

3. trying to reuse test steps

- POM in pageObjects
- write common steps in steps folder (multiple steps combine)
- if you want to handle multiple authenticated in one testcase, you can use BrowserControl object

```
await BrowserControl.withAuth(browser, authUserFile, async ({ PageObjects }) => {
  // user authenticated as user in this context
  await userCreateDeviceRequestSteps(PageObjects);
});
```

4. prepare test data in folder data and if for specify test.spec please naming the same
5. trying dynamic data for you test cases
