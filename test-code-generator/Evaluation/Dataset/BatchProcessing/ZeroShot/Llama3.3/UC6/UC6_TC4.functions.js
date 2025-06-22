import { NavbarPage } from '../../models/page_object_models/navbar_page.js';

import { fillCorrectCredentials, clickLoginButton, verifySuccessMessage } from '../UC1/UC1_TC1.functions.js';

export const waitUntilSessionExpires = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Wait until session expires
    await page.waitForTimeout(3600000); // 1 hour

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC6_TC4_ID1', 'La sessione viene considerata scaduta', true, page.url() === process.env.E2E_LOGIN_URL, true, {}, executionTime);
    }

    expect(page.url()).toBe(process.env.E2E_LOGIN_URL);
}

export const tryToLogout = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Try to logout
    await page.goto(process.env.E2E_DASHBOARD_URL);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC6_TC4_ID2', 'Tenta di effettuare il logout', true, page.url() === process.env.E2E_LOGIN_URL, true, {}, executionTime);
    }

    expect(page.url()).toBe(process.env.E2E_LOGIN_URL);
}