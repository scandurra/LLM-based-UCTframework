import { SidebarPage } from '../../models/page_object_models/sidebar_page.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

export const tryAccessWithoutAuthentication = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await page.goto(process.env.E2E_CTS_URL);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3_TC2_ID1', 'Tenta di accedere direttamente all’URL della sezione schede censimento senza login', true, true, true, {}, executionTime);
    }

    expect(await page.url()).not.toBe(process.env.E2E_CTS_URL);
}

export const insertInvalidCredentials = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await fillCorrectCredentials(page, null);
    await clickLoginButton(page, null);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3_TC2_ID2', 'Inserisci credenziali non valide o lascia i campi vuoti', true, true, true, {}, executionTime);
    }

    expect(await page.url()).not.toBe(process.env.E2E_DASHBOARD_URL);
}