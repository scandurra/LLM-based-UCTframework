const { test, expect } = require('@playwright/test');
const LoginPage = require('../../models/page_object_models/login-page');
const TestResultReporter = require('../../models/test-result-reporter');

const insertXSSInput = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.displayLoginForm();
    await loginPage.enterEmail('<script>alert("XSS")</script>');
    await loginPage.enterPassword('password');
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC7_ID1', 'Insert XSS input string', true, true, true, '<script>alert("XSS")</script>', executionTime);
    }

    expect(await loginPage.getErrorMessage()).not.toBeNull();
}

const clickLoginButton = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.login();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC7_ID2', 'Click Login button', true, true, true, '', executionTime);
    }

    expect(await loginPage.getErrorMessage()).not.toBeNull();
}

const verifyErrorMessage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    const errorMessage = await loginPage.getErrorMessage();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC7_ID3', 'Verify error message', true, errorMessage.includes('accesso non autorizzato'), true, '', executionTime);
    }

    expect(errorMessage).toContain('accesso non autorizzato');
}

test("UC1_TC7 - Tentativo di login con Cross-Site Scripting (XSS)", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC1_TC7 - Tentativo di login con Cross-Site Scripting (XSS)");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await insertXSSInput(page, reporter);
    await clickLoginButton(page, reporter);
    await verifyErrorMessage(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});