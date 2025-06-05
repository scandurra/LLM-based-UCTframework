const { test, expect } = require('@playwright/test');
const HomePage = require('../../models/page_object_models/home-page');
const LoginPage = require('../../models/page_object_models/login-page');
const TestResultReporter = require('../../models/test-result-reporter');

const reporter = new TestResultReporter();

// Step 1: Accedi al sistema come ospite o utente non registrato
const navigateToHomePageAsGuest = async function(page, reporter) {
    const startTime = new Date().getTime();
    await page.goto(process.env.E2E_BASE_URL);
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2_TC2_ID1', 'Accesso alla home page come ospite', 'Home page visualizzata', 'Home page visualizzata', true, `E2E_BASE_URL: ${process.env.E2E_BASE_URL}`, executionTime);
    }
    await expect(page).toContainText('Benvenuto');
}

// Step 2: Tenta di accedere direttamente alla dashboard tramite URL
const tryToAccessDashboardDirectly = async function(page, reporter) {
    const startTime = new Date().getTime();
    await page.goto(process.env.E2E_DASHBOARD_URL);
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2_TC2_ID2', 'Tentativo di accesso alla dashboard', 'Pagina di accesso negato visualizzata', await page.title() === 'Accesso Negato' ? 'Pagina di accesso negato visualizzata' : 'Accesso alla dashboard consentito', await page.title() !== 'Accesso Negato', `E2E_DASHBOARD_URL: ${process.env.E2E_DASHBOARD_URL}`, executionTime);
    }
    await expect(page.title()).toBe('Accesso Negato');
}

test("UC2_TC2 - Tentativo di accesso alla dashboard senza autorizzazione", async ({ page, browserName }) => {
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2_TC2 - Tentativo di accesso alla dashboard senza autorizzazione");

    navigateToLoginPage(page, null);
    navigateToHomePageAsGuest(page, reporter);
    tryToAccessDashboardDirectly(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});