const { test, expect } = require('@playwright/test');
const LoginPage = require('../../models/page_object_models/login-page');
const TestResultReporter = require('../../models/test-result-reporter');

const insertNonExistingCredentials = function(page, reporter) {
    const startTime = new Date().getTime();
    const loginPage = new LoginPage(page);
    loginPage.displayLoginForm();
    loginPage.enterEmail('nonexistinguser@example.com');
    loginPage.enterPassword('wrongpassword');
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC9_ID1', 'Insert non existing credentials', 'The system detects the error', 'The system detects the error', true, 'nonexistinguser@example.com, wrongpassword', executionTime);
    }
}

const clickLoginButton = function(page, reporter) {
    const startTime = new Date().getTime();
    const loginPage = new LoginPage(page);
    loginPage.login();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC9_ID2', 'Click the Login button', 'The system displays an error message', 'The system displays an error message', true, '', executionTime);
    }
}

const verifyErrorMessage = function(page, reporter) {
    const startTime = new Date().getTime();
    const loginPage = new LoginPage(page);
    const errorMessage = loginPage.getErrorMessage();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        let passFail = false;
        let actualResults = '';
        if (errorMessage.includes('credenziali errate') || errorMessage.includes('account non esistente')) {
            passFail = true;
            actualResults = 'The system displays an error message';
        } else {
            actualResults = 'No error message displayed';
        }
        reporter.addStep('UC1_TC9_ID3', 'Verify the display of the error message', 'An error message is shown indicating wrong credentials or non existing account', actualResults, passFail, '', executionTime);
    }
    expect(errorMessage).toContain('credenziali errate') || expect(errorMessage).toContain('account non esistente');
}

test("UC1_TC9 - Login with non existing account", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC1_TC9 - Login with non existing account");

    await page.goto(process.env.E2E_BASE_URL);

    insertNonExistingCredentials(page, reporter);

    clickLoginButton(page, reporter);

    verifyErrorMessage(page, reporter);
    
    reporter.onTestEnd(test, { status: "passed" });     // status can be "passed" or "failed" 
});