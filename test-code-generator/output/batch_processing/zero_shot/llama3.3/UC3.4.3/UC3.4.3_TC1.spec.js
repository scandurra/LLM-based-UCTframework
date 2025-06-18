import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAndAuthenticate } from '../UC3/UC3_TC1.functions.js';

import { accessCensusSheetSectionForEdit, clickAzioneEditButton, modifyFieldsWithValidData, confirmChanges } from './UC3.4.3_TC1.functions.js';

test("UC3.4.3_TC1 - Modifica scheda censimento con dati validi", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.3_TC1", "Modifica scheda censimento con dati validi");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await accessPlatformAndAuthenticate(page, reporter);
    await accessCensusSheetSectionForEdit(page, reporter);
    await clickAzioneEditButton(page, reporter);
    await modifyFieldsWithValidData(page, reporter);
    await confirmChanges(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});