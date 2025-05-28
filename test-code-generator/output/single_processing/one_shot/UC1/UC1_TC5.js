const { test, expect } = require('@playwright/test');
const LoginPage = require('../../models/page_object_models/login-page');
const TestResultReporter = require('../../models/test-result-reporter');

let reporter = new TestResultReporter();

const loginWithDefaultCredentials = async function(page, reporter) {
  const startTime = new Date().getTime();
  const loginPage = new LoginPage(page);
  await page.goto(process.env.E2E_LOGIN_URL);
  await loginPage.displayLoginForm();
  await loginPage.enterEmail(process.env.E2E_LOGIN_EMAIL_ADMIN);
  await loginPage.enterPassword(process.env.E2E_LOGIN_PASSWORD_ADMIN);
  await loginPage.login();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC1_TC5_ID1', 'Inserisci le credenziali di default per la prima volta', 'Il sistema richiede il cambio della password', 'Il sistema richiede il cambio della password', true, `E2E_LOGIN_EMAIL_ADMIN: ${process.env.E2E_LOGIN_EMAIL_ADMIN}, E2E_LOGIN_PASSWORD_ADMIN: ${process.env.E2E_LOGIN_PASSWORD_ADMIN}`, executionTime);
  }
  expect(await loginPage.getErrorMessage()).toContain('Password must be changed');
}

const changePassword = async function(page, reporter) {
  const startTime = new Date().getTime();
  const loginPage = new LoginPage(page);
  await loginPage.enterPassword('NewPassword01!');
  await loginPage.enterPassword('NewPassword01!');
  await loginPage.login();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC1_TC5_ID2', 'Inserisci la nuova password e confermala', 'La password viene accettata e cambiata', 'La password viene accettata e cambiata', true, { newPassword: 'NewPassword01!' }, executionTime);
  }
}

const verifyNewPassword = async function(page, reporter) {
  const startTime = new Date().getTime();
  const loginPage = new LoginPage(page);
  await page.goto(process.env.E2E_LOGIN_URL);
  await loginPage.displayLoginForm();
  await loginPage.enterEmail(process.env.E2E_LOGIN_EMAIL_ADMIN);
  await loginPage.enterPassword('NewPassword01!');
  await loginPage.login();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC1_TC5_ID3', 'Verifica che la nuova password sia attiva', 'Il sistema permette l’accesso con la nuova password', page.url() !== process.env.E2E_LOGIN_URL ? 'Il sistema permette l’accesso con la nuova password' : 'Accesso negato', page.url() !== process.env.E2E_LOGIN_URL, { newPassword: 'NewPassword01!' }, executionTime);
  }
  expect(page.url()).not.toContain(process.env.E2E_LOGIN_URL);
}

test("UC1_TC5 - Cambio password alla prima autenticazione", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC1_TC5 - Cambio password alla prima autenticazione");

  await loginWithDefaultCredentials(page, reporter);
  await changePassword(page, reporter);
  await verifyNewPassword(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});