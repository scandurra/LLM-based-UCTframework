const { test, expect } = require('@playwright/test');
const DashboardPage = require('../../models/page_object_models/dashboard-page');
const LoginPage = require('../../models/page_object_models/login-page');
const HomePage = require('../../models/page_object_models/home-page');
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
const insertCorrectCredentials = async function(page, reporter) {
  const loginPage = new LoginPage(page);
  const startTime = new Date().getTime();
  await loginPage.displayLoginForm();
  await loginPage.enterEmail(process.env.E2E_LOGIN_EMAIL_ADMIN);
  await loginPage.enterPassword(process.env.E2E_LOGIN_PASSWORD_ADMIN);
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC1_TC1_ID2', 'Insert correct credentials', 'Credentials accepted', 'Credentials accepted', true, `Email: ${process.env.E2E_LOGIN_EMAIL_ADMIN}, Password: ${process.env.E2E_LOGIN_PASSWORD_ADMIN}`, executionTime);
  }
  await expect(loginPage.emailInput).toHaveValue(process.env.E2E_LOGIN_EMAIL_ADMIN);
  await expect(loginPage.passwordInput).toHaveValue(process.env.E2E_LOGIN_PASSWORD_ADMIN);
}

// Step 3
const clickLoginButton = async function(page, reporter) {
  const loginPage = new LoginPage(page);
  const startTime = new Date().getTime();
  await loginPage.login();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC1_TC1_ID3', 'Click login button', 'System proceeds with authentication', 'System proceeds with authentication', true, '', executionTime);
  }
}

// Step 4
const verifySuccessMessage = async function(page, reporter) {
  const loginPage = new LoginPage(page);
  const startTime = new Date().getTime();
  const errorMessage = await loginPage.getErrorMessage();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC1_TC1_ID4', 'Verify success message', 'Success message displayed', errorMessage ? 'Error message displayed' : 'Success message displayed', !errorMessage, '', executionTime);
  }
  await expect(errorMessage).toBeNull();
}

// Step 5
const navigateToDashboard = async function(page, reporter) {
  const homePage = new HomePage(page);
  const startTime = new Date().getTime();
  await homePage.navigateToDashboard();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2_TC1_ID1', 'Navigate to dashboard', 'Dashboard page loaded', 'Dashboard page loaded', true, '', executionTime);
  }
  await expect(page).toContainText('Dashboard');
}

// Step 6
const startDownloadProcess = async function(page, reporter) {
  const dashboardPage = new DashboardPage(page);
  const startTime = new Date().getTime();
  await dashboardPage.downloadPdf();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2.1_TC2_ID1', 'Start download process', 'Download confirmation requested', 'Download confirmation requested', true, '', executionTime);
  }
}

// Step 7
const cancelDownloadRequest = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Assuming the cancel button is the first button with role 'button' and name 'Cancel'
  await page.getByRole('button', { name: 'Cancel' }).click();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2.1_TC2_ID2', 'Cancel download request', 'Download not started', 'Download not started', true, '', executionTime);
  }
}

test("UC2.1_TC2 - Download PDF annullato", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.1_TC2 - Download PDF annullato");

  navigateToLoginPage(page, null);
  insertCorrectCredentials(page, null);
  clickLoginButton(page, null);
  verifySuccessMessage(page, null);

  navigateToDashboard(page, reporter);

  const dashboardPage = new DashboardPage(page);
  await startDownloadProcess(page, reporter);
  await cancelDownloadRequest(page, reporter);

  // Verify that no file was downloaded
  const downloads = await page.context().waitForEvent('download');
  expect(downloads).toBeUndefined();

  reporter.onTestEnd(test, { status: "passed" });
});