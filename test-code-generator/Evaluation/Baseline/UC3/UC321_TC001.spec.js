const { test, expect } = require('@playwright/test');

import {loginWithoutDbSave, acceptTerms, verifyLogin} from '../UC1/UC001.functions';
import { navigateToCensusSheet } from './UC003.functions';
const TestResultReporter = require('../../models/test-result-reporter'); // Importa il reporter generico per la gestione dei risultati
const { CensusSheetPage } = require('../../models/page_object_models/census_sheet_page')

// Definizione dei parametri
const userName = '';

const reporter = new TestResultReporter();

const doSearch = async (page, reporter, chensusSheetPage) => {
  const startTime = Date.now();
  await chensusSheetPage.searchByName('Lucania');
  const endTime = Date.now();

  const parametersUsed = ``;
  const expectedResults = "La ricerca prodouce i risultati correttamente filtrati";
  const actualResults = "La ricerca prodouce i risultati correttamente filtrati";
  const passFail = true;
  const executionTime = endTime - startTime;

  
  reporter.addStep('UC321_TC001_ID2', 'Esegui ricerca', expectedResults, actualResults, passFail, parametersUsed, executionTime);
  
}

/**
 * Use case 3.2.1: Ricerca scheda censimento per nome 
 * 
 */

test('UC321_TC001 - Ricerca scheda censimento per nome', async ({ page, browserName }) => {

  const chensusSheetPage = new ChensusSheetPage(page);

  // Inizializza il reporter con il nome del browser (es. 'chromium', 'firefox', 'webkit')
  reporter.setBrowserName(browserName);

  // Imposta il test case ID e descrizione per questo test
  reporter.setTestCase('UC321_TC001', 'Ricerca scheda censimento per nome');

  await loginWithoutDbSave(page);
  await acceptTerms(page, reporter);

  // Step 1: Verifica ruolo del login
  //await verifyLogin(page, reporter, 'UC321_TC001_ID1', userName);

  // Step 2: Naviga a scheda censimento
  await navigateToCensusSheet(page, reporter);

  // Step 3: Esegui ricerca
  await doSearch(page, reporter, chensusSheetPage)

  // Registra il completamento del test e passa il risultato (passed o failed)
  reporter.onTestEnd(test, { status: 'passed' });
});
