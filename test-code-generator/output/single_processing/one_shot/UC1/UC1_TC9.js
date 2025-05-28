const { test, expect } = require('@playwright/test');
const LoginPage = require('../../models/page_object_models/login-page');
const TestResultReporter = require('../../models/test-result-reporter');

let reporter = new TestResultReporter();

const nonExistingEmail = "nonexistingemail@example.com";
const nonExistingPassword = "wrongpassword";

const enterNonExistingCredentials = async function(page, reporter) {
  const startTime = new Date().getTime();
  const loginPage = new LoginPage(page);
  await page.goto(process.env.E2E_LOGIN_URL);
  await loginPage.displayLoginForm();
  await loginPage.enterEmail(nonExistingEmail);
  await loginPage.enterPassword(nonExistingPassword);
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC1_TC9_ID1', 'Inserisci credenziali di un account non esistente', `Credenziali inserite`, `Credenziali inserite`, true, { email: nonExistingEmail, password: nonExistingPassword }, executionTime);
  }
}

const clickLoginButton = async function(page, reporter) {
  const startTime = new Date().getTime();
  const loginPage = new LoginPage(page);
  await loginPage.login();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC1_TC9_ID2', 'Clicca il tasto “Login”', `Tasto Login cliccato`, `Tasto Login cliccato`, true, {}, executionTime);
  }
}

const verifyErrorMessage = async function(page, reporter) {
  const startTime = new Date().getTime();
  const loginPage = new LoginPage(page);
  const errorMessage = await loginPage.getErrorMessage();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  const testPass = errorMessage !== null && errorMessage.includes("credenziali errate") || errorMessage.includes("account non esistente");
  if (reporter) {
    reporter.addStep('UC1_TC9_ID3', 'Verifica la visualizzazione del messaggio di errore', `Messaggio di errore visualizzato`, testPass ? `Messaggio di errore visualizzato: ${errorMessage}` : "Nessun messaggio di errore visualizzato", testPass, { errorMessage }, executionTime);
  }
  expect(testPass).toBe(true);
}

test("UC1_TC9 - Login con account non esistente", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC1_TC9 - Login con account non esistente");

  enterNonExistingCredentials(page, reporter);
  clickLoginButton(page, reporter);
  verifyErrorMessage(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});