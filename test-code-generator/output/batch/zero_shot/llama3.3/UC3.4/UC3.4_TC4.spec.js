import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAndAuthenticate } from '../UC3/UC3_TC1.functions.js';

import { accessCensusSheetSection } from './UC3.4_TC1.functions.js';

import { selectMultipleAzioni } from './UC3.4_TC4.functions.js';

test("UC3.4_TC4 - Selezione multipla di azioni sulla stessa scheda censimento", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4_TC4", "Selezione multipla di azioni sulla stessa scheda censimento");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await accessPlatformAndAuthenticate(page, reporter);
    await accessCensusSheetSection(page, reporter);
    await selectMultipleAzioni(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});