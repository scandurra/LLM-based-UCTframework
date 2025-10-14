import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3.4/UC3.4_TC1.functions.js';

import { openDettaglioPage, tryModifyField, verifyNoEditingOptions } from './UC3.4.5_TC2.functions.js';

test("UC3.4.5_TC2 - Tentativo di modifica dei dati in pagina di dettaglio", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.5_TC2", "Tentativo di modifica dei dati in pagina di dettaglio");

    await openDettaglioPage(page, reporter);

    await tryModifyField(page, reporter);
    await verifyNoEditingOptions(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});