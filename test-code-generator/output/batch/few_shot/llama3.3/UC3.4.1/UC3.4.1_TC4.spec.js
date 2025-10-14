import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3.4/UC3.4_TC1.functions.js';

import { selectSpecialCharactersFileName, downloadSpecialCharactersFileName } from './UC3.4.1_TC4.functions.js';

test("UC3.4.1_TC4 - Download scheda censimento con caratteri speciali nel nome", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.1_TC4", "Download scheda censimento con caratteri speciali nel nome");

    await page.goto(process.env.E2E_LOGIN_URL);

    await accessCensusSheetSection(page, reporter);
    await clickAzioniButton(page, reporter);
    await selectSpecialCharactersFileName(page, reporter);
    await downloadSpecialCharactersFileName(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     
});