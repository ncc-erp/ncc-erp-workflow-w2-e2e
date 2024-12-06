Feature: Change Office Request

  @pm
  Rule: As pm, I want to received a Change Office Request from my project

    Background:
      Given User create "Change Office Request" with "*testData.random_change_office_request__global[co1]" success
      And I am on "TaskPage"

    Scenario: I should see the request with pending status on my tasks
      Then I should see request is "pending" with id "*global[co1].response.id" and state "PM Reviews" on tasks page
      And I should see an email send to "*testData.users.pm.username" with subject "*global[co1].getNotificationSubject"
      And I should see a komu notification sent to "*testData.users.pm.username" with message "*global[co1].getKomuMessage"

    Scenario: I can approve the request success
      When I approve request with id "*global[co1].response.id"
      Then I should see request is "approve" with id "*global[co1].response.id" and state "PM Reviews" on tasks page

    Scenario: I can reject the request success
      When I reject request with id "*global[co1].response.id" with reason "test reason"
      Then I should see request is "reject" with id "*global[co1].response.id" and state "PM Reviews" on tasks page

  @gdvpdn
  Rule: As gdvp, I want to received a Change Office Request from my office

    Background:
      Given User create "Change Office Request" with "*testData[random_change_office_request]__global[co2]" success
      And I am on "TaskPage"

    Scenario: I should see the request with pending status on my tasks
      Then I should see request is "pending" with id "*global[co2].response.id" and state "Current HoO Reviews" on tasks page
      And I should see an email send to "*testData.users.gdvpdn.username" with subject "*global[co2].getNotificationSubject"
      And I should see a komu notification sent to "*testData.users.gdvpdn.username" with message "*global[co2].getKomuMessage"

    Scenario: I can approve the request success
      When I approve request with id "*global[co2].response.id"
      Then I should see request is "approve" with id "*global[co2].response.id" and state "Current HoO Reviews" on tasks page

    Scenario: I can reject the request success
      When I reject request with id "*global[co2].response.id" with reason "test reason"
      Then I should see request is "reject" with id "*global[co2].response.id" and state "Current HoO Reviews" on tasks page

  @gdvpv
  Rule: As gdvp, I want to received a Change Office Request if anyone come to my office

    Background:
      Given User create "Change Office Request" with "*testData[random_change_office_request]__global[co3]" success
      And I am on "TaskPage"

    Scenario: I should see the request with pending status on my tasks
      Then I should see request is "pending" with id "*global[co3].response.id" and state "Destination HoO Reviews" on tasks page
      And I should see an email send to "*testData.users.gdvpv.username" with subject "*global[co3].getNotificationSubject"
      And I should see a komu notification sent to "*testData.users.gdvpv.username" with message "*global[co3].getKomuMessage"

    Scenario: I can approve the request success
      When I approve request with id "*global[co3].response.id"
      Then I should see request is "approve" with id "*global[co3].response.id" and state "Destination HoO Reviews" on tasks page

    Scenario: I can reject the request success
      When I reject request with id "*global[co3].response.id" with reason "test reason"
      Then I should see request is "reject" with id "*global[co3].response.id" and state "Destination HoO Reviews" on tasks page

  @user
  Rule: As user, I want to see a Change Office Request after PM, GDVP1, GDVP2 approved

    Background:
      Given User create "Change Office Request" with "*testData[random_change_office_request]__global[co4]" success
      And "PM" approve the request "*global[co4].response.id", current state "PM Reviews" success
      And "GDVPDN" approve the request "*global[co4].response.id", current state "Current HoO Reviews" success
      And "GDVPV" approve the request "*global[co4].response.id", current state "Destination HoO Reviews" success

    Scenario: I should see the request with approved status on my requests
      When I am on "MyRequestPage"
      Then I should see "*global[co4].response.id" with status "Approved" on my request page
      And I should see an email send to "*testData.users.user.username" with subject "*global[co4].getApprovedSubject"
      And I should see a komu notification sent to "*testData.users.user.username" with message "*global[co4].getApprovedKomuMessage"

  @user
  Rule: As user, I want to see a Change Office Request is rejected

    Scenario Outline: I should see the request with rejected status when <userType> rejected
      Given User create "Change Office Request" with "*testData[random_change_office_request]__global[<key>]" success
      When "<userType>" reject the request "*global[<key>].response.id", current state "<state>" success with reason "<reason>"
      And I am on "MyRequestPage"
      Then I should see "*global[<key>].response.id" with status "Rejected" on my request page
      And I should see an email send to "*testData.users.user.username" with subject "*global[<key>].getRejectedSubject"
      And I should see a komu notification sent to "*testData.users.user.username" with message "*global[<key>].getRejectedKomuMessage"
      # title-format: As user, I want to see a Change Office Request is rejected > I should see the request with rejected status when <userType> rejected

      Examples:
        | userType | state                   | reason        | key  |
        | PM       | PM Reviews              | reason test 1 | key1 |
        | GDVPDN   | Current HoO Reviews     | reason test 2 | key2 |
        | GDVPV    | Destination HoO Reviews | reason test 3 | key3 |
