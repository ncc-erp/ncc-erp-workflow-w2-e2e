Feature: Device Request
  @pm
  Rule: As pm, I want to received a WFH Request from my project
    Background:
      Given User create "WFH Request" with "__testData[random_wfh_request]__global-wfhRequest2" success
      And I am on "TaskPage"

    Scenario: I see the request with pending status on my tasks
      Then I should see request is "pennding" with title "__globalData[wfhRequest2].getTitle" and state "PM Reviews" on tasks page

    Scenario: I can approve the request success
      When I approve request by title "__globalData[wfhRequest2].getTitle"
      Then I should see request is "approve" with title "__globalData[wfhRequest2].getTitle" and state "PM Reviews" on tasks page

    Scenario: I can reject the request success
      When I reject request by title "__globalData[wfhRequest2].getTitle" with reason "test reason"
      Then I should see request is "reject" with title "__globalData[wfhRequest2].getTitle" and state "PM Reviews" on tasks page

    @gdvpdn
  Rule: As IT, I want to received a WFH Request after PM approved
    Background:
      Given User create "WFH Request" with "__testData[random_wfh_request]__global-wfhRequest3" success
      And "PM" approve the request "__globalData[wfhRequest3].getTitle" success
      And I am on "TaskPage"

    Scenario: I see the request with pending status on my tasks
      Then I should see request is "pennding" with title "__globalData[wfhRequest3].getTitle" and state "Branch Manager Reviews" on tasks page

    Scenario: I can approve the request success
      When I approve request by title "__globalData[wfhRequest3].getTitle"
      Then I should see request is "approve" with title "__globalData[wfhRequest3].getTitle" and state "Branch Manager Reviews" on tasks page

    Scenario: I can reject the request success
      When I reject request by title "__globalData[wfhRequest3].getTitle" with reason "test reason"
      Then I should see request is "reject" with title "__globalData[wfhRequest3].getTitle" and state "Branch Manager Reviews" on tasks page

    @user
  Rule: As user, I want to see a WFH after PM, GDVP approved
    Background:
      Given User create "Change Office Request" with "__testData[random_change_office_request]__global-wfhRequest4" success
      And "PM" approve the request "__globalData[wfhRequest4].getTitle" success
      And "GDVPDN" approve the request "__globalData[wfhRequest4].getTitle" success

    Scenario: I should see the request with approved status on my requests
      When I am on "MyRequestPage"
      Then I should see "__globalData[wfhRequest4].getTitle" with status "Approved" on my request page