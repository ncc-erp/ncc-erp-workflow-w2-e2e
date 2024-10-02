Feature: Device Request
  @pm
  Rule: As pm, I want to received a Device Request from my project
    Background:
      Given User create "Device Request" with "*testData[random_device_request]__global[deviceRequest2]" success
      And I am on "TaskPage"

    Scenario: I should see the request with pending status on my tasks
      Then I should see request is "pending" with title "*global[deviceRequest2].getTitle" and state "PM Reviews" on tasks page

    Scenario: I can approve the request success
      When I approve request by title "*global[deviceRequest2].getTitle" with strength points "" and weekness points ""
      Then I should see request is "approve" with title "*global[deviceRequest2].getTitle" and state "PM Reviews" on tasks page

    Scenario: I can reject the request success
      When I reject request by title "*global[deviceRequest2].getTitle" with reason "test reason"
      Then I should see request is "reject" with title "*global[deviceRequest2].getTitle" and state "PM Reviews" on tasks page

    @it
  Rule: As IT, I want to received a Device Request after PM approved
    Background:
      Given User create "Device Request" with "*testData[random_device_request]__global[deviceRequest3]" success
      And "PM" approve the request "*global[deviceRequest3].getTitle" with strength points "" and weekness points "" success, current state "PM Reviews" 
      And I am on "TaskPage"

    Scenario: I should see the request with pending status on my tasks
      Then I should see request is "pending" with title "*global[deviceRequest3].getTitle" and state "IT Reviews" on tasks page

    Scenario: I can approve the request success
      When I approve request by title "*global[deviceRequest3].getTitle" with strength points "" and weekness points ""
      Then I should see request is "approve" with title "*global[deviceRequest3].getTitle" and state "IT Reviews" on tasks page

    Scenario: I can reject the request success
      When I reject request by title "*global[deviceRequest3].getTitle" with reason "test reason"
      Then I should see request is "reject" with title "*global[deviceRequest3].getTitle" and state "IT Reviews" on tasks page