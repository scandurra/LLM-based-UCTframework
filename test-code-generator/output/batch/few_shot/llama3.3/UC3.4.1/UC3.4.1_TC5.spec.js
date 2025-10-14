import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3.4/UC3.4_TC1.functions.js';

import { startDownload, interruptDownload } from './UC3.4.1_TC5.functions.js';

test("UC3.4.1_TC5 - Download scheda censimento interrotto", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.1_TC5", "Download scheda censimento interrotto");

    await page.goto(process.env.E2E_LOGIN_URL);

    await accessCensusSheetSection(page, reporter);
    await clickAzioniButton(page, reporter);
    await startDownload(page, reporter);
    await interruptDownload(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     
});