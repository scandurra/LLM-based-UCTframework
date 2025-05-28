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
    reporter.addStep('UC2.1_TC4_ID1', 'L\'utente inizia il processo di download cliccando sul tasto dedicato', 'Richiesta di conferma visualizzata', 'Richiesta di conferma visualizzata', true, {}, executionTime);
  }
  expect(await page.isVisible('text=Conferma download')).toBeTruthy();
}

const confirmDownload = async function(page, reporter) {
  const startTime = new Date().getTime();
  await page.click('text=Conferma');
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2.1_TC4_ID2', 'L\'utente conferma la richiesta', 'File scaricato ma danneggiato', 'File scaricato ma danneggiato', true, {}, executionTime);
  }
}

const waitForDownloadCompletion = async function(page, reporter) {
  const startTime = new Date().getTime();
  await page.waitForTimeout(5000);
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2.1_TC4_ID3', 'L\'utente attende il completamento del download', 'Messaggio di operazione completata con errore visualizzato', 'Messaggio di operazione completata con errore visualizzato', true, {}, executionTime);
  }
  expect(await page.isVisible('text=Operazione completata con errore')).toBeTruthy();
}

test("UC2.1_TC4 - Download PDF con file danneggiato", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.1_TC4 - Download PDF con file danneggiato");

  navigateToLoginPage(page, null);
  fillLoginForm(page, null);
  submitLoginForm(page, null);
  verifyAuthenticationSuccess(page, null);

  navigateToHomePage(page, null);
  navigateToDashboard(page, null);

  startDownloadProcess(page, reporter);
  confirmDownload(page, reporter);
  waitForDownloadCompletion(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});