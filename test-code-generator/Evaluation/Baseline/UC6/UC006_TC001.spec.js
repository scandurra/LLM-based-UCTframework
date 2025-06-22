import { test, expect } from '@playwright/test';
import {loginWithoutDbSave, verifyLogin} from '../UC1/UC001.functions';
const { baseURL, loginURL, homeURL } = require('../../models/config'); // Parametri dal file di configurazione
const TestResultReporter = require('../../models/test-result-reporter'); // Importa il reporter generico per la gestione dei risultati

const reporter = new TestResultReporter();

const acceptTerms = async (page, reporter) => {
  //await test.step("Accetta i termini", async () => {
    const startTime = Date.now();
    await page.getByRole('button', { name: 'Accetto' }).click();
    const endTime = Date.now();
  
    const parametersUsed = `baseURL:${baseURL}`;
    const expectedResults = "Click OK";
    const actualResults = "Click OK";
    const passFail = true;
    const executionTime = endTime - startTime;
    // Aggiunge lo step al reporter solo se il reporter non è null
    if (reporter) {
      reporter.addStep('UC006_TC001_ID1', 'Accetta termini e condizioni', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
  //}, {box : true});
};

const logout = async (page, reporter) => {
  const startTime = Date.now();
  await page.getByLabel('user_data').click();
  await page.getByRole('link', { name: ' Logout' }).click();
  await page.waitForURL(baseURL);
  const finalURL = page.url();
  expect(finalURL).toBe(baseURL); // Verifica che l'URL finale sia la pagina iniziale
  const endTime = Date.now();

  const parametersUsed = `baseURL:${baseURL}`;
  const expectedResults = "Logout effettuato correttamente";
  const actualResults = "Logout effettuato correttamente";
  const passFail = true;
  const executionTime = endTime - startTime;

  // Aggiunge lo step al reporter solo se il reporter non è null
  if (reporter) {
    reporter.addStep('UC006_TC001_ID3', 'Effettuare il logout', expectedResults, actualResults, passFail, parametersUsed, executionTime);
  }
};

/**
 * Use case 6: Logout utente 
 */

test('UC006_TC001 - Logout utente', async ({ page, browserName }) => {

  // Inizializza il reporter con il nome del browser (es. 'chromium', 'firefox', 'webkit')
  reporter.setBrowserName(browserName);

  // Imposta il test case ID e descrizione per questo test
  reporter.setTestCase('UC006_TC001', 'Logout utente');

  // Esegui il login senza salvare i risultati nel database (parte preliminare)
  await loginWithoutDbSave(page);

  // Step 1: Accettare i termini
  await acceptTerms(page, reporter);

  // Step 2: Logout e verifica del ritorno alla pagina iniziale
  await logout(page, reporter);

  // Registra il completamento del test e passa il risultato (passed o failed)
  reporter.onTestEnd(test, { status: 'passed' });
});

