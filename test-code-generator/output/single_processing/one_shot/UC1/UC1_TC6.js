const { test, expect } = require('@playwright/test');
const LoginPage = require('../../models/page_object_models/login-page');
const TestResultReporter = require('../../models/test-result-reporter');

let reporter = new TestResultReporter();

const injectSqlAndDisplayLoginForm = async function(page, reporter) {
  const startTime = new Date().getTime();
  const loginPage = new LoginPage(page);
  await page.goto(process.env.E2E_LOGIN_URL);
  await loginPage.displayLoginForm();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC1_TC6_ID1', 'Inserisci una stringa di input che tenta di eseguire un attacco SQL Injection', 'Form di login visualizzato', 'Form di login visualizzato', true, `E2E_LOGIN_URL: ${process.env.E2E_LOGIN_URL}`, executionTime);
  }
}

const enterSqlInjectionInput = async function(page, reporter) {
  const startTime = new Date().getTime();
  const loginPage = new LoginPage(page);
  await loginPage.enterEmail("test.admin@pell.it");
  await loginPage.enterPassword("' OR '1'='1");
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC1_TC6_ID2', 'Inserisci credenziali con SQL Injection', 'Credenziali inserite', 'Credenziali inserite', true, { email: "test.admin@pell.it", password: "' OR '1'='1" }, executionTime);
  }
}

const submitLoginForm = async function(page, reporter) {
  const startTime = new Date().getTime();
  const loginPage = new LoginPage(page);
  await loginPage.login();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC1_TC6_ID3', 'Clicca il tasto “Login”', 'Tasto login cliccato', 'Tasto login cliccato', true, {}, executionTime);
  }
}

const verifyErrorMessage = async function(page, reporter) {
  const startTime = new Date().getTime();
  const loginPage = new LoginPage(page);
  const errorMessage = await loginPage.getErrorMessage();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  const testPass = errorMessage !== null && errorMessage.includes('accesso non autorizzato');
  if (reporter) {
    reporter.addStep('UC1_TC6_ID4', 'Verifica la visualizzazione del messaggio di errore', 'Messaggio di errore visualizzato', testPass ? 'Messaggio di errore visualizzato' : 'Nessun messaggio di errore visualizzato', testPass, { errorMessage: errorMessage }, executionTime);
  }
  expect(testPass).toBe(true);
}

test("UC1_TC6 - Tentativo di login con SQL Injection", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC1_TC6 - Tentativo di login con SQL Injection");

  injectSqlAndDisplayLoginForm(page, reporter);
  enterSqlInjectionInput(page, reporter);
  submitLoginForm(page, reporter);
  verifyErrorMessage(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});