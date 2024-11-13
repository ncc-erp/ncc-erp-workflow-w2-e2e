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
      When I create a workflow with name as "<name>" and display name as "<displayName>"
      And I close popup with label as "<label>"
      Then I should see a record with name as "<name>", display name as "<displayName>", and "<publish>" publish status "displayed"

      Examples:
        | name            | displayName                  | publish | label           |
        | Test Create_e2e | Test Create Display Name_e2e | false   | Workflow Detail |

    Scenario: I can import a new workflow success
      When I import a workflow with file path as "<path>"
      And I close popup with label as "<label>"
      Then I should see a record with name as "<name>", display name as "<displayName>", and "<publish>" publish status "displayed"

      Examples:
        | path                        | name            | displayName                  | publish | label           |
        | upload/test-import-e2e.json | Test Import_e2e | Test Import Display Name_e2e | false   | Workflow Detail |

    Scenario: I can export a workflow input success
      When I import a workflow with file path as "<uploadPath>"
      And I close popup with label as "<label>"
      And I open Setting menu of workflow with name as "<name>"
      And I click on "Define Input" option in the menu item display
      And I click on Export button
      Then I should see a file with name as "<name>.json" downloaded successfully

      Examples:
        | name            | displayName                  | uploadPath                  | label           |
        | Test Export_e2e | Test Export Display Name_e2e | upload/test-export-e2e.json | Workflow Detail |

    Scenario: I can import a workflow input success
      When I create a workflow with name as "<name>" and display name as "<displayName>"
      And I close popup with label as "<label>"
      And I open Setting menu of workflow with name as "<name>"
      And I click on "Define Input" option in the menu item display
      And I import a workflow input with file path as "<path>"
      And I save the imported data with color as "<color>", title as "<title>" and below property in "<name>" workflow Define Input popup
        | propertyName  | type     | required |
        | AmountOfMoney | Text     | true     |
        | Reason        | RichText | true     |
      Then I open Action modal popup of workflow with name as "<name>" to see the property display
        | label             |
        | Amount Of Money * |
        | Reason *          |

      Examples:
        | name                  | displayName                        | title                                          | path                              | color   | label           |
        | Test Import Input_e2e | Test Import Input Display Name_e2e | Advance Payment Request: {{AmountOfMoney}} VNĐ | upload/test-import-input-e2e.json | #01713e | Workflow Detail |

  @mode:serial @admin
  Rule: Change workflow status

    Background:
      Given I am on "RequestTemplatePage"
      And Following test data
        | name             | displayName                   | label           |
        | Test Publish_e2e | Test Publish Display Name_e2e | Workflow Detail |

    Scenario: I can publish a workflow success
      When I create a workflow with name as "<name>" and display name as "<displayName>"
      And I close popup with label as "<label>"
      And I open Setting menu of workflow with name as "<name>"
      And I click on "Publish" option in the menu item to change workflow status
      Then I should see Published field of the "<name>" workflow as "true"
      And  I should see "<displayName>" workflow "displayed" in the Type dropdown on the page
        |page         |
        |MyRequestPage|
        |TaskPage     |

    Scenario: I can unpublish a workflow success
      When I open Setting menu of workflow with name as "<name>"
      And I click on "Unpublish" option in the menu item to change workflow status
      Then I should see Published field of the "<name>" workflow as "false"
      And I should see "<displayName>" workflow "not displayed" in the Type dropdown on the page
        |page         |
        |MyRequestPage|
        |TaskPage     |

    @mode:serial @admin
  Rule: Delete workflow function

    Background:
      Given I am on "RequestTemplatePage"
      And Following test data
        | name            | displayName                  | publish | label           |
        | Test Delete_e2e | Test Delete Display Name_e2e | false   | Workflow Detail |

    Scenario: I can cancel delete a workflow successfully
      When I create a workflow with name as "<name>" and display name as "<displayName>"
      And I close popup with label as "<label>"
      And I open Setting menu of workflow with name as "<name>"
      And I click on "Delete" option in the menu item display
      And I click on "Cancel" button
      Then I should see a record with name as "<name>", display name as "<displayName>", and "<publish>" publish status "displayed"

    Scenario: I can delete a workflow successfully
      When I open Setting menu of workflow with name as "<name>"
      And I click on "Delete" option in the menu item display
      And I click on Yes button to delete the workflow
      Then I should see a record with name as "<name>", display name as "<displayName>", and "<publish>" publish status "not displayed"

  @admin
  Rule: Manage Request Template Input

    Background:
      Given I am on "RequestTemplatePage"

    Scenario: Verify Property Type list
      When I open Setting menu of workflow with name as "<name>"
      And I click on "Define Input" option in the menu item display
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

    Scenario: I can add property to workflow
      When I create a workflow with name as "<name>" and display name as "<displayName>"
      And I close popup with label as "<label>"
      And I open Setting menu of workflow with name as "<name>"
      And I click on "Define Input" option in the menu item display
      And I input the property below to the workflow
        | row | name        | type     | required |
        |   1 | MoneyAmount | RichText | true     |
        |   2 | Reason      | RichText | false    |
        |   3 | TestInput   | RichText | true     |
      Then I open Action modal popup of workflow with name as "<name>" to see the property display
        | label          |
        | Money Amount * |
        | Reason         |
        | Test Input *   |

      Examples:
        | name               | displayName                     | label           |
        | Test Add Input_e2e | Test Add Input Display Name_e2e | Workflow Detail |

    Scenario: I can edit a workflow property
      When I create a workflow with name as "<name>" and display name as "<displayName>"
      And I close popup with label as "<label>"
      And I open Setting menu of workflow with name as "<name>"
      And I click on "Define Input" option in the menu item display
      And I input the property below to the workflow
        | row | name        | type     | required |
        |   1 | MoneyAmount | RichText | true     |
        |   2 | Reason      | RichText | false    |
        |   3 | TestInput   | RichText | true     |
      And I click on "Define Input" option in Setting menu of workflow with name as "<name>"
      And I input the property below to the workflow
        | row | name          | type     | required |
        |   1 | AmountOfMoney | Text     | true     |
        |   2 | Reason        | Text     | true     |
        |   3 | TestInput     | RichText | true     |
      Then I open Action modal popup of workflow with name as "<name>" to see the property display
        | label             |
        | Amount Of Money * |
        | Reason *          |
        | Test Input *      |

      Examples:
        | name                | displayName                      | label           |
        | Test Edit Input_e2e | Test Edit Input Display Name_e2e | Workflow Detail |

    Scenario: I cannot remove all property of a workflow
      When I create a workflow with name as "<name>" and display name as "<displayName>"
      And I close popup with label as "<label>"
      And I open Setting menu of workflow with name as "<name>"
      And I click on "Define Input" option in the menu item display
      And I input the property below to the workflow
        | row | name        | type     | required |
        |   1 | MoneyAmount | RichText | true     |
        |   2 | Reason      | RichText | false    |
      And I open Define Input popup of "<name>" workflow to remove property
        | name        |
        | MoneyAmount |
      Then I open Action modal popup of workflow with name as "<name>" to see the property display
        | label  |
        | Reason |

      Examples:
        | name                     | displayName                           | label           |
        | Test Remove Property_e2e | Test Remove Property Display Name_e2e | Workflow Detail |

  @cleanup @admin
  Rule: Clean up data

    Scenario Outline: Scenario Outline name: Delete data test
      When I am on "RequestTemplatePage"
      And I delete the workflow with name as "<workflowName>"

      Examples:
        | workflowName             |
        | Test Create_e2e          |
        | Test Import_e2e          |
        | Test Export_e2e          |
        | Test Import Input_e2e    |
        | Test Publish_e2e         |
        | Test Delete_e2e          |
        | Test Add Input_e2e       |
        | Test Edit Input_e2e      |
        | Test Remove Property_e2e |
