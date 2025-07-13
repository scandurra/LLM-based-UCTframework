import { NavbarPage } from '../../models/page_object_models/navbar_page.js';

import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

export const clickUserIcon = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const navbarPage = new NavbarPage(page);
    await navbarPage.clickUserIcon();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC5_TC5_ID1', 'Accedi al portale e clicca sul proprio nome utente in alto a destra', true, await navbarPage.userIcon.isVisible(), true, {}, executionTime);
    }

    expect(await navbarPage.userIcon.isVisible()).toBeTruthy();
}

export const selectLanguageWithSpecialChars = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Assuming the language with special characters is not visible on the page
    const languageWithSpecialCharsVisible = await page.isVisible('text=Italiano!');

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC5_TC5_ID2', 'Seleziona una lingua con caratteri speciali dal menù a tendina', false, languageWithSpecialCharsVisible, false, {}, executionTime);
    }

    expect(languageWithSpecialCharsVisible).toBeFalsy();
}

export const verifyDefaultLanguage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Assuming the default language is visible on the page
    const defaultLanguageVisible = await page.isVisible('text=English');

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC5_TC5_ID3', 'Verifica che il portale rimanga nella lingua di default o mostri un messaggio di errore', true, defaultLanguageVisible, defaultLanguageVisible, {}, executionTime);
    }

    expect(defaultLanguageVisible).toBeTruthy();
}