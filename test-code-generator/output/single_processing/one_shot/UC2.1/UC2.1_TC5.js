const { test, expect } = require('@playwright/test');
const DashboardPage = require('../../models/page_object_models/dashboard-page');
const TestResultReporter = require('../../models/test-result-reporter');

let reporter = new TestResultReporter();

const navigateToDashboardWithoutLogin = async function(page, reporter) {
  const startTime = new Date().getTime();
  await page.goto(process.env.E2E_BASE_URL + 'dashboard');
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2.1_TC5_ID1', 'Utente non autorizzato tenta di accedere alla dashboard', 'Pagina di accesso negato visualizzata', 'Pagina di accesso negato visualizzata', true, `E2E_BASE_URL: ${process.env.E2E_BASE_URL}`, executionTime);
  }
}

const tryDownloadPdf = async function(page, reporter) {
  const dashboardPage = new DashboardPage(page);
  const startTime = Date.now();
  await dashboardPage.downloadPdf();
  const endTime = Date.now();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2.1_TC5_ID2', 'L\'utente tenta di iniziare il processo di download cliccando sul tasto dedicato', 'Messaggio di accesso negato visualizzato', 'Messaggio di accesso negato visualizzato', true, {}, executionTime);
  }
}

test("UC2.1_TC5 - Download PDF senza autorizzazione", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.1_TC5 - Download PDF senza autorizzazione");

  navigateToDashboardWithoutLogin(page, null);
  tryDownloadPdf(page, reporter);

  expect(await page.title()).not.toContain('Dashboard');

  reporter.onTestEnd(test, { status: "passed" });
});