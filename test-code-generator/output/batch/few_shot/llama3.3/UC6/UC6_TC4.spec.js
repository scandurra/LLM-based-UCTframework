import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { leaveSessionInactive, tryToPerformLogout } from './UC6_TC4.functions.js';

test("UC6_TC4 - Boundary test: logout con dati di sessione scaduti", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC6_TC4", "Boundary test: logout con dati di sessione scaduti");

    await leaveSessionInactive(page, reporter);
    await tryToPerformLogout(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     
});