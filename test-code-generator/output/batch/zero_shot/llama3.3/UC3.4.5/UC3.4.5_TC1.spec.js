import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAndAuthenticate } from '../UC3/UC3_TC1.functions.js';

import { accessCensusSheetSection } from './UC3.4_TC1.functions.js';

import { selectDettaglioOperation, verifyDettaglioPage, navigateGerarchia } from './UC3.4.5_TC1.functions.js';

test("UC3.4.5_TC1 - Visualizzazione dettaglio scheda censimento con dati validi", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.5_TC1", "Visualizzazione dettaglio scheda censimento con dati validi");

    await accessPlatformAndAuthenticate(page, reporter);
    await accessCensusSheetSection(page, reporter);
    await selectDettaglioOperation(page, reporter);
    await verifyDettaglioPage(page, reporter);
    await navigateGerarchia(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});