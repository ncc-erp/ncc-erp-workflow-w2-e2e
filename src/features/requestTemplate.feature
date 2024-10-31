Feature: User create a new request

  @user
  Scenario Outline: As user, I want to create a new request success
    Given I am on "RequestTemplatePage"
    When I create a new "<request>" with data "*testData[<fn_data>]__global[<unique_key>]"
    And I am on "MyRequestPage"
    Then I should see "*global[<unique_key>].response.id" on my request page
    # title-format: I create a new <request> success

    Examples:
      | request               | fn_data                      | unique_key |
      | Device Request        | random_device_request        | d_r_1      |
      | Change Office Request | random_change_office_request | c_o_r_1    |
      | WFH Request           | random_wfh_request           | w_r_1      |


  @admin
  Rule: Manage request template
    Background:
      Given I am on "RequestTemplatePage"

    Scenario: I can create a new workflow success
      When I create a new workflow with name as "<name>" and display name as "<displayName>"
      # Then I should see "Create Workflow Successfully" toast message display
      Then I should see a record with name as "<name>", display name as "<displayName>", and "<publish>" publish status "displayed"
      And I delete the record with name as "<name>"

      Examples:
        | name                         | displayName                               | publish |
        | Advance Payment Request Test | Advance Payment Request Test Display Name | false   |

    Scenario: I can import a new workflow success
      When I import a "workflow" with file path as "<path>"
      Then I should see a record with name as "<name>", display name as "<displayName>", and "<publish>" publish status "displayed"
      And I delete the record with name as "<name>"

      Examples:
        | path                                            | name                                | displayName                                      | publish |
        | upload/advance-payment-request-test-import.json | Advance Payment Request Test Import | Advance Payment Request Test Import Display Name | false   |

    Scenario: I can export a workflow input success
      When I import a "workflow" with file path as "<path>"
      And I open "Setting" modal popup of workflow with name as "<name>" and click on "Define Input" option
      And I click on "Export" button
      Then I should see a file with name as "<name>.json" downloaded successfully
      And I click on the close icon in popup with label as "Define Workflow Input"
      And I delete the record with name as "<name>"

      Examples:
        | name                                | path                                            |
        | Advance Payment Request Test Import | upload/advance-payment-request-test-import.json |

    Scenario: I can import a workflow input success
      When I create a new workflow with name as "<name>" and display name as "<displayName>"
      And I open "Setting" modal popup of workflow with name as "<name>" and click on "Define Input" option
      And I import a "workflow input" with file path as "<path>"
      # Then I should see "Import workflow data successfully!" toast message display
      Then I should see the color as "#01713e", title as "<title>" in "<name>" workflow Define Input popup
      And I should see the property display in Define Input popup
        | propertyName  | type     | required |
        | AmountOfMoney | Text     | true     |
        | Reason        | RichText | true     |
      And I click on "Save" button
      # will group 2 steps below
      And I open "Action" modal of workflow with name as "<name>"
      And I should see the property display in Action modal popup
        | label             |
        | Amount Of Money * |
        | Reason *          |
      And I click on the close icon in popup with label as "<displayName>"
      And I delete the record with name as "<name>"

      Examples:
        | name              | displayName                    | title                                          | path                                           |
        | Test Import Input | Test Import Input Display Name | Advance Payment Request: {{AmountOfMoney}} VNĐ | upload/advance-payment-request-test-input.json |

    Scenario: I can publish/unpulish a workflow success
      When I create a new workflow with name as "<name>" and display name as "<displayName>"
      And I "pushlish" a workflow with name as "<name>"
      Then I should see Published field of the "<name>" workflow as "true"
      And I "unpushlish" a workflow with name as "<name>"
      And I should see Published field of the "<name>" workflow as "false"
      And I delete the record with name as "<name>"
      Examples:
        | name         | displayName               |
        | Test Publish | Test Publish Display Name |

    Scenario: I can cancel delete/delete a workflow success
      When I create a new workflow with name as "<name>" and display name as "<displayName>"
      And I open "Setting" modal popup of workflow with name as "<name>" and click on "Delete" option
      And I click on "Cancel" button
      Then I should see a record with name as "<name>", display name as "<displayName>", and "<publish>" publish status "displayed"
      And I open "Setting" modal popup of workflow with name as "<name>" and click on "Delete" option
      And I click on "Yes" button
      And I should see a record with name as "<name>", display name as "<displayName>", and "<publish>" publish status "not displayed"

      Examples:
        | name        | displayName              | publish |
        | Test Delete | Test Delete Display Name | false   |

    @admin
  Rule: Manage Request Template Input
    Background:
      Given I am on "RequestTemplatePage"

    Scenario: Verify Property Type list
      When I open "Setting" modal popup of workflow with name as "<name>" and click on "Define Input" option
      And I click on Property Type dropdown list of property "<property>"
      Then I see options display below Property Type dropdown list of property "<property>"
        | Type          |
        | Text          |
        | Numeric       |
        | DateTime      |
        | RichText      |
        | UserList      |
        | MyProject     |
        | MyPMProject   |
        | OfficeList    |
        | MultiDatetime |

      Examples:
        | name                    | property      |
        | Advance Payment Request | AmountOfMoney |

  # should add wait for API response
  # Scenario: I can add property to workflow
  #   When I create a new workflow with name as "<name>" and display name as "<displayName>"
  #   # will group 3 steps below
  #   And I open "Setting" modal popup of workflow with name as "<name>" and click on "Define Input" option
  #   And I input property with data below
  #     | row | name        | type     | required |
  #     | 1   | MoneyAmount | RichText | true     |
  #     | 2   | Reason      | RichText | false    |
  #     | 3   | TestInput   | RichText | true     |
  #   And I click on "Save" button
  #   And I open "Action" modal of workflow with name as "<name>"
  #   Then I should see the property display in Action modal popup
  #     | label          |
  #     | Money Amount * |
  #     | Reason         |
  #     | Test Input *   |
  #   And I click on the close icon in popup with label as "<displayName>"
  #   And I delete the record with name as "<name>"

  #   Examples:
  #     | name                               | displayName                                     |
  #     | Advance Payment Request Test Input | Advance Payment Request Test Input Display Name |

  # Scenario: I can edit a workflow property
  #   When I create a new workflow with name as "<name>" and display name as "<displayName>"
  #   And I open "Setting" modal popup of workflow with name as "<name>" and click on "Define Input" option
  #   And I input property with data below
  #     | row | name        | type     | required |
  #     | 1   | MoneyAmount | RichText | true     |
  #     | 2   | Reason      | RichText | false    |
  #     | 3   | TestInput   | RichText | true     |
  #   And I click on "Save" button
  #   # should add wait for element to be visible
  #   And I open "Setting" modal popup of workflow with name as "<name>" and click on "Define Input" option
  #   And I input property with data below
  #     | row | name          | type     | required |
  #     | 1   | AmountOfMoney | Text     | true     |
  #     | 2   | Reason        | Text     | true     |
  #     | 3   | TestInput     | RichText | true     |
  #   And I click on "Save" button
  #   And I open "Action" modal of workflow with name as "<name>"
  #   Then I should see the property display in Action modal popup
  #     | label             |
  #     | Amount Of Money * |
  #     | Reason *          |
  #     | Test Input *      |

  #   Examples:
  #     | name                                    | displayName                                          |
  #     | Advance Payment Request Test Edit Input | Advance Payment Request Test Edit Input Display Name |

  # Scenario: I cannot remove all property of a workflow
  #   When I open "Setting" modal of workflow with name as "<name>"
  #   And I click on "Define Input" option
  #   And I click on Remove button of property
  #     | name          |
  #     | AmountOfMoney |
  #     | Reason        |
  #   # Then I should see Remove button of property "<property>" as "disabled" status
  #   And I click on Remove button of property
  #     | name      |
  #     | TestInput |
  #   And I should see the property display in Define Input popup
  #     | propertyName | type     | required |
  #     | TestInput    | RichText | true     |
  #   And I click on "Save" button
  #   And I open "Action" modal of "<workflow>" workflow
  #   And I should see the property display in Action modal popup
  #     | label      |
  #     | TestInput* |

  #   Examples:
  #     | workflow                           | property  |
  #     | Advance Payment Request Test Input | TestInput |