import { Page } from 'playwright-core'
import { expect } from "@playwright/test";
import signUpTestData from '../testdata/signUpTestData.json';

export default class SignUpPage {

    private page: Page

    constructor(page: Page) {
        this.page = page
    }

    public signUp = {
        circulaLogo: "await page.locator('.sc-d0709d61-0').click();",
        trialPeriod: "Start your 14-day free trial",
        noCreditCardReq: "No credit card needed",
        selectTerms: "input[name='acceptTos']",
        allowCookies: "uc-accept-all-button",
        firstName: "//input[@name='firstname']",
        lastName: "//input[@name='lastname']",
        countryDropdown: "(//div[@class='sc-eb60ccfc-0 hrMBEc']//div)[1]",
        countryTextBox: "input[name='country']",
        workEmail: "Work email",
        password: "Password",
        tryForFree: "Try for free",
        yourContactDetails: "Your contact details",
        nextStep: "Next step",
        companyInfo: "Company information",
        whereIsYourCompany: "Where’s your company",
        countryName: "Sweden",
        countryDropdownList: "//li[div]",
        swedenOptionInDropdown: "div:has-text('Sweden')",
        companyName: "[name='organizationName']",
        optionsStartingWithSwInDropdown: "div:has-text('Sw')"
    }

    public async goToCirculaSignUpPage(): Promise<void> {
        await this.page.goto(signUpTestData.url);
    }

    public async verifyCirculaTitleIsVisible() {
        await expect(this.page.getByTestId('signup').locator('path')).toBeVisible();
    }

    public async clickOnAllowCookies() {
        await this.page.getByTestId(this.signUp.allowCookies).click();
    }

    public async verifyTrialPeriodMessageIsVisible() {
        await expect(this.page.getByRole('heading', { name: this.signUp.trialPeriod })).toBeVisible();
    }

    public async verifyNoCreditCardReqIsVisible() {
        await expect(this.page.getByText(this.signUp.noCreditCardReq)).toBeVisible();
    }

    public async fillEmailAndPasswordOfStep1(email: string, password: string) {
        await this.page.getByLabel(this.signUp.workEmail).click();
        await this.page.getByLabel(this.signUp.workEmail).fill(email);
        await this.page.getByLabel(this.signUp.password, { exact: true }).click();
        await this.page.getByLabel(this.signUp.password, { exact: true }).fill(password);
    }

    public async clickOnSelectTermsCheckbox() {
        await this.page.evaluate(() => {
            const checkboxElement = document.querySelector('input[name="acceptTos"]') as HTMLInputElement;
            checkboxElement.click();
        });
    }

    public async clickOnTryForFreeButton() {
        await this.page.getByRole('button', { name: this.signUp.tryForFree }).click();
    }

    public async verifyContactDetailsIsVisible() {
        await expect(this.page.getByText(this.signUp.yourContactDetails)).toBeVisible();
    }

    public async fillFirstNameAndLastName(firstName: string, lastName: string) {
        await this.page.locator(this.signUp.firstName).click();
        await this.page.locator(this.signUp.firstName).fill(firstName);
        await this.page.locator(this.signUp.lastName).click();
        await this.page.locator(this.signUp.lastName).fill(lastName);
    }

    public async clickOnNextStepButton() {
        await this.page.getByRole('button', { name: this.signUp.nextStep }).click();
    }

    public async verifyCompanyInfoIsVisible() {
        await expect(this.page.getByText(this.signUp.companyInfo)).toBeVisible();
    }

    public async typeCompanyName(companyName: string) {
        await this.page.locator(this.signUp.companyName).fill(companyName);
    }

    public async clickOnDropdown() {
        await expect(this.page.getByRole('combobox', { name: this.signUp.whereIsYourCompany })).toBeVisible();
        await this.page.getByRole('combobox', { name: this.signUp.whereIsYourCompany }).click();
    }

    public async verifySwedenIsVisibleInDropdown() {
        await expect(this.page.getByRole('option', { name: this.signUp.countryName })).toBeVisible();
    }

    public async selectSwedenFromDropdown() {
        await this.page.getByRole('option', { name: this.signUp.countryName }).scrollIntoViewIfNeeded();
        await this.page.getByRole('option', { name: this.signUp.countryName }).hover();
        await this.page.getByRole('option', { name: this.signUp.countryName }).click();
    }

    public async verifySwedenIsVisibleInTextbox() {
        const inputField = this.page.locator(this.signUp.countryTextBox);
        const inputValue = await inputField.inputValue();
        expect(inputValue).toBe(signUpTestData.countryName);
    }

    public async typeCountryName(countryName: string) {
        await this.page.locator(this.signUp.countryTextBox).clear();
        await this.page.locator(this.signUp.countryTextBox).fill(countryName);
    }

    public async typeCountryNameWithOnlysw() {
        await this.page.locator(this.signUp.countryTextBox).clear();
        await this.page.locator(this.signUp.countryTextBox).fill("sw");
    }

    public async verifyOnlySwedenIsPresentInDropdown() {
        await expect(this.page.getByRole('option', { name: this.signUp.countryName })).toBeVisible();
        await expect(this.page.getByRole('option', { name: this.signUp.countryName })).toHaveCount(1);
    }

    public async verifySwedenIsVisible() {
        const dropdownItems = this.page.locator(this.signUp.countryDropdownList);
        const swedenOption = dropdownItems.locator(this.signUp.swedenOptionInDropdown);
        await swedenOption.waitFor({ state: 'visible' })

        const optionsStartingWithSW = await dropdownItems.locator(this.signUp.optionsStartingWithSwInDropdown);
        const count = await optionsStartingWithSW.count();
        expect(count).toBeGreaterThanOrEqual(2);
    }
}