import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { navigateToLoginPage, insertCorrectCredentials, clickLoginButton, navigateToUserIcon, clickUserIcon, clickLogoutButton, confirmLogout } from './UC6_TC1.functions.js';

test("UC6_TC1 - Logout utente con successo", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC6_TC1", "Logout utente con successo");
    
    await navigateToLoginPage(page, reporter);
    await insertCorrectCredentials(page, reporter);
    await clickLoginButton(page, reporter);
    await navigateToUserIcon(page, reporter);
    await clickUserIcon(page, reporter);
    await clickLogoutButton(page, reporter);
    await confirmLogout(page, reporter);
    
    reporter.onTestEnd(test, { status: "passed" });
});