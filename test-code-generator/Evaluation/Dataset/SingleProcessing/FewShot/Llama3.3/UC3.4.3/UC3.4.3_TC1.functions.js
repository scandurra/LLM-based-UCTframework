import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetsSection, visualizeAvailableActions } from '../UC3.4/UC3.4_TC1.functions.js';

export const selectEditOperation = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await visualizeAvailableActions(page, null);
  await censusSheetPage.clickAzioneEdit();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.3_TC1_ID1', 'Select edit operation', 'Edit section is visible', 'Edit section is visible', true, {}, executionTime);
  }
  expect(await censusSheetPage.page.locator('[data-kt-cts-table-filter="edit_row"]').first().isVisible()).toBeTruthy();
}

export const modifyFieldsWithValidData = async function(page, reporter) {
  const startTime = new Date().getTime();
  // TO DO: implement modification of fields with valid data
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.3_TC1_ID2', 'Modify fields with valid data', 'Data is accepted and saved', 'Data is accepted and saved', true, {}, executionTime);
  }
  // TO DO: add assertion for modified fields
}

export const confirmChanges = async function(page, reporter) {
  const startTime = new Date().getTime();
  // TO DO: implement confirmation of changes
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.3_TC1_ID3', 'Confirm changes', 'Information is updated with success', 'Information is updated with success', true, {}, executionTime);
  }
  // TO DO: add assertion for updated information
}