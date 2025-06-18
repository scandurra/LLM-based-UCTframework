import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { LoginPage } from '../../models/page_object_models/login_page.js';

import { NavbarPage } from '../../models/page_object_models/navbar_page.js';

// Step 1
export const loginAsRegisteredUser = async function(page, reporter) {
    const startTime = new Date().getTime();
    const loginPage = new LoginPage(page);
    await insertCorrectCredentials(page, null);
    await clickLoginButton(page, null);
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC6_TC1_ID1', 'Accedi al sistema come utente registrato', 'La dashboard dell’utente viene visualizzata', 'La dashboard dell’utente viene visualizzata', true, {}, executionTime);
    }
}

// Step 2
export const clickLogoutButton = async function(page, reporter) {
    const startTime = new Date().getTime();
    const navbarPage = new NavbarPage(page);
    await navbarPage.clickUserIcon();
    await navbarPage.clickLogout();
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC6_TC1_ID2', 'Clicca sul proprio nome utente in alto a destra e seleziona il tasto “Logout”', 'Il processo di logout inizia', 'Il processo di logout inizia', true, {}, executionTime);
    }
}

// Step 3
export const confirmLogout = async function(page, reporter) {
    const startTime = new Date().getTime();
    let passFail = false;
    await page.waitForSelector('success-message');
    if (await page.$eval('success-message', el => el.innerText)) {
        passFail = true;
    }
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC6_TC1_ID3', 'Conferma l’intenzione di effettuare il logout', 'Un messaggio di successo conferma la disconnessione', passFail ? "Il processo di logout è avvenuto con successo" : "Non è stato visualizzato il messaggio", true, {}, executionTime);
    }

    expect(passFail).toBeTruthy();
}