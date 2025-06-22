import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAndAuthenticate } from '../UC3.functions.js';

import { selectCensusSheetMenu } from '../UC3.functions.js';

import { clickUploadSchedaModalButton } from './UC3.3_TC3.functions.js';

import { selectLargeFileAndCompileParameters } from './UC3.3_TC3.functions.js';

import { tryToProceedToUpload } from './UC3.3_TC3.functions.js';

test("UC3.3_TC3 - Caricamento scheda censimento con dimensioni eccessive", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.3_TC3", "Caricamento scheda censimento con dimensioni eccessive");

    await page.goto(process.env.E2E_LOGIN_URL);

    await accessPlatformAndAuthenticate(page, reporter);
    await selectCensusSheetMenu(page, reporter);

    await clickUploadSchedaModalButton(page, reporter);
    await selectLargeFileAndCompileParameters(page, reporter);
    await tryToProceedToUpload(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});