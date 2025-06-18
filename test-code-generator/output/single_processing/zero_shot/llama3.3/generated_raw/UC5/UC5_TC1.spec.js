import { test, expect } from '@playwright/test';

import { clickOnUsername, selectItalianLanguage, verifyItalianLanguageSelected } from './UC5_TC1.functions.js';

import { insertCorrectCredentials, clickLoginButton, verifyAuthenticationSuccessMessage } from '../UC1/UC1_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

test("UC5_TC1 - Select Italian language", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC5_TC1", "Select Italian language");

    // Preconditions: UC1
    await page.goto(process.env.E2E_LOGIN_URL);
    await insertCorrectCredentials(page, reporter);
    await clickLoginButton(page, reporter);
    await verifyAuthenticationSuccessMessage(page, reporter);

    // Test Steps
    await clickOnUsername(page, reporter);
    await selectItalianLanguage(page, reporter);
    await verifyItalianLanguageSelected(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     // status can be "passed" or "failed" 
});