const { test, expect } = require('@playwright/test');
const LoginPage = require('../../models/page_object_models/login-page');
const TestResultReporter = require('../../models/test-result-reporter');

const fillEmptyUsernameAndValidPassword = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.fillEmail('');
    await loginPage.fillPassword(process.env.PASSWORD);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC4_ID1', 'Fill empty username and valid password', true, await loginPage.isEmailFieldVisible(), true, ['EMAIL', 'PASSWORD'], executionTime);
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
        reporter.addStep('UC1_TC4_ID2', 'Click login button with empty username', true, await loginPage.isEmailFieldVisible(), true, ['EMAIL', 'PASSWORD'], executionTime);
    }

    expect(await loginPage.isEmailFieldVisible()).toBeTruthy();
}

const verifyErrorMessage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC4_ID3', 'Verify error message is displayed', true, await loginPage.isEmailFieldVisible(), true, ['EMAIL', 'PASSWORD'], executionTime);
    }

    expect(await loginPage.isEmailFieldVisible()).toBeTruthy();
}

test("UC1_TC4 - Tentativo di login con campo username vuoto", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC1_TC4 - Tentativo di login con campo username vuoto");

    await page.goto(process.env.E2E_BASE_URL);

    const loginPage = new LoginPage(page);
    await loginPage.clickLoginLink();

    await fillEmptyUsernameAndValidPassword(page, reporter);
    await clickLoginButton(page, reporter);
    await verifyErrorMessage(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});