const { test, expect } = require('@playwright/test');
const LoginPage = require('../../models/page_object_models/login-page');
const TestResultReporter = require('../../models/test-result-reporter');

const insertInvalidPassword = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.fillPassword('password!@#$');
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC5_ID1', 'Insert invalid password', true, await loginPage.passwordInput.isVisible(), true, 'password!@#$', executionTime);
    }

    expect(await loginPage.passwordInput.isVisible()).toBeTruthy();
}

const confirmPassword = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.fillPassword('password!@#$');
    await loginPage.clickLoginButton();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC5_ID2', 'Confirm password with invalid characters', true, await page.isVisible('text=Invalid password'), true, 'password!@#$', executionTime);
    }

    expect(await page.isVisible('text=Invalid password')).toBeTruthy();
}

const correctPassword = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.fillPassword('newpassword');
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC5_ID3', 'Correct password', true, await loginPage.passwordInput.isVisible(), true, 'newpassword', executionTime);
    }

    expect(await loginPage.passwordInput.isVisible()).toBeTruthy();
}

test("UC1_TC5 - Inserimento di caratteri non ammessi nella password", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC1_TC5 - Inserimento di caratteri non ammessi nella password");

    await insertInvalidPassword(page, reporter);
    await confirmPassword(page, reporter);
    await correctPassword(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});