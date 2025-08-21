@runalltests
Feature: FLYSAFAIR FLIGHT BOOKINGS

    Background:
        Given user is at home page
    @fly
    Scenario Outline: book a flight
        Given user select trip type "One-way"
        When the users enters the details "<origin>", "<destination>", "<depatureDate>","<returnDate>", "<noAdults>", "<noChild>", "<infant>", "<classType>", "<email>", "One-way"
        Then click button "Lets Go"
        When user select ticket prices and class type "<classType>"
        Then clicks button "Continue"
        When capture passangers details "<noAdults>", "<noChild>", "<infant>"
        Then clicks button "Continue"
        Then clicks button "Continue"
        Then clicks button "Continue"
        # Then clicks button "Continue"
        Then customer clicks "NO CAR, THANKS"
        When customer selects travel protection "No"
        When customer select payment method "<paymentMethod>" and pay
        # Then payment is confirmed and booking is succesfull
        Examples:
            | origin       | destination | depatureDate           | returnDate             | noAdults | noChild | infant | classType | email                      | paymentMethod |
            | Johannesburg | Cape Town   | Friday, 22 August 2025 | Friday, 22 August 2025 | 1        | 0       | 0      | Lite      | tmahwasane@flysafair.co.za | ozow          |

    @infant
    Scenario Outline: Verify user is unable to add infants that are more than number of adults
        Given user select trip type "One-way"
        When the users enters the details "<origin>", "<destination>", "<depatureDate>","<returnDate>", "<noAdults>", "<noChild>", "<infant>", "<classType>", "<email>", "One-way"
        When a user select number of infants and adults "<noAdults>", "<infant>"
        Then click button "Lets Go"
        Then Verify if user is unable to add infants that are more than number of adults "<noAdults>", "<infant>"
        Examples:
            | origin       | destination | depatureDate             | returnDate             | noAdults | noChild | infant | classType | email                      | paymentMethod |
            | Johannesburg | Cape Town   | Thursday, 21 August 2025 | Friday, 22 August 2025 | 1        | 0       | 3      | Lite      | tmahwasane@flysafair.co.za | ozow          |
