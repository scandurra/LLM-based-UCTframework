import { LoginPage } from '../../models/page_object_models/login_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

// Step 1
export const insertWrongCredentials = async function(page, reporter) {
    const loginPage = new LoginPage(page);

    let startTime = Date.now();
    await loginPage.fillEmail("wrong@email.com");
    await loginPage.fillPassword("wrongpassword");
    let endTime = Date.now();
    let executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC1_TC2_ID1', 'Inserisci credenziali errate nel form di login', 'Credenziali inserite correttamente', 'Credenziali inserite correttamente', true, {}, executionTime);
    }
}

// Step 2
export const clickLoginButton = async function(page, reporter) {
    const loginPage = new LoginPage(page);

    let startTime = Date.now();
    await loginPage.clickLoginButton();
    let endTime = Date.now();
    let executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC1_TC2_ID2', 'Clicca il tasto “Login”', 'Tasto login cliccato correttamente', 'Tasto login cliccato correttamente', true, {}, executionTime);
    }
}

// Step 3
export const verifyErrorMessage = async function(page, reporter) {
    let passFail = false;
    let startTime = Date.now();
    await page.waitForSelector('text="Credenziali non valide"');
    if (await page.$('text="Credenziali non valide"') != null) {
        passFail = true;
    }
    let endTime = Date.now();
    let executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC1_TC2_ID3', 'Visualizza la possibilità di riprovare l’accesso', 'Messaggio di errore visualizzato correttamente', 'Messaggio di errore visualizzato correttamente', passFail, {}, executionTime);
    }
}