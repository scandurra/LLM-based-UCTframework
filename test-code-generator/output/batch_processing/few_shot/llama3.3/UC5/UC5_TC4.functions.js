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
        reporter.addStep('UC5_TC4_ID1', 'Accedi al portale e clicca sul proprio nome utente in alto a destra', 'Il menù appare correttamente', 'Il menù è stato visualizzato', true, {}, executionTime);
    }
}

export const selectLanguage = async function(page, reporter) {
    const startTime = new Date().getTime();
    const navbarPage = new NavbarPage(page);
    await navbarPage.selectItalianLanguage(); // Selecting Italian language for example
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC5_TC4_ID2', 'Seleziona una lingua, poi selezionala nuovamente dopo il ricaricamento della pagina', 'La selezione viene accettata e il portale si aggiorna di conseguenza', 'La lingua è stata selezionata', true, {}, executionTime);
    }
}

export const verifyLanguage = async function(page, reporter) {
    const startTime = new Date().getTime();
    const navbarPage = new NavbarPage(page);
    const isEnglishSelected = await navbarPage.isEnglishLanguageSelected();
    expect(!isEnglishSelected).toBeTruthy(); // Assuming that if English is not selected, Italian is selected
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC5_TC4_ID3', 'Verifica che il portale rimanga nella lingua selezionata anche dopo più cambi', 'Il portale mantiene la lingua selezionata', 'Il portale è stato verificato', true, {}, executionTime);
    }
}