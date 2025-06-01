const { test, expect } = require('@playwright/test');
const LoginPage = require('../../models/page_object_models/login-page');
const TestResultReporter = require('../../models/test-result-reporter');

let reporter = new TestResultReporter();

const insertNonExistingCredentials = async function(page, reporter) {
  const startTime = new Date().getTime();
  const loginPage = new LoginPage(page);
  await loginPage.displayLoginForm();
  await loginPage.enterEmail('nonexistinguser@example.com');
  await loginPage.enterPassword('wrongpassword');
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC1_TC9_ID1', 'Insert non existing credentials', 'Credentials inserted', 'Credentials inserted', true, { email: 'nonexistinguser@example.com', password: 'wrongpassword' }, executionTime);
  }
  await expect(loginPage.emailInput).toBeVisible();
}

const clickLoginButton = async function(page, reporter) {
  const startTime = new Date().getTime();
  const loginPage = new LoginPage(page);
  await loginPage.login();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC1_TC9_ID2', 'Click login button', 'Login button clicked', 'Login button clicked', true, {}, executionTime);
  }
}

const verifyErrorMessage = async function(page, reporter) {
  const startTime = new Date().getTime();
  const loginPage = new LoginPage(page);
  const errorMessage = await loginPage.getErrorMessage();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC1_TC9_ID3', 'Verify error message', 'Error message displayed', errorMessage, errorMessage !== null, { errorMessage: errorMessage }, executionTime);
  }
  await expect(loginPage.errorMessage).toBeVisible();
}

test("UC1_TC9 - Login with non existing account", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC1_TC9 - Login with non existing account");
  await page.goto(process.env.E2E_LOGIN_URL);

  await insertNonExistingCredentials(page, reporter);
  await clickLoginButton(page, reporter);
  await verifyErrorMessage(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});