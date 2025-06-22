const { test, expect } = require('@playwright/test');
const TestResultReporter = require('../../models/test-result-reporter'); // Importa il reporter generico
const { loginWithoutDbSave } = require('../UC1/UC001.functions'); // Importa la funzione di login senza salvare nel DB
const { navigateToDashboard } = require('./UC002.functions'); // Importa le funzioni per gli step del test
const { DashboardPageGeneralDataTable } = require('../../models/page_object_models/dashboard_page_general_data_table');

// Crea un'istanza del reporter
const reporter = new TestResultReporter();

async function navigateGeneralData(page, reporter, dashboardPage) { 
  var passFail = 1;
  const startTime = Date.now();

  var previousText = dashboardPage.getTableContent();
  var actualText = dashboardPage.getTableContent();
  await dashboardPage.navigateToNextPage();
  actualText = dashboardPage.getTableContent();
  if(previousText == actualText) passFail = 0; else previousText = actualText;
  await dashboardPage.navigateToNextPage();
  actualText = await dashboardPage.getTableContent();
  if(previousText == actualText) passFail = 0; else previousText = actualText;
  await dashboardPage.navigateToNextPage();
  actualText = await dashboardPage.getTableContent();
  if(previousText == actualText) passFail = 0; else previousText = actualText;
  await dashboardPage.navigateToPageOne();
  actualText = await dashboardPage.getTableContent();
  if(previousText == actualText) passFail = 0; else previousText = actualText;
  await dashboardPage.changeElementsPerPage('25');
  actualText = await dashboardPage.getTableContent();
  if(previousText == actualText) passFail = 0; else previousText = actualText;
  await dashboardPage.sortByRegion();
  actualText = await dashboardPage.getTableContent();
  if(previousText == actualText) passFail = 0; else previousText = actualText;
  await dashboardPage.sortByPointsOfLight();
  actualText = await dashboardPage.getTableContent();
  if(previousText == actualText) passFail = 0; else previousText = actualText;
  var isVisible = 0;
  if(passFail == 1)
    isVisible = await dashboardPage.isTableVisible();

  const endTime = Date.now();
  const executionTime = endTime - startTime;

  // Aggiungi lo step al reporter
  const expectedResults = 'La sezione di navigazione viene mostrata correttamente';
  const actualResults = isVisible ? 'La sezione di navigazione viene mostrata correttamente' : 'Errore';
  passFail = isVisible ? 1:0;
  const parametersUsed = ``;

  reporter.addStep('UC023_TC1_ID2', 'Naviga sezione dati generali', expectedResults, actualResults, passFail, parametersUsed, executionTime);
}


/**
 * Use Case 2.3: Visualizzazione tabella dati generali
 */


test('UC023_TC1 - Visualizzazione tabella dati generali', async ({ page, browserName }) => {

  const dashboardPage = new DashboardPageGeneralDataTable(page);

  // Inizializza il reporter con il nome del browser
  reporter.setBrowserName(browserName); 
  
  // Imposta il test case ID e descrizione per questo test
  reporter.setTestCase('UC023_TC1', 'Visualizzazione tabella dati generali');
  
  // Esegui il login senza salvare i risultati nel database (parte preliminare)
  await loginWithoutDbSave(page);

  // Step 1: Naviga alla Dashboard
  await navigateToDashboard(page, reporter);

  // Step 2: Naviga la sezione dei dati generali
  await navigateGeneralData(page, reporter, dashboardPage);

  // Conclude il test registrando lo stato "passed"
  reporter.onTestEnd(test, { status: 'passed' });
  });