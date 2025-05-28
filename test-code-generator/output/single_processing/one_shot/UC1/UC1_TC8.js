const { test, expect } = require('@playwright/test');
const LoginPage = require('../../models/page_object_models/login-page');
const TestResultReporter = require('../../models/test-result-reporter');

let reporter = new TestResultReporter();

const loginWithDisabledAccount = async function(page, reporter) {
  const startTime = new Date().getTime();
  const loginPage = new LoginPage(page);
  await page.goto(process.env.E2E_LOGIN_URL);
  await loginPage.displayLoginForm();
  await loginPage.enterEmail(process.env.E2E_LOGIN_EMAIL_REGION);
  await loginPage.enterPassword(process.env.E2E_LOGIN_PASSWORD_REGION);
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC1_TC8_ID1', 'Inserisci le credenziali di un account disabilitato', 'Credenziali inserite', 'Credenziali inserite', true, { email: process.env.E2E_LOGIN_EMAIL_REGION, password: process.env.E2E_LOGIN_PASSWORD_REGION }, executionTime);
  }
}

const clickLoginButton = async function(page, reporter) {
  const startTime = new Date().getTime();
  const loginPage = new LoginPage(page);
  await loginPage.login();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC1_TC8_ID2', 'Clicca il tasto “Login”', 'Tasto cliccato', 'Tasto cliccato', true, {}, executionTime);
  }
}

const verifyErrorMessage = async function(page, reporter) {
  const startTime = new Date().getTime();
  const loginPage = new LoginPage(page);
  const errorMessage = await loginPage.getErrorMessage();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  const testPass = errorMessage !== null && errorMessage.includes('account disabilitato');
  if (reporter) {
    reporter.addStep('UC1_TC8_ID3', 'Verifica la visualizzazione del messaggio di errore', 'Messaggio di errore visualizzato', testPass ? 'Messaggio di errore visualizzato' : 'Nessun messaggio di errore visualizzato', testPass, { errorMessage: errorMessage }, executionTime);
  }
  expect(testPass).toBe(true);
}

test("UC1_TC8 - Login con account disabilitato", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC1_TC8 - Login con account disabilitato");

  loginWithDisabledAccount(page, reporter);
  clickLoginButton(page, reporter);
  verifyErrorMessage(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});