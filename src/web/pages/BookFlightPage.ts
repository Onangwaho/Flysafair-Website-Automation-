import UIActions from "../../support/playwright/actions/UIActions";
import Assert from "../../support/playwright/asserts/Assert";
import StringUtil from "../../support/utils/StringUtil";
import Constants from "../constants/Constants";
import { Page, Locator, FrameLocator, expect } from "@playwright/test";

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
        this.selectPrices = this.page.locator('xpath=/html[1]/body[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[5]/div[1]/div[2]/button[1]');
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
        this.bookingAssertMessage = this.page.locator('//*[@id="app"]/div[2]/div[2]/div/div/div/div[2]/div/div/div[1]/div/div/h1');
        this.bookingAssertMessage = this.page.locator('xpath=/html/body/div[1]/div[2]/div[1]/div/div/div/div[2]/div/div[1]/div/div[2]/div/button');
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

        if (adultorigin <= "3") {
            await this.page.getByRole('button', { name: adultorigin }).click();
        }

        if (adultorigin >= "4") {
            await this.page.locator('select[name="adult"]').selectOption(adultorigin);
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
        await this.clickContinue.click();
    }

    public async fnEnterPassangerDetails(noAdults: string, noKids: string, noInfant: string) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const numAdults = Number(noAdults);

        for (let i = 0; i < numAdults; i++) {
            let result = '';
            for (let b = 0; b < 5; b++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }

            if (i === 0) {
                // First adult: use role-based selectors for mobile/email
                await this.page.locator(`input[name="\\30 -firstName"]`).fill("Auto" + result);
                await this.page.locator(`input[name="\\30 -lastName"]`).fill('Automation');
                await this.page.locator(`input[name="\\30 -document-id"]`).fill('8411045399080');
                await this.page.getByRole('textbox', { name: 'Mobile Number *' }).fill('+27725556666');
                await this.page.getByRole('textbox', { name: 'Email Address *' }).fill('tmahwasane@flysafair.co.za');
                await this.page.getByRole('textbox', { name: 'Confirm Email Address *' }).fill('tmahwasane@flysafair.co.za');
            } else {
                await this.page.locator(`input[name="\\3${i} -firstName"]`).fill("Auto" + result);
                await this.page.locator(`input[name="\\3${i} -lastName"]`).fill('Automation');
                await this.page.locator(`input[name="\\3${i} -document-id"]`).fill('8411045399080');
                await this.page.locator(`input[name="\\3${i} -Contact number"]`).fill('+27712225555');
                await this.page.locator(`input[name="\\3${i} -email"]`).fill('test@gmail.com');
                await this.page.locator(`input[name="\\3${i} -email-confirmation"]`).fill('test@gmail.com');
            }
        }
    }

    public async fnPayFlight(pay: string) {

        if (pay == "ozow") {
            await this.ozowPayment.click();
            // await this.page.getByRole('button', { name: 'Ozow ' }).click();
            await this.page.getByRole('checkbox', { name: 'I agree to FlySafair\'s Booking T&C\'s' }).check();
            await this.page.getByRole('button', { name: 'Pay now' }).nth(1).click();
            await this.page.getByText('Test successful responseSelect').click();
        }
    }

    public async getRefNoAndAssert() {
        let refNo = this.bookingRef.inputValue();
        let assValue = this.bookingAssertMessage.getAttribute;
        console.log("Booking reference no is: " + refNo)
        // Assertion
        expect(assValue).toBe("Payment Complete");
    }
}