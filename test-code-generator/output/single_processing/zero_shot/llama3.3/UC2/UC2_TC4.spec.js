const { test, expect } = require('@playwright/test');
const HomePage = require('../../models/page_object_models/home-page');
const TestResultReporter = require('../../models/test-result-reporter');
const UC1_TC1 = require('../.././output/single_processing/zero_shot/llama3.3/UC1/UC1_TC1.spec.js');

const accessPlatformWithDifferentBrowsers = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await fillCorrectCredentials(page, null);
    await clickLoginButton(page, null);

    const homePage = new HomePage(page);
    await homePage.navigateToDashboard();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2_TC4_ID1', 'Accedi alla piattaforma utilizzando browser differenti', true, await homePage.dashboardButton.isVisible(), true, `Browser: ${page.browser().name()}`, executionTime);
    }

    expect(await homePage.dashboardButton.isVisible()).toBeTruthy();
}

const verifyDashboardVisualization = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const homePage = new HomePage(page);
    await homePage.navigateToDashboard();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2_TC4_ID2', 'Verifica la presenza di eventuali problemi di visualizzazione o funzionalità', true, await homePage.dashboardButton.isVisible(), true, '', executionTime);
    }

    expect(await homePage.dashboardButton.isVisible()).toBeTruthy();
}

test("UC2_TC4 - Verifica della compatibilità con diversi browser", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2_TC4 - Verifica della compatibilità con diversi browser");

    await page.goto(process.env.E2E_BASE_URL);

    await accessPlatformWithDifferentBrowsers(page, reporter);
    await verifyDashboardVisualization(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});