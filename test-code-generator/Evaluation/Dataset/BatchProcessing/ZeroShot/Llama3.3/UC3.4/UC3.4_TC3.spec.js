import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAndAuthenticate } from '../UC3/UC3_TC1.functions.js';

import { accessCensusSheetSectionWithoutPermissions, tryExecuteAzioneWithoutPermissions } from './UC3.4_TC3.functions.js';

test("UC3.4_TC3 - Esecuzione di un’azione su scheda censimento senza permessi", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4_TC3", "Esecuzione di un’azione su scheda censimento senza permessi");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await accessPlatformAndAuthenticate(page, reporter);
    await accessCensusSheetSectionWithoutPermissions(page, reporter);
    await tryExecuteAzioneWithoutPermissions(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});