import { NavbarPage } from '../../models/page_object_models/navbar_page.js';

import { fillCorrectCredentials, clickLoginButton, verifySuccessMessage } from '../UC1/UC1_TC1.functions.js';

export const loginFromDifferentDevice = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Login from different device
    await page.goto(process.env.E2E_BASE_URL);
    await fillCorrectCredentials(page, null);
    await clickLoginButton(page, null);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC6_TC5_ID1', 'Accedi al sistema da un dispositivo diverso', true, page.url() === process.env.E2E_DASHBOARD_URL, true, {}, executionTime);
    }

    expect(page.url()).toBe(process.env.E2E_DASHBOARD_URL);
}

export const tryToLogoutFromDifferentDevice = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Try to logout from different device
    const navbarPage = new NavbarPage(page);
    await navbarPage.clickUserIcon();
    await navbarPage.clickLogout();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC6_TC5_ID2', 'Tenta di eseguire il logout da un dispositivo diverso', true, page.url() === process.env.E2E_LOGIN_URL, true, {}, executionTime);
    }

    expect(page.url()).toBe(process.env.E2E_LOGIN_URL);
}