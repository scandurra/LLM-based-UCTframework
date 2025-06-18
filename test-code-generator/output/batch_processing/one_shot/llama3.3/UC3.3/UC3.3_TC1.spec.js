import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAndAuthenticate } from '../UC3.functions.js';

import { selectCensusSheetMenu } from '../UC3.functions.js';

import { clickUploadSchedaModalButton } from './UC3.3_TC1.functions.js';

import { selectFileAndCompileParameters } from './UC3.3_TC1.functions.js';

import { proceedToUpload } from './UC3.3_TC1.functions.js';

test("UC3.3_TC1 - Caricamento scheda censimento con dati validi e formato supportato", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.3_TC1", "Caricamento scheda censimento con dati validi e formato supportato");

    await page.goto(process.env.E2E_LOGIN_URL);

    await accessPlatformAndAuthenticate(page, reporter);
    await selectCensusSheetMenu(page, reporter);

    await clickUploadSchedaModalButton(page, reporter);
    await selectFileAndCompileParameters(page, reporter);
    await proceedToUpload(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});