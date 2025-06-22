import { SidebarPage } from '../../models/page_object_models/sidebar_page.js';

import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

export const accessPlatformAsUnregisteredUser = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await page.goto(process.env.E2E_BASE_URL);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2_TC2_ID1', 'Accedi alla piattaforma come utente non registrato', true, await page.url() === process.env.E2E_BASE_URL, true, {}, executionTime);
    }

    expect(await page.url()).toBe(process.env.E2E_BASE_URL);
}

export const tryToAccessDashboardDirectly = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await page.goto(process.env.E2E_DASHBOARD_URL);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2_TC2_ID2', 'Tenta di accedere direttamente alla dashboard tramite URL', true, await page.url() !== process.env.E2E_DASHBOARD_URL, true, {}, executionTime);
    }

    expect(await page.url()).not.toBe(process.env.E2E_DASHBOARD_URL);
}