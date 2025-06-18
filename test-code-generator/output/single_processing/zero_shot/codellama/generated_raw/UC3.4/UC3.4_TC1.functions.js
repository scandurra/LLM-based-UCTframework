import { DateTime } from 'luxon';

import TestResultReporter from '../../models/test-result-reporter.js';


import LoginPage from '../../models/page_object_models/login_page.js';


import SidebarPage from '../../models/page_object_models/sidebar_page.js';


import CensusSheetPage from '../../models/page_object_models/census_sheet_page.js';

export const step1_AccediAllaPiattaformaEAutenticaCorrettamente = async function (loginPage, sidebarPage, reporter) {
    // Start the timer for execution time calculation
    const startTime = DateTime.now();
    
    // Fill in the email and password fields with valid credentials
    await loginPage.setEmail('valid_email@example.com');
    await loginPage.setPassword('valid_password');
    
    // Click on the Login button
    await loginPage.clickLoginButton();
    
    // Wait for the Sidebar menu to appear
    await sidebarPage.waitForSidebarMenuToAppear();
    
    // End the timer and calculate the execution time
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    // Add a step to the reporter object if it's not null
    if (reporter) {
        reporter.addStep('UC3_TC1_ID1', 'Accedi alla piattaforma e autentica correttamente', true, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await page).toHaveText('.success-message');
}

export const step2_SelezionaVoceDelMenuLateraleRelativaAlleSchedeCensimento = async function (sidebarPage, censusSheetPage, reporter) {
    // Start the timer for execution time calculation
    const startTime = DateTime.now();
    
    // Click on the Census Card section in the Sidebar menu
    await sidebarPage.clickCensusCardButton();
    
    // Wait for the Census Sheet page to appear
    await censusSheetPage.waitForCensusSheetPageToAppear();
    
    // End the timer and calculate the execution time
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    // Add a step to the reporter object if it's not null
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
import CensusSheetPage from '../../models/page_object_models/census_sheet_page.js';

// Initialize the reporter object
let reporter;

test.beforeEach(async ({ page }) => {
    // Create a new instance of TestResultReporter for each test case
    reporter = new TestResultReporter();
});

test("UC3_TC1 - Apertura interfaccia gestione schede censimento con successo", async ({page, browserName}) => {
    // Set the browser name and test case title in the reporter object
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3_TC1 - Apertura interfaccia gestione schede censimento con successo");
    
    // Create a new instance of LoginPage, SidebarPage and CensusSheetPage for each test case
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    const censusSheetPage = new CensusSheetPage(page);

    // Call the step functions in sequence
    await step1_AccediAllaPiattaformaEAutenticaCorrettamente(loginPage, sidebarPage, reporter);
    await step2_SelezionaVoceDelMenuLateraleRelativaAlleSchedeCensimento(sidebarPage, censusSheetPage, reporter);
    
    // Set the test status in the reporter object
    reporter.onTestEnd(test, { status: "passed" }); 
});