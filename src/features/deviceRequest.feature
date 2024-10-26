Feature: Device Request

  @pm
  Rule: As pm, I want to received a Device Request from my project

    Background:
      Given User create "Device Request" with "*testData[random_device_request]__global[deviceRequest2]" success
      And I am on "TaskPage"

    Scenario: I should see the request with pending status on my tasks
      Then I should see request is "pending" with id "*global[deviceRequest2].response.id" and state "PM Reviews" on tasks page

    Scenario: I can approve the request success
      When I approve request with id "*global[deviceRequest2].response.id"
      Then I should see request is "approve" with id "*global[deviceRequest2].response.id" and state "PM Reviews" on tasks page

    Scenario: I can reject the request success
      When I reject request with id "*global[deviceRequest2].response.id" with reason "test reason"
      Then I should see request is "reject" with id "*global[deviceRequest2].response.id" and state "PM Reviews" on tasks page

  @it
  Rule: As IT, I want to received a Device Request after PM approved

    Background:
      Given User create "Device Request" with "*testData[random_device_request]__global[deviceRequest3]" success
      And "PM" approve the request "*global[deviceRequest3].response.id" success and current state "PM Reviews"
      And I am on "TaskPage"

    Scenario: I should see the request with pending status on my tasks
      Then I should see request is "pending" with id "*global[deviceRequest3].response.id" and state "IT Reviews" on tasks page

    Scenario: I can approve the request success
      When I approve request with id "*global[deviceRequest3].response.id"
      Then I should see request is "approve" with id "*global[deviceRequest3].response.id" and state "IT Reviews" on tasks page

    Scenario: I can reject the request success
      When I reject request with id "*global[deviceRequest3].response.id" with reason "test reason"
      Then I should see request is "reject" with id "*global[deviceRequest3].response.id" and state "IT Reviews" on tasks page

  @user
  Rule: As user, I want to see an Device Request after it approved

    Background:
      Given User create "Device Request" with "*testData[random_device_request]__global[deviceRequest4]" success
      And "PM" approve the request "*global[deviceRequest4].response.id" success and current state "PM Reviews"
      And "IT" approve the request "*global[deviceRequest4].response.id" success and current state "IT Reviews"

    Scenario: I should see the request with approved status on my requests
      When I am on "MyRequestPage"
      Then I should see "*global[deviceRequest4].response.id" with status "Approved" on my request page
