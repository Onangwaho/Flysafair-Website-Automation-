import { Given, Then, When } from "@cucumber/cucumber";
import StringUtil from "../../support/utils/StringUtil";
import CommonPage from "../pages/CommonPage";
import HomePage from "../pages/HomePage";
import BookFlight from "../pages/BookFlightPage";
import ManageBookings from "../pages/ManageBookingPage";

import { expect } from "@playwright/test";

Given(/^user clicks my bookigs$/, async function () {
    await new ManageBookings(this.web, this.page).FNclickMyBooking();
});

When(/^user enter "([^"]*)" and "([^"]*)"$/, async function (pnr, lstName) {
    await new ManageBookings(this.web, this.page).FNSearchExistingBooking(pnr, lstName)
});

Then(/^existing booking is found succesfully$/, async function () {
    await new ManageBookings(this.web, this.page).FNassertExistingBooking()
});















