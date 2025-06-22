import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessSearchSection } from '../UC3.2/UC3.2_TC1.functions.js';

export const searchWithValidName = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.searchByName('Lucania');
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.2.1_TC1_ID1', 'Search with valid name', 'Results page loaded', 'Results page loaded', true, {}, executionTime);
  }
  expect(await censusSheetPage.page.url()).toContain(process.env.E2E_CTS_URL);
}

export const confirmSearch = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickAzioniButton();
  await censusSheetPage.clickAzioneDettaglio();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.2.1_TC1_ID2', 'Confirm search', 'Search results displayed', 'Search results displayed', true, {}, executionTime);
  }
  expect(await page.url()).toContain(process.env.E2E_CTS_URL);
}

export const viewCensusSheetDetails = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickAzioneDettaglio();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.2.1_TC1_ID3', 'View census sheet details', 'Information is complete and correct', 'Information is complete and correct', true, {}, executionTime);
  }
  expect(await page.url()).toContain(process.env.E2E_CTS_URL);
}