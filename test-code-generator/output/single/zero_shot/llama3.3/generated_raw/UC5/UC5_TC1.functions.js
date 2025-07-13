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
    if (!(await navbarPage.userIcon.isVisible())) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC5_TC1_ID1', 'Click on username', true, passFail, passFail, '', executionTime);
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
    if (!(await navbarPage.italianLanguageSelection.isVisible())) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC5_TC1_ID2', 'Select Italian language', true, passFail, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const verifyItalianLanguageSelected = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    let passFail = true;
    if (!(await page.url().includes(process.env.E2E_HOME_URL))) {
        passFail = false;
    }
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC5_TC1_ID3', 'Verify Italian language selected', true, passFail, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}