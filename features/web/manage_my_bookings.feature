@Manage @runalltests
Feature: MANAGE MY BOOKINGS

    Background:
        Given user is at home page
    Scenario Outline:Search for an existing booking
        Given user clicks my bookigs
        When user enter "<PNR>" and "<LastName>"
        Then clicks button a button "Manage"
        Then existing booking is found succesfully
        Examples:
            | PNR    | LastName   |
            | 3EAQPS | Automation |

# Scenario Outline:Search for an existing booking
#     Given user clicks my bookigs
#     When user enter "<PNR>" and "<LastName>"
#     Then clicks button a button "Manage"
#     Examples:
#         | PNR    | LastName   |
#         | 3EAQPS | Automation |


