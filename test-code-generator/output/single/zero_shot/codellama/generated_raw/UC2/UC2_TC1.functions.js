// Import necessary libraries and page object models
import { DateTime } from 'luxon';

import TestResultReporter from '../../models/test-result-reporter.js';

import LoginPage from '../../models/page_object_models/login_page.js';

import SidebarPage from '../../models/page_object_models/sidebar_page.js';

export const step1_LoginAsRegisteredUser = async function (loginPage, sidebarPage, reporter) {
    // Start the timer for execution time calculation
    const startTime = DateTime.now();
    
    // Fill in the email and password fields with valid credentials
    await loginPage.fillEmail(EMAIL);
    await loginPage.fillPassword(PASSWORD);
    
    // Click on the Login button
    await loginPage.clickLoginButton();
    
    // Verify that the home page is visible
    await expect(page).toHaveText('Welcome to the platform!');
    
    // End the timer and calculate the execution time
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    // Add a step to the reporter if it's not null
    if (reporter) {
        reporter.addStep('UC2_TC1_ID1', 'Accedi alla piattaforma come utente registrato', true, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await page.innerText('.home-page')).toBe('Welcome to the platform!');
}

export const step2_OpenDashboardSection = async function (sidebarPage, reporter) {
    // Start the timer for execution time calculation
    const startTime = DateTime.now();
    
    // Click on the Dashboard link in the sidebar menu
    await sidebarPage.clickDashboardLink();
    
    // Verify that the dashboard section is visible
    await expect(page).toHaveText('Dashboard Section');
    
    // End the timer and calculate the execution time
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    // Add a step to the reporter if it's not null
    if (reporter) {
        reporter.addStep('UC2_TC1_ID2', 'Seleziona la voce di menù relativa alla dashboard', true, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await page.innerText('.dashboard-section')).toBe('Dashboard Section');
}