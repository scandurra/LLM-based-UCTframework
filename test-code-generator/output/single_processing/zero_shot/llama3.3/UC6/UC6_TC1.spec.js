const { test, expect } = require('@playwright/test');
const NavbarPage = require('../../models/page_object_models/navbar-page');
const TestResultReporter = require('../../models/test-result-reporter');
const UC1_TC1 = require('../.././output/single_processing/zero_shot/llama3.3/UC1/UC1_TC1.spec.js');

const accessSystemAsRegisteredUser = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await fillCorrectCredentials(page, null);
    await clickLoginButton(page, null);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC6_TC1_ID1', 'Accedi al sistema come utente registrato', true, page.url() === process.env.E2E_HOME_URL, true, '', executionTime);
    }

    expect(page.url()).toBe(process.env.E2E_HOME_URL);
}

const clickLogoutButton = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const navbarPage = new NavbarPage(page);
    await navbarPage.clickUserIcon();
    await navbarPage.clickLogout();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC6_TC1_ID2', 'Clicca sul proprio nome utente in alto a destra e seleziona il tasto “Logout”', true, page.url() === process.env.E2E_BASE_URL, true, '', executionTime);
    }

    expect(page.url()).toBe(process.env.E2E_BASE_URL);
}

const confirmLogoutIntention = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Assuming the success message is visible after logout
    const successMessageLocator = page.locator('text="Logout successful"');
    const isSuccessMessageVisible = await successMessageLocator.isVisible();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC6_TC1_ID3', 'Conferma l’intenzione di effettuare il logout', true, isSuccessMessageVisible, isSuccessMessageVisible, '', executionTime);
    }

    expect(isSuccessMessageVisible).toBeTruthy();
}

test("UC6_TC1 - Logout utente con successo", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC6_TC1 - Logout utente con successo");

    await page.goto(process.env.E2E_BASE_URL);

    await accessSystemAsRegisteredUser(page, reporter);
    await clickLogoutButton(page, reporter);
    await confirmLogoutIntention(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});