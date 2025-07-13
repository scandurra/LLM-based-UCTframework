import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

export const accessCensusSheetSectionForUsability = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await page.goto(process.env.E2E_CTS_URL);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3_TC5_ID1', 'Accedi alla sezione delle schede censimento', true, true, true, {}, executionTime);
    }

    expect(await page.url()).toBe(process.env.E2E_CTS_URL);
}

export const performUsabilityActions = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.performUsabilityActions();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3_TC5_ID2', 'Esegui le principali azioni previste nella sezione', true, true, true, {}, executionTime);
    }

    expect(await censusSheetPage.performUsabilityActions()).toBeTruthy();
}