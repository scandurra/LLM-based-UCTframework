import { LoginPage } from '../../models/page_object_models/login_page.js';

import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

export const fillIncorrectCredentials = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.fillEmail('wrong-email');
    await loginPage.fillPassword('wrong-password');

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC2_ID1', 'Inserisci credenziali errate nel form di login', true, true, true, { email: 'wrong-email', password: 'wrong-password' }, executionTime);
    }

    expect(await loginPage.isEmailFieldVisible()).toBeTruthy();
}

export const clickLoginButtonIncorrect = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.clickLoginButton();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC2_ID2', 'Clicca il tasto “Login”', true, true, true, {}, executionTime);
    }

    expect(await page.url()).not.toBe(process.env.E2E_DASHBOARD_URL);
}

export const verifyErrorMessage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Assuming the error message is visible on the login page
    const errorMessage = await page.isVisible('text=Invalid credentials');

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC2_ID3', 'Visualizza il messaggio di errore relativo alle credenziali', true, errorMessage, errorMessage, {}, executionTime);
    }

    expect(errorMessage).toBeTruthy();
}