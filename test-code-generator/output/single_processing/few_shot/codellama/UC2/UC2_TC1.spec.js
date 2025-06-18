import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { SidebarPage } from '../../models/page_object_models/sidebar_page.js';

import { LoginPage } from '../../models/page_object_models/login_page.js';

import { loginAsRegisteredUser, selectDashboardMenuItem } from './UC2_TC1.functions.js';

test("UC2_TC1 - Apertura della dashboard con utente autorizzato", async ({ page, browserName }) => {
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2_TC1", "Apertura della dashboard con utente autorizzato");

    // Reuse existing method in the prompt without redefining them
    await loginAsRegisteredUser(page, null);
    await selectDashboardMenuItem(page, null);

    reporter.onTestEnd(test, { status: "passed" });
});