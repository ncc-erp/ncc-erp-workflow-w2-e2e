Feature: Office Equipment Request
  @gdvpdn
  Rule: As gdvp, I want to received an Office Equipment Request from my office
    Background:
      Given User create "Office Equipment Request" with "*testData[random_office_equipment_request]__global[oer1]" success
      And I am on "TaskPage"

    Scenario: I should see the request with pending status on my tasks
      Then I should see request is "pending" with id "*global[oer1].response.id" and state "Branch Manager Reviews" on tasks page

    Scenario: I can approve the request success
      When I approve request with id "*global[oer1].response.id"
      Then I should see request is "approve" with id "*global[oer1].response.id" and state "Branch Manager Reviews" on tasks page

    Scenario: I can reject the request success
      When I reject request with id "*global[oer1].response.id" with reason "test reason"
      Then I should see request is "reject" with id "*global[oer1].response.id" and state "Branch Manager Reviews" on tasks page

    @it
  Rule: As it, I want to received an Office Equipment Request after gdvp approved
    Background:
      Given User create "Office Equipment Request" with "*testData[random_office_equipment_request]__global[oer2]" success
      And "GDVPDN" approve the request "*global[oer2].response.id" success and current state "Branch Manager Reviews"
      And I am on "TaskPage"

    Scenario: I should see the request with pending status on my tasks
      Then I should see request is "pending" with id "*global[oer2].response.id" and state "IT Reviews" on tasks page

    Scenario: I can approve the request success
      When I approve request with id "*global[oer2].response.id"
      Then I should see request is "approve" with id "*global[oer2].response.id" and state "IT Reviews" on tasks page

    Scenario: I can reject the request success
      When I reject request with id "*global[oer2].response.id" with reason "test reason"
      Then I should see request is "reject" with id "*global[oer2].response.id" and state "IT Reviews" on tasks page
    @user
  Rule: As user, I want to see an Office Equipment Request after it approved
    Background:
      Given User create "Office Equipment Request" with "*testData[random_office_equipment_request]__global[oer3]" success
      And "GDVPDN" approve the request "*global[oer3].response.id" success and current state "Branch Manager Reviews"
      And "IT" approve the request "*global[oer3].response.id" success and current state "IT Reviews"

    Scenario: I should see the request with approved status on my requests
      When I am on "MyRequestPage"
      Then I should see "*global[oer3].response.id" with status "Approved" on my request page