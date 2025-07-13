import { test, expect } from '@playwright/test';

import { NavbarPage } from '../../models/page_object_models/navbar_page.js';

import { insertCorrectCredentials, clickLoginButton, verifyAuthenticationSuccessMessage } from '../UC1/UC1_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const accessSystemAsRegisteredUser = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await insertCorrectCredentials(page, null);
    await clickLoginButton(page, null);
    await verifyAuthenticationSuccessMessage(page, null);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    try {
        await page.waitForURL(process.env.E2E_DASHBOARD_URL);
    } catch (error) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC6_TC1_ID1', 'Access the system as a registered user', 'The user dashboard is displayed', `Navigated to ${process.env.E2E_DASHBOARD_URL}`, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const clickLogoutButton = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const navbarPage = new NavbarPage(page);
    await navbarPage.clickUserIcon();
    await navbarPage.clickLogout();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    try {
        await page.waitForURL(process.env.E2E_LOGIN_URL);
    } catch (error) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC6_TC1_ID2', 'Click the logout button', 'The logout process starts', `Navigated to ${process.env.E2E_LOGIN_URL}`, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const confirmLogoutIntention = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Add assertion to check if the logout success message is displayed
    let logoutSuccessMessage = 'Logout successful';
    try {
        await page.waitForSelector(`text="${logoutSuccessMessage}"`);
    } catch (error) {
        passFail = false;
    }
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    if (reporter) {
        reporter.addStep('UC6_TC1_ID3', 'Confirm the intention to log out', 'A success message confirms the disconnection', `Message: ${logoutSuccessMessage}`, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}