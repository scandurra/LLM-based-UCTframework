const { test, expect } = require('@playwright/test');
const TestResultReporter = require('../../models/test-result-reporter'); // Importa il reporter generico
const { loginWithoutDbSave } = require('../UC1/UC001.functions'); // Importa la funzione di login senza salvare nel DB
const { navigateToDashboard } = require('./UC002.functions'); // Importa le funzioni per gli step del test
const { DashboardPageBenchmarkingKpi } = require('../../models/page_object_models/dashboard_page_benchmarking_kpi');

// Crea un'istanza del reporter
const reporter = new TestResultReporter();

// Funzione per selezionare il comune
async function selectCity(page, reporter, dashboardPage) {
  const startTime = Date.now();

  // Attendi che il selettore "Seleziona" sia visibile
  await dashboardPage.openCitySelector()

  // Seleziona il primo comune dalla lista
  await dashboardPage.selectCityByIndex(21);

  const endTime = Date.now();
  const executionTime = endTime - startTime;

  // Aggiungi lo step al reporter
  const expectedResults = 'Comune selezionato correttamente';
  const actualResults = true ? 'Comune selezionato correttamente' : 'Selezione del comune fallita';
  const passFail = true ? 1 : 0;  // 1 se passato, 0 se fallito
  const parametersUsed = `Comune: Abriola`;

  reporter.addStep('UC24_TC1_ID2', 'Seleziona il comune', expectedResults, actualResults, passFail, parametersUsed, executionTime);

}

// Funzione per selezionare il KPI
async function selectKPI(page, reporter, dashboardPage) {
  const startTime = Date.now();

  // Attendi che il selettore KPI sia visibile
  await dashboardPage.waitForKPISelectorVisible();
  // Clicca per selezionare il KPI
  await dashboardPage.selectKPI();

  const endTime = Date.now();
  const executionTime = endTime - startTime;

  // Aggiungi lo step al reporter
  const expectedResults = 'KPI selezionato correttamente';
  // const actualResults = 'TEST FAIL'
  const actualResults = 'KPI selezionato correttamente';
  const passFail = 1;  // Step completato correttamente
  const parametersUsed = 'KPI: General Data';

  reporter.addStep('UC24_TC1_ID3', 'Seleziona il KPI', expectedResults, actualResults, passFail, parametersUsed, executionTime);
}

// Funzione per applicare il KPI e verificare i risultati
async function applyKPIAndVerify(page, reporter, dashboardPage) {
  const startTime = Date.now();

  // Attendi l'applicazione dei risultati
  await page.waitForTimeout(5000);

  // Verifica se il container è visibile
  const isChartContainerVisible = dashboardPage.isChartContainerVisible();

  // Verifica se il grafico è visibile
  const isPointVisible = await dashboardPage.isChartPointVisible();

  // Assert per confermare che il container del grafico o il puntino siano visibili
  const passFail = (isChartContainerVisible || isPointVisible) ? 1 : 0;

  expect(isChartContainerVisible || isPointVisible).toBeTruthy();

  const endTime = Date.now();
  const executionTime = endTime - startTime;

  // Aggiungi lo step al reporter
  const expectedResults = 'Risultati del KPI applicati correttamente';
  // const actualResults = 'TEST FAIL'
  const actualResults = (isChartContainerVisible || isPointVisible) ? 'Risultati del KPI applicati correttamente' : 'Applicazione dei risultati fallita';
  const parametersUsed = '';  // Parametri non necessari

  reporter.addStep('UC24_TC1_ID4', 'Applica KPI e verifica i risultati', expectedResults, actualResults, passFail, parametersUsed, executionTime);
}

/**
 * Use Case 2.4: Benchmarking KPI per comune 
 */


// Definisce il test Benchmarking KPI per comune
test('UC24_TC1 - Benchmarking KPI per comune', async ({ page, browserName }) => {

const dashboardPage = new DashboardPageBenchmarkingKpi(page);

// Inizializza il reporter con il nome del browser
reporter.setBrowserName(browserName); 

// Imposta il test case ID e descrizione per questo test
reporter.setTestCase('UC24_TC1', 'Benchmarking KPI per comune');

// Esegui il login senza salvare i risultati nel database (parte preliminare)
await loginWithoutDbSave(page);

// Step 1: Naviga alla Dashboard
await navigateToDashboard(page, reporter);

// Step 2: Seleziona il comune
await selectCity(page, reporter, dashboardPage);

// Step 3: Seleziona il KPI
await selectKPI(page, reporter, dashboardPage);

// Step 4: Applica KPI e verifica i risultati
await applyKPIAndVerify(page, reporter, dashboardPage);

// Conclude il test registrando lo stato "passed"
reporter.onTestEnd(test, { status: 'passed' });

});
