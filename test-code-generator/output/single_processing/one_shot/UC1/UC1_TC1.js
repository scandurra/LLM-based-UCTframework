const { test, expect } = require('@playwright/test');
const LoginPage = require('../../models/page_object_models/login-page');
const TestResultReporter = require('../../models/test-result-reporter');

let reporter = new TestResultReporter();

const navigateToLoginPage = async function(page, reporter) {
  const startTime = new Date().getTime();
  await page.goto(process.env.E2E_LOGIN_URL);
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC1_TC1_ID1', 'Navigate to login page', 'Login page loaded', 'Login page loaded', true, `E2E_LOGIN_URL: ${process.env.E2E_LOGIN_URL}`, executionTime);
  }
  expect(page.url()).toBe(process.env.E2E_LOGIN_URL);
}

const fillLoginForm = async function(page, reporter) {
  const loginPage = new LoginPage(page);
  const startTime = new Date().getTime();
  await loginPage.displayLoginForm();
  await loginPage.enterEmail(process.env.E2E_LOGIN_EMAIL_ADMIN);
  await loginPage.enterPassword(process.env.E2E_LOGIN_PASSWORD_ADMIN);
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC1_TC1_ID2', 'Inserisci le credenziali corrette nel form di login', `Credenziali inserite: email=${process.env.E2E_LOGIN_EMAIL_ADMIN}, password=***`, `Credenziali inserite: email=${process.env.E2E_LOGIN_EMAIL_ADMIN}, password=***`, true, { email: process.env.E2E_LOGIN_EMAIL_ADMIN, password: '***' }, executionTime);
  }
}

const submitLoginForm = async function(page, reporter) {
  const loginPage = new LoginPage(page);
  const startTime = new Date().getTime();
  await loginPage.login();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC1_TC1_ID3', 'Clicca il tasto “Login”', 'Il sistema procede con l’autenticazione', 'Il sistema procede con l’autenticazione', true, {}, executionTime);
  }
}

const verifyAuthenticationSuccess = async function(page, reporter) {
  const loginPage = new LoginPage(page);
  const startTime = new Date().getTime();
  const errorMessage = await loginPage.getErrorMessage();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC1_TC1_ID4', 'Verifica la visualizzazione del messaggio di successo', 'Viene mostrato un messaggio che conferma l’avvenuta autenticazione', errorMessage ? `Errore: ${errorMessage}` : 'Autenticazione avvenuta con successo', !errorMessage, {}, executionTime);
  }
  expect(errorMessage).toBeNull();
}

test("UC1_TC1 - Login con credenziali valide", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC1_TC1 - Login con credenziali valide");

  navigateToLoginPage(page, reporter);
  fillLoginForm(page, reporter);
  submitLoginForm(page, reporter);
  verifyAuthenticationSuccess(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});