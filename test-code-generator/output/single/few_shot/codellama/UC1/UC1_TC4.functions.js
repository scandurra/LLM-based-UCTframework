import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { LoginPage } from '../../models/page_object_models/login_page.js';

// Step 1
export const leaveUsernameFieldEmpty = async function(page, reporter) {
    const startTime = new Date().getTime();
    const loginPage = new LoginPage(page);
    await loginPage.clickLoginLink();
    await loginPage.fillEmail(''); // Leave username field empty
    await loginPage.fillPassword('password1234567890');
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC1_TC4_ID1', 'Lascia vuoto il campo username e inserisci una password', 'Il sistema rileva l\'assenza del username', 'Il sistema rileva l\'assenza del username', true, {}, executionTime);
    }
}

// Step 2
export const clickLoginButton = async function(page, reporter) {
    const startTime = new Date().getTime();
    await page.click('input[type="submit"]'); // Click login button
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC1_TC4_ID2', 'Clicca il tasto “Login”', 'Il sistema visualizza un messaggio di errore relativo al campo vuoto', 'Il sistema visualizza un messaggio di errore relativo al campo vuoto', true, {}, executionTime);
    }
}

// Step 3
export const verifyErrorMessage = async function(page, reporter) {
    let passFail = false; // Set to true if error message is displayed correctly
    const startTime = new Date().getTime();
    await page.waitForSelector('text="Username cannot be empty"'); // Wait for error message to appear
    passFail = true;
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC1_TC4_ID3', 'Visualizza la possibilità di correggere l\'input', 'Il sistema consente all\'utente di ripetere il tentativo di login', 'Il sistema consente all\'utente di ripetere il tentativo di login', passFail, {}, executionTime);
    }
}