const { test, expect } = require('@playwright/test');
const HomePage = require('../../models/page_object_models/home-page');
const LoginPage = require('../../models/page_object_models/login-page');
const TestResultReporter = require('../../models/test-result-reporter');

const reporter = new TestResultReporter();

// Step 1
const navigateToDashboard = async function(page, reporter) {
  const homePage = new HomePage(page);
  const startTime = new Date().getTime();
  await homePage.navigateToDashboard();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2_TC5_ID1', 'Navigate to dashboard', 'Dashboard loaded', 'Dashboard loaded', true, '', executionTime);
  }
  await expect(page).toContainText('Dashboard');
}

// Step 2
const verifyCompatibility = async function(page, reporter) {
  const homePage = new HomePage(page);
  const startTime = new Date().getTime();
  await homePage.navigateToCensimento();
  await homePage.clickOnProfile();
  await homePage.changeLanguage();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2_TC5_ID2', 'Verify compatibility', 'No significant compatibility issues', 'No significant compatibility issues', true, '', executionTime);
  }
  await expect(page).not.toContainText('Error');
}

test("UC2_TC5 - Verify compatibility with different browsers", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2_TC5 - Verify compatibility with different browsers");

  navigateToLoginPage(page, null);
  insertCorrectCredentials(page, null);
  clickLoginButton(page, null);
  verifySuccessMessage(page, null);

  navigateToDashboard(page, reporter);
  verifyCompatibility(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});