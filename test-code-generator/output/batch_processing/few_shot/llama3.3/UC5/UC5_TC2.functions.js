import { test, expect } from '@playwright/test';

import { NavbarPage } from '../../models/page_object_models/navbar_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const clickUserIcon = async function(page, reporter) {
    const startTime = new Date().getTime();
    const navbarPage = new NavbarPage(page);
    await navbarPage.clickUserIcon();
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC5_TC2_ID1', 'Accedi al portale e clicca sul proprio nome utente in alto a destra', 'Il menù appare correttamente', 'Il menù è stato visualizzato', true, {}, executionTime);
    }
}

export const selectEnglishLanguage = async function(page, reporter) {
    const startTime = new Date().getTime();
    const navbarPage = new NavbarPage(page);
    await navbarPage.selectEnglishLanguage();
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC5_TC2_ID2', 'Seleziona la lingua inglese dal menù a tendina', 'La selezione viene accettata', 'La lingua inglese è stata selezionata', true, {}, executionTime);
    }
}

export const verifyEnglishLanguage = async function(page, reporter) {
    const startTime = new Date().getTime();
    const navbarPage = new NavbarPage(page);
    const isEnglishSelected = await navbarPage.isEnglishLanguageSelected();
    expect(isEnglishSelected).toBeTruthy(); 
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC5_TC2_ID3', 'Verifica che dopo il ricaricamento della pagina, il portale sia visualizzato in inglese', 'Il portale è completamente tradotto in inglese', 'Il portale è stato visualizzato in inglese', true, {}, executionTime);
    }
}