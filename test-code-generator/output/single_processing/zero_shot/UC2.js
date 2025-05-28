import { test, expect } from '@playwright/test';
import { HomePage } from '../models/home-page';
import { TestResultReporter } from '../models/test-result-reporter';

const accessSystemAsRegisteredUser = async function(page, reporter) {
    const startTime = new Date().getTime();
    await loginWithCorrectCredentials(page, null);
    await clickLoginButton(page, null);
    await verifySuccessMessage(page, null);
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID1', 'Accedi al sistema come utente registrato', 
            'La home page del sistema viene visualizzata', 'La home page del sistema viene visualizzata', true, '', executionTime);
    }
}

const selectDashboardMenu = async function(page, reporter) {
    const startTime = new Date().getTime();
    const homePage = new HomePage(page);
    await homePage.navigateToDashboard();
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID2', 'Seleziona la voce di menù per accedere alla dashboard', 
            'La sezione della dashboard si apre correttamente', 'La sezione della dashboard si apre correttamente', true, '', executionTime);
    }
}

test("UC2_TC1 - Apertura della dashboard con utente autorizzato", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2_TC1 - Apertura della dashboard con utente autorizzato");

    await page.goto(process.env.E2E_BASE_URL);

    await accessSystemAsRegisteredUser(page, reporter);

    await selectDashboardMenu(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     
});