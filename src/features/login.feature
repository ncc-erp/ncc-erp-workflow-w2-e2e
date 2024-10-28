Feature: As user, I want to login to w2

  Scenario: Login success
    Given I am on "LoginPage"
    When I login with username "manh.nguyenvan@ncc.asia" and password "1q2w3E*"
    Then I should see "RequestTemplatePage"

  @user
  Scenario: Logout success
    Given I am on "RequestTemplatePage"
    When I logout
    Then I should see "LoginPage"
