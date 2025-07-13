import { test, expect } from '@playwright/test';

import { LoginPage } from '../../models/page_object_models/login_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

// Step 1
export const insertWrongCredentials = async function(page, reporter) {
    const loginPage = new LoginPage(page);
    
    let startTime = Date.now();
    await loginPage.fillEmail("wrong@email.com");
    await loginPage.fillPassword("wrongpassword");
    let endTime = Date.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC1_TC2_ID1', 'Inserisci credenziali errate nel form di login', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}

// Step 2
export const clickLoginButton = async function(page, reporter) {
    const loginPage = new LoginPage(page);
    
    let startTime = Date.now();
    await loginPage.clickLoginButton();
    let endTime = Date.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC1_TC2_ID2', 'Clicca il tasto “Login”', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}

// Step 3
export const verifyErrorMessage = async function(page, reporter) {
    let startTime = Date.now();
    await page.waitForSelector('error-message');
    let endTime = Date.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC1_TC2_ID3', 'Visualizza la possibilità di riprovare l’accesso', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}