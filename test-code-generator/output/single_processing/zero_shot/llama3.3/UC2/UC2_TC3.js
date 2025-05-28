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
        reporter.addStep('UC2_TC3_ID1', 'Navigate to dashboard', 'Dashboard opened and all elements displayed', page.url(), page.url() === process.env.E2E_DASHBOARD_URL, '', executionTime);
    }
    expect(page.url()).toBe(process.env.E2E_DASHBOARD_URL);
}

const verifyDashboardElements = function(page, reporter) {
    const startTime = new Date().getTime();
    // Assuming the dashboard elements are visible and can be checked using page.content()
    const dashboardContent = page.content();
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2_TC3_ID2', 'Verify dashboard elements', 'All elements present and displayed correctly', 'Elements found', dashboardContent.includes('expected element'), '', executionTime);
    }
    expect(dashboardContent).toContain('expected element');
}

test("UC2_TC3 - Verifica della presenza di tutti gli elementi nella dashboard", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2_TC3 - Verifica della presenza di tutti gli elementi nella dashboard");

    navigateToLoginPage(page, null);
    enterCorrectCredentials(page, null);
    clickLoginButton(page, null);
    verifySuccessMessage(page, null);

    navigateToDashboard(page, reporter);

    verifyDashboardElements(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});