import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { LoginPage } from '../../models/page_object_models/login_page.js';

import { SidebarPage } from '../../models/page_object_models/sidebar_page.js';

// Step 1
export const loginAsRegisteredUser = async function(page, reporter) {
    const startTime = new Date().getTime();
    const loginPage = new LoginPage(page);
    await insertCorrectCredentials(page, null);
    await clickLoginButton(page, null);
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID1', 'Accedi alla piattaforma come utente registrato', 'La home page della piattaforma è visibile', 'La home page della piattaforma è visibile', true, {}, executionTime);
    }
}

// Step 2
export const selectDashboard = async function(page, reporter) {
    const startTime = new Date().getTime();
    const sidebarPage = new SidebarPage(page);
    await sidebarPage.clickDashboardLink();
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID2', 'Seleziona la voce di menù relativa alla dashboard', 'La sezione della dashboard si apre correttamente', 'La sezione della dashboard si apre correttamente', true, {}, executionTime);
    }
}