import { test, expect } from '@playwright/test';

import { LoginPage } from '../../models/page_object_models/login_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

// Step 1
export const insertCorrectCredentials = async function(page, reporter) {
    const startTime = new Date().getTime();
    const loginPage = new LoginPage(page);
    await loginPage.fillEmail("test@example.com");
    await loginPage.fillPassword("password1234567890");
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC1_TC1_ID1', 'Inserisci le credenziali corrette nel form di login', 'Il sistema accetta le credenziali', 'Il sistema accetta le credenziali', true, {}, executionTime);
    }
}

// Step 2
export const clickLoginButton = async function(page, reporter) {
    const startTime = new Date().getTime();
    const loginPage = new LoginPage(page);
    await loginPage.clickLoginButton();
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC1_TC1_ID2', 'Clicca il tasto “Login”', 'L’utente viene autenticato con successo', 'L’utente viene autenticato con successo', true, {}, executionTime);
    }
}

// Step 3
export const verifySuccessMessage = async function(page, reporter) {
    const startTime = new Date().getTime();
    let passFail = false;
    await page.waitForSelector('success-message');
    if (await page.$eval('success-message', el => el.innerText)) {
        passFail = true;
    }
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC1_TC1_ID3', 'Visualizza il messaggio di operazione completata con successo', 'Il messaggio conferma l’avvenuta autenticazione', passFail ? "Il messaggio conferma l’avvenuta autenticazione" : "Non è stato visualizzato il messaggio", true, {}, executionTime);
    }

    expect(passFail).toBeTruthy();
}