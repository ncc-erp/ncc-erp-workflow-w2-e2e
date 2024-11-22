Feature: User Management

  @admin
  Rule: As admin, I want to search user by email success

    Scenario: I can search user by email
      Given I am on "UserManagementPage"
      When I input "<email>" into Email search box
      Then I should see a row with User Name as "<userName>", email as "<email>" and role as "<DefaultUser>" displayed

      Examples:
        | userName               | email                  | role        |
        | anh.dothihong@ncc.asia | anh.dothihong@ncc.asia | DefaultUser |

  @admin
  Rule: As admin, I want to manage Role filter success

    Scenario: Filter user by role
      Given I am on "UserManagementPage"
      When I click on option as "<role>" from the Role dropdown
      Then I should see all user with Role field contain "<role>" display

      Examples:
        | role        |
        | DefaultUser |

  @admin
  Rule: As admin, I want to edit user role success

    Scenario: When I tick on a role name, I should see name of user in the user list of the same role name
      Given I am on "UserManagementPage"
      When I open Edit user popup of user with user name as "<userName>"
      And I assign user with the role below
        | role     |
        | admin    |
        | designer |
      And I am on "RolesPage"
      Then I want to see name of user as "<name>" in the role user list below
        | role     |
        | admin    |
        | designer |

      Examples:
        | userName               | name            |
        | anh.dothihong@ncc.asia | anh Do Thi Hong |
