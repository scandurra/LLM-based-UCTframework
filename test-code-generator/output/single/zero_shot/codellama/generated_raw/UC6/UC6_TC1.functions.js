// Import necessary libraries and page object models
import { DateTime } from 'luxon';

import TestResultReporter from '../../models/test-result-reporter.js';

import LoginPage from '../../models/page_object_models/login_page.js';

import NavbarPage from '../../models/page_object_models/navbar_page.js';

export const step1_LoginAsRegisteredUser = async function (loginPage, navbarPage, reporter) {
    // Start the timer for execution time calculation
    const startTime = DateTime.now();
    
    // Fill in the email and password fields with valid credentials
    await loginPage.fillEmail(EMAIL);
    await loginPage.fillPassword(PASSWORD);
    
    // Click on the Login button
    await loginPage.clickLoginButton();
    
    // Verify that the user is logged in by checking if the user icon is visible
    const userIconIsVisible = await navbarPage.userIcon.isVisible();
    
    // End the timer and calculate the execution time
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    // Add a step to the reporter if it's not null
    if (reporter) {
        reporter.addStep('UC6_TC1_ID1', 'Accedi al sistema come utente registrato', userIconIsVisible, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await loginPage.isEmailFieldVisible()).toBeTruthy();
}

export const step2_ClickLogoutButton = async function (navbarPage, reporter) {
    // Start the timer for execution time calculation
    const startTime = DateTime.now();
    
    // Click on the user icon to open the dropdown menu
    await navbarPage.clickUserIcon();
    
    // Click on the Logout button
    await navbarPage.logoutSelection.click();
    
    // End the timer and calculate the execution time
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    // Add a step to the reporter if it's not null
    if (reporter) {
        reporter.addStep('UC6_TC1_ID2', 'Clicca sul proprio nome utente in alto a destra e seleziona il tasto “Logout”', true, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await navbarPage.userIcon.isVisible()).toBeTruthy();
}

export const step3_ConfirmLogout = async function (loginPage, reporter) {
    // Start the timer for execution time calculation
    const startTime = DateTime.now();
    
    // Verify that a success message is displayed
    await expect(page).toHaveText('Logout successful!');
    
    // End the timer and calculate the execution time
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    // Add a step to the reporter if it's not null
    if (reporter) {
        reporter.addStep('UC6_TC1_ID3', 'Conferma l’intenzione di effettuare il logout', true, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await page.innerText('.success-message')).toBe('Logout successful!');
}