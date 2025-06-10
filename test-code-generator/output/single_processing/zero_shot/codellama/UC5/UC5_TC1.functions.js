// Import necessary libraries and page object models
const { DateTime } = require('luxon');
const LoginPage = require("../../models/page_object_models/login_page.js");
const NavbarPage = require("../../models/page_object_models/navbar_page.js");

async function step1_AccediAlPortaleECliccaSulProprioNomeUtenteInAltoADestra(page, reporter) {
    const startTime = DateTime.now();
    
    // Step 1 implementation: Accedi al portale e clicca sul proprio nome utente in alto a destra
    await page.goto('https://example.com/login');
    await page.fill('#username', 'test@example.com');
    await page.fill('#password', 'password');
    await page.click('#submit-button');
    
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC5_TC1_ID1', 'Accedi al portale e clicca sul proprio nome utente in alto a destra', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
    
    // Playwright assertion: Check that the username field is visible and enabled
    await expect(page.locator('#username')).toBeVisible();
    await expect(page.locator('#username')).not.toBeDisabled();
}

async function step2_SelezionaLaLinguaItalianaDalMenùATendina(navbarPage, reporter) {
    const startTime = DateTime.now();
    
    // Step 2 implementation: Seleziona la lingua italiana dal menù a tendina
    await navbarPage.clickUserIcon();
    await navbarPage.selectItalianLanguage();
    
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC5_TC1_ID2', 'Seleziona la lingua italiana dal menù a tendina', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
    
    // Playwright assertion: Check that the language selection is visible and enabled
    await expect(navbarPage.italianLanguageSelection).toBeVisible();
    await expect(navbarPage.italianLanguageSelection).not.toBeDisabled();
}

async function step3_VerificaCheDopoIlRicaricamentoDellaPaginaIlPortaleSiaVisualizzatoInItaliano(page, reporter) {
    const startTime = DateTime.now();
    
    // Step 3 implementation: Verifica che dopo il ricaricamento della pagina, il portale sia visualizzato in italiano
    await page.reload({ waitUntil: 'networkidle' });
    await expect(page).toHaveTitle('Portale in Italiano');
    
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC5_TC1_ID3', 'Verifica che dopo il ricaricamento della pagina, il portale sia visualizzato in italiano', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
    
    // Playwright assertion: Check that the page title is correctly translated to Italian
    await expect(page).toHaveTitle('Portale in Italiano');
}