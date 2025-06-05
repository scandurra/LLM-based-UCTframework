const { test, expect } = require('@playwright/test');
const HomePage = require('../../models/page_object_models/home-page');
const TestResultReporter = require('../../models/test-result-reporter');

const reporter = new TestResultReporter();

// Step 1: Accedi alla dashboard come utente autorizzato
const navigateToDashboard = async function(page, reporter) {
    const homePage = new HomePage(page);
    const startTime = new Date().getTime();
    await homePage.navigateToDashboard();
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2_TC3_ID1', 'Access to dashboard', 'Dashboard opened and all elements are displayed', 'Dashboard opened and all elements are displayed', true, '', executionTime);
    }
    await expect(page).toContainText('Dashboard');
}

// Step 2: Verifica la presenza di grafici, tabelle e altri contenuti previsti
const verifyDashboardElements = async function(page, reporter) {
    const homePage = new HomePage(page);
    const startTime = new Date().getTime();
    // Add assertions to check for the presence of graphs, tables and other expected content
    await expect(page).toContainText('Grafici');
    await expect(page).toContainText('Tabelle');
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2_TC3_ID2', 'Verify dashboard elements', 'All elements are present and displayed correctly', 'All elements are present and displayed correctly', true, '', executionTime);
    }
}

test("UC2_TC3 - Verifica della presenza di tutti gli elementi nella dashboard", async ({ page, browserName }) => {
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2_TC3 - Verifica della presenza di tutti gli elementi nella dashboard");

    // Reuse existing method in the prompt without redefining them
    navigateToLoginPage(page, null);
    insertCorrectCredentials(page, null);
    clickLoginButton(page, null);
    verifySuccessMessage(page, null);

    navigateToDashboard(page, reporter);
    verifyDashboardElements(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});