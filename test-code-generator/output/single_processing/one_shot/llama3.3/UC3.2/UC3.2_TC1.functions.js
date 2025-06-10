import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { openCensusSheetsInterface } from '../UC3/UC3_TC1.functions.js';

export const searchCensusSheets = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await expect(censusSheetPage.searchInput).toBeVisible();
  await censusSheetPage.searchByName('Lucania');
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC3.2_TC1_ID1', 'Search census sheets', 'Census sheets searched', 'Census sheets searched', true, '', executionTime);
  }
}

export const executeSearch = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickAzioniButton();
  await censusSheetPage.clickAzioneDownload();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC3.2_TC1_ID2', 'Execute search', 'Search executed', 'Search executed', true, '', executionTime);
  }
}

export const verifySearchResults = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await expect(censusSheetPage.censusSheetsHeader).toBeVisible();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC3.2_TC1_ID3', 'Verify search results', 'Search results verified', 'Search results verified', true, '', executionTime);
  }
}