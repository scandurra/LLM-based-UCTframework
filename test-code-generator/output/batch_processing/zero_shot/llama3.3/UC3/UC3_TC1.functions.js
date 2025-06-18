import { SidebarPage } from '../../models/page_object_models/sidebar_page.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

export const accessPlatformAndAuthenticate = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await fillCorrectCredentials(page, null);
    await clickLoginButton(page, null);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3_TC1_ID1', 'Accedi alla piattaforma e autenticati correttamente', true, true, true, {}, executionTime);
    }

    expect(await page.url()).toBe(process.env.E2E_DASHBOARD_URL);
}

export const selectCensusSheetMenu = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const sidebarPage = new SidebarPage(page);
    await sidebarPage.clickCensusSheetLink();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3_TC1_ID2', 'Seleziona la voce del menù laterale relativa alle schede censimento', true, true, true, {}, executionTime);
    }

    expect(await page.url()).toBe(process.env.E2E_CTS_URL);
}