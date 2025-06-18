// Import necessary libraries and page object models
import { DateTime } from 'luxon';

import TestResultReporter from '../../models/test-result-reporter.js';

import LoginPage from '../../models/page_object_models/login_page.js';

export const step1_FillCredentials = async function (loginPage, reporter) {
    // Start the timer for execution time calculation
    const startTime = DateTime.now();
    
    // Fill in the email and password fields with valid credentials
    await loginPage.fillEmail(EMAIL);
    await loginPage.fillPassword(PASSWORD);
    
    // End the timer and calculate the execution time
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    // Add a step to the reporter if it's not null
    if (reporter) {
        reporter.addStep('UC1_TC1_ID1', 'Inserisci le credenziali corrette nel form di login', true, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await loginPage.emailInput.value()).toBe(EMAIL);
    expect(await loginPage.passwordInput.value()).toBe(PASSWORD);
}

export const step2_ClickLoginButton = async function (loginPage, reporter) {
    // Start the timer for execution time calculation
    const startTime = DateTime.now();
    
    // Click on the Login button
    await loginPage.clickLoginButton();
    
    // End the timer and calculate the execution time
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    // Add a step to the reporter if it's not null
    if (reporter) {
        reporter.addStep('UC1_TC1_ID2', 'Clicca il tasto “Login”', true, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await loginPage.isEmailFieldVisible()).toBeTruthy();
}

export const step3_VerifySuccessMessage = async function (loginPage, reporter) {
    // Start the timer for execution time calculation
    const startTime = DateTime.now();
    
    // Verify that a success message is displayed
    await expect(page).toHaveText('Login successful!');
    
    // End the timer and calculate the execution time
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    // Add a step to the reporter if it's not null
    if (reporter) {
        reporter.addStep('UC1_TC1_ID3', 'Visualizza il messaggio di operazione completata con successo', true, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await page.innerText('.success-message')).toBe('Login successful!');
}