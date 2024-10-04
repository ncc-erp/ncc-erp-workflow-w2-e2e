Feature: Probationary Confirmation Request
  @pm
  Rule: As pm, I want to received a Probationary Confirmation Request from my project
    Background:
      Given User create "Probationary Confirmation Request" with "*testData[random_probationary_confirmation_request]__global[pcr1]" success
      And I am on "TaskPage"

    Scenario: I should see the request with pending status on my tasks
      Then I should see request is "pending" with title "*global[pcr1].getTitle" and state "PM Reviews" on tasks page

    Scenario: I can approve the request success
      When I approve request by title "*global[pcr1].getTitle" with strength points "strength points test" and weekness points "weekness points test"
      Then I should see request is "approve" with title "*global[pcr1].getTitle" and state "PM Reviews" on tasks page

    Scenario: I can reject the request success
      When I reject request by title "*global[pcr1].getTitle" with reason "test reason"
      Then I should see request is "reject" with title "*global[pcr1].getTitle" and state "PM Reviews" on tasks page
    @gdvpdn
  Rule: As gdvp, I want to received a Probationary Confirmation Request from my office
    Background:
      Given User create "Probationary Confirmation Request" with "*testData[random_probationary_confirmation_request]__global[pcr2]" success
      And I am on "TaskPage"

    Scenario: I should see the request with pending status on my tasks
      Then I should see request is "pending" with title "*global[pcr2].getTitle" and state "HoO Reviews" on tasks page

    Scenario: I can approve the request success
      When I approve request by title "*global[pcr2].getTitle" with strength points "strength points test" and weekness points "weekness points test"
      Then I should see request is "approve" with title "*global[pcr2].getTitle" and state "HoO Reviews" on tasks page

    Scenario: I can reject the request success
      When I reject request by title "*global[pcr2].getTitle" with reason "test reason"
      Then I should see request is "reject" with title "*global[pcr2].getTitle" and state "HoO Reviews" on tasks page

    @ceo
  Rule: As ceo, I want to received a Probationary Confirmation Request after pm, gdvp approved
    Background:
      Given User create "Probationary Confirmation Request" with "*testData[random_probationary_confirmation_request]__global[pcr3]" success
      And "GDVPDN" approve the request "*global[pcr3].getTitle" with strength points "strength points test" and weekness points "weekness points test" success, current state "HoO Reviews"
      And "PM" approve the request "*global[pcr3].getTitle" with strength points "strength points test" and weekness points "weekness points test" success, current state "PM Reviews"
      And I am on "TaskPage"

    Scenario: I should see the request with pending status on my tasks
      Then I should see request is "pending" with title "*global[pcr3].getTitle" and state "CEO Reviews" on tasks page

    Scenario: I can approve the request success
      When I approve request by title "*global[pcr3].getTitle" with strength points "" and weekness points ""
      Then I should see request is "approve" with title "*global[pcr3].getTitle" and state "CEO Reviews" on tasks page

    Scenario: I can reject the request success
      When I reject request by title "*global[pcr3].getTitle" with reason "test reason"
      Then I should see request is "reject" with title "*global[pcr3].getTitle" and state "CEO Reviews" on tasks page
    @user
  Rule: As user, I want to see a Probationary Confirmation Request after CEO approved
    Background:
      Given User create "Probationary Confirmation Request" with "*testData[random_probationary_confirmation_request]__global[pcr4]" success
      And "GDVPDN" approve the request "*global[pcr4].getTitle" with strength points "strength points test" and weekness points "weekness points test" success, current state "HoO Reviews"
      And "PM" approve the request "*global[pcr4].getTitle" with strength points "strength points test" and weekness points "weekness points test" success, current state "PM Reviews"
      And "CEO" approve the request "*global[pcr4].getTitle" with strength points "" and weekness points "" success, current state "CEO Reviews"

    Scenario: I should see the request with approved status on my requests
      When I am on "MyRequestPage"
      Then I should see "*global[pcr4].getTitle" with status "Approved" on my request page