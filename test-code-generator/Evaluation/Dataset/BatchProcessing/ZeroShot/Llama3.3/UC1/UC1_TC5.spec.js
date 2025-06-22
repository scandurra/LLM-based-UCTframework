import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { insertInvalidCharactersInPassword } from './UC1.functions.js';

test("UC1_TC5 - Insert invalid characters in password", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC1_TC5", "Insert invalid characters in password");

    await insertInvalidCharactersInPassword(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});