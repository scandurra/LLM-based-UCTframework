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
    if (!(await loginPage.isEmailFieldVisible())) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC1_TC1_ID1', 'Insert correct credentials in the login form', true, passFail, passFail, `EMAIL: ${process.env.EMAIL}, PASSWORD: ${process.env.PASSWORD}`, executionTime);
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
    if (!(await page.url().includes(process.env.E2E_HOME_URL))) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC1_TC1_ID2', 'Click the login button', true, passFail, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const verifyAuthenticationSuccessMessage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Add implementation to check for authentication success message
    let passFail = true;
    if (!(await page.url().includes(process.env.E2E_HOME_URL))) {
        passFail = false;
    }
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC1_ID3', 'Verify authentication success message', true, passFail, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}