import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSection, selectMultipleSchede, confirmCongelamentoMultipleSchede, verifyStatoSchede } from './UC3.4.4_TC3.functions.js';

test("UC3.4.4_TC3 - Congelamento di più schede censimento", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.4_TC3", "Congelamento di più schede censimento");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await accessPlatformAndAuthenticate(page, reporter);
    await accessCensusSheetSection(page, reporter);
    await selectMultipleSchede(page, reporter);
    await confirmCongelamentoMultipleSchede(page, reporter);
    await verifyStatoSchede(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});