import { test, expect } from '@playwright/test';

import { SidebarPage } from '../../models/page_object_models/sidebar_page.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { insertCorrectCredentials, clickLoginButton, verifyAuthenticationSuccessMessage } from '../UC1/UC1_TC1.functions.js';

export const accessPlatformAndAuthenticate = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await insertCorrectCredentials(page, reporter);
    await clickLoginButton(page, reporter);
    await verifyAuthenticationSuccessMessage(page, reporter);
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3_TC1_ID1', 'Access the platform and authenticate correctly', 'The dashboard is displayed', 'The dashboard is displayed', true, '', executionTime);
    }

    expect(await page.url()).toBe(process.env.E2E_HOME_URL);
}

export const selectCensusSheetMenu = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const sidebarPage = new SidebarPage(page);
    await sidebarPage.clickCensusSheetLink();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3_TC1_ID2', 'Select the census sheet menu item', 'The census sheet section opens correctly', 'The census sheet section opens correctly', true, '', executionTime);
    }

    expect(await page.url()).toBe(process.env.E2E_CTS_URL);
}