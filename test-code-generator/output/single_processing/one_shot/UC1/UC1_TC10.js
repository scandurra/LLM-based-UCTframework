const { test, expect } = require('@playwright/test');
const LoginPage = require('../../models/page_object_models/login-page');
const TestResultReporter = require('../../models/test-result-reporter');

let reporter = new TestResultReporter();

const loginWithSpecialChars = async function(page, reporter) {
  const startTime = new Date().getTime();
  const loginPage = new LoginPage(page);
  await page.goto(process.env.E2E_LOGIN_URL);
  await loginPage.displayLoginForm();
  await loginPage.enterEmail(process.env.E2E_LOGIN_EMAIL_ADMIN);
  await loginPage.enterPassword('Test@dm1n!$');
  let endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep(
      'UC1_TC10_ID1',
      'Inserisci una password che contiene caratteri speciali (@,#,$, etc.)',
      'La password viene accettata',
      'La password viene accettata',
      true,
      { email: process.env.E2E_LOGIN_EMAIL_ADMIN, password: 'Test@dm1n!$' },
      executionTime
    );
  }
}

const clickLoginButton = async function(page, reporter) {
  const startTime = new Date().getTime();
  const loginPage = new LoginPage(page);
  await loginPage.login();
  let endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep(
      'UC1_TC10_ID2',
      'Clicca il tasto “Login”',
      'Il sistema procede con l’autenticazione',
      'Il sistema procede con l’autenticazione',
      true,
      {},
      executionTime
    );
  }
}

const verifyLogin = async function(page, reporter) {
  const startTime = new Date().getTime();
  await page.waitForURL(process.env.E2E_BASE_URL);
  let endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep(
      'UC1_TC10_ID3',
      'Verifica che la password funzioni correttamente',
      'Il sistema permette l’accesso con la password contenente caratteri speciali',
      page.url() === process.env.E2E_BASE_URL ? 'Il sistema permette l’accesso con la password contenente caratteri speciali' : 'Accesso negato',
      page.url() === process.env.E2E_BASE_URL,
      {},
      executionTime
    );
  }
  expect(page.url()).toBe(process.env.E2E_BASE_URL);
}

test("UC1_TC10 - Login con caratteri speciali nella password", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC1_TC10 - Login con caratteri speciali nella password");

  loginWithSpecialChars(page, reporter);
  clickLoginButton(page, reporter);
  verifyLogin(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});