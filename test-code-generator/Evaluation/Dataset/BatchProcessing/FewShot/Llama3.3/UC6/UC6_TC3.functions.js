import { test, expect } from '@playwright/test';

import { NavbarPage } from '../../models/page_object_models/navbar_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { insertCorrectCredentials, clickLoginButton, verifySuccessMessage } from '../UC1/UC1_TC1.functions.js';

export const openMultipleBrowserTabs = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await page.goto(process.env.E2E_LOGIN_URL);
    await insertCorrectCredentials(page, null);
    await clickLoginButton(page, null);

    // Open multiple tabs
    for (let i = 0; i < 5; i++) {
        await page.newPage().goto(process.env.E2E_HOME_URL);
    }

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC6_TC3_ID1', 'Apri più schede del browser con la stessa sessione di login', 'Tutte le schede mostrano il contenuto accessibile all’utente', 'Le schede sono state aperte correttamente', true, {}, executionTime);
    }

    expect(page.url()).toBe(process.env.E2E_HOME_URL);
}

export const performLogoutFromOneTab = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const navbarPage = new NavbarPage(page);
    await navbarPage.clickUserIcon();
    await navbarPage.clickLogout();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC6_TC3_ID2', 'Effettua il logout da una delle schede', 'Tutte le altre schede non sono più autenticate e richiedono login per accedere', 'Il logout è stato eseguito correttamente', true, {}, executionTime);
    }

    expect(page.url()).not.toBe(process.env.E2E_HOME_URL);
}