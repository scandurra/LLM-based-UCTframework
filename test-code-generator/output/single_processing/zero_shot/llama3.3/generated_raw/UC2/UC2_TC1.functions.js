import { test, expect } from '@playwright/test';

import { SidebarPage } from '../../models/page_object_models/sidebar_page.js';

import { insertCorrectCredentials, clickLoginButton, verifyAuthenticationSuccessMessage } from '../UC1/UC1_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const accessPlatformAsRegisteredUser = async function(page, reporter) {
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
        reporter.addStep('UC2_TC1_ID1', 'Access platform as registered user', true, passFail, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const selectDashboardMenu = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const sidebarPage = new SidebarPage(page);
    await sidebarPage.clickDashboardLink();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    if (!(await page.url().includes(process.env.E2E_DASHBOARD_URL))) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC2_TC1_ID2', 'Select dashboard menu', true, passFail, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}