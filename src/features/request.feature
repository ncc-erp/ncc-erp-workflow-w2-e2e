Feature: Request
# Admin Filter

  @admin
  Rule: As Admin, I want to manage Type filter success

    Background:
      Given I am on "MyRequestPage"
      And I click on "Only my request" button
      And I click on Type dropdown

    Scenario: I can filter by Workflow Type success
      And I click on "<option>" from the Type dropdown
      Then I should see all request with tag as "<option>" display

      Examples:
        | option         |
        | Device Request |

  @admin
  Rule: As Admin, I want to manage Status filter success

    Background:
      Given I am on "MyRequestPage"
      And I click on "Only my request" button
      And I click on Status dropdown

    Scenario: Verify Status dropdown options
      Then I should see these option below Status dropdown
        | option     |
        | All status |
        | Approved   |
        | Rejected   |
        | Pending    |
        | Canceled   |

    Scenario Outline: I can filter by status success
      And I click on "<option>" option from the Status dropdown
      Then I should see all request with status as "<option>" display in Request page

      Examples:
        | option   |
        | Approved |
        | Rejected |
        | Pending  |
        | Canceled |
# Admin Cancel

  @admin
  Rule: As Admin, I should not see 'Cancel' option for requests that are not in the 'Pending' status

    Background:
      Given I am on "MyRequestPage"
      And I click on "Only my request" button

    Scenario: I should not see Cancel option for requests in Approved status
      When I click on "Approved" option from the Status dropdown
      And I open Action menu of a request
      Then I should not see Cancel option displayed in the popup

    Scenario: I should not see Cancel option for requests in Rejected status
      When I click on "Rejected" option from the Status dropdown
      And I open Action menu of a request
      Then I should not see Cancel option displayed in the popup

  @admin
  Rule: As Admin, I want to received a Request from my requests

    Background:
      Given User create "Device Request" with "*testData[random_device_request]__global[dr1]" success
      And I am on "MyRequestPage"

    Scenario: I should see the request with pending status on all requests
      Then I should see "*global[dr1].response.id" with status "Pending" on all requests page

    Scenario: I can cancel the request success
      When "Admin" cancel request with id "*global[dr1].response.id"
      Then I should see "*global[dr1].response.id" with status "Canceled" on all requests page
      And "User" should see "*global[dr1].response.id" with status "Canceled" on my request page

  @user
  Rule: As User, I do not have "Only my request" button on My request page

    Scenario: I should not see "Only my request" button on My request page
      Given I am on "MyRequestPage"
      Then I should not see "Only my request" button on My request page
# User Cancel

  @user
  Rule: As User, I want to see a Request from my requests

    Background:
      Given User create "Device Request" with "*testData[random_device_request]__global[dr2]" success
      And I am on "MyRequestPage"

    Scenario: I should see the request with pending status on my requests
      Then I should see "*global[dr2].response.id" with status "Pending" on my request page

    Scenario: I can cancel the request success
      When I cancel request with id "*global[dr2].response.id"
      Then I should see "*global[dr2].response.id" with status "Canceled" on my request page

  @user
  Rule: As User, I should not see 'Cancel' option for requests that are not in the 'Pending' status

    Background:
      Given I am on "MyRequestPage"

    Scenario: I should not see Cancel option for requests in Approved status
      When I click on "Approved" option from the Status dropdown
      And I open Action menu of a request
      Then I should not see Cancel option displayed in the popup

    Scenario: I should not see Cancel option for requests in Rejected status
      When I click on "Rejected" option from the Status dropdown
      And I open Action menu of a request
      Then I should not see Cancel option displayed in the popup
