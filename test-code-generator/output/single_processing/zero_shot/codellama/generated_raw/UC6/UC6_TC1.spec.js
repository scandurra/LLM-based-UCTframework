// Import necessary libraries and page object models
import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import LoginPage from '../../models/page_object_models/login_page.js';

import NavbarPage from '../../models/page_object_models/navbar_page.js';

// Initialize the reporter object
const reporter = new TestResultReporter();

// Define the test case
test("UC6_TC1 - Logout utente con successo", async ({ page, browserName }) => {
    // Set the browser name and test case title in the reporter
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC6_TC1", "Logout utente con successo");
    
    // Initialize the LoginPage and NavbarPage objects
    const loginPage = new LoginPage(page);
    const navbarPage = new NavbarPage(page);
    
    // Call step functions in sequence
    await step1_LoginAsRegisteredUser(loginPage, navbarPage, reporter);
    await step2_ClickLogoutButton(navbarPage, reporter);
    await step3_ConfirmLogout(loginPage, reporter);
    
    // Set the test status as passed and end the test
    reporter.onTestEnd(test, { status: "passed" });
});