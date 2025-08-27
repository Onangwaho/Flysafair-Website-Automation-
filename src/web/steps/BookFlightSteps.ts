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

When(/^user select ticket prices and class type "([^"]*)", "([^"]*)"$/, async function (classType, triptypo) {
    await new BookFlight(this.web, this.page).selectclassType(classType, triptypo);
});

When(/^capture passangers details "([^"]*)", "([^"]*)", "([^"]*)"$/, async function (noAdults, noKids, noIfant) {
    await new BookFlight(this.web, this.page).fnEnterPassangerDetails(noAdults, noKids, noIfant)
});

When(/^customer selects travel protection "([^"]*)"$/, async function (protecion) {
    await new BookFlight(this.web, this.page).fnTravelProtection(protecion);
});


Then(/^clicks button a button "([^"]*)"$/, async function (button) {
    await new BookFlight(this.web, this.page).fnClickButton(button);
});


Then(/^customer clicks "([^"]*)"$/, async function (carHire) {
    await new BookFlight(this.web, this.page).fnClickNoCarHire(carHire)

    // // attached data to cucumber report
    // const bookingRef = "SGTDH";
    // const timestamp = new Date().toISOString();

    // // Log to terminal
    // console.log(`Booking reference: ${bookingRef} at ${timestamp}`);

    // // Attach to Cucumber report
    // await this.attach(`Booking Reference: ${bookingRef}\nTimestamp: ${timestamp}`, "text/plain");

    // // Or attach structured JSON
    // await this.attach(JSON.stringify({ bookingRef, timestamp }, null, 2),"application/json"
    // );
});

Then(/^booking reference is created and payment is confirmed booking is succesfull$/, async function () {
    await new BookFlight(this.web, this.page).getRefNoAndAssert();
});



When(/^customer select payment method "([^"]*)" and pay$/, async function (payType) {
    await new BookFlight(this.web, this.page).fnPayFlight(payType)
    // await expect(this.page).toHaveURL('https://test-safair.ezyflight.se/manage/confirmation?confirmationNumber=XZ6PE1&bookingLastName=RRTRT');
});

When(/^a user select number of infants and adults "([^"]*)", "([^"]*)"$/, async function (Adult, infant) {
    await new BookFlight(this.web, this.page).assertAdultsAndInfants(Adult, infant)
});

Then(/^Verify if user is unable to add infants that are more than number of adults "([^"]*)", "([^"]*)"$/, async function (Adult, infant) {
    await new BookFlight(this.web, this.page).verifyAdultInfantChecks(Adult, infant)
});

Given(/^user speak to Lindi$/, async function () {
    await this.page.goto('https://web.whatsapp.com/');
    await this.page.getByRole('button', { name: 'Continue' }).click();
    await this.page.getByRole('paragraph').click();
    await this.page.getByRole('textbox', { name: 'Search input textbox' }).fill("Lindy UAT");
    await this.page.getByRole('textbox', { name: 'Search input textbox' }).press('Enter');
    await this.page.getByRole('gridcell', { name: 'Lindy UAT' }).locator('div:has-text("Lindy UAT")').first().click();
    await this.page.getByRole('textbox', { name: 'Type a message' }).fill("Hi");
    await this.page.getByRole('textbox', { name: 'Type a message' }).press('Enter');
});








