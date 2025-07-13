import { LoginPage } from '../../models/page_object_models/login_page.js';

import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

export const fillNewPassword = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.fillEmail(process.env.EMAIL);
    await loginPage.fillPassword('new-password');

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC3_ID1', 'Inserisci la nuova password richiesta al primo accesso', true, true, true, { email: process.env.EMAIL, password: 'new-password' }, executionTime);
    }

    expect(await loginPage.isEmailFieldVisible()).toBeTruthy();
}

export const confirmNewPassword = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.fillPassword('new-password');
    await loginPage.clickLoginButton();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC3_ID2', 'Conferma la nuova password', true, true, true, {}, executionTime);
    }

    expect(await page.url()).toBe(process.env.E2E_DASHBOARD_URL);
}

export const verifySuccessMessageNewPassword = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Assuming the success message is visible on the dashboard page
    const successMessage = await page.isVisible('text=Password changed successfully');

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC3_ID3', 'Visualizza il messaggio di operazione completata con successo', true, successMessage, successMessage, {}, executionTime);
    }

    expect(successMessage).toBeTruthy();
}