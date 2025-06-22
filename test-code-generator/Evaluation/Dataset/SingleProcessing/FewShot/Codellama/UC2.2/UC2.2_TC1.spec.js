import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { SidebarPage } from '../../models/page_object_models/sidebar_page.js';

import { LoginPage } from '../../models/page_object_models/login_page.js';

import { DashboardPageIlluminationSearch } from '../../models/page_object_models/dashboard_page_illumination_search.js';

import { loginAsRegisteredUser, selectDashboardMenuItem } from '../UC2/UC2_TC1.functions.js';

test("UC2_TC1 - Ricerca impianti di illuminazione con parametri validi", async ({ page, browserName }) => {
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2_TC1", "Ricerca impianti di illuminazione con parametri validi");

    // Reuse existing method in the prompt without redefining them
    await loginAsRegisteredUser(page, null);
    await selectDashboardMenuItem(page, null);
    await selectComuneAndValidParameters(page, reporter);
    await applySearch(page, reporter);
    await visualizeDetails(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});