import { LoginPage } from '../../models/page_object_models/login_page.js';

import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

export const leaveUsernameEmpty = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.fillPassword(process.env.PASSWORD);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC4_ID1', 'Lascia vuoto il campo username e inserisci una password', true, true, true, { password: process.env.PASSWORD }, executionTime);
    }

    expect(await loginPage.isEmailFieldVisible()).toBeTruthy();
}

export const clickLoginButtonEmptyUsername = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.clickLoginButton();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC4_ID2', 'Clicca il tasto “Login”', true, true, true, {}, executionTime);
    }

    expect(await page.url()).not.toBe(process.env.E2E_DASHBOARD_URL);
}

export const verifyErrorMessageEmptyUsername = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Assuming the error message is visible on the login page
    const errorMessage = await page.isVisible('text=Username is required');

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC4_ID3', 'Visualizza il messaggio di errore relativo alle credenziali', true, errorMessage, errorMessage, {}, executionTime);
    }

    expect(errorMessage).toBeTruthy();
}