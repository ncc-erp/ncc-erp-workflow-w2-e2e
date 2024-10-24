Feature: User Management Request
  @gdvpdn
  Rule: As gdvpdn, I want to see users list
    Background:
      Given I am on "UserManagementPage" with "*testData[random_user_management_data]__global[umd1]"
      And I should see the list of users with username "*global[umd1].getUserName", email address "*global[umd1].getEmailAddress", phone number "*global[umd1].getPhoneNumber", role "*global[umd1].getRole"
      
    Scenario: I can search user by email
      When I search users by email "*global[umd1].getEmailAddress"
      Then I should see the list of users with username "*global[umd1].getUserName", email address "*global[umd1].getEmailAddress", phone number "*global[umd1].getPhoneNumber", role "*global[umd1].getRole"

    Scenario: I can filter user by role
      When I filter users by role "*global[umd1].Role"
      Then I should see the list of users with username "*global[umd1].getUserName", email address "*global[umd1].getEmailAddress", phone number "*global[umd1].getPhoneNumber", role "*global[umd1].getRole"

    Scenario: I can edit user
      When I open the action menu for the user with email "*global[umd1].getEmailAddress"
      And I select "Edit" from the action menu
      Then I should be redirected to the edit page for the user
