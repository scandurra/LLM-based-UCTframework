// Import necessary libraries and page object models
const { DateTime } = require('luxon');
const LoginPage = require("../../models/page_object_models/login_page.js");
const NavbarPage = require("../../models/page_object_models/navbar_page.js");

async function step1_AccediAlSistemaComeUtenteRegistrato(page, reporter) {
    const startTime = DateTime.now();
    
    // Step 1 implementation: Accedi al sistema come utente registrato
    await page.goto('https://example.com/login');
    await page.fill('#email', 'test@example.com');
    await page.fill('#password', 'password');
    await page.click('#submit-button');
    
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC6_TC1_ID1', 'Accedi al sistema come utente registrato', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
    
    // Playwright assertion: Check that the dashboard page is visible after login
    await expect(page.locator('#dashboard-title')).toBeVisible();
}

async function step2_CliccaSulProprioNomeUtenteInAltoADestraEDSelezionaLogout(page, reporter) {
    const startTime = DateTime.now();
    
    // Step 2 implementation: Clicca sul proprio nome utente in alto a destra e seleziona il tasto “Logout”
    await page.click('#user-icon');
    await page.click('#logout-button');
    
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC6_TC1_ID2', 'Clicca sul proprio nome utente in alto a destra e seleziona il tasto “Logout”', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
    
    // Playwright assertion: Check that the logout button is visible and enabled
    await expect(page.locator('#logout-button')).toBeVisible();
    await expect(page.locator('#logout-button')).not.toBeDisabled();
}

async function step3_ConfermaLIntenzioneDiEffettuareIlLogout(page, reporter) {
    const startTime = DateTime.now();
    
    // Step 3 implementation: Conferma l'intenzione di effettuare il logout
    await page.click('#confirm-logout-button');
    
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC6_TC1_ID3', 'Conferma l\'intenzione di effettuare il logout', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
    
    // Playwright assertion: Check that the confirmation message is visible after logout
    await expect(page.locator('#confirm-logout-message')).toBeVisible();
}