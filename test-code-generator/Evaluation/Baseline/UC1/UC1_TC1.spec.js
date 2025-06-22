const { test } = require('@playwright/test');
const TestResultReporter = require('../../models/test-result-reporter'); // Importa il reporter generico per la gestione dei risultati
const { navigateToSite, clickLogin, fillLoginForm, clickLoginButton } = require('./UC001.functions'); // Importa le funzioni modulari per gli step del test
const { LoginPage } = require('../../models/page_object_models/login_page');

// Crea un'istanza del reporter per questo test
const reporter = new TestResultReporter();

/**
 * Use Case 1: Login
 */

// Definisce il test 'Login Test', eseguito su una pagina e su un browser specifico
test('UC1_TC1 - Login Test', async ({ page, browserName }) => {
  const loginPage = new LoginPage(page);

  // Inizializza il reporter con il nome del browser (es. 'chromium', 'firefox', 'webkit')
  reporter.setBrowserName(browserName);

  // Imposta il test case ID e descrizione
  reporter.setTestCase('UC1_TC1', 'Login Test');

  // Step 1: Naviga al sito specificato nel file di configurazione (baseURL)
  await navigateToSite(page, reporter, loginPage);

  // Step 2: Clicca su "Login" e naviga alla pagina di login
  await clickLogin(page, reporter, loginPage);

  // Step 3: Compila il form di login con email e password
  await fillLoginForm(page, reporter, undefined, undefined, loginPage);

  // Step 4: Clicca sul pulsante "Login" e verifica che l'utente sia reindirizzato alla homepage o alla pagina di login
  await clickLoginButton(page, reporter, test, loginPage);  // Passiamo il test per chiamare onTestEnd in caso di errore

  // Se il test arriva fino a qui, significa che è passato
  reporter.onTestEnd(test, { status: 'passed' });
});
