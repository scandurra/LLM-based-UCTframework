const { test, expect } = require('@playwright/test');
const LoginPage = require('../../models/page_object_models/login-page');
const TestResultReporter = require('../../models/test-result-reporter');

const insertWrongCredentials = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.fillEmail('wrong-email');
    await loginPage.fillPassword('wrong-password');
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC2_ID1', 'Insert wrong credentials in the login form', true, await loginPage.isEmailFieldVisible(), true, ['wrong-email', 'wrong-password'], executionTime);
    }

    expect(await loginPage.isEmailFieldVisible()).toBeTruthy();
}

const clickLoginButton = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.clickLoginButton();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC2_ID2', 'Click the Login button', true, true, true, [], executionTime);
    }

    expect(await loginPage.isEmailFieldVisible()).toBeTruthy();
}

const verifyErrorMessage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    // Assuming there's a method to check for error message in the page object model
    // For demonstration purposes, we'll use a simple expectation
    expect(await page.isVisible('text=Invalid credentials')).toBeTruthy();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC2_ID3', 'Verify error message is displayed', true, await page.isVisible('text=Invalid credentials'), true, [], executionTime);
    }
}

test("UC1_TC2 - Login with wrong credentials", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC1_TC2 - Login with wrong credentials");

    await page.goto(process.env.E2E_BASE_URL + process.env.E2E_LOGIN_URL);

    const loginPage = new LoginPage(page);
    await loginPage.clickLoginLink();

    await insertWrongCredentials(page, reporter);
    await clickLoginButton(page, reporter);
    await verifyErrorMessage(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});