import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAndAuthenticate } from '../UC3/UC3_TC1.functions.js';

import { accessCensusSheetSection } from './UC3.4_TC1.functions.js';

import { openDettaglioPageWithNonExistingNodo, verifyError } from './UC3.4.5_TC5.functions.js';

test("UC3.4.5_TC5 - Apertura pagina di dettaglio con nodo non esistente", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.5_TC5", "Apertura pagina di dettaglio con nodo non esistente");

    await accessPlatformAndAuthenticate(page, reporter);
    await accessCensusSheetSection(page, reporter);
    await openDettaglioPageWithNonExistingNodo(page, reporter);
    await verifyError(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});