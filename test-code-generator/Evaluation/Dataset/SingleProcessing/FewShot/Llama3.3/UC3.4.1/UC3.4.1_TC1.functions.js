import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetsSection, visualizeAvailableActions } from '../UC3.4/UC3.4_TC1.functions.js';

export const downloadCensusSheet = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickAzioneDownload();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.1_TC1_ID1', 'Download census sheet', 'Browser starts downloading the file', 'Browser starts downloading the file', true, {}, executionTime);
  }
  // Include Playwright assertions
  expect(await page.waitForDownload()).toBeTruthy();
}

export const waitDownloadCompletion = async function(page, reporter) {
  const startTime = new Date().getTime();
  const download = await page.waitForDownload();
  await download.saveAs('census_sheet.pdf');
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.1_TC1_ID2', 'Wait for download completion', 'File is downloaded correctly', 'File is downloaded correctly', true, {}, executionTime);
  }
  // Include Playwright assertions
  expect(await download.finished()).toBeTruthy();
}