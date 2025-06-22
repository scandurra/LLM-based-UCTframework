import { test, expect } from '@playwright/test';
import { timeout } from '../../playwright.config';
const TestResultReporter = require('../../models/test-result-reporter'); // Importa il reporter generico
import {loginWithoutDbSave, acceptTerms, verifyLogin} from '../UC1/UC001.functions';
const { navigateToCensusSheet } = require('./UC003.functions'); // Importa le funzioni per gli step del test
const { CensusSheetPage } = require('../../models/page_object_models/census_sheet_page')

async function downloadAzione(page, reporter, chensusSheetPage) {
    const startTime = Date.now();
    // Attendiamo che l'elemento sia visibile e abilitato per l'interazione
    await chensusSheetPage.clickAzioniButton();
    const downloadPromise = page.waitForEvent('download');
    await chensusSheetPage.clickAzioneDownload();
    const download = await downloadPromise;

    const endTime = Date.now();
    const executionTime = endTime - startTime;
  
    // Aggiungi lo step al reporter
    const expectedResults = 'Il file selezionato scaricato';
    // const actualResults = 'TEST FAIL'
    const actualResults = 'Il file selezionato scaricato';
    const passFail = true;  // Step completato correttamente
    const parametersUsed = '';
  
    reporter.addStep('UC341_TC1_ID2', 'Scarica il file selezionato', expectedResults, actualResults, passFail, parametersUsed, executionTime);
  
}


// Crea un'istanza del reporter
const reporter = new TestResultReporter();
test('UC0341_TC001 - Download scheda censimento', async ({  page , browserName }) => {
    const chensusSheetPage = new CensusSheetPage(page); 
    
    // Inizializza il reporter con il nome del browser (es. 'chromium', 'firefox', 'webkit')
    reporter.setBrowserName(browserName);
    // Imposta il test case ID e descrizione per questo test
    reporter.setTestCase('UC341_TC1', 'Scarica il file relativo alla scheda di censimento');
    await loginWithoutDbSave(page);
    await acceptTerms(page, reporter);
    await navigateToCensusSheet(page, reporter);
    await downloadAzione(page, reporter, chensusSheetPage);

    // Registra il completamento del test e passa il risultato (passed o failed)
    reporter.onTestEnd(test, { status: 'passed' });

  });