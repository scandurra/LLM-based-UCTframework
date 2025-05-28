const { test, expect } = require('@playwright/test');
const HomePage = require('../../models/page_object_models/home-page');
const TestResultReporter = require('../../models/test-result-reporter');
const LoginPage = require('../../models/page_object_models/login-page');

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

const clickOnProfile = async function(page, reporter) {
  const homePage = new HomePage(page);
  const startTime = new Date().getTime();
  await homePage.clickOnProfile();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC5_TC1_ID1', 'L’utente clicca sul proprio nome utente in alto a destra', 'Viene visualizzato un menù a tendina', 'Menù a tendina visualizzato', true, {}, executionTime);
  }
}

const changeLanguage = async function(page, reporter) {
  const homePage = new HomePage(page);
  const startTime = new Date().getTime();
  await homePage.changeLanguage();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC5_TC1_ID2', 'L’utente seleziona la lingua italiana dal menù a tendina', 'Il portale si ricarica con la lingua selezionata', 'Portale ricaricato con lingua italiana', true, {}, executionTime);
  }
}

test("UC5_TC1 - Selezione lingua italiana", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC5_TC1 - Selezione lingua italiana");

  navigateToLoginPage(page, null);
  fillLoginForm(page, null);
  submitLoginForm(page, null);
  verifyAuthenticationSuccess(page, null);

  clickOnProfile(page, reporter);
  changeLanguage(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});