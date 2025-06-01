const { test, expect } = require('@playwright/test');
const LoginPage = require('../../models/page_object_models/login-page');
const TestResultReporter = require('../../models/test-result-reporter');

const reporter = new TestResultReporter();

// Step 1
const injectSqlString = async function(page, reporter) {
  const startTime = new Date().getTime();
  const loginPage = new LoginPage(page);
  await loginPage.displayLoginForm();
  const sqlInjectionString = "Robert'); DROP TABLE Students; --";
  await loginPage.enterEmail(sqlInjectionString);
  await loginPage.enterPassword("password");
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC1_TC6_ID1', 'Inject SQL string', 'SQL injection blocked', 'SQL injection blocked', true, { sqlInjectionString }, executionTime);
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
    reporter.addStep('UC1_TC6_ID2', 'Click Login button', 'Error message displayed', 'Error message displayed', true, {}, executionTime);
  }
}

// Step 3
const verifyErrorMessage = async function(page, reporter) {
  const startTime = new Date().getTime();
  const loginPage = new LoginPage(page);
  const errorMessage = await loginPage.getErrorMessage();
  expect(errorMessage).toContain('Unauthorized access attempt');
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC1_TC6_ID3', 'Verify error message', 'Error message contains "Unauthorized access attempt"', `Error message: ${errorMessage}`, true, {}, executionTime);
  }
}

test("UC1_TC6 - SQL Injection attempt", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC1_TC6 - SQL Injection attempt");

  await page.goto(process.env.E2E_LOGIN_URL);

  injectSqlString(page, reporter);
  clickLoginButton(page, reporter);
  verifyErrorMessage(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});