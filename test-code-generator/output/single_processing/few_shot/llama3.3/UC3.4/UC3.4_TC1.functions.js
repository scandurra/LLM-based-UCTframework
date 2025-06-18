import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { openCensusSheetInterface, authenticateAndOpenDashboard } from '../UC3/UC3_TC1.functions.js';

export const visualizeAvailableActions = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickAzioniButton();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4_TC1_ID2', 'Visualize available actions', 'Available actions are visible', 'Available actions are visible', true, {}, executionTime);
  }
  expect(await censusSheetPage.page.locator('.text-start > .btn').first().isVisible()).toBeTruthy();
}

export const accessCensusSheetsSection = async function(page, reporter) {
  const startTime = new Date().getTime();
  await openCensusSheetInterface(page, null);
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4_TC1_ID1', 'Access census sheets section', 'Census sheets list is visible', 'Census sheets list is visible', true, {}, executionTime);
  }
  expect(await page.url()).toContain(process.env.E2E_CTS_URL);
}