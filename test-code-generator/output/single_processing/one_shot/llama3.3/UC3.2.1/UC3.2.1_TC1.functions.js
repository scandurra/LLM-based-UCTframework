import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const searchCensusSheetsByName = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await expect(censusSheetPage.searchInput).toBeVisible();
  await censusSheetPage.searchByName('Lucania');
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC3.2.1_TC1_ID1', 'Search census sheets by name', 'Census sheets searched', 'Census sheets searched', true, '', executionTime);
  }
}

export const confirmSearch = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickAzioniButton();
  await censusSheetPage.clickAzioneDownload();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC3.2.1_TC1_ID2', 'Confirm search', 'Search confirmed', 'Search confirmed', true, '', executionTime);
  }
}

export const viewCensusSheetsDetails = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await expect(censusSheetPage.searchInput).toBeVisible();
  await censusSheetPage.clickAzioneDettaglio();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC3.2.1_TC1_ID3', 'View census sheets details', 'Census sheets details viewed', 'Census sheets details viewed', true, '', executionTime);
  }
}