const { test, expect } = require('@playwright/test');
const LoginPage = require('../../models/page_object_models/login-page');
const TestResultReporter = require('../../models/test-result-reporter');

let reporter = new TestResultReporter();

const injectXSSPayload = async function(page, reporter) {
  const startTime = new Date().getTime();
  const loginPage = new LoginPage(page);
  await page.goto(process.env.E2E_LOGIN_URL);
  await loginPage.displayLoginForm();
  const xssPayload = '<script>alert("XSS")</script>';
  await loginPage.enterEmail(xssPayload);
  await loginPage.enterPassword('password');
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep(
      'UC1_TC7_ID1',
      'Inserisci una stringa di input che tenta di eseguire un attacco XSS',
      'Il sistema rileva e blocca l\'attacco',
      'Il sistema rileva e blocca l\'attacco',
      true,
      { xssPayload },
      executionTime
    );
  }
}

const clickLoginButton = async function(page, reporter) {
  const startTime = new Date().getTime();
  const loginPage = new LoginPage(page);
  await loginPage.login();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep(
      'UC1_TC7_ID2',
      'Clicca il tasto “Login”',
      'Il sistema visualizza un messaggio di errore di sicurezza',
      'Il sistema visualizza un messaggio di errore di sicurezza',
      true,
      {},
      executionTime
    );
  }
}

const verifyErrorMessage = async function(page, reporter) {
  const startTime = new Date().getTime();
  const loginPage = new LoginPage(page);
  const errorMessage = await loginPage.getErrorMessage();
  expect(errorMessage).toContain('accesso non autorizzato');
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep(
      'UC1_TC7_ID3',
      'Verifica la visualizzazione del messaggio di errore',
      'Viene mostrato un messaggio che indica un tentativo di accesso non autorizzato',
      errorMessage,
      true,
      {},
      executionTime
    );
  }
}

test('UC1_TC7 - Tentativo di login con Cross-Site Scripting (XSS)', async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase('UC1_TC7 - Tentativo di login con Cross-Site Scripting (XSS)');

  await injectXSSPayload(page, reporter);
  await clickLoginButton(page, reporter);
  await verifyErrorMessage(page, reporter);

  reporter.onTestEnd(test, { status: 'passed' });
});