Feature: User create a new request
  @user
  Scenario Outline: As user, I want to create a new request success
    Given I am on "RequestTemplatePage"
    When I create a new "<request>" with data "*testData[<fn_data>]__global[<unique_key>]"
    And I am on "MyRequestPage"
    Then I should see "*global[<unique_key>].getTitle" on my request page

    # title-format: I create a new <request> success
    Examples:
      | request               | fn_data                      | unique_key |
      | Device Request        | random_device_request        | d_r_1      |
      | Change Office Request | random_change_office_request | c_o_r_1    |
      | WFH Request           | random_wfh_request           | w_r_1      |