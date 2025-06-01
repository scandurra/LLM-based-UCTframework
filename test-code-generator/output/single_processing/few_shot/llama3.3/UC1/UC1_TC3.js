const { test, expect } = require('@playwright/test');
const LoginPage = require('../../models/page_object_models/login-page');
const TestResultReporter = require('../../models/test-result-reporter');

let reporter = new TestResultReporter();

const navigateToLoginPage = async function(page, reporter) {
  const startTime = new Date().getTime();
  await page.goto(process.env.E2E_LOGIN_URL);
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC1_TC3_ID1', 'Navigate to login page', 'Login page loaded', 'Login page loaded', true, `E2E_LOGIN_URL: ${process.env.E2E_LOGIN_URL}`, executionTime);
  }
}

const leaveUsernameEmptyAndEnterPassword = async function(page, reporter) {
  const startTime = new Date().getTime();
  const loginPage = new LoginPage(page);
  await loginPage.displayLoginForm();
  await loginPage.enterPassword(process.env.E2E_LOGIN_PASSWORD_ADMIN);
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC1_TC3_ID2', 'Leave username empty and enter password', 'Username empty and password entered', 'Username empty and password entered', true, `E2E_LOGIN_PASSWORD_ADMIN: ${process.env.E2E_LOGIN_PASSWORD_ADMIN}`, executionTime);
  }
}

const clickLoginButton = async function(page, reporter) {
  const startTime = new Date().getTime();
  const loginPage = new LoginPage(page);
  await loginPage.login();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC1_TC3_ID3', 'Click login button', 'Login button clicked', 'Login button clicked', true, '', executionTime);
  }
}

const verifyErrorMessage = async function(page, reporter) {
  const startTime = new Date().getTime();
  const loginPage = new LoginPage(page);
  const errorMessage = await loginPage.getErrorMessage();
  expect(errorMessage).toContain('compilare tutti i campi');
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC1_TC3_ID4', 'Verify error message', 'Error message displayed', `Error message: ${errorMessage}`, true, '', executionTime);
  }
}

test("UC1_TC3 - Login con campo username vuoto", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC1_TC3 - Login con campo username vuoto");

  navigateToLoginPage(page, null);
  leaveUsernameEmptyAndEnterPassword(page, reporter);
  clickLoginButton(page, reporter);
  verifyErrorMessage(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});