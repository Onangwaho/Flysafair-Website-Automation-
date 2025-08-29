import { Console } from "console";
import UIActions from "../../support/playwright/actions/UIActions";
import Assert from "../../support/playwright/asserts/Assert";
import StringUtil from "../../support/utils/StringUtil";
import Constants from "../constants/Constants";
import { Page, Locator, FrameLocator, expect } from "@playwright/test";
import * as fs from "fs";

export default class ManageBookings {
    readonly iframe: FrameLocator;
    readonly page: Page;
    readonly clickMyBooking: Locator;
    readonly txtPnr: Locator;
    readonly txtLastName: Locator;
    readonly assertExistingBooking: Locator;


    constructor(private web: UIActions, page: Page) {

        this.page = page;

        this.clickMyBooking = this.page.locator("//button[normalize-space(.)='My Booking']");
        this.txtPnr = this.page.locator("//input[@placeholder='PNR']");
        this.txtLastName = this.page.locator("//input[@placeholder='Last name']");
        this.assertExistingBooking = this.page.getByRole('button', { name: 'buttonName' });
    }

    public async FNclickMyBooking() {
        await this.clickMyBooking.click();
    }

    public async FNSearchExistingBooking(pnr: string, lastName: string) {

        await this.txtPnr.fill(pnr);
        await this.txtLastName.fill(lastName);
    }

    public async FNassertExistingBooking() {
        // Assertion
        await expect(this.page.getByText("MANAGE BOOKING", { exact: false })).toBeVisible();
    }
}


