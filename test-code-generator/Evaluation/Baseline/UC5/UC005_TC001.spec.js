import { test, expect } from '@playwright/test';
import {loginWithoutDbSave, acceptTerms, verifyLogin} from '../UC1/UC001.functions';
const { baseURL, loginURL, homeURL } = require('../../models/config'); // Parametri dal file di configurazione
const TestResultReporter = require('../../models/test-result-reporter'); // Importa il reporter generico per la gestione dei risultati

// Definizione dei parametri
const italianoFlagLink = ' Lingua Italiano flag';
const ingleseFlagLink = 'flag Inglese';

const reporter = new TestResultReporter();

const changeLanguageToEnglish = async (page) => {
  const startTime = Date.now();
  await page.getByLabel('user_data').click();
  await page.getByRole('link', { name: italianoFlagLink }).click();
  await page.getByRole('link', { name: ingleseFlagLink }).click();
  
  // Verifica che la lingua sia cambiata correttamente
  await page.getByLabel('user_data').click();
  const englishTextVisible = await page.getByRole('link', { name: ' Language Inglese flag' }).isVisible();
  const endTime = Date.now();

  expect(englishTextVisible).toBe(true); // Verifica che il link "Logout" sia visibile in inglese

  const parametersUsed = ``;
  const expectedResults = "La lingua del portale viene correttamente cambiata";
  const actualResults = "La lingua del portale viene correttamente cambiata";
  const passFail = true;
  const executionTime = endTime - startTime;

  // Aggiunge lo step al reporter solo se il reporter non è null
  if (reporter) {
    reporter.addStep('UC005_TC001_ID2', 'Cambia lingua', expectedResults, actualResults, passFail, parametersUsed, executionTime);
  }
};

/**
 * Use case 5: Selezione lingua 
 */

test('UC005_TC001 - Seleziona lingua', async ({ page, browserName }) => {

    // Inizializza il reporter con il nome del browser (es. 'chromium', 'firefox', 'webkit')
    reporter.setBrowserName(browserName);

    // Imposta il test case ID e descrizione per questo test
    reporter.setTestCase('UC005_TC001', 'Seleziona lingua');

    await loginWithoutDbSave(page);
    await acceptTerms(page, reporter);

    // Step 1: Cambiare la lingua in inglese
    await changeLanguageToEnglish(page);

    // Registra il completamento del test e passa il risultato (passed o failed)
    reporter.onTestEnd(test, { status: 'passed' });
});
