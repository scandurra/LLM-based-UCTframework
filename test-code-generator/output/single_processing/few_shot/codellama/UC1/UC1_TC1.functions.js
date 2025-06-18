import { test, expect } from '@playwright/test';

import { LoginPage } from '../../models/page_object_models/login_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

// Step 1
export const insertCorrectCredentials = async function(page, reporter) {
    const loginPage = new LoginPage(page);
    
    let startTime = Date.now();
    await loginPage.fillEmail("EMAIL");
    await loginPage.fillPassword("PASSWORD");
    let endTime = Date.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC1_TC1_ID1', 'Inserisci le credenziali corrette nel form di login', expectedResults, actualResults, passFail, parametersUsed, executionTime);
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
        reporter.addStep('UC1_TC1_ID2', 'Clicca il tasto “Login”', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}

// Step 3
export const verifySuccessMessage = async function(page, reporter) {
    let startTime = Date.now();
    // Verify success message is displayed
    let endTime = Date.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC1_TC1_ID3', 'Visualizza il messaggio di operazione completata con successo', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}