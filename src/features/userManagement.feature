Feature: User Management

  @admin
  Rule: As admin, I want to search user by email success

  @admin
  Rule: As admin, I want to manage Role filter success

    Scenario: Filter user by role

  @admin
  Rule: As admin, I want to edit user role success

    Scenario Outline: When I tick on a role name, I should see name of user in the user list of the same role name
      Given I am on "UserManagementPage"
      And I open Edit user popup of user with name as "<userName>"
      And I assign user with the role
        | role  |
        | admin |
      And I am on "RolesPage"
      And I want to see name of user in each role user list as below
        | role        | status        |
        | admin       | displayed     |
        | defaultUser | not displayed |
        | designer    | not displayed |
  # @admin
  # Rule: As admin, I want to edit user phone number success
  #   Scenario: Admin can edit user user phone number success
  # @user
  # Rule: As user, I want to see if my name is changed
  #   Background: Admin edit name of user success
  #   Scenario: Verify name of user changed
  # Rule: As user, I want to log in with new username success
  #   Background: Admin edit username of user success
  #   Scenario: I can log in with new username success
  #   Scenario: I cannot log in with old username
  # Rule: As user, I want to log in with new email success
  #   Background: Admin edit email of user success
  #   Scenario: I can log in with new email success
  #   Scenario: I cannot log in with old email
  # Rule: As user, I want to log in with new password success
  #   Background: Admin edit password of user success
  #   Scenario: I can log in with new password success
  #   Scenario: I cannot log in with old password
  #     Given I am on "LoginPage"

