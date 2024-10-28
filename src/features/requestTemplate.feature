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
      When I click on "Create" button
      And I fill "<name>" into "Name" field
      And I fill "<name>" into "Display Name" field
      And I click on "Create" button
      # Then I should see "Create Workflow Successfully" toast message display
      And I click on the close icon in "Workflow Detail" popup
      Then I should see a record with name as "<name>", display name as "<name>" and "<publish>" publish status "displayed"

      Examples:
        | name                         | publish |
        | Advance Payment Request Test | false   |

    Scenario: I can import a new workflow success
      When I click on "Import" button
      And I upload a file with path "data-test/advance-payment-request-test-import.json"
      And I click on "Import" button
      And I click on "Create" button
      # Then I should see "Import workflow data successfully!" toast message display
      And I click on the close icon in "Workflow Detail" popup
      Then I should see a record with name as "<name>", display name as "< name>" and "<publish>" publish status "displayed"
      And I delete the record with name as "<name>"

      Examples:
        | name                                | publish |
        | Advance Payment Request Test Import | false   |

    Scenario: I can export a workflow input success
      When I open Setting modal of "<workflow>" workflow
      And I click on "Define Input" option
      And I click on "Export" button
      Then I should see a file with name as "Advance Payment Request.json" downloaded successfully

      Examples:
        | workflow                |
        | Advance Payment Request |

    Scenario: I can import a workflow input success
      When I open Setting modal of "<name>" workflow
      And I click on "Define Input" option
      And I click on "Import" button
      And I upload a file with path "data-test/advance-payment-request-test-input.json"
      And I click on "Import" button
      # Then I should see "Import workflow data successfully!" toast message display
      Then I should see the color as "#01713e", title as "<title>" and these Properties of "<name>" workflow display
        | propertyName  | type     | required |
        | AmountOfMoney | Text     | true     |
        | Reason        | RichText | true     |
      And I click on "Save" button

      Examples:
        | name                         | title                                          |
        | Advance Payment Request Test | Advance Payment Request: {{AmountOfMoney}} VNĐ |

    Scenario: I can publish a workflow success
      When I open Setting modal of "<name>" workflow
      And I click on "Publish" option
      Then I should see Published field of the "<name>" workflow as "true"

      Examples:
        | name                         |
        | Advance Payment Request Test |

    Scenario: I can unpublish a workflow success
      When I open Setting modal of "<name>" workflow
      And I click on "Unpublish" option
      Then I should see Published field of the "<name>" workflow as "false"

      Examples:
        | name                         |
        | Advance Payment Request Test |

    Scenario: I cam cancel delete a workflow success
      When I open Setting modal of "<name>" workflow
      And I click on "Delete" option
      And I click on "Cancel" button
      Then I should see a record with name as "<name>", display name as "<name>" and "<publish>" publish status "displayed"

      Examples:
        | name                         | publish |
        | Advance Payment Request Test | false   |

    Scenario: I can delete a workflow success
      When I open Setting modal of "<name>" workflow
      And I click on "Delete" option
      And I click on "Yes" button
      Then I should see a record with name as "<name>", display name as "<name>" and "<publish>" publish status "not displayed"
      Examples:
        | name                         | publish |
        | Advance Payment Request Test | false   |

    @admin
  Rule: Manage Request Template Input
    Background:
      Given I am on "RequestTemplatePage"

    Scenario: Verify Property Type list
      When I open Setting modal of "<workflow>" workflow
      And I click on "Define Input" option
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
        | workflow                | property      |
        | Advance Payment Request | AmountOfMoney |

  # Scenario: I can add property to new created workflow
  #   When I click on "Create" button
  #   And I fill "<workflow>" into "Name" field
  #   And I fill "<workflow>" into "Display Name" field
  #   And I click on "Create" button
  #   And I click on the close icon in "Workflow Detail" popup
  #   And I open Setting modal of "<workflow>" workflow
  #   And I click on "Define Input" option
  #   And I fill "<property>" into Property name textbox
  #   And I choose "RichText" from Property type dropdown
  #   And I click on Required checkbox of "<property>" property
  #   And I click on "Save" button
  #   And I open Action modal of "<workflow>" workflow
  #   Then I should see these property "displayed"
  #     | label        |
  #     | MoneyAmount* |

  #   Examples:
  #     | workflow                           | property    |
  #     | Advance Payment Request Test Input | MoneyAmount |

  # Scenario: I can add more property to a workflow
  #   When I open Setting modal of "<name>" workflow
  #   And I click on "Define Input" option
  #   And I click on "Add field" button
  #   And I fill "<name>" into "Property name" field
  #   And I fill "<type>" into "Property type" field
  #   And I click on "Save" button
  #   And I open Action modal of "<name>" workflow
  #   Then I should see these property "displayed"
  #     | label |
  #     | ///   |

  # Scenario: I can edit a workflow property
  #   When I open Setting modal of "<name>" workflow
  #   And I click on "Define Input" option
  #   And I change name of "<old name>" property to "<new name>" property
  #   And I click on Required checkbox of "<new name>" property
  #   And I click on "Save" button
  #   And I open Action modal of "<name>" workflow
  #   Then I should see these property "displayed"
  #     | label |
  #     | ///   |

  # Scenario: I cannot remove all property of a workflow
  #   When I open Setting modal of "<name>" workflow
  #   And I click on "Define Input" option
  #   And I click on "Remove" button of property "<name>"
  #   Then I should see property "<name>" "not displayed"
  #   And I should see "Remove" button of property "<name>" as "disabled" status
  #   And I click on "Remove" button of property "<name>"
  #   And I click on "Save" button
  #   And I open Action modal of "<name>" workflow
  #   And I should see these property "displayed"
  #     | label |
  #     | ///   |






