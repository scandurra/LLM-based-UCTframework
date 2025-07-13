import { LoginPage } from '../../models/page_object_models/login_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

// Step 1
export const navigateToLoginPage = async function(page, reporter) {
    let startTime = Date.now();
    await page.goto(process.env.E2E_LOGIN_URL);
    let endTime = Date.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC6_TC1_ID1', 'Navigate to login page', 'Login page loaded', 'Login page loaded', true, `E2E_LOGIN_URL: ${process.env.E2E_LOGIN_URL}`, executionTime);
    }
}

// Step 2
export const insertCorrectCredentials = async function(page, reporter) {
    const loginPage = new LoginPage(page);
    
    let startTime = Date.now();
    await loginPage.fillEmail("EMAIL");
    await loginPage.fillPassword("PASSWORD");
    let endTime = Date.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC6_TC1_ID2', 'Inserisci le credenziali corrette nel form di login', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}

// Step 3
export const clickLoginButton = async function(page, reporter) {
    const loginPage = new LoginPage(page);
    
    let startTime = Date.now();
    await loginPage.clickLoginButton();
    let endTime = Date.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC6_TC1_ID3', 'Clicca il tasto “Login”', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}

// Step 4
export const navigateToUserIcon = async function(page, reporter) {
    let startTime = Date.now();
    await page.goto(process.env.E2E_HOME_URL);
    let endTime = Date.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC6_TC1_ID4', 'Navigate to home page', 'Home page loaded', 'Home page loaded', true, `E2E_HOME_URL: ${process.env.E2E_HOME_URL}`, executionTime);
    }
}

// Step 5
export const clickUserIcon = async function(page, reporter) {
    const navbarPage = new NavbarPage(page);
    
    let startTime = Date.now();
    await navbarPage.clickUserIcon();
    let endTime = Date.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC6_TC1_ID5', 'Clicca sull\'icona utente in alto a destra', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}

// Step 6
export const clickLogoutButton = async function(page, reporter) {
    let startTime = Date.now();
    await page.click('text=" Logout"');
    let endTime = Date.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC6_TC1_ID6', 'Clicca sul tasto "Logout"', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}

// Step 7
export const confirmLogout = async function(page, reporter) {
    let startTime = Date.now();
    await page.click('text="Conferma"');
    let endTime = Date.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC6_TC1_ID7', 'Conferma il logout', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}