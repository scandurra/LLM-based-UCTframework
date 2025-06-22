import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSection, tryCongelamentoWithInvalidData, verifyStatoSchede } from './UC3.4.4_TC5.functions.js';

test("UC3.4.4_TC5 - Congelamento scheda censimento con dati non validi", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.4_TC5", "Congelamento scheda censimento con dati non validi");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await accessPlatformAndAuthenticate(page, reporter);
    await accessCensusSheetSection(page, reporter);
    await tryCongelamentoWithInvalidData(page, reporter);
    await verifyStatoSchede(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});