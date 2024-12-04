Feature: User Management

  @admin
  Rule: As admin, I want to search user by email success

    Scenario: I can search user by email
      Given I am on "UserManagementPage"
      When I input "<email>" into Email search box
      Then I should see a row with User Name as "<userName>", email as "<email>" and role as "<role>" displayed

      Examples:
        | userName               | email                  | role        |
        | anh.dothihong@ncc.asia | anh.dothihong@ncc.asia | DefaultUser |

  @admin
  Rule: As admin, I want to manage Role filter success

    Scenario: Filter user by role
      Given I am on "UserManagementPage"
      When I click on "<role>" from the Role dropdown
      Then I should see all request with role include "<role>" display

      Examples:
        | role        |
        | DefaultUser |

  @admin @mode:serial
  Rule: As admin, I want to edit user role success

    Background:
      Given I am on "UserManagementPage"
      And Following test data
        | email                  | roleName | roleDisplayName | name           |
        | anh.dothihong@ncc.asia | Admin    | admin           | an Do Thi Hong |
      And I input "<email>" into Email search box
      And I open Edit user popup of the only user displayed

    Scenario: When I check on a role name, I should see name of user in the user list of the same role name
      When I "assign" user with the role "<roleName>"
      Then I should see role "<roleDisplayName>" "displayed" in the user role
      And I should see name of user as "<name>" "displayed" in "<roleDisplayName>" role user list in Role page

    Scenario: When I uncheck on a role name, I should see name of user in the user list of the same role name
      When I "unassign" user with the role "<roleName>"
      Then I should see role "<roleDisplayName>" "not displayed" in the user role
      And I should see name of user as "<name>" "not displayed" in "<roleDisplayName>" role user list in Role page
