Feature: Change Office Request
  @pm
  Rule: As pm, I want to received a Change Office Request from my project
    Background:
      Given User create "Change Office Request" with "*testData.random_change_office_request__global[co1]" success
      And I am on "TaskPage"

    Scenario: I should see the request with pending status on my tasks
      Then I should see request is "pending" with title "*global[co1].getTitle" and state "PM Reviews" on tasks page

    Scenario: I can approve the request success
      When I approve request by title "*global[co1].getTitle"
      Then I should see request is "approve" with title "*global[co1].getTitle" and state "PM Reviews" on tasks page

    Scenario: I can reject the request success
      When I reject request by title "*global[co1].getTitle" with reason "test reason"
      Then I should see request is "reject" with title "*global[co1].getTitle" and state "PM Reviews" on tasks page

    @gdvpdn
  Rule: As gdvp, I want to received a Change Office Request from my office
    Background:
      Given User create "Change Office Request" with "*testData[random_change_office_request]__global[co2]" success
      And I am on "TaskPage"

    Scenario: I should see the request with pending status on my tasks
      Then I should see request is "pending" with title "*global[co2].getTitle" and state "Current HoO Reviews" on tasks page

    Scenario: I can approve the request success
      When I approve request by title "*global[co2].getTitle"
      Then I should see request is "approve" with title "*global[co2].getTitle" and state "Current HoO Reviews" on tasks page

    Scenario: I can reject the request success
      When I reject request by title "*global[co2].getTitle" with reason "test reason"
      Then I should see request is "reject" with title "*global[co2].getTitle" and state "Current HoO Reviews" on tasks page


    @gdvpv
  Rule: As gdvp, I want to received a Change Office Request if anyone come to my office
    Background:
      Given User create "Change Office Request" with "*testData[random_change_office_request]__global[co3]" success
      And I am on "TaskPage"

    Scenario: I should see the request with pending status on my tasks
      Then I should see request is "pending" with title "*global[co3].getTitle" and state "Destination HoO Reviews" on tasks page

    Scenario: I can approve the request success
      When I approve request by title "*global[co3].getTitle"
      Then I should see request is "approve" with title "*global[co3].getTitle" and state "Destination HoO Reviews" on tasks page

    Scenario: I can reject the request success
      When I reject request by title "*global[co3].getTitle" with reason "test reason"
      Then I should see request is "reject" with title "*global[co3].getTitle" and state "Destination HoO Reviews" on tasks page
    @user
  Rule: As user, I want to see a Change Office Request after PM, GDVP1, GDVP2 approved
    Background:
      Given User create "Change Office Request" with "*testData[random_change_office_request]__global[co4]" success
      And "PM" approve the request "*global[co4].getTitle" success
      And "GDVPDN" approve the request "*global[co4].getTitle" success
      And "GDVPV" approve the request "*global[co4].getTitle" success

    Scenario: I should see the request with approved status on my requests
      When I am on "MyRequestPage"
      Then I should see "*global[co4].getTitle" with status "Approved" on my request page