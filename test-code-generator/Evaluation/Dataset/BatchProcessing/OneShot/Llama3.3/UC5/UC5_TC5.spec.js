import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { insertCorrectCredentials, clickLoginButton, verifySuccessMessage } from '../UC1/UC1_TC1.functions.js';

import { clickUserIcon, selectLanguageWithSpecialCharacters, verifyLanguageWithSpecialCharacters } from './UC5_TC5.functions.js';

test("UC5_TC5 - Selezione lingua con caratteri speciali", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC5_TC5", "Selezione lingua con caratteri speciali");

    await page.goto(process.env.E2E_LOGIN_URL);

    await insertCorrectCredentials(page, reporter);
    await clickLoginButton(page, reporter);
    await verifySuccessMessage(page, reporter);

    await clickUserIcon(page, reporter);
    await selectLanguageWithSpecialCharacters(page, reporter);
    await verifyLanguageWithSpecialCharacters(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});