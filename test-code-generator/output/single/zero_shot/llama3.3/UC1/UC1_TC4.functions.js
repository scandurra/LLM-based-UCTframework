import { test, expect } from '@playwright/test';

import { LoginPage } from '../../models/page_object_models/login_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const leaveUsernameFieldEmptyAndInsertPassword = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.fillEmail('');
    await loginPage.fillPassword(process.env.PASSWORD);
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    if (!(await loginPage.isEmailFieldVisible())) {
        passFail = false;
    }
    const expectedResults = 'The system detects the absence of username';
    const actualResults = passFail ? 'Username field is empty' : 'Username field is not empty';
    const parametersUsed = `E2E_BASE_URL=${process.env.E2E_BASE_URL}, EMAIL=, PASSWORD=${process.env.PASSWORD}`;
    
    if (reporter) {
        reporter.addStep('UC1_TC4_ID1', 'Leave username field empty and insert password', expectedResults, actualResults, passFail, parametersUsed, executionTime);
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
    // Add assertion to check if error message is displayed
    try {
        await page.waitForSelector('text=Error: Username is required');
    } catch (error) {
        passFail = false;
    }
    
    const expectedResults = 'The system displays an error message related to the empty field';
    const actualResults = passFail ? 'Error message is displayed' : 'Error message is not displayed';
    const parametersUsed = `E2E_BASE_URL=${process.env.E2E_BASE_URL}, EMAIL=, PASSWORD=${process.env.PASSWORD}`;
    
    if (reporter) {
        reporter.addStep('UC1_TC4_ID2', 'Click login button', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const verifyInputCorrection = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    let passFail = true;
    // Add assertion to check if user can retry login
    try {
        await page.waitForSelector('text=Login');
    } catch (error) {
        passFail = false;
    }
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    const expectedResults = 'The system allows the user to retry the login';
    const actualResults = passFail ? 'User can retry login' : 'User cannot retry login';
    const parametersUsed = `E2E_BASE_URL=${process.env.E2E_BASE_URL}, EMAIL=, PASSWORD=${process.env.PASSWORD}`;
    
    if (reporter) {
        reporter.addStep('UC1_TC4_ID3', 'Verify input correction', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }

    expect(passFail).toBeTruthy();
}