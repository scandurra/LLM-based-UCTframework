import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { LoginPage } from '../../models/page_object_models/login_page.js';

import { NavbarPage } from '../../models/page_object_models/navbar_page.js';

// Import step functions here
import { navigateToLoginPage, insertCorrectCredentials, clickLoginButton, navigateToDashboard, clickUserIcon, selectLogout, confirmLogout } from './UC6_TC1.functions.js';

test("UC6_TC1 - Logout utente con successo", async ({page, browserName}) => {
    reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC6_TC1", "Logout utente con successo");
    
    // Call step functions in sequence
    await navigateToLoginPage(page, reporter);
    await insertCorrectCredentials(page, reporter);
    await clickLoginButton(page, reporter);
    await navigateToDashboard(page, reporter);
    await clickUserIcon(page, reporter);
    await selectLogout(page, reporter);
    await confirmLogout(page, reporter);
    
    // Add Playwright assertions to verify expected results
    expect(passFail).toBeTruthy();
    
    reporter.onTestEnd(test, { status: "passed" });
});