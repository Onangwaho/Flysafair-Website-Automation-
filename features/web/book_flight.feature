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
        #Then clicks button "Continue"
        Then add the specified extras "<classType>","<Checked Luggage>", "<Baggage Protection>", "<Priority Boarding>", "<Extra Bag>", "<Special Luggage>", "<Snack>", "<Special Assistance>","<Bidvest Premier Lounge>", "<Carriage of Firearms>"


        Examples:
            | origin       | destination | depatureDate           | returnDate               | noAdults | noChild | infant | classType | email                      | paymentMethod | Checked Luggage | Baggage Protection | Priority Boarding | Extra Bag | Special Luggage | Snack | Bidvest Premier Lounge | Carriage of Firearms | Special Assistance |
            | Johannesburg | Cape Town   | Friday, 29 August 2025 | Saturday, 30 August 2025 | 1        | 0       | 0      | Standard  | tmahwasane@flysafair.co.za | ozow          | Y               | y                  |                   |           |                 |       |                        |                      | y                  |


