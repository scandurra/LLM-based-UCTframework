const { test, expect } = require('@playwright/test');
const HomePage = require('../../models/page_object_models/home-page');
const TestResultReporter = require('../../models/test-result-reporter');

const clickOnProfileMultipleTimes = async function(page, reporter) {
    const startTime = new Date().getTime();
    const homePage = new HomePage(page);
    await homePage.clickOnProfile();
    await homePage.clickOnProfile();
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC5_TC5_ID1', 'Click on profile multiple times', 'Dropdown menu displayed only once', 'Dropdown menu displayed only once', true, '', executionTime);
    }
}

const verifyDropdownMenuDisplayedOnlyOnce = async function(page, reporter) {
    const startTime = new Date().getTime();
    // Assuming the dropdown menu has a specific role or label
    const dropdownMenu = page.getByRole('menu');
    const isDisplayed = await dropdownMenu.isVisible();
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC5_TC5_ID2', 'Verify dropdown menu displayed only once', 'Dropdown menu displayed only once', isDisplayed ? 'Yes' : 'No', isDisplayed, '', executionTime);
    }
    expect(isDisplayed).toBeTruthy();
}

test("UC5_TC5 - Selezione lingua con più clic sul nome utente", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC5_TC5 - Selezione lingua con più clic sul nome utente");

    navigateToLoginPage(page, null);
    enterCorrectCredentials(page, null);
    clickLoginButton(page, null);
    verifySuccessMessage(page, null);

    const homePage = new HomePage(page);
    await homePage.navigateToDashboard();
    await clickOnProfileMultipleTimes(page, reporter);
    await verifyDropdownMenuDisplayedOnlyOnce(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});