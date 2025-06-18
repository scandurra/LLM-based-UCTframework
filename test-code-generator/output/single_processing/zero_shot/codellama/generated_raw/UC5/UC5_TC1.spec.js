// Import necessary libraries and page object models
import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import LoginPage from '../../models/page_object_models/login_page.js';

import NavbarPage from '../../models/page_object_models/navbar_page.js';

// Initialize the reporter object
const reporter = new TestResultReporter();

// Define the test case
test("UC5_TC1 - Selezione lingua italiana", async ({ page, browserName }) => {
    // Set the browser name and test case title in the reporter
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC5_TC1", "Selezione lingua italiana");
    
    // Initialize the LoginPage object
    const loginPage = new LoginPage(page);
    
    // Call step functions in sequence
    await step1_ClickUserIcon(navbarPage, reporter);
    await step2_SelectItalianLanguage(navbarPage, reporter);
    await step3_VerifyItalianTranslation(page, reporter);
    
    // Set the test status as passed and end the test
    reporter.onTestEnd(test, { status: "passed" });
});