const { test, expect } = require('@playwright/test');
const TestResultReporter = require('../../models/test-result-reporter'); // Importa il reporter generico
const { loginWithoutDbSave } = require('../UC1/UC001.functions'); // Importa la funzione di login senza salvare nel DB
const { navigateToDashboard } = require('./UC002.functions'); // Importa le funzioni per gli step del test
const { DashboardPagePdfDownload } = require('../../models/page_object_models/dashboard_page_pdf_download');

// Crea un'istanza del reporter
const reporter = new TestResultReporter();

async function downloadPDF(page, reporter, dashboardPage) {
  // Aggiungi lo step al reporter
  const expectedResults = 'Il download avviene correttamente';
  const passFail = 0;  // 1 se passato, 0 se fallito
  const parametersUsed = ``;
  
  const startTime = Date.now();

  await dashboardPage.downloadPDF();
  await page.on('download', download => download.path().then(passFail = 1));

  const endTime = Date.now();

  const actualResults = passFail ? 'Il download avviene correttamente' : 'Download fallito';
  const executionTime = endTime - startTime;

  reporter.addStep('UC021_TC1_ID2', 'Seleziona il comune', expectedResults, actualResults, passFail, parametersUsed, executionTime);
}

/**
 * Use Case 2.1: Download PDF
 */


test('UC021_TC1 - Download PDF', async ({ page, browserName }) => {
  const dashboardPage = new DashboardPagePdfDownload(page);

  // Inizializza il reporter con il nome del browser
  reporter.setBrowserName(browserName); 
  
  // Imposta il test case ID e descrizione per questo test
  reporter.setTestCase('UC021_TC1', 'Download PDF');
  
  // Esegui il login senza salvare i risultati nel database (parte preliminare)
  await loginWithoutDbSave(page);
  
  // Step 1: Naviga alla Dashboard
  await navigateToDashboard(page, reporter);

  // Step 2: Download del PDF
  await downloadPDF(page, reporter, dashboardPage);

  // Conclude il test registrando lo stato "passed"
  reporter.onTestEnd(test, { status: 'passed' });
  });