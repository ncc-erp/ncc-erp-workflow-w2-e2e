Feature: User create a new request

  @user
  Scenario Outline: As user, I want to create a new request success
    Given I am on "RequestTemplatePage"
    When I create a new "<request>" with data "*testData[<fn_data>]__global[<unique_key>]"
    And I am on "MyRequestPage"
    Then I should see "*global[<unique_key>].response.id" on my request page
    # title-format: I create a new <request> success

    Examples:
      | request                           | fn_data                                  | unique_key |
      | Device Request                    | random_device_request                    | d_r_1      |
      | Change Office Request             | random_change_office_request             | c_o_r_1    |
      | WFH Request                       | random_wfh_request                       | w_r_1      |
      | Office Equipment Request          | random_office_equipment_request          | oe_r_1     |
      | Probationary Confirmation Request | random_probationary_confirmation_request | pc_r_1     |

  @admin
  Rule: Manage request template

    Background:
      Given I am on "RequestTemplatePage"

    Scenario: I can create a new workflow success
      When I create a new workflow with name as "<name>" and display name as "<displayName>"
      Then I should see a record with name as "<name>", display name as "<displayName>", and "<publish>" publish status "displayed"

      Examples:
        | name                         | displayName                               | publish |
        | Advance Payment Request Test | Advance Payment Request Test Display Name | false   |

    Scenario: I can import a new workflow success
      When I import a "workflow" with file path as "<path>"
      Then I should see a record with name as "<name>", display name as "<displayName>", and "<publish>" publish status "displayed"

      Examples:
        | path                                            | name                                | displayName                                      | publish |
        | upload/advance-payment-request-test-import.json | Advance Payment Request Test Import | Advance Payment Request Test Import Display Name | false   |

    Scenario: I can export a workflow input success
      When I import a "workflow" with file path as "<path>"
      And I open Setting modal popup of workflow with display name as "<displayName>" and click on "Define Input" option
      And I click on "Export" button
      Then I should see a file with name as "<name>.json" downloaded successfully

      Examples:
        | name                                | displayName                                      | path                                            |
        | Advance Payment Request Test Import | Advance Payment Request Test Import Display Name | upload/advance-payment-request-test-import.json |

    Scenario: I can import a workflow input success
      When I create a new workflow with name as "<name>" and display name as "<displayName>"
      And I open Setting modal popup of workflow with display name as "<displayName>" and click on "Define Input" option
      And I import a "workflow input" with file path as "<path>"
      Then I should see "Import workflow data successfully!" toast message display
      And I should see the color as "<color>", title as "<title>" in "<name>" workflow Define Input popup
      And I should see the property display in Define Input popup
        | propertyName  | type     | required |
        | AmountOfMoney | Text     | true     |
        | Reason        | RichText | true     |
      And I open Action modal popup of workflow with display name as "<displayName>" to see the property display
        | label             |
        | Amount Of Money * |
        | Reason *          |

      Examples:
        | name              | displayName                    | title                                          | path                                           | color   |
        | Test Import Input | Test Import Input Display Name | Advance Payment Request: {{AmountOfMoney}} VNĐ | upload/advance-payment-request-test-input.json | #01713e |

    @mode:serial @admin
  Rule: Change workflow status

    Background:
      Given I am on "RequestTemplatePage"
      And Following test data
        | name         | displayName               |
        | Test Publish | Test Publish Display Name |

    Scenario: I can publish a workflow success
      When I create a new workflow with name as "<name>" and display name as "<displayName>"
      And I "Publish" a workflow with name as "<name>"
      Then I should see Published field of the "<name>" workflow as "true"

    Scenario: I can unpublish a workflow success
      When I "Unpublish" a workflow with name as "<name>"
      Then I should see Published field of the "<name>" workflow as "false"

    @mode:serial @admin
  Rule: Delete workflow function

    Background:
      Given I am on "RequestTemplatePage"
      And Following test data
        | name        | displayName              | publish |
        | Test Delete | Test Delete Display Name | false   |

    Scenario: I can cancel delete a workflow successfully
      When I create a new workflow with name as "<name>" and display name as "<displayName>"
      And I open Setting modal popup of workflow with display name as "<displayName>" and click on "Delete" option
      And I click on "Cancel" button
      Then I should see a record with name as "<name>", display name as "<displayName>", and "<publish>" publish status "displayed"

    Scenario: I can delete a workflow successfully
      When I open Setting modal popup of workflow with display name as "<displayName>" and click on "Delete" option
      And I click on "Yes" button
      Then I should see a record with name as "<name>", display name as "<displayName>", and "<publish>" publish status "not displayed"

    @admin
  Rule: Manage Request Template Input

    Background:
      Given I am on "RequestTemplatePage"

    Scenario: Verify Property Type list
      When I open Setting modal popup of workflow with display name as "<displayName>" and click on "Define Input" option
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
        | displayName             | property      |
        | Advance Payment Request | AmountOfMoney |

    Scenario: I can add property to workflow
      When I create a new workflow with name as "<name>" and display name as "<displayName>"
      And I input property with data below in Define Input popup of workflow with display name as "<displayName>"
        | row | name        | type     | required |
        | 1   | MoneyAmount | RichText | true     |
        | 2   | Reason      | RichText | false    |
        | 3   | TestInput   | RichText | true     |
      Then I open Action modal popup of workflow with display name as "<displayName>" to see the property display
        | label          |
        | Money Amount * |
        | Reason         |
        | Test Input *   |

      Examples:
        | name                               | displayName                                     |
        | Advance Payment Request Test Input | Advance Payment Request Test Input Display Name |
    # To do: @mode serial with add property scenario for avoid duplicate

    Scenario: I can edit a workflow property
      When I create a new workflow with name as "<name>" and display name as "<displayName>"
      And I input property with data below in Define Input popup of workflow with display name as "<displayName>"
        | row | name        | type     | required |
        | 1   | MoneyAmount | RichText | true     |
        | 2   | Reason      | RichText | false    |
        | 3   | TestInput   | RichText | true     |
      And I input property with data below in Define Input popup of workflow with display name as "<displayName>"
        | row | name          | type     | required |
        | 1   | AmountOfMoney | Text     | true     |
        | 2   | Reason        | Text     | true     |
        | 3   | TestInput     | RichText | true     |
      Then I open Action modal popup of workflow with display name as "<displayName>" to see the property display
        | label             |
        | Amount Of Money * |
        | Reason *          |
        | Test Input *      |

      Examples:
        | name                                    | displayName                                          |
        | Advance Payment Request Test Edit Input | Advance Payment Request Test Edit Input Display Name |

    Scenario: I cannot remove all property of a workflow
      When I create a new workflow with name as "<name>" and display name as "<displayName>"
      And I input property with data below in Define Input popup of workflow with display name as "<displayName>"
        | row | name        | type     | required |
        | 1   | MoneyAmount | RichText | true     |
        | 2   | Reason      | RichText | false    |
      And I open Define Input popup of "<name>" workflow to remove property
        | name        |
        | MoneyAmount |
      Then I should see the remaining Remove button as disabled status
      And I should see the property display in Define Input popup
        | propertyName | type     | required |
        | Reason       | RichText | false    |
      And I open Action modal popup of workflow with display name as "<displayName>" to see the property display
        | label  |
        | Reason |

      Examples:
        | name                 | displayName                       |
        | Test Remove Property | Test Remove Property Display Name |

    @cleanup
    Scenario: Delete data test
      When I am on "RequestTemplatePage"
      And I delete the workflow with name below
        | workflowName                                     |
        | Advance Payment Request Test                     |
        | Advance Payment Request Test Import              |
        | Advance Payment Request Test Import Display Name |
        | Test Import Input                                |
        | Test Publish                                     |
        | Advance Payment Request Test Input               |
        | Advance Payment Request Test Edit Input          |
        | Test Remove Property                             |





