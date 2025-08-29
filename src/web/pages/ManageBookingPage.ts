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
    readonly clickbtnNothanks: Locator;
    readonly bookingRef: Locator;
    readonly bookingAssertMessage: Locator;

    constructor(private web: UIActions, page: Page) {

        this.page = page;

        this.clickbtnNothanks = this.page.getByRole('button', { name: 'No car, thanks' }).nth(1);
        this.bookingRef = this.page.locator('//*[@id="app"]/div[2]/div[2]/div/div/div/div[2]/div/div/div[1]/div/div/p/h4/span[2]');
        this.bookingAssertMessage = this.page.getByRole('heading', { name: 'Payment Complete' }).first();

    }

    public async selectTripType(tripTypes: string) {
        if (tripTypes == "Round-trip") {
            await this.page.getByLabel('Round-trip').check();

        }
        else {
            await this.page.getByLabel('One-way').check();
        }
    }

}


