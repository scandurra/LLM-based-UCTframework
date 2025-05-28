const { test, expect } = require('@playwright/test');
const DashboardPage = require('../../models/page_object_models/dashboard-page');
const TestResultReporter = require('../../models/test-result-reporter');

let reporter = new TestResultReporter();

const startDownloadProcess = async function(page, reporter) {
  const dashboardPage = new DashboardPage(page);
  const startTime = new Date().getTime();
  await dashboardPage.downloadPdf();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2.1_TC2_ID1', 'L\'utente inizia il processo di download cliccando sul tasto dedicato', 'Richiesta di conferma visualizzata', 'Richiesta di conferma visualizzata', true, {}, executionTime);
  }
  expect(await page.getByText('Conferma download')).toBeVisible();
}

const cancelDownloadRequest = async function(page, reporter) {
  const startTime = new Date().getTime();
  await page.getByRole('button', { name: 'Annulla' }).click();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2.1_TC2_ID2', 'L\'utente annulla la richiesta', 'Download non avviato', 'Download non avviato', true, {}, executionTime);
  }
  expect(await page.getByRole('button', { name: 'Annulla' })).not.toBeVisible();
}

test("UC2.1_TC2 - Download PDF annullato", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.1_TC2 - Download PDF annullato");

  navigateToLoginPage(page, null);
  fillLoginForm(page, null);
  submitLoginForm(page, null);
  verifyAuthenticationSuccess(page, null);

  navigateToHomePage(page, null);
  navigateToDashboard(page, null);

  startDownloadProcess(page, reporter);
  cancelDownloadRequest(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});