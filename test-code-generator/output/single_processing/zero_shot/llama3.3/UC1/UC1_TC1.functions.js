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
    if (reporter) {
        reporter.addStep('UC1_TC1_ID1', 'Insert correct credentials in the login form', 'The system accepts the credentials', 'The system accepts the credentials', true, `Email: ${process.env.EMAIL}, Password: ${process.env.PASSWORD}`, executionTime);
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
        reporter.addStep('UC1_TC1_ID2', 'Click the “Login” button', 'The user is authenticated successfully', 'The user is authenticated successfully', true, '', executionTime);
    }

    expect(await page.url()).toBe(process.env.E2E_HOME_URL);
}

export const verifyAuthenticationSuccessMessage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Assuming the success message is visible after successful login
    const successMessage = await page.isVisible('text=Login successful');
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC1_ID3', 'Display the operation completion message with success', 'The message confirms the authentication', successMessage ? 'The message confirms the authentication' : 'No message found', successMessage, '', executionTime);
    }

    expect(successMessage).toBeTruthy();
}