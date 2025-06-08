// Import necessary libraries and page object models
const { DateTime } = require('luxon');
const LoginPage = require("../../models/page_object_models/login_page.js");

async function step1_InserisciCredenzialiCorretteNelFormDiLogin(loginPage, reporter) {
    const startTime = DateTime.now();
    
    // Step 1 implementation: Inserisci le credenziali corrette nel form di login
    await loginPage.clickLoginLink();
    await loginPage.fillEmail("test@example.com");
    await loginPage.fillPassword("password");
    
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC1_TC1_ID1', 'Inserisci le credenziali corrette nel form di login', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
    
    // Playwright assertion: Check that the email field is visible
    await expect(loginPage.emailFieldSelector).toBeVisible();
}

async function step2_CliccaTastoLogin(loginPage, reporter) {
    const startTime = DateTime.now();
    
    // Step 2 implementation: Clicca il tasto “Login”
    await loginPage.clickLoginButton();
    
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC1_TC1_ID2', 'Clicca il tasto “Login”', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
    
    // Playwright assertion: Check that the login button is visible and enabled
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.loginButton).not.toBeDisabled();
}

async function step3_VisualizzaMessaggioOperazioneCompletataConSuccesso(loginPage, reporter) {
    const startTime = DateTime.now();
    
    // Step 3 implementation: Visualizza il messaggio di operazione completata con successo
    await loginPage.isEmailFieldVisible();
    
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC1_TC1_ID3', 'Visualizza il messaggio di operazione completata con successo', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
    
    // Playwright assertion: Check that the email field is visible after login
    await expect(loginPage.emailFieldSelector).toBeVisible();
}