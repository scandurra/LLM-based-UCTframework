import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { openCensusSheetsInterface } from '../UC3/UC3_TC1.functions.js';

import { clickCensusSheetsUploadButton, selectFileAndCompileParameters, uploadFile } from './UC3.3_TC1.functions.js';

test("UC3.3_TC1 - Caricamento scheda censimento con dati validi e formato supportato", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.3_TC1 - Caricamento scheda censimento con dati validi e formato supportato");

    // Preconditions: UC3
    await page.goto(process.env.E2E_DASHBOARD_URL);
    const sidebar = new (await import('../../models/page_object_models/sidebar.js')).Sidebar(page);
    await sidebar.clickCensusSheetsButton();
    await openCensusSheetsInterface(page, null);

    // Test Steps
    await clickCensusSheetsUploadButton(page, reporter);
    await selectFileAndCompileParameters(page, reporter);
    await uploadFile(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});