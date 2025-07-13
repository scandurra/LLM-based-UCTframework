import { DateTime } from 'luxon';

import TestResultReporter from '../../models/test-result-reporter.js';

import LoginPage from '../../models/page_object_models/login_page.js';


import SidebarPage from '../../models/page_object_models/sidebar_page.js';

export const step1_Login = async function (loginPage, reporter) {
    // Start the timer for execution time calculation
    const startTime = DateTime.now();
    
    // Fill in the email and password fields with valid credentials
    await loginPage.fillEmail(EMAIL);
    await loginPage.fillPassword(PASSWORD);
    
    // Click on the Login button
    await loginPage.clickLoginButton();
    
    // End the timer and calculate the execution time
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    // Add a step to the reporter if it's not null
    if (reporter) {
        reporter.addStep('UC3_TC1_ID1', 'Accedi alla piattaforma e autenticati correttamente', true, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await page).toHaveText('.success-message');
}

export const step2_OpenCensusCardSection = async function (sidebarPage, reporter) {
    // Start the timer for execution time calculation
    const startTime = DateTime.now();
    
    // Click on the Census Card section in the sidebar menu
    await sidebarPage.clickCensusCardButton();
    
    // End the timer and calculate the execution time
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    // Add a step to the reporter if it's not null
    if (reporter) {
        reporter.addStep('UC3_TC1_ID2', 'Seleziona la voce del menù laterale relativa alle schede censimento', true, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await page).toHaveText('.census-card-section');
}
// File: UC3_TC1.spec.js
import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import LoginPage from '../../models/page_object_models/login_page.js';
import SidebarPage from '../../models/page_object_models/sidebar_page.js';

// Initialize the reporter object
const reporter = new TestResultReporter();

test("UC3_TC1 - Apertura interfaccia gestione schede censimento con successo", async ({ page, browserName }) => {
    // Set the browser name and test case title in the reporter
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3_TC1", "Apertura interfaccia gestione schede censimento con successo");
    
    // Initialize the LoginPage object
    const loginPage = new LoginPage(page);
    
    // Call step functions in sequence
    await step1_Login(loginPage, reporter);
    await step2_OpenCensusCardSection(sidebarPage, reporter);
    
    // Set the test status as passed and end the test
    reporter.onTestEnd(test, { status: "passed" });
});