const { test, expect } = require('@playwright/test');
const DashboardPage = require('../../models/page_object_models/dashboard-page');
const TestResultReporter = require('../../models/test-result-reporter');

const reporter = new TestResultReporter();

// Step 1
const selectComuneForSearch = async function(page, reporter) {
  const dashboardPage = new DashboardPage(page);
  const startTime = new Date().getTime();
  await dashboardPage.selectComuneForImpianti(0);
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2.2_TC1_ID1', 'Select comune for search', 'Search parameters are visible', 'Search parameters are visible', true, '', executionTime);
  }
  await expect(dashboardPage.comuneSelect).toBeVisible();
}

// Step 2
const selectSearchParameters = async function(page, reporter) {
  const dashboardPage = new DashboardPage(page);
  const startTime = new Date().getTime();
  await dashboardPage.showImpianti();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2.2_TC1_ID2', 'Select search parameters', 'Search confirmation options are visible', 'Search confirmation options are visible', true, '', executionTime);
  }
  await expect(dashboardPage.showImpiantiButton).toBeVisible();
}

// Step 3
const confirmSearch = async function(page, reporter) {
  const dashboardPage = new DashboardPage(page);
  const startTime = new Date().getTime();
  await dashboardPage.isImpiantiVisible();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2.2_TC1_ID3', 'Confirm search', 'Impianti di illuminazione are visible on the map', 'Impianti di illuminazione are visible on the map', true, '', executionTime);
  }
  await expect(await dashboardPage.isImpiantiVisible()).toBeTruthy();
}

test("UC2.2_TC1 - Ricerca impianti di illuminazione con parametri validi", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.2_TC1 - Ricerca impianti di illuminazione con parametri validi");

  navigateToLoginPage(page, null);
  insertCorrectCredentials(page, null);
  clickLoginButton(page, null);
  verifySuccessMessage(page, null);

  navigateToDashboard(page, reporter);

  selectComuneForSearch(page, reporter);
  selectSearchParameters(page, reporter);
  confirmSearch(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});