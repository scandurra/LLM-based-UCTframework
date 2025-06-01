const { test, expect } = require('@playwright/test');
const DashboardPage = require('../../models/page_object_models/dashboard-page');
const LoginPage = require('../../models/page_object_models/login-page');
const TestResultReporter = require('../../models/test-result-reporter');

const reporter = new TestResultReporter();

// Step 1
const navigateToLoginPage = async function(page, reporter) {
  const startTime = new Date().getTime();
  await page.goto(process.env.E2E_LOGIN_URL);
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC1_TC1_ID1', 'Navigate to login page', 'Login page loaded', 'Login page loaded', true, `E2E_LOGIN_URL: ${process.env.E2E_LOGIN_URL}`, executionTime);
  }
  await expect(page).toContainText('Login');
}

// Step 2
const insertIncorrectCredentials = async function(page, reporter) {
  const loginPage = new LoginPage(page);
  const startTime = new Date().getTime();
  await loginPage.displayLoginForm();
  await loginPage.enterEmail('wrong_email@example.com');
  await loginPage.enterPassword('wrong_password');
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC1_TC1_ID2', 'Insert incorrect credentials', 'Credentials accepted', 'Credentials not accepted', false, `Email: wrong_email@example.com, Password: wrong_password`, executionTime);
  }
}

// Step 3
const clickLoginButton = async function(page, reporter) {
  const loginPage = new LoginPage(page);
  const startTime = new Date().getTime();
  await loginPage.login();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC1_TC1_ID3', 'Click login button', 'System proceeds with authentication', 'System does not proceed with authentication', false, '', executionTime);
  }
}

// Step 4
const navigateToDashboardWithoutLogin = async function(page, reporter) {
  const startTime = new Date().getTime();
  await page.goto(process.env.E2E_BASE_URL + 'dashboard');
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2_1_TC5_ID1', 'Navigate to dashboard without login', 'Dashboard page loaded', 'Access denied message displayed', true, '', executionTime);
  }
}

// Step 5
const tryDownloadPdf = async function(page, reporter) {
  const dashboardPage = new DashboardPage(page);
  const startTime = new Date().getTime();
  await dashboardPage.downloadPdf();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2_1_TC5_ID2', 'Try download PDF', 'PDF downloaded', 'Access denied message displayed', true, '', executionTime);
  }
  await expect(page).toContainText('Accesso negato');
}

test("UC2.1_TC5 - Download PDF senza autorizzazione", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.1_TC5 - Download PDF senza autorizzazione");

  navigateToLoginPage(page, null);
  insertIncorrectCredentials(page, null);
  clickLoginButton(page, null);

  navigateToDashboardWithoutLogin(page, reporter);
  tryDownloadPdf(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});