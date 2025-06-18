import { test, expect } from '@playwright/test';

import { SidebarPage } from '../../models/page_object_models/sidebar_page.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { insertCorrectCredentials, clickLoginButton, verifyAuthenticationSuccessMessage } from '../UC1/UC1_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const accessPlatformAndAuthenticate = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await insertCorrectCredentials(page, null);
    await clickLoginButton(page, null);
    await verifyAuthenticationSuccessMessage(page, null);
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    if (!(await page.url().includes(process.env.E2E_HOME_URL))) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3_TC1_ID1', 'Access platform and authenticate correctly', true, passFail, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const selectCensusSheetMenuOption = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const sidebarPage = new SidebarPage(page);
    await sidebarPage.clickCensusSheetLink();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    if (!(await page.url().includes(process.env.E2E_CTS_URL))) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3_TC1_ID2', 'Select census sheet menu option', true, passFail, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}