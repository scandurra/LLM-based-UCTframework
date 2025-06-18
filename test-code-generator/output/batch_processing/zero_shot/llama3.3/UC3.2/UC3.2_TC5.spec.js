import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAndAuthenticate } from '../UC3/UC3_TC1.functions.js';

import { accessSearchSectionSpecial, insertSpecialSearchParameters, executeSearchSpecial } from './UC3.2_TC5.functions.js';

test("UC3.2_TC5 - Ricerca con parametri speciali", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.2_TC5", "Ricerca con parametri speciali");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await accessPlatformAndAuthenticate(page, reporter);
    await accessSearchSectionSpecial(page, reporter);
    await insertSpecialSearchParameters(page, reporter);
    await executeSearchSpecial(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});