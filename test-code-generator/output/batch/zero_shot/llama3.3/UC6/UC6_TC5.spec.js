import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { loginFromDifferentDevice, tryToLogoutFromDifferentDevice } from './UC6_TC5.functions.js';

test("UC6_TC5 - Edge case: logout da dispositivo diverso", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC6_TC5", "Edge case: logout da dispositivo diverso");

    // Call step functions in sequence
    await loginFromDifferentDevice(page, reporter);
    await tryToLogoutFromDifferentDevice(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});