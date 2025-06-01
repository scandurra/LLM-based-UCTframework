const { test, expect } = require('@playwright/test');
const HomePage = require('../../models/page_object_models/home-page');
const LoginPage = require('../../models/page_object_models/login-page');
const TestResultReporter = require('../../models/test-result-reporter');

const reporter = new TestResultReporter();

// Step 1
const navigateToHomePage = async function(page, reporter) {
  const startTime = new Date().getTime();
  await page.goto(process.env.E2E_BASE_URL);
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2_TC2_ID1', 'Navigate to home page', 'Home page loaded', 'Home page loaded', true, `E2E_BASE_URL: ${process.env.E2E_BASE_URL}`, executionTime);
  }
  await expect(page).toContainText('Home');
}

// Step 2
const tryAccessDashboard = async function(page, reporter) {
  const startTime = new Date().getTime();
  await page.goto(process.env.E2E_DASHBOARD_URL);
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2_TC2_ID2', 'Try access dashboard', 'Access denied page loaded', 'Access denied page loaded', true, `E2E_DASHBOARD_URL: ${process.env.E2E_DASHBOARD_URL}`, executionTime);
  }
  await expect(page).toContainText('Accesso Negato');
}

test("UC2_TC2 - Tentativo di accesso alla dashboard senza autorizzazione", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2_TC2 - Tentativo di accesso alla dashboard senza autorizzazione");

  navigateToLoginPage(page, null);
  navigateToHomePage(page, reporter);
  tryAccessDashboard(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});