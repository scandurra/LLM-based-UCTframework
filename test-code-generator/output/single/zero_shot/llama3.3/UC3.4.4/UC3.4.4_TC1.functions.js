import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioneButton } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const selectCongelamentoOperation = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await clickAzioneButton(page, null);
    await censusSheetPage.clickAzioneCongela();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    try {
        await page.locator('button.swal2-confirm.btn.fw-bold.btn-danger').first().waitFor({ state: 'visible' });
    } catch (error) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3.4.4_TC1_ID1', 'Select congelamento operation', 'Confirmation request is visible', `Clicked on congelamento button`, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const confirmCongelamento = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickConfirmAzioneDelete();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    try {
        await page.locator('button.swal2-confirm.btn.fw-bold.btn-primary').first().waitFor({ state: 'visible' });
    } catch (error) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3.4.4_TC1_ID2', 'Confirm congelamento operation', 'Confirmation message is visible', `Confirmed congelamento`, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const verifySchedaStato = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickAzioniColumn();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    try {
        await page.locator('.text-start > .btn').first().waitFor({ state: 'visible' });
    } catch (error) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3.4.4_TC1_ID3', 'Verify scheda stato after congelamento', 'Scheda is marked as non attiva', `Verified scheda stato`, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}