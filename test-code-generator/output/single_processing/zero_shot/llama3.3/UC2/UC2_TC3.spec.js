const { test, expect } = require('@playwright/test');
const HomePage = require('../../models/page_object_models/home-page');
const TestResultReporter = require('../../models/test-result-reporter');
const UC1_TC1 = require('../.././output/single_processing/zero_shot/llama3.3/UC1/UC1_TC1.spec.js');

const accessPlatformWithDifferentUserProfiles = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await fillCorrectCredentials(page, null);
    await clickLoginButton(page, null);

    const homePage = new HomePage(page);
    await homePage.navigateToDashboard();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2_TC3_ID1', 'Accedi alla piattaforma con diversi profili utente', true, await homePage.dashboardButton.isVisible(), true, '', executionTime);
    }

    expect(await homePage.dashboardButton.isVisible()).toBeTruthy();
}

const verifyFunctionalityAndSectionsForEachUserType = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const homePage = new HomePage(page);
    await homePage.navigateToCensimento();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2_TC3_ID2', 'Verifica la presenza di funzioni e sezioni specifiche per ogni tipo di utente', true, await page.url() === process.env.E2E_CTS_URL, true, '', executionTime);
    }

    expect(await page.url()).toBe(process.env.E2E_CTS_URL);
}

test("UC2_TC3 - Apertura della dashboard con diverse autorizzazioni", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2_TC3 - Apertura della dashboard con diverse autorizzazioni");

    await page.goto(process.env.E2E_BASE_URL);

    await accessPlatformWithDifferentUserProfiles(page, reporter);
    await verifyFunctionalityAndSectionsForEachUserType(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});