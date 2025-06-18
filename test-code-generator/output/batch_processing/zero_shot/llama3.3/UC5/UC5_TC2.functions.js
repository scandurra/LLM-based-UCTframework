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
        reporter.addStep('UC5_TC2_ID1', 'Accedi al portale e clicca sul proprio nome utente in alto a destra', true, await navbarPage.userIcon.isVisible(), true, {}, executionTime);
    }

    expect(await navbarPage.userIcon.isVisible()).toBeTruthy();
}

export const selectEnglishLanguage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const navbarPage = new NavbarPage(page);
    await navbarPage.selectEnglishLanguage();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC5_TC2_ID2', 'Seleziona la lingua inglese dal menù a tendina', true, await navbarPage.isEnglishLanguageSelected(), true, {}, executionTime);
    }

    expect(await navbarPage.isEnglishLanguageSelected()).toBeTruthy();
}

export const verifyEnglishLanguage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Assuming the english language is visible on the page
    const englishLanguageVisible = await page.isVisible('text=English');

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC5_TC2_ID3', 'Verifica che dopo il ricaricamento della pagina, il portale sia visualizzato in inglese', true, englishLanguageVisible, englishLanguageVisible, {}, executionTime);
    }

    expect(englishLanguageVisible).toBeTruthy();
}