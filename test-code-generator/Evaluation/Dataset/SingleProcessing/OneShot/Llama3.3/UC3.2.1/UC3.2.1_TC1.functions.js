import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { openCensusSheetsInterface } from '../UC3/UC3_TC1.functions.js';

export const insertValidSearchParameters = async function(page, reporter) {
  const startTime = new Date().getTime();
  await openCensusSheetsInterface(page, null);
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.searchByName('Lucania');
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC3.2.1_TC1_ID1', 'Insert valid search parameters', 'Valid search parameters inserted', 'Valid search parameters inserted', true, '', executionTime);
  }
  expect(await censusSheetPage.isSearchBarVisible()).toBeTruthy();
}

export const confirmSearch = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickAzioniButton();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC3.2.1_TC1_ID2', 'Confirm search', 'Search confirmed', 'Search confirmed', true, '', executionTime);
  }
  expect(await censusSheetPage.isCensusSheetsPageVisible()).toBeTruthy();
}

export const visualizeDetails = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickAzioneDettaglio();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC3.2.1_TC1_ID3', 'Visualize details', 'Details visualized', 'Details visualized', true, '', executionTime);
  }
  expect(await censusSheetPage.isCensusSheetsPageVisible()).toBeTruthy();
}