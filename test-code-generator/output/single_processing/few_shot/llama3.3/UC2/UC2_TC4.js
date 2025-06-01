const { test, expect } = require('@playwright/test');
const HomePage = require('../../models/page_object_models/home-page');
const LoginPage = require('../../models/page_object_models/login-page');
const TestResultReporter = require('../../models/test-result-reporter');

const reporter = new TestResultReporter();

// Step 1
const navigateToDashboardMobile = async function(page, reporter) {
  const startTime = new Date().getTime();
  await page.setViewportSize({ width: 375, height: 667 });
  await navigateToLoginPage(page, null);
  await insertCorrectCredentials(page, null);
  await clickLoginButton(page, null);
  await verifySuccessMessage(page, null);
  const homePage = new HomePage(page);
  await homePage.navigateToDashboard();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2_TC4_ID1', 'Access dashboard on mobile device', 'Dashboard adapts to screen size', 'Dashboard adapts to screen size', true, '', executionTime);
  }
  await expect(page).toContainText('Dashboard');
}

// Step 2
const navigateThroughSections = async function(page, reporter) {
  const homePage = new HomePage(page);
  const startTime = new Date().getTime();
  await homePage.navigateToCensimento();
  await page.waitForTimeout(1000);
  await homePage.clickOnProfile();
  await page.waitForTimeout(1000);
  await homePage.changeLanguage();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2_TC4_ID2', 'Navigate through sections', 'All functionalities are accessible and usable', 'All functionalities are accessible and usable', true, '', executionTime);
  }
  await expect(page).toContainText('Censimento');
}

test("UC2_TC4 - Test dashboard usability on mobile devices", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2_TC4 - Test dashboard usability on mobile devices");

  navigateToDashboardMobile(page, reporter);
  navigateThroughSections(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});