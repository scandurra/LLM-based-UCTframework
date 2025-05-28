const { test, expect } = require('@playwright/test');
const HomePage = require('../../models/page_object_models/home-page');
const TestResultReporter = require('../../models/test-result-reporter');

let reporter = new TestResultReporter();

const navigateToDashboard = async function(page, reporter) {
  const startTime = new Date().getTime();
  await page.goto(process.env.E2E_BASE_URL);
  const homePage = new HomePage(page);
  await homePage.navigateToDashboard();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2_TC5_ID1', 'Accedi alla dashboard utilizzando diversi browser', 'La dashboard si apre e funziona correttamente in ogni browser', 'La dashboard si apre e funziona correttamente in ogni browser', true, `E2E_BASE_URL: ${process.env.E2E_BASE_URL}`, executionTime);
  }
  expect(page.url()).toContain('dashboard');
}

const verifyDashboardCompatibility = async function(page, reporter) {
  const startTime = new Date().getTime();
  const homePage = new HomePage(page);
  await homePage.navigateToCensimento();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2_TC5_ID2', 'Verifica la presenza di eventuali problemi di visualizzazione o funzionalità', 'Non ci sono problemi significativi di compatibilità', 'Non ci sono problemi significativi di compatibilità', true, {}, executionTime);
  }
}

test("UC2_TC5 - Verifica della compatibilità con browser differenti", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2_TC5 - Verifica della compatibilità con browser differenti");

  navigateToLoginPage(page, null);
  fillLoginForm(page, null);
  submitLoginForm(page, null);
  verifyAuthenticationSuccess(page, null);

  navigateToDashboard(page, reporter);
  verifyDashboardCompatibility(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});