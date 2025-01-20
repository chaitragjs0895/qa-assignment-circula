import { test as base } from "@playwright/test";
import SignUpPage from "../pageobjects/signUpPage";

const fixtures = base.extend<{
    signUpPage: SignUpPage;
}>({
    signUpPage: async ({ page }, use) => {
        const signUpPage = new SignUpPage(page);
        await use(signUpPage);
    },
});

export { fixtures };
