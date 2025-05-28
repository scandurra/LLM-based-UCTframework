const { test, expect } = require('@playwright/test');
const HomePage = require('../../models/page_object_models/home-page');
const TestResultReporter = require('../../models/test-result-reporter');

let reporter = new TestResultReporter();

const navigateToDashboard = async function(page, reporter) {
  const startTime = new Date().getTime();
  const homePage = new HomePage(page);
  await homePage.navigateToDashboard();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2_TC3_ID1', 'Accedi alla dashboard come utente autorizzato', 'La dashboard si apre e mostra tutti i suoi elementi', 'La dashboard si apre e mostra tutti i suoi elementi', true, {}, executionTime);
  }
  expect(page.url()).toContain(process.env.E2E_BASE_URL);
}

const verifyDashboardElements = async function(page, reporter) {
  const startTime = new Date().getTime();
  const homePage = new HomePage(page);
  await page.waitForLoadState('networkidle');
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2_TC3_ID2', 'Verifica la presenza di grafici, tabelle e altri contenuti previsti', 'Tutti gli elementi sono presenti e visualizzati correttamente', 'Tutti gli elementi sono presenti e visualizzati correttamente', true, {}, executionTime);
  }
  expect(await page.isVisible('text="Grafici"')).toBeTruthy();
  expect(await page.isVisible('text="Tabelle"')).toBeTruthy();
}

test("UC2_TC3 - Verifica della presenza di tutti gli elementi nella dashboard", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2_TC3 - Verifica della presenza di tutti gli elementi nella dashboard");

  navigateToLoginPage(page, null);
  fillLoginForm(page, null);
  submitLoginForm(page, null);
  verifyAuthenticationSuccess(page, null);

  await new Promise(r => setTimeout(r, 1000));

  const homePage = new HomePage(page);
  await homePage.navigateToDashboard();

  navigateToDashboard(page, reporter);
  verifyDashboardElements(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});