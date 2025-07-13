import { test } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter';

import { loginWithWrongCredentials } from './UC1_TC2.functions';

// Create a new instance of the TestResultReporter object
const reporter = new TestResultReporter();

test("UC1_TC2 - Login con credenziali errate", async ({page, browserName}) => {
    // Set the browser name in the reporter
    reporter.setBrowserName(browserName);
    
    // Set the test case and title in the reporter
    reporter.setTestCase("UC1_TC2", "Login con credenziali errate");
    
    // Call the loginWithWrongCredentials function to execute the test steps
    await loginWithWrongCredentials(page, reporter);
    
    // Report the end of the test case and its status
    reporter.onTestEnd("UC1_TC2", { status: "passed" });
});