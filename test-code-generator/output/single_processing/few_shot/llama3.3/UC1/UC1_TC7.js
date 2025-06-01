const { test, expect } = require('@playwright/test');
const LoginPage = require('../../models/page_object_models/login-page');
const TestResultReporter = require('../../models/test-result-reporter');

const reporter = new TestResultReporter();

// Step 1
const injectXSSPayload = async function(page, reporter) {
  const startTime = new Date().getTime();
  const loginPage = new LoginPage(page);
  await loginPage.displayLoginForm();
  const xssPayload = '<script>alert("XSS")</script>';
  await loginPage.enterEmail(xssPayload);
  await loginPage.enterPassword('password');
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC1_TC7_ID1', 'Inject XSS payload', 'XSS payload injected', 'XSS payload injected', true, { xssPayload }, executionTime);
  }
}

// Step 2
const clickLoginButton = async function(page, reporter) {
  const startTime = new Date().getTime();
  const loginPage = new LoginPage(page);
  await loginPage.login();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC1_TC7_ID2', 'Click login button', 'Login button clicked', 'Login button clicked', true, {}, executionTime);
  }
}

// Step 3
const verifyErrorMessage = async function(page, reporter) {
  const startTime = new Date().getTime();
  const loginPage = new LoginPage(page);
  const errorMessage = await loginPage.getErrorMessage();
  expect(errorMessage).toContain('accesso non autorizzato');
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC1_TC7_ID3', 'Verify error message', 'Error message displayed', errorMessage, true, {}, executionTime);
  }
}

test("UC1_TC7 - Tentativo di login con Cross-Site Scripting (XSS)", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC1_TC7 - Tentativo di login con Cross-Site Scripting (XSS)");
  await page.goto(process.env.E2E_LOGIN_URL);

  injectXSSPayload(page, reporter);
  clickLoginButton(page, reporter);
  verifyErrorMessage(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});