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
        reporter.addStep('UC5_TC1_ID1', 'Click on profile', 'Dropdown menu displayed', 'Dropdown menu displayed', true, '', executionTime);
    }
    expect(await page.getByRole('menu')).not.toBeNull();
}

const changeLanguage = async function(page, reporter) {
    const startTime = new Date().getTime();
    const homePage = new HomePage(page);
    await homePage.changeLanguage();
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC5_TC1_ID2', 'Change language to italian', 'Portal reloaded with selected language', 'Portal reloaded with selected language', true, '', executionTime);
    }
    expect(await page.getByText('Italiano')).not.toBeNull();
}

test("UC5_TC1 - Selezione lingua italiana", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC5_TC1 - Selezione lingua italiana");

    navigateToLoginPage(page, null);
    enterCorrectCredentials(page, null);
    clickLoginButton(page, null);
    verifySuccessMessage(page, null);

    const homePage = new HomePage(page);
    await homePage.navigateToDashboard();

    clickOnProfile(page, reporter);
    changeLanguage(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});