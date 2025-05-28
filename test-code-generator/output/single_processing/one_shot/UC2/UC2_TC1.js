const { test, expect } = require('@playwright/test');
const HomePage = require('../../models/page_object_models/home-page');
const TestResultReporter = require('../../models/test-result-reporter');

let reporter = new TestResultReporter();

const navigateToHomePage = async function(page, reporter) {
  const startTime = new Date().getTime();
  await page.goto(process.env.E2E_BASE_URL);
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2_TC1_ID1', 'Accedi al sistema come utente registrato', 'Home page del sistema visualizzata', 'Home page del sistema visualizzata', true, `E2E_BASE_URL: ${process.env.E2E_BASE_URL}`, executionTime);
  }
  expect(page.url()).toBe(process.env.E2E_BASE_URL);
}

const navigateToDashboard = async function(page, reporter) {
  const homePage = new HomePage(page);
  const startTime = new Date().getTime();
  await homePage.navigateToDashboard();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2_TC1_ID2', 'Seleziona la voce di menù per accedere alla dashboard', 'Dashboard aperta correttamente', 'Dashboard aperta correttamente', true, {}, executionTime);
  }
}

test("UC2_TC1 - Apertura della dashboard con utente autorizzato", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2_TC1 - Apertura della dashboard con utente autorizzato");

  navigateToLoginPage(page, null);
  fillLoginForm(page, null);
  submitLoginForm(page, null);
  verifyAuthenticationSuccess(page, null);

  navigateToHomePage(page, reporter);
  navigateToDashboard(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});