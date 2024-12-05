Feature: Left Side Menu

  @admin
  Rule: As admin, I should see these Navigation Links on Left Side Menu after login

    Scenario: Verify Navigation Links on Left Side Menu
      Given I am on "RequestTemplatePage"
      When I click on 2 accordion button on the left side menu
      Then I should see these Navigation Links displayed on the Left Side Menu
        | link               |
        | Request templates  |
        | Requests           |
        | Tasks              |
        | Administration     |
        | User management    |
        | Settings           |
        | Roles              |
        | Manage permissions |
        | Report             |
        | Report WFH         |

  @user
  Rule: As user, I should see these Navigation Links on Left Side Menu after login

    Scenario: Verify Navigation Links on Left Side Menu
      Given I am on "RequestTemplatePage"
      Then I should see these Navigation Links displayed on the Left Side Menu
        | link              |
        | Request templates |
        | My requests       |
        | My tasks          |
