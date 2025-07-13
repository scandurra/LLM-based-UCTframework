import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSection, clickAzioneButton, clickAzioneCongela, confirmCongelamento, verifyStatoScheda } from './UC3.4.4_TC1.functions.js';

test("UC3.4.4_TC1 - Congelamento scheda censimento con conferma", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.4_TC1", "Congelamento scheda censimento con conferma");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await accessPlatformAndAuthenticate(page, reporter);
    await accessCensusSheetSection(page, reporter);
    await clickAzioneButton(page, reporter);
    await clickAzioneCongela(page, reporter);
    await confirmCongelamento(page, reporter);
    await verifyStatoScheda(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});