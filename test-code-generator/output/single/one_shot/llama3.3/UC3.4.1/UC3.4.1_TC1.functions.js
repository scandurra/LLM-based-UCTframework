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
  expect(await page.waitForDownload()).toBeTruthy();
}

export const waitDownloadCompletion = async function(page, reporter) {
  const startTime = new Date().getTime();
  const download = await page.waitForDownload();
  await download.saveAs('census_sheet.pdf');
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC3.4.1_TC1_ID2', 'Wait for download completion', 'Download completed', 'Download completed', true, '', executionTime);
  }
  expect(await download.finished()).toBeTruthy();
}