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
    reporter.addStep('UC1_TC4_ID1', 'Navigate to login page', 'Login page loaded', 'Login page loaded', true, `E2E_LOGIN_URL: ${process.env.E2E_LOGIN_URL}`, executionTime);
  }
}

const fillLoginForm = async function(page, reporter) {
  const loginPage = new LoginPage(page);

  let startTime = Date.now();
  await loginPage.displayLoginForm();
  await loginPage.enterEmail(process.env.E2E_LOGIN_EMAIL_ADMIN);
  let endTime = Date.now();
  if (reporter) {
    reporter.addStep('UC1_TC4_ID2', 'Fill login form with empty password', 'Form filled', 'Form filled', true, { email: process.env.E2E_LOGIN_EMAIL_ADMIN }, (endTime - startTime) / 1000);
  }
}

const submitLoginForm = async function(page, reporter) {
  const loginPage = new LoginPage(page);

  let startTime = Date.now();
  await loginPage.login();
  let endTime = Date.now();
  if (reporter) {
    reporter.addStep('UC1_TC4_ID3', 'Submit login form', 'Form submitted', 'Form submitted', true, {}, (endTime - startTime) / 1000);
  }
}

const verifyErrorMessage = async function(page, reporter) {
  const loginPage = new LoginPage(page);

  let startTime = Date.now();
  const errorMessage = await loginPage.getErrorMessage();
  let endTime = Date.now();
  const testPass = errorMessage !== '';
  if (reporter) {
    reporter.addStep('UC1_TC4_ID4', 'Verify error message', 'Error message displayed', testPass ? 'Error message displayed' : 'No error message displayed', testPass, { errorMessage }, (endTime - startTime) / 1000);
  }
  expect(testPass).toBe(true);
}

test("UC1_TC4 - Login con campo password vuoto", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC1_TC4 - Login con campo password vuoto");

  navigateToLoginPage(page, reporter);
  fillLoginForm(page, reporter);
  submitLoginForm(page, reporter);
  verifyErrorMessage(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});