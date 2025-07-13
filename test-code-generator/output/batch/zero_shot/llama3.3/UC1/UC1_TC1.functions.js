import { LoginPage } from '../../models/page_object_models/login_page.js';

import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

export const fillCorrectCredentials = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.fillEmail(process.env.EMAIL);
    await loginPage.fillPassword(process.env.PASSWORD);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC1_ID1', 'Inserisci le credenziali corrette nel form di login', true, true, true, { email: process.env.EMAIL, password: process.env.PASSWORD }, executionTime);
    }

    expect(await loginPage.isEmailFieldVisible()).toBeTruthy();
}

export const clickLoginButton = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.clickLoginButton();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC1_ID2', 'Clicca il tasto “Login”', true, true, true, {}, executionTime);
    }

    expect(await page.url()).toBe(process.env.E2E_DASHBOARD_URL);
}

export const verifySuccessMessage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Assuming the success message is visible on the dashboard page
    const successMessage = await page.isVisible('text=Login successful');

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC1_ID3', 'Visualizza il messaggio di operazione completata con successo', true, successMessage, successMessage, {}, executionTime);
    }

    expect(successMessage).toBeTruthy();
}