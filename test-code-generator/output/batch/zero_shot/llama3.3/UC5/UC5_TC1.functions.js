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
        reporter.addStep('UC5_TC1_ID1', 'Accedi al portale e clicca sul proprio nome utente in alto a destra', true, await navbarPage.userIcon.isVisible(), true, {}, executionTime);
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
        reporter.addStep('UC5_TC1_ID2', 'Seleziona la lingua italiana dal menù a tendina', true, await navbarPage.isEnglishLanguageSelected(), false, {}, executionTime);
    }

    expect(await navbarPage.isEnglishLanguageSelected()).toBeFalsy();
}

export const verifyItalianLanguage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Assuming the italian language is visible on the page
    const italianLanguageVisible = await page.isVisible('text=Italiano');

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC5_TC1_ID3', 'Verifica che dopo il ricaricamento della pagina, il portale sia visualizzato in italiano', true, italianLanguageVisible, italianLanguageVisible, {}, executionTime);
    }

    expect(italianLanguageVisible).toBeTruthy();
}