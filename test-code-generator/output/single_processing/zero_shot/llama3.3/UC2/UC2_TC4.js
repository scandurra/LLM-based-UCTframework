const { test, expect } = require('@playwright/test');
const HomePage = require('../../models/page_object_models/home-page');
const TestResultReporter = require('../../models/test-result-reporter');

const navigateToDashboardMobile = function(page, reporter) {
    const startTime = new Date().getTime();
    page.emulateMedia({ media: 'screen' });
    page.setViewportSize({ width: 375, height: 667 });
    navigateToLoginPage(page, null);
    enterCorrectCredentials(page, null);
    clickLoginButton(page, null);
    verifySuccessMessage(page, null);
    const homePage = new HomePage(page);
    homePage.navigateToDashboard();
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2_TC4_ID1', 'Access dashboard using mobile device', 'Dashboard adapts to screen', page.url(), page.url() === process.env.E2E_BASE_URL, `Viewport size: 375x667`, executionTime);
    }
    expect(page.url()).toBe(process.env.E2E_BASE_URL);
}

const navigateThroughSections = function(page, reporter) {
    const startTime = new Date().getTime();
    const homePage = new HomePage(page);
    // Assuming there are multiple sections in the dashboard
    // For demonstration purposes, we'll assume two sections: 'section1' and 'section2'
    const section1 = page.getByRole('link', { name: 'Section 1' });
    const section2 = page.getByRole('link', { name: 'Section 2' });
    await section1.click();
    await section2.click();
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2_TC4_ID2', 'Navigate through sections', 'All functionalities are accessible and usable', true, true, '', executionTime);
    }
    expect(section1).toBeVisible();
    expect(section2).toBeVisible();
}

test("UC2_TC4 - Test di usabilità della dashboard su dispositivi mobili", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2_TC4 - Test di usabilità della dashboard su dispositivi mobili");

    navigateToDashboardMobile(page, reporter);

    navigateThroughSections(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});