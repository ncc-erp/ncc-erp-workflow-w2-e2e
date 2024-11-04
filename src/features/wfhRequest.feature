Feature: WFH Request

  @pm
  Rule: As pm, I want to received a WFH Request from my project

    Background:
      Given User create "WFH Request" with "*testData[random_wfh_request]__global[wfhRequest2]" success
      And I am on "TaskPage"

    Scenario: I should see the request with pending status on my tasks
      Then I should see request is "pending" with id "*global[wfhRequest2].response.id" and state "PM Reviews" on tasks page

    Scenario: I can approve the request success
      When I approve request with id "*global[wfhRequest2].response.id"
      Then I should see request is "approve" with id "*global[wfhRequest2].response.id" and state "PM Reviews" on tasks page

    Scenario: I can reject the request success
      When I reject request with id "*global[wfhRequest2].response.id" with reason "test reason"
      Then I should see request is "reject" with id "*global[wfhRequest2].response.id" and state "PM Reviews" on tasks page

  @gdvpdn
  Rule: As GDVP, I want to received a WFH Request after PM approved

    Background:
      Given User create "WFH Request" with "*testData[random_wfh_request]__global[wfhRequest3]" success
      And "PM" approve the request "*global[wfhRequest3].response.id", current state "PM Reviews" success
      And I am on "TaskPage"

    Scenario: I should see the request with pending status on my tasks
      Then I should see request is "pending" with id "*global[wfhRequest3].response.id" and state "Branch Manager Reviews" on tasks page

    Scenario: I can approve the request success
      When I approve request with id "*global[wfhRequest3].response.id"
      Then I should see request is "approve" with id "*global[wfhRequest3].response.id" and state "Branch Manager Reviews" on tasks page

    Scenario: I can reject the request success
      When I reject request with id "*global[wfhRequest3].response.id" with reason "test reason"
      Then I should see request is "reject" with id "*global[wfhRequest3].response.id" and state "Branch Manager Reviews" on tasks page

  @user
  Rule: As user, I want to see a WFH after PM, GDVP approved

    Background:
      Given User create "WFH Request" with "*testData[random_wfh_request]__global[wfhRequest4]" success
      And "PM" approve the request "*global[wfhRequest4].response.id", current state "PM Reviews" success
      And "GDVPDN" approve the request "*global[wfhRequest4].response.id", current state "Branch Manager Reviews" success

    Scenario: I should see the request with approved status on my requests
      When I am on "MyRequestPage"
      Then I should see "*global[wfhRequest4].response.id" with status "Approved" on my request page

  @user
  Rule: As a user, I want to see a WFH is rejected

    Background:
        Given  User create "WFH Request" with "*testData[random_wfh_request]__global[wfhRequest4]" success

    Scenario: I should see the request with rejected status when PM rejected
        When "PM" reject the request "*global[wfhRequest4].response.id", current state "PM Reviews" success with reason "reason test"
        And I am on "MyRequestPage"
        Then I should see "*global[wfhRequest4].response.id" with status "Rejected" on my request page

    Scenario: I should see the request with rejected status when GDVPDN rejected
        When "PM" approve the request "*global[wfhRequest4].response.id", current state "PM Reviews" success
        And "GDVPDN" reject the request "*global[wfhRequest4].response.id", current state "Branch Manager Review" success with reason "reason test"
        And I am on "MyRequestPage"
        Then I should see "*global[wfhRequest4].response.id" with status "Rejected" on my request page
