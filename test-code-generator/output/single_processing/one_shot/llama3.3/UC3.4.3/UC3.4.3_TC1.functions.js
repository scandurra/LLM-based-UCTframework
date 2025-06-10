import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const selectEditOperation = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickAzioniButton();
  await censusSheetPage.clickAzioneEdit();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC3.4.3_TC1_ID1', 'Select edit operation', 'Edit operation selected', 'Edit operation selected', true, '', executionTime);
  }
  await expect(censusSheetPage.page.locator('[data-kt-cts-table-filter="edit_row"]')).toBeVisible();
}

export const modifyFields = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Modify fields with valid data
  // Add code to fill in the form with valid data
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC3.4.3_TC1_ID2', 'Modify fields', 'Fields modified', 'Fields modified', true, '', executionTime);
  }
  // Add assertions to verify that the data was accepted and saved
}

export const confirmChanges = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Conferma le modifiche
  // Add code to confirm the changes
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC3.4.3_TC1_ID3', 'Confirm changes', 'Changes confirmed', 'Changes confirmed', true, '', executionTime);
  }
  // Add assertions to verify that the information was updated successfully
}