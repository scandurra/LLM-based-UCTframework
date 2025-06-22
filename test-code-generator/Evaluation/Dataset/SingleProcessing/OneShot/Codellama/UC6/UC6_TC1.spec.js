import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { loginAsRegisteredUser, clickLogoutButton, confirmLogout } from './UC6_TC1.functions.js';

test("UC6_TC1 - Logout utente con successo", async ({page, browserName}) => {
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC6_TC1", "Logout utente con successo");

    await loginAsRegisteredUser(page, null);
    await clickLogoutButton(page, null);
    await confirmLogout(page, null);

    reporter.onTestEnd(test, { status: "passed" });     // status can be "passed" or "failed" 
});