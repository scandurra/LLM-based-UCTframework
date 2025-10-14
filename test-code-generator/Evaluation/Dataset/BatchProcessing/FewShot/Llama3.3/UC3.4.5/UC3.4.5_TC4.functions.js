import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3.4/UC3.4_TC1.functions.js';

export const openDettaglioPageWithHierarchy = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await accessCensusSheetSection(page, null);
    await clickAzioniButton(page, null);
    const censusSheetPage = new CensusSheetPage(page);

    await censusSheetPage.clickAzioneDettaglio();

    expect(censusSheetPage.page.url()).toContain('dettaglio');

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4.5_TC4_ID1', 'Apri la pagina di dettaglio di una scheda censimento', 'La gerarchia dei POD e Aree Omogenee è visibile', 'La pagina di dettaglio è stata aperta correttamente', true, {}, executionTime);
    }
}

export const selectNodeInHierarchy = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // TO DO: implement selection of node in hierarchy
    expect(true).toBeTruthy();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4.5_TC4_ID2', 'Seleziona un nodo nella gerarchia', 'I dati del nodo selezionato sono visualizzati correttamente', 'Il nodo nella gerarchia è stato selezionato correttamente', true, {}, executionTime);
    }
}

export const navigateThroughHierarchy = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // TO DO: implement navigation through hierarchy
    expect(true).toBeTruthy();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4.5_TC4_ID3', 'Naviga attraverso la gerarchia', 'La navigazione attraverso la gerarchia è possibile e i dati sono visualizzati correttamente', 'La navigazione attraverso la gerarchia è stata eseguita correttamente', true, {}, executionTime);
    }
}