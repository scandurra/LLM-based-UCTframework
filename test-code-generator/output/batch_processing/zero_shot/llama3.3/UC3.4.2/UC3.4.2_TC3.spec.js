import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAndAuthenticate } from '../UC3/UC3_TC1.functions.js';

import { accessCensusSheetSection } from './UC3.4_TC1.functions.js';

import { selectDeleteNonExistingOperation, confirmNonExistingDeletion } from './UC3.4.2_TC3.functions.js';

test("UC3.4.2_TC3 - Elimina scheda censimento non esistente", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.2_TC3", "Elimina scheda censimento non esistente");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await accessPlatformAndAuthenticate(page, reporter);
    await accessCensusSheetSection(page, reporter);
    await selectDeleteNonExistingOperation(page, reporter);
    await confirmNonExistingDeletion(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});