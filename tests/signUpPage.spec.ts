import { fixtures as test } from '../fixtures/fixture';
import signUpTestData from '../testdata/signUpTestData.json'

test.describe('Sweden country tests', () => {
    test.beforeEach(async ({ signUpPage }) => {
        await signUpPage.goToCirculaSignUpPage();
        await signUpPage.verifyCirculaTitleIsVisible();
        await signUpPage.clickOnAllowCookies();
        await signUpPage.verifyNoCreditCardReqIsVisible();
        await signUpPage.verifyTrialPeriodMessageIsVisible();
        await signUpPage.fillEmailAndPasswordOfStep1(signUpTestData.email, signUpTestData.password);
        await signUpPage.clickOnSelectTermsCheckbox();
        await signUpPage.clickOnTryForFreeButton();
        await signUpPage.verifyContactDetailsIsVisible();
        await signUpPage.fillFirstNameAndLastName(signUpTestData.firstName, signUpTestData.lastName);
        await signUpPage.clickOnNextStepButton();
    })

    test("verify Sweden is visible in the dropdown", async ({ signUpPage }) => {
        await signUpPage.typeCompanyName(signUpTestData.companyName);
        await signUpPage.verifyCompanyInfoIsVisible();
        await signUpPage.clickOnDropdown();
        await signUpPage.verifySwedenIsVisibleInDropdown();
    });

    test("Verify on selecting Sweden from dropdown, its visible in the textbox", async ({ signUpPage }) => {
        await signUpPage.clickOnDropdown();
        await signUpPage.verifySwedenIsVisibleInDropdown();
        await signUpPage.selectSwedenFromDropdown();
        await signUpPage.verifySwedenIsVisibleInTextbox();
    });

    test("Verify on typing Sweden in textbox, only Sweden is visible in dropdown", async ({ signUpPage }) => {
        await signUpPage.typeCountryName(signUpTestData.countryName);
        await signUpPage.verifyOnlySwedenIsPresentInDropdown();
    });

    test("Verify on typing Sweden in textbox and selecting it, Sweden is visible in textbox", async ({ signUpPage }) => {
        await signUpPage.typeCountryName(signUpTestData.countryName);
        await signUpPage.verifyOnlySwedenIsPresentInDropdown();
        await signUpPage.selectSwedenFromDropdown();
        await signUpPage.verifySwedenIsVisibleInTextbox();
    });

    test("Verify on typing Sw in textbox and selecting it, Sweden is visible in textbox", async ({ signUpPage }) => {
        await signUpPage.typeCountryNameWithOnlysw();
        await signUpPage.verifySwedenIsVisible();
        await signUpPage.selectSwedenFromDropdown();
        await signUpPage.verifySwedenIsVisibleInTextbox();
    });
});
