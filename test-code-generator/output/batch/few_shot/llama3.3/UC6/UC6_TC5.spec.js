import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessSystemFromDifferentDevice, tryToPerformLogoutFromDifferentDevice } from './UC6_TC5.functions.js';

test("UC6_TC5 - Edge case: logout da dispositivo diverso", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC6_TC5", "Edge case: logout da dispositivo diverso");

    await accessSystemFromDifferentDevice(page, reporter);
    await tryToPerformLogoutFromDifferentDevice(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     
});