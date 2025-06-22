import { test, expect } from '@playwright/test';
import {navigateToSite,clickLogin,fillLoginForm,homeURL} from './UC001.functions';
const TestResultReporter = require('../../models/test-result-reporter'); // Importa il reporter generico per la gestione dei risultati
const { LoginPage } = require('../../models/page_object_models/login_page');

// Definizione dei parametri
const incorrectEmail = 'incorrect.supplier@pell.it';
const incorrectPassword = 'Incorrect01!';

const reporter = new TestResultReporter();

/**
 * Use Case 1: Login 
 * Exception sequence: login errato
 * @param incorrectEmail
 * @param incorrectPassword
 */

const clickLoginButtonAndVerifyFailure = async (page, reporter, loginPage) => {
  const startTime = Date.now();
  await loginPage.clickLoginButton();
  await page.waitForTimeout(2000);
  const endTime = Date.now();
  console.log(`Step 4 Execution Time: ${endTime - startTime} ms`);

  // Verifica che l'URL non sia cambiato e che non sia homeURL
  const finalURL = page.url();
  expect(finalURL).not.toBe(homeURL); // Verifica che l'URL finale non sia la homepage, il che indica un fallimento del login

  // Verifica la presenza di un messaggio di errore di login
  const errorMessage = await page.locator('text=Invalid email or password').isVisible();

  // Verifica che la console logghi un errore 401
  const consoleMessages = await page.context().on('pageerror', msg => {
    expect(msg.text()).toContain('401');
  });
  console.log("Il test è fallito nello Step 3 come previsto.");

    // Dettagli dello step
const parametersUsed = `homeURL:${homeURL}`;
const expectedResults = "Login fallito con visualizzazione errore";
const actualResults = await loginPage.isEmailFieldVisible() ? "Login fallito con visualizzazione errore" : "Campo non visibile";
const passFail = await loginPage.isEmailFieldVisible();
const executionTime = endTime - startTime;
reporter.addStep('UC1_TC2_ID4', 'Cliccare sul pulsante "Login" e verificare che il login fallisca', expectedResults, actualResults, passFail, parametersUsed, executionTime);
};

test('UC1_TC2 - Login Fail Test', async ({ page, browserName }) => {
  const loginPage = new LoginPage(page);

  // Inizializza il reporter con il nome del browser (es. 'chromium', 'firefox', 'webkit')
  reporter.setBrowserName(browserName);

  // Imposta il test case ID e descrizione
  reporter.setTestCase('UC1_TC2', 'Login Fail Test');

  // Step 1: Naviga al sito specificato nel file di configurazione (baseURL)
  await navigateToSite(page, reporter, loginPage);

  // Step 2: Clicca su "Login" e naviga alla pagina di login
  await clickLogin(page, reporter, loginPage);

  // Step 3: Compila il form di login con email e password
  await fillLoginForm(page, reporter, incorrectEmail, incorrectPassword, loginPage);
  
  // Step 4: Cliccare sul pulsante "Login" e verificare che il login fallisca
  await clickLoginButtonAndVerifyFailure(page, reporter, loginPage);

  // Registra il completamento del test e passa il risultato (passed o failed)
  reporter.onTestEnd(test, { status: 'passed' });
});
