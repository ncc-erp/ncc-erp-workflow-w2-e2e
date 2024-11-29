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
  # @admin
  # Rule: As admin, I want to edit user role success
  #   Scenario: When I tick on a role name, I should see name of user in the user list of the same role name
  #     Given I am on "UserManagementPage"
  #     When I input "<email>" into Email search box
  #     And I open Edit user popup of the only user displayed
  #     And I assign user with the role "<roleName>"
  #     Then I should see the user role include role "<roleDisplayName>"
  #     And I want to see name of user as "<name>" in "<roleDisplayName>" role user list in Role page
  #     Examples:
  #       | email                  | roleName | roleDisplayName | name           |
  #       | anh.dothihong@ncc.asia | Admin    | admin           | an Do Thi Hong |
