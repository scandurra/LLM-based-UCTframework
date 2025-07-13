import { test, expect } from '@playwright/test';

import { Sidebar } from '../../models/page_object_models/sidebar.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { insertCorrectCredentials, clickLoginButton, verifySuccessMessage } from '../UC1/UC1_TC1.functions.js';

export const openCensusSheetSection = async function(page, reporter) {
  const startTime = new Date().getTime();
  const sidebar = new Sidebar(page);
  await sidebar.clickCensusSheetsMenu();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC3_TC1_ID2', 'Open census sheet section', 'Census sheet section opened', 'Census sheet section opened', true, '', executionTime);
  }
  // Include Playwright assertions
  const censusSheetPage = new CensusSheetPage(page);
  expect(await censusSheetPage.isCensusSheetsTableVisible()).toBeTruthy();
}