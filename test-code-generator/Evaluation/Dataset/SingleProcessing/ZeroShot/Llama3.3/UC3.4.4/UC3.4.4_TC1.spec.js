import { test, expect } from '@playwright/test';

import { accessCensusSheetSection } from '../UC3/UC3_TC1.functions.js';

import { selectCongelamentoOperation, confirmCongelamento, verifySchedaStato } from './UC3.4.4_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

test("UC3.4.4_TC1 - Congelamento scheda censimento con conferma", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.4_TC1", "Congelamento scheda censimento con conferma");

    // Call step functions in sequence
    await accessCensusSheetSection(page, reporter);
    await selectCongelamentoOperation(page, reporter);
    await confirmCongelamento(page, reporter);
    await verifySchedaStato(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     // status can be "passed" or "failed" 
});