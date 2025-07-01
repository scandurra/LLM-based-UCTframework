import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSection } from '../UC3/UC3_TC1.functions.js';

import { attemptFreezeAsUnauthorizedUser, verifyStatusAfterUnauthorizedAttempt } from './UC3.4.4_TC6.functions.js';

test("UC3.4.4_TC6 - Congelamento scheda censimento come utente non autorizzato", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.4_TC6", "Congelamento scheda censimento come utente non autorizzato");

    await accessCensusSheetSection(page, reporter);
    await attemptFreezeAsUnauthorizedUser(page, reporter);
    await verifyStatusAfterUnauthorizedAttempt(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     // status can be "passed" or "failed" 
});