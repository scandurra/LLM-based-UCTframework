import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPortalAndClickUserIcon, selectItalianLanguage, verifyItalianLanguageSelected } from './UC5_TC1.functions.js';

import { insertCorrectCredentials, clickLoginButton, verifySuccessMessage } from '../UC1/UC1_TC1.functions.js';

test("UC5_TC1 - Selezione lingua italiana", async ({ page, browserName }) => {
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC5_TC1", "Selezione lingua italiana");
    
    // Reuse existing method in the prompt without redefining them
    await insertCorrectCredentials(page, null);
    await clickLoginButton(page, null);
    await verifySuccessMessage(page, null);

    await accessPortalAndClickUserIcon(page, reporter);
    await selectItalianLanguage(page, reporter);
    await verifyItalianLanguageSelected(page, reporter);
    
    reporter.onTestEnd(test, { status: "passed" });
});