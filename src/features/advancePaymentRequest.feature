Feature: Advance Payment Request

  @accountant
  Rule: As accountant, I want to received a Advance Payment Request from my project

    Background:
      Given User create "Advance Payment Request" with "*testData.random_advance_payment_request__global[co1]" success
      And I am on "TaskPage"

    Scenario: I should see the request with pending status on my tasks and an notification email send to me
      Then I should see request is "pending" with id "*global[co1].response.id" and state "Accountant Reviews" on tasks page
      And I should see an email send to "*testData.users.accountant.username" with subject "*global[co1].getNotificationSubject"

    Scenario: I can approve the request success
      When I approve request with id "*global[co1].response.id"
      Then I should see request is "approve" with id "*global[co1].response.id" and state "Accountant Reviews" on tasks page

    Scenario: I can reject the request success
      When I reject request with id "*global[co1].response.id" with reason "test reason"
      Then I should see request is "reject" with id "*global[co1].response.id" and state "Accountant Reviews" on tasks page

  @hr
  Rule: As hr, I want to receive an email notification when the Advance Payment Request is approved

    Background:
      Given User create "Advance Payment Request" with "*testData.random_advance_payment_request__global[co2]" success
      And "Accountant" approve the request "*global[co2].response.id", current state "Accountant Reviews" success

    Scenario: I should see an email notification when the Advance Payment Request is approved
      Then I should see an email send to "*testData.users.hr.username" with subject "*global[co2].getApprovedNotiSubject"

  @user
  Rule: As user, I want to receive an email notification when the Advance Payment Request is approved

    Background:
      Given User create "Advance Payment Request" with "*testData.random_advance_payment_request__global[co3]" success

    Scenario: I should see an email notification when the Advance Payment Request is Approved
      When "Accountant" approve the request "*global[co3].response.id", current state "Accountant Reviews" success
      Then I should see an email send to "*testData.users.user.username" with subject "*global[co3].getApprovedSubject"

    Scenario: I should see an email notification when the Advance Payment Request is rejected
      When "Accountant" reject the request "*global[co3].response.id", current state "Accountant Reviews" success with reason "test reason"
      Then I should see an email send to "*testData.users.user.username" with subject "*global[co3].getRejectedSubject"
