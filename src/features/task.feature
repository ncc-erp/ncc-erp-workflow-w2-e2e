<<<<<<< HEAD
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
      And I click on "Only my task" button

    Scenario: I can filter in Board view success
      When I am at Board view mode
      And I click on "<option>" from the Type dropdown
      Then I should see all request with tag as "<option>" display

      Examples:
        | option         |
        | Device Request |

    Scenario: I can filter in List Task view success
      When I am at List Task view mode
      And I click on "<option>" from the Type dropdown
      Then I should see all request with tag as "<option>" display

      Examples:
        | option         |
        | Device Request |

  @admin
  Rule: As admin, I want to manage Status filter success

    Background:
      Given I am on "TaskPage"
      And I click on "Only my task" button

    Scenario: Verify Status dropdown options
      When I click on Status dropdown
      Then I should see these option below Status dropdown
        | option     |
        | All status |
        | Pending    |
        | Approved   |
        | Rejected   |

    Scenario: I can filter in Board view success
      When I am at Board view mode
      And I click on "<option>" from the Status dropdown
      Then I should see only request in "<option>" column display

      Examples:
        | option   |
        | Approved |

    Scenario: I can filter in List Task view success
      When I am at List Task view mode
      And I click on "<option>" from the Status dropdown
      Then I should see all request with status as "<option>" display in table

      Examples:
        | option   |
        | Approved |

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
=======
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
>>>>>>> e5aa76de3bd59e91d75ff8d5995e5c97cf6d1567
