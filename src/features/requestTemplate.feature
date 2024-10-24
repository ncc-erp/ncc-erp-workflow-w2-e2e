Feature: User create a new request
  # @user
  # Scenario Outline: As user, I want to create a new request success
  #   Given I am on "RequestTemplatePage"
  #   When I create a new "<request>" with data "*testData[<fn_data>]__global[<unique_key>]"
  #   And I am on "MyRequestPage"
  #   Then I should see "*global[<unique_key>].response.id" on my request page

  #   # title-format: I create a new <request> success
  #   Examples:
  #     | request               | fn_data                      | unique_key |
  #     | Device Request        | random_device_request        | d_r_1      |
  #     | Change Office Request | random_change_office_request | c_o_r_1    |
  #     | WFH Request           | random_wfh_request           | w_r_1      |

  Rule: Manage request template
    Background:
      Given I am on "LoginPage"
    @admin
    Scenario: I can create a new workflow success
      When I click on "Create" button
      And I fill "<name>" into "Name" field
      And I fill "<display name>" into "Display Name" field
      And I click on "Create" button
      And I click on the close icon in "Workflow Detail" popup
      Then I should see a new record with the data below "displayed"
        | name                                | displayName                         | publish |
        | Advance Payment Request test create | Advance Payment Request test create | false   |
      And I delete the record just created
        | name                                |
        | Advance Payment Request test create |
      Examples:
        | name                                | display name                        |
        | Advance Payment Request test create | Advance Payment Request test create |

  # Scenario: I can import a new workflow success
  #   When I click on "Import" button
  #   And I upload a file with path "D:\Advance Payment Request.json"
  #   And I click on "Import" button
  #   And I click on "Create" button
  #   Then I should see "Create Workflow Successfully" toast message display

  # Scenario: I can export a workflow input success
  #   When I open "Define Input" of "Advance Payment Request" workflow
  #   And I click on "Export" button
  #   Then I should see a file with name as "Advance Payment Request.json" downloaded successfully

  # Scenario: I can import a workflow input success
  #   When I open "Define Input" of "Advance Payment Request test create" workflow
  #   And I click on "Import" button
  #   And I upload a file with path "D:\Advance Payment Request.json"
  #   And I click on "Import" button
  #   Then I should see these Properties display
  #     | name | type | required |
  #     | ///  | ///  | ///      |

  # Scenario: I can publish a workflow success
  #   When I open Setting modal of "Advance Payment Request test create" workflow
  #   And I click on "Unpublish" option
  #   Then I should see "Published" field of the workflow as "true"

  # Scenario: I can unpublish a workflow success
  #   When I open Setting modal of "Advance Payment Request test create" workflow
  #   And I click on "Publish" option
  #   Then I should see "Published" field of the workflow as "false"

  # Scenario: I cam cancel delete a workflow success
  #   When I open Setting modal of "Advance Payment Request test create" workflow
  #   And I click on "Delete" option
  #   And I click on "Cancel" option
  #   Then I should see a record with the data below "displayed"
  #     | name | display name | publish |
  #     | ///  | ///          | true    |

  # Scenario: I can delete a workflow success
  #   When I open Setting modal of "Advance Payment Request test create" workflow
  #   And I click on "Delete" option
  #   And I click on "Yes"
  #   Then I should see a record with the data below "not displayed"
  #     | name | display name | publish |
  #     | ///  | ///          | true    |



