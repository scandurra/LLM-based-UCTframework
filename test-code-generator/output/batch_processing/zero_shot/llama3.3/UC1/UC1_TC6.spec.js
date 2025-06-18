import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { sqlInjectionAttack } from './UC1.functions.js';

test("UC1_TC6 - SQL injection attack", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC1_TC6", "SQL injection attack");

    await sqlInjectionAttack(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});