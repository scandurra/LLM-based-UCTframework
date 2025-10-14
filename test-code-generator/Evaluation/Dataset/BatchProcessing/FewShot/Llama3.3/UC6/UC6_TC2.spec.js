import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessSiteWithoutLogin, tryToAccessLogoutFunction } from './UC6_TC2.functions.js';

test("UC6_TC2 - Tentativo di logout senza essere autenticato", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC6_TC2", "Tentativo di logout senza essere autenticato");

    await accessSiteWithoutLogin(page, reporter);
    await tryToAccessLogoutFunction(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     
});