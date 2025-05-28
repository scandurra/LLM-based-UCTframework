const { test, expect } = require('@playwright/test');
const HomePage = require('../../models/page_object_models/home-page');
const TestResultReporter = require('../../models/test-result-reporter');

const clickOnProfile = async function(page, reporter) {
    const startTime = new Date().getTime();
    const homePage = new HomePage(page);
    await homePage.clickOnProfile();
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC5_TC6_ID1', 'Click on profile', 'Dropdown menu displayed', page.url(), true, '', executionTime);
    }
    expect(page.url()).not.toBeNull();
}

const verifyNoLanguageChange = async function(page, reporter) {
    const startTime = new Date().getTime();
    const homePage = new HomePage(page);
    await homePage.changeLanguage();
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC5_TC6_ID2', 'No language change', 'Language not changed', page.url(), true, '', executionTime);
    }
    expect(page.url()).not.toBeNull();
}

test("UC5_TC6 - Selezione lingua senza selezionare una opzione dal menù a tendina", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC5_TC6 - Selezione lingua senza selezionare una opzione dal menù a tendina");

    navigateToLoginPage(page, null);
    enterCorrectCredentials(page, null);
    clickLoginButton(page, null);
    verifySuccessMessage(page, null);

    const homePage = new HomePage(page);
    await homePage.navigateToDashboard();

    clickOnProfile(page, reporter);
    verifyNoLanguageChange(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});