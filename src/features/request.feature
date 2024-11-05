Feature: Request
# Admin Filter
# Admin Cancel
  @admin
  Rule: As Admin, I want to see a Request from my requests

    Background:
      Given User create "Device Request" with "*testData[random_device_request]__global[deviceRequest2]" success
      And I am on "MyRequestPage"
    
    Scenario: I should see the request with pending status on my requests
      Then I should see "*global[deviceRequest2].response.id" with status "Pending" on all requests page

    Scenario: I can cancel the request success
      When Admin cancel request with id "*global[deviceRequest2].response.id" 
      Then I should see "*global[deviceRequest2].response.id" with status "Canceled" on all requests page
# User Filter
# User Cancel
  @user
  Rule: As User, I want to see a Request from my requests

    Background:
      Given User create "Device Request" with "*testData[random_device_request]__global[deviceRequest2]" success
      And I am on "MyRequestPage"

    Scenario: I should see the request with pending status on my requests
      Then I should see "*global[deviceRequest2].response.id" with status "Pending" on my request page

    Scenario: I can cancel the request success
      When I cancel request with id "*global[deviceRequest2].response.id"
      Then I should see "*global[deviceRequest2].response.id" with status "Canceled" on my request page

  @user
  Rule: As User, I want to see a Request from my requests

    Background:
      Given User create "Device Request" with "*testData[random_device_request]__global[deviceRequest2]" success
      And I am on "MyRequestPage"

    Scenario: I should see the request with pending status
      Then I should see "*global[deviceRequest2].response.id" with status "Pending" on my request page

    Scenario:  I should see the request with canceled status when Admin cancel
      When Admin cancel request with id "*global[deviceRequest2].response.id"
      Then I should see "*global[deviceRequest2].response.id" with status "Canceled" on my request page
