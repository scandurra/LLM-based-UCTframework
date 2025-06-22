import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { insertCorrectCredentials, clickLoginButton, verifySuccessMessage } from '../UC1/UC1_TC1.functions.js';

import { clickUserIcon, selectEnglishLanguage, verifyEnglishLanguage } from './UC5_TC2.functions.js';

test("UC5_TC2 - Selezione lingua inglese", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC5_TC2", "Selezione lingua inglese");

    await page.goto(process.env.E2E_LOGIN_URL);

    await insertCorrectCredentials(page, reporter);
    await clickLoginButton(page, reporter);
    await verifySuccessMessage(page, reporter);

    await clickUserIcon(page, reporter);
    await selectEnglishLanguage(page, reporter);
    await verifyEnglishLanguage(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});