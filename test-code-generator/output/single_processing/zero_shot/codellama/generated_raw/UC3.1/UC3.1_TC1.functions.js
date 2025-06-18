import { DateTime } from 'luxon';

import TestResultReporter from '../../models/test-result-reporter.js';

import LoginPage from '../../models/page_object_models/login_page.js';

import SidebarPage from '../../models/page_object_models/sidebar_page.js';

import CensusSheetPage from '../../models/page_object_models/census_sheet_page.js';

export const step1_AccediAllaPiattaformaEAutenticaCorrettamente = async function(loginPage, sidebarPage, reporter) {
    // Start the timer for execution time calculation
    const startTime = DateTime.now();
    
    // Call the login page object model step functions in sequence
    await loginPage.step1_LoginWithValidCredentials();
    await loginPage.step2_VerifySuccessfulLoginMessage();
    
    // End the timer and calculate execution time
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    // Add a step to the reporter object if not null
    if (reporter) {
        reporter.addStep('UC3_TC1_ID1', 'Accedi alla piattaforma e autentica correttamente', true, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await page).toHaveText('.success-message');
}

export const step2_SelezionaVoceDelMenuLateraleRelativaAlleSchedeCensimento = async function(sidebarPage, censusSheetPage, reporter) {
    // Start the timer for execution time calculation
    const startTime = DateTime.now();
    
    // Call the sidebar page object model step functions in sequence
    await sidebarPage.step1_ClickCensusCardButton();
    await sidebarPage.step2_VerifyCensusCardSectionIsVisible();
    
    // End the timer and calculate execution time
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    // Add a step to the reporter object if not null
    if (reporter) {
        reporter.addStep('UC3_TC1_ID2', 'Seleziona la voce del menù laterale relativa alle schede censimento', true, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await page).toHaveText('.census-card-section');
}
// File: UC3_TC1.spec.js
import { test, expect } from '@playwright/test';

const TestResultReporter = require("../../models/test-result-reporter.js");
const LoginPage = require("../../models/page_object_models/login_page.js");
const SidebarPage = require("../../models/page_object_models/sidebar_page.js");
const CensusSheetPage = require("../../models/page_object_models/census_sheet_page.js");

test.beforeEach(async ({ page }) => {
    // Create a new instance of TestResultReporter for each test case
    reporter = new TestResultReporter();
});

test("UC3_TC1 - Visualizzazione schede censimento con dati validi e ordinamento", async ({page, browserName}) => {
    // Set the browser name and test case title in the reporter object
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3_TC1 - Visualizzazione schede censimento con dati validi e ordinamento");
    
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