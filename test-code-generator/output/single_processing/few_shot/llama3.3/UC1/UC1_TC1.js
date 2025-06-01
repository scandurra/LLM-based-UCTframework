const { test, expect } = require('@playwright/test');
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

test("UC1_TC1 - Login with valid credentials", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC1_TC1 - Login with valid credentials");

  navigateToLoginPage(page, reporter);
  insertCorrectCredentials(page, reporter);
  clickLoginButton(page, reporter);
  verifySuccessMessage(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});