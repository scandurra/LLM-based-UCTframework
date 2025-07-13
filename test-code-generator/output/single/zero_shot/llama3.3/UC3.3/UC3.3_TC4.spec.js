import { test, expect } from '@playwright/test';

import { clickUploadSchedaModalButton, leaveFileInputEmptyAndTryToUpload } from './UC3.3_TC4.functions.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

test("UC3.3_TC4 - Upload census sheet without selecting a file", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.3_TC4", "Upload census sheet without selecting a file");

    // Navigate to the login page
    await page.goto(process.env.E2E_LOGIN_URL);

    // Call step functions in sequence
    await accessPlatformAndAuthenticate(page, reporter);
    await selectCensusSheetMenu(page, reporter);
    await clickUploadSchedaModalButton(page, reporter);
    await leaveFileInputEmptyAndTryToUpload(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     // status can be "passed" or "failed" 
});