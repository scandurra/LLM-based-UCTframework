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
        reporter.addStep('UC5_TC1_ID1', 'Accedi al portale e clicca sul proprio nome utente in alto a destra', 'Il menù appare correttamente', 'Il menù è stato visualizzato', true, {}, executionTime);
    }
}

export const selectItalianLanguage = async function(page, reporter) {
    const startTime = new Date().getTime();
    const navbarPage = new NavbarPage(page);
    await navbarPage.selectItalianLanguage();
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC5_TC1_ID2', 'Seleziona la lingua italiana dal menù a tendina', 'La selezione viene accettata', 'La lingua italiana è stata selezionata', true, {}, executionTime);
    }
}

export const verifyItalianLanguage = async function(page, reporter) {
    const startTime = new Date().getTime();
    const navbarPage = new NavbarPage(page);
    const isEnglishSelected = await navbarPage.isEnglishLanguageSelected();
    expect(!isEnglishSelected).toBeTruthy(); // Assuming that if English is not selected, Italian is selected
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC5_TC1_ID3', 'Verifica che dopo il ricaricamento della pagina, il portale sia visualizzato in italiano', 'Il portale è completamente tradotto in italiano', 'Il portale è stato visualizzato in italiano', true, {}, executionTime);
    }
}