import { NavbarPage } from '../../models/page_object_models/navbar_page.js';

import { fillCorrectCredentials, clickLoginButton, verifySuccessMessage } from '../UC1/UC1_TC1.functions.js';

export const openMultipleBrowserTabs = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Open multiple browser tabs
    const pages = [];
    for (let i = 0; i < 5; i++) {
        const newPage = await page.context().newPage();
        pages.push(newPage);
        await newPage.goto(process.env.E2E_BASE_URL);
        await fillCorrectCredentials(newPage, null);
        await clickLoginButton(newPage, null);
    }

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC6_TC3_ID1', 'Apri più schede del browser con la stessa sessione di login', true, pages.every(p => p.url() === process.env.E2E_DASHBOARD_URL), true, {}, executionTime);
    }

    expect(pages.every(p => p.url() === process.env.E2E_DASHBOARD_URL)).toBeTruthy();
}

export const logoutFromOneTab = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const navbarPage = new NavbarPage(page);
    await navbarPage.clickUserIcon();
    await navbarPage.clickLogout();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC6_TC3_ID2', 'Effettua il logout da una delle schede', true, page.url() === process.env.E2E_LOGIN_URL, true, {}, executionTime);
    }

    expect(page.url()).toBe(process.env.E2E_LOGIN_URL);
}

export const verifyOtherTabsAreNotAuthenticated = async function(pages, reporter) {
    const startTime = new Date().getTime();
    
    // Verify other tabs are not authenticated
    for (const p of pages) {
        await p.reload();
        expect(p.url()).toBe(process.env.E2E_LOGIN_URL);
    }

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC6_TC3_ID3', 'Tutte le altre schede non sono più autenticate e richiedono login per accedere', true, pages.every(p => p.url() === process.env.E2E_LOGIN_URL), true, {}, executionTime);
    }

    expect(pages.every(p => p.url() === process.env.E2E_LOGIN_URL)).toBeTruthy();
}