import UIActions from "../../support/playwright/actions/UIActions";
import Assert from "../../support/playwright/asserts/Assert";
import Constants from "../constants/Constants";

export default class HomePage {
    constructor(private web: UIActions) { }

    public async navigateToHomePage() {

        await this.web.goto(process.env.BASE_URL, "Home page");
    }
}