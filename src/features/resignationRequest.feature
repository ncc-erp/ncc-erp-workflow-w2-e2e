Feature: Resignation Request

  @pm
  Rule: As pm, I want to received a Resignation Request from my project

    Background:
      Given User create "Resignation Request" with "*testData.random_resignation_request__global[co1]" success
      And I am on "TaskPage"

    Scenario: I should see the request with pending status on my tasks
      Then I should see request is "pending" with id "*global[co1].response.id" and state "PM Reviews" on tasks page
      And I should see an email send to "*testData.users.pm.username" with subject "*global[co1].getNotificationSubject"

    Scenario: I can approve the request success
      When I approve request with id "*global[co1].response.id" with note "test reason"
      Then I should see request is "approve" with id "*global[co1].response.id" and state "PM Reviews" on tasks page

    Scenario: I can reject the request success
      When I reject request with id "*global[co1].response.id" with reason "test reason"
      Then I should see request is "reject" with id "*global[co1].response.id" and state "PM Reviews" on tasks page

  @hpm
  Rule: As hpm, I want to received a Resignation Request from my project

    Background:
      Given User create "Resignation Request" with "*testData.random_resignation_request__global[co1]" success
      And I am on "TaskPage"

    Scenario: I should see the request with pending status on my tasks
      Then I should see request is "pending" with id "*global[co1].response.id" and state "HPM Reviews" on tasks page
      And I should see an email send to "*testData.users.hpm.username" with subject "*global[co1].getNotificationSubject"

    Scenario: I can approve the request success
      When I approve request with id "*global[co1].response.id" with note "test reason"
      Then I should see request is "approve" with id "*global[co1].response.id" and state "HPM Reviews" on tasks page

    Scenario: I can reject the request success
      When I reject request with id "*global[co1].response.id" with reason "test reason"
      Then I should see request is "reject" with id "*global[co1].response.id" and state "HPM Reviews" on tasks page

  @hr
  Rule: As hr, I want to received a Resignation Request from my project

    Background:
      Given User create "Resignation Request" with "*testData.random_resignation_request__global[co1]" success
      And I am on "TaskPage"

    Scenario: I should see the request with pending status on my tasks
      Then I should see request is "pending" with id "*global[co1].response.id" and state "HR Reviews" on tasks page
      And I should see an email send to "*testData.users.hr.username" with subject "*global[co1].getNotificationSubject"

    Scenario: I can approve the request success
      When I approve request with id "*global[co1].response.id" with note "test reason"
      Then I should see request is "approve" with id "*global[co1].response.id" and state "HR Reviews" on tasks page

    Scenario: I can reject the request success
      When I reject request with id "*global[co1].response.id" with reason "test reason"
      Then I should see request is "reject" with id "*global[co1].response.id" and state "HR Reviews" on tasks page
