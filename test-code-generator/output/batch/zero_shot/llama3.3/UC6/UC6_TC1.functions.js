import { NavbarPage } from '../../models/page_object_models/navbar_page.js';

import { fillCorrectCredentials, clickLoginButton, verifySuccessMessage } from '../UC1/UC1_TC1.functions.js';

export const accessSystemAsRegisteredUser = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await fillCorrectCredentials(page, null);
    await clickLoginButton(page, null);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC6_TC1_ID1', 'Accedi al sistema come utente registrato', true, page.url() === process.env.E2E_DASHBOARD_URL, true, {}, executionTime);
    }

    expect(page.url()).toBe(process.env.E2E_DASHBOARD_URL);
}

export const clickLogoutButton = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const navbarPage = new NavbarPage(page);
    await navbarPage.clickUserIcon();
    await navbarPage.clickLogout();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC6_TC1_ID2', 'Clicca sul proprio nome utente in alto a destra e seleziona il tasto “Logout”', true, page.url() === process.env.E2E_LOGIN_URL, true, {}, executionTime);
    }

    expect(page.url()).toBe(process.env.E2E_LOGIN_URL);
}

export const verifyLogoutSuccessMessage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const logoutSuccessMessage = await page.isVisible('text=Logout successful');

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC6_TC1_ID3', 'Conferma l’intenzione di effettuare il logout', true, logoutSuccessMessage, logoutSuccessMessage, {}, executionTime);
    }

    expect(logoutSuccessMessage).toBeTruthy();
}