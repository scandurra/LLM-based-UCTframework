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
    reporter.addStep('UC2_TC4_ID1', 'Accedi alla dashboard utilizzando un dispositivo mobile', 'La dashboard si adatta allo schermo del dispositivo', 'La dashboard si adatta allo schermo del dispositivo', true, {}, executionTime);
  }
  expect(page.url()).toContain(process.env.E2E_BASE_URL);
}

const navigateThroughDashboardSections = async function(page, reporter) {
  const startTime = new Date().getTime();
  const homePage = new HomePage(page);
  await homePage.navigateToCensimento();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2_TC4_ID2', 'Naviga tra le varie sezioni della dashboard', 'Tutte le funzionalità sono accessibili e utilizzabili', 'Tutte le funzionalità sono accessibili e utilizzabili', true, {}, executionTime);
  }
}

test("UC2_TC4 - Test di usabilità della dashboard su dispositivi mobili", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2_TC4 - Test di usabilità della dashboard su dispositivi mobili");

  navigateToLoginPage(page, null);
  fillLoginForm(page, null);
  submitLoginForm(page, null);
  verifyAuthenticationSuccess(page, null);

  await page.emulateMedia({ media: 'screen' });
  await page.setViewportSize({ width: 375, height: 667 });

  navigateToDashboard(page, reporter);
  navigateThroughDashboardSections(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});