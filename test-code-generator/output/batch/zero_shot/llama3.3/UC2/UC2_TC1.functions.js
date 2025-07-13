import { SidebarPage } from '../../models/page_object_models/sidebar_page.js';

import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

export const accessPlatformAsRegisteredUser = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await fillCorrectCredentials(page, null);
    await clickLoginButton(page, null);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID1', 'Accedi alla piattaforma come utente registrato', true, await page.url() === process.env.E2E_HOME_URL, true, {}, executionTime);
    }

    expect(await page.url()).toBe(process.env.E2E_HOME_URL);
}

export const selectDashboardMenu = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const sidebarPage = new SidebarPage(page);
    await sidebarPage.clickDashboardLink();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID2', 'Seleziona la voce di menù relativa alla dashboard', true, await page.url() === process.env.E2E_DASHBOARD_URL, true, {}, executionTime);
    }

    expect(await page.url()).toBe(process.env.E2E_DASHBOARD_URL);
}