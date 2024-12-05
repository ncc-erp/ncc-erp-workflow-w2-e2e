Feature: Left Side Menu

  @admin
  Rule: As admin, I should see these Navigation Links on Left Side Menu after login

    Scenario: Verify Navigation Links on Left Side Menu
      Given I am on "RequestTemplatePage"
      Then I should see these Navigation Links on Left Side Menu
        | link              |
        | Request templates |
        | Requests          |
        | Tasks             |
        | Administration    |
        | Report            |

  @user
  Rule: As user, I should see these Navigation Links on Left Side Menu after login

    Scenario: Verify Navigation Links on Left Side Menu
      Given I am on "RequestTemplatePage"
      Then I should see these Navigation Links on Left Side Menu
        | link              |
        | Request templates |
        | My requests       |
        | My tasks          |
