import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

export const accessCensusSheetSection = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await page.goto(process.env.E2E_CTS_URL);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3_TC4_ID1', 'Accedi alla sezione delle schede censimento', true, true, true, {}, executionTime);
    }

    expect(await page.url()).toBe(process.env.E2E_CTS_URL);
}

export const verifyElementsPresence = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.verifyElementsPresence();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3_TC4_ID2', 'Verifica la presenza di tutti gli elementi previsti', true, true, true, {}, executionTime);
    }

    expect(await censusSheetPage.verifyElementsPresence()).toBeTruthy();
}