const { test, expect } = require('@playwright/test');
const LoginPage = require('../../models/page_object_models/login-page');
const TestResultReporter = require('../../models/test-result-reporter');

let reporter = new TestResultReporter();

const enterInvalidCredentials = async function(page, reporter) {
  const startTime = new Date().getTime();
  const loginPage = new LoginPage(page);
  await page.goto(process.env.E2E_LOGIN_URL);
  await loginPage.displayLoginForm();
  await loginPage.enterEmail('wrong-email');
  await loginPage.enterPassword('wrong-password');
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep(
      'UC1_TC2_ID1',
      'Inserisci credenziali non valide',
      'Credenziali rifiutate',
      'Credenziali inserite',
      true,
      { email: 'wrong-email', password: 'wrong-password' },
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
      'UC1_TC2_ID2',
      'Clicca il tasto “Login”',
      'Sistema visualizza un messaggio di errore',
      'Tasto login cliccato',
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
  expect(errorMessage).not.toBeNull();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep(
      'UC1_TC2_ID3',
      'Verifica la visualizzazione del messaggio di errore',
      'Messaggio di errore visualizzato',
      errorMessage ? 'Messaggio di errore visualizzato' : 'Nessun messaggio di errore',
      !!errorMessage,
      { errorMessage },
      executionTime
    );
  }
}

test("UC1_TC2 - Login con credenziali errate", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC1_TC2 - Login con credenziali errate");

  await enterInvalidCredentials(page, reporter);
  await clickLoginButton(page, reporter);
  await verifyErrorMessage(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});