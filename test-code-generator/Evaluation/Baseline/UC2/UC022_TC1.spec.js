const { test, expect } = require('@playwright/test');
const TestResultReporter = require('../../models/test-result-reporter'); // Importa il reporter generico
const { loginWithoutDbSave } = require('../UC1/UC001.functions'); // Importa la funzione di login senza salvare nel DB
const { navigateToDashboard } = require('./UC002.functions'); // Importa le funzioni per gli step del test
const { DashboardPageIlluminationSearch } = require('../../models/page_object_models/dashboard_page_illumination_search');

// Crea un'istanza del reporter
const reporter = new TestResultReporter();

async function doSearch(page, reporter, dashboardPage) { 
  const startTime = Date.now();
  
  await dashboardPage.selectComune(0);
  await dashboardPage.applySearch();
  const isVisible = await dashboardPage.isMapVisible();

  const endTime = Date.now();
  const executionTime = endTime - startTime;

  // Aggiungi lo step al reporter
  const expectedResults = 'La mappa mostra la ricerca';
  const actualResults = isVisible ? 'La mappa mostra la ricerca' : 'Ricerca fallita';
  const passFail = isVisible ? 1:0;
  const parametersUsed = ``;

  reporter.addStep('UC022_TC1_ID2', 'Esegui ricerca impianti di illuminazione', expectedResults, actualResults, passFail, parametersUsed, executionTime);
}


/**
 * Use Case 2.2: Ricerca impianti di illuminazione
 */


test('UC022_TC1 - Ricerca impianti di illuminazione', async ({ page, browserName }) => {
  const dashboardPage = new DashboardPageIlluminationSearch(page);

  // Inizializza il reporter con il nome del browser
  reporter.setBrowserName(browserName); 
  
  // Imposta il test case ID e descrizione per questo test
  reporter.setTestCase('UC022_TC1', 'Ricerca impianti di illuminazione');
  
  // Esegui il login senza salvare i risultati nel database (parte preliminare)
  await loginWithoutDbSave(page);

  // Step 1: Naviga alla Dashboard
  await navigateToDashboard(page, reporter);

  // Step 2: Esegui ricerca impianti di illuminazione
  await doSearch(page, reporter, dashboardPage);

  // Conclude il test registrando lo stato "passed"
  reporter.onTestEnd(test, { status: 'passed' });
  });