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

    //Personalise Your Flight
    readonly checked_Luggage_Btn: Locator;
    readonly baggage_Protection_Btn: Locator;
    readonly priority_Boarding_Btn: Locator;
    readonly extra_Bag_Btn: Locator;
    readonly special_Luggage_Btn: Locator;
    readonly snack_Btn: Locator;
    readonly special_Assistance_Btn: Locator;
    readonly bidvest_Premier_Lounge_Btn: Locator;
    readonly carriage_of_Firearms_Btn: Locator;
    readonly update_Btn: Locator;
    readonly extra_Checkbox: Locator;

    //Special Assistance?
    readonly special_assistance_question: Locator


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



        this.checked_Luggage_Btn = this.page.locator('//h6[normalize-space()="Checked Luggage"]/following::button[1]');
        this.baggage_Protection_Btn = this.page.locator('//h6[normalize-space()="Baggage Protection"]/following::button[1]');
        this.priority_Boarding_Btn = this.page.locator('//h6[normalize-space()="Priority Boarding"]/following::button[1]');
        this.extra_Bag_Btn = this.page.locator('//h6[normalize-space()="Extra Bag"]/following::button[1]');
        this.special_Luggage_Btn = this.page.locator('//h6[normalize-space()="Special Luggage"]/following::button[1]');
        this.snack_Btn = this.page.locator('//h6[normalize-space()="Snack"]/following::button[1]');
        this.special_Assistance_Btn = this.page.locator('//h6[normalize-space()="Special Assistance?"]/following::button[1]');
        this.bidvest_Premier_Lounge_Btn = this.page.locator('//h6[normalize-space()="Bidvest Premier Lounge"]/following::button[1]');
        this.carriage_of_Firearms_Btn = this.page.locator('//h6[normalize-space()="Carriage of Firearms"]/following::button[1]');
        this.update_Btn = this.page.getByRole('button', { name: 'Update' });
        //this.extra_Checkbox = this.page.locator('//h6[normalize-space()="Special Assistance?"]/following::button[1]');

        //html[1]/body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/div[1]/div[1]/div[1]/div[2]/div[3]/div[1]/div[3]/div[1]/button[1]
        //html[1]/body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/div[1]/div[1]/div[1]/div[2]/div[4]/div[1]/div[3]/div[1]/button[1]

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
        if (infant > "0") {
            await this.page.locator('select[name="child"]').nth(1).selectOption(infant);
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
        await this.page.waitForTimeout(10000);
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
            // await this.page.getByText('Test successful responseSelect').click();
        }
    }

    public async getRefNoAndAssert() {
        let refNo = this.bookingRef.inputValue();
        let assValue = this.bookingAssertMessage.getAttribute;
        console.log("Booking reference no is: " + refNo)
        // Assertion
        expect(assValue).toBe("Payment Complete");
    }

    getExtraCheckbox(extraName: string) {
        return this.page.locator(`//h6[normalize-space()="${extraName}"]/following::input[1]`);
    }

    getButtonByName(buttonName: string) {
        return this.page.getByRole('button', { name: buttonName });
    }

    public async personaliseYourFlight(ticket_Type: string, checked_Luggage: string, baggage_Protection: string, priority_Boarding: string, extra_Bag: string, special_Luggage: string, snack: string, special_Assistance: string, bidvest_Premier_Lounge: string, carriage_of_Firearms: string) {


        /*    
            const isYes = (val: string) => val.toLowerCase() === "y" || val.toLowerCase() === "yes";
            let addedExtra = false;
    
            if (isYes(checked_Luggage) && ticket_Type === "Lite") {
                await this.checked_Luggage_Btn.click();
                addedExtra = true;
            }
    
            if (isYes(baggage_Protection)) {
                await this.baggage_Protection_Btn.click();
                addedExtra = true;
            }
    
            if (isYes(priority_Boarding) && ticket_Type !== "Business Class") {
                await this.priority_Boarding_Btn.click();
                addedExtra = true;
            }
    
            if (isYes(extra_Bag) && ticket_Type !== "Business Class") {
                await this.extra_Bag_Btn.click();
                addedExtra = true;
            }
    
            if (isYes(special_Luggage) && ticket_Type !== "Business Class") {
                await this.special_Luggage_Btn.click();
                addedExtra = true;
            }
    
            if (isYes(snack) && ticket_Type !== "Business Class") {
                await this.snack_Btn.click();
                addedExtra = true;
            }
    
            if (isYes(special_Assistance)) {
                await this.special_Assistance_Btn.click();
                addedExtra = true;
            }
    
            if (isYes(bidvest_Premier_Lounge)) {
                await this.bidvest_Premier_Lounge_Btn.click();
                addedExtra = true;
            }
    
            if (isYes(carriage_of_Firearms) && ticket_Type === "Business Class") {
                await this.carriage_of_Firearms_Btn.click();
                addedExtra = true;
            }
    
            if (!addedExtra) {
                console.log("No extras added");
    
            }
            await this.page.waitForTimeout(3000);
            console.log("Finished personalising flight");
    */

        // Flag to track whether any extra was added
        let addedExtra = false;

        // Helper function to check if a value indicates selection ("y" or "yes")
        const isYes = (val: string) => val.toLowerCase() === "y" || val.toLowerCase() === "yes";

        // Array of extras with their names and values for looping
        const extras = [
            { name: "checked_Luggage", value: checked_Luggage },
            { name: "baggage_Protection", value: baggage_Protection },
            { name: "priority_Boarding", value: priority_Boarding },
            { name: "extra_Bag", value: extra_Bag },
            { name: "special_Luggage", value: special_Luggage },
            { name: "snack", value: snack },
            { name: "special_Assistance", value: special_Assistance },
            { name: "bidvest_Premier_Lounge", value: bidvest_Premier_Lounge },
            { name: "carriage_of_Firearms", value: carriage_of_Firearms },
        ];

        // Loop through each extra to check if it should be added
        for (const extra of extras) {
            // Skip extras that are not selected
            if (!isYes(extra.value)) continue;

            // Switch statement to handle each extra separately
            switch (extra.name) {
                case "checked_Luggage":
                    // Only Lite tickets can add checked luggage
                    if (ticket_Type === "Lite") {
                        await this.checked_Luggage_Btn.click();
                        addedExtra = true;  // Mark that an extra was added
                    }
                    break;

                case "baggage_Protection":
                    await this.baggage_Protection_Btn.click();
                    addedExtra = true;
                    await this.page.waitForTimeout(3000);
                    await this.getExtraCheckbox("Baggage Protection").click();
                    await this.page.waitForTimeout(3000);
                    //this.update_Btn.click();
                    await this.getButtonByName("Update").nth(0).click();
                    break;

                case "priority_Boarding":
                    // Priority Boarding not allowed for Business Class
                    if (ticket_Type !== "Business Class") {
                        await this.priority_Boarding_Btn.click();
                        addedExtra = true;
                    }
                    break;

                case "extra_Bag":
                    if (ticket_Type !== "Business Class") {
                        await this.extra_Bag_Btn.click();
                        addedExtra = true;
                    }
                    break;

                case "special_Luggage":
                    if (ticket_Type !== "Business Class") {
                        await this.special_Luggage_Btn.click();
                        addedExtra = true;
                    }
                    break;

                case "snack":
                    if (ticket_Type !== "Business Class") {
                        await this.snack_Btn.click();
                        addedExtra = true;
                    }
                    break;

                case "special_Assistance":
                    await this.special_Assistance_Btn.click();
                    addedExtra = true;
                    await this.page.waitForTimeout(3000);
                    await this.getExtraCheckbox("Special Assistance?").click();
                    await this.page.waitForTimeout(3000);
                    await this.page.locator('input[value="Yes"]').click();

                    await this.page.waitForTimeout(3000);
                    await this.getButtonByName("Update").nth(0).click();
                    break;

                case "bidvest_Premier_Lounge":
                    await this.bidvest_Premier_Lounge_Btn.click();
                    addedExtra = true;
                    break;

                case "carriage_of_Firearms":
                    // Only Business Class can add carriage of firearms
                    if (ticket_Type === "Business Class") {
                        await this.carriage_of_Firearms_Btn.click();
                        addedExtra = true;
                    }
                    break;
            }
        }

        // If no extras were added, print a message and wait briefly
        if (!addedExtra) {
            console.log("No extras added");
            await this.page.waitForTimeout(3000);
        }

        console.log("Finished personalising flight");
        await this.page.waitForTimeout(30000);
    }





}