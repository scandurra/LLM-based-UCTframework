import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import LoginPage from '../../models/page_object_models/login_page.js';

import SidebarPage from '../../models/page_object_models/sidebar_page.js';

// Initialize the reporter object
const reporter = new TestResultReporter();

// Define the test case
test("UC2_TC1 - Apertura della dashboard con utente autorizzato", async ({ page, browserName }) => {
    // Set the browser name and test case title in the reporter
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2_TC1", "Apertura della dashboard con utente autorizzato");
    
    // Initialize the LoginPage and SidebarPage objects
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    
    // Call step functions in sequence
    await step1_LoginAsRegisteredUser(loginPage, sidebarPage, reporter);
    await step2_OpenDashboardSection(sidebarPage, reporter);
    
    // Set the test status as passed and end the test
    reporter.onTestEnd(test, { status: "passed" });
});