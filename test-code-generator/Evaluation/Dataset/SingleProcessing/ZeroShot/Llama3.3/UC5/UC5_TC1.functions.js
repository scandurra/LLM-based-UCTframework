import { test, expect } from '@playwright/test';

import { NavbarPage } from '../../models/page_object_models/navbar_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { insertCorrectCredentials, clickLoginButton, verifyAuthenticationSuccessMessage } from '../UC1/UC1_TC1.functions.js';

export const clickOnUsername = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const navbarPage = new NavbarPage(page);
    await navbarPage.clickUserIcon();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    try {
        await page.waitForSelector('text=" Logout"');
    } catch (error) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC5_TC1_ID1', 'Click on username in the top right corner', 'The menu appears correctly', `Menu is visible`, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const selectItalianLanguage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const navbarPage = new NavbarPage(page);
    await navbarPage.selectItalianLanguage();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    try {
        await page.waitForNavigation({ url: process.env.E2E_HOME_URL });
    } catch (error) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC5_TC1_ID2', 'Select Italian language from the dropdown menu', 'The selection is accepted', `Navigated to ${process.env.E2E_HOME_URL}`, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const verifyItalianLanguage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    let italianText = 'Benvenuto';
    try {
        await page.waitForSelector(`text="${italianText}"`);
    } catch (error) {
        passFail = false;
    }
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    if (reporter) {
        reporter.addStep('UC5_TC1_ID3', 'Verify that the portal is displayed in Italian', 'The portal is completely translated into Italian', `Text: ${italianText}`, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}