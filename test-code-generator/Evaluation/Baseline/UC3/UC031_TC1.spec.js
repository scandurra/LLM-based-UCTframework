import { test, expect } from '@playwright/test';
import { timeout } from '../../playwright.config';
const TestResultReporter = require('../../models/test-result-reporter'); // Importa il reporter generico
const { loginWithoutDbSave } = require('../UC1/UC001.functions'); // Importa la funzione di login senza salvare nel DB
const { navigateToCensusSheet } = require('./UC003.functions'); // Importa le funzioni per gli step del test
const { CensusSheetPage } = require('../../models/page_object_models/census_sheet_page');

async function navigateColumn(page, reporter, censusSheetPage) {
  const startTime = Date.now();

  await censusSheetPage.clickAzioniColumn();
  await censusSheetPage.clickAzioniColumn();
  await censusSheetPage.clickSchedaColumn();
  await censusSheetPage.clickSchedaColumn();
  await censusSheetPage.clickProprietarioColumn();
  await censusSheetPage.clickProprietarioColumn();
  await censusSheetPage.clickComuneColumn();
  await censusSheetPage.clickComuneColumn();
  await censusSheetPage.clickStatsColumn();
  await censusSheetPage.clickStatsColumn();
  await censusSheetPage.clickStatoColumn();
  await censusSheetPage.clickStatoColumn();
  await censusSheetPage.clickInfoColumn();
  await censusSheetPage.clickInfoColumn();
  await censusSheetPage.clickCreazioneColumn();
  await censusSheetPage.clickCreazioneColumn();
  await censusSheetPage.clickAggiornamentoColumn();
  await censusSheetPage.clickAggiornamentoColumn();
  await censusSheetPage.clickSottomissioneColumn();
  await censusSheetPage.clickSottomissioneColumn();

  const endTime = Date.now();
  const executionTime = endTime - startTime;

  // Aggiungi lo step al reporter
  const expectedResults = 'Click colonne OK';
  // const actualResults = 'TEST FAIL'
  const actualResults = 'Click colonne OK';
  const passFail = 1;  // Step completato correttamente
  const parametersUsed = '';

  reporter.addStep('UC31_TC1_ID2', 'Naviga colonne', expectedResults, actualResults, passFail, parametersUsed, executionTime);
}

// Crea un'istanza del reporter
const reporter = new TestResultReporter();

test('UC031_TC1 - Visualizzazione schede censimento', async ({ page, browserName }) => {

    const censusSheetPage = new CensusSheetPage(page);

    // Inizializza il reporter con il nome del browser
    reporter.setBrowserName(browserName); 

    // Imposta il test case ID e descrizione per questo test
    reporter.setTestCase('UC31_TC1', 'Visualizzazione schede censimento');

    // Esegui il login senza salvare i risultati nel database (parte preliminare)
    await loginWithoutDbSave(page);

    await navigateToCensusSheet(page, reporter);

    await navigateColumn(page, reporter, censusSheetPage);

    // Conclude il test registrando lo stato "passed"
    reporter.onTestEnd(test, { status: 'passed' });
  });