@runalltests
Feature: FLYSAFAIR FLIGHT BOOKINGS

    Background:
        Given user is at home page
    @flyo
    Scenario Outline: book a flight one way trip with 2 adults, 1 child, 1 infant
        Given user select trip type "<tripType>"
        When the users enters the details "<origin>", "<destination>", "<depatureDate>","<returnDate>", "<noAdults>", "<noChild>", "<infant>", "<classType>", "<email>", "One-way"
        Then clicks button a button "Let's go"
        When user select ticket prices and class type "<classType>", "<tripType>"
        Then clicks button a button "Continue"
        When capture passangers details "<noAdults>", "<noChild>", "<infant>"
        Then clicks button a button "Continue"
        Then clicks button a button "Continue"
        Then clicks button a button "Skip Seat"
        Then customer clicks "NO CAR, THANKS"
        When customer selects travel protection "No"
        When customer select payment method "<paymentMethod>" and pay
        Then booking reference is created and payment is confirmed booking is succesfull
        Examples:
            | tripType | origin       | destination | depatureDate           | returnDate             | noAdults | noChild | infant | classType | email                       | paymentMethod |
            | One-way  | Johannesburg | Cape Town   | Friday, 29 August 2025 | Friday, 22 August 2025 | 2        | 1       | 1      | Lite      | tmahwasaner@flysafair.co.za | ozow          |

    @fly @Add
    Scenario Outline: book a flight Two way trip with 2 adults
        Given user select trip type "<tripType>"
        When the users enters the details "<origin>", "<destination>", "<depatureDate>","<returnDate>", "<noAdults>", "<noChild>", "<infant>", "<classType>", "<email>", "Round-trip"
        Then clicks button a button "Let's go"
        When user select ticket prices and class type "<classType>", "<tripType>"
        Then clicks button a button "Continue"
        When capture passangers details "<noAdults>", "<noChild>", "<infant>"
        Then clicks button a button "Continue"
        Then clicks button a button "Continue"
        Then clicks button a button "Skip Seat"
        Then customer clicks "NO CAR, THANKS"
        When customer selects travel protection "No"
        When customer select payment method "<paymentMethod>" and pay
        Then booking reference is created and payment is confirmed booking is succesfull
        Examples:
            | tripType   | origin       | destination | depatureDate           | returnDate               | noAdults | noChild | infant | classType | email                       | paymentMethod |
            | Round-trip | Johannesburg | Cape Town   | Friday, 29 August 2025 | Saturday, 30 August 2025 | 2        | 0       | 0      | Lite      | tmahwasaner@flysafair.co.za | ozow          |

    @infant @Add
    Scenario Outline: Verify user is unable to add infants that are more than number of adults
        Given user select trip type "<tripType>"
        When the users enters the details "<origin>", "<destination>", "<depatureDate>","<returnDate>", "<noAdults>", "<noChild>", "<infant>", "<classType>", "<email>", "One-way"
        When a user select number of infants and adults "<noAdults>", "<infant>"
        Then clicks button a button "Let's go"
        Then Verify if user is unable to add infants that are more than number of adults "<noAdults>", "<infant>"
        Examples:
            | origin       | destination | depatureDate             | returnDate             | noAdults | noChild | infant | classType | email                       | paymentMethod |
            | Johannesburg | Cape Town   | Thursday, 28 August 2025 | Friday, 29 August 2025 | 2        | 2       | 4      | Lite      | tmahwasanet@flysafair.co.za | ozow          |

