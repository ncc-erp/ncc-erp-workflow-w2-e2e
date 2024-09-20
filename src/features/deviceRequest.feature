Feature: Device Request
  @pm
  Rule: As pm, I want to received a Device Request from my project
    Background:
      Given User create "Device Request" with "__testData[random_device_request]__global-deviceRequest2" success
      And I am on "TaskPage"

    Scenario: I see the request with pending status on my tasks
      Then I should see request is "pennding" with title "__globalData[deviceRequest2].getTitle" and state "PM Reviews" on tasks page

    Scenario: I can approve the request success
      When I approve request by title "__globalData[deviceRequest2].getTitle"
      Then I should see request is "approve" with title "__globalData[deviceRequest2].getTitle" and state "PM Reviews" on tasks page

    Scenario: I can reject the request success
      When I reject request by title "__globalData[deviceRequest2].getTitle" with reason "test reason"
      Then I should see request is "reject" with title "__globalData[deviceRequest2].getTitle" and state "PM Reviews" on tasks page

    @it
  Rule: As IT, I want to received a Device Request after PM approved
    Background:
      Given User create "Device Request" with "__testData[random_device_request]__global-deviceRequest3" success
      And "PM" approve the request "__globalData[deviceRequest3].getTitle" success
      And I am on "TaskPage"

    Scenario: I see the request with pending status on my tasks
      Then I should see request is "pennding" with title "__globalData[deviceRequest3].getTitle" and state "IT Reviews" on tasks page

    Scenario: I can approve the request success
      When I approve request by title "__globalData[deviceRequest3].getTitle"
      Then I should see request is "approve" with title "__globalData[deviceRequest3].getTitle" and state "IT Reviews" on tasks page

    Scenario: I can reject the request success
      When I reject request by title "__globalData[deviceRequest3].getTitle" with reason "test reason"
      Then I should see request is "reject" with title "__globalData[deviceRequest3].getTitle" and state "IT Reviews" on tasks page