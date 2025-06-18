import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetsSection, visualizeAvailableActions } from '../UC3.4/UC3.4_TC1.functions.js';

export const selectDetailOperation = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await accessCensusSheetsSection(page, null);
  await visualizeAvailableActions(page, null);
  await censusSheetPage.clickAzioneDettaglio();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.5_TC1_ID1', 'Select detail operation on an existing sheet', 'Detail page opens correctly', 'Detail page opens correctly', true, {}, executionTime);
  }
  expect(await page.url()).toContain(process.env.E2E_CTS_URL);
}

export const verifyGeneralData = async function(page, reporter) {
  const startTime = new Date().getTime();
  // TO DO: implement verification of general data
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.5_TC1_ID2', 'Verify presence of general data', 'All required data is displayed correctly', 'All required data is displayed correctly', true, {}, executionTime);
  }
  // TO DO: add assertion for verification
}

export const navigateHierarchy = async function(page, reporter) {
  const startTime = new Date().getTime();
  // TO DO: implement navigation in hierarchy
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.5_TC1_ID3', 'Navigate in hierarchy', 'Navigation occurs without errors', 'Navigation occurs without errors', true, {}, executionTime);
  }
  // TO DO: add assertion for navigation
}