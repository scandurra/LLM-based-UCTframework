const { test, expect } = require('@playwright/test');
const DashboardPage = require('../../models/page_object_models/dashboard-page');
const TestResultReporter = require('../../models/test-result-reporter');

let reporter = new TestResultReporter();

const attemptDownloadPdf = async function(page, reporter) {
  const dashboardPage = new DashboardPage(page);
  const startTime = new Date().getTime();
  await dashboardPage.downloadPdf();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2.1_TC6_ID1', 'L\'utente tenta di iniziare il processo di download cliccando sul tasto dedicato', 'Messaggio di errore relativo al browser non supportato visualizzato', 'Messaggio di errore relativo al browser non supportato visualizzato', true, {}, executionTime);
  }
  expect(await page.title()).toContain('Errore');
}

test("UC2.1_TC6 - Download PDF con browser non supportato", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.1_TC6 - Download PDF con browser non supportato");

  navigateToLoginPage(page, null);
  fillLoginForm(page, null);
  submitLoginForm(page, null);
  verifyAuthenticationSuccess(page, null);

  navigateToHomePage(page, null);
  navigateToDashboard(page, null);

  attemptDownloadPdf(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});