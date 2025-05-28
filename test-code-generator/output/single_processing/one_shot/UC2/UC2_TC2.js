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
    reporter.addStep('UC2_TC2_ID1', 'Accedi al sistema come ospite o utente non registrato', 'Home page del sistema visualizzata', 'Home page del sistema visualizzata', true, `E2E_BASE_URL: ${process.env.E2E_BASE_URL}`, executionTime);
  }
  expect(page.url()).toBe(process.env.E2E_BASE_URL);
}

const tryAccessDashboard = async function(page, reporter) {
  const homePage = new HomePage(page);
  const startTime = new Date().getTime();
  await page.goto(`${process.env.E2E_BASE_URL}dashboard`);
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2_TC2_ID2', 'Tenta di accedere direttamente alla dashboard tramite URL', 'Pagina di accesso negato visualizzata', page.url(), true, {}, executionTime);
  }
  expect(page.url()).not.toContain('dashboard');
}

test("UC2_TC2 - Tentativo di accesso alla dashboard senza autorizzazione", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2_TC2 - Tentativo di accesso alla dashboard senza autorizzazione");

  navigateToLoginPage(page, null);
  fillLoginForm(page, null);
  submitLoginForm(page, null);

  navigateToHomePage(page, reporter);
  tryAccessDashboard(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});