Feature: Probationary Confirmation Request

  @pm
  Rule: As pm, I want to received a Probationary Confirmation Request from my project

    Background:
      Given User create "Probationary Confirmation Request" with "*testData[random_probationary_confirmation_request]__global[pcr1]" success
      And I am on "TaskPage"

    Scenario: I should see the request with pending status on my tasks
      Then I should see request is "pending" with id "*global[pcr1].response.id" and state "PM Reviews" on tasks page

    Scenario: I can approve the request success
      When I approve request with id "*global[pcr1].response.id" with strength points "strength points test" and weekness points "weekness points test"
      Then I should see request is "approve" with id "*global[pcr1].response.id" and state "PM Reviews" on tasks page

    Scenario: I can reject the request success
      When I reject request with id "*global[pcr1].response.id" with reason "test reason"
      Then I should see request is "reject" with id "*global[pcr1].response.id" and state "PM Reviews" on tasks page

  @gdvpdn
  Rule: As gdvp, I want to received a Probationary Confirmation Request from my office

    Background:
      Given User create "Probationary Confirmation Request" with "*testData[random_probationary_confirmation_request]__global[pcr2]" success
      And I am on "TaskPage"

    Scenario: I should see the request with pending status on my tasks
      Then I should see request is "pending" with id "*global[pcr2].response.id" and state "HoO Reviews" on tasks page

    Scenario: I can approve the request success
      When I approve request with id "*global[pcr2].response.id" with strength points "strength points test" and weekness points "weekness points test"
      Then I should see request is "approve" with id "*global[pcr2].response.id" and state "HoO Reviews" on tasks page

    Scenario: I can reject the request success
      When I reject request with id "*global[pcr2].response.id" with reason "test reason"
      Then I should see request is "reject" with id "*global[pcr2].response.id" and state "HoO Reviews" on tasks page

  @ceo
  Rule: As ceo, I want to received a Probationary Confirmation Request after pm, gdvp approved

    Background:
      Given User create "Probationary Confirmation Request" with "*testData[random_probationary_confirmation_request]__global[pcr3]" success
      And "GDVPDN" approve the request "*global[pcr3].response.id" with strength points "strength points test" and weekness points "weekness points test" success and current state "HoO Reviews"
      And "PM" approve the request "*global[pcr3].response.id" with strength points "strength points test" and weekness points "weekness points test" success and current state "PM Reviews"
      And I am on "TaskPage"

    Scenario: I should see the request with pending status on my tasks
      Then I should see request is "pending" with id "*global[pcr3].response.id" and state "CEO Reviews" on tasks page

    Scenario: I can approve the request success
      When I approve request with id "*global[pcr3].response.id" with strength points "" and weekness points ""
      Then I should see request is "approve" with id "*global[pcr3].response.id" and state "CEO Reviews" on tasks page

    Scenario: I can reject the request success
      When I reject request with id "*global[pcr3].response.id" with reason "test reason"
      Then I should see request is "reject" with id "*global[pcr3].response.id" and state "CEO Reviews" on tasks page

  @user
  Rule: As user, I want to see a Probationary Confirmation Request after CEO approved

    Background:
      Given User create "Probationary Confirmation Request" with "*testData[random_probationary_confirmation_request]__global[pcr4]" success
      And "GDVPDN" approve the request "*global[pcr4].response.id" with strength points "strength points test" and weekness points "weekness points test" success and current state "HoO Reviews"
      And "PM" approve the request "*global[pcr4].response.id" with strength points "strength points test" and weekness points "weekness points test" success and current state "PM Reviews"
      And "CEO" approve the request "*global[pcr4].response.id", current state "CEO Reviews" success

    Scenario: I should see the request with approved status on my requests
      When I am on "MyRequestPage"
      Then I should see "*global[pcr4].response.id" with status "Approved" on my request page

  @user
  Rule: As user, I want to see a Probationary Confirmation Request is rejected

    Background:
        Given User create "Probationary Confirmation Request" with "*testData[random_probationary_confirmation_request]__global[pcr4]" success

    Scenario: I should see the request with rejected status when GDVPDN rejected
        When "GDVPDN" reject the request "*global[pcr4].response.id", current state "HoO Reviews" success with reason "reason test"
        And I am on "MyRequestPage"
        Then I should see "*global[pcr4].response.id" with status "Rejected" on my request page

    Scenario: I should see the request with rejected status when PM rejected
        When "PM" reject the request "*global[pcr4].response.id", current state "PM Reviews" success with reason "reason test"
        And I am on "MyRequestPage"
        Then I should see "*global[pcr4].response.id" with status "Rejected" on my request page

    Scenario: I should see the request with rejected status when CEO rejected
        When "GDVPDN" approve the request "*global[pcr4].response.id" with strength points "strength points test" and weekness points "weekness points test" success and current state "HoO Reviews"
        And "PM" approve the request "*global[pcr4].response.id" with strength points "strength points test" and weekness points "weekness points test" success and current state "PM Reviews"
        And "CEO" reject the request "*global[pcr4].response.id", current state "CEO Reviews" success with reason "reason test"
        And I am on "MyRequestPage"
        Then I should see "*global[pcr4].response.id" with status "Rejected" on my request page