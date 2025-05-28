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

const fillLoginForm = async function(page, reporter) {
  const loginPage = new LoginPage(page);

  let startTime = Date.now();
  await loginPage.displayLoginForm();
  await loginPage.enterPassword(process.env.E2E_LOGIN_PASSWORD_ADMIN);
  let endTime = Date.now();
  if (reporter) {
    reporter.addStep('UC1_TC3_ID2', 'Fill login form with empty username and valid password', `Form filled with empty username and valid password`, `Form filled with empty username and valid password`, true, { password: process.env.E2E_LOGIN_PASSWORD_ADMIN }, endTime - startTime);
  }
}

const submitLoginForm = async function(page, reporter) {
  const loginPage = new LoginPage(page);

  let startTime = Date.now();
  await loginPage.login();
  let endTime = Date.now();
  if (reporter) {
    reporter.addStep('UC1_TC3_ID3', 'Submit login form with empty username and valid password', `Form submitted`, `Form submitted`, true, {}, endTime - startTime);
  }
}

const verifyErrorMessage = async function(page, reporter) {
  const loginPage = new LoginPage(page);

  let startTime = Date.now();
  let errorMessage = await loginPage.getErrorMessage();
  let testPass = errorMessage !== null && errorMessage.includes('compilare tutti i campi');
  let endTime = Date.now();
  if (reporter) {
    reporter.addStep('UC1_TC3_ID4', 'Verify error message is displayed', `Error message is displayed and requires to fill all fields`, testPass ? `Error message is displayed and requires to fill all fields` : `No error message or incorrect error message`, testPass, { errorMessage: errorMessage }, endTime - startTime);
  }
  expect(testPass).toBe(true);
}

test("UC1_TC3 - Login con campo username vuoto", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC1_TC3 - Login con campo username vuoto");

  navigateToLoginPage(page, reporter);
  fillLoginForm(page, reporter);
  submitLoginForm(page, reporter);
  verifyErrorMessage(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});