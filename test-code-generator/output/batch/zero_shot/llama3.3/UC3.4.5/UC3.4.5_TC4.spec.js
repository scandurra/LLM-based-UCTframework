import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAndAuthenticate } from '../UC3/UC3_TC1.functions.js';

import { accessCensusSheetSection } from './UC3.4_TC1.functions.js';

import { openDettaglioPageWithGerarchia, selectNodoGerarchia, navigateGerarchiaBackAndForth } from './UC3.4.5_TC4.functions.js';

test("UC3.4.5_TC4 - Navigazione nella gerarchia", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.5_TC4", "Navigazione nella gerarchia");

    await accessPlatformAndAuthenticate(page, reporter);
    await accessCensusSheetSection(page, reporter);
    await openDettaglioPageWithGerarchia(page, reporter);
    await selectNodoGerarchia(page, reporter);
    await navigateGerarchiaBackAndForth(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});