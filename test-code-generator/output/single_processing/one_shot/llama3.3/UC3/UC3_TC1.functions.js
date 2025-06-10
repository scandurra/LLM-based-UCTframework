import { test, expect } from '@playwright/test';

import { Sidebar } from '../../models/page_object_models/sidebar.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { insertCorrectCredentials, clickLoginButton, verifySuccessMessage } from '../UC1/UC1_TC1.functions.js';

export const openCensusSheetsInterface = async function(page, reporter) {
  const startTime = new Date().getTime();
  await page.goto(process.env.E2E_DASHBOARD_URL);
  const sidebar = new Sidebar(page);
  await sidebar.clickCensusSheetsButton();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC3_TC1_ID2', 'Open census sheets interface', 'Census sheets interface opened', 'Census sheets interface opened', true, '', executionTime);
  }

  const censusSheetPage = new CensusSheetPage(page);
  await expect(censusSheetPage.censusSheetsHeader).toBeVisible();
}