@register @fly
Feature: FLYSAFAIR FLIGHT BOOKINGS

    Background:
        Given user is at home page
    @regression
    @sanity @uat
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
            | origin       | destination | depatureDate             | returnDate                | noAdults | noChild | infant | classType | email                      | paymentMethod |
            | Johannesburg | Cape Town   | Thursday, 21 August 2025 | Wednesday, 20 August 2025 | 1        | 0       | 0      | Lite      | tmahwasane@flysafair.co.za | ozow          |
            | Johannesburg | Cape Town   | Thursday, 22August 2025  | Wednesday, 20 August 2025 | 3        | 0       | 0      | Lite      | tmahwasane@flysafair.co.za | ozow          |
            | Johannesburg | Cape Town   | Thursday, 23 August 2025 | Wednesday, 20 August 2025 | 2        | 0       | 0      | Lite      | tmahwasane@flysafair.co.za | ozow          |
