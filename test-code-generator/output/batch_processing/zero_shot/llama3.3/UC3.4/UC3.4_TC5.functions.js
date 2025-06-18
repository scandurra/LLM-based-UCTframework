import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

export const cancelAzioneSelection = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickAzioniButton();
    await censusSheetPage.page.locator('[data-kt-cts-table-filter="action1"]').first().click();
    await censusSheetPage.page.locator('[data-kt-cts-table-filter="action1"]').first().click();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4_TC5_ID2', 'Seleziona un’azione e poi annulla la selezione', true, true, true, {}, executionTime);
    }

    expect(await censusSheetPage.page.locator('[data-kt-cts-table-filter="action1"]').first().isChecked()).toBeFalsy();
}