import { Given, Then, When } from "@cucumber/cucumber";
import StringUtil from "../../support/utils/StringUtil";
import CommonPage from "../pages/CommonPage";
import HomePage from "../pages/HomePage";
import BookFlight from "../pages/BookFlightPage";
import ManageBookings from "../pages/ManageBookingPage";

import { expect } from "@playwright/test";

Given(/^user is at home page$/, async function () {
    await new HomePage(this.web).navigateToHomePage();
});



Given(/^user clicks my bookigs$/, async function () {

});





Given(/^user select trip type "([^"]*)"$/, async function (typee) {
    await new BookFlight(this.web, this.page).selectTripType(typee);
});







