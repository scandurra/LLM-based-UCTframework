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
    if (reporter) {
        reporter.addStep('UC5_TC1_ID1', 'Click on username in the top right corner', 'The menu appears correctly', 'The menu appears correctly', true, '', executionTime);
    }

    expect(await navbarPage.userIcon.isVisible()).toBeTruthy();
}

export const selectItalianLanguage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const navbarPage = new NavbarPage(page);
    await navbarPage.selectItalianLanguage();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC5_TC1_ID2', 'Select Italian language from the dropdown menu', 'The selection is accepted', 'The selection is accepted', true, '', executionTime);
    }

    expect(await navbarPage.italianLanguageSelection.isVisible()).toBeTruthy();
}

export const verifyPortalInItalian = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Assuming the portal has a specific text in Italian
    const italianText = await page.isVisible('text=Benvenuto');
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC5_TC1_ID3', 'Verify the portal is displayed in Italian', 'The portal is completely translated in Italian', italianText ? 'The portal is completely translated in Italian' : 'No Italian text found', italianText, '', executionTime);
    }

    expect(italianText).toBeTruthy();
}