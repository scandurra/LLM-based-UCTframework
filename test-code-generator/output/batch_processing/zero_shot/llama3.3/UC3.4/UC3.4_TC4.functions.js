import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

export const selectMultipleAzioni = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickAzioniButton();
    await censusSheetPage.page.locator('[data-kt-cts-table-filter="action1"]').first().click();
    await censusSheetPage.page.locator('[data-kt-cts-table-filter="action2"]').first().click();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4_TC4_ID2', 'Seleziona più azioni sulla stessa scheda censimento', true, true, true, {}, executionTime);
    }

    expect(await censusSheetPage.page.locator('[data-kt-cts-table-filter="action1"]').first().isChecked()).toBeTruthy();
    expect(await censusSheetPage.page.locator('[data-kt-cts-table-filter="action2"]').first().isChecked()).toBeTruthy();
}