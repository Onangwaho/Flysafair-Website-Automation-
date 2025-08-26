import { Console } from "console";
import UIActions from "../../support/playwright/actions/UIActions";
import Assert from "../../support/playwright/asserts/Assert";
import StringUtil from "../../support/utils/StringUtil";
import Constants from "../constants/Constants";
import { Page, Locator, FrameLocator, expect } from "@playwright/test";
import * as fs from "fs";

export default class BookFlight {
    readonly iframe: FrameLocator;
    readonly page: Page;
    readonly btnLetsGo: Locator;
    readonly selectPrices: Locator;
    readonly selectLite: Locator;
    readonly standard: Locator;
    readonly businessClass: Locator;
    readonly clickContinue: Locator;
    readonly clickbtnNothanks: Locator;

    readonly txtFirtName: Locator;
    readonly txtSurname: Locator;
    readonly txtID: Locator;
    readonly txtMobileNumber: Locator;
    readonly txtEmail: Locator;
    readonly txtConEmail: Locator;
    readonly rdbYes: Locator;
    readonly rdbNo: Locator;

    readonly ozowPayment: Locator;

    readonly bookingRef: Locator;
    readonly bookingAssertMessage: Locator;

    readonly btnNoCarThanks: Locator;

    constructor(private web: UIActions, page: Page) {

        this.page = page;
        this.iframe = page.frameLocator('[id^="_hjSafeContext_"]');

        this.btnLetsGo = this.page.getByRole('button', { name: 'Let\'s go' });
        this.selectPrices = this.page.locator('xpath=/html/body/div[1]/div[2]/div[1]/div[2]/div/div[2]/div/div[1]/div/div[1]/div/div[2]/div/div[5]/div[1]/div[2]/button');
        this.selectLite = this.iframe.locator("//div[starts-with(@id, '__BVID__')]/div/div[1]/div/div[1]")

        this.businessClass = this.page.locator("//*[contains(@id, '__BVID__')]/div/div[1]/div/div[4]")
        this.clickContinue = this.page.getByRole('button', { name: 'Continue' });
        this.clickbtnNothanks = this.page.getByRole('button', { name: 'No car, thanks' }).nth(1);

        this.txtFirtName = this.page.locator('xpath=/html[1]/body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[1]/input[1]');
        this.txtSurname = this.page.locator('xpath=/html[1]/body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[2]/div[1]/input[1]');
        this.txtID = this.page.locator('xpath=/html[1]/body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[2]/div[1]/div[2]/div[1]/input[1]');
        this.txtMobileNumber = this.page.locator("xpath=/html[1]/body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[2]/div[1]/div[3]/div[1]/input[1]");
        this.txtEmail = this.page.locator('xpath=/html[1]/body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[2]/div[1]/div[4]/div[1]/div[1]/input[1]');
        this.txtConEmail = this.page.locator('xpath=/html[1]/body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[2]/div[1]/div[4]/div[2]/div[1]/input[1]');

        this.rdbYes = this.page.getByLabel('Yes, add travel protection to my flight for an additional R32 per person');
        this.rdbNo = this.page.getByLabel('No, I choose not to protect my purchase.');
        this.ozowPayment = this.page.getByRole('button', { name: 'Ozow ' });

        this.bookingRef = this.page.locator('//*[@id="app"]/div[2]/div[2]/div/div/div/div[2]/div/div/div[1]/div/div/p/h4/span[2]');
        this.bookingAssertMessage = this.page.getByRole('heading', { name: 'Payment Complete' }).first();
        // this.bookingAssertMessage = this.page.locator('#app > div:nth-child(2) > div.main-container > div > div > div > div:nth-child(2) > div > div > div.content-container__left > div > div > h1');


    }

    private txtDepature = "//input[@placeholder='Please select origin']";
    private destination = "//input[@placeholder='Please select destination']";


    public async selectTripType(tripTypes: string) {
        if (tripTypes == "Round-trip") {
            await this.page.getByLabel('Round-trip').check();

        }
        else {
            await this.page.getByLabel('One-way').check();
        }
    }
    public async enterTripDetails(origin: string, destination: string, depatureDate: string, ArrivalDate: string, adultorigin: string, child: string, infant: string, classType: string, email: string, tripType: string) {

        // Enter departure
        await this.web.element(this.txtDepature, Constants.DEPARTURE).click
        await this.web.editBox(this.txtDepature, Constants.DEPARTURE).fill(origin);
        await this.page.waitForTimeout(300);
        await this.page.getByPlaceholder('Please select origin').press('Enter');

        // Enter destination
        await this.web.element(this.destination, Constants.DESTINATION).click
        await this.web.editBox(this.destination, Constants.DEPARTURE).fill(destination);
        await this.page.waitForTimeout(300);
        await this.page.getByPlaceholder('Please select destination').press('Enter');

        if (await this.page.getByRole('button', { name: 'Accept' }).isEnabled) {
            await this.page.getByRole('button', { name: 'Accept' }).click();
        }

        // Select date
        if (tripType == "One-way") {
            await this.page.getByLabel('Departure').click();
            await this.page.getByRole('button', { name: depatureDate }).click();
        }
        else {
            // Departure
            await this.page.getByLabel('Departure').click();
            await this.page.getByRole('button', { name: depatureDate }).click();
            // Return
            await this.page.waitForTimeout(1000);
            await this.page.getByLabel('Return').click();
            await this.page.getByRole('button', { name: ArrivalDate }).click();
        }


        // select number of adults
        if (adultorigin <= "3") {
            await this.page.getByRole('button', { name: adultorigin }).click();
        }
        else {
            await this.page.locator('select[name="adult"]').selectOption(adultorigin);
        }
        // select no of kids
        if (child > "0") {
            await this.page.locator('select[name="child"]').first().selectOption(child);
        }
        // select no of Infants
        if (adultorigin >= infant) {
            if (infant > "0") {
                await this.page.locator('select[name="child"]').nth(1).selectOption(infant);
            }
        }
        else {
            console.log("Fail: Only 1 infant per adult")
        }
    }


    public async assertAdultsAndInfants(adult: string, infants: string) {
        if (adult <= "3") {
            await this.page.getByRole('button', { name: adult }).click();
        }
        else {
            await this.page.locator('select[name="adult"]').selectOption(adult);
        }

        if (infants > "0") {
            await this.page.locator('select[name="child"]').nth(1).selectOption(infants);
        }
    }


    public async verifyAdultInfantChecks(adultNo: string, infantNumber: string) {

        if (infantNumber > "0") {
            await expect(this.page.getByText('Only 1 infant per adult')).toHaveCount(1);
        }
        else {
            console.log("Fail: Only 1 infant per adult is suppose to be displayed since infants number is greater than adults")
        }
    }

    public async clickLetsGo() {
        await this.btnLetsGo.click();



    }
    public async selectclassType(type: string) {
        await this.page.waitForTimeout(4000);
        await this.selectPrices.click();

        if (type == "Lite") {
            await this.page.locator('div:has-text("Hand Luggage Checked luggage not included")').nth(7).click();
        }
        if (type == "Standard") {
            await this.page.locator('div:has-text("Standard Hand Luggage Luggage")').nth(7).click();
        }
        if (type == "Business") {
            await this.page.locator('div:has-text("Most Popular Business Class")').nth(7).click();
        }
    }

    public async fnClickNoCarHire(car: string) {
        await this.page.waitForTimeout(3000);
        if (await this.clickbtnNothanks.isVisible()) {
            await this.clickbtnNothanks.click();
        }
    }

    public async fnTravelProtection(travel: string) {
        if (travel == "No") {
            await this.rdbNo.click();
        }
        else {
            await this.rdbYes.click();
        }
    }

    public async fnClickContinue() {
        await this.page.waitForTimeout(1000);
        await this.clickContinue.click();
    }

    public async fnEnterPassangerDetails(noAdults: string, noKids: string, noInfants: string) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

        // random string
        const randomStr = (len = 5) =>
            Array.from({ length: len }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');

        //fill passenger fields
        const fillPassenger = async (
            index: number,
            type: 'adult' | 'kid' | 'infant',
            overrides: { firstName?: string; lastName?: string; documentId?: string; mobile?: string; email?: string } = {}
        ) => {
            const namePrefix = overrides.firstName ||
                (type === 'adult' ? 'Auto' : type === 'kid' ? 'Child' : 'Infant') + randomStr();
            const lastName = overrides.lastName || (type === 'adult' ? 'AutomationTest' : type === 'kid' ? 'Child' : 'Infant');
            const docId = overrides.documentId ||
                (type === 'adult' ? '8411045399080' : type === 'kid' ? '1501019298088' : '2501019298088');

            await this.page.locator(`input[name="\\3${index} -firstName"]`).fill(namePrefix);
            await this.page.locator(`input[name="\\3${index} -lastName"]`).fill(lastName);
            await this.page.locator(`input[name="\\3${index} -document-id"]`).fill(docId);

            if (overrides.mobile) {
                await this.page.locator(`input[name="\\3${index} -Contact number"]`).fill(overrides.mobile);
            }
            if (overrides.email) {
                await this.page.locator(`input[name="\\3${index} -email"]`).fill(overrides.email);
                await this.page.locator(`input[name="\\3${index} -email-confirmation"]`).fill(overrides.email);
            }
        };

        const numAdults = Number(noAdults);
        const numKids = Number(noKids);
        const numInfant = Number(noInfants);

        let index = 1;

        // === ADULTS ===
        for (let i = 0; i < numAdults; i++, index++) {
            if (i === 0) {
                // Primary adult: special case
                const rand = randomStr();
                await this.page.locator(`input[name="\\30 -firstName"]`).fill("Auto" + rand);
                await this.page.locator(`input[name="\\30 -lastName"]`).fill("Automation");
                await this.page.locator(`input[name="\\30 -document-id"]`).fill("8411045399080");
                await this.page.getByRole('textbox', { name: 'Mobile Number *' }).fill('+27725556666');
                await this.page.getByRole('textbox', { name: 'Email Address *' }).fill('tmahwasane@flysafair.co.za');
                await this.page.getByRole('textbox', { name: 'Confirm Email Address *' }).fill('tmahwasane@flysafair.co.za');
                index--;
            } else {
                await fillPassenger(index, 'adult', { mobile: '+27712225555', email: 'test@gmail.com' });
            }
        }

        // === KIDS ===
        for (let k = 0; k < numKids; k++, index++) {
            await fillPassenger(index, 'kid');
        }

        // === INFANTS ===
        for (let d = 0; d < numInfant; d++, index++) {
            await fillPassenger(index, 'infant');
        }
    }

    public async fnPayFlight(pay: string) {
        switch (pay.toLowerCase()) {
            case "ozow":
                await this.ozowPayment.click();
                break;

            case "paylater":
                await this.page.getByRole('button', { name: 'PayLater ' }).click();
                break;

            default:
                throw new Error(`Unsupported payment method: ${pay}`);
        }
        await this.page.getByRole('checkbox', { name: "I agree to FlySafair's Booking T&C's" }).check();
        await this.page.getByRole('button', { name: 'Pay now' }).nth(1).click();

        await this.page.waitForTimeout(15000);
        await this.page.locator('//*[@id="select-testSuccessfulResponse"]/div[1]/div[2]/p/span[1]').click();

    }


    public async getRefNoAndAssert() {
        let now = new Date();
        let dates = now.toISOString();  // full timestamp
        let refNo = await this.bookingRef.textContent();

        // Get assertion message text
        if (await this.bookingAssertMessage.isVisible()) {
            let assValue = await this.bookingAssertMessage.allInnerTexts()
            console.log("Booking reference no is: " + refNo);
            console.log("Payment status : " + assValue);

            // Assertion
            // expect(this.bookingAssertMessage).toHaveText("Payment Complete");
            // JSON file path
            const filePath = "test-results/test-data/data.json";

            // Read existing (if file exists)
            let existing: any[] = [];
            if (fs.existsSync(filePath)) {
                const raw = fs.readFileSync(filePath, "utf-8");
                try {
                    const parsed = JSON.parse(raw);
                    existing = Array.isArray(parsed) ? parsed : [parsed]; // ✅ force into array
                } catch (e) {
                    console.error("Invalid JSON, resetting file", e);
                    existing = [];
                }
            }
            // Append new record
            const data = {
                bookingRef: refNo,
                lastName: "Automation",
                timeStamp: dates
            };
            existing.push(data);

            // Write back
            fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), "utf-8");

        }

    }


}


