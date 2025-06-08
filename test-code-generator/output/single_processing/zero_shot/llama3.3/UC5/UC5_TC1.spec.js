const { test, expect } = require('@playwright/test');
const NavbarPage = require('../../models/page_object_models/navbar-page');
const TestResultReporter = require('../../models/test-result-reporter');
const UC1_TC1 = require('../.././output/single_processing/zero_shot/llama3.3/UC1/UC1_TC1.spec.js');

const clickOnUsername = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const navbarPage = new NavbarPage(page);
    await navbarPage.clickUserIcon();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC5_TC1_ID1', 'Accedi al portale e clicca sul proprio nome utente in alto a destra', true, await navbarPage.userIcon.isVisible(), true, '', executionTime);
    }

    expect(await navbarPage.userIcon.isVisible()).toBeTruthy();
}

const selectItalianLanguage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const navbarPage = new NavbarPage(page);
    await navbarPage.selectItalianLanguage();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC5_TC1_ID2', 'Seleziona la lingua italiana dal menù a tendina', true, await navbarPage.italianLanguageSelection.isVisible(), true, '', executionTime);
    }

    expect(await navbarPage.italianLanguageSelection.isVisible()).toBeTruthy();
}

const verifyItalianLanguageSelected = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const navbarPage = new NavbarPage(page);
    await page.reload();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC5_TC1_ID3', 'Verifica che dopo il ricaricamento della pagina, il portale sia visualizzato in italiano', true, await navbarPage.isEnglishLanguageSelected(), await navbarPage.isEnglishLanguageSelected(), '', executionTime);
    }

    expect(await navbarPage.isEnglishLanguageSelected()).toBeFalsy();
}

test("UC5_TC1 - Selezione lingua italiana", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC5_TC1 - Selezione lingua italiana");

    await page.goto(process.env.E2E_HOME_URL);

    await fillCorrectCredentials(page, null);
    await clickLoginButton(page, null);
    await verifySuccessMessage(page, null);

    await clickOnUsername(page, reporter);
    await selectItalianLanguage(page, reporter);
    await verifyItalianLanguageSelected(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});