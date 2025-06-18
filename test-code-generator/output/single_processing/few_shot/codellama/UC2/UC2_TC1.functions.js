import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { SidebarPage } from '../../models/page_object_models/sidebar_page.js';

import { LoginPage } from '../../models/page_object_models/login_page.js';

// Step 1
export const loginAsRegisteredUser = async function(page, reporter) {
    // Reuse existing method in the prompt without redefining them
    await insertCorrectCredentials(page, null);
    await clickLoginButton(page, null);
}

// Step 2
export const selectDashboardMenuItem = async function (page, reporter) {
    const sidebarPage = new SidebarPage(page);

    let startTime = Date.now();
    await sidebarPage.clickDashboardLink();
    let endTime = Date.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID2', 'Seleziona la voce di menù relativa alla dashboard', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}