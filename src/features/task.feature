Feature: Task

  @pm
  Rule: As pm, I want to use drag/drop function for approve/reject tasks
    Background:
      Given User create "WFH Request" with "*testData[random_wfh_request]__global[wfhRequest2]" success
      And I am on "TaskPage"

    Scenario: I can approve by drag/drop the request success
      When I approve request by drag with id "*global[wfhRequest2].response.id"
      Then I should see request is "approve" with id "*global[wfhRequest2].response.id" and state "PM Reviews" on tasks page

    Scenario: I can reject by drag/drop the request success
      When I reject request by drag with id "*global[wfhRequest2].response.id" and reason "test reason"
      Then I should see request is "reject" with id "*global[wfhRequest2].response.id" and state "PM Reviews" on tasks page

  @pm
  Rule: As pm, I want to use table mode for approve/reject tasks
    Background:
      Given User create "WFH Request" with "*testData[random_wfh_request]__global[wfhRequest3]" success
      And I am on "TaskPage"

    Scenario: I can approve the request success
      When I approve request in table mode with id "*global[wfhRequest3].response.id"
      Then I should see "*global[wfhRequest3].response.id" with status "Approved" on tasks page table mode

    Scenario: I can reject request success
      When I reject request in table mode with id "*global[wfhRequest3].response.id" and reason "test reason"
      Then I should see "*global[wfhRequest3].response.id" with status "Rejected" on tasks page table mode