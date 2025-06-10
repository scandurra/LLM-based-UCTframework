import { test, expect } from '@playwright/test';

import { LoginPage } from '../../models/page_object_models/login_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const insertWrongCredentials = async function(page, reporter) {
    const loginPage = new LoginPage(page);
    const startTime = new Date().getTime();
    
    await loginPage.fillEmail("wrong-email");
    await loginPage.fillPassword("wrong-password");
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC2_ID1', 'Insert wrong credentials in the login form', true, await loginPage.isEmailFieldVisible(), true, "wrong-email, wrong-password", executionTime);
    }

    expect(await loginPage.isEmailFieldVisible()).toBeTruthy();
}

export const clickLoginButton = async function(page, reporter) {
    const loginPage = new LoginPage(page);
    const startTime = new Date().getTime();
    
    await loginPage.clickLoginButton();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC2_ID2', 'Click the “Login” button', true, true, true, "", executionTime);
    }

    // Add assertion to check error message is displayed
    expect(await page.isVisible('text="Invalid credentials"')).toBeTruthy();
}

export const verifyRetryOption = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Add assertion to check retry option is available
    expect(await page.isVisible('text="Try again"')).toBeTruthy();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC2_ID3', 'Verify retry option is available', true, true, true, "", executionTime);
    }
}