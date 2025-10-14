import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3.4/UC3.4_TC1.functions.js';

import { openDettaglioPageWithHierarchy, selectNodeInHierarchy, navigateThroughHierarchy } from './UC3.4.5_TC4.functions.js';

test("UC3.4.5_TC4 - Navigazione attraverso la gerarchia", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.5_TC4", "Navigazione attraverso la gerarchia");

    await openDettaglioPageWithHierarchy(page, reporter);

    await selectNodeInHierarchy(page, reporter);
    await navigateThroughHierarchy(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});