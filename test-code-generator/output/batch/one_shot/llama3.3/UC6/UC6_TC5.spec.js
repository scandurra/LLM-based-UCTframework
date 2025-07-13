import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { insertCorrectCredentials, clickLoginButton, verifySuccessMessage } from '../UC1/UC1_TC1.functions.js';

import { logoutFromDifferentDevice } from './UC6_TC5.functions.js';

test("UC6_TC5 - Edge test: logout da un dispositivo diverso", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC6_TC5", "Edge test: logout da un dispositivo diverso");

    await insertCorrectCredentials(page, reporter);
    await clickLoginButton(page, reporter);
    await verifySuccessMessage(page, reporter);
    await logoutFromDifferentDevice(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     
});