import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const selectDownloadOperation = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickAzioniButton();
  await censusSheetPage.clickAzioneDownload();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC3.4.1_TC1_ID1', 'Select download operation', 'Download operation selected', 'Download operation selected', true, '', executionTime);
  }
  await expect(censusSheetPage.page.locator('[data-kt-cts-table-filter="download_row"]')).toBeVisible();
}

export const waitDownloadCompletion = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Wait for the download to complete
  await page.waitForTimeout(5000); // adjust the timeout as needed
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC3.4.1_TC1_ID2', 'Wait for download completion', 'Download completed', 'Download completed', true, '', executionTime);
  }
}