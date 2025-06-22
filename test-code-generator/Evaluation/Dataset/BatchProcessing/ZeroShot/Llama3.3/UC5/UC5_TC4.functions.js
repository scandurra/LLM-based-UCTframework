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
        reporter.addStep('UC5_TC4_ID1', 'Accedi al portale e clicca sul proprio nome utente in alto a destra', true, await navbarPage.userIcon.isVisible(), true, {}, executionTime);
    }

    expect(await navbarPage.userIcon.isVisible()).toBeTruthy();
}

export const selectLanguage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const navbarPage = new NavbarPage(page);
    await navbarPage.selectItalianLanguage();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC5_TC4_ID2', 'Seleziona una lingua dal menù a tendina', true, await navbarPage.isEnglishLanguageSelected(), false, {}, executionTime);
    }

    expect(await navbarPage.isEnglishLanguageSelected()).toBeFalsy();
}

export const verifyLanguage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Assuming the language is visible on the page
    const languageVisible = await page.isVisible('text=Italiano');

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC5_TC4_ID3', 'Verifica che il portale rimanga nella lingua selezionata anche dopo più cambi', true, languageVisible, languageVisible, {}, executionTime);
    }

    expect(languageVisible).toBeTruthy();
}

export const repeatLanguageSelection = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const navbarPage = new NavbarPage(page);
    await navbarPage.selectItalianLanguage();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC5_TC4_ID4', 'Seleziona nuovamente la lingua dopo il ricaricamento della pagina', true, await navbarPage.isEnglishLanguageSelected(), false, {}, executionTime);
    }

    expect(await navbarPage.isEnglishLanguageSelected()).toBeFalsy();
}