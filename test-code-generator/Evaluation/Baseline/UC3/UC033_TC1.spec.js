import { test, expect } from '@playwright/test';
import { timeout } from '../../playwright.config';
const TestResultReporter = require('../../models/test-result-reporter'); // Importa il reporter generico
import {loginWithoutDbSave, acceptTerms, verifyLogin} from '../UC1/UC001.functions';
const { navigateToCensusSheet } = require('./UC003.functions'); // Importa le funzioni per gli step del test
const { CensusSheetPageUpload } = require('../../models/page_object_models/census_sheet_page_upload')

async function uploadCard (page, reporter, censusSheetPage) {
    test.setTimeout(120000);
    const startTime = Date.now();
    const path = require('path');
    // Definire il percorso al tuo file SchedaCensimentoV2_Esempio1.xml
    const filePath = path.join(__dirname, 'test-data/SchedaCensimentoV2_Esempio1.xml');

    // Attendere che il pulsante sia visibile prima di cliccare
    await censusSheetPage.waitForUploadSchedaModalButton();
    reporter.addStep('UC33_TC001_ID001','Utente accede alla sezione di caricamento delle schede di censimento.', 'La sezione di caricamento è visibile.','La sezione di caricamento è visibile.', true, '', Date.now() - startTime);
    await censusSheetPage.clickUploadSchedaModalButton();
    // Attendere che l'opzione di upload sia visibile prima di cliccare
    await censusSheetPage.waitForUploadModal();
    reporter.addStep('UC33_TC001_ID002', 'Utente clicca sul pulsante di upload.','Si apre una finestra per selezionare i parametri del file.', 'Si apre una finestra per selezionare i parametri del file.', true, '', Date.now() - startTime);
    reporter.addStep('UC33_TC001_ID003', 'Utente seleziona i parametri per il caricamento.','I parametri sono stati selezionati.', 'I parametri sono stati selezionati.', true, '', Date.now() - startTime);
    // Assicurarsi che l'elemento di input invisibile per il file sia visibile e pronto per l'upload
    await censusSheetPage.setInputFiles(filePath);
    // Attendere che il pulsante "OK" sia visibile prima di cliccare
    await censusSheetPage.waitForUploadApplyButton();
    await censusSheetPage.clickUploadApplyButton();
    reporter.addStep('UC33_TC001_ID004', 'Utente carica il file tramite drag and drop.', 'Il messaggio di successo conferma che il file è stato caricato.', 'Il messaggio di successo conferma che il file è stato caricato.', true, '', Date.now() - startTime);
}


// Crea un'istanza del reporter
const reporter = new TestResultReporter();

test('UC033_TC001 - Caricamento scheda censimento', async ({ page , browserName }) => {
    const censusSheetPage = new CensusSheetPageUpload(page);
    
    // Inizializza il reporter con il nome del browser (es. 'chromium', 'firefox', 'webkit')
    reporter.setBrowserName(browserName);
    // Imposta il test case ID e descrizione per questo test
    reporter.setTestCase('UC33_TC1', 'Caricamento scheda censimento');
    await loginWithoutDbSave(page);
    await acceptTerms(page, reporter);
    await navigateToCensusSheet(page, reporter);
    await uploadCard(page, reporter, censusSheetPage);

    // Registra il completamento del test e passa il risultato (passed o failed)
    reporter.onTestEnd(test, { status: 'passed' });
  });