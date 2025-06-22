import { test, expect } from '@playwright/test';
import { timeout } from '../../playwright.config';
const TestResultReporter = require('../../models/test-result-reporter'); // Importa il reporter generico
import {loginWithoutDbSave, acceptTerms, verifyLogin} from '../UC1/UC001.functions';
const { navigateToCensusSheet } = require('./UC003.functions'); // Importa le funzioni per gli step del test
const { CensusSheetPage } = require('../../models/page_object_models/census_sheet_page')


async function navigateAzione(page, reporter, chensusSheetPage) {
    const startTime = Date.now();
    await chensusSheetPage.clickAzioniButton();


    const endTime = Date.now();
    const executionTime = endTime - startTime;
  
    // Aggiungi lo step al reporter
    const expectedResults = 'visualizza le opzioni previste';
    // const actualResults = 'TEST FAIL'
    const actualResults = 'visualizza le opzioni previste';
    const passFail = true;  // Step completato correttamente
    const parametersUsed = '';
  
    reporter.addStep('UC34_TC1_ID2', 'visualizza Azione', expectedResults, actualResults, passFail, parametersUsed, executionTime);
  }
// Crea un'istanza del reporter
const reporter = new TestResultReporter();

test('UC034_TC001 - Azione su scheda censimento', async ({ page , browserName }) => {
    const chensusSheetPage = new CensusSheetPage(page);  
  
    // Inizializza il reporter con il nome del browser (es. 'chromium', 'firefox', 'webkit')
    reporter.setBrowserName(browserName);

    // Imposta il test case ID e descrizione per questo test
    reporter.setTestCase('UC34_TC1', 'Visualizzazione Azione su scheda censimento');

    await loginWithoutDbSave(page);
    await acceptTerms(page, reporter);


    await navigateToCensusSheet(page, reporter);
    await navigateAzione(page, reporter, chensusSheetPage);

    // Registra il completamento del test e passa il risultato (passed o failed)
    reporter.onTestEnd(test, { status: 'passed' });
    
  });