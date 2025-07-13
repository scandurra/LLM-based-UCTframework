// Import necessary libraries and page object models
import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import LoginPage from '../../models/page_object_models/login_page.js';

// Initialize the reporter object
const reporter = new TestResultReporter();

// Define the test case
test("UC1_TC1 - Login con credenziali valide", async ({ page, browserName }) => {
    // Set the browser name and test case title in the reporter
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC1_TC1", "Login con credenziali valide");
    
    // Initialize the LoginPage object
    const loginPage = new LoginPage(page);
    
    // Call step functions in sequence
    await step1_FillCredentials(loginPage, reporter);
    await step2_ClickLoginButton(loginPage, reporter);
    await step3_VerifySuccessMessage(loginPage, reporter);
    
    // Set the test status as passed and end the test
    reporter.onTestEnd(test, { status: "passed" });
});