import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { LoginPage } from '../../models/page_object_models/login_page.js';

import { NavbarPage } from '../../models/page_object_models/navbar_page.js';

// Step 1
export const navigateToLoginPage = async function(page, reporter) {
    const loginPage = new LoginPage(page);
    
    let startTime = Date.now();
    await page.goto("https://www.example.com/login");
    let endTime = Date.now();
    const executionTime = endTime - startTime;
    
    if (reporter) {
        reporter.addStep('UC6_TC1_ID1', 'Accedi al sistema come utente registrato', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}

// Step 2
export const clickLogoutButton = async function(page, reporter) {
    const navbarPage = new NavbarPage(page);
    
    let startTime = Date.now();
    await navbarPage.clickUserIcon();
    await page.waitForSelector('logout-button');
    await page.click('logout-button');
    let endTime = Date.now();
    const executionTime = endTime - startTime;
    
    if (reporter) {
        reporter.addStep('UC6_TC1_ID2', 'Clicca sul proprio nome utente in alto a destra e seleziona il tasto “Logout”', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}

// Step 3
export const confirmLogout = async function(page, reporter) {
    let startTime = Date.now();
    await page.waitForSelector('success-message');
    let endTime = Date.now();
    const executionTime = endTime - startTime;
    
    if (reporter) {
        reporter.addStep('UC6_TC1_ID3', 'Conferma l’intenzione di effettuare il logout', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}