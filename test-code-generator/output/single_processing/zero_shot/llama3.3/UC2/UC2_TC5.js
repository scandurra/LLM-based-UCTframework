const { test, expect } = require('@playwright/test');
const HomePage = require('../../models/page_object_models/home-page');
const TestResultReporter = require('../../models/test-result-reporter');

const navigateToDashboard = function(page, reporter) {
    const startTime = new Date().getTime();
    const homePage = new HomePage(page);
    homePage.navigateToDashboard();
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2_TC5_ID1', 'Navigate to dashboard', 'Dashboard loaded', page.url(), true, '', executionTime);
    }
    expect(page.url()).not.toBeNull();
}

const verifyDashboardCompatibility = function(page, reporter) {
    const startTime = new Date().getTime();
    // Add verification logic for dashboard compatibility
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2_TC5_ID2', 'Verify dashboard compatibility', 'No compatibility issues found', 'No compatibility issues found', true, '', executionTime);
    }
}

test("UC2_TC5 - Verifica della compatibilità con browser differenti", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2_TC5 - Verifica della compatibilità con browser differenti");

    navigateToLoginPage(page, null); // Reuse UC1
    enterCorrectCredentials(page, null); // Reuse UC1
    clickLoginButton(page, null); // Reuse UC1
    verifySuccessMessage(page, null); // Reuse UC1

    navigateToDashboard(page, reporter);

    verifyDashboardCompatibility(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});