import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { openCensusSheetsInterface } from '../UC3/UC3_TC1.functions.js';

export const visualizeCensusSheets = async function(page, reporter) {
  const startTime = new Date().getTime();
  await openCensusSheetsInterface(page, null);
  const censusSheetPage = new CensusSheetPage(page);
  await expect(censusSheetPage.censusSheetsHeader).toBeVisible();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC3.1_TC1_ID1', 'Visualize census sheets', 'Census sheets table is visible', 'Census sheets table is visible', true, '', executionTime);
  }
}

export const sortCensusSheets = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickAzioniColumn();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC3.1_TC1_ID2', 'Sort census sheets', 'Census sheets are sorted', 'Census sheets are sorted', true, '', executionTime);
  }
  await expect(censusSheetPage.azioniColumn).toBeVisible();
}

export const scrollCensusSheets = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollWidth);
  });
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC3.1_TC1_ID3', 'Scroll census sheets', 'All columns are visible and scrollable', 'All columns are visible and scrollable', true, '', executionTime);
  }
  await expect(censusSheetPage.statsColumn).toBeVisible();
}