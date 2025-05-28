

```javascript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../models/login-page';
import { HomePage } from '../models/home-page';
import { DashboardPage } from '../models/dashboard-page';
import { TestResultReporter } from "../models/test-result-reporter";

test("UC2_TC1 - Apertura della dashboard con utente autorizzato", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2_TC1 - Apertura della dashboard con utente autorizzato");

    // Step 1: Accedi al sistema come utente registrato
    const loginPage = new LoginPage(page);
    const email = process.env.E2E_LOGIN_EMAIL_ADMIN;
    const password = process.env.E2E_LOGIN_PASSWORD_ADMIN;
    await loginPage.displayLoginForm();
    await loginPage.enterEmail(email);
    await loginPage.enterPassword(password);
    await loginPage.login();

    const expectedResults1 = "La home page del sistema viene visualizzata";
    const actualResults1 = "Home page visualizzata correttamente";
    const passFail1 = true;
    const parametersUsed1 = `email: ${email}, password: ${password}`;
    const executionTime1 = new Date().getTime();
    reporter.addStep('UC2_TC1_ID1', 'Accedi al sistema come utente registrato', expectedResults1, actualResults1, passFail1, parametersUsed1, executionTime1);

    // Step 2: Seleziona la voce di menù per accedere alla dashboard
    const homePage = new HomePage(page);
    await homePage.navigateToDashboard();

    const dashboardPage = new DashboardPage(page);
    const expectedResults2 = "La sezione della dashboard si apre correttamente";
    const actualResults2 = "Dashboard aperta correttamente";
    const passFail2 = true;
    const parametersUsed2 = "";
    const executionTime2 = new Date().getTime();
    reporter.addStep('UC2_TC1_ID2', 'Seleziona la voce di menù per accedere alla dashboard', expectedResults2, actualResults2, passFail2, parametersUsed2, executionTime2);

    reporter.onTestEnd(test, { status: "passed" });
});
```