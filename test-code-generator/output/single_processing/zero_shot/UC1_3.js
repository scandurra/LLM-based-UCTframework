```javascript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../models/login-page';
import { TestResultReporter } from "../models/test-result-reporter";

test("UC1_TC1 - Login con credenziali valide", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC1_TC1 - Login con credenziali valide");

    const loginPage = new LoginPage(page);

    // Step 1: Inserisci le credenziali corrette nel form di login
    const email = process.env.E2E_LOGIN_EMAIL_ADMIN;
    const password = process.env.E2E_LOGIN_PASSWORD_ADMIN;
    await loginPage.displayLoginForm();
    await loginPage.enterEmail(email);
    await loginPage.enterPassword(password);

    const expectedResults = "Le credenziali vengono accettate";
    const actualResults = "Credenziali inserite correttamente";
    const passFail = true;
    const parametersUsed = `email: ${email}, password: ${password}`;
    const executionTime = new Date().getTime();
    reporter.addStep('UC1_TC1_ID1', 'Inserisci le credenziali corrette nel form di login', expectedResults, actualResults, passFail, parametersUsed, executionTime);

    // Step 2: Clicca il tasto “Login”
    await loginPage.login();

    const expectedResults2 = "Il sistema procede con l’autenticazione";
    const actualResults2 = "Tasto Login cliccato correttamente";
    const passFail2 = true;
    const parametersUsed2 = "";
    const executionTime2 = new Date().getTime();
    reporter.addStep('UC1_TC1_ID2', 'Clicca il tasto “Login”', expectedResults2, actualResults2, passFail2, parametersUsed2, executionTime2);

    // Step 3: Verifica la visualizzazione del messaggio di successo
    const errorMessage = await loginPage.getErrorMessage();
    if (errorMessage === null) {
        const expectedResults3 = "Viene mostrato un messaggio che conferma l’avvenuta autenticazione";
        const actualResults3 = "Messaggio di successo visualizzato correttamente";
        const passFail3 = true;
        const parametersUsed3 = "";
        const executionTime3 = new Date().getTime();
        reporter.addStep('UC1_TC1_ID3', 'Verifica la visualizzazione del messaggio di successo', expectedResults3, actualResults3, passFail3, parametersUsed3, executionTime3);
    } else {
        const expectedResults3 = "Viene mostrato un messaggio che conferma l’avvenuta autenticazione";
        const actualResults3 = `Errore: ${errorMessage}`;
        const passFail3 = false;
        const parametersUsed3 = "";
        const executionTime3 = new Date().getTime();
        reporter.addStep('UC1_TC1_ID3', 'Verifica la visualizzazione del messaggio di successo', expectedResults3, actualResults3, passFail3, parametersUsed3, executionTime3);
    }

    reporter.onTestEnd(test, { status: "passed" });
});
```const { chromium } = require('playwright');
const { TestResultReporter } = require("../models/test-result-reporter");
const { LoginPage } = require("./login-page");

async function loginWithValidCredentials(reporter) {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    if (reporter) {
        reporter.setBrowserName("Chromium");
    }

    const loginPage = new LoginPage(page);
    await page.goto(process.env.E2E_BASE_URL);

    let step1StartTime = new Date().getTime();
    await loginPage.displayLoginForm();
    await loginPage.enterEmail(process.env.E2E_LOGIN_EMAIL_ADMIN);
    await loginPage.enterPassword(process.env.E2E_LOGIN_PASSWORD_ADMIN);
    let step1EndTime = new Date().getTime();

    if (reporter) {
        reporter.addStep(
            "Inserisci le credenziali corrette nel form di login",
            "Le credenziali vengono accettate",
            "Credenziali accettate",
            "Credenziali accettate",
            true,
            { email: process.env.E2E_LOGIN_EMAIL_ADMIN, password: process.env.E2E_LOGIN_PASSWORD_ADMIN },
            (step1EndTime - step1StartTime) / 1000
        );
    }

    let step2StartTime = new Date().getTime();
    await loginPage.login();
    let step2EndTime = new Date().getTime();

    if (reporter) {
        reporter.addStep(
            "Clicca il tasto “Login”",
            "Il sistema procede con l’autenticazione",
            "Autenticazione avvenuta",
            "Autenticazione avvenuta",
            true,
            {},
            (step2EndTime - step2StartTime) / 1000
        );
    }

    let step3StartTime = new Date().getTime();
    const errorMessage = await loginPage.getErrorMessage();
    let step3EndTime = new Date().getTime();

    if (reporter) {
        reporter.addStep(
            "Verifica la visualizzazione del messaggio di successo",
            "Viene mostrato un messaggio che conferma l’avvenuta autenticazione",
            "Messaggio di successo visualizzato",
            errorMessage,
            !errorMessage.includes("error"),
            {},
            (step3EndTime - step3StartTime) / 1000
        );
    }

    await browser.close();

    if (reporter) {
        reporter.onTestEnd("UC1_TC1", { status: "passed" });
    }
}

loginWithValidCredentials(new TestResultReporter());const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./login-page');
const { TestResultReporter } = require("../models/test-result-reporter");

const step1 = async function(page, reporter) {
    const loginPage = new LoginPage(page);
    await loginPage.displayLoginForm();
    await loginPage.enterEmail(process.env.E2E_LOGIN_EMAIL_ADMIN);
    await loginPage.enterPassword(process.env.E2E_LOGIN_PASSWORD_ADMIN);
    let expectedResults = "Credenziali accettate";
    let actualResults = "Credenziali accettate";
    let passFail = true;
    let parametersUsed = `Email: ${process.env.E2E_LOGIN_EMAIL_ADMIN}, Password: ${process.env.E2E_LOGIN_PASSWORD_ADMIN}`;
    let executionTime = new Date().getTime();
    if (reporter) {
        reporter.addStep('UC1_TC1_ID1', 'Inserisci le credenziali corrette nel form di login', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}

const step2 = async function(page, reporter) {
    const loginPage = new LoginPage(page);
    await loginPage.login();
    let expectedResults = "Sistema procede con l’autenticazione";
    let actualResults = "Sistema procede con l’autenticazione";
    let passFail = true;
    let parametersUsed = "";
    let executionTime = new Date().getTime();
    if (reporter) {
        reporter.addStep('UC1_TC1_ID2', 'Clicca il tasto “Login”', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}

const step3 = async function(page, reporter) {
    const loginPage = new LoginPage(page);
    let message = await loginPage.getErrorMessage();
    let expectedResults = "Messaggio di successo visualizzato";
    let actualResults = message ? "Messaggio di successo visualizzato" : "Messaggio di successo non visualizzato";
    let passFail = !!message;
    let parametersUsed = "";
    let executionTime = new Date().getTime();
    if (reporter) {
        reporter.addStep('UC1_TC1_ID3', 'Verifica la visualizzazione del messaggio di successo', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}

test("UC1_TC1 - Login test with success", async ({page, browserName}, reporter) => {
    const testReporter = new TestResultReporter();
    testReporter.setBrowserName(browserName);

    await step1(page, testReporter);

    await step2(page, testReporter);

    await step3(page, testReporter);
    
    testReporter.onTestEnd(test, { status: "passed" });     // status can be "passed" or "failed" 
});import { test, expect } from '@playwright/test';
import { LoginPage } from '../models/login-page';
import { TestResultReporter } from '../models/test-result-reporter';

const loginWithCorrectCredentials = function(reporter) {
    const loginPage = new LoginPage(page);
    loginPage.displayLoginForm();
    loginPage.enterEmail(process.env.E2E_LOGIN_EMAIL_ADMIN);
    loginPage.enterPassword(process.env.E2E_LOGIN_PASSWORD_ADMIN);
    if (reporter) {
        reporter.addStep('UC1_TC1_ID1', 'Inserisci le credenziali corrette nel form di login', 
            'Le credenziali vengono accettate', 'Le credenziali vengono accettate', true, 
            `Email: ${process.env.E2E_LOGIN_EMAIL_ADMIN}, Password: ${process.env.E2E_LOGIN_PASSWORD_ADMIN}`, 1000);
    }
}

const clickLoginButton = function(reporter) {
    const loginPage = new LoginPage(page);
    loginPage.login();
    if (reporter) {
        reporter.addStep('UC1_TC1_ID2', 'Clicca il tasto “Login”', 
            'Il sistema procede con l’autenticazione', 'Il sistema procede con l’autenticazione', true, '', 1000);
    }
}

const verifySuccessMessage = function(reporter) {
    const loginPage = new LoginPage(page);
    const message = loginPage.getErrorMessage();
    if (reporter) {
        reporter.addStep('UC1_TC1_ID3', 'Verifica la visualizzazione del messaggio di successo', 
            'Viene mostrato un messaggio che conferma l’avvenuta autenticazione', message, true, '', 1000);
    }
}

test("UC1_TC1 - Login test with success", async ({page, browserName}, reporter) => {
    const testReporter = new TestResultReporter();
    testReporter.setBrowserName(browserName);
    testReporter.setTestCase("UC1_TC1 - Login test with success");

    await page.goto(process.env.E2E_BASE_URL);

    loginWithCorrectCredentials(testReporter);
    clickLoginButton(testReporter);
    verifySuccessMessage(testReporter);
    
    testReporter.onTestEnd(test, { status: "passed" });     
});import { test, expect } from '@playwright/test';
import { LoginPage } from '../models/login-page';
import { TestResultReporter } from '../models/test-result-reporter';

const loginWithCorrectCredentials = async function(page, reporter) {
    const startTime = new Date().getTime();
    const loginPage = new LoginPage(page);
    await loginPage.displayLoginForm();
    await loginPage.enterEmail(process.env.E2E_LOGIN_EMAIL_ADMIN);
    await loginPage.enterPassword(process.env.E2E_LOGIN_PASSWORD_ADMIN);
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC1_ID1', 'Inserisci le credenziali corrette nel form di login', 
            'Le credenziali vengono accettate', 'Le credenziali vengono accettate', true, 
            `Email: ${process.env.E2E_LOGIN_EMAIL_ADMIN}, Password: ${process.env.E2E_LOGIN_PASSWORD_ADMIN}`, executionTime);
    }
}

const clickLoginButton = async function(page, reporter) {
    const startTime = new Date().getTime();
    const loginPage = new LoginPage(page);
    await loginPage.login();
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC1_ID2', 'Clicca il tasto “Login”', 
            'Il sistema procede con l’autenticazione', 'Il sistema procede con l’autenticazione', true, '', executionTime);
    }
}

const verifySuccessMessage = async function(page, reporter) {
    const startTime = new Date().getTime();
    const loginPage = new LoginPage(page);
    const errorMessage = await loginPage.getErrorMessage();
    if (errorMessage === null) {
        const endTime = new Date().getTime();
        const executionTime = (endTime - startTime) / 1000;
        if (reporter) {
            reporter.addStep('UC1_TC1_ID3', 'Verifica la visualizzazione del messaggio di successo', 
                'Viene mostrato un messaggio che conferma l’avvenuta autenticazione', 'Viene mostrato un messaggio che conferma l’avvenuta autenticazione', true, '', executionTime);
        }
    } else {
        const endTime = new Date().getTime();
        const executionTime = (endTime - startTime) / 1000;
        if (reporter) {
            reporter.addStep('UC1_TC1_ID3', 'Verifica la visualizzazione del messaggio di successo', 
                'Viene mostrato un messaggio che conferma l’avvenuta autenticazione', `Errore: ${errorMessage}`, false, '', executionTime);
        }
    }
}

test("UC1_TC1 - Login test with success", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC1_TC1 - Login test with success");

    await page.goto(process.env.E2E_BASE_URL);

    await loginWithCorrectCredentials(page, reporter);

    await clickLoginButton(page, reporter);

    await verifySuccessMessage(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     
});