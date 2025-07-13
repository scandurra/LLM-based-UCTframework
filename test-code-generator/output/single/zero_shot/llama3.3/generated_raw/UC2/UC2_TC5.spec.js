const { test, expect } = require('@playwright/test');
const HomePage = require('../../models/page_object_models/home-page');
const TestResultReporter = require('../../models/test-result-reporter');
const UC1_TC1 = require('../.././output/single_processing/zero_shot/llama3.3/UC1/UC1_TC1.spec.js');

const accessPlatformWithMobileDevice = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await page.goto(process.env.E2E_BASE_URL);
    await fillCorrectCredentials(page, null);
    await clickLoginButton(page, null);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2_TC5_ID1', 'Accedi alla piattaforma tramite smartphone o tablet', true, page.url() === process.env.E2E_HOME_URL, true, '', executionTime);
    }

    expect(page.url()).toBe(process.env.E2E_HOME_URL);
}

const verifyDashboardNavigation = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const homePage = new HomePage(page);
    await homePage.navigateToDashboard();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2_TC5_ID2', 'Verifica la navigazione e l’accesso alle funzionalità principali', true, page.url() === process.env.E2E_DASHBOARD_URL, true, '', executionTime);
    }

    expect(page.url()).toBe(process.env.E2E_DASHBOARD_URL);
}

test("UC2_TC5 - Apertura della dashboard su dispositivi mobili", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2_TC5 - Apertura della dashboard su dispositivi mobili");

    await page.setViewportSize({ width: 375, height: 667 });

    await accessPlatformWithMobileDevice(page, reporter);
    await verifyDashboardNavigation(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});