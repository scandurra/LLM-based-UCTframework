import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3.4/UC3.4_TC1.functions.js';

import { openDettaglioPageWithInvalidNodeId, verifyErrorPage } from './UC3.4.5_TC5.functions.js';

test("UC3.4.5_TC5 - Apertura della pagina di dettaglio con un ID nodo non valido", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.5_TC5", "Apertura della pagina di dettaglio con un ID nodo non valido");

    await openDettaglioPageWithInvalidNodeId(page, reporter);

    await verifyErrorPage(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});