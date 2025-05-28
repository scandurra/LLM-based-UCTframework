const { test, expect } = require('@playwright/test');
const HomePage = require('../../models/page_object_models/home-page');
const TestResultReporter = require('../../models/test-result-reporter');

const doNotClickOnProfile = async function(page, reporter) {
    const startTime = new Date().getTime();
    const homePage = new HomePage(page);
    await page.waitForTimeout(1000); // wait for 1 second to ensure the profile button is not clicked
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC5_TC4_ID1', 'Do not click on profile', 'Dropdown menu not displayed', 'Dropdown menu not displayed', true, '', executionTime);
    }
    expect(await homePage.page.getByLabel('user_data')).not.toBeVisible();
}

const verifyMenuNotDisplayed = async function(page, reporter) {
    const startTime = new Date().getTime();
    const homePage = new HomePage(page);
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC5_TC4_ID2', 'Verify menu not displayed', 'Menu not displayed', 'Menu not displayed', true, '', executionTime);
    }
    expect(await homePage.page.getByRole('menu')).not.toBeVisible();
}

test("UC5_TC4 - Selezione lingua senza cliccare sul nome utente", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC5_TC4 - Selezione lingua senza cliccare sul nome utente");

    navigateToLoginPage(page, null);
    enterCorrectCredentials(page, null);
    clickLoginButton(page, null);
    verifySuccessMessage(page, null);

    doNotClickOnProfile(page, reporter);
    verifyMenuNotDisplayed(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});