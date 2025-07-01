import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAndSelectCensusSheetMenu } from './UC3.functions.js';

import { clickUploadSchedaModalButton } from './UC3.3_TC1.functions.js';

import { selectFileWithLongName, uploadFileWithLongName } from './UC3.3_TC5.functions.js';

test("UC3.3_TC5 - Caricamento scheda censimento con file che ha un nome molto lungo", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.3_TC5", "Caricamento scheda censimento con file che ha un nome molto lungo");

    await accessPlatformAndSelectCensusSheetMenu(page, reporter);
    await clickUploadSchedaModalButton(page, reporter);
    await selectFileWithLongName(page, reporter);
    await uploadFileWithLongName(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     
});