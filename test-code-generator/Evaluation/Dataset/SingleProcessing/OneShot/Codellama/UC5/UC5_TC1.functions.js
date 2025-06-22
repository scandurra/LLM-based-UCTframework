import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { NavbarPage } from '../../models/page_object_models/navbar_page.js';

// Step 1
export const accessUserMenu = async function(page, reporter) {
    const startTime = new Date().getTime();
    const navbarPage = new NavbarPage(page);
    await navbarPage.clickUserIcon();
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC5_TC1_ID1', 'Accedi al portale e clicca sul proprio nome utente in alto a destra', 'Il menù appare correttamente', 'Il menù appare correttamente', true, {}, executionTime);
    }
}

// Step 2
export const selectItalianLanguage = async function(page, reporter) {
    const startTime = new Date().getTime();
    const navbarPage = new NavbarPage(page);
    await navbarPage.selectItalianLanguage();
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC5_TC1_ID2', 'Seleziona la lingua italiana dal menù a tendina', 'La selezione viene accettata', 'La selezione viene accettata', true, {}, executionTime);
    }
}

// Step 3
export const verifyItalianLanguage = async function(page, reporter) {
    const startTime = new Date().getTime();
    let passFail = false;
    await page.waitForSelector('italiano-flag');
    if (await page.$eval('italiano-flag', el => el.innerText)) {
        passFail = true;
    }
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC5_TC1_ID3', 'Verifica che dopo il ricaricamento della pagina, il portale sia visualizzato in italiano', 'Il portale è completamente tradotto in italiano', passFail ? "Il portale è completamente tradotto in italiano" : "Non è stato visualizzato il portale tradotto", true, {}, executionTime);
    }

    expect(passFail).toBeTruthy();
}