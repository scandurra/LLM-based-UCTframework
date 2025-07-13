import { SidebarPage } from '../../models/page_object_models/sidebar_page.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

export const accessPlatformAndAuthenticateWithSpecialChars = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await fillCorrectCredentials(page, null);
    await clickLoginButton(page, null);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3_TC3_ID1', 'Accedi alla piattaforma e autenticati', true, true, true, {}, executionTime);
    }

    expect(await page.url()).toBe(process.env.E2E_DASHBOARD_URL);
}

export const modifyUrlWithSpecialChars = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await page.goto(`${process.env.E2E_CTS_URL}?special=chars`);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3_TC3_ID2', 'Modifica manualmente l’URL del menù laterale aggiungendo caratteri speciali', true, true, true, {}, executionTime);
    }

    expect(await page.url()).toBe(`${process.env.E2E_CTS_URL}?special=chars`);
}