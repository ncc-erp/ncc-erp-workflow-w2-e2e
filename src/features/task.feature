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
      And Following test data
        | option                  |
        | Advance Payment Request |
      And I click on "Only my task" button
      And I click on Type dropdown
      And I click on "<option>" from the Type dropdown

    Scenario: I can filter in Board view success
      And I am at Board view mode
      Then I should see all request with tag as "<option>" display

    Scenario: I can filter in List Task view success
      And I am at List Task view mode
      Then I should see all request with tag as "<option>" display

  @admin
  Rule: As admin, I want to manage Status filter success

    Background:
      Given I am on "TaskPage"
      And I click on Status dropdown

    Scenario: Verify Status dropdown options
      Then I should see these option below Status dropdown
        | option     |
        | All status |
        | Pending    |
        | Approved   |
        | Rejected   |

    Scenario Outline: I can filter by status success
      And I click on "<option>" from the Status dropdown
      And I am at Board view mode
      Then I should see all request with status as "<option>" display in Task page

      Examples:
        | option   |
        | Pending  |
        | Approved |
        | Rejected |

  @admin
  Rule: As admin, I want to manage Time filter success

    Background:
      Given I am on "TaskPage"
      And I click on Time dropdown

    Scenario: Verify Time dropdown options
      Then I should see these option below Time dropdown
        | option   |
        | All date |
        |   1 week |
        |  1 month |
        | 3 months |
