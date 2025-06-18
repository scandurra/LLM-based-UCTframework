// Import necessary libraries and page object models
import { DateTime } from 'luxon';

import TestResultReporter from '../../models/test-result-reporter.js';

import LoginPage from '../../models/page_object_models/login_page.js';

// Initialize the reporter object
const reporter = new TestResultReporter();

// Define test case metadata and parameters
const E2E_BASE_URL="";
const E2E_LOGIN_URL="";
const EMAIL="";
const PASSWORD="";

// Define test case steps as functions
async function step1(page, reporter) {
    const startTime = DateTime.now();
    
    // Step implementation: Inserisci credenziali errate nel form di login
    const loginPage = new LoginPage(page);
    await loginPage.fillEmail('invalid@email.com');
    await loginPage.fillPassword('wrongpassword');
    
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC1_TC2_ID1', 'Inserisci credenziali errate nel form di login', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}

async function step2(page, reporter) {
    const startTime = DateTime.now();
    
    // Step implementation: Clicca il tasto “Login”
    await loginPage.clickLoginButton();
    
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC1_TC2_ID2', 'Clicca il tasto “Login”', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}

async function step3(page, reporter) {
    const startTime = DateTime.now();
    
    // Step implementation: Visualizza la possibilità di riprovare l’accesso
    await page.waitForSelector('[data-testid="login-error"]');
    
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC1_TC2_ID3', 'Visualizza la possibilità di riprovare l’accesso', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}