import { test, expect } from '@playwright/test';

import { LoginPage } from '../../models/page_object_models/login_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const insertCorrectCredentials = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.fillEmail(process.env.EMAIL);
    await loginPage.fillPassword(process.env.PASSWORD);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    if (!await loginPage.isEmailFieldVisible()) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC1_TC1_ID1', 'Insert correct credentials in the login form', 'The system accepts the credentials', `Filled email: ${process.env.EMAIL}, Filled password: *****`, passFail, `EMAIL: ${process.env.EMAIL}, PASSWORD: *****`, executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const clickLoginButton = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.clickLoginButton();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    // Add assertion to check if the user is authenticated
    try {
        await page.waitForNavigation({ url: process.env.E2E_HOME_URL });
    } catch (error) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC1_TC1_ID2', 'Click the “Login” button', 'The user is authenticated successfully', `Navigated to ${process.env.E2E_HOME_URL}`, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const verifyAuthenticationSuccessMessage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Add assertion to check if the authentication success message is displayed
    let authenticationSuccessMessage = 'Authentication successful';
    try {
        await page.waitForSelector(`text="${authenticationSuccessMessage}"`);
    } catch (error) {
        passFail = false;
    }
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    if (reporter) {
        reporter.addStep('UC1_TC1_ID3', 'Display the operation completion message with success', 'The message confirms the authentication', `Message: ${authenticationSuccessMessage}`, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}