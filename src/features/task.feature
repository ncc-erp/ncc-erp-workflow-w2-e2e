# Feature: WFH Request
#   @pm
#   Rule: As pm, I want to use drag/drop function for approve/reject tasks
#     Background:
#       Given User create "WFH Request" with "*testData[random_wfh_request]__global[wfhRequest2]" success
#       And I am on "TaskPage"
#     Scenario: I can approve by drag/drop the request success
#       When I approve request by drag with id "*global[wfhRequest2].response.id"
#       Then I should see request is "approve" with id "*global[wfhRequest2].response.id" and state "PM Reviews" on tasks page
#     Scenario: I can reject by drag/drop the request success
#       When I reject request by drag with id "*global[wfhRequest2].response.id" and reason "test reason"
#       Then I should see request is "reject" with id "*global[wfhRequest2].response.id" and state "PM Reviews" on tasks page
Feature: Task

  @admin
  Rule: As admin, I want to manage Type filter success

    Background:
      Given I am on "TaskPage"
      And I click on Type dropdown

    Scenario: Verify Type dropdown options
      Then I should see these option below Type dropdown
        | option                            |
        | All types                         |
        | Advance Payment Request           |
        | Change Office Request             |
        | Device Request                    |
        | Office Equipment Request          |
        | Probationary Confirmation Request |
        | Resignation Request               |
        | Unlock Timesheet Request          |
        | WFH Request                       |

    Scenario Outline: I can filter by Workflow Type success
      And I click on "<option>" from the Type dropdown
      And I click on "Only my task" button
      Then I should see all request with tag as "<option>" display

      Examples:
        | option                            |
        | Advance Payment Request           |
        | Change Office Request             |
        | Device Request                    |
        | Office Equipment Request          |
        | Probationary Confirmation Request |
        | Resignation Request               |
        | Unlock Timesheet Request          |
        | WFH Request                       |
