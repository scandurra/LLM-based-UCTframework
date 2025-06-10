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
    if (reporter) {
        reporter.addStep('UC6_TC1_ID1', 'Access the system as a registered user', 'The user dashboard is displayed', 'The user dashboard is displayed', true, '', executionTime);
    }

    expect(await page.url()).toBe(process.env.E2E_HOME_URL);
}

export const clickLogoutButton = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const navbarPage = new NavbarPage(page);
    await navbarPage.clickUserIcon();
    await navbarPage.clickLogout();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC6_TC1_ID2', 'Click on the username and select the “Logout” button', 'The logout process starts', 'The logout process starts', true, '', executionTime);
    }

    expect(await page.url()).not.toBe(process.env.E2E_HOME_URL);
}

export const confirmLogoutIntention = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Assuming the success message is visible after successful logout
    const successMessage = await page.isVisible('text=Logout successful');
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC6_TC1_ID3', 'Confirm the intention to log out', 'A success message confirms the disconnection', successMessage ? 'A success message confirms the disconnection' : 'No message found', successMessage, '', executionTime);
    }

    expect(successMessage).toBeTruthy();
}