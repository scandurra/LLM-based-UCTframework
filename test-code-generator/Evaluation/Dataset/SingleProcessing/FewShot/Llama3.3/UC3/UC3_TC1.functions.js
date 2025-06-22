import { test, expect } from '@playwright/test';

import { Sidebar } from '../../models/page_object_models/sidebar.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { insertCorrectCredentials, clickLoginButton, verifyAuthenticationSuccessMessage } from '../UC1/UC1_TC1.functions.js';

export const openCensusSheetInterface = async function(page, reporter) {
  const startTime = new Date().getTime();
  await page.goto(process.env.E2E_HOME_URL);
  const sidebar = new Sidebar(page);
  await sidebar.clickCensusSheetsMenu();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3_TC1_ID2', 'Open census sheet interface', 'Census sheet interface opened', 'Census sheet interface opened', true, {}, executionTime);
  }
  expect(await page.url()).toContain(process.env.E2E_CTS_URL);
}

export const authenticateAndOpenDashboard = async function(page, reporter) {
  const startTime = new Date().getTime();
  await insertCorrectCredentials(page, null);
  await clickLoginButton(page, null);
  await verifyAuthenticationSuccessMessage(page, null);
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3_TC1_ID1', 'Authenticate and open dashboard', 'Dashboard opened', 'Dashboard opened', true, {}, executionTime);
  }
  expect(await page.url()).toContain(process.env.E2E_DASHBOARD_URL);
}