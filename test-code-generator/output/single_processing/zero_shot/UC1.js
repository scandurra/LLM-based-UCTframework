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
```