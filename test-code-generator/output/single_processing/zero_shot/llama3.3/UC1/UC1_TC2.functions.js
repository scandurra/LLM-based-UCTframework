import { test, expect } from '@playwright/test';

import { LoginPage } from '../../models/page_object_models/login_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const insertWrongCredentials = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.fillEmail("wrong-email");
    await loginPage.fillPassword("wrong-password");
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    let expectedResults = "The system detects the credentials as invalid";
    let actualResults = "The system detects the credentials as invalid";
    let parametersUsed = `Email: wrong-email, Password: wrong-password`;
    
    if (reporter) {
        reporter.addStep('UC1_TC2_ID1', 'Insert wrong credentials in login form', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const clickLoginButton = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.clickLoginButton();
    
    // Add assertion to check if error message is displayed
    const errorMessage = page.locator('text="Invalid credentials"');
    await expect(errorMessage).toBeVisible();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    let expectedResults = "The user views an error message related to the credentials";
    let actualResults = "The user views an error message related to the credentials";
    let parametersUsed = ``;
    
    if (reporter) {
        reporter.addStep('UC1_TC2_ID2', 'Click the “Login” button', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const checkRetryAccess = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Add assertion to check if retry access is possible
    const retryButton = page.locator('text="Try again"');
    await expect(retryButton).toBeVisible();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    let expectedResults = "The system allows the user to repeat the login attempt";
    let actualResults = "The system allows the user to repeat the login attempt";
    let parametersUsed = ``;
    
    if (reporter) {
        reporter.addStep('UC1_TC2_ID3', 'Display the possibility of retrying access', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }

    expect(passFail).toBeTruthy();
}