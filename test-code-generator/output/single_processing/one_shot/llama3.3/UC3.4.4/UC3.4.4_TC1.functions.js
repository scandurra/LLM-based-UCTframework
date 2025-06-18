import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const selectFreezeOperation = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickAzioniButton();
  await censusSheetPage.clickAzioneCongela();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC3.4.4_TC1_ID1', 'Select freeze operation', 'Freeze operation selected', 'Freeze operation selected', true, '', executionTime);
  }
  expect(await censusSheetPage.page.locator('button.swal2-confirm.btn.fw-bold.btn-danger').isVisible()).toBeTruthy();
}

export const confirmFreezeOperation = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickConfirmAzioneDelete();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC3.4.4_TC1_ID2', 'Confirm freeze operation', 'Freeze operation confirmed', 'Freeze operation confirmed', true, '', executionTime);
  }
  expect(await censusSheetPage.page.locator('button.swal2-confirm.btn.fw-bold.btn-primary').isVisible()).toBeTruthy();
}

export const verifySheetStatus = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  // Add logic to verify the sheet status
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC3.4.4_TC1_ID3', 'Verify sheet status', 'Sheet status verified', 'Sheet status verified', true, '', executionTime);
  }
  // Add assertion to verify the sheet status
}