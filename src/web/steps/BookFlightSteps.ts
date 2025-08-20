import { Given, Then, When } from "@cucumber/cucumber";
import StringUtil from "../../support/utils/StringUtil";
import CommonPage from "../pages/CommonPage";
import HomePage from "../pages/HomePage";
import BookFlight from "../pages/BookFlightPage";
import { expect } from "@playwright/test";

Given(/^user is at home page$/, async function () {
    await new HomePage(this.web).navigateToHomePage();
});

Given(/^user select trip type "([^"]*)"$/, async function (type) {
    await new BookFlight(this.web, this.page).selectTripType(type);
});

When(/^the users enters the details "([^"]*)", "([^"]*)", "([^"]*)","([^"]*)", "([^"]*)", "([^"]*)", "([^"]*)", "([^"]*)", "([^"]*)", "([^"]*)"$/, async function (origin, destination, depatureDate, ArrivalDate, adult, child, infant, classType, email, tripType) {
    await new BookFlight(this.web, this.page).enterTripDetails(origin, destination, depatureDate, ArrivalDate, adult, child, infant, classType, email, tripType);
});

Then(/^click button "([^"]*)"$/, async function (args1) {
    await new BookFlight(this.web, this.page).clickLetsGo();
});

Then(/^clicks button "([^"]*)"$/, async function (args1) {
    await new BookFlight(this.web, this.page).fnClickContinue();
});

When(/^user select ticket prices and class type "([^"]*)"$/, async function (classType) {
    await new BookFlight(this.web, this.page).selectclassType(classType);
});

When(/^capture passangers details "([^"]*)", "([^"]*)", "([^"]*)"$/, async function (noAdults, noKids, noIfant) {
    await new BookFlight(this.web, this.page).fnEnterPassangerDetails(noAdults, noKids, noIfant)
});

When(/^customer selects travel protection "([^"]*)"$/, async function (protecion) {
    await new BookFlight(this.web, this.page).fnTravelProtection(protecion);
});

Then(/^customer clicks "([^"]*)"$/, async function (carHire) {
    await new BookFlight(this.web, this.page).fnClickNoCarHire(carHire)
});

Then(/^payment is confirmed and booking is succesfull$/, async function () {
    await new BookFlight(this.web, this.page).getRefNoAndAssert();
});

When(/^customer select payment method "([^"]*)" and pay$/, async function (payType) {
    await new BookFlight(this.web, this.page).fnPayFlight(payType)
    // await expect(this.page).toHaveURL('https://test-safair.ezyflight.se/manage/confirmation?confirmationNumber=XZ6PE1&bookingLastName=RRTRT');

});





