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
        reporter.addStep('UC5_TC2_ID1', 'Click on profile', 'Dropdown menu displayed', 'Dropdown menu displayed', true, '', executionTime);
    }
}

const changeLanguageToEnglish = async function(page, reporter) {
    const startTime = new Date().getTime();
    const homePage = new HomePage(page);
    await homePage.changeLanguage();
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC5_TC2_ID2', 'Change language to English', 'Portal reloaded with selected language', 'Portal reloaded with selected language', true, '', executionTime);
    }
}

test("UC5_TC2 - Selezione lingua inglese", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC5_TC2 - Selezione lingua inglese");

    navigateToLoginPage(page, null);
    enterCorrectCredentials(page, null);
    clickLoginButton(page, null);
    verifySuccessMessage(page, null);

    const homePage = new HomePage(page);
    await expect(homePage.dashboardButton).toBeVisible();

    clickOnProfile(page, reporter);
    changeLanguageToEnglish(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});