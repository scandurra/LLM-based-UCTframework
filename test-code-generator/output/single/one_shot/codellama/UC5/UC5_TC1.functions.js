import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { NavbarPage } from '../../models/page_object_models/navbar_page.js';

// Step 1
export const accessUserMenu = async function(page, reporter) {
    const navbarPage = new NavbarPage(page);
    
    let startTime = Date.now();
    await navbarPage.clickUserIcon();
    let endTime = Date.now();
    const executionTime = endTime - startTime;
    
    if (reporter) {
        reporter.addStep('UC5_TC1_ID1', 'Accedi al portale e clicca sul proprio nome utente in alto a destra', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}

// Step 2
export const selectItalianLanguage = async function(page, reporter) {
    const navbarPage = new NavbarPage(page);
    
    let startTime = Date.now();
    await navbarPage.selectItalianLanguage();
    let endTime = Date.now();
    const executionTime = endTime - startTime;
    
    if (reporter) {
        reporter.addStep('UC5_TC1_ID2', 'Seleziona la lingua italiana dal menù a tendina', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}

// Step 3
export const verifyItalianLanguage = async function(page, reporter) {
    let startTime = Date.now();
    await page.waitForSelector('italiano-flag');
    let endTime = Date.now();
    const executionTime = endTime - startTime;
    
    if (reporter) {
        reporter.addStep('UC5_TC1_ID3', 'Verifica che dopo il ricaricamento della pagina, il portale sia visualizzato in italiano', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}