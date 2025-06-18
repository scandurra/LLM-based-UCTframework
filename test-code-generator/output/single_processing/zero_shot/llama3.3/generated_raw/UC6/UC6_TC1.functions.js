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
    if (!(await page.url().includes(process.env.E2E_HOME_URL))) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC6_TC1_ID1', 'Access system as registered user', true, passFail, passFail, '', executionTime);
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
    if (!(await page.url().includes(process.env.E2E_LOGIN_URL))) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC6_TC1_ID2', 'Click logout button', true, passFail, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const confirmLogoutIntention = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Add implementation to confirm logout intention
    let passFail = true;
    if (!(await page.url().includes(process.env.E2E_LOGIN_URL))) {
        passFail = false;
    }
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC6_TC1_ID3', 'Confirm logout intention', true, passFail, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}