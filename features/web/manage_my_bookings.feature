@runalltests
Feature: MANAGE MY BOOKINGS

    Background:
        Given user is at home page
    @flyo
    Scenario Outline:manage my booking scenarios
        Given user clicks my bookigs
        Then clicks button a button "Manage"
        Examples:
            | PNR    | lastName   |
            | 3EAQPS | Automation |

