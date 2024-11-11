Feature: Advance Payment Request

  @accountant
  Rule: As hr, I want to received a Advance Payment Request from my project

    Background:
      Given User create "Advance Payment Request" with "*testData.random_advance_payment_request__global[co1]" success
      And I am on "TaskPage"

    Scenario: I should see the request with pending status on my tasks
      Then I should see request is "pending" with id "*global[co1].response.id" and state "Accountant Reviews" on tasks page

    Scenario: I can approve the request success
      When I approve request with id "*global[co1].response.id"
      Then I should see request is "approve" with id "*global[co1].response.id" and state "Accountant Reviews" on tasks page

    Scenario: I can reject the request success
      When I reject request with id "*global[co1].response.id" with reason "test reason"
      Then I should see request is "reject" with id "*global[co1].response.id" and state "Accountant Reviews" on tasks page
